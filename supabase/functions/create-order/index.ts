import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

async function digest(value: string) {
  const bytes = new TextEncoder().encode(value);
  const hash = await crypto.subtle.digest('SHA-256', bytes);
  return [...new Uint8Array(hash)].map(x => x.toString(16).padStart(2, '0')).join('');
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  try {
    const body = await req.json();
    const c = body?.customer ?? {};
    const d = body?.delivery ?? {};
    const items = body?.items ?? [];
    const required = [c.name, c.email, c.phone, d.recipient_name, d.recipient_phone, d.address_line1, d.city, d.state];

    if (required.some(v => typeof v !== 'string' || !v.trim()) || !Array.isArray(items) || items.length < 1 || items.length > 30) {
      return json({ error: 'Please complete all required details and add at least one item.' }, 400);
    }
    if (String(c.name).length > 160 || String(c.email).length > 254 || String(c.phone).length > 40 ||
        String(d.recipient_name).length > 160 || String(d.recipient_phone).length > 40 ||
        String(d.address_line1).length > 240 || String(d.city).length > 100 || String(d.state).length > 100) {
      return json({ error: 'Some order details are too long. Please review them and try again.' }, 400);
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email)) return json({ error: 'Please provide a valid email address.' }, 400);

    const ip = req.headers.get('cf-connecting-ip') || req.headers.get('x-real-ip') || req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const url = Deno.env.get('SUPABASE_URL');
    const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!url || !key) throw new Error('Server configuration is incomplete');
    const db = createClient(url, key, { auth: { persistSession: false } });

    const keyHash = await digest('create-order:' + ip);
    const { data: allowed, error: limitError } = await db.rpc('consume_request_rate_limit', {
      p_key_hash: keyHash, p_limit: 8, p_window_seconds: 900,
    });
    if (limitError) throw limitError;
    if (!allowed) return json({ error: 'We have received several requests from this connection. Please wait a little and try again.' }, 429);

    const cleanItems = items.map((item: any) => ({
      product_id: String(item?.product_id || ''),
      quantity: Number(item?.quantity),
      personalisation_note: String(item?.personalisation_note || '').slice(0, 1000),
    }));
    if (cleanItems.some((item: any) => !/^[0-9a-f-]{36}$/i.test(item.product_id) || !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 20)) {
      return json({ error: 'A product selection or quantity is invalid. Please review your bag.' }, 400);
    }

    const order = {
      customer_name: c.name.trim(),
      customer_email: c.email.trim().toLowerCase(),
      customer_phone: c.phone.trim(),
      recipient_name: d.recipient_name.trim(),
      recipient_phone: d.recipient_phone.trim(),
      address_line1: d.address_line1.trim(),
      address_line2: String(d.address_line2 || '').slice(0, 240),
      city: d.city.trim(),
      state: d.state.trim(),
      postal_code: String(d.postal_code || '').slice(0, 30),
      delivery_note: String(d.delivery_note || '').slice(0, 1000),
      gift_message: String(body.gift_message || '').slice(0, 1000),
    };

    // A single database transaction creates the order and its line items.
    // Prices and inventory are read and locked on the server, never trusted from the browser.
    const { data, error } = await db.rpc('create_order_with_items', {
      p_order: order,
      p_items: cleanItems,
    });
    if (error) {
      console.error('create_order_with_items failed', error);
      const message = error.message || '';
      if (message.includes('unavailable') || message.includes('stock') || message.includes('quantity')) {
        return json({ error: 'A selected item is unavailable or does not have enough stock. Please review your bag.' }, 409);
      }
      throw error;
    }
    return json(data);
  } catch (error) {
    console.error('create-order failed', error);
    return json({ error: 'We could not submit your order just now. Please try again or contact ONE O.' }, 500);
  }
});
