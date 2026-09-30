import { useSyncExternalStore } from 'react';
import { LOTS, type LotConfig } from './config';
import { getCurrentLot, getLotStatusFrom, type CurrentLot, type LotStatus } from './helpers';
import { getSimulatedNow } from './simulation';

const CHECK_INTERVAL_MS = 15_000;

const compute = (): CurrentLot => getCurrentLot(getSimulatedNow() ?? new Date());

let snapshot: CurrentLot = compute();
const listeners = new Set<() => void>();
let timer: ReturnType<typeof setInterval> | undefined;

function refresh() {
  const next = compute();
  // Só troca o snapshot (e re-renderiza) quando o lote vigente muda.
  if (next.lot !== snapshot.lot || next.hasNotStarted !== snapshot.hasNotStarted) {
    snapshot = next;
    listeners.forEach((listener) => listener());
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) {
    refresh();
    timer = setInterval(refresh, CHECK_INTERVAL_MS);
    document.addEventListener('visibilitychange', refresh);
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', refresh);
    }
  };
}

const getSnapshot = () => snapshot;

/** Lote vigente, atualizado automaticamente quando a data vira (sem precisar recarregar a página). */
export function useCurrentLot(): CurrentLot {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

export interface LotWithStatus extends LotConfig {
  status: LotStatus;
}

/** Todos os lotes com o status atual (completed | active | upcoming). */
export function useLotStatuses(): LotWithStatus[] {
  const current = useCurrentLot();
  return LOTS.map((lot) => ({ ...lot, status: getLotStatusFrom(lot.number, current) }));
}
