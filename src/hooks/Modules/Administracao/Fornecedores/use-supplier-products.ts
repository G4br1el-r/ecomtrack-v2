"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import type { SupplierProductsFilters } from "@/@types/Modules/Administracao/Fornecedores/supplier-products-filters";
import { SUPPLIER_PRODUCTS_QUERY_KEY } from "@/constants/Modules/Administracao/Fornecedores/suppliers";
import { listSupplierProducts } from "@/services/Modules/Administracao/Fornecedores/list-supplier-products";

export function useSupplierProducts(filters: SupplierProductsFilters) {
  return useQuery({
    queryKey: [...SUPPLIER_PRODUCTS_QUERY_KEY, filters],
    queryFn: () => listSupplierProducts(filters),
    placeholderData: keepPreviousData,
  });
}
