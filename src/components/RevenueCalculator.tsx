import React, { useState } from 'react';
import { Calculator, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { BuyButton } from './BuyButton';

export const RevenueCalculator: React.FC = () => {
  const [currentTicket, setCurrentTicket] = useState<number>(5000);
  const [projectsPerMonth, setProjectsPerMonth] = useState<number>(2);

  const monthlyCurrent = currentTicket * projectsPerMonth;
  const annualCurrent = monthlyCurrent * 12;

  // Card B = 5x the result of Card A, reflecting the ticket size gain
  const monthlyProjected = monthlyCurrent * 5;
  const annualProjected = monthlyProjected * 12;
  const growthMultiplier = "5.0";

  return (
    <div className="glass-card glass-card-warm rounded-3xl p-6 sm:p-10 relative overflow-hidden" id="calculadora-constru10x">
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Calculator className="w-4 h-4" />
            <span>Simulador de Faturamento Técnico</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Descubra Quanto Dinheiro Você Está <span className="text-amber-400">Deixando na Mesa</span>
          </h3>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Veja a comparação entre continuar cobrando por projeto isolado VS. a metodologia Constru10x.
          </p>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 glass-card glass-card-flat p-5 sm:p-6 rounded-2xl mb-8">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Valor médio que você cobra por projeto:
              </label>
              <span className="font-mono text-base font-bold text-amber-400">
                R$ {currentTicket.toLocaleString('pt-BR')}
              </span>
            </div>
            <input
              type="range"
              min="1500"
              max="25000"
              step="500"
              value={currentTicket}
              onChange={(e) => setCurrentTicket(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-1">
              <span>R$ 1.500</span>
              <span>R$ 12.000</span>
              <span>R$ 25.000</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Projetos fechados por mês:
              </label>
              <span className="font-mono text-base font-bold text-amber-400">
                {projectsPerMonth} {projectsPerMonth === 1 ? 'projeto' : 'projetos'}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="8"
              step="1"
              value={projectsPerMonth}
              onChange={(e) => setProjectsPerMonth(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-1">
              <span>1 projeto</span>
              <span>4 projetos</span>
              <span>8 projetos</span>
            </div>
          </div>
        </div>

        {/* Comparison Result Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8">
          {/* Current reality */}
          <div className="p-6 rounded-2xl glass-card glass-card-danger glass-card-flat relative">
            <div className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase tracking-wider mb-2">
              <AlertTriangle className="w-4 h-4" />
              <span>Seu Cenário Tradicional Atual</span>
            </div>
            <p className="text-xs text-slate-400 mb-4">Competindo por preço, refém de indicação e afogado no operacional:</p>
            <div className="space-y-3 font-mono">
              <div>
                <span className="text-[11px] text-slate-400 uppercase block">Faturamento Mensal Estimado:</span>
                <span className="text-2xl font-black text-slate-200">
                  R$ {monthlyCurrent.toLocaleString('pt-BR')}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 uppercase block">Faturamento Anual (Bruto):</span>
                <span className="text-xl font-bold text-slate-400">
                  R$ {annualCurrent.toLocaleString('pt-BR')}
                </span>
              </div>
            </div>
            <ul className="mt-4 pt-4 border-t border-slate-700/60 space-y-1.5 text-xs text-slate-400">
              <li className="flex items-center gap-1.5 text-red-300">✕ Margem líquida espremida por custos ocultos</li>
              <li className="flex items-center gap-1.5 text-red-300">✕ Se parar 15 dias, a renda zera no mês seguinte</li>
            </ul>
          </div>

          {/* Constru10x reality */}
          <div className="p-6 rounded-2xl glass-card glass-card-hot relative">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <TrendingUp className="w-4 h-4 shrink-0" />
                <span>Com o Posicionamento Constru10x</span>
              </div>
              <div className="bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full whitespace-nowrap">
                Potencial {growthMultiplier}x Maior
              </div>
            </div>
            <p className="text-xs text-slate-300 mb-4">Cobrando pelo valor gerado, economia de obra e gestão estratégica:</p>
            <div className="space-y-3 font-mono">
              <div>
                <span className="text-[11px] text-amber-300 uppercase block">Novo Potencial Mensal:</span>
                <span className="text-2xl sm:text-3xl font-black text-amber-400">
                  R$ {monthlyProjected.toLocaleString('pt-BR')}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 uppercase block">Potencial Anual:</span>
                <span className="text-xl font-bold text-white">
                  R$ {annualProjected.toLocaleString('pt-BR')}
                </span>
              </div>
            </div>
            <ul className="mt-4 pt-4 border-t border-amber-500/20 space-y-1.5 text-xs text-slate-300">
              <li className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                Clientes que pagam com satisfação pela economia gerada
              </li>
              <li className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                Menos clientes com tickets até 5x a 10x maiores
              </li>
            </ul>
          </div>
        </div>

        {/* CTA Banner inside calculator */}
        <div className="text-center pt-2">
          <BuyButton
            location="simulador"
            id="btn-calculator-cta"
            label="Quero aprender o método para faturar 10x mais"
            iconClassName="w-5 h-5"
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base sm:text-lg font-black uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl shadow-xl shadow-amber-500/25 transition-all hover:scale-105 active:scale-95 animate-pulse-glow"
          />
        </div>
      </div>
    </div>
  );
};
