import type { AuditLogsFilters } from "@/@types/Modules/Administracao/Auditoria/audit-logs-filters";
import { API_ENDPOINTS } from "@/constants/Modules/Core/Api/api-endpoints";
import {
  type AuditLogsPage,
  auditLogsPageSchema,
} from "@/schemas/Modules/Administracao/Auditoria/audit-logs-page-schema";
import { requestApi } from "@/services/Modules/Core/Api/request-api";

export function listAuditLogs(filters: AuditLogsFilters): Promise<AuditLogsPage> {
  return requestApi(API_ENDPOINTS.auditLogs.list, auditLogsPageSchema, { query: filters });
}
