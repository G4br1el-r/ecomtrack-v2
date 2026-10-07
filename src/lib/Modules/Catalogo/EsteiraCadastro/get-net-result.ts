import type { NetResult, PricingRules } from "@/@types/Modules/Catalogo/EsteiraCadastro/pricing";
import { WHOLE_SHARE } from "@/constants/Modules/Catalogo/EsteiraCadastro/pricing";
import { PERCENT_SCALE } from "@/constants/Modules/Core/DesignSystem/number-format";
import { getShare } from "@/lib/Modules/Core/DesignSystem/get-share";

export function getNetResult(price: number | null, cost: number, rules: PricingRules): NetResult | null {
  if (price === null || price <= 0 || cost <= 0) return null;
  const deductions = (rules.taxPercent + rules.feePercent) / PERCENT_SCALE;
  const profit = price * (WHOLE_SHARE - deductions) - cost;
  return { profit, margin: getShare(profit, price) };
}
