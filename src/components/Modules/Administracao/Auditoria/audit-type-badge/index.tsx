import { Badge } from "@/components/ui/badge";
import { AUDIT_TYPE_META } from "@/constants/Modules/Administracao/Auditoria/audit";
import type { AuditType } from "@/schemas/Modules/Administracao/Auditoria/audit-type-schema";

export function AuditTypeBadge({ type }: { type: AuditType }) {
  const meta = AUDIT_TYPE_META[type];
  const Icon = meta.icon;
  return (
    <Badge variant={meta.tone} className="gap-1">
      <Icon aria-hidden="true" />
      {meta.label}
    </Badge>
  );
}
