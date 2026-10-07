"use client";

import { Building2 } from "lucide-react";

import type { IntegrationArea as Area } from "@/@types/Modules/Administracao/Integracoes/integration-area";
import { DataTable } from "@/components/Modules/Core/DesignSystem/data-table";
import { EmptyState } from "@/components/Modules/Core/DesignSystem/empty-state";
import { ErrorState } from "@/components/Modules/Core/DesignSystem/error-state";
import { SectionHeader } from "@/components/Modules/Core/DesignSystem/section-header";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import {
  INTEGRATION_AREA_COPY,
  INTEGRATION_AREA_ENDPOINTS,
  INTEGRATION_TABLE_SETTINGS,
} from "@/constants/Modules/Administracao/Integracoes/integrations";
import { useIntegrationProviders } from "@/hooks/Modules/Administracao/Integracoes/use-integration-providers";
import { useIntegrations } from "@/hooks/Modules/Administracao/Integracoes/use-integrations";
import { useCan } from "@/hooks/Modules/Core/Access/use-can";
import { useDataTableServerState } from "@/hooks/Modules/Core/DesignSystem/use-data-table-server-state";
import { createIntegrationColumns } from "@/lib/Modules/Administracao/Integracoes/create-integration-columns";
import { useIntegrationPanelStore } from "@/store/Modules/Administracao/Integracoes/integration-panel-store";
import { useSessionStore } from "@/store/Modules/Core/Auth/session-store";
import { useCompanyContextStore } from "@/store/Modules/Core/Shell/company-context-store";

import { IntegrationSheet } from "../integration-sheet";
import { ProviderCard } from "../provider-card";

const COLUMNS: Record<Area, ReturnType<typeof createIntegrationColumns>> = {
  ecommerce: createIntegrationColumns("ecommerce"),
  email: createIntegrationColumns("email"),
  ai: createIntegrationColumns("ai"),
  supplier: createIntegrationColumns("supplier"),
};

const PROVIDER_SKELETONS = ["a", "b", "c"] as const;

export function IntegrationArea({ area }: { area: Area }) {
  const settings = INTEGRATION_TABLE_SETTINGS[area];
  const copy = INTEGRATION_AREA_COPY[area];
  const table = useDataTableServerState(settings);
  const { can } = useCan();
  const open = useIntegrationPanelStore((state) => state.open);
  const isOwner = useSessionStore((state) => state.user?.isPlatformOwner ?? false);
  const company = useCompanyContextStore((state) => state.company);
  const providers = useIntegrationProviders(area);
  const integrations = useIntegrations(area, table.query);
  const canConnect = can(INTEGRATION_AREA_ENDPOINTS[area].create.component ?? "");
  const items = integrations.data?.items ?? [];

  return (
    <div className="space-y-8">
      {isOwner && !company ? (
        <Alert variant="info">
          <Building2 aria-hidden="true" />
          <AlertDescription>
            {area === "email"
              ? "Sem empresa escolhida, você está configurando a conta padrão da plataforma, usada por quem não tem conta própria."
              : "Escolha uma empresa no topo da tela para ver e configurar as conexões dela."}
          </AlertDescription>
        </Alert>
      ) : null}
      <section aria-label="Provedores disponíveis" className="space-y-3">
        <SectionHeader title="Provedores disponíveis" />
        {providers.isError ? (
          <ErrorState onRetry={() => providers.refetch()} className="min-h-40" />
        ) : providers.data?.length === 0 ? (
          <EmptyState
            className="min-h-0 rounded-lg border border-dashed py-8"
            illustration={null}
            title="Nenhum provedor disponível"
            description="A plataforma ainda não liberou provedores para esta área."
          />
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {providers.data
              ? providers.data.map((provider) => (
                  <ProviderCard
                    key={provider.id}
                    provider={provider}
                    connections={items.filter((item) => item.providerId === provider.id).length}
                    canConnect={canConnect}
                    onConnect={() => open({ mode: "create", provider })}
                  />
                ))
              : PROVIDER_SKELETONS.map((key) => <Skeleton key={key} className="h-32 w-full" />)}
          </div>
        )}
      </section>
      <section aria-label={copy.connectionsTitle} className="space-y-3">
        <SectionHeader title={copy.connectionsTitle} />
        {integrations.isError ? (
          <ErrorState onRetry={() => integrations.refetch()} />
        ) : (
          <DataTable
            columns={COLUMNS[area]}
            data={items}
            getRowId={(integration) => integration.id}
            loading={integrations.isPending}
            settings={settings}
            server={table.server(integrations.data?.totalCount ?? 0)}
            empty={<EmptyState title="Nenhuma conexão ainda" description={copy.empty} />}
          />
        )}
      </section>
      <IntegrationSheet area={area} />
    </div>
  );
}
