import React from 'react';
import { X, PlayCircle, CheckCircle2, Lock, Sparkles, ArrowRight } from 'lucide-react';
import { PreLaunchClass } from '../types';

interface BonusModalProps {
  bonus: PreLaunchClass | null;
  onClose: () => void;
  onSelectLot: () => void;
}

export const BonusModal: React.FC<BonusModalProps> = ({ bonus, onClose, onSelectLot }) => {
  if (!bonus) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-[#111620] border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto"
        id={`modal-bonus-${bonus.id}`}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-[11px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 px-3 py-1 rounded-full flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            Bônus Imediato #{bonus.id}
          </span>
          <span className="text-xs text-slate-400 font-mono">Duração: {bonus.duration}</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-white leading-snug mb-2">
          {bonus.title}
        </h3>
        <p className="text-sm font-semibold text-amber-300 mb-6">
          {bonus.subtitle}
        </p>

        {/* Video Player Preview Mockup */}
        <div className="relative aspect-video rounded-2xl bg-[#090b0e] border border-slate-800 flex flex-col items-center justify-center p-6 text-center mb-6 overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-amber-400/90 text-slate-950 flex items-center justify-center mb-3 shadow-xl group-hover:scale-110 transition-transform">
              <PlayCircle className="w-9 h-9" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-white bg-black/60 px-3 py-1 rounded-full border border-white/10">
              Liberada Instantaneamente ao Garantir o Ingresso
            </span>
          </div>
        </div>

        {/* Deep Script Summary */}
        <div className="space-y-4 text-sm text-slate-300 leading-relaxed mb-6">
          <h4 className="font-bold text-white uppercase tracking-wider text-xs border-b border-slate-800 pb-2">
            Visão Geral e Conteúdo Desta Aula:
          </h4>
          <p>{bonus.summary}</p>

          <h4 className="font-bold text-white uppercase tracking-wider text-xs border-b border-slate-800 pb-2 pt-2">
            O Que Você Vai Aprender Imediatamente:
          </h4>
          <ul className="space-y-2.5">
            {bonus.takeaways.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* How this connects to the Live Event */}
        <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-600/30 mb-6 text-xs text-blue-200">
          <strong className="block text-blue-300 mb-1 font-bold">Por que assistir antes do dia 07 de Setembro?</strong>
          Estas 3 aulas preparam o seu alinhamento mental e diagnóstico para que você chegue na imersão ao vivo já sabendo onde seu negócio está travado e aproveite 100% dos scripts de fechamento e métodos de economia de obra do Adriano.
        </div>

        {/* Action */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between pt-2 border-t border-slate-800">
          <div className="text-xs text-slate-400">
            <span className="text-amber-400 font-bold block">1º Lote: R$ 79,90</span>
            Acesso liberado no seu e-mail e WhatsApp
          </div>
          <button
            type="button"
            onClick={() => {
              onClose();
              onSelectLot();
            }}
            className="w-full sm:w-auto px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all"
          >
            <span>Desbloquear Aula e Garantir Ingresso</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
