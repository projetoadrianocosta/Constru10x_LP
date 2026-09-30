import { LOTS, LOT_TIMEZONE, type LotConfig, type LotNumber } from './config';

export type LotStatus = 'completed' | 'active' | 'upcoming';

export interface CurrentLot {
  /** Número do lote vigente, ou null quando as inscrições já encerraram */
  lot: LotNumber | null;
  label: string | null;
  ordinalLabel: string | null;
  /** Checkout do lote vigente, ou null quando as inscrições encerraram */
  checkoutUrl: string | null;
  price?: string;
  priceValue?: number;
  /** Início/fim do lote vigente (horário de Brasília) */
  startsAt: string | null;
  endsAt: string | null;
  /** 'active' enquanto há lote à venda, 'closed' depois do último lote */
  status: 'active' | 'closed';
  /** Há um lote à venda agora (inclui o Lote 1 antes do lançamento) */
  isActive: boolean;
  /** Todos os lotes já terminaram */
  hasEnded: boolean;
  /** Ainda não chegou o início do lote vigente (só acontece no Lote 1, antes de 02/10) */
  hasNotStarted: boolean;
}

const pad = (n: string | number) => String(n).padStart(2, '0');

const saoPauloFormatter = new Intl.DateTimeFormat('en-CA', {
  timeZone: LOT_TIMEZONE,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hourCycle: 'h23',
});

/** Converte um instante para o relógio de São Paulo, no formato "YYYY-MM-DDTHH:mm:ss". */
export function toSaoPauloClock(date: Date): string {
  const parts: Record<string, string> = {};
  for (const { type, value } of saoPauloFormatter.formatToParts(date)) parts[type] = value;
  return `${parts.year}-${pad(parts.month)}-${pad(parts.day)}T${pad(parts.hour)}:${pad(parts.minute)}:${pad(parts.second)}`;
}

/** "2026-10-02T00:00:00" -> "02/10" */
export function formatLotDay(clock: string): string {
  return `${clock.slice(8, 10)}/${clock.slice(5, 7)}`;
}

function findCurrentLotConfig(nowClock: string): LotConfig | null {
  // Os lotes são contíguos: o vigente é o primeiro que ainda não terminou.
  // Antes do início do Lote 1 isso também resulta no Lote 1 (compra não é bloqueada).
  return LOTS.find((lot) => nowClock <= lot.end) ?? null;
}

export function getCurrentLot(now: Date = new Date()): CurrentLot {
  const nowClock = toSaoPauloClock(now);
  const config = findCurrentLotConfig(nowClock);

  if (!config) {
    return {
      lot: null,
      label: null,
      ordinalLabel: null,
      checkoutUrl: null,
      startsAt: null,
      endsAt: null,
      status: 'closed',
      isActive: false,
      hasEnded: true,
      hasNotStarted: false,
    };
  }

  return {
    lot: config.number,
    label: config.label,
    ordinalLabel: config.ordinalLabel,
    checkoutUrl: config.checkoutUrl,
    price: config.price,
    priceValue: config.priceValue,
    startsAt: config.start,
    endsAt: config.end,
    status: 'active',
    isActive: true,
    hasEnded: false,
    hasNotStarted: nowClock < config.start,
  };
}

/** Status de um lote a partir do lote vigente já calculado. */
export function getLotStatusFrom(number: LotNumber, current: CurrentLot): LotStatus {
  if (current.lot === null) return 'completed';
  if (number < current.lot) return 'completed';
  if (number === current.lot) return 'active';
  return 'upcoming';
}

export function getLotStatus(number: LotNumber, now: Date = new Date()): LotStatus {
  return getLotStatusFrom(number, getCurrentLot(now));
}
