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
    const email = String(b.email || '').trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) return reply({ error: 'Please provide a valid email address.' }, 400);
    const ip = req.headers.get('cf-connecting-ip') || req.headers.get('x-real-ip') || req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const url = Deno.env.get('SUPABASE_URL'), key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!url || !key) throw new Error('Server configuration is incomplete');
    const db = createClient(url, key, { auth: { persistSession: false } });
    const { data: allowed, error: rateError } = await db.rpc('consume_request_rate_limit', {
      p_key_hash: await digest('subscribe-newsletter:' + ip), p_limit: 3, p_window_seconds: 3600,
    });
    if (rateError) throw rateError;
    if (!allowed) return reply({ error: 'Please wait before trying to subscribe again.' }, 429);
    const { error } = await db.from('newsletter_subscribers').upsert({ email, is_active: true }, { onConflict: 'email' });
    if (error) throw error;
    return reply({ subscribed: true });
  } catch (error) {
    console.error('subscribe-newsletter failed', error);
    return reply({ error: 'Unable to complete your subscription right now.' }, 500);
  }
});
