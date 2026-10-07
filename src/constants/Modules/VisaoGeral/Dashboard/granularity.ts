import type { Granularity } from "@/@types/Modules/VisaoGeral/Dashboard/granularity";

export const GRANULARITIES = ["day", "week", "month"] as const;

export const GRANULARITY_LABELS = {
  day: "Dia",
  week: "Semana",
  month: "Mês",
} as const satisfies Record<Granularity, string>;

export const DAILY_GRANULARITY_MAX_DAYS = 31;
export const WEEKLY_GRANULARITY_MAX_DAYS = 180;

export const BUCKET_LABEL_FORMAT = {
  day: "dd/MM",
  week: "dd/MM",
  month: "MMM/yy",
} as const satisfies Record<Granularity, string>;

export const BUCKET_TITLE_FORMAT = {
  day: "EEEE, dd/MM/yyyy",
  week: "'Semana de' dd/MM/yyyy",
  month: "MMMM 'de' yyyy",
} as const satisfies Record<Granularity, string>;
