"use client";

import { useQuery } from "@tanstack/react-query";

import { AUDIT_LOG_DETAIL_QUERY_KEY } from "@/constants/Modules/Administracao/Auditoria/audit-logs";
import { getAuditLog } from "@/services/Modules/Administracao/Auditoria/get-audit-log";

export function useAuditLog(id: string | null) {
  return useQuery({
    queryKey: [...AUDIT_LOG_DETAIL_QUERY_KEY, id],
    queryFn: () => getAuditLog(id ?? ""),
    enabled: id !== null,
  });
}
