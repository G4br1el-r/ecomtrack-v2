import { createColumnHelper } from "@tanstack/react-table";

import type { DataTableColumn, DataTableFeatures } from "@/@types/Modules/Core/DesignSystem/data-table";
import { PersonCell } from "@/components/Modules/Administracao/Usuarios/person-cell";
import { UserRowActions } from "@/components/Modules/Administracao/Usuarios/user-row-actions";
import { DataTableSortHeader } from "@/components/Modules/Core/DesignSystem/data-table-sort-header";
import { DateTimeCell } from "@/components/Modules/Core/DesignSystem/date-time-cell";
import { Badge } from "@/components/ui/badge";
import { USER_COLUMN_SIZE, USER_STATUS_BADGE } from "@/constants/Modules/Administracao/Usuarios/users";
import {
  DATA_TABLE_ACTIONS_COLUMN_ID,
  DATA_TABLE_UTILITY_COLUMN_OPTIONS,
} from "@/constants/Modules/Core/DesignSystem/data-table";
import type { User } from "@/schemas/Modules/Administracao/Usuarios/user-schema";

const columnHelper = createColumnHelper<DataTableFeatures, User>();

export function createUserColumns(): DataTableColumn<User>[] {
  return columnHelper.columns([
    columnHelper.accessor((user) => `${user.firstName} ${user.lastName}`, {
      id: "user",
      size: USER_COLUMN_SIZE.user,
      meta: { label: "Usuário" },
      header: ({ column }) => <DataTableSortHeader column={column} />,
      cell: ({ row }) => (
        <PersonCell
          name={`${row.original.firstName} ${row.original.lastName}`}
          email={row.original.email}
          avatarUrl={row.original.avatarUrl}
        />
      ),
    }),
    columnHelper.accessor("profileName", {
      size: USER_COLUMN_SIZE.profile,
      meta: { label: "Perfil" },
      header: ({ column }) => <DataTableSortHeader column={column} />,
      cell: ({ getValue }) => getValue() ?? <span className="text-muted-foreground">Sem perfil</span>,
    }),
    columnHelper.accessor("status", {
      size: USER_COLUMN_SIZE.status,
      meta: { label: "Situação", card: "badge" },
      header: ({ column }) => <DataTableSortHeader column={column} />,
      cell: ({ getValue }) => {
        const status = USER_STATUS_BADGE[getValue()];
        return <Badge variant={status.tone}>{status.label}</Badge>;
      },
    }),
    columnHelper.accessor("lastLoginAt", {
      size: USER_COLUMN_SIZE.lastLoginAt,
      meta: { label: "Último login" },
      header: ({ column }) => <DataTableSortHeader column={column} />,
      cell: ({ getValue }) => <DateTimeCell value={getValue()} empty="Nunca entrou" />,
    }),
    columnHelper.accessor("createdAt", {
      size: USER_COLUMN_SIZE.createdAt,
      meta: { label: "Criado em" },
      header: ({ column }) => <DataTableSortHeader column={column} />,
      cell: ({ getValue }) => <DateTimeCell value={getValue()} />,
    }),
    columnHelper.display({
      ...DATA_TABLE_UTILITY_COLUMN_OPTIONS,
      id: DATA_TABLE_ACTIONS_COLUMN_ID,
      size: USER_COLUMN_SIZE.actions,
      minSize: USER_COLUMN_SIZE.actions,
      meta: { label: "Ações" },
      header: () => <span className="block text-right">Ações</span>,
      cell: ({ row }) => <UserRowActions user={row.original} />,
    }),
  ]);
}
