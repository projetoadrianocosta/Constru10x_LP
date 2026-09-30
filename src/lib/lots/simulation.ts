/**
 * Simulação de datas para testar os lotes SOMENTE em desenvolvimento (`npm run dev`).
 *
 * Em produção `import.meta.env.DEV` é substituído por `false` no build, então este código
 * é removido do bundle e nenhum parâmetro de URL consegue alterar o lote.
 *
 * Uso (em dev):
 *   /?__lot=before   -> antes de 02/10 (Lote 1)
 *   /?__lot=1|2|3    -> meio do Lote 1, 2 ou 3
 *   /?__lot=closed   -> após 07/11 (inscrições encerradas)
 *   /?__now=2026-10-12T00:00:00  -> qualquer instante (horário de Brasília)
 */

const SIMULATED_CLOCKS: Record<string, string> = {
  before: '2026-09-30T12:00:00',
  '1': '2026-10-05T12:00:00',
  '2': '2026-10-15T12:00:00',
  '3': '2026-10-30T12:00:00',
  closed: '2026-11-08T12:00:00',
};

export function getSimulatedNow(): Date | null {
  if (!import.meta.env.DEV || typeof window === 'undefined') return null;

  const params = new URLSearchParams(window.location.search);
  const clock = params.get('__now') ?? SIMULATED_CLOCKS[params.get('__lot') ?? ''];
  if (!clock || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(clock)) return null;

  // Interpreta o relógio de Brasília como UTC-3 (Brasil não tem horário de verão desde 2019).
  const date = new Date(`${clock}-03:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}
