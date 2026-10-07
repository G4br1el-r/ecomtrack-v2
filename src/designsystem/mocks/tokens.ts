export type ColorToken = {
  name: string;
  className: string;
  usage: string;
};

export type ColorGroup = {
  title: string;
  tokens: ColorToken[];
};

export const COLOR_GROUPS: ColorGroup[] = [
  {
    title: "Base",
    tokens: [
      { name: "background", className: "bg-background", usage: "Fundo da página" },
      { name: "foreground", className: "bg-foreground", usage: "Texto principal" },
      { name: "card", className: "bg-card", usage: "Cards e painéis" },
      { name: "popover", className: "bg-popover", usage: "Popovers, menus, sheets e modais" },
      { name: "border", className: "bg-border", usage: "Bordas e divisores" },
      { name: "input", className: "bg-input", usage: "Borda de campos" },
      { name: "ring", className: "bg-ring", usage: "Anel de foco" },
      { name: "overlay", className: "bg-overlay", usage: "Fundo atrás de modais e sheets" },
    ],
  },
  {
    title: "Ação",
    tokens: [
      { name: "primary", className: "bg-primary", usage: "Ação principal, links, seleção" },
      { name: "secondary", className: "bg-secondary", usage: "Ação secundária, badges neutros" },
      { name: "muted", className: "bg-muted", usage: "Fundos sutis, caixas de dados" },
      { name: "muted-foreground", className: "bg-muted-foreground", usage: "Texto de apoio, labels" },
      { name: "accent", className: "bg-accent", usage: "Hover de itens e botões ghost/outline" },
    ],
  },
  {
    title: "Status (cor forte)",
    tokens: [
      { name: "destructive", className: "bg-destructive", usage: "Excluir, erro, cancelado" },
      { name: "success", className: "bg-success", usage: "Pago, concluído, ativo" },
      { name: "warning", className: "bg-warning", usage: "Pendente, atenção" },
      { name: "info", className: "bg-info", usage: "Informativo, em andamento" },
      { name: "status-purple", className: "bg-status-purple", usage: "Fiscal, preço, e-commerce" },
      { name: "status-orange", className: "bg-status-orange", usage: "Saída de estoque, promoção" },
      { name: "status-teal", className: "bg-status-teal", usage: "Entrega, integração" },
    ],
  },
  {
    title: "Status (fundo suave)",
    tokens: [
      { name: "destructive-soft", className: "bg-destructive-soft", usage: "Fundo de badge/alerta de erro" },
      { name: "success-soft", className: "bg-success-soft", usage: "Fundo de badge/alerta de sucesso" },
      { name: "warning-soft", className: "bg-warning-soft", usage: "Fundo de badge/alerta de atenção" },
      { name: "info-soft", className: "bg-info-soft", usage: "Fundo de badge/alerta informativo" },
      { name: "status-purple-soft", className: "bg-status-purple-soft", usage: "Fundo do status roxo" },
      { name: "status-orange-soft", className: "bg-status-orange-soft", usage: "Fundo do status laranja" },
      { name: "status-teal-soft", className: "bg-status-teal-soft", usage: "Fundo do status teal" },
    ],
  },
  {
    title: "Gráficos",
    tokens: [
      { name: "chart-1", className: "bg-chart-1", usage: "Série 1" },
      { name: "chart-2", className: "bg-chart-2", usage: "Série 2" },
      { name: "chart-3", className: "bg-chart-3", usage: "Série 3" },
      { name: "chart-4", className: "bg-chart-4", usage: "Série 4" },
      { name: "chart-5", className: "bg-chart-5", usage: "Série 5" },
    ],
  },
];

export type TypeToken = {
  name: string;
  className: string;
  spec: string;
  usage: string;
};

export const TYPE_SCALE: TypeToken[] = [
  {
    name: "Título de página",
    className: "text-2xl font-bold tracking-tight",
    spec: "text-2xl · 24/32 · 700",
    usage: "h1 do PageHeader, um por página",
  },
  {
    name: "Título de seção",
    className: "text-lg font-semibold",
    spec: "text-lg · 18/28 · 600",
    usage: "h2 de blocos, títulos de modal grande",
  },
  {
    name: "Título de card / sheet",
    className: "text-base font-semibold",
    spec: "text-base · 16/24 · 600",
    usage: "CardTitle, SheetTitle, DialogTitle",
  },
  {
    name: "Corpo",
    className: "text-sm",
    spec: "text-sm · 14/20 · 400",
    usage: "Texto padrão, células de tabela, inputs",
  },
  {
    name: "Corpo destacado",
    className: "text-sm font-medium",
    spec: "text-sm · 14/20 · 500",
    usage: "Botões, valores em DetailRow, nome de produto",
  },
  {
    name: "Legenda",
    className: "text-xs text-muted-foreground",
    spec: "text-xs · 12/16 · 400",
    usage: "SKU, datas, metadados, descrição de campo",
  },
  {
    name: "Rótulo de grupo",
    className: "text-xs font-semibold tracking-wide text-muted-foreground uppercase",
    spec: "text-xs · 600 · caixa-alta",
    usage: "DetailSection, cabeçalhos de grupo",
  },
  {
    name: "Micro",
    className: "text-2xs font-medium",
    spec: "text-2xs · 10/14 · 500",
    usage: "Contadores mínimos (substitui text-[10px])",
  },
  { name: "Mono", className: "font-mono text-sm", spec: "font-mono · 14/20", usage: "Códigos, SKUs técnicos, IDs" },
];

export type SpacingRule = {
  token: string;
  pixels: string;
  usage: string;
};

export const SPACING_RULES: SpacingRule[] = [
  { token: "gap-1", pixels: "4px", usage: "Ícone + texto em badge, chips" },
  { token: "gap-2", pixels: "8px", usage: "Grupo de botões, ícone + texto em botão, campos em linha" },
  { token: "gap-3 / space-y-3", pixels: "12px", usage: "Itens de um bloco, label + campo agrupado" },
  { token: "gap-4 / p-4", pixels: "16px", usage: "Padding de card, grid de cards" },
  { token: "space-y-5", pixels: "20px", usage: "Campos dentro de sheet de filtros" },
  { token: "space-y-6 / px-6", pixels: "24px", usage: "Seções de página, padding horizontal de sheets e modais" },
  { token: "space-y-10", pixels: "40px", usage: "Separação entre grandes áreas da página" },
];

export const RADIUS_SCALE = [
  { token: "rounded-sm", usage: "Checkbox, chips internos" },
  { token: "rounded-md", usage: "Botões, inputs, badges" },
  { token: "rounded-lg", usage: "Cards, alerts, caixas de dados" },
  { token: "rounded-xl", usage: "Modais, popovers e barra flutuante" },
  { token: "rounded-full", usage: "Avatares, timeline, switch" },
] as const;

export const SHADOW_SCALE = [
  { token: "shadow-xs", usage: "Botão outline, inputs" },
  { token: "shadow-card", usage: "Cards e painéis" },
  { token: "shadow-md", usage: "Menus, popovers, selects" },
  { token: "shadow-overlay", usage: "Toasts e elementos flutuantes" },
  { token: "shadow-lg", usage: "Sheets e modais" },
] as const;
