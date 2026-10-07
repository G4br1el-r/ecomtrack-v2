import type { AuditDiffRow } from "@/@types/Modules/Administracao/Auditoria/audit-diff-row";
import type { AuditLogDetail } from "@/schemas/Modules/Administracao/Auditoria/audit-log-detail-schema";

import { stringifyAuditValue } from "./stringify-audit-value";

export function buildAuditDiff(detail: AuditLogDetail): AuditDiffRow[] {
  const before = typeof detail.oldValues === "object" && detail.oldValues !== null ? detail.oldValues : {};
  const after = typeof detail.newValues === "object" && detail.newValues !== null ? detail.newValues : {};
  const fields =
    detail.summary.changedFields.length > 0
      ? detail.summary.changedFields
      : [...new Set([...Object.keys(before), ...Object.keys(after)])];
  return fields.map((field) => ({
    field,
    before: stringifyAuditValue(Object.entries(before).find(([key]) => key === field)?.[1]),
    after: stringifyAuditValue(Object.entries(after).find(([key]) => key === field)?.[1]),
  }));
}
