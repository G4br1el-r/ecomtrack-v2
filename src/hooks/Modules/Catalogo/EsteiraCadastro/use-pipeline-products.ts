"use client";

import { useQuery } from "@tanstack/react-query";

import { PIPELINE_PRODUCTS_QUERY_KEY } from "@/constants/Modules/Catalogo/EsteiraCadastro/pipeline";
import { QUERY_CACHE_POLICY } from "@/constants/Modules/Core/Api/query-cache-policies";
import { getPipelineProducts } from "@/services/Modules/Catalogo/EsteiraCadastro/get-pipeline-products";

export function usePipelineProducts() {
  return useQuery({
    ...QUERY_CACHE_POLICY.operational,
    queryKey: PIPELINE_PRODUCTS_QUERY_KEY,
    queryFn: getPipelineProducts,
  });
}
