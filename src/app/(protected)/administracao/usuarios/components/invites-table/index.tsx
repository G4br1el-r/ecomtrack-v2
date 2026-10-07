"use client";

import { useState } from "react";
import { DataTable } from "@/components/Modules/Core/DesignSystem/data-table";
import { EmptyState } from "@/components/Modules/Core/DesignSystem/empty-state";
import { ErrorState } from "@/components/Modules/Core/DesignSystem/error-state";
import { SegmentedFilter } from "@/components/Modules/Core/DesignSystem/segmented-filter";
import { INVITES_TABLE_SETTINGS } from "@/constants/Modules/Administracao/Usuarios/users";
import { ALL_FILTER_VALUE } from "@/constants/Modules/Core/DesignSystem/segmented-filter";
import { useInvites } from "@/hooks/Modules/Administracao/Usuarios/use-invites";
import { useDataTableServerState } from "@/hooks/Modules/Core/DesignSystem/use-data-table-server-state";
import { createInviteColumns } from "@/lib/Modules/Administracao/Usuarios/create-invite-columns";
import type { InviteStatus } from "@/schemas/Modules/Administracao/Usuarios/invite-schema";

const COLUMNS = createInviteColumns();

export function InvitesTable() {
  const table = useDataTableServerState(INVITES_TABLE_SETTINGS);
  const [status, setStatus] = useState<InviteStatus | typeof ALL_FILTER_VALUE>(ALL_FILTER_VALUE);
  const { data, isPending, isError, refetch } = useInvites({
    ...table.query,
    Status: status === ALL_FILTER_VALUE ? undefined : status,
  });

  if (isError) return <ErrorState onRetry={() => refetch()} />;

  const counts = data?.metadata;

  return (
    <DataTable
      columns={COLUMNS}
      data={data?.items ?? []}
      getRowId={(invite) => invite.userId}
      loading={isPending}
      settings={INVITES_TABLE_SETTINGS}
      server={table.server(data?.totalCount ?? 0)}
      toolbar={{
        start: (
          <SegmentedFilter
            label="Situação do convite"
            value={status}
            onValueChange={(next) => {
              setStatus(next);
              table.resetPage();
            }}
            options={[
              {
                value: ALL_FILTER_VALUE,
                label: "Todos",
                count: counts ? counts.pending + counts.expired + counts.accepted : undefined,
              },
              { value: "Pending", label: "Pendentes", count: counts?.pending },
              { value: "Expired", label: "Vencidos", count: counts?.expired },
              { value: "Accepted", label: "Aceitos", count: counts?.accepted },
            ]}
          />
        ),
      }}
      empty={<EmptyState title="Nenhum convite por aqui" description="Os convites enviados aparecem nesta lista." />}
    />
  );
}
