import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CLOSED_CTA_LABEL } from '../lib/lots/config';
import type { CurrentLot } from '../lib/lots/helpers';
import { useCurrentLot } from '../lib/lots/useCurrentLot';
import { appendAttribution } from '../lib/meta/attribution';
import { trackInitiateCheckout } from '../lib/meta/events';

interface BuyButtonProps {
  /** Identifica de qual CTA veio o clique (vai no evento InitiateCheckout) */
  location: string;
  /** Texto do botão; pode depender do lote vigente */
  label: string | ((lot: CurrentLot) => string);
  /** Classes do botão ativo (visual original de cada CTA) */
  className: string;
  id?: string;
  iconClassName?: string;
  /** Mostra a seta depois do texto (padrão: sim) */
  showArrow?: boolean;
}

// `!` (important) garante que o visual desabilitado vença as classes do CTA original (gradiente, sombra, animação).
const CLOSED_CLASSES =
  'cursor-not-allowed select-none bg-slate-800! bg-none! text-slate-500! border border-slate-700 shadow-none! animate-none! hover:bg-slate-800! hover:scale-100! active:scale-100! justify-center';

/**
 * Único CTA de compra do site. Lê o lote vigente e aponta para o checkout correspondente
 * (com UTMs/fbclid preservados). Com as inscrições encerradas vira um botão desabilitado.
 */
export const BuyButton: React.FC<BuyButtonProps> = ({
  location,
  label,
  className,
  id,
  iconClassName = 'w-4 h-4 shrink-0',
  showArrow = true,
}) => {
  const lot = useCurrentLot();
  const text = typeof label === 'function' ? label(lot) : label;

  if (!lot.isActive || !lot.checkoutUrl) {
    return (
      <button
        type="button"
        disabled
        aria-disabled="true"
        id={id}
        data-cta-location={location}
        className={`${className} ${CLOSED_CLASSES}`}
      >
        <span>{CLOSED_CTA_LABEL}</span>
      </button>
    );
  }

  // Link normal: o tracking é disparado no clique (síncrono, sem esperar resposta) e o navegador segue ao checkout.
  return (
    <a
      href={appendAttribution(lot.checkoutUrl)}
      id={id}
      data-cta-location={location}
      onClick={() => trackInitiateCheckout(lot, location)}
      className={`${className} no-underline`}
    >
      <span>{text}</span>
      {showArrow && <ArrowRight className={iconClassName} />}
    </a>
  );
};
