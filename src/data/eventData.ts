import { TicketLot, PreLaunchClass, ScheduleBlock, TestimonialCase, FAQItem } from '../types';

export const EVENT_DETAILS = {
  name: "Imersão Constru10x",
  host: "Adriano Costa",
  hostTitle: "Engenheiro Civil | Inspetor-Chefe do CREA | Mentor",
  instagram: "@engadrianocosta",
  followers: "150.000+",
  dateDisplay: "07 de Novembro de 2026",
  dateISO: "2026-11-07T10:00:00-03:00",
  timeDisplay: "Das 10h às 17h (Horário de Brasília)",
  format: "Imersão 100% Online no Zoom",
  targetAudience: "Engenheiros Civis, Arquitetos e Construtores",
  corePromise: "Te mostro como construir com qualidade, segurança e custo baixo — e como o método Constru 10x multiplica em até 10x o seu faturamento, construindo melhor e gastando menos.",
  tagline: "Pare de ser refém da briga de preço e feche contratos de alto valor com o método Constru 10x.",
  lot1DeadlineDate: "2026-10-26T23:59:59-03:00",
};

export const TICKET_LOTS: TicketLot[] = [
  {
    id: 1,
    name: "1º LOTE EXCLUSIVO",
    price: 49.90,
    priceFormatted: "R$ 49,90",
    installments: "Pagamento único à vista",
    status: "active",
    label: "1º LOTE ATIVO • VALOR PROMOCIONAL",
    deadlineDescription: "Válido por apenas 7 dias após o lançamento. Em seguida, o valor subirá para o 2º Lote.",
  },
];

export const PRE_LAUNCH_CLASSES: PreLaunchClass[] = [
  {
    id: 1,
    title: "Aula 1: Como Parar de Trabalhar Mais e Aumentar o Seu Faturamento",
    subtitle: "A proporção de mercado e a virada matemática",
    duration: "28 min",
    badge: "Acesso Imediato",
    summary: "Adriano revela como saiu do interior para gerar R$ 560 mil em contratos em BH com apenas R$ 16 mil investidos. Entenda por que trabalhar 14h por dia não resolve um gargalo que é de posicionamento comercial.",
    takeaways: [],
  },
  {
    id: 2,
    title: "Aula 2: O Motivo Pelo Qual Cobrar Mais Caro Te Faz Perder Cliente",
    subtitle: "Os gargalos silenciosos do profissional técnico",
    duration: "32 min",
    badge: "Acesso Imediato",
    summary: "Descubra a diferença prática entre cobrar pelo que você faz versus pelo que você entrega. O diagnóstico cirúrgico dos erros que mantêm o técnico preso em orçamentos ignorados.",
    takeaways: [],
  },
  {
    id: 3,
    title: "Aula 3: A Oportunidade Que Você Ainda Não Está Enxergando",
    subtitle: "A cadeia lucrativa ao redor da sua técnica",
    duration: "30 min",
    badge: "Acesso Imediato",
    summary: "O mercado paga caro para quem resolve problemas caros. Veja como transformar honorários modestos em consultorias de alto valor ao ancorar sua entrega no método Constru 10x.",
    takeaways: [],
  },
];

export const SCHEDULE_BLOCKS: ScheduleBlock[] = [
  {
    time: "Manhã",
    title: "Diagnóstico de Gargalos & O Ponto de Virada",
    description: "Mapeamento cirúrgico de onde seu faturamento está vazando todos os meses. Como fazer a transição definitiva da postura técnica esgotada para uma autoridade requisitada pelo mercado de alto padrão.",
    highlights: [],
  },
  {
    time: "Manhã",
    title: "A Engenharia de Obra do Método Constru 10x",
    description: "Os bastidores práticos que geram dezenas de milhares de reais em economia real no canteiro sem abrir mão de segurança e qualidade — e como transformar essa economia na maior alavanca de valor dos seus honorários.",
    highlights: [],
  },
  {
    time: "Tarde",
    title: "A Reunião de 5 Etapas & Script de Fechamento",
    description: "O passo a passo exato para conduzir o cliente do primeiro contato à assinatura de contrato, filtrando curiosos de antemão e fechando propostas com margem cheia sem dar um centavo de desconto.",
    highlights: [],
  },
  {
    time: "Tarde",
    title: "Os 6 Canais de Captação Ativa do Constru 10x",
    description: "A estrutura comprovada para gerar demanda contínua de clientes qualificados sem depender de sorte ou indicações esporádicas, com um plano prático para você executar imediatamente.",
    highlights: [],
  },
];

export const TESTIMONIALS: TestimonialCase[] = [
  {
    id: "alexandre",
    name: "Eng. Alexandre",
    role: "Engenheiro de Instalações",
    location: "São Paulo - SP",
    tag: "Projetos Complementares",
    result: "De 1.200 seguidores para mais de 35k e R$ 25.000+/mês",
    story: "Começou a aplicar o direcionamento de conteúdo e funil do Adriano no início do ano. Ajustou os vídeos do topo para o fundo do funil e passou a fechar contratos recorrentes na internet, precisando contratar equipe para dar vazão à demanda de projetos complementares.",
    metricLabel: "Faturamento Mensal",
    metricValue: "R$ 25.000+/mês",
  },
  {
    id: "priscila",
    name: "Eng. Priscila Lima",
    role: "Engenheira Civil & Projetista",
    location: "Campos Altos / BH - MG",
    tag: "Transição e Escala",
    result: "Triplicou o faturamento e fechou clientes até no exterior",
    story: "Tinha vergonha da cidade pequena e medo de errar nas redes sociais. Após aplicar o método de posicionamento e constância ensinado pelo Adriano, viralizou no digital e começou a fechar projetos em vários estados e até clientes brasileiros na Europa, investindo R$ 0 em tráfego pago.",
    metricLabel: "Investimento em Anúncios",
    metricValue: "R$ 0 (100% Orgânico)",
  },
  {
    id: "thais",
    name: "Eng. Thaís Coimbra",
    role: "Especialista em Gestão Turn Key",
    location: "Belo Horizonte - MG",
    tag: "Obras de Alto Padrão",
    result: "Mais de R$ 35 Milhões em obras gerenciadas",
    story: "Depois de enfrentar uma das maiores crises de sua trajetória e dívidas de quase R$ 1 milhão, reergueu sua construtora focando em planejamento, orçamento à prova de furos e posicionamento no alto padrão através do modelo Turn Key.",
    metricLabel: "Obras Gerenciadas",
    metricValue: "+R$ 35 Milhões",
  },
  {
    id: "luana",
    name: "Eng. Luana & Felipe",
    role: "Construtora & Fiscalização",
    location: "Belo Horizonte - MG",
    tag: "Fiscalização e Gestão",
    result: "+R$ 1 Milhão em contratos de execução",
    story: "Retornando para a engenharia após a maternidade, estruturou sua rotina, superou a insegurança de canteiro e hoje é o braço de fiscalização de obras de alto padrão do ecossistema em BH, assumindo mais de R$ 1 milhão em contratos.",
    metricLabel: "Contratos de Execução",
    metricValue: "+R$ 1.000.000",
  },
];

export const FAQS: FAQItem[] = [
  {
    question: "O evento vai ficar gravado ou terá replay?",
    answer: "NÃO. Esta imersão é um dia intensivo 100% online no Zoom, no dia 07 de Novembro de 2026, das 10h às 17h (Horário de Brasília). O compromisso ao vivo faz toda a diferença para absorver o método Constru 10x sem distrações.",
  },
  {
    question: "O método Constru 10x serve para arquitetos e construtores?",
    answer: "Com certeza. O método Constru 10x foi desenhado para engenheiros civis, arquitetos e construtores que querem parar de brigar por preço, fechar contratos com margem saudável e ter um processo comercial previsível.",
  },
  {
    question: "E se eu for recém-formado ou estiver começando do zero?",
    answer: "Melhor ainda, porque você não precisará passar anos cometendo os erros comuns de disputar por preço baixo ou cobrar sem conhecer a margem real. Você começará com o método Constru 10x desde o primeiro cliente.",
  },
  {
    question: "Como funciona a garantia incondicional de risco zero?",
    answer: "Eu confio tanto no que vou te ensinar que, se você participar da Imersão, assistir às três aulas, e mesmo assim achar que não valeu à pena eu devolvo o seu dinheiro! Basta me enviar uma mensagem pedindo o seu reembolso. Simples assim.",
  },
];
