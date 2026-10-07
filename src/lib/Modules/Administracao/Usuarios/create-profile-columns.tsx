import { createColumnHelper } from "@tanstack/react-table";

import type { DataTableColumn, DataTableFeatures } from "@/@types/Modules/Core/DesignSystem/data-table";
import { ProfileRowActions } from "@/components/Modules/Administracao/Usuarios/profile-row-actions";
import { DataTableSortHeader } from "@/components/Modules/Core/DesignSystem/data-table-sort-header";
import { DateTimeCell } from "@/components/Modules/Core/DesignSystem/date-time-cell";
import { NumberCell } from "@/components/Modules/Core/DesignSystem/number-cell";
import { Badge } from "@/components/ui/badge";
import { PROFILE_COLUMN_SIZE } from "@/constants/Modules/Administracao/Usuarios/users";
import { DATA_TABLE_UTILITY_COLUMN_OPTIONS } from "@/constants/Modules/Core/DesignSystem/data-table";
import type { Profile } from "@/schemas/Modules/Administracao/Usuarios/profile-schema";

const columnHelper = createColumnHelper<DataTableFeatures, Profile>();

export function createProfileColumns(): DataTableColumn<Profile>[] {
  return columnHelper.columns([
    columnHelper.accessor("name", {
      size: PROFILE_COLUMN_SIZE.profile,
      meta: { label: "Perfil" },
      header: ({ column }) => <DataTableSortHeader column={column} />,
      cell: ({ row }) => (
        <div className="min-w-0" title={row.original.description ?? row.original.name}>
          <p className="truncate font-medium text-sm">{row.original.name}</p>
          {row.original.description ? (
            <p className="truncate text-muted-foreground text-xs">{row.original.description}</p>
          ) : null}
        </div>
      ),
    }),
    columnHelper.accessor("userCount", {
      size: PROFILE_COLUMN_SIZE.users,
      meta: { label: "Usuários" },
      header: ({ column }) => <DataTableSortHeader column={column} />,
      cell: ({ getValue }) => <NumberCell value={getValue()} kind="integer" />,
    }),
    columnHelper.accessor("isDefault", {
      size: PROFILE_COLUMN_SIZE.isDefault,
      meta: { label: "Padrão do convite" },
      header: ({ column }) => <DataTableSortHeader column={column} />,
      cell: ({ getValue }) => (getValue() ? <Badge variant="info">Padrão</Badge> : null),
    }),
    columnHelper.accessor("version", {
      size: PROFILE_COLUMN_SIZE.version,
      meta: { label: "Versão" },
      header: ({ column }) => <DataTableSortHeader column={column} />,
      cell: ({ getValue }) => <span className="text-muted-foreground tabular-nums">v{getValue()}</span>,
    }),
    columnHelper.accessor("updatedAt", {
      size: PROFILE_COLUMN_SIZE.updatedAt,
      meta: { label: "Atualizado em" },
      header: ({ column }) => <DataTableSortHeader column={column} />,
      cell: ({ getValue }) => <DateTimeCell value={getValue()} />,
    }),
    columnHelper.display({
      ...DATA_TABLE_UTILITY_COLUMN_OPTIONS,
      id: "actions",
      size: PROFILE_COLUMN_SIZE.actions,
      minSize: PROFILE_COLUMN_SIZE.actions,
      meta: { label: "Ações" },
      header: () => <span className="block text-right">Ações</span>,
      cell: ({ row }) => <ProfileRowActions profile={row.original} />,
    }),
  ]);
}
