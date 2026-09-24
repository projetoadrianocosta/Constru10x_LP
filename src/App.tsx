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
  PRE_LAUNCH_CLASSES, 
  SCHEDULE_BLOCKS, 
  TESTIMONIALS, 
  FAQS 
} from './data/eventData';
import { RevenueCalculator } from './components/RevenueCalculator';
import { BonusModal } from './components/BonusModal';
import { CheckoutModal } from './components/CheckoutModal';
import { FloatingCTA } from './components/FloatingCTA';
import { PreLaunchClass } from './types';
import { initTracking, trackEvent } from './utils/pixel';
import adrianoImg from './assets/images/regenerated_image_1790213488705.webp';
import aula1Img from './assets/images/Aula-1.webp';
import aula2Img from './assets/images/Aula-2.webp';
import aula3Img from './assets/images/Aula-3.webp';

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
      value: 49.90,
      currency: 'BRL',
      content_name: 'Ingresso Imersão Constru 10x',
      content_category: 'Imersão'
    });
  };

  return (
    <div className="min-h-screen bg-[#090b0e] text-[#F3F4F6] relative selection:bg-amber-400 selection:text-slate-950">

      {/* HERO SECTION */}
      <section className="relative pt-10 pb-16 sm:pt-16 sm:pb-24 overflow-hidden bg-radial-gradient">
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
          
          {/* Microcopy */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-950/60 border border-blue-500/40 text-blue-300 font-bold uppercase tracking-wider mb-6 backdrop-blur-sm">
            <Calendar className="w-4 h-4 text-blue-400" />
            <span className="text-[12px]">Dia 07 de Novembro, online e ao vivo das 10 às 17h</span>
          </div>

          {/* Headline */}
          <h1 
            style={{ fontSize: '53px', width: '738px', maxWidth: '100%' }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[53px] font-black text-white leading-[1.14] tracking-tight mb-6 max-w-4xl mx-auto"
          >
            Saiba como aumentar seu <span className="text-amber-400">faturamento</span> em até 10x com o método que já gerou <span className="text-amber-400">+560 mil em contratos</span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg md:text-xl text-slate-300 font-medium leading-relaxed mb-6 max-w-3xl mx-auto">
            Construindo com qualidade, segurança, no menor custo — sem precisar trabalhar 14h por dia.
          </p>

          {/* Destaque rápido */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs sm:text-sm font-bold uppercase tracking-widest mb-8">
            <Users className="w-4 h-4 text-amber-400" />
            <span>Para engenheiros, arquitetos e construtores</span>
          </div>

          {/* Big CTA Group */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-5 w-full">
            <button
              type="button"
              onClick={handleOpenCheckout}
              id="hero-cta-button"
              className="w-full sm:w-auto px-10 py-4.5 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-base sm:text-lg uppercase tracking-wider rounded-2xl shadow-xl shadow-amber-500/25 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 animate-pulse-glow"
            >
              <span>QUERO PARTICIPAR DA IMERSÃO POR R$49,90</span>
              <ArrowRight className="w-5 h-5 text-slate-950" />
            </button>
          </div>

          {/* Urgency and Guarantees below CTA */}
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
                <strong>Posicionamento:</strong> como fazer a transição definitiva para o mercado de alto padrão.
              </p>
            </div>

            <div className="bg-[#121620] border-2 border-slate-800 hover:border-amber-400/40 rounded-2xl p-6 transition-all shadow-lg flex flex-col">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 border border-amber-400/30 flex items-center justify-center font-black text-sm mb-4">
                2
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                <strong>Como gerar dezenas de milhares de reais em economia no canteiro</strong> — e transformar essa economia na maior alavanca de valor dos seus honorários.
              </p>
            </div>

            <div className="bg-[#121620] border-2 border-slate-800 hover:border-amber-400/40 rounded-2xl p-6 transition-all shadow-lg flex flex-col">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 border border-amber-400/30 flex items-center justify-center font-black text-sm mb-4">
                3
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                <strong>O processo de vendas em 5 etapas</strong> para fechar contratos de alto ticket sem disputar por preço.
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

      {/* SEÇÃO 3 — AS 3 AULAS BÔNUS */}
      <section id="bonus-imediatos" className="py-16 sm:py-24 bg-[#090b0e] relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3.5 py-1 rounded-full border border-amber-500/30 mb-3 inline-block">
              Liberação Imediata
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Garantindo seu ingresso, você já recebe <span className="text-amber-400">3 aulas bônus</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2">
              Comece a preparar o terreno antes do evento.
            </p>
          </div>

          {/* 3 Aulas Bônus com Thumbnails */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            
            {/* Aula 1 Card */}
            <div 
              onClick={() => setSelectedBonus(PRE_LAUNCH_CLASSES[0])}
              className="bg-[#121620] border-2 border-slate-800 hover:border-amber-400/60 rounded-2xl overflow-hidden flex flex-col justify-between transition-all shadow-xl group cursor-pointer"
            >
              <div>
                {/* Visual Thumbnail instead of icon */}
                <div className="relative aspect-[16/9] w-full bg-slate-950 overflow-hidden border-b border-slate-800">
                  <img 
                    src={aula1Img} 
                    alt="Aula 1" 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-10" />
                  <div className="absolute top-2 left-2 bg-amber-400 text-slate-950 text-[10px] uppercase font-black px-2 py-0.5 rounded tracking-wider z-20">
                    Aula 1
                  </div>
                </div>

                <div className="p-5 sm:p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full">
                      Acesso Imediato
                    </span>
                  </div>
                  <h3 className="font-extrabold text-base text-white mb-2 leading-snug group-hover:text-amber-300 transition-colors">
                    Como Parar de Trabalhar Mais e Aumentar o Seu Faturamento
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Como transformei R$16 mil em R$560 mil em contratos em BH — sem trabalhar mais horas.
                  </p>
                </div>
              </div>
            </div>

            {/* Aula 2 Card */}
            <div 
              onClick={() => setSelectedBonus(PRE_LAUNCH_CLASSES[1])}
              className="bg-[#121620] border-2 border-slate-800 hover:border-amber-400/60 rounded-2xl overflow-hidden flex flex-col justify-between transition-all shadow-xl group cursor-pointer"
            >
              <div>
                {/* Visual Thumbnail instead of icon */}
                <div className="relative aspect-[16/9] w-full bg-slate-950 overflow-hidden border-b border-slate-800">
                  <img 
                    src={aula2Img} 
                    alt="Aula 2" 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-10" />
                  <div className="absolute top-2 left-2 bg-amber-400 text-slate-950 text-[10px] uppercase font-black px-2 py-0.5 rounded tracking-wider z-20">
                    Aula 2
                  </div>
                </div>

                <div className="p-5 sm:p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full">
                      Acesso Imediato
                    </span>
                  </div>
                  <h3 className="font-extrabold text-base text-white mb-2 leading-snug group-hover:text-amber-300 transition-colors">
                    O Motivo Pelo Qual Cobrar Mais Caro Te Faz Perder Cliente
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    A diferença entre cobrar pelo que você faz e cobrar pelo que você entrega — e por que isso muda o fechamento.
                  </p>
                </div>
              </div>
            </div>

            {/* Aula 3 Card */}
            <div 
              onClick={() => setSelectedBonus(PRE_LAUNCH_CLASSES[2])}
              className="bg-[#121620] border-2 border-slate-800 hover:border-amber-400/60 rounded-2xl overflow-hidden flex flex-col justify-between transition-all shadow-xl group cursor-pointer"
            >
              <div>
                {/* Visual Thumbnail instead of icon */}
                <div className="relative aspect-[16/9] w-full bg-slate-950 overflow-hidden border-b border-slate-800">
                  <img 
                    src={aula3Img} 
                    alt="Aula 3" 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-10" />
                  <div className="absolute top-2 left-2 bg-amber-400 text-slate-950 text-[10px] uppercase font-black px-2 py-0.5 rounded tracking-wider z-20">
                    Aula 3
                  </div>
                </div>

                <div className="p-5 sm:p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full">
                      Acesso Imediato
                    </span>
                  </div>
                  <h3 className="font-extrabold text-base text-white mb-2 leading-snug group-hover:text-amber-300 transition-colors">
                    A Oportunidade Que Você Ainda Não Está Enxergando
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Como transformar honorário técnico em consultoria de alto valor, ancorada no método Constru10x.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Seção 3 CTA */}
          <div className="text-center">
            <button
              type="button"
              onClick={handleOpenCheckout}
              className="px-8 py-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm uppercase tracking-wider rounded-xl shadow-xl transition-all hover:scale-105 active:scale-95 inline-flex items-center gap-2"
            >
              <span>QUERO APRENDER O MÉTODO PARA FATURAR 10X MAIS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
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
                Essa imersão é para você que é Engenheiro, Arquiteto ou Construtor e:
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
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
            <button
              type="button"
              onClick={handleOpenCheckout}
              className="px-8 py-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm uppercase tracking-wider rounded-xl shadow-xl transition-all hover:scale-105 active:scale-95 inline-flex items-center gap-2"
            >
              <span>GARANTIR VAGA NA IMERSÃO • 1º LOTE POR R$49,90</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* SEÇÃO 8 — SIMULADOR DE FATURAMENTO TÉCNICO */}
      <section className="py-16 sm:py-24 bg-[#090b0e] border-t border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevenueCalculator onCtaClick={handleOpenCheckout} />
        </div>
      </section>

      {/* SEÇÃO 9 — OFERTA / CONDIÇÃO ESPECIAL DE 1º LOTE */}
      <section id="oferta" className="py-16 sm:py-24 bg-[#0c0f16] border-y border-slate-800 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Selo */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3.5 py-1 rounded-full border border-amber-500/30 mb-3 inline-block">
              1º LOTE EXCLUSIVO • ATIVO
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              GARANTA SEU INGRESSO AGORA
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2">
              Imersão Online Constru10x
            </p>
          </div>

          {/* Offer Pricing Card */}
          <div className="max-w-2xl mx-auto rounded-3xl p-8 sm:p-10 bg-gradient-to-b from-[#182338] via-[#121724] to-[#0e121a] border-2 border-amber-400 shadow-2xl shadow-amber-500/20 relative">
            
            <div className="text-center mb-6">
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-5xl sm:text-6xl font-black text-white font-mono">
                  R$ 49,90
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
                <span><strong>Ingresso individual para o evento ao vivo:</strong> 1 dia intensivo no Zoom, dia 07 de novembro de 2026, das 10h às 17h.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>3 aulas bônus de liberação imediata:</strong> para você já começar a aplicar o método Constru10x hoje mesmo.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Garantia incondicional risco zero:</strong> se não valer à pena, basta mandar uma mensagem pedindo o reembolso.</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleOpenCheckout}
              id="btn-garantir-lote-1"
              className="w-full py-4.5 px-6 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-base sm:text-lg uppercase tracking-wider rounded-2xl shadow-xl shadow-amber-500/25 transition-transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>GARANTIR INGRESSO • 1º LOTE R$ 49,90 À VISTA</span>
              <ArrowRight className="w-5 h-5 text-slate-950" />
            </button>

            <p className="text-[11px] text-center text-slate-400 mt-3">
              Pagamento 100% seguro via Pix ou cartão à vista • Acesso imediato às 3 aulas
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
                E SE VOCÊ SE ARREPENDER?
              </h3>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed mb-4 italic">
                "Eu confio tanto no que vou te ensinar que, se você participar da imersão, assistir às três aulas, e mesmo assim achar que não valeu à pena, eu devolvo o seu dinheiro! Basta me enviar uma mensagem pedindo o seu reembolso. Simples assim."
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
            <button
              type="button"
              onClick={handleOpenCheckout}
              className="px-8 py-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm uppercase tracking-wider rounded-xl shadow-xl transition-all hover:scale-105 active:scale-95 inline-flex items-center gap-2"
            >
              <span>Garantir Meu Ingresso no 1º Lote (R$ 49,90 à vista)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
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
            Este evento destina-se a engenheiros civis, arquitetos e construtores interessados em alavancar seu modelo de negócio e faturamento através do método Constru10x.
          </p>
          <p className="text-[11px] text-slate-500">
            © 2026 Adriano Costa. Todos os direitos reservados.
          </p>
        </div>
      </footer>

      {/* FLOATING CTA BAR */}
      <FloatingCTA onCtaClick={handleOpenCheckout} />

      {/* BONUS DETAIL MODAL */}
      <BonusModal
        bonus={selectedBonus}
        onClose={() => setSelectedBonus(null)}
        onSelectLot={handleOpenCheckout}
      />

      {/* CHECKOUT / REGISTRATION MODAL */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

    </div>
  );
}
