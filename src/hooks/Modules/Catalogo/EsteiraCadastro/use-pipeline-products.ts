"use client";

import { useQuery } from "@tanstack/react-query";

import { PIPELINE_PRODUCTS_QUERY_KEY } from "@/constants/Modules/Catalogo/EsteiraCadastro/pipeline";
import { getPipelineProducts } from "@/services/Modules/Catalogo/EsteiraCadastro/get-pipeline-products";

export function usePipelineProducts() {
  return useQuery({ queryKey: PIPELINE_PRODUCTS_QUERY_KEY, queryFn: getPipelineProducts });
}
