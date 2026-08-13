// Avatars de perfil - fotos de avatar com silhuetas de pessoas
// SVGs inline coloridos, sem dependencias externas.

function avatarSvg(colors: [string, string], iconPath: string): string {
  const [c1, c2] = colors;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${c1}"/>
      <stop offset="1" stop-color="${c2}"/>
    </linearGradient>
  </defs>
  <rect width="120" height="120" rx="12" fill="url(#g)"/>
  <g fill="white" opacity="0.9">
    ${iconPath}
  </g>
</svg>`;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

// Silhuetas de pessoas (SVG paths simplificados)
const PERSON_HEAD = '<circle cx="60" cy="42" r="22"/>';
const PERSON_BODY = '<path d="M 22 110 Q 22 72 60 72 Q 98 72 98 110 L 22 110 Z"/>';
const PERSON_FULL = `${PERSON_HEAD}${PERSON_BODY}`;

// Variacoes de silhuetas
const ICONS = [
  PERSON_FULL, // pessoa padrao
  '<circle cx="60" cy="38" r="18"/><path d="M 28 110 Q 28 68 60 68 Q 92 68 92 110 L 28 110 Z"/>', // pessoa menor
  '<circle cx="60" cy="44" r="24"/><path d="M 20 110 Q 20 74 60 74 Q 100 74 100 110 L 20 110 Z"/>', // pessoa maior
  '<circle cx="60" cy="40" r="20"/><ellipse cx="60" cy="95" rx="34" ry="22"/>', // oval
  '<circle cx="60" cy="42" r="22"/><path d="M 25 110 Q 25 70 60 70 Q 95 70 95 110 L 25 110 Z"/><circle cx="50" cy="38" r="3" fill="${c1}" opacity="0.4"/><circle cx="70" cy="38" r="3" fill="${c1}" opacity="0.4"/>', // com olhos
];

export interface AvatarOption {
  id: string;
  label: string;
  src: string;
}

// Paletas variadas
const palette: [string, string][] = [
  ["#e50914", "#831010"],     // vermelho Netflix
  ["#0078d4", "#003a70"],     // azul
  ["#2d8659", "#143a2a"],     // verde
  ["#e07b00", "#6b3a00"],     // laranja
  ["#8b5cf6", "#3b1a7a"],     // roxo
  ["#ec4899", "#7a1f49"],     // rosa
  ["#0ea5e9", "#074a6b"],     // cyan
  ["#f5f5f5", "#666666"],     // branco/cinza
  ["#3b82f6", "#8b5cf6"],     // azul-roxo
  ["#10b981", "#065f46"],     // esmeralda
  ["#f59e0b", "#92400e"],     // amber
  ["#ef4444", "#7f1d1d"],     // vermelho escuro
];

const labels = [
  "Avatar 1", "Avatar 2", "Avatar 3", "Avatar 4",
  "Avatar 5", "Avatar 6", "Avatar 7", "Avatar 8",
  "Avatar 9", "Avatar 10", "Avatar 11", "Avatar 12",
];

export const AVATARS: AvatarOption[] = palette.map((colors, i) => ({
  id: `avatar-${i}`,
  label: labels[i],
  src: avatarSvg(colors, ICONS[i % ICONS.length]),
}));
