import type { Currency } from "./pipeline-product";

export type ExchangeRate = {
  currency: Exclude<Currency, "BRL">;
  rate: number;
};

export type ExchangeRates = {
  source: string;
  updatedAt: string;
  rates: ExchangeRate[];
};
