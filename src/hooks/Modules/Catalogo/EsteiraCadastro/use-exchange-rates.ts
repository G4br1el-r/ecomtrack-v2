"use client";

import { useQuery } from "@tanstack/react-query";

import { EXCHANGE_RATES_QUERY_KEY } from "@/constants/Modules/Catalogo/EsteiraCadastro/pipeline";
import { QUERY_CACHE_POLICY } from "@/constants/Modules/Core/Api/query-cache-policies";
import { getExchangeRates } from "@/services/Modules/Catalogo/EsteiraCadastro/get-exchange-rates";

export function useExchangeRates() {
  return useQuery({ ...QUERY_CACHE_POLICY.panel, queryKey: EXCHANGE_RATES_QUERY_KEY, queryFn: getExchangeRates });
}
