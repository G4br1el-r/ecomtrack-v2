"use client";

import { useState } from "react";
import { DataTable } from "@/components/Modules/Core/DesignSystem/data-table";
import { EmptyState } from "@/components/Modules/Core/DesignSystem/empty-state";
import { ErrorState } from "@/components/Modules/Core/DesignSystem/error-state";
import { SegmentedFilter } from "@/components/Modules/Core/DesignSystem/segmented-filter";
import { USERS_TABLE_SETTINGS } from "@/constants/Modules/Administracao/Usuarios/users";
import { ALL_FILTER_VALUE } from "@/constants/Modules/Core/DesignSystem/segmented-filter";
import { useUsers } from "@/hooks/Modules/Administracao/Usuarios/use-users";
import { useDataTableServerState } from "@/hooks/Modules/Core/DesignSystem/use-data-table-server-state";
import { createUserColumns } from "@/lib/Modules/Administracao/Usuarios/create-user-columns";
import type { UserStatus } from "@/schemas/Modules/Administracao/Usuarios/user-schema";

import { ProfileCombobox } from "../profile-combobox";

const COLUMNS = createUserColumns();

export function UsersTable() {
  const table = useDataTableServerState(USERS_TABLE_SETTINGS);
  const [status, setStatus] = useState<UserStatus | typeof ALL_FILTER_VALUE>(ALL_FILTER_VALUE);
  const [profileId, setProfileId] = useState("");
  const { data, isPending, isError, refetch } = useUsers({
    ...table.query,
    Status: status === ALL_FILTER_VALUE ? undefined : status,
    ProfileId: profileId || undefined,
  });

  if (isError) return <ErrorState onRetry={() => refetch()} />;

  const counts = data?.metadata;
  const filtered = status !== ALL_FILTER_VALUE || profileId !== "" || table.query.Search !== "";

  return (
    <DataTable
      columns={COLUMNS}
      data={data?.items ?? []}
      getRowId={(user) => user.id}
      loading={isPending}
      settings={USERS_TABLE_SETTINGS}
      server={table.server(data?.totalCount ?? 0)}
      toolbar={{
        start: (
          <>
            <SegmentedFilter
              label="Situação"
              value={status}
              onValueChange={(next) => {
                setStatus(next);
                table.resetPage();
              }}
              options={[
                {
                  value: ALL_FILTER_VALUE,
                  label: "Todos",
                  count: counts ? counts.active + counts.invited + counts.inactive : undefined,
                },
                { value: "Active", label: "Ativos", count: counts?.active },
                { value: "Invited", label: "Convidados", count: counts?.invited },
                { value: "Inactive", label: "Inativos", count: counts?.inactive },
              ]}
            />
            <ProfileCombobox
              value={profileId}
              allLabel="Todos os perfis"
              className="h-9 w-48"
              onValueChange={(next) => {
                setProfileId(next);
                table.resetPage();
              }}
            />
          </>
        ),
      }}
      empty={
        filtered ? (
          <EmptyState title="Nenhum usuário com esses filtros" description="Ajuste a busca ou os filtros." />
        ) : (
          <EmptyState title="Nenhum usuário ainda" description="Convide a primeira pessoa da empresa." />
        )
      }
    />
  );
}
