export const PERIOD_PRESET_IDS = [
  "ultimos-90",
  "ultimos-30",
  "ultimos-7",
  "ontem",
  "hoje",
  "esta-semana",
  "este-mes",
  "mes-passado",
  "este-ano",
  "todo-o-periodo",
] as const;

export const PERIOD_PRESET_LABELS = {
  "ultimos-90": "Últimos 90 dias",
  "ultimos-30": "Últimos 30 dias",
  "ultimos-7": "Últimos 7 dias",
  ontem: "Ontem",
  hoje: "Hoje",
  "esta-semana": "Esta semana",
  "este-mes": "Este mês",
  "mes-passado": "Mês passado",
  "este-ano": "Este ano",
  "todo-o-periodo": "Todo o período",
} as const;

export const LAST_90_DAYS_OFFSET = -89;
export const LAST_30_DAYS_OFFSET = -29;
export const LAST_7_DAYS_OFFSET = -6;
export const YESTERDAY_OFFSET = -1;
export const WEEK_STARTS_ON_MONDAY = 1;
export const ONE_MONTH = 1;
export const ALL_TIME_START = { year: 2000, monthIndex: 0, day: 1 } as const;

export const DATE_FORMAT = "dd/MM/yyyy";
export const MONTH_YEAR_FORMAT = "LLLL yyyy";
export const EMPTY_PERIOD_LABEL = "Selecione o período";
