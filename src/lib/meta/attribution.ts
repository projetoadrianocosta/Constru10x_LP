/**
 * Captura e preserva UTMs, fbclid, _fbp e _fbc.
 * Única fonte de atribuição do site: Pixel, CAPI e links de checkout leem daqui.
 */

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;
const STORAGE_KEY = 'c10x_attribution';
const STORAGE_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const FBC_COOKIE_TTL_S = 90 * 24 * 60 * 60;

export type AttributionParams = Partial<Record<(typeof UTM_KEYS)[number] | 'fbclid', string>>;

interface StoredAttribution {
  params: AttributionParams;
  capturedAt: number;
}

function readCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.split('; ').find((row) => row.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : undefined;
}

function readStored(): StoredAttribution | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const stored = JSON.parse(raw) as StoredAttribution;
    if (!stored?.params || Date.now() - stored.capturedAt > STORAGE_TTL_MS) return null;
    return stored;
  } catch {
    return null;
  }
}

function readUrlParams(): AttributionParams {
  const search = new URLSearchParams(window.location.search);
  const found: AttributionParams = {};
  for (const key of [...UTM_KEYS, 'fbclid'] as const) {
    const value = search.get(key);
    if (value) found[key] = value;
  }
  return found;
}

/**
 * Lê UTMs/fbclid da URL atual. Se houver parâmetros novos, eles substituem os guardados
 * (last-touch); sem parâmetros na URL, mantém os anteriores. Também grava o cookie _fbc
 * quando há fbclid, no formato oficial `fb.1.<timestamp>.<fbclid>`.
 */
export function captureAttribution(): AttributionParams {
  if (typeof window === 'undefined') return {};

  const fresh = readUrlParams();

  if (Object.keys(fresh).length === 0) return readStored()?.params ?? {};

  const capturedAt = Date.now();
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ params: fresh, capturedAt } satisfies StoredAttribution));
  } catch {
    // storage indisponível (modo privado etc.): segue só com os parâmetros da URL atual
  }

  if (fresh.fbclid && !(readCookie('_fbc') ?? '').endsWith(`.${fresh.fbclid}`)) {
    document.cookie = `_fbc=fb.1.${capturedAt}.${fresh.fbclid}; max-age=${FBC_COOKIE_TTL_S}; path=/; SameSite=Lax`;
  }

  return fresh;
}

/** Parâmetros da URL atual (se houver) ou os guardados. Funciona mesmo antes do captureAttribution rodar. */
export function getAttribution(): AttributionParams {
  if (typeof window === 'undefined') return {};
  const fromUrl = readUrlParams();
  return Object.keys(fromUrl).length > 0 ? fromUrl : (readStored()?.params ?? {});
}

/** Cookie _fbp (criado pelo Pixel). Indefinido enquanto o Pixel ainda não carregou. */
export function getFbp(): string | undefined {
  return readCookie('_fbp');
}

/** Cookie _fbc; se ausente mas houver fbclid guardado, monta o valor no formato oficial. */
export function getFbc(): string | undefined {
  const cookie = readCookie('_fbc');
  if (cookie) return cookie;
  const stored = readStored();
  return stored?.params.fbclid ? `fb.1.${stored.capturedAt}.${stored.params.fbclid}` : undefined;
}

/** Acrescenta UTMs/fbclid à URL de checkout sem duplicar parâmetros que ela já tenha. */
export function appendAttribution(url: string): string {
  try {
    const target = new URL(url);
    for (const [key, value] of Object.entries(getAttribution())) {
      if (value && !target.searchParams.has(key)) target.searchParams.set(key, value);
    }
    return target.toString();
  } catch {
    return url;
  }
}
