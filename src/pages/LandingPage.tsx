import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  ShieldCheck, 
  Flame, 
  Clock, 
  PlayCircle, 
  Calendar, 
  Award, 
  Users, 
  HelpCircle, 
  Sparkles, 
  ChevronDown, 
  Lock, 
  Building2, 
  Instagram, 
  Zap, 
  Compass, 
  Check, 
  ChevronRight,
  TrendingUp,
  DollarSign,
  Briefcase,
  Play
} from 'lucide-react';
import { 
  EVENT_DETAILS, 
  TICKET_LOTS, 
  SCHEDULE_BLOCKS, 
  TESTIMONIALS, 
  FAQS,
  OFFER_VALUES,
  OFFER_TOTAL_VALUE,
  formatBRL
} from '../data/eventData';
import { RevenueCalculator } from '../components/RevenueCalculator';
import { BuyButton } from '../components/BuyButton';
import { LotsTimeline } from '../components/LotsTimeline';
import { FloatingCTA } from '../components/FloatingCTA';
import { useCurrentLot } from '../lib/lots/useCurrentLot';
import { LOTS } from '../lib/lots/config';
import { formatLotDay } from '../lib/lots/helpers';
import { bootTracking, trackPageView, trackViewContent } from '../lib/meta/events';
import adrianoImg from '../assets/images/regenerated_image_1790213488705.webp';

interface LandingPageProps {
  /** 'paid' = rota /constru10x (campanhas). Mesma página, com ViewContent. */
  trafficSource: 'organic' | 'paid';
}

export default function LandingPage({ trafficSource }: LandingPageProps) {
  const lot = useCurrentLot();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    bootTracking();
    trackPageView();
    if (trafficSource === 'paid') trackViewContent(lot);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ordinal = lot.ordinalLabel ?? '';
  const nextLot = LOTS.find((l) => lot.lot !== null && l.number === lot.lot + 1);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#090b0e] text-[#F3F4F6] relative selection:bg-amber-400 selection:text-slate-950">

      {/* HERO SECTION */}
      <section className="relative pt-10 pb-16 sm:pt-16 sm:pb-24 overflow-hidden bg-radial-gradient">
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
        
        <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
          
          {/* Destaque rápido */}
          <div className="animate-tag text-amber-300 text-[13px] sm:text-[15px] font-semibold uppercase tracking-wide leading-snug mb-16 sm:mb-20">
            <span className="block tag-shine">Para engenheiros, arquitetos</span>
            <span className="block tag-shine">e construtoras</span>
          </div>

          {/* Headline */}
          <h1 
            style={{ width: '960px', maxWidth: '100%', fontFamily: "'Montserrat', 'Plus Jakarta Sans', sans-serif", fontWeight: 900 }}
            className="text-[min(9.4vw,42px)] sm:text-4xl md:text-[52px] lg:text-[68px] font-black uppercase text-white text-glow-white leading-[1.12] tracking-tight mb-7 sm:mb-8 max-w-5xl mx-auto"
          >
            <span className="block sm:inline">Você vai</span>{' '}
            <span className="block sm:inline">aumentar o seu</span>{' '}
            <span className="block sm:inline text-amber-400 text-glow-amber">faturamento</span>{' '}
            <span className="block sm:inline text-amber-400 text-glow-amber">em até 10x</span>
          </h1>

          {/* Subheadline */}
          <p className="text-[17px] sm:text-lg md:text-xl text-white font-medium leading-[1.7] text-pretty mb-16 sm:mb-[75px] max-w-2xl mx-auto">
            Com o passo a passo que me faz <span className="text-amber-400 font-semibold text-glow-amber">faturar<br />+ de 1M de reais todos os anos</span>. E na imersão Constru 10x eu vou te entregar esse plano pronto. Para você iniciar ainda esse ano com <span className="text-amber-400 font-semibold text-glow-amber">projetos maiores e mais previsibilidade sobre as suas vendas</span>.
          </p>

          {/* Big CTA Group */}
          <div className="flex flex-col items-center gap-6 mb-5 w-full max-w-2xl mx-auto">
            {/* Urgência: virada do lote */}
            <div className="flex items-center justify-center gap-1.5 text-xs sm:text-sm text-slate-300 font-semibold mb-3">
              <Flame className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" />
              <span>
                {!lot.isActive
                  ? 'Inscrições encerradas'
                  : nextLot
                    ? <>O {ordinal.toLowerCase()} vai virar em <span className="text-amber-400 font-bold">{formatLotDay(nextLot.start)}</span>, garanta a sua participação!</>
                    : <>Último lote: as inscrições encerram em <span className="text-amber-400 font-bold">{formatLotDay(lot.endsAt!)}</span>, garanta a sua participação!</>}
              </span>
            </div>

            {/* CTA do topo: rola até a seção de oferta (não vai direto ao checkout) */}
            <a
              href="#oferta"
              id="hero-cta-button"
              className="w-full sm:w-auto sm:whitespace-nowrap shrink-0 px-5 sm:px-12 py-4.5 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-[15px] sm:text-base md:text-lg leading-tight text-center uppercase tracking-wide rounded-2xl shadow-xl shadow-amber-500/25 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2.5 animate-pulse-glow no-underline"
            >
              <span>{lot.isActive ? `GARANTIR MEU INGRESSO${lot.price ? ` POR ${lot.price}` : ''}` : 'INSCRIÇÕES ENCERRADAS'}</span>
              <ArrowRight className="w-4.5 h-4.5 sm:w-5 h-5 text-slate-950 shrink-0" />
            </a>

            {/* Data do evento */}
            <div className="text-slate-200 text-[min(2.7vw,12px)] sm:text-[12px] font-semibold uppercase leading-snug text-center whitespace-nowrap -mt-3">
              Dia 07 de Novembro, online e ao vivo das 10 às 17h
            </div>
          </div>


        </div>
      </section>

      {/* SEÇÃO VISOR / TICKER REVELAÇÃO (MOVIMENTOS INFINITOS E CRUZADOS) */}
      <section className="relative h-28 sm:h-36 overflow-hidden bg-[#090b0e] z-20 flex items-center justify-center border-y border-slate-900">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black pointer-events-none z-30" />
        
        {/* Ribbon container to hold both overlapping banners */}
        <div className="absolute w-full h-full flex items-center justify-center overflow-hidden">
          
          {/* Gold Banner - Tilting Right (positive rotation) */}
          <div className="absolute w-[120%] py-2.5 sm:py-3.5 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-slate-950 font-black tracking-widest text-xs uppercase shadow-[0_10px_30px_rgba(0,0,0,0.5)] transform rotate-[2.5deg] z-10 border-y border-amber-300/40">
            <div className="overflow-hidden w-full">
              <div className="animate-marquee-left flex whitespace-nowrap gap-16 items-center">
                {Array(12).fill(null).map((_, i) => (
                  <div key={i} className="flex items-center gap-3 shrink-0 font-sans text-xs sm:text-sm font-black tracking-widest">
                    <span>IMERSÃO CONSTRU 10X</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-5 h-5 shrink-0">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <line x1="17" y1="7" x2="7" y2="17" />
                      <polyline points="10 7 17 7 17 14" />
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Dark Banner - Tilting Left (negative rotation) */}
          <div className="absolute w-[120%] py-3 sm:py-4 bg-[#11141d] text-white font-extrabold tracking-widest text-xs uppercase shadow-[0_15px_35px_rgba(0,0,0,0.7)] transform -rotate-[2.5deg] z-20 border-y border-slate-800">
            <div className="overflow-hidden w-full">
              <div className="animate-marquee-right flex whitespace-nowrap gap-16 items-center">
                {Array(12).fill(null).map((_, i) => (
                  <div key={i} className="flex items-center gap-3 shrink-0 font-sans text-xs sm:text-sm font-black tracking-widest text-slate-100">
                    <span>IMERSÃO CONSTRU 10X</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-5 h-5 text-amber-400 shrink-0">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <line x1="17" y1="7" x2="7" y2="17" />
                      <polyline points="10 7 17 7 17 14" />
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SEÇÃO 2 — DATA E O QUE VOCÊ VAI SAIR COM */}
      <section className="py-16 sm:py-24 bg-[#0d1017] border-y border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3.5 py-1 rounded-full border border-amber-500/30 mb-3 inline-block">
              Plano de Crescimento 2027
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Dia 07 de novembro, ao vivo, das 10 às 17h
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-3 max-w-2xl mx-auto">
              Ao participar da Imersão Constru10x, você terá nas mãos um plano de crescimento que vai mudar seu ano de 2027:
            </p>
          </div>

          {/* 3 caixas de destaque (máx 2 linhas cada) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-[#121620] border-2 border-slate-800 hover:border-amber-400/40 rounded-2xl p-6 transition-all shadow-lg flex flex-col">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 border border-amber-400/30 flex items-center justify-center font-black text-sm mb-4">
                1
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                <strong>Posicionamento de Alto Padrão:</strong> Saiba como se posicionar e migrar definitivamente para o mercado de alto padrão e ser pago pelo valor que gera, sem disputar por preço.
              </p>
            </div>

            <div className="bg-[#121620] border-2 border-slate-800 hover:border-amber-400/40 rounded-2xl p-6 transition-all shadow-lg flex flex-col">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 border border-amber-400/30 flex items-center justify-center font-black text-sm mb-4">
                2
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                <strong>Captação Multicanal:</strong> Domine as 6 formas de captação ativa de clientes de alto padrão para gerar demanda previsível, sem depender de indicações ou sorte.
              </p>
            </div>

            <div className="bg-[#121620] border-2 border-slate-800 hover:border-amber-400/40 rounded-2xl p-6 transition-all shadow-lg flex flex-col">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 border border-amber-400/30 flex items-center justify-center font-black text-sm mb-4">
                3
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                <strong>Script de Fechamento:</strong> Domine o script de 5 etapas que já me gerou +1 milhão de faturamento para você vender e negociar garantindo o fechamento.
              </p>
            </div>
          </div>

          {/* Linha complementar */}
          <div className="text-center p-4 bg-[#121620]/40 border border-slate-800/80 rounded-2xl max-w-3xl mx-auto">
            <p className="text-xs sm:text-sm text-slate-400 font-semibold">
              Conteúdo 100% prático, com espaço para tirar dúvidas ao vivo. <span className="text-amber-400">Atenção: o evento não terá replay.</span>
            </p>
          </div>
        </div>
      </section>

      {/* SEÇÃO 4 — PARA QUEM É */}
      <section id="para-quem-e" className="py-16 sm:py-24 bg-[#0d1017] border-y border-slate-800 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#121620] border-2 border-amber-500/40 rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold shrink-0">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                A IMERSÃO CONSTRU10X É PARA ENGENHEIROS, ARQUITETOS E CONSTRUTORAS
              </h3>
            </div>

            <ul className="space-y-4 text-xs sm:text-sm text-slate-200">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span>Quer ser reconhecido pelo valor que entrega — não comparado a qualquer orçamento mais barato</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span>Sonha em ter mais tempo livre com a família, sem precisar trabalhar 14 horas por dia</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span>Deseja fechar menos contratos, com tickets muito maiores, sem brigar por centavos com concorrente</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span>Quer previsibilidade de faturamento, sem depender da sorte ou da indicação de terceiros</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* SEÇÃO 5 — OS DOIS CAMINHOS */}
      <section className="py-16 sm:py-24 bg-[#0c0f16] border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3.5 py-1 rounded-full border border-amber-500/30 mb-3 inline-block">
              Mudança de Chave
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              EXISTEM DOIS CAMINHOS PARA QUEM TRABALHA COM OBRAS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Caminho 1: O Tradicional da Sobrevivência */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#141822] border border-red-500/25 relative flex flex-col justify-between">
              <div>
                <div className="text-xs font-black uppercase tracking-wider text-red-400 mb-2">
                  Caminho 1 • O Padrão Comum
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Vender Projeto Isolado e Disputar por Preço
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  Você estuda anos, monta o melhor cálculo, passa a semana no canteiro e cobra R$ 3k a R$ 5k por um projeto. O cliente te compara com qualquer um e pede desconto. Quando você fecha, trabalha 14 horas por dia e, ao final do mês, quase não sobrou lucro real.
                </p>
              </div>
              <div className="space-y-2.5 text-xs text-red-300/90 font-medium border-t border-slate-800 pt-4 mt-2">
                <div className="flex items-center gap-2">✕ Refém de indicação sem controle de quando virá o próximo</div>
                <div className="flex items-center gap-2">✕ Não conhece a margem líquida real após custos e retrabalho</div>
                <div className="flex items-center gap-2">✕ Medo de falar em valores altos nas reuniões comerciais</div>
              </div>
            </div>

            {/* Caminho 2: O Método Constru10x */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#182338] to-[#121927] border-2 border-amber-400 shadow-2xl relative flex flex-col justify-between">
              <div>
                <div className="text-xs font-black uppercase tracking-wider text-amber-400 mb-2">
                  Caminho 2 • O Método Constru10x
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Vende alto valor e é indispensável
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-6">
                  Você se posiciona como um gestor que protege o bolso do cliente gerando dezenas de milhares de reais de economia em materiais e prazos. Seu orçamento é ancorado na economia gerada, fecha menos clientes com tickets muito maiores.
                </p>
              </div>
              <div className="space-y-2.5 text-xs text-emerald-300 font-medium border-t border-amber-500/20 pt-4 mt-2">
                <div className="flex items-center gap-2">✓ Clientes que pagam pelo valor e pela tranquilidade</div>
                <div className="flex items-center gap-2">✓ Reunião de 5 etapas com taxa de conversão acima de 60%</div>
                <div className="flex items-center gap-2">✓ Processo previsível de captação ativa sem depender da sorte</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 6 — QUEM É O ADRIANO */}
      <section id="quem-e-adriano" className="py-16 sm:py-24 bg-[#0c0f16] border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Foto Real de Adriano Costa */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="w-full max-w-sm overflow-hidden rounded-2xl border-2 border-amber-400/40 bg-gradient-to-b from-[#151a24] to-[#0c0f14] shadow-2xl">
                <img 
                  src={adrianoImg} 
                  alt="Eng. Adriano Costa" 
                  className="w-full h-auto object-cover object-top transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>

            {/* Conteúdo Bio */}
            <div className="lg:col-span-7">
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
                Prazer, Adriano Costa.
              </h2>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                <p>
                  Engenheiro Civil de formação, inspetor-chefe do CREA em sua região e subcoordenador estadual do Colégio de Representantes Institucionais.
                </p>
                <p>
                  Conheci a falência em 2022 após aumentos brutais de insumos na pandemia, vendi minha casa e recomecei do zero. Sem escritório físico e apenas R$ 16.000 investidos em microeventos e posicionamento no digital, fechei +R$ 560.000 em contratos de gestão e consultoria de obras, ultrapassando mais de R$ 1 milhão em faturamento.
                </p>
              </div>

              {/* Bloco de números (destaque) */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                <div className="p-3.5 rounded-xl bg-[#121620] border border-slate-800">
                  <span className="text-xs text-slate-400 block mb-0.5 uppercase tracking-wide">Investimento:</span>
                  <span className="text-base sm:text-lg font-black text-white font-mono block">R$ 16.000</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#121620] border border-slate-800">
                  <span className="text-xs text-slate-400 block mb-0.5 uppercase tracking-wide">Contratos Fechados:</span>
                  <span className="text-base sm:text-lg font-black text-emerald-400 font-mono block">R$ 560.000</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#121620] border border-slate-800">
                  <span className="text-xs text-slate-400 block mb-0.5 uppercase tracking-wide">Retorno sobre Investimento:</span>
                  <span className="text-base sm:text-lg font-black text-amber-400 font-mono block">35 vezes (ROI)</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#121620] border border-slate-800">
                  <span className="text-xs text-slate-400 block mb-0.5 uppercase tracking-wide">Comunidade:</span>
                  <span className="text-base sm:text-lg font-black text-white font-mono block">+170k no Instagram</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SEÇÃO 7 — PROVA SOCIAL / CASES */}
      <section id="resultados" className="py-16 sm:py-24 bg-[#090b0e] relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Dezenas de alunos implementaram o método
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2">
              E eu quero te ajudar a ter resultados como esses também.
            </p>
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {TESTIMONIALS.map((test) => (
              <div 
                key={test.id} 
                className="bg-[#111620] border border-slate-800 hover:border-amber-400/40 rounded-2xl p-5 flex flex-col justify-between transition-all hover:translate-y-[-2px] shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] uppercase font-black tracking-wider bg-blue-500/15 text-blue-300 px-2.5 py-0.5 rounded-full border border-blue-500/30">
                      {test.tag}
                    </span>
                    <span className="text-[11px] text-slate-400">{test.location}</span>
                  </div>
                  <h4 className="font-extrabold text-base text-white mb-0.5">{test.name}</h4>
                  <span className="text-xs text-amber-400 block mb-3">{test.role}</span>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    "{test.story}"
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 bg-[#0c0f16] -mx-5 -mb-5 p-4 rounded-b-2xl">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-sans">
                    {test.metricLabel}:
                  </span>
                  <span className="text-base font-black text-amber-400 font-mono">
                    {test.metricValue}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <BuyButton
              location="depoimentos"
              label={(l) => `GARANTIR VAGA NA IMERSÃO • ${l.ordinalLabel?.toUpperCase()}${l.price ? ` POR ${l.price}` : ''}`}
              iconClassName="w-4 h-4"
              className="px-8 py-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm uppercase tracking-wider rounded-xl shadow-xl transition-all hover:scale-105 active:scale-95 inline-flex items-center gap-2"
            />
          </div>
        </div>
      </section>

      {/* SEÇÃO 8 — SIMULADOR DE FATURAMENTO TÉCNICO */}
      <section className="py-16 sm:py-24 bg-[#090b0e] border-t border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevenueCalculator />
        </div>
      </section>

      {/* SEÇÃO 9 — OFERTA / LOTE VIGENTE */}
      <section id="oferta" className="py-16 sm:py-24 bg-[#0c0f16] border-y border-slate-800 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Selo */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3.5 py-1 rounded-full border border-amber-500/30 mb-3 inline-block">
              {lot.isActive ? `${ordinal.toUpperCase()} • ATIVO` : 'INSCRIÇÕES ENCERRADAS'}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              GARANTA SEU INGRESSO AGORA
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2">
              Imersão Online Constru10x
            </p>
          </div>

          {/* Lotes: atual em destaque, encerrados riscados, próximos neutros */}
          <LotsTimeline />

          {/* Offer Pricing Card */}
          <div className="max-w-2xl mx-auto rounded-3xl p-6 sm:p-10 bg-gradient-to-b from-[#182338] via-[#121724] to-[#0e121a] border-2 border-amber-400 shadow-2xl shadow-amber-500/20 relative">

            {/* Cabeçalho do card */}
            <div className="text-center mb-7">
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-amber-400/80">Imersão Online</span>
              <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-2">Imersão Constru10x</h3>
              <span className="block text-xs sm:text-sm font-black uppercase tracking-widest text-amber-300 mt-3">
                Para engenheiros, arquitetos e construtoras
              </span>
            </div>

            {/* Entregáveis (valor de referência à direita, quando houver) */}
            <ul className="mb-8 border-t border-slate-800">
              <li className="flex items-start gap-3 py-3.5 border-b border-slate-800">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span className="block text-sm sm:text-base font-bold text-white">Ingresso individual para o evento ao vivo</span>
                  <span className="block text-xs text-slate-400 mt-0.5">1 dia intensivo no Zoom • 07 de novembro de 2026 • das 10h às 17h</span>
                </div>
                <span className="shrink-0 font-mono text-sm text-slate-500 line-through">{formatBRL(OFFER_VALUES.ticket)}</span>
              </li>
              <li className="flex items-start gap-3 py-3.5 border-b border-slate-800">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span className="block text-sm sm:text-base font-bold text-white">Grupo oficial no WhatsApp</span>
                  <span className="block text-xs text-slate-400 mt-0.5">Avisos, materiais e orientações da imersão</span>
                </div>
              </li>
              <li className="flex items-start gap-3 py-3.5 border-b border-slate-800">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span className="block text-sm sm:text-base font-bold text-white">7 dias de garantia incondicional</span>
                  <span className="block text-xs text-slate-400 mt-0.5">Se não valer à pena, basta mandar uma mensagem pedindo o reembolso</span>
                </div>
              </li>
            </ul>

            {/* Ancoragem de preço: valor total, preço do lote vigente e % de desconto */}
            <div className="text-center mb-8">
              {lot.isActive && lot.priceValue !== undefined && (
                <span className="block text-sm text-slate-400 mb-1">
                  Valor total: <span className="font-mono line-through text-slate-500">{formatBRL(OFFER_TOTAL_VALUE)}</span>
                </span>
              )}
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-6xl sm:text-7xl font-black font-mono text-amber-400 leading-tight uppercase drop-shadow-[0_0_18px_rgba(245,158,11,0.35)]">
                  {lot.isActive ? (lot.price ?? lot.label) : 'ENCERRADO'}
                </span>
                {lot.isActive && lot.price && <span className="text-sm font-bold text-slate-300">à vista</span>}
              </div>
              {lot.isActive && lot.priceValue !== undefined && (
                <span className="inline-block mt-2 text-xs sm:text-sm font-black uppercase tracking-wider bg-amber-400 text-slate-950 px-4 py-1.5 rounded-full shadow-lg shadow-amber-500/25">
                  {Math.round((1 - lot.priceValue / OFFER_TOTAL_VALUE) * 100)}% de desconto
                </span>
              )}
              {lot.isActive && lot.lot !== 3 && (
                <div className="flex items-center justify-center gap-2 mt-4 text-amber-300 text-xs font-bold">
                  <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>Virada de lote em poucas horas</span>
                </div>
              )}
            </div>

            <BuyButton
              location="oferta"
              id="btn-garantir-ingresso"
              label={(l) => `GARANTIR INGRESSO • ${l.ordinalLabel?.toUpperCase()}${l.price ? ` ${l.price} À VISTA` : ''}`}
              iconClassName="w-5 h-5 text-slate-950"
              className="w-full py-4.5 px-6 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-base sm:text-lg uppercase tracking-wider rounded-2xl shadow-xl shadow-amber-500/25 transition-transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            />

            <p className="text-[11px] text-center text-slate-400 mt-3">
              Pagamento 100% seguro via Pix ou cartão à vista
            </p>
          </div>

        </div>
      </section>

      {/* SEÇÃO 10 — GARANTIA */}
      <section id="garantia" className="py-16 sm:py-20 bg-[#0d1017]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#121824] via-[#151d2e] to-[#121824] border-2 border-amber-400/40 rounded-3xl p-6 sm:p-10 shadow-2xl flex flex-col sm:flex-row items-center gap-6 sm:gap-8 text-center sm:text-left">
            <div className="w-24 h-24 rounded-2xl bg-amber-400/10 border-2 border-amber-400/50 flex items-center justify-center text-amber-400 shrink-0 shadow-xl">
              <ShieldCheck className="w-14 h-14" />
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-3">
                7 DIAS DE GARANTIA INCONDICIONAL
              </h3>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed mb-4 italic">
                "Eu confio tanto no que vou te ensinar que, se você participar da imersão, e mesmo assim achar que não valeu à pena, eu devolvo o seu dinheiro! Basta me enviar uma mensagem pedindo o seu reembolso. Simples assim."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 11 — FAQ */}
      <section id="faq" className="py-16 sm:py-24 bg-[#090b0e] border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3.5 py-1 rounded-full border border-amber-500/30 mb-3 inline-block">
              Perguntas Frequentes
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              PERGUNTAS FREQUENTES
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx}
                  className="bg-[#111620] border border-slate-800 rounded-2xl overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    id={`faq-toggle-${idx}`}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white hover:text-amber-400 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-amber-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* FAQ CTA */}
          <div className="text-center mt-12">
            <BuyButton
              location="faq"
              label={(l) => `Garantir Meu Ingresso no ${l.ordinalLabel}${l.price ? ` (${l.price} à vista)` : ''}`}
              iconClassName="w-4 h-4"
              className="px-8 py-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm uppercase tracking-wider rounded-xl shadow-xl transition-all hover:scale-105 active:scale-95 inline-flex items-center gap-2"
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 bg-[#06080b] border-t border-slate-800/80 text-xs text-slate-500 text-center pb-24 sm:pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center justify-center gap-2 text-slate-300 font-bold text-sm">
            <span>Adriano Costa Engenheiro</span>
            <span>•</span>
            <span className="text-amber-400">Imersão Constru10x</span>
          </div>
          <p className="max-w-2xl mx-auto text-slate-400">
            Este evento destina-se a engenheiros civis, arquitetos e construtoras interessados em alavancar seu modelo de negócio e faturamento através do método Constru10x.
          </p>
          <p className="text-[11px] text-slate-500">
            © 2026 Adriano Costa. Todos os direitos reservados.
          </p>
          <nav className="flex items-center justify-center gap-3 text-[11px] text-slate-400" aria-label="Links legais">
            <a href="/politica-de-privacidade" className="hover:text-amber-400 underline underline-offset-2 transition-colors">
              Política de Privacidade
            </a>
            <span aria-hidden="true">•</span>
            <a href="/exclusao-de-dados" className="hover:text-amber-400 underline underline-offset-2 transition-colors">
              Exclusão de Dados
            </a>
          </nav>
        </div>
      </footer>

      {/* FLOATING CTA BAR */}
      <FloatingCTA />

    </div>
  );
}
