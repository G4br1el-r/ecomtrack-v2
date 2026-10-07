export const DEMO_LATENCY_MS = 900;
export const DEMO_DEFAULT_PERIOD = "ultimos-30";
export const DEMO_MARGIN_DEFAULT = [25];
export const DEMO_MARGIN_MAX = 100;
export const DEMO_MARGIN_STEP = 1;
export const DEMO_PROGRESS_SAMPLE = 64;
export const DEMO_SKELETON_ROWS = ["a", "b", "c"];
export const DEMO_STAGGER_ITEMS = ["Pedido recebido", "Pagamento aprovado", "NF-e emitida", "Código enviado"];
export const DEMO_CHANNELS = [
  { value: "shopify", label: "Shopify" },
  { value: "nuvemshop", label: "Nuvemshop" },
  { value: "mercado-livre", label: "Mercado Livre" },
  { value: "amazon", label: "Amazon" },
];
export const DEMO_REORDER_ITEMS = [
  { id: "a", label: "Shopify", tone: "bg-success" },
  { id: "b", label: "Mercado Livre", tone: "bg-warning" },
  { id: "c", label: "Amazon", tone: "bg-info" },
  { id: "d", label: "Nuvemshop", tone: "bg-status-purple" },
];
export const MOTION_TOKENS = [
  { token: "DURATION_FAST", value: "150ms", usage: "Hover, troca de ícone, feedback de clique" },
  { token: "DURATION_BASE", value: "200ms", usage: "Padrão: abrir popover, fade de conteúdo" },
  { token: "DURATION_SLOW", value: "300ms", usage: "Preenchimento de progresso, conectores" },
  { token: "SPRING_SNAPPY", value: "500 / 35", usage: "Indicadores com layoutId, chips, badges" },
  { token: "SPRING_SOFT", value: "260 / 30", usage: "Linhas de tabela, barra flutuante, listas" },
  { token: "EASE_OUT", value: "cubic(0.16, 1, 0.3, 1)", usage: "Curva padrão de entrada" },
];
export const BUTTON_VARIANTS = [
  "default",
  "secondary",
  "outline",
  "ghost",
  "link",
  "destructive",
  "destructive-ghost",
] as const;
export const BUTTON_SIZES = ["xs", "sm", "default", "lg"] as const;
export const ICON_BUTTON_SIZES = ["icon-xs", "icon-sm", "icon", "icon-lg"] as const;
export const BUTTON_USAGE = [
  { variant: "default", usage: "Ação principal da tela ou do modal. Uma por contexto." },
  { variant: "secondary", usage: "Ação alternativa de peso médio." },
  { variant: "outline", usage: "Ações secundárias da barra da página (Exportar, Filtros) e Cancelar." },
  { variant: "ghost", usage: "Ações em linha de tabela, ícones de toolbar, menus." },
  { variant: "link", usage: "Navegação em texto." },
  { variant: "destructive", usage: "Confirmar exclusão dentro do modal de confirmação." },
  { variant: "destructive-ghost", usage: "Lixeira na linha da tabela ou no detalhe." },
] as const;
export const OVERLAY_WIDTHS = [
  { name: "Dialog", width: "sm:max-w-md", usage: "Formulário curto, confirmação com campos" },
  { name: "Dialog grande", width: "sm:max-w-2xl", usage: "Formulário em duas colunas, pré-visualização" },
  { name: "AlertDialog", width: "padrão", usage: "Confirmar ação irreversível" },
  { name: "Sheet de filtros", width: "sm:max-w-lg", usage: "FilterSheet" },
  { name: "Sheet de detalhe", width: "sm:max-w-xl", usage: "DetailSheet: header fixo, corpo com scroll, rodapé fixo" },
];
export const FILTER_STATUS_OPTIONS = ["Pago", "Pendente", "Cancelado"];
