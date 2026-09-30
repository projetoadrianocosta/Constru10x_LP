/// <reference types="node" />
/**
 * POST /api/meta-capi — recebe eventos do navegador e repassa à Meta Conversions API.
 * O navegador envia o MESMO event_id do Pixel; o IP e o user-agent reais vêm dos headers da requisição.
 */
import { sendMetaEvent } from './_lib/metaCapi';

// Purchase fica de fora de propósito: só deve ser enviado após confirmação segura da Hotmart.
const ALLOWED_EVENTS = new Set([
  'PageView',
  'ViewContent',
  'InitiateCheckout',
  'WhatsAppJoinClick',
  'view_purchase_confirmation',
]);

const MAX_BODY_CHARS = 10_000;
const MAX_CUSTOM_KEYS = 30;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return false;
  try {
    const { hostname } = new URL(origin);
    const extra = (process.env.META_CAPI_ALLOWED_HOSTS ?? '').split(',').map((h) => h.trim()).filter(Boolean);
    return (
      hostname === 'evento.engadrianocosta.com.br' ||
      hostname === 'localhost' ||
      hostname.endsWith('.vercel.app') ||
      extra.includes(hostname)
    );
  } catch {
    return false;
  }
}

function sanitizeCustomData(input: unknown): Record<string, string | number | boolean> {
  const out: Record<string, string | number | boolean> = {};
  if (!input || typeof input !== 'object') return out;
  for (const [key, value] of Object.entries(input as Record<string, unknown>).slice(0, MAX_CUSTOM_KEYS)) {
    if (typeof value === 'string') out[key] = value.slice(0, 300);
    else if (typeof value === 'number' && Number.isFinite(value)) out[key] = value;
    else if (typeof value === 'boolean') out[key] = value;
  }
  return out;
}

const optionalString = (value: unknown, max = 500) =>
  typeof value === 'string' && value ? value.slice(0, max) : undefined;

export default {
  async fetch(request: Request): Promise<Response> {
    if (request.method !== 'POST') return json({ ok: false, error: 'method_not_allowed' }, 405);
    if (!isAllowedOrigin(request)) return json({ ok: false, error: 'forbidden' }, 403);

    const raw = await request.text();
    if (raw.length > MAX_BODY_CHARS) return json({ ok: false, error: 'payload_too_large' }, 413);

    let body: Record<string, unknown>;
    try {
      body = JSON.parse(raw);
    } catch {
      return json({ ok: false, error: 'invalid_json' }, 400);
    }

    const eventName = optionalString(body.event_name, 100);
    const eventId = optionalString(body.event_id, 100);
    if (!eventName || !ALLOWED_EVENTS.has(eventName) || !eventId) {
      return json({ ok: false, error: 'invalid_event' }, 400);
    }

    // event_time do cliente só vale se for recente; senão usa o horário do servidor.
    const nowSeconds = Math.floor(Date.now() / 1000);
    const clientTime = typeof body.event_time === 'number' ? body.event_time : NaN;
    const eventTime = Math.abs(nowSeconds - clientTime) < 60 * 60 * 24 ? Math.floor(clientTime) : nowSeconds;

    const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();

    const result = await sendMetaEvent({
      eventName,
      eventId,
      eventTime,
      eventSourceUrl: optionalString(body.event_source_url, 1000),
      userData: {
        clientIpAddress: forwardedFor || request.headers.get('x-real-ip') || undefined,
        clientUserAgent: request.headers.get('user-agent') || undefined,
        fbp: optionalString(body.fbp, 200),
        fbc: optionalString(body.fbc, 500),
      },
      customData: sanitizeCustomData(body.custom_data),
    });

    if (result.ok) return json({ ok: true });
    if (result.reason === 'not_configured') return json({ ok: false, error: 'capi_not_configured' }, 503);
    return json({ ok: false, error: 'upstream_error' }, 502);
  },
};
