import type { NumberFormatKind } from "@/@types/Modules/Core/DesignSystem/number-format";

const FORMATTERS: Record<NumberFormatKind, Intl.NumberFormat> = {
  currency: new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }),
  integer: new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 }),
  decimal: new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 }),
  percent: new Intl.NumberFormat("pt-BR", { style: "percent", maximumFractionDigits: 1 }),
  signedPercent: new Intl.NumberFormat("pt-BR", {
    style: "percent",
    maximumFractionDigits: 1,
    signDisplay: "exceptZero",
  }),
  compactCurrency: new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", notation: "compact" }),
  compactInteger: new Intl.NumberFormat("pt-BR", { notation: "compact" }),
};

export function formatNumber(value: number, kind: NumberFormatKind): string {
  return FORMATTERS[kind].format(value);
}
