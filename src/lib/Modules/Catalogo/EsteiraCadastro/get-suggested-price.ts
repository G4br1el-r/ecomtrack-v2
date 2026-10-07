import type { PricingRules } from "@/@types/Modules/Catalogo/EsteiraCadastro/pricing";
import { CENTS_DECIMALS, WHOLE_SHARE } from "@/constants/Modules/Catalogo/EsteiraCadastro/pricing";
import { PERCENT_SCALE } from "@/constants/Modules/Core/DesignSystem/number-format";

export function getSuggestedPrice(cost: number, rules: PricingRules): number | null {
  if (cost <= 0) return null;
  const deductions = (rules.taxPercent + rules.feePercent) / PERCENT_SCALE;
  const withMarkup = cost * (WHOLE_SHARE + rules.markupPercent / PERCENT_SCALE);
  const base =
    deductions >= WHOLE_SHARE ? withMarkup * (WHOLE_SHARE + deductions) : withMarkup / (WHOLE_SHARE - deductions);
  const rounded = Math.ceil(base) - WHOLE_SHARE + rules.roundingCents;
  const price = rounded >= base ? rounded : rounded + WHOLE_SHARE;
  return Math.max(Number(price.toFixed(CENTS_DECIMALS)), cost);
}
