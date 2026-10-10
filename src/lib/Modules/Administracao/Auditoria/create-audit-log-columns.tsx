import { createColumnHelper } from "@tanstack/react-table";

import type { DataTableColumn, DataTableFeatures } from "@/@types/Modules/Core/DesignSystem/data-table";
import { AuditDetailButton } from "@/components/Modules/Administracao/Auditoria/audit-detail-button";
import { AuditTypeBadge } from "@/components/Modules/Administracao/Auditoria/audit-type-badge";
import { PersonCell } from "@/components/Modules/Administracao/Usuarios/person-cell";
import { DataTableSortHeader } from "@/components/Modules/Core/DesignSystem/data-table-sort-header";
import { DateTimeCell } from "@/components/Modules/Core/DesignSystem/date-time-cell";
import { AUDIT_LOG_COLUMN_SIZE } from "@/constants/Modules/Administracao/Auditoria/audit-logs";
import {
  DATA_TABLE_ACTIONS_COLUMN_ID,
  DATA_TABLE_UTILITY_COLUMN_OPTIONS,
} from "@/constants/Modules/Core/DesignSystem/data-table";
import { EMPTY_VALUE } from "@/constants/Modules/Core/DesignSystem/number-format";
import type { AuditLog } from "@/schemas/Modules/Administracao/Auditoria/audit-log-schema";

const columnHelper = createColumnHelper<DataTableFeatures, AuditLog>();

export function createAuditLogColumns(): DataTableColumn<AuditLog>[] {
  return columnHelper.columns([
    columnHelper.accessor("createdAt", {
      size: AUDIT_LOG_COLUMN_SIZE.createdAt,
      meta: { label: "Quando" },
      header: ({ column }) => <DataTableSortHeader column={column} />,
      cell: ({ getValue }) => <DateTimeCell value={getValue()} />,
    }),
    columnHelper.accessor("type", {
      size: AUDIT_LOG_COLUMN_SIZE.type,
      meta: { label: "Tipo", card: "badge" },
      header: ({ column }) => <DataTableSortHeader column={column} />,
      cell: ({ getValue }) => <AuditTypeBadge type={getValue()} />,
    }),
    columnHelper.accessor("description", {
      size: AUDIT_LOG_COLUMN_SIZE.description,
      meta: { label: "O que aconteceu", card: "title" },
      header: ({ column }) => <DataTableSortHeader column={column} />,
      cell: ({ row }) => (
        <div className="min-w-0" title={row.original.description ?? undefined}>
          <p className="truncate text-sm">{row.original.description ?? EMPTY_VALUE}</p>
          {row.original.changedFields.length > 0 ? (
            <p className="truncate text-muted-foreground text-xs">Campos: {row.original.changedFields.join(", ")}</p>
          ) : null}
        </div>
      ),
    }),
    columnHelper.accessor((log) => log.userName ?? log.userEmail ?? "", {
      id: "user",
      size: AUDIT_LOG_COLUMN_SIZE.user,
      meta: { label: "Quem fez" },
      header: ({ column }) => <DataTableSortHeader column={column} />,
      cell: ({ row }) =>
        row.original.userName || row.original.userEmail ? (
          <PersonCell
            name={row.original.userName ?? row.original.userEmail ?? ""}
            email={row.original.userEmail ?? ""}
          />
        ) : (
          <span className="text-muted-foreground">Sistema</span>
        ),
    }),
    columnHelper.accessor("pageCode", {
      size: AUDIT_LOG_COLUMN_SIZE.page,
      meta: { label: "Página" },
      header: ({ column }) => <DataTableSortHeader column={column} />,
      cell: ({ getValue }) => <span className="font-mono text-xs">{getValue() ?? EMPTY_VALUE}</span>,
    }),
    columnHelper.accessor("entityName", {
      size: AUDIT_LOG_COLUMN_SIZE.entity,
      meta: { label: "Registro" },
      header: ({ column }) => <DataTableSortHeader column={column} />,
      cell: ({ row }) => (
        <span className="truncate text-sm" title={row.original.entityId ?? undefined}>
          {row.original.entityName ?? EMPTY_VALUE}
        </span>
      ),
    }),
    columnHelper.display({
      ...DATA_TABLE_UTILITY_COLUMN_OPTIONS,
      id: DATA_TABLE_ACTIONS_COLUMN_ID,
      size: AUDIT_LOG_COLUMN_SIZE.actions,
      minSize: AUDIT_LOG_COLUMN_SIZE.actions,
      meta: { label: "Ações" },
      header: () => <span className="block text-right">Ações</span>,
      cell: ({ row }) => (
        <AuditDetailButton logId={row.original.id} description={row.original.description ?? row.original.type} />
      ),
    }),
  ]);
}
