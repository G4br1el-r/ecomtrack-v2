"use client";

import { PlugZap } from "lucide-react";

import type { IntegrationArea } from "@/@types/Modules/Administracao/Integracoes/integration-area";
import { DetailSheet } from "@/components/Modules/Core/DesignSystem/detail-sheet";
import { ErrorState } from "@/components/Modules/Core/DesignSystem/error-state";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { INTEGRATION_FORM_ID } from "@/constants/Modules/Administracao/Integracoes/integrations";
import { useIntegration } from "@/hooks/Modules/Administracao/Integracoes/use-integration";
import { useIntegrationPanelStore } from "@/store/Modules/Administracao/Integracoes/integration-panel-store";

import { IntegrationForm } from "../integration-form";

export function IntegrationSheet({ area }: { area: IntegrationArea }) {
  const panel = useIntegrationPanelStore((state) => state.panel);
  const isOpen = useIntegrationPanelStore((state) => state.isOpen);
  const close = useIntegrationPanelStore((state) => state.close);
  const detail = useIntegration(area, isOpen && panel?.mode === "edit" ? panel.integration.id : null);
  const resolved = panel?.mode === "edit" ? (detail.data ? { ...panel, integration: detail.data } : null) : panel;

  return (
    <DetailSheet
      open={isOpen}
      onOpenChange={(next) => {
        if (!next) close();
      }}
      icon={PlugZap}
      title={panel ? `${panel.mode === "edit" ? "Editar" : "Conectar"} ${panel.provider.name}` : "Conexão"}
      description={panel?.provider.description}
      footer={
        <>
          <Button variant="ghost" onClick={close}>
            Cancelar
          </Button>
          <Button type="submit" form={INTEGRATION_FORM_ID} disabled={!resolved}>
            {panel?.mode === "edit" ? "Salvar" : "Conectar"}
          </Button>
        </>
      }
    >
      {detail.isError ? (
        <ErrorState onRetry={() => detail.refetch()} className="min-h-40" />
      ) : resolved ? (
        <IntegrationForm
          key={resolved.mode === "edit" ? resolved.integration.id : resolved.provider.id}
          area={area}
          panel={resolved}
          onSaved={close}
        />
      ) : panel ? (
        <div className="space-y-3" role="status" aria-label="Carregando a conexão">
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
        </div>
      ) : null}
    </DetailSheet>
  );
}
