"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import type { AuditLogsFilters } from "@/@types/Modules/Administracao/Auditoria/audit-logs-filters";
import { AUDIT_LOGS_QUERY_KEY } from "@/constants/Modules/Administracao/Auditoria/audit-logs";
import { QUERY_CACHE_POLICY } from "@/constants/Modules/Core/Api/query-cache-policies";
import { listAuditLogs } from "@/services/Modules/Administracao/Auditoria/list-audit-logs";

export function useAuditLogs(filters: AuditLogsFilters) {
  return useQuery({
    ...QUERY_CACHE_POLICY.operational,
    queryKey: [...AUDIT_LOGS_QUERY_KEY, filters],
    queryFn: () => listAuditLogs(filters),
    placeholderData: keepPreviousData,
  });
}
