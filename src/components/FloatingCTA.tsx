import React, { useState, useEffect } from 'react';
import { ArrowRight, Flame, ShieldCheck } from 'lucide-react';

interface FloatingCTAProps {
  onCtaClick: () => void;
}

export const FloatingCTA: React.FC<FloatingCTAProps> = ({ onCtaClick }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show floating CTA after user scrolls down past 450px
      if (window.scrollY > 450) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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
                1º Lote Ativo
              </span>
              <span className="text-xs text-slate-400 font-medium">
                07 de Novembro • 100% Online no Zoom
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 mt-0.5">
              Por apenas <strong className="text-amber-400 font-extrabold text-sm sm:text-base">R$ 49,90 à vista</strong> • Inclui as 3 Aulas Imediatas
            </p>
          </div>
        </div>

        <div className="w-full sm:w-auto flex items-center gap-3">
          <button
            type="button"
            onClick={onCtaClick}
            id="btn-floating-cta"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 sm:px-8 py-3 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-amber-500/25 transition-all hover:scale-105 active:scale-95 whitespace-nowrap animate-pulse-glow"
          >
            <span>Garantir Meu Ingresso</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
