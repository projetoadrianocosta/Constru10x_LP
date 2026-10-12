import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import { LOTS } from '../lib/lots/config';
import { formatLotDay } from '../lib/lots/helpers';
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

  const nextLot = LOTS.find((l) => lot.lot !== null && l.number === lot.lot + 1);
  const remaining = lot.endsAt ? Math.max(0, msUntilLotEnd(lot.endsAt, now)) : 0;

  const totalSeconds = Math.floor(remaining / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const ordinal = lot.ordinalLabel ?? '';

  let message: React.ReactNode;
  if (!lot.isActive) {
    message = 'Inscrições encerradas';
  } else if (nextLot) {
    message = (
      <>
        {ordinal} vira em <strong className="font-black">{formatLotDay(nextLot.start)}</strong>
      </>
    );
  } else {
    message = (
      <>
        {ordinal}: inscrições encerram em <strong className="font-black">{formatLotDay(lot.endsAt!)}</strong>
      </>
    );
  }

  return (
    <div
      role="status"
      className="sticky top-0 z-50 w-full bg-red-600 text-white shadow-lg shadow-red-950/40"
    >
      <div className="max-w-6xl mx-auto px-3 py-2 flex items-center justify-center gap-2.5 sm:gap-3 text-[11px] sm:text-sm font-bold uppercase tracking-wide">
        <Clock className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" aria-hidden="true" />
        {lot.isActive && (
          <>
            <span
              className="font-mono tabular-nums normal-case tracking-normal bg-black/20 px-2 py-0.5 rounded-md whitespace-nowrap"
              aria-label="Tempo restante do lote"
            >
              {days > 0 && <>{pad(days)}d </>}
              {pad(hours)}:{pad(minutes)}:{pad(seconds)}
            </span>
          </>
        )}
        <span className="self-stretch w-px bg-white/60 my-0.5" aria-hidden="true" />
        <span className="leading-tight">{message}</span>
      </div>
    </div>
  );
};
