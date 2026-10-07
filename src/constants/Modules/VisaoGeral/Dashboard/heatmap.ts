export const WEEKDAY_SHORT_LABELS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"] as const;
export const WEEKDAY_LONG_LABELS = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
] as const;
export const HOURS_PER_DAY = 24;
export const HOUR_LABEL_STEP = 3;
export const HEATMAP_WEEKDAY_ORDER = [1, 2, 3, 4, 5, 6, 0] as const;
export const HOURS = Array.from({ length: HOURS_PER_DAY }, (_, hour) => hour);
