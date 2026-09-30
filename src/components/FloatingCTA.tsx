import React, { useState, useEffect } from 'react';
import { Flame } from 'lucide-react';
import { BuyButton } from './BuyButton';
import { useCurrentLot } from '../lib/lots/useCurrentLot';

export const FloatingCTA: React.FC = () => {
  const lot = useCurrentLot();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // A barra só aparece quando nenhum outro CTA da página está visível na tela.
    const CTA_SELECTOR = '[data-cta-location]:not([data-cta-location="barra-flutuante"]), #hero-cta-button';

    const update = () => {
      const anyCtaVisible = Array.from(document.querySelectorAll(CTA_SELECTOR)).some((el) => {
        const rect = el.getBoundingClientRect();
        return rect.height > 0 && rect.bottom > 0 && rect.top < window.innerHeight;
      });
      setIsVisible(!anyCtaVisible);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      id="floating-cta-bar"
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#0c0f15]/95 border-t border-amber-500/30 backdrop-blur-xl shadow-[0_-10px_35px_rgba(0,0,0,0.7)] py-3 px-4 transition-transform duration-300 transform translate-y-0"
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="hidden sm:flex p-2 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-400">
            <Flame className="w-5 h-5 animate-bounce text-amber-400" />
          </div>
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 px-2 py-0.5 rounded">
                {lot.isActive ? `${lot.ordinalLabel} Ativo` : 'Inscrições Encerradas'}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                07 de Novembro • 100% Online no Zoom
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 mt-0.5">
              {lot.isActive && lot.price
                ? <>Por apenas <strong className="text-amber-400 font-extrabold text-sm sm:text-base">{lot.price} à vista</strong></>
                : 'Imersão Online Constru10x'}
            </p>
          </div>
        </div>

        <div className="w-full sm:w-auto flex items-center gap-3">
          <BuyButton
            location="barra-flutuante"
            id="btn-floating-cta"
            label="Garantir Meu Ingresso"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 sm:px-8 py-3 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-amber-500/25 transition-all hover:scale-105 active:scale-95 whitespace-nowrap animate-pulse-glow"
          />
        </div>
      </div>
    </div>
  );
};
