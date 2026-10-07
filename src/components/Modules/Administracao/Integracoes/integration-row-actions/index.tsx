"use client";

import { Pause, Pencil, Play, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import type { IntegrationArea } from "@/@types/Modules/Administracao/Integracoes/integration-area";
import { DropdownMenuItem, DropdownMenuSeparator } from "@/components/animate-ui/components/radix/dropdown-menu";
import { ActionLockedTag } from "@/components/Modules/Core/DesignSystem/action-locked-tag";
import { ConfirmDialog } from "@/components/Modules/Core/DesignSystem/confirm-dialog";
import { RowActionsMenu } from "@/components/Modules/Core/DesignSystem/row-actions-menu";
import { INTEGRATION_AREA_ENDPOINTS } from "@/constants/Modules/Administracao/Integracoes/integrations";
import { useIntegrationProviders } from "@/hooks/Modules/Administracao/Integracoes/use-integration-providers";
import { useRemoveIntegration } from "@/hooks/Modules/Administracao/Integracoes/use-remove-integration";
import { useSaveIntegration } from "@/hooks/Modules/Administracao/Integracoes/use-save-integration";
import { useCan } from "@/hooks/Modules/Core/Access/use-can";
import type { CompanyIntegration } from "@/schemas/Modules/Administracao/Integracoes/company-integration-schema";
import { useIntegrationPanelStore } from "@/store/Modules/Administracao/Integracoes/integration-panel-store";

export function IntegrationRowActions({
  area,
  integration,
}: {
  area: IntegrationArea;
  integration: CompanyIntegration;
}) {
  const { can } = useCan();
  const open = useIntegrationPanelStore((state) => state.open);
  const { data: providers } = useIntegrationProviders(area);
  const [confirming, setConfirming] = useState(false);
  const provider = providers?.find((candidate) => candidate.id === integration.providerId);
  const endpoints = INTEGRATION_AREA_ENDPOINTS[area];
  const canEdit = can(endpoints.update.component ?? "");
  const canRemove = can(endpoints.remove.component ?? "");
  const label = `${integration.providerName} · ${integration.name}`;
  const { mutate: save } = useSaveIntegration(area, {
    onSuccess: (saved) =>
      toast.success(saved.isActive ? "Conexão ativada" : "Conexão pausada", {
        description: label,
        action: {
          label: "Desfazer",
          onClick: () =>
            save({ id: saved.id, providerId: saved.providerId, name: null, isActive: !saved.isActive, values: {} }),
        },
      }),
    onError: (error) => toast.error("Não foi possível mudar a conexão", { description: error.message }),
  });
  const { mutate: remove, isPending: removing } = useRemoveIntegration(area, {
    onSuccess: () => toast.success("Conexão removida", { description: label }),
    onError: (error) => toast.error("Não foi possível remover a conexão", { description: error.message }),
  });

  return (
    <>
      <RowActionsMenu label={`Ações da conexão ${label}`}>
        <DropdownMenuItem
          disabled={!canEdit || !provider}
          onSelect={() => provider && open({ mode: "edit", provider, integration })}
        >
          <Pencil aria-hidden="true" />
          Editar
          {canEdit ? null : <ActionLockedTag />}
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={!canEdit}
          onSelect={() =>
            save({
              id: integration.id,
              providerId: integration.providerId,
              name: null,
              isActive: !integration.isActive,
              values: {},
            })
          }
        >
          {integration.isActive ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
          {integration.isActive ? "Pausar" : "Ativar"}
          {canEdit ? null : <ActionLockedTag />}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" disabled={!canRemove} onSelect={() => setConfirming(true)}>
          <Trash2 aria-hidden="true" />
          Remover
          {canRemove ? null : <ActionLockedTag />}
        </DropdownMenuItem>
      </RowActionsMenu>
      <ConfirmDialog
        open={confirming}
        onOpenChange={setConfirming}
        title="Remover esta conexão?"
        description={`${label} e as credenciais dela serão apagadas. Para só parar de usar, pause a conexão.`}
        confirmLabel="Remover conexão"
        destructive
        state={removing ? "loading" : "idle"}
        onConfirm={() => {
          remove(integration.id);
          setConfirming(false);
        }}
      />
    </>
  );
}
