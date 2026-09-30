/**
 * Carregamento do Meta Pixel (browser). Um único ponto de init: nunca instale o Pixel em outro lugar
 * (index.html, GTM etc.) para não duplicar PageView.
 */

// O ID do Pixel é público. NEXT_PUBLIC_META_PIXEL_ID (vite.config.ts expõe esse prefixo) tem prioridade.
const DEFAULT_PIXEL_ID = '3059792934154816';
export const META_PIXEL_ID: string = import.meta.env.NEXT_PUBLIC_META_PIXEL_ID || DEFAULT_PIXEL_ID;

type Fbq = {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  loaded: boolean;
  version: string;
  push: Fbq;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

/** Em desenvolvimento os eventos só vão para o console, a menos que VITE_TRACK_IN_DEV=true. */
export const shouldSendEvents = import.meta.env.PROD || import.meta.env.VITE_TRACK_IN_DEV === 'true';

let initialized = false;

export function initPixel() {
  if (initialized || typeof window === 'undefined' || !META_PIXEL_ID || !shouldSendEvents) return;
  initialized = true;

  if (!window.fbq) {
    const fbq = function (...args: unknown[]) {
      if (fbq.callMethod) fbq.callMethod(...args);
      else fbq.queue.push(args);
    } as Fbq;
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = '2.0';
    fbq.queue = [];
    window.fbq = fbq;
    window._fbq = fbq;

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://connect.facebook.net/en_US/fbevents.js';
    document.head.appendChild(script);
  }

  window.fbq('init', META_PIXEL_ID);
}

/** Dispara no Pixel com o event_id que também será enviado à CAPI (deduplicação). */
export function pixelTrack(eventName: string, params: Record<string, unknown>, eventId: string, isCustom: boolean) {
  if (!window.fbq) return;
  window.fbq(isCustom ? 'trackCustom' : 'track', eventName, params, { eventID: eventId });
}
