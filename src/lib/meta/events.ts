/**
 * API única de rastreamento do site. Toda página/componente dispara eventos por aqui.
 * Cada evento gera UM event_id, usado no Pixel (browser) e na CAPI (servidor) para deduplicação.
 */
import type { CurrentLot } from '../lots/helpers';
import { captureAttribution, getAttribution } from './attribution';
import { sendCapiEvent } from './capiClient';
import { initPixel, pixelTrack, shouldSendEvents } from './pixel';

export const CONTENT_NAME = 'Imersão Constru 10X';
const CONTENT_CATEGORY = 'Imersão';

/** Eventos padrão da Meta (os demais são enviados como trackCustom). */
const STANDARD_EVENTS = new Set(['PageView', 'ViewContent', 'InitiateCheckout', 'Lead', 'Purchase']);

type EventParams = Record<string, string | number | boolean | undefined>;

export function createEventId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID();
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
}

function isPaidRoute(): boolean {
  return window.location.pathname.toLowerCase().replace(/\/+$/, '') === '/constru10x';
}

function track(
  eventName: string,
  params: EventParams = {},
  options: { waitForFbp?: boolean } = {},
) {
  if (typeof window === 'undefined') return;

  const eventId = createEventId();
  const customData: Record<string, unknown> = {
    ...getAttribution(),
    traffic_source: isPaidRoute() ? 'pago' : 'organico',
    ...params,
  };
  for (const key of Object.keys(customData)) if (customData[key] === undefined) delete customData[key];

  console.log(`[Meta] ${eventName}`, { eventId, ...customData, sent: shouldSendEvents });

  if (!shouldSendEvents) return;

  pixelTrack(eventName, customData, eventId, !STANDARD_EVENTS.has(eventName));
  void sendCapiEvent(
    { eventName, eventId, eventTime: Math.floor(Date.now() / 1000), customData },
    options,
  );
}

const lotParams = (lot: CurrentLot): EventParams => ({
  lot: lot.label ?? undefined,
  lot_number: lot.lot ?? undefined,
  value: lot.priceValue,
  currency: lot.priceValue !== undefined ? 'BRL' : undefined,
});

// --- Inicialização e PageView (sem duplicidade, mesmo com StrictMode) ------------------------------

const pageViewsSent = new Set<string>();
const viewContentSent = new Set<string>();

/** Captura UTMs/fbclid e sobe o Pixel. Idempotente. */
export function bootTracking() {
  if (typeof window === 'undefined') return;
  captureAttribution();
  initPixel();
}

export function trackPageView() {
  const key = window.location.pathname;
  if (pageViewsSent.has(key)) return;
  pageViewsSent.add(key);
  track('PageView', {}, { waitForFbp: true });
}

// --- Landing ---------------------------------------------------------------------------------------

export function trackViewContent(lot: CurrentLot) {
  const key = window.location.pathname;
  if (viewContentSent.has(key)) return;
  viewContentSent.add(key);
  track(
    'ViewContent',
    { content_name: CONTENT_NAME, content_category: CONTENT_CATEGORY, content_type: 'product', ...lotParams(lot) },
    { waitForFbp: true },
  );
}

/** Não dispara com as inscrições encerradas (sem lote vigente). */
export function trackInitiateCheckout(lot: CurrentLot, location: string) {
  if (!lot.isActive) return;
  track('InitiateCheckout', {
    content_name: CONTENT_NAME,
    content_category: CONTENT_CATEGORY,
    cta_location: location,
    ...lotParams(lot),
  });
}

// --- Pós-compra ------------------------------------------------------------------------------------

const confirmationViewSent = { done: false };

/**
 * Apenas registra a visualização da página. NÃO é Purchase: a URL pode ser aberta/recarregada manualmente.
 * O Purchase deve vir de uma confirmação segura da Hotmart (webhook/API) via api/_lib/metaCapi.ts.
 */
export function trackViewPurchaseConfirmation() {
  if (confirmationViewSent.done) return;
  confirmationViewSent.done = true;
  track('view_purchase_confirmation', { content_name: CONTENT_NAME }, { waitForFbp: true });
}

export function trackWhatsAppJoinClick() {
  track('WhatsAppJoinClick', { content_name: CONTENT_NAME });
}
