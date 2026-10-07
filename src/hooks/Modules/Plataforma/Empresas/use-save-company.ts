"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { MY_PERMISSIONS_QUERY_KEY } from "@/constants/Modules/Core/Access/access";
import { COMPANIES_QUERY_KEY } from "@/constants/Modules/Plataforma/Empresas/companies";
import { saveCompany } from "@/services/Modules/Plataforma/Empresas/save-company";

export function useSaveCompany() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: saveCompany,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: COMPANIES_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: MY_PERMISSIONS_QUERY_KEY });
    },
  });
}
