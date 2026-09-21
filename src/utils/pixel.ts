/**
 * Utilitário de Rastreamento (Meta Pixel & GA) para a Imersão Constru 10x
 * Configurado para diferenciar tráfego pago (/evento) do tráfego orgânico (/)
 */

// Insira aqui os IDs oficiais para ativar o rastreamento real:
export const TRACKING_CONFIG = {
  metaPixelId: "", // Cole o ID do seu Meta Pixel aqui (ex: "123456789012345")
  googleAnalyticsId: "", // Cole o ID do Google Analytics aqui (ex: "G-XXXXXXXXXX")
};

// Indica se o acesso atual é via rota de tráfego pago (/evento)
export const isPaidTrafficRoute = () => {
  return typeof window !== 'undefined' && window.location.pathname.toLowerCase() === '/evento';
};

// Inicializa os scripts de rastreamento de forma dinâmica e limpa
export const initTracking = () => {
  if (typeof window === 'undefined') return;

  const isPaid = isPaidTrafficRoute();
  const sourceLabel = isPaid ? 'Tráfego Pago (/evento)' : 'Tráfego Orgânico (/)';

  console.log(`%c[Rastreamento] Inicializando em modo: ${sourceLabel}`, 'color: #fbbf24; font-weight: bold; font-size: 13px;');

  // 1. Inicialização do Meta Pixel
  if (TRACKING_CONFIG.metaPixelId) {
    try {
      /* eslint-disable */
      // @ts-ignore
      if (!window.fbq) {
        // @ts-ignore
        window._fbq = window._fbq || [];
        // @ts-ignore
        window.fbq = function() {
          // @ts-ignore
          window.fbq.callMethod ? window.fbq.callMethod.apply(window.fbq, arguments) : window.fbq.queue.push(arguments);
        };
        // @ts-ignore
        if (!window._fbq) window._fbq = window.fbq;
        // @ts-ignore
        window.fbq.push = window.fbq;
        // @ts-ignore
        window.fbq.loaded = true;
        // @ts-ignore
        window.fbq.version = '2.0';
        // @ts-ignore
        window.fbq.queue = [];

        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://connect.facebook.net/en_US/fbevents.js';
        document.head.appendChild(script);
      }

      // @ts-ignore
      window.fbq('init', TRACKING_CONFIG.metaPixelId);
      console.log(`%c[Meta Pixel] Inicializado com ID: ${TRACKING_CONFIG.metaPixelId}`, 'color: #3b82f6;');
    } catch (e) {
      console.error('[Meta Pixel] Erro ao carregar script:', e);
    }
  } else {
    console.log('%c[Meta Pixel] ID não configurado. Adicione-o em TRACKING_CONFIG no arquivo /src/utils/pixel.ts', 'color: #94a3b8; font-style: italic;');
  }

  // 2. Inicialização do Google Analytics (GA4)
  if (TRACKING_CONFIG.googleAnalyticsId) {
    try {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${TRACKING_CONFIG.googleAnalyticsId}`;
      document.head.appendChild(script);

      // @ts-ignore
      window.dataLayer = window.dataLayer || [];
      // @ts-ignore
      function gtag(){window.dataLayer.push(arguments);}
      // @ts-ignore
      window.gtag = gtag;
      // @ts-ignore
      gtag('js', new Date());
      // @ts-ignore
      gtag('config', TRACKING_CONFIG.googleAnalyticsId);
      console.log(`%c[Google Analytics] Inicializado com ID: ${TRACKING_CONFIG.googleAnalyticsId}`, 'color: #10b981;');
    } catch (e) {
      console.error('[Google Analytics] Erro ao carregar script:', e);
    }
  }

  // Dispara o PageView inicial
  trackEvent('PageView', {
    url_path: window.location.pathname,
    traffic_source: isPaid ? 'pago' : 'organico',
    campaign: isPaid ? 'campanha_evento' : 'busca_direta_ou_social'
  });
};

// Dispara eventos personalizados para os canais de rastreamento instalados
export const trackEvent = (eventName: string, params: Record<string, any> = {}) => {
  if (typeof window === 'undefined') return;

  const isPaid = isPaidTrafficRoute();
  const mergedParams = {
    ...params,
    traffic_source: isPaid ? 'pago' : 'organico',
    campaign: isPaid ? 'campanha_evento' : 'busca_direta_ou_social',
    timestamp: new Date().toISOString()
  };

  // Log no Console para Depuração Fácil pelo Usuário/Media Buyer
  console.log(
    `%c[Evento Rastreamento] 🎯 ${eventName}`,
    'background: #1e293b; color: #34d399; padding: 3px 8px; border-radius: 4px; font-weight: bold;',
    mergedParams
  );

  // Dispara no Meta Pixel se ativo
  // @ts-ignore
  if (window.fbq) {
    // Mapeia eventos comuns para os nomes padrões do Meta
    let fbEventName = eventName;
    if (eventName === 'PageView') fbEventName = 'PageView';
    if (eventName === 'InitiateCheckout') fbEventName = 'InitiateCheckout';
    if (eventName === 'Lead') fbEventName = 'Lead';

    // @ts-ignore
    window.fbq('track', fbEventName, mergedParams);
  }

  // Dispara no Google Analytics se ativo
  // @ts-ignore
  if (window.gtag) {
    // @ts-ignore
    window.gtag('event', eventName, mergedParams);
  }

  // Dispara um CustomEvent para o depurador visual do site
  const customEvent = new CustomEvent('pixel_event_fired', {
    detail: { eventName, params: mergedParams }
  });
  window.dispatchEvent(customEvent);
};
