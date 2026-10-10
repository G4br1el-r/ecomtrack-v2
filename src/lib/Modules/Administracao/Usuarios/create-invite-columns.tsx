import { createColumnHelper } from "@tanstack/react-table";

import type { DataTableColumn, DataTableFeatures } from "@/@types/Modules/Core/DesignSystem/data-table";
import { InviteRowActions } from "@/components/Modules/Administracao/Usuarios/invite-row-actions";
import { PersonCell } from "@/components/Modules/Administracao/Usuarios/person-cell";
import { DataTableSortHeader } from "@/components/Modules/Core/DesignSystem/data-table-sort-header";
import { DateTimeCell } from "@/components/Modules/Core/DesignSystem/date-time-cell";
import { Badge } from "@/components/ui/badge";
import { INVITE_COLUMN_SIZE, INVITE_STATUS_BADGE } from "@/constants/Modules/Administracao/Usuarios/users";
import {
  DATA_TABLE_ACTIONS_COLUMN_ID,
  DATA_TABLE_UTILITY_COLUMN_OPTIONS,
} from "@/constants/Modules/Core/DesignSystem/data-table";
import type { Invite } from "@/schemas/Modules/Administracao/Usuarios/invite-schema";

const columnHelper = createColumnHelper<DataTableFeatures, Invite>();

export function createInviteColumns(): DataTableColumn<Invite>[] {
  return columnHelper.columns([
    columnHelper.accessor((invite) => `${invite.firstName} ${invite.lastName}`, {
      id: "invitee",
      size: INVITE_COLUMN_SIZE.invitee,
      meta: { label: "Convidado" },
      header: ({ column }) => <DataTableSortHeader column={column} />,
      cell: ({ row }) => (
        <PersonCell name={`${row.original.firstName} ${row.original.lastName}`} email={row.original.email} />
      ),
    }),
    columnHelper.accessor("profileName", {
      size: INVITE_COLUMN_SIZE.profile,
      meta: { label: "Perfil" },
      header: ({ column }) => <DataTableSortHeader column={column} />,
      cell: ({ getValue }) => getValue() ?? <span className="text-muted-foreground">Sem perfil</span>,
    }),
    columnHelper.accessor("status", {
      size: INVITE_COLUMN_SIZE.status,
      meta: { label: "Situação", card: "badge" },
      header: ({ column }) => <DataTableSortHeader column={column} />,
      cell: ({ getValue }) => {
        const status = INVITE_STATUS_BADGE[getValue()];
        return <Badge variant={status.tone}>{status.label}</Badge>;
      },
    }),
    columnHelper.accessor("sentAt", {
      size: INVITE_COLUMN_SIZE.sentAt,
      meta: { label: "Enviado em" },
      header: ({ column }) => <DataTableSortHeader column={column} />,
      cell: ({ getValue }) => <DateTimeCell value={getValue()} />,
    }),
    columnHelper.accessor((invite) => (invite.status === "Accepted" ? invite.acceptedAt : invite.expiresAt), {
      id: "expiresAt",
      size: INVITE_COLUMN_SIZE.expiresAt,
      meta: { label: "Vale até / Aceito em" },
      header: ({ column }) => <DataTableSortHeader column={column} />,
      cell: ({ getValue }) => <DateTimeCell value={getValue()} />,
    }),
    columnHelper.accessor("invitedByName", {
      size: INVITE_COLUMN_SIZE.invitedBy,
      meta: { label: "Convidado por" },
      header: ({ column }) => <DataTableSortHeader column={column} />,
    }),
    columnHelper.display({
      ...DATA_TABLE_UTILITY_COLUMN_OPTIONS,
      id: DATA_TABLE_ACTIONS_COLUMN_ID,
      size: INVITE_COLUMN_SIZE.actions,
      minSize: INVITE_COLUMN_SIZE.actions,
      meta: { label: "Ações" },
      header: () => <span className="block text-right">Ações</span>,
      cell: ({ row }) => <InviteRowActions invite={row.original} />,
    }),
  ]);
}
