import { createColumnHelper } from "@tanstack/react-table";

import type { AuditDiffRow } from "@/@types/Modules/Administracao/Auditoria/audit-diff-row";
import type { DataTableColumn, DataTableFeatures } from "@/@types/Modules/Core/DesignSystem/data-table";
import { AUDIT_DIFF_COLUMN_SIZE } from "@/constants/Modules/Administracao/Auditoria/audit-logs";

const columnHelper = createColumnHelper<DataTableFeatures, AuditDiffRow>();

export function createAuditDiffColumns(): DataTableColumn<AuditDiffRow>[] {
  return columnHelper.columns([
    columnHelper.accessor("field", {
      size: AUDIT_DIFF_COLUMN_SIZE.field,
      meta: { label: "Campo" },
      header: "Campo",
      cell: ({ getValue }) => <span className="font-mono text-xs">{getValue()}</span>,
    }),
    columnHelper.accessor("before", {
      size: AUDIT_DIFF_COLUMN_SIZE.before,
      meta: { label: "Antes" },
      header: "Antes",
      cell: ({ getValue }) => <span className="break-all text-destructive text-sm">{getValue()}</span>,
    }),
    columnHelper.accessor("after", {
      size: AUDIT_DIFF_COLUMN_SIZE.after,
      meta: { label: "Depois" },
      header: "Depois",
      cell: ({ getValue }) => <span className="break-all text-sm text-success">{getValue()}</span>,
    }),
  ]);
}
