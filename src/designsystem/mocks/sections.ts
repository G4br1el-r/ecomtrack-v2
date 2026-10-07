export const SHOWCASE_SECTIONS = [
  { id: "cores", label: "Cores" },
  { id: "tipografia", label: "Tipografia" },
  { id: "espacamento", label: "Espaçamento" },
  { id: "motion", label: "Motion" },
  { id: "botoes", label: "Botões" },
  { id: "badges", label: "Badges" },
  { id: "formularios", label: "Formulários" },
  { id: "feedback", label: "Estados" },
  { id: "toasts", label: "Toasts" },
  { id: "overlays", label: "Modais e sheets" },
  { id: "menus", label: "Menus" },
  { id: "kpis", label: "KPIs" },
  { id: "dados", label: "Tabelas" },
  { id: "upload", label: "Upload" },
  { id: "navegacao", label: "Navegação" },
] as const;

export const SHOWCASE_SECTION_IDS = SHOWCASE_SECTIONS.map((section) => section.id);
