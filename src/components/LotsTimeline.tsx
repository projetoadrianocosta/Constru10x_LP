import React from 'react';
import { formatLotDay } from '../lib/lots/helpers';
import { useLotStatuses } from '../lib/lots/useCurrentLot';

/** Lotes 1, 2 e 3 com destaque automático: atual, encerrado (riscado) ou próximo. */
export const LotsTimeline: React.FC = () => {
  const lots = useLotStatuses();
  const nextUpcomingNumber = lots.find((lot) => lot.status === 'upcoming')?.number;

  return (
    <div className="grid grid-cols-3 gap-2.5 sm:gap-4 max-w-2xl mx-auto mb-8" aria-label="Lotes do ingresso">
      {lots.map((lot) => {
        const isActive = lot.status === 'active';
        const isCompleted = lot.status === 'completed';

        const box = isActive
          ? 'border-2 border-amber-400 bg-gradient-to-b from-[#182338] to-[#101520] shadow-xl shadow-amber-500/20 scale-105 z-10'
          : isCompleted
            ? 'border border-slate-800 bg-[#0e121a] opacity-50'
            : 'border border-slate-700/80 bg-[#121620] opacity-80';

        const badge = isActive
          ? { text: 'LOTE ATUAL', cls: 'bg-amber-400 text-slate-950' }
          : isCompleted
            ? { text: 'ENCERRADO', cls: 'bg-slate-800 text-slate-400' }
            : lot.number === nextUpcomingNumber
              ? { text: 'PRÓXIMO LOTE', cls: 'bg-slate-800 text-slate-300' }
              : null;

        return (
          <div
            key={lot.number}
            data-lot={lot.number}
            data-status={lot.status}
            className={`relative rounded-2xl px-2 py-4 sm:px-4 sm:py-5 text-center transition-all ${box}`}
          >
            <span className="block text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-400 mb-1">
              {isCompleted ? '' : isActive ? 'Disponível' : 'Em breve'}
              {isCompleted && <>&nbsp;</>}
            </span>
            <span
              className={`block text-base sm:text-xl font-black uppercase ${
                isActive ? 'text-amber-400' : isCompleted ? 'text-slate-500 line-through' : 'text-slate-300'
              }`}
            >
              {lot.label}
            </span>
            <span className={`block text-[11px] sm:text-xs mt-1 ${isCompleted ? 'text-slate-600 line-through' : 'text-slate-400'}`}>
              {formatLotDay(lot.start)} a {formatLotDay(lot.end)}
            </span>
            {lot.price && (
              <span
                className={`block text-sm sm:text-base font-black font-mono mt-1 ${
                  isActive ? 'text-white' : isCompleted ? 'text-slate-600 line-through' : 'text-slate-300'
                }`}
              >
                {lot.price}
              </span>
            )}
            {badge && (
              <span
                className={`inline-block mt-2 text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${badge.cls}`}
              >
                {badge.text}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};
