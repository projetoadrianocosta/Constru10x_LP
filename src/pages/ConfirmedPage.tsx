import React, { useEffect } from 'react';
import { CheckCircle2, MessageCircle } from 'lucide-react';
import { WhatsAppJoinButton } from '../components/WhatsAppJoinButton';
import { bootTracking, trackPageView, trackViewPurchaseConfirmation } from '../lib/meta/events';

export default function ConfirmedPage() {
  useEffect(() => {
    document.title = 'Compra confirmada | Imersão Constru 10x';
    const robots = document.createElement('meta');
    robots.name = 'robots';
    robots.content = 'noindex, nofollow';
    document.head.appendChild(robots);

    bootTracking();
    trackPageView();
    // Só registra a visualização. Purchase NÃO é disparado aqui (a URL pode ser aberta/recarregada à mão).
    trackViewPurchaseConfirmation();

    return () => robots.remove();
  }, []);

  return (
    <div className="min-h-screen bg-[#090b0e] text-[#F3F4F6] relative flex items-center justify-center px-4 py-16 selection:bg-amber-400 selection:text-slate-950">
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="relative z-10 w-full max-w-xl bg-gradient-to-b from-[#182338] via-[#121724] to-[#0e121a] border-2 border-amber-400 rounded-3xl p-8 sm:p-12 text-center shadow-2xl shadow-amber-500/20">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border-2 border-emerald-500 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <span className="text-xs font-black uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3.5 py-1 rounded-full border border-amber-500/30 inline-block mb-4">
          Imersão Constru 10X
        </span>

        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">Compra confirmada.</h1>
        <p className="text-base sm:text-lg text-amber-300 font-bold mb-4">
          Seu ingresso para a Imersão Constru 10X está garantido.
        </p>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8">
          Entre agora no grupo oficial do WhatsApp para receber avisos, informações, materiais e orientações relacionadas à imersão.
        </p>

        {/* Progresso da inscrição */}
        <div className="w-full flex flex-col gap-1.5 mb-6 text-left">
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-slate-300 font-semibold">Entre no grupo para finalizar</span>
            <span className="text-amber-400 font-bold font-mono">82% concluído</span>
          </div>
          <div
            role="progressbar"
            aria-valuenow={82}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Progresso da inscrição"
            className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800"
          >
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full shadow-[0_0_12px_rgba(245,158,11,0.5)]"
              style={{ width: '82%' }}
            />
          </div>
        </div>

        <WhatsAppJoinButton className="w-full px-6 py-4 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm sm:text-base uppercase tracking-wider rounded-2xl shadow-xl shadow-amber-500/25 transition-all hover:scale-105 active:scale-95 inline-flex items-center justify-center gap-2.5 animate-pulse-glow" />

        <p className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 mt-4">
          <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
          Grupo oficial • Avisos e materiais da imersão
        </p>
      </div>
    </div>
  );
}
