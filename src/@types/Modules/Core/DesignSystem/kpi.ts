import type { NumberFormatKind } from "@/@types/Modules/Core/DesignSystem/number-format";

export type KpiPoint = {
  label: string;
  value: number;
};

export type Kpi = {
  id: string;
  title: string;
  value: number;
  kind: NumberFormatKind;
  change: number | null;
  series: KpiPoint[];
};
