import type { PricingRules } from "@/@types/Modules/Catalogo/EsteiraCadastro/pricing";

export const PRICING_RULES: PricingRules = {
  taxPercent: 6.5,
  feePercent: 4.99,
  markupPercent: 30,
  roundingCents: 0.97,
};

export const WHOLE_SHARE = 1;

export const CENTS_DECIMALS = 2;

export const HEALTHY_MARGIN_SHARE = 0.2;

export const ACCEPTABLE_MARGIN_SHARE = 0.1;
