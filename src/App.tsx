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
  Briefcase
} from 'lucide-react';
import { 
  EVENT_DETAILS, 
  TICKET_LOTS, 
  PRE_LAUNCH_CLASSES, 
  SCHEDULE_BLOCKS, 
  TESTIMONIALS, 
  FAQS 
} from './data/eventData';
import { EditableImage } from './components/EditableImage';
import { RevenueCalculator } from './components/RevenueCalculator';
import { BonusModal } from './components/BonusModal';
import { CheckoutModal } from './components/CheckoutModal';
import { FloatingCTA } from './components/FloatingCTA';
import { PreLaunchClass } from './types';
import { initTracking, trackEvent } from './utils/pixel';

export default function App() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedBonus, setSelectedBonus] = useState<PreLaunchClass | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    initTracking();
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleOpenCheckout = () => {
    setIsCheckoutOpen(true);
    trackEvent('InitiateCheckout', {
      value: 79.90,
      currency: 'BRL',
      content_name: 'Ingresso Imersão Constru 10x',
      content_category: 'Imersão'
    });
  };

  return (
    <div className="min-h-screen bg-[#090b0e] text-[#F3F4F6] relative selection:bg-amber-400 selection:text-slate-950">

      {/* HERO SECTION (HIGH CONVERSION DIRECT RESPONSE) */}
      <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 overflow-hidden bg-radial-gradient">
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
          {/* Category Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-950/60 border border-blue-500/40 text-blue-300 font-bold uppercase tracking-wider mb-6 backdrop-blur-sm">
            <Building2 className="w-4 h-4 text-blue-400" />
            <span className="text-[12px]">Imersão Online para Engenheiros, Arquitetos e Construtores</span>
          </div>

          {/* Main Headline with ONLY Blue and Yellow accents */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[53.4px] font-black text-white leading-[1.14] tracking-tight mb-6 max-w-4xl mx-auto">
            ESTÁ NA HORA DE PARAR DE <span className="text-white">COBRAR PELO QUE FAZ</span> E SER ESCOLHIDO PELO <span className="text-amber-400">VALOR QUE ENTREGA</span>.
          </h1>

          {/* Core Promise Subtitle with Constru 10x */}
          <p className="text-base sm:text-lg md:text-xl text-slate-300 font-medium leading-relaxed mb-8 max-w-3xl mx-auto">
            Na imersão <strong className="text-amber-400 font-bold">Constru10x</strong>, você vai aprender como construir com qualidade, segurança e custo baixo - e como multiplicar em 10x o seu faturamento com o método que já fechou mais de <strong className="text-white font-bold">560 mil em contratos</strong>.
          </p>

          {/* Key Event Badges Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-8 max-w-2xl w-full mx-auto text-center">
            <div className="p-4 rounded-xl bg-[#12161f] border border-slate-800 flex flex-col items-center justify-center">
              <div className="flex items-center justify-center gap-2 text-amber-400 text-xs font-bold uppercase mb-1">
                <Calendar className="w-4 h-4" />
                <span>Data Marcada</span>
              </div>
              <span className="text-sm font-extrabold text-white block">07 de Novembro de 2026</span>
              <span className="text-[11px] text-slate-400">Sábado</span>
            </div>

            <div className="p-4 rounded-xl bg-[#12161f] border border-slate-800 flex flex-col items-center justify-center">
              <div className="flex items-center justify-center gap-2 text-[#ffb900] text-xs font-bold uppercase mb-1">
                <Clock className="w-4 h-4 text-[#ffb900]" />
                <span className="text-[#ffb900]">Horário</span>
              </div>
              <span className="text-sm font-extrabold text-white block">10h às 17h</span>
              <span className="text-[11px] text-slate-400">100% Online no Zoom</span>
            </div>

            <div className="p-4 rounded-xl bg-[#12161f] border border-slate-800 flex flex-col items-center justify-center">
              <div className="flex items-center justify-center gap-2 text-amber-400 text-xs font-bold uppercase mb-1">
                <Sparkles className="w-4 h-4" />
                <span>Bônus Imediato</span>
              </div>
              <span className="text-sm font-extrabold text-white block">3 Aulas Liberadas</span>
              <span className="text-[11px] text-slate-400">Acesso na confirmação</span>
            </div>
          </div>

          {/* Big CTA Group */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-5 w-full">
            <button
              type="button"
              onClick={handleOpenCheckout}
              id="hero-cta-button"
              className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-base sm:text-lg uppercase tracking-wider rounded-2xl shadow-xl shadow-amber-500/25 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 animate-pulse-glow"
            >
              <span>Quero participar da Imersão por R$79,90</span>
              <ArrowRight className="w-5 h-5 text-slate-950" />
            </button>
          </div>

          {/* Urgency subtext */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400 text-center">
            <span className="flex items-center gap-1.5 text-amber-300 font-semibold">
              <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
              82% das vagas preenchidas (subindo de lote em breve)
            </span>
            <span className="hidden sm:inline text-slate-700">•</span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Garantia Incondicional Risco Zero
            </span>
          </div>
        </div>
      </section>

      {/* 4. SECTION: SIM, A IMERSÃO É PARA VOCÊ */}
      <section id="para-quem-e" className="py-16 sm:py-24 bg-[#0d1017] border-y border-slate-800 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {/* For Who: AMBER */}
            <div className="bg-[#121620] border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                  <Check className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-[30px] font-black text-white leading-tight">A IMERSÃO É PARA VOCÊ QUE</h3>
                  <span className="text-[14px] text-amber-400 font-semibold">Engenheiros, Arquitetos e Construtores</span>
                </div>
              </div>

              <ul className="space-y-4 text-xs sm:text-sm text-slate-200">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Quer sair da guerra dos preços</strong>, ser mais valorizado e ter mais tempo com a família.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Profissionais que querem faturar 10x mais no próximo ano</strong>, trabalha com obra, projeto ou os dois e quer parar de enriquecer o patrão.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Faz tudo sozinho e não sobra tempo:</strong> Técnico de manhã, orçamentista à tarde e financeiro à noite, precisando migrar urgentemente para uma postura comercial estratégica.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Vive no ciclo montanha-russa da indicação:</strong> Um mês fecha contrato bom, no seguinte a agenda zera e você entra em ansiedade por não ter um processo previsível de captação.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Quer atender clientes de médio e alto padrão:</strong> Fechar negócios com quem paga pelo valor, tranquilidade e inteligência construtiva, e não pela tabela mais barata.</span>
                </li>
              </ul>
            </div>
          </div>


        </div>
      </section>

      {/* 5. SECTION: O RESULTADO QUE VOCÊ PODE ALCANÇAR (PROVAS E NÚMEROS REAIS DA TRANSCRIÇÃO) */}
      <section id="resultados" className="py-16 sm:py-24 bg-[#090b0e] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              O RESULTADO QUE VOCÊ PODE ALCANÇAR
            </h2>
          </div>

          {/* Big Adriano Case Box */}
          <div className="bg-gradient-to-br from-[#131926] via-[#10141f] to-[#0a0d13] border-2 border-amber-400/50 rounded-3xl p-6 sm:p-10 mb-12 shadow-2xl relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-4 flex flex-col items-center">
                <div className="w-full max-w-xs">
                  <EditableImage
                    id="case-adriano-bh"
                    defaultLabel="Adriano Costa em Belo Horizonte"
                    aspectRatio="portrait"
                    className="border border-amber-400/30"
                  />
                </div>
                <span className="text-xs text-amber-400 font-bold mt-3">Eng. Adriano Costa</span>
                <span className="text-[11px] text-slate-400">Três Pontas (MG) → Alto Padrão de BH</span>
              </div>

              <div className="lg:col-span-8">
                <h3 className="text-2xl sm:text-3xl font-black text-white mb-3 leading-tight">
                  Saiu de uma cidade de 40 mil habitantes para gerar <span className="text-amber-400">R$ 560.000 em contratos</span> com ROI de 35x
                </h3>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                  Sem escritório físico e apenas <strong className="text-white">R$ 16.000</strong> investidos em microeventos e posicionamento no digital, fechou <strong className="text-amber-400 font-bold">+R$ 560.000 em contratos</strong> de gestão e consultoria de obras.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono">
                  <div className="p-3 rounded-xl bg-[#090b0e] border border-slate-800">
                    <span className="text-xs text-slate-400 block uppercase font-sans">Investimento:</span>
                    <span className="text-lg sm:text-xl font-black text-slate-300">R$ 16.000</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#090b0e] border border-slate-800">
                    <span className="text-xs text-slate-400 block uppercase font-sans">Contratos Fechados:</span>
                    <span className="text-lg sm:text-xl font-black text-emerald-400">R$ 560.000</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#090b0e] border border-slate-800">
                    <span className="text-xs text-slate-400 block uppercase font-sans">Retorno sobre Investimento:</span>
                    <span className="text-lg sm:text-xl font-black text-amber-400">35 Vezes (ROI)</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#090b0e] border border-slate-800">
                    <span className="text-xs text-slate-400 block uppercase font-sans">Audiência Qualificada:</span>
                    <span className="text-lg sm:text-xl font-black text-white">+150k no IG</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial Cards (Real mentees from the transcript) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
        </div>
      </section>

      {/* 6. SECTION: ENTENDA O RACIOCÍNIO (OS DOIS CAMINHOS) */}
      <section className="py-16 sm:py-24 bg-[#0c0f16] border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3.5 py-1 rounded-full border border-amber-500/30 mb-3 inline-block">
              Mudança de Chave
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              EXISTEM DOIS CAMINHOS PARA QUEM TRABALHA COM OBRAS
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2">
              A diferença entre continuar esgotado ou finalmente colher o resultado da sua profissão.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Camino 1: O Tradicional da Sobrevivência */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#141822] border border-red-500/25 relative">
              <div className="text-xs font-black uppercase tracking-wider text-red-400 mb-2">
                Caminho 1 • O Padrão Comum
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Vender Projeto Isolado e Disputar por Preço
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                Você estuda anos, monta o melhor cálculo, passa a semana no canteiro e cobra R$ 3k a R$ 5k por um projeto. O cliente te compara com qualquer um que entrega um papel e pede desconto. Quando você fecha, trabalha 14 horas por dia e, ao final do mês, quase não sobrou lucro real.
              </p>
              <div className="space-y-2.5 text-xs text-red-300/90 font-medium">
                <div className="flex items-center gap-2">✕ Refém de indicação sem controle de quando virá o próximo</div>
                <div className="flex items-center gap-2">✕ Não conhece a margem líquida real após custos e retrabalho</div>
                <div className="flex items-center gap-2">✕ Medo de falar em valores altos nas reuniões comerciais</div>
              </div>
            </div>

            {/* Camino 2: O Método Constru10x */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#182338] to-[#121927] border-2 border-amber-400 shadow-2xl relative">
              <div className="text-xs font-black uppercase tracking-wider text-amber-400 mb-2">
                Caminho 2 • O Método Constru10x
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Construir com Qualidade, Segurança e Custo Baixo
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-6">
                Você se posiciona como um gestor que protege o bolso do cliente gerando dezenas de milhares de reais de economia em materiais e prazos. Seu orçamento é ancorado na economia gerada, sua reunião tem roteiro de fechamento comprovado e você multiplica seu faturamento fechando menos clientes com tickets muito maiores.
              </p>
              <div className="space-y-2.5 text-xs text-emerald-300 font-medium">
                <div className="flex items-center gap-2">✓ Clientes que pagam pelo valor e pela tranquilidade</div>
                <div className="flex items-center gap-2">✓ Reunião de 5 etapas com taxa de conversão acima de 60%</div>
                <div className="flex items-center gap-2">✓ Processo previsível de captação ativa sem depender da sorte</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. INTERACTIVE REVENUE CALCULATOR */}
      <section className="py-16 sm:py-24 bg-[#090b0e]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevenueCalculator onCtaClick={handleOpenCheckout} />
        </div>
      </section>

      {/* 8. SECTION: CRONOGRAMA DO DIA 07 DE NOVEMBRO (10H ÀS 17H NO ZOOM) */}
      <section id="cronograma" className="py-16 sm:py-24 bg-[#0d1017] border-y border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3.5 py-1 rounded-full border border-amber-500/30 mb-3 inline-block">
              Imersão Online
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              O QUE VOCÊ VAI RECEBER NO DIA 07 DE NOVEMBRO
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2">
              Um dia intensivo 100% online no Zoom, das 10h às 17h (Horário de Brasília).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SCHEDULE_BLOCKS.map((block, idx) => (
              <div 
                key={idx}
                className="bg-[#121620] border border-slate-800 hover:border-amber-400/50 rounded-2xl p-6 sm:p-7 transition-all shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-8 h-8 rounded-lg bg-amber-400/10 text-amber-400 border border-amber-400/30 flex items-center justify-center font-black text-xs font-mono">
                      0{idx + 1}
                    </span>
                    <h3 className="text-lg font-bold text-white leading-snug">{block.title}</h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {block.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Schedule CTA */}
          <div className="text-center mt-10">
            <button
              type="button"
              onClick={handleOpenCheckout}
              className="px-8 py-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm uppercase tracking-wider rounded-xl shadow-xl transition-all hover:scale-105 active:scale-95 inline-flex items-center gap-2"
            >
              <span>Garantir Vaga na Imersão • 1º Lote R$ 79,90 à vista</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 9. SECTION: BÔNUS DE ACESSO IMEDIATO (3 AULAS DESBLOQUEADAS HOJE) */}
      <section id="bonus-imediatos" className="py-16 sm:py-24 bg-[#090b0e] relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              GARANTINDO SEU INGRESSO, VOCÊ RECEBE <span className="text-amber-400">3 AULAS IMEDIATAS</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2">
              Acesse hoje mesmo no seu e-mail e WhatsApp para já começar a preparar o terreno antes do dia 07/11.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {PRE_LAUNCH_CLASSES.map((cls) => (
              <div 
                key={cls.id}
                className="bg-[#121620] border-2 border-slate-800 hover:border-amber-400/60 rounded-2xl p-6 flex flex-col justify-between transition-all shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full">
                      {cls.badge}
                    </span>
                  </div>

                  <div className="w-12 h-12 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center mb-4">
                    <PlayCircle className="w-7 h-7" />
                  </div>

                  <h3 className="font-extrabold text-base text-white mb-2 leading-snug">
                    {cls.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {cls.summary}
                  </p>
                </div>
              </div>
            ))}
          </div>


        </div>
      </section>

      {/* 10. SECTION: QUEM É ADRIANO COSTA (COM ESPAÇO EDITÁVEL PARA IMAGEM) */}
      <section id="quem-e-adriano" className="py-16 sm:py-24 bg-[#0c0f16] border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Bio Photo with editable feature */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="w-full max-w-sm">
                <EditableImage
                  id="bio-adriano-foto"
                  defaultLabel="Engenheiro Adriano Costa - Foto Oficial"
                  aspectRatio="portrait"
                  className="border-2 border-amber-400/40 shadow-2xl"
                />
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Perfil Oficial Instagram: <strong className="text-white">@engadrianocosta</strong></span>
              </div>
            </div>

            {/* Bio Content */}
            <div className="lg:col-span-7">
              <span className="text-xs font-black uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3.5 py-1 rounded-full border border-amber-500/30 mb-3 inline-block">
                Seu Mentor e Instrutor
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
                QUEM É O ENGENHEIRO ADRIANO COSTA?
              </h2>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                <p>
                  Engenheiro Civil de formação, inspetor-chefe do CREA em sua região e subcoordenador estadual do Colégio de Representantes Institucionais.
                </p>
                <p>
                  Natural de Boa Esperança e morador de Três Pontas (cidade de 60 mil habitantes no sul de Minas), Adriano viveu na pele o desespero de cobrar R$ 5.000 num projeto e ser mandado embora. Conheceu a falência em 2022 após aumentos brutais de insumos na pandemia, vendeu sua casa e recomeçou do zero.
                </p>
                <p>
                  Sem abrir escritório físico em Belo Horizonte e sem morar na capital, Adriano descobriu a equação de posicionamento que o levou a fechar <strong>mais de R$ 560 mil em contratos em BH com apenas R$ 16 mil investidos</strong>, ultrapassando mais de R$ 1 milhão faturados e construindo uma comunidade de mais de 150 mil seguidores.
                </p>
                <p>
                  Hoje, ensina engenheiros, arquitetos e construtores a romperem o teto do faturamento através do método <strong>Constru 10x</strong>, cobrando pelo valor real que entregam.
                </p>
              </div>

              {/* Bio Highlights Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800">
                <div className="p-3 rounded-xl bg-[#121620] border border-slate-800">
                  <span className="text-xl font-black text-amber-400 font-mono block">+150K</span>
                  <span className="text-[11px] text-slate-400">Seguidores no Instagram</span>
                </div>
                <div className="p-3 rounded-xl bg-[#121620] border border-slate-800">
                  <span className="text-xl font-black text-white font-mono block">CREA-MG</span>
                  <span className="text-[11px] text-slate-400">Inspetor-Chefe Ativo</span>
                </div>
                <div className="p-3 rounded-xl bg-[#121620] border border-slate-800 col-span-2 sm:col-span-1">
                  <span className="text-xl font-black text-emerald-400 font-mono block">35x ROI</span>
                  <span className="text-[11px] text-slate-400">Em Microeventos de Fechamento</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 11. SECTION: A OFERTA EXCLUSIVA (1º LOTE + AVISO DE VIRADA + O QUE RECEBE + RESUMO) */}
      <section id="oferta" className="py-16 sm:py-24 bg-[#090b0e] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3.5 py-1 rounded-full border border-amber-500/30 mb-3 inline-block">
              Condição Especial de 1º Lote
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              GARANTA SEU INGRESSO AGORA
            </h2>
          </div>

          {/* Central 1st Lot Card */}
          <div className="max-w-2xl mx-auto rounded-3xl p-8 sm:p-10 bg-gradient-to-b from-[#182338] via-[#121724] to-[#0e121a] border-2 border-amber-400 shadow-2xl shadow-amber-500/20 relative mb-10">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider px-5 py-1.5 rounded-full shadow-lg whitespace-nowrap">
              1º LOTE EXCLUSIVO • ATIVO
            </div>

            <div className="text-center mb-6">
              <span className="text-xs uppercase font-extrabold tracking-wider text-amber-400 block mb-2">
                Imersão Online Constru 10x
              </span>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-5xl sm:text-6xl font-black text-white font-mono">
                  R$ 79,90
                </span>
                <span className="text-sm font-bold text-slate-300">à vista</span>
              </div>
              <div className="inline-flex items-center gap-2 mt-3 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
                <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>Virada de lote em poucas horas</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#0a0d14] border border-slate-800 mb-8 space-y-3.5 text-xs sm:text-sm text-slate-200">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Ingresso Individual para o Evento ao Vivo:</strong> 1 dia intensivo no Zoom, dia 07 de Novembro de 2026, das 10h às 17h.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>3 Aulas Bônus de Liberação Imediata:</strong> Para você já começar a aplicar o método Constru 10x hoje mesmo.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Roteiro da Reunião em 5 Etapas & Scripts:</strong> O passo a passo para fechar contratos de alto valor sem disputar por preço.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Garantia Incondicional Risco Zero:</strong> Se não valer à pena, basta mandar uma mensagem pedindo o reembolso.</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleOpenCheckout}
              id="btn-garantir-lote-1"
              className="w-full py-4 px-6 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-base sm:text-lg uppercase tracking-wider rounded-2xl shadow-xl shadow-amber-500/25 transition-transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>GARANTIR INGRESSO • 1º LOTE R$ 79,90 À VISTA</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <p className="text-[11px] text-center text-slate-400 mt-3 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Pagamento 100% seguro via Pix ou Cartão à vista • Acesso imediato às 3 aulas
            </p>
          </div>


        </div>
      </section>

      {/* 12. SECTION: GARANTIA BLINDADA RISCO ZERO (EXACT USER COPY) */}
      <section id="garantia" className="py-16 sm:py-20 bg-[#0d1017] border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#121824] via-[#151d2e] to-[#121824] border-2 border-amber-400/40 rounded-3xl p-6 sm:p-10 shadow-2xl flex flex-col sm:flex-row items-center gap-6 sm:gap-8 text-center sm:text-left">
            <div className="w-24 h-24 rounded-2xl bg-amber-400/10 border-2 border-amber-400/50 flex items-center justify-center text-amber-400 shrink-0 shadow-xl">
              <ShieldCheck className="w-14 h-14" />
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30 mb-2 inline-block">
                Garantia Incondicional
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-3">
                RISCO ZERO: MINHA PALAVRA PESSOAL
              </h3>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed mb-4 italic">
                "Eu confio tanto no que vou te ensinar que, se você participar da Imersão, assistir às três aulas, e mesmo assim achar que não valeu à pena eu devolvo o seu dinheiro! Basta me enviar uma mensagem pedindo o seu reembolso. Simples assim."
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-amber-300 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Eng. Adriano Costa — Devolução imediata e sem burocracia</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 13. SECTION: PERGUNTAS FREQUENTES (FAQ) */}
      <section id="faq" className="py-16 sm:py-24 bg-[#090b0e]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3.5 py-1 rounded-full border border-amber-500/30 mb-3 inline-block">
              Tire Todas as Suas Dúvidas
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              PERGUNTAS FREQUENTES
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              Respostas diretas e transparentes sobre o evento e o acesso imediato.
            </p>
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

          {/* Bottom FAQ CTA */}
          <div className="text-center mt-12">
            <p className="text-sm text-slate-300 mb-4">
              Ainda tem alguma dúvida específica? Garanta seu 1º Lote com garantia incondicional de reembolso.
            </p>
            <button
              type="button"
              onClick={handleOpenCheckout}
              className="px-8 py-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm uppercase tracking-wider rounded-xl shadow-xl transition-all hover:scale-105 active:scale-95 inline-flex items-center gap-2"
            >
              <span>Garantir Meu Ingresso no 1º Lote (R$ 79,90 à vista)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 14. FOOTER */}
      <footer className="py-12 bg-[#06080b] border-t border-slate-800/80 text-xs text-slate-500 text-center pb-24 sm:pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center justify-center gap-2 text-slate-300 font-bold text-sm">
            <span>Adriano Costa Engenheiro</span>
            <span>•</span>
            <span className="text-amber-400">Imersão Constru 10x</span>
          </div>
          <p className="max-w-2xl mx-auto text-slate-400">
            Este evento destina-se a engenheiros civis, arquitetos e construtores interessados em alavancar seu modelo de negócio e faturamento através do método Constru 10x.
          </p>
          <p className="text-[11px] text-slate-500">
            © 2026 Adriano Costa. Todos os direitos reservados.
          </p>
        </div>
      </footer>

      {/* 15. FLOATING CTA BAR */}
      <FloatingCTA onCtaClick={handleOpenCheckout} />

      {/* 16. BONUS DETAIL MODAL */}
      <BonusModal
        bonus={selectedBonus}
        onClose={() => setSelectedBonus(null)}
        onSelectLot={handleOpenCheckout}
      />

      {/* 17. CHECKOUT / REGISTRATION MODAL */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />


    </div>
  );
}
