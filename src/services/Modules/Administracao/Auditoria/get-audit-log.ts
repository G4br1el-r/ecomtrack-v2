import { API_ENDPOINTS } from "@/constants/Modules/Core/Api/api-endpoints";
import {
  type AuditLogDetail,
  auditLogDetailSchema,
} from "@/schemas/Modules/Administracao/Auditoria/audit-log-detail-schema";
import { requestApi } from "@/services/Modules/Core/Api/request-api";

export function getAuditLog(id: string): Promise<AuditLogDetail> {
  return requestApi(API_ENDPOINTS.auditLogs.get, auditLogDetailSchema, { params: { id } });
}
