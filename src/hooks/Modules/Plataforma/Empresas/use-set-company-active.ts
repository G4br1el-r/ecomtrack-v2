"use client";

import { COMPANIES_QUERY_KEY } from "@/constants/Modules/Plataforma/Empresas/companies";
import { useOptimisticListMutation } from "@/hooks/Modules/Core/Api/use-optimistic-list-mutation";
import type { Company } from "@/schemas/Modules/Plataforma/Empresas/company-schema";
import { activateCompany } from "@/services/Modules/Plataforma/Empresas/activate-company";
import { suspendCompany } from "@/services/Modules/Plataforma/Empresas/suspend-company";

type SetCompanyActiveVariables = { id: string; active: boolean };

export function useSetCompanyActive(
  handlers: {
    onSuccess?: (variables: SetCompanyActiveVariables) => void;
    onError?: (error: Error, variables: SetCompanyActiveVariables) => void;
  } = {},
) {
  return useOptimisticListMutation<SetCompanyActiveVariables, void, Company>({
    listKey: COMPANIES_QUERY_KEY,
    mutationFn: ({ id, active }) => (active ? activateCompany(id) : suspendCompany(id)),
    update: (companies, { id, active }) =>
      companies.map((company) =>
        company.id === id ? { ...company, status: active ? "Active" : "Suspended" } : company,
      ),
    onSuccess: (_, variables) => handlers.onSuccess?.(variables),
    onError: handlers.onError,
  });
}
