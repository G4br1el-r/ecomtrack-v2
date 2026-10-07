import type { ExchangeRates } from "@/@types/Modules/Catalogo/EsteiraCadastro/exchange-rate";

export const EXCHANGE_RATES_MOCK = {
  source: "Banco Central do Brasil (PTAX)",
  updatedAt: "2026-10-06T09:30:00",
  rates: [
    { currency: "USD", rate: 6 },
    { currency: "EUR", rate: 6.5 },
    { currency: "GBP", rate: 7.5 },
  ],
} satisfies ExchangeRates;
