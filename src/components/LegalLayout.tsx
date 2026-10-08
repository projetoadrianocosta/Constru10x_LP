import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { bootTracking, trackPageView } from '../lib/meta/events';

interface LegalLayoutProps {
  title: string;
  updatedAt?: string;
  children: React.ReactNode;
}

/** Estrutura comum das páginas legais (política de privacidade e exclusão de dados). */
export const LegalLayout: React.FC<LegalLayoutProps> = ({ title, updatedAt, children }) => {
  useEffect(() => {
    document.title = `${title} | Imersão Constru 10x`;
    bootTracking();
    trackPageView();
  }, [title]);

  return (
    <div className="min-h-screen bg-black text-[#F3F4F6] selection:bg-amber-400 selection:text-slate-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300 no-underline mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para a página da imersão
        </a>

        <div className="glass-card rounded-3xl p-6 sm:p-10">
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-2">{title}</h1>
          {updatedAt && <p className="text-xs text-slate-400 mb-8">Última atualização: {updatedAt}.</p>}

          <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed [&_h2]:text-lg [&_h2]:sm:text-xl [&_h2]:font-black [&_h2]:text-white [&_h2]:pt-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1.5 [&_a]:text-amber-400 [&_a:hover]:text-amber-300 [&_a]:underline [&_strong]:text-slate-100">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
