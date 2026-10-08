import React, { useState, useEffect } from 'react';
import { Clock, Flame } from 'lucide-react';

interface CountdownTimerProps {
  targetDate?: string;
  variant?: 'banner' | 'card' | 'minimal';
  headline?: string;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate = "2026-10-26T23:59:59",
  variant = 'card',
  headline = "O 1º LOTE ENCERRA EM 7 DIAS:",
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(targetDate).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const pad = (n: number) => String(n).padStart(2, '0');

  if (variant === 'banner') {
    return (
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 font-bold py-2 px-4 shadow-md">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-1.5 uppercase tracking-wider text-[11px] sm:text-xs">
            <Flame className="w-4 h-4 fill-slate-950 text-slate-950 animate-bounce" />
            <span>1º Lote R$ 79,90 disponível • Restam poucas vagas</span>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-xs sm:text-sm bg-black/15 px-2.5 py-0.5 rounded-md">
            <span>{pad(timeLeft.days)}d</span>:
            <span>{pad(timeLeft.hours)}h</span>:
            <span>{pad(timeLeft.minutes)}m</span>:
            <span>{pad(timeLeft.seconds)}s</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="inline-flex flex-col items-center glass-card glass-card-warm rounded-2xl p-4 sm:p-5">
      <div className="flex items-center gap-2 mb-3 text-amber-400 text-xs sm:text-sm font-bold uppercase tracking-wider">
        <Clock className="w-4 h-4 animate-pulse" />
        <span>{headline}</span>
      </div>
      <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
        <div className="glass-card glass-card-flat rounded-xl px-2 sm:px-4 py-2 min-w-[55px] sm:min-w-[72px]">
          <span className="font-mono text-xl sm:text-2xl font-black text-amber-400 block leading-tight">
            {pad(timeLeft.days)}
          </span>
          <span className="text-[10px] text-slate-400 uppercase tracking-wider">Dias</span>
        </div>
        <div className="glass-card glass-card-flat rounded-xl px-2 sm:px-4 py-2 min-w-[55px] sm:min-w-[72px]">
          <span className="font-mono text-xl sm:text-2xl font-black text-white block leading-tight">
            {pad(timeLeft.hours)}
          </span>
          <span className="text-[10px] text-slate-400 uppercase tracking-wider">Horas</span>
        </div>
        <div className="glass-card glass-card-flat rounded-xl px-2 sm:px-4 py-2 min-w-[55px] sm:min-w-[72px]">
          <span className="font-mono text-xl sm:text-2xl font-black text-white block leading-tight">
            {pad(timeLeft.minutes)}
          </span>
          <span className="text-[10px] text-slate-400 uppercase tracking-wider">Min</span>
        </div>
        <div className="glass-card glass-card-flat rounded-xl px-2 sm:px-4 py-2 min-w-[55px] sm:min-w-[72px]">
          <span className="font-mono text-xl sm:text-2xl font-black text-amber-400 block leading-tight">
            {pad(timeLeft.seconds)}
          </span>
          <span className="text-[10px] text-slate-400 uppercase tracking-wider">Seg</span>
        </div>
      </div>
    </div>
  );
};
