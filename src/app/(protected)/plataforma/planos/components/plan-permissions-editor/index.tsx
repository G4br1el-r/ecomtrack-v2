"use client";

import { useState } from "react";
import { toast } from "sonner";

import type { PermissionSelection } from "@/@types/Modules/Core/Access/permission-selection";
import { PermissionTree } from "@/components/Modules/Core/Access/permission-tree";
import { PLATFORM_ONLY_PAGE_CODES } from "@/constants/Modules/Core/Access/access";
import { PLAN_PERMISSIONS_FORM_ID } from "@/constants/Modules/Plataforma/Planos/plans";
import { useUpdatePlanPermissions } from "@/hooks/Modules/Plataforma/Planos/use-update-plan-permissions";
import type { CatalogPage } from "@/schemas/Modules/Core/Access/catalog-page-schema";
import type { PlanDetail } from "@/schemas/Modules/Plataforma/Planos/plan-detail-schema";

const PLATFORM_ONLY = new Set<string>(PLATFORM_ONLY_PAGE_CODES);

export function PlanPermissionsEditor({
  plan,
  catalog,
  onSaved,
}: {
  plan: PlanDetail;
  catalog: CatalogPage[];
  onSaved: () => void;
}) {
  const [selection, setSelection] = useState<PermissionSelection>({ pages: plan.pages, components: plan.components });
  const { mutate: save } = useUpdatePlanPermissions();

  return (
    <form
      id={PLAN_PERMISSIONS_FORM_ID}
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        save(
          { id: plan.id, ...selection },
          {
            onSuccess: (saved) => {
              toast.success("Permissões do plano salvas", {
                description: `${saved.name}: ${saved.pages.length} páginas e ${saved.components.length} ações.`,
              });
              onSaved();
            },
            onError: (error) => toast.error("Não foi possível salvar o plano", { description: error.message }),
          },
        );
      }}
    >
      <p className="text-muted-foreground text-sm" aria-live="polite">
        {selection.pages.length} páginas e {selection.components.length} ações marcadas · {plan.companyCount} empresa(s)
        usam este plano
      </p>
      <PermissionTree
        catalog={catalog.filter((page) => !PLATFORM_ONLY.has(page.code))}
        value={selection}
        onChange={setSelection}
      />
    </form>
  );
}
