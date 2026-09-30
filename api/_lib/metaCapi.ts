/// <reference types="node" />
/**
 * Envio server-side para a Meta Conversions API. SOMENTE servidor: lê META_CONVERSIONS_API_TOKEN.
 *
 * Reutilizável por outras funções. Ex.: um futuro webhook da Hotmart confirmando o pagamento pode chamar
 * `sendMetaEvent({ eventName: 'Purchase', ... })` com o event_id/valor reais da compra.
 */

const GRAPH_VERSION = 'v21.0';

export interface MetaServerEvent {
  eventName: string;
  eventId: string;
  eventTime?: number; // segundos (unix)
  eventSourceUrl?: string;
  userData?: {
    clientIpAddress?: string;
    clientUserAgent?: string;
    fbp?: string;
    fbc?: string;
    /** Já em SHA-256 (hex minúsculo), conforme exigido pela Meta. */
    emailHash?: string;
    phoneHash?: string;
  };
  customData?: Record<string, unknown>;
}

export type MetaSendResult =
  | { ok: true }
  | { ok: false; reason: 'not_configured' | 'meta_error'; status?: number };

export async function sendMetaEvent(event: MetaServerEvent): Promise<MetaSendResult> {
  const token = process.env.META_CONVERSIONS_API_TOKEN;
  const datasetId = process.env.META_DATASET_ID;
  if (!token || !datasetId) return { ok: false, reason: 'not_configured' };

  const { userData = {} } = event;
  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: event.eventName,
        event_time: event.eventTime ?? Math.floor(Date.now() / 1000),
        event_id: event.eventId,
        action_source: 'website',
        event_source_url: event.eventSourceUrl,
        user_data: {
          client_ip_address: userData.clientIpAddress,
          client_user_agent: userData.clientUserAgent,
          fbp: userData.fbp,
          fbc: userData.fbc,
          em: userData.emailHash ? [userData.emailHash] : undefined,
          ph: userData.phoneHash ? [userData.phoneHash] : undefined,
        },
        custom_data: event.customData,
      },
    ],
    // O token vai no corpo (não na URL) para não aparecer em logs de acesso.
    access_token: token,
  };
  if (process.env.META_TEST_EVENT_CODE) payload.test_event_code = process.env.META_TEST_EVENT_CODE;

  const response = await fetch(`https://graph.facebook.com/${GRAPH_VERSION}/${datasetId}/events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    console.error(`[meta-capi] Graph API ${response.status}: ${detail.slice(0, 500)}`);
    return { ok: false, reason: 'meta_error', status: response.status };
  }
  return { ok: true };
}
