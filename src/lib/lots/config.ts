/**
 * Fonte única de verdade dos lotes da Imersão Constru 10X.
 *
 * Datas em horário de Brasília (America/Sao_Paulo), no formato "YYYY-MM-DDTHH:mm:ss".
 * NÃO use offset/UTC aqui: a comparação é feita com o relógio de São Paulo (ver helpers.ts).
 */

export const LOT_TIMEZONE = 'America/Sao_Paulo';

export type LotNumber = 1 | 2 | 3;

export interface LotConfig {
  number: LotNumber;
  /** Usado em eventos de rastreamento. Ex.: "Lote 2" */
  label: string;
  /** Usado nos textos da página. Ex.: "2º Lote" */
  ordinalLabel: string;
  /** Primeiro instante do lote (horário de Brasília) */
  start: string;
  /** Último instante do lote, inclusive (horário de Brasília) */
  end: string;
  checkoutUrl: string;
  /** Preço exibido na página. Deixe indefinido enquanto o valor do lote não for definido. */
  price?: string;
  /** Valor numérico (BRL) enviado nos eventos Meta. */
  priceValue?: number;
}

const HOTMART_BASE = 'https://pay.hotmart.com/C107836809U';

export const LOTS: readonly LotConfig[] = [
  {
    number: 1,
    label: 'Lote 1',
    ordinalLabel: '1º Lote',
    start: '2026-10-02T00:00:00',
    end: '2026-10-11T23:59:59',
    checkoutUrl: HOTMART_BASE,
    price: 'R$ 27',
    priceValue: 27,
  },
  {
    number: 2,
    label: 'Lote 2',
    ordinalLabel: '2º Lote',
    start: '2026-10-12T00:00:00',
    end: '2026-10-25T23:59:59',
    checkoutUrl: `${HOTMART_BASE}?off=tpgpi5nu`,
    price: 'R$ 49',
    priceValue: 49,
  },
  {
    number: 3,
    label: 'Lote 3',
    ordinalLabel: '3º Lote',
    start: '2026-10-26T00:00:00',
    end: '2026-11-07T23:59:59',
    checkoutUrl: `${HOTMART_BASE}?off=wstcl8sr`,
    price: 'R$ 79',
    priceValue: 79,
  },
];

export const CLOSED_CTA_LABEL = 'INSCRIÇÕES ENCERRADAS';
