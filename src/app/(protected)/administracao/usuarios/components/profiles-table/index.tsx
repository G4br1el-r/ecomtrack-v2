"use client";

import { Plus } from "lucide-react";

import { ActionLockTooltip } from "@/components/Modules/Core/DesignSystem/action-lock-tooltip";
import { DataTable } from "@/components/Modules/Core/DesignSystem/data-table";
import { EmptyState } from "@/components/Modules/Core/DesignSystem/empty-state";
import { ErrorState } from "@/components/Modules/Core/DesignSystem/error-state";
import { Button } from "@/components/ui/button";
import { PROFILES_TABLE_SETTINGS } from "@/constants/Modules/Administracao/Usuarios/users";
import { API_ENDPOINTS } from "@/constants/Modules/Core/Api/api-endpoints";
import { useProfiles } from "@/hooks/Modules/Administracao/Usuarios/use-profiles";
import { useCan } from "@/hooks/Modules/Core/Access/use-can";
import { useDataTableServerState } from "@/hooks/Modules/Core/DesignSystem/use-data-table-server-state";
import { createProfileColumns } from "@/lib/Modules/Administracao/Usuarios/create-profile-columns";
import { useUsersPanelStore } from "@/store/Modules/Administracao/Usuarios/users-panel-store";

const COLUMNS = createProfileColumns();

export function ProfilesTable() {
  const table = useDataTableServerState(PROFILES_TABLE_SETTINGS);
  const { can } = useCan(API_ENDPOINTS.profiles.create.page);
  const open = useUsersPanelStore((state) => state.open);
  const { data, isPending, isError, refetch } = useProfiles(table.query);
  const canCreate = can(API_ENDPOINTS.profiles.create.component);

  if (isError) return <ErrorState onRetry={() => refetch()} />;

  return (
    <DataTable
      columns={COLUMNS}
      data={data?.items ?? []}
      getRowId={(profile) => profile.id}
      loading={isPending}
      settings={PROFILES_TABLE_SETTINGS}
      server={table.server(data?.totalCount ?? 0)}
      toolbar={{
        end: (
          <ActionLockTooltip locked={!canCreate}>
            <Button variant="outline" onClick={() => open({ kind: "profile-form", profile: null })}>
              <Plus data-icon="inline-start" aria-hidden="true" />
              Novo perfil
            </Button>
          </ActionLockTooltip>
        ),
      }}
      empty={<EmptyState title="Nenhum perfil encontrado" description="Crie um perfil para dar acesso às telas." />}
    />
  );
}
