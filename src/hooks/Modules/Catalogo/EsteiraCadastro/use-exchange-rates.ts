"use client";

import { useQuery } from "@tanstack/react-query";

import { EXCHANGE_RATES_QUERY_KEY } from "@/constants/Modules/Catalogo/EsteiraCadastro/pipeline";
import { getExchangeRates } from "@/services/Modules/Catalogo/EsteiraCadastro/get-exchange-rates";

export function useExchangeRates() {
  return useQuery({ queryKey: EXCHANGE_RATES_QUERY_KEY, queryFn: getExchangeRates });
}
