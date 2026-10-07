"use client";

import { useQuery } from "@tanstack/react-query";

import { PRODUCTS_QUERY_KEY } from "@/constants/Modules/Tabela/Produtos/products";
import { getProducts } from "@/services/Modules/Tabela/Produtos/get-products";

export function useProducts() {
  return useQuery({ queryKey: PRODUCTS_QUERY_KEY, queryFn: getProducts });
}
