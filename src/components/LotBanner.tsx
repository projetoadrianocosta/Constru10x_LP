import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import { formatLotDay, toSaoPauloClock } from '../lib/lots/helpers';
import { useCurrentLot } from '../lib/lots/useCurrentLot';
import { getSimulatedNow } from '../lib/lots/simulation';

const pad = (n: number) => String(n).padStart(2, '0');

/** Milissegundos até o fim do lote (último segundo inclusive, horário de Brasília = UTC-3). */
function msUntilLotEnd(endsAt: string, now: number): number {
  return new Date(`${endsAt}-03:00`).getTime() + 1000 - now;
}

function useNow(): number {
  // Em dev, respeita a simulação de data (?__lot / ?__now) e mantém o relógio andando.
  const [offset] = useState(() => {
    const simulated = getSimulatedNow();
    return simulated ? simulated.getTime() - Date.now() : 0;
  });
  const [now, setNow] = useState(() => Date.now() + offset);

  useEffect(() => {
    const tick = () => setNow(Date.now() + offset);
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [offset]);

  return now;
}

/** Banner fixo no topo: cronômetro e data de virada do lote vigente. Acompanha a troca de lote sozinho. */
export const LotBanner: React.FC = () => {
  const lot = useCurrentLot();
  const now = useNow();

  const remaining = lot.endsAt ? Math.max(0, msUntilLotEnd(lot.endsAt, now)) : 0;

  const totalSeconds = Math.floor(remaining / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  let subtitle = 'Inscrições encerradas';
  if (lot.isActive && lot.endsAt && lot.lot !== null) {
    const isToday = lot.endsAt.slice(0, 10) === toSaoPauloClock(new Date(now)).slice(0, 10);
    const when = isToday ? 'hoje' : `em ${formatLotDay(lot.endsAt)}`;
    subtitle = `O lote ${pad(lot.lot)} encerra ${when} às ${lot.endsAt.slice(11, 13)}h${lot.endsAt.slice(14, 16)}`;
  }

  return (
    <div role="status" className="sticky top-0 z-50 w-full bg-[#e8000e] text-white shadow-lg shadow-red-950/40">
      <div className="max-w-6xl mx-auto px-3 py-2.5 flex items-center justify-center gap-3 sm:gap-5">
        {lot.isActive && (
          <>
            <div className="flex items-center gap-2 sm:gap-3">
              <Clock className="w-6 h-6 sm:w-7 sm:h-7 shrink-0" strokeWidth={1.75} aria-hidden="true" />
              <span
                className="font-black tabular-nums tracking-wider whitespace-nowrap text-base sm:text-xl"
                aria-label="Tempo restante do lote"
              >
                {pad(hours)} : {pad(minutes)} : {pad(seconds)}
              </span>
            </div>
            <span className="self-stretch w-px bg-white/50" aria-hidden="true" />
          </>
        )}
        <div className="leading-tight text-left">
          <p className="font-extrabold text-sm sm:text-base">Garanta a sua participação</p>
          <p className="text-xs sm:text-sm font-normal opacity-95">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};
