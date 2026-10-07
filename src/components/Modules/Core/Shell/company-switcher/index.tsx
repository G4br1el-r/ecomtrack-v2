"use client";

import { useQueryClient } from "@tanstack/react-query";
import { Building2 } from "lucide-react";

import { Combobox } from "@/components/Modules/Core/DesignSystem/combobox";
import { ALL_ITEMS_FILTERS } from "@/constants/Modules/Core/Api/http";
import { PLATFORM_CONTEXT_LABEL, PLATFORM_CONTEXT_VALUE } from "@/constants/Modules/Core/Shell/company-context";
import { useCompanies } from "@/hooks/Modules/Plataforma/Empresas/use-companies";
import { useMyCompany } from "@/hooks/Modules/Plataforma/Empresas/use-my-company";
import { isSessionQuery } from "@/lib/Modules/Core/Shell/is-session-query";
import { useSessionStore } from "@/store/Modules/Core/Auth/session-store";
import { useCompanyContextStore } from "@/store/Modules/Core/Shell/company-context-store";

export function CompanySwitcher() {
  const user = useSessionStore((state) => state.user);
  const company = useCompanyContextStore((state) => state.company);
  const setCompany = useCompanyContextStore((state) => state.setCompany);
  const queryClient = useQueryClient();
  const isOwner = user?.isPlatformOwner ?? false;
  const { data: companies } = useCompanies(ALL_ITEMS_FILTERS, isOwner);
  const { data: myCompany } = useMyCompany(!isOwner && Boolean(user?.companyId));

  if (!isOwner) {
    return myCompany ? (
      <span className="hidden max-w-48 items-center gap-1.5 truncate text-muted-foreground text-sm md:inline-flex">
        <Building2 className="size-4 shrink-0" aria-hidden="true" />
        <span className="truncate">{myCompany.name}</span>
      </span>
    ) : null;
  }

  const items = companies?.items ?? [];
  const options = [
    { value: PLATFORM_CONTEXT_VALUE, label: PLATFORM_CONTEXT_LABEL },
    ...(company && !items.some((item) => item.id === company.id) ? [{ value: company.id, label: company.name }] : []),
    ...items.map((item) => ({ value: item.id, label: item.name })),
  ];

  return (
    <Combobox
      label="Empresa em uso"
      options={options}
      value={company?.id ?? PLATFORM_CONTEXT_VALUE}
      searchPlaceholder="Buscar empresa..."
      emptyText="Nenhuma empresa encontrada."
      className="h-8 w-44"
      onValueChange={(id) => {
        const next = items.find((item) => item.id === id);
        setCompany(next ? { id: next.id, name: next.name } : null);
        queryClient.resetQueries({ predicate: (query) => !isSessionQuery(query.queryKey) });
      }}
    />
  );
}
