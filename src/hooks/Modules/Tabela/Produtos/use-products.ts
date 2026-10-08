"use client";

import { useQuery } from "@tanstack/react-query";
import { QUERY_CACHE_POLICY } from "@/constants/Modules/Core/Api/query-cache-policies";
import { PRODUCTS_QUERY_KEY } from "@/constants/Modules/Tabela/Produtos/products";
import { getProducts } from "@/services/Modules/Tabela/Produtos/get-products";

export function useProducts() {
  return useQuery({ ...QUERY_CACHE_POLICY.operational, queryKey: PRODUCTS_QUERY_KEY, queryFn: getProducts });
}
