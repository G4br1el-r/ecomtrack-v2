import type { NumberFormatKind } from "@/@types/Modules/Core/DesignSystem/number-format";

export const COMPACT_FORMAT_KIND: Record<NumberFormatKind, NumberFormatKind> = {
  currency: "compactCurrency",
  integer: "compactInteger",
  decimal: "decimal",
  percent: "percent",
  signedPercent: "signedPercent",
  compactCurrency: "compactCurrency",
  compactInteger: "compactInteger",
};

export const PERCENT_SCALE = 100;

export const EMPTY_VALUE = "—";

export const MONEY_DECIMALS = 2;
