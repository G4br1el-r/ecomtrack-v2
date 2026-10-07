"use client";

import { useQueryClient } from "@tanstack/react-query";
import { Ban, CheckCircle2, LogIn, Pencil } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { DropdownMenuItem, DropdownMenuSeparator } from "@/components/animate-ui/components/radix/dropdown-menu";
import { ActionLockedTag } from "@/components/Modules/Core/DesignSystem/action-locked-tag";
import { ConfirmDialog } from "@/components/Modules/Core/DesignSystem/confirm-dialog";
import { RowActionsMenu } from "@/components/Modules/Core/DesignSystem/row-actions-menu";
import { API_ENDPOINTS } from "@/constants/Modules/Core/Api/api-endpoints";
import { useCan } from "@/hooks/Modules/Core/Access/use-can";
import { useSetCompanyActive } from "@/hooks/Modules/Plataforma/Empresas/use-set-company-active";
import { isSessionQuery } from "@/lib/Modules/Core/Shell/is-session-query";
import type { Company } from "@/schemas/Modules/Plataforma/Empresas/company-schema";
import { useCompanyContextStore } from "@/store/Modules/Core/Shell/company-context-store";
import { useCompanyPanelStore } from "@/store/Modules/Plataforma/Empresas/company-panel-store";

export function CompanyRowActions({ company }: { company: Company }) {
  const { can } = useCan();
  const queryClient = useQueryClient();
  const open = useCompanyPanelStore((state) => state.open);
  const setCompany = useCompanyContextStore((state) => state.setCompany);
  const [confirming, setConfirming] = useState(false);
  const canEdit = can(API_ENDPOINTS.companies.update.component);
  const canSuspend = can(API_ENDPOINTS.companies.suspend.component);
  const active = company.status === "Active";
  const { mutate: setActive, isPending } = useSetCompanyActive({
    onSuccess: ({ id, active: nowActive }) =>
      toast.success(nowActive ? "Empresa reativada" : "Empresa suspensa", {
        description: nowActive ? company.name : `${company.name} perdeu o acesso.`,
        action: nowActive ? undefined : { label: "Desfazer", onClick: () => setActive({ id, active: true }) },
      }),
    onError: (error) => toast.error("Não foi possível mudar a empresa", { description: error.message }),
  });

  return (
    <>
      <RowActionsMenu label={`Ações da empresa ${company.name}`}>
        <DropdownMenuItem disabled={!canEdit} onSelect={() => open(company)}>
          <Pencil aria-hidden="true" />
          Editar
          {canEdit ? null : <ActionLockedTag />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => {
            setCompany({ id: company.id, name: company.name });
            queryClient.resetQueries({ predicate: (query) => !isSessionQuery(query.queryKey) });
            toast.success(`Usando a empresa ${company.name}`, {
              description: "As telas passam a mostrar os dados dela.",
            });
          }}
        >
          <LogIn aria-hidden="true" />
          Usar esta empresa
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant={active ? "destructive" : "default"}
          disabled={!canSuspend}
          onSelect={() => (active ? setConfirming(true) : setActive({ id: company.id, active: true }))}
        >
          {active ? <Ban aria-hidden="true" /> : <CheckCircle2 aria-hidden="true" />}
          {active ? "Suspender" : "Reativar"}
          {canSuspend ? null : <ActionLockedTag />}
        </DropdownMenuItem>
      </RowActionsMenu>
      <ConfirmDialog
        open={confirming}
        onOpenChange={setConfirming}
        title={`Suspender ${company.name}?`}
        description="Todos os usuários da empresa perdem o acesso em até 15 minutos. Os dados ficam guardados e dá para reativar depois."
        confirmLabel="Suspender empresa"
        destructive
        icon={Ban}
        state={isPending ? "loading" : "idle"}
        onConfirm={() => {
          setActive({ id: company.id, active: false });
          setConfirming(false);
        }}
      />
    </>
  );
}
