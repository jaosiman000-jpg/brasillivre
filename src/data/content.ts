// Brasil Livre - dados do documentário
export interface Episode {
  id: number;
  title: string;
  duration: string;
  description: string;
  thumbnail: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface Contributor {
  name: string;
  role: string;
}

// Placeholder thumbnail gerado por SVG inline (gradiente cinematic)
export const placeholderThumb = (label: string, hue = 0) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="hsl(${hue}, 35%, 14%)"/>
      <stop offset="55%" stop-color="hsl(${hue}, 35%, 9%)"/>
      <stop offset="100%" stop-color="hsl(${hue}, 35%, 5%)"/>
    </linearGradient>
  </defs>
  <rect width="640" height="360" fill="url(#g)"/>
  <g opacity="0.12" fill="none" stroke="white" stroke-width="0.6">
    <path d="M0 60 H640 M0 140 H640 M0 220 H640 M0 300 H640"/>
    <path d="M80 0 V360 M200 0 V360 M320 0 V360 M440 0 V360 M560 0 V360"/>
  </g>
  <text x="320" y="190" text-anchor="middle" font-family="Inter, sans-serif" font-size="28" font-weight="700" fill="rgba(255,255,255,0.55)" letter-spacing="2">${label}</text>
  <text x="320" y="220" text-anchor="middle" font-family="Inter, sans-serif" font-size="13" fill="rgba(255,255,255,0.35)" letter-spacing="4">BRASIL LIVRE</text>
</svg>`)}`;

export const HERO_BANNER = "/covid-banner.png";
export const HERO_COVER = "/covid-capa.png";
export const HERO_TRAILER = "/covid-19-teaser.mp4";

export const EPISODES: Episode[] = [
  {
    id: 1,
    title: "A Origem",
    duration: "48 min",
    description:
      "Wuhan, dezembro de 2019. As primeiras evidências de que o vírus não teria surgido num mercado, mas sim num laboratório. Documentos confidenciais, cientistas silenciados e a fuga de informações que o mundo tentou enterrar.",
    thumbnail: placeholderThumb("EPISÓDIO 01 · A ORIGEM", 215),
  },
  {
    id: 2,
    title: "O Vírus Invisível",
    duration: "52 min",
    description:
      "Lockdowns globais decretados em questão de dias. Mas quem autorizou a paralisar economias inteiras baseado em modelos matemáticos que nunca foram auditados? A engenharia do medo como ferramenta de controle.",
    thumbnail: placeholderThumb("EPISÓDIO 02 · O VÍRUS INVISÍVEL", 200),
  },
  {
    id: 3,
    title: "Lockdown",
    duration: "45 min",
    description:
      "O experimento social mais amplo da história. Empresas destruídas, igrejas fechadas, crianças sem escola, enquanto grandes corporações lucravam bilhões. Quem ganhou com o confinamento do Brasil?",
    thumbnail: placeholderThumb("EPISÓDIO 03 · LOCKDOWN", 230),
  },
  {
    id: 4,
    title: "A Vacina",
    duration: "56 min",
    description:
      "A corrida mais rápida da história para aprovar uma vacina. Contratos bilionários assinados em sigilo, fabricantes com isenção total de responsabilidade civil e o esquema de lucro que movimentou R$ 50 bilhões em dinheiro público brasileiro.",
    thumbnail: placeholderThumb("EPISÓDIO 04 · A VACINA", 35),
  },
  {
    id: 5,
    title: "A Nova Realidade",
    duration: "50 min",
    description:
      "Passaporte sanitário, vigilância digital, censura médica e o aplauso diário que virou doutrinação. Como a pandemia acelerou o projeto de controle social que já estava pronto, esperando o momento certo.",
    thumbnail: placeholderThumb("EPISÓDIO 05 · A NOVA REALIDADE", 280),
  },
  {
    id: 6,
    title: "A Verdade Por Trás",
    duration: "58 min",
    description:
      "Os bastidores das decisões que mudaram o Brasil. Depoimentos de médicos censurados, pais afastados, empreendedores falidos. As perguntas que nunca foram respondidas, e quem trabalhou para que nunca fossem feitas.",
    thumbnail: placeholderThumb("EPISÓDIO 06 · A VERDADE POR TRÁS", 350),
  },
];

export const CONTRIBUTOR: Contributor[] = [
  { name: "Ana Beatriz Salles", role: "Investigação Independente" },
  { name: "Caio Mendoza", role: "Diretor Geral" },
  { name: "Dr. Rui Falcão", role: "Consultor Médico (censurado)" },
  { name: "Joaquim Pontes", role: "Documentação & Fontes" },
  { name: "Marina Vidal", role: "Edição & Finalização" },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    q: "O que é a Brasil Livre?",
    a: "Brasil Livre é uma plataforma independente de documentários que investiga, sem viés institucional ou pressão comercial, os eventos mais decisivos da nossa história. Não somos ligados a governos, grandes mídias ou laboratórios. Nosso compromisso é com a verdade, mesmo quando ela incomoda.",
  },
  {
    q: "Quantos episódios tem \"COVID-19: A verdade por trás\"?",
    a: "A primeira temporada tem 6 episódios, cada um com 45-58 minutos de investigação profunda. Todos disponíveis a partir do lançamento.",
  },
  {
    q: "O documentário defende uma tese específica?",
    a: "Sim. Apresentamos evidências documentais, contratos e depoimentos que apoiam a tese de que a pandemia foi, ao menos em parte, um projeto de transferência de riqueza e ampliação do controle estatal. Não é uma opinião. É o que os documentos mostram.",
  },
  {
    q: "Tem classificação indicativa?",
    a: "16 anos. O conteúdo aborda temas sensíveis como decisões governamentais controversas, efeitos adversos de vacinas, censura a profissionais de saúde e testemunhos de familiares de vítimas.",
  },
  {
    q: "É só assistir ou precisa de plano?",
    a: "O Brasil Livre é gratuito e sempre será. Crie sua conta para salvar progresso, receber novos episódios e desbloquear documentos complementares agora sob sigilo.",
  },
  {
    q: "Quando novos documentários chegam?",
    a: "Brasil Livre lança um novo documentário original a cada dois meses. Assinantes recebem aviso prévio de 7 dias e acesso antecipado a provas documentais.",
  },
];
