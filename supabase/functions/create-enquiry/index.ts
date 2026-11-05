import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

const reply = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

async function digest(value: string) {
  const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
  return [...new Uint8Array(hash)].map(x => x.toString(16).padStart(2, '0')).join('');
}

Deno.serve(async req => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return reply({ error: 'Method not allowed' }, 405);
  try {
    const b = await req.json();
    const name = String(b.name || '').trim();
    const email = String(b.email || '').trim().toLowerCase();
    const subject = String(b.subject || 'General enquiry').trim().slice(0, 120);
    const message = String(b.message || '').trim();
    if (name.length < 2 || name.length > 160 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 || message.length < 5 || message.length > 5000) {
      return reply({ error: 'Please check the details in your enquiry.' }, 400);
    }
    const ip = req.headers.get('cf-connecting-ip') || req.headers.get('x-real-ip') || req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const url = Deno.env.get('SUPABASE_URL'), key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!url || !key) throw new Error('Server configuration is incomplete');
    const db = createClient(url, key, { auth: { persistSession: false } });
    const { data: allowed, error: rateError } = await db.rpc('consume_request_rate_limit', {
      p_key_hash: await digest('create-enquiry:' + ip), p_limit: 5, p_window_seconds: 900,
    });
    if (rateError) throw rateError;
    if (!allowed) return reply({ error: 'Please wait before sending another enquiry.' }, 429);
    const { error } = await db.from('enquiries').insert({ name, email, subject, message });
    if (error) throw error;
    return reply({ received: true });
  } catch (error) {
    console.error('create-enquiry failed', error);
    return reply({ error: 'Unable to receive your enquiry right now.' }, 500);
  }
});
