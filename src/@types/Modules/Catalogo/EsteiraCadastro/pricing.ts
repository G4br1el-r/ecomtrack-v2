export type PricingRules = {
  taxPercent: number;
  feePercent: number;
  markupPercent: number;
  roundingCents: number;
};

export type NetResult = {
  profit: number;
  margin: number;
};
