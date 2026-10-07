import { MONEY_DECIMALS } from "@/constants/Modules/Core/DesignSystem/number-format";

const AMOUNT_FORMAT = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: MONEY_DECIMALS,
  maximumFractionDigits: MONEY_DECIMALS,
});

export function formatForeignAmount(value: number, currency: string): string {
  return `${currency} ${AMOUNT_FORMAT.format(value)}`;
}
