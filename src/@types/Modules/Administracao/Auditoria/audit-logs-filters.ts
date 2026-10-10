import type { PagedFilters } from "@/@types/Modules/Core/Api/paged-filters";
import type { AuditType } from "@/schemas/Modules/Administracao/Auditoria/audit-type-schema";

export type AuditLogsFilters = PagedFilters & {
  PageCode?: string;
  ActionCode?: string;
  Type?: AuditType;
  From?: string;
  To?: string;
  EntityName?: string;
  EntityId?: string;
  UserId?: string;
};
