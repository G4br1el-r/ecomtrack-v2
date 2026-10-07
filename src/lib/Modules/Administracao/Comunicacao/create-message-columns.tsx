import { createColumnHelper } from "@tanstack/react-table";

import type { DataTableColumn, DataTableFeatures } from "@/@types/Modules/Core/DesignSystem/data-table";
import { NotificationEditButton } from "@/components/Modules/Administracao/Comunicacao/notification-edit-button";
import { NotificationStatusSwitch } from "@/components/Modules/Administracao/Comunicacao/notification-status-switch";
import { DateTimeCell } from "@/components/Modules/Core/DesignSystem/date-time-cell";
import { Badge } from "@/components/ui/badge";
import { MESSAGE_COLUMN_SIZE } from "@/constants/Modules/Administracao/Comunicacao/communication";
import type { NotificationSummary } from "@/schemas/Modules/Administracao/Comunicacao/notification-summary-schema";

const columnHelper = createColumnHelper<DataTableFeatures, NotificationSummary>();

export function createMessageColumns(): DataTableColumn<NotificationSummary>[] {
  return columnHelper.columns([
    columnHelper.accessor("name", {
      size: MESSAGE_COLUMN_SIZE.name,
      meta: { label: "E-mail" },
      header: "E-mail",
      cell: ({ row }) => (
        <div className="min-w-0">
          <p className="truncate font-medium text-sm">{row.original.name}</p>
          <p className="truncate text-muted-foreground text-xs">{row.original.description}</p>
        </div>
      ),
    }),
    columnHelper.accessor("isEnabled", {
      size: MESSAGE_COLUMN_SIZE.status,
      meta: { label: "Ligado" },
      header: "Ligado",
      cell: ({ row }) => <NotificationStatusSwitch notification={row.original} />,
    }),
    columnHelper.accessor("isCustom", {
      size: MESSAGE_COLUMN_SIZE.text,
      meta: { label: "Texto" },
      header: "Texto",
      cell: ({ row }) =>
        row.original.isCustom ? (
          <Badge variant="info">Personalizado</Badge>
        ) : row.original.hasCompanyDefault ? (
          <Badge variant="teal">Padrão da empresa</Badge>
        ) : (
          <Badge variant="secondary">Padrão da plataforma</Badge>
        ),
    }),
    columnHelper.accessor("updatedAt", {
      size: MESSAGE_COLUMN_SIZE.updatedAt,
      meta: { label: "Atualizado em" },
      header: "Atualizado em",
      cell: ({ getValue }) => <DateTimeCell value={getValue()} />,
    }),
    columnHelper.display({
      id: "actions",
      size: MESSAGE_COLUMN_SIZE.actions,
      meta: { label: "Ações" },
      header: () => <span className="block text-right">Ações</span>,
      cell: ({ row }) => <NotificationEditButton notification={row.original} />,
    }),
  ]);
}
