/**
 * Envia eventos para o endpoint server-side (/api/meta-capi), que repassa à Meta Conversions API.
 * O token da CAPI existe só no servidor; aqui nada sensível é manipulado.
 */
import { getFbc, getFbp } from './attribution';

const ENDPOINT = '/api/meta-capi';
const FBP_WAIT_MS = 1500;
const FBP_POLL_MS = 100;

export interface CapiEvent {
  eventName: string;
  eventId: string;
  eventTime: number; // segundos (unix)
  customData: Record<string, unknown>;
}

async function waitForFbp(): Promise<string | undefined> {
  const deadline = Date.now() + FBP_WAIT_MS;
  while (!getFbp() && Date.now() < deadline) {
    await new Promise((resolve) => setTimeout(resolve, FBP_POLL_MS));
  }
  return getFbp();
}

/**
 * Nunca lança nem bloqueia: falha de tracking não pode atrapalhar navegação/redirecionamento.
 * `waitForFbp` só para eventos de carregamento de página (o Pixel ainda está criando o _fbp).
 */
export async function sendCapiEvent(event: CapiEvent, options: { waitForFbp?: boolean } = {}) {
  try {
    const fbp = options.waitForFbp ? await waitForFbp() : getFbp();
    const body = JSON.stringify({
      event_name: event.eventName,
      event_id: event.eventId,
      event_time: event.eventTime,
      event_source_url: window.location.href,
      fbp,
      fbc: getFbc(),
      custom_data: event.customData,
    });

    // sendBeacon sobrevive à troca de página (clique que leva ao checkout); fetch keepalive é o plano B.
    const queued = navigator.sendBeacon?.(ENDPOINT, new Blob([body], { type: 'application/json' }));
    if (!queued) {
      await fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, keepalive: true });
    }
  } catch {
    // ignorado de propósito
  }
}
