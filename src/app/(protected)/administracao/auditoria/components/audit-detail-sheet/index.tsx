"use client";

import { ScrollText } from "lucide-react";

import { DetailSheet } from "@/components/Modules/Core/DesignSystem/detail-sheet";
import { ErrorState } from "@/components/Modules/Core/DesignSystem/error-state";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuditLog } from "@/hooks/Modules/Administracao/Auditoria/use-audit-log";
import { useAuditDetailStore } from "@/store/Modules/Administracao/Auditoria/audit-detail-store";

import { AuditDetailContent } from "../audit-detail-content";

export function AuditDetailSheet() {
  const logId = useAuditDetailStore((state) => state.logId);
  const isOpen = useAuditDetailStore((state) => state.isOpen);
  const close = useAuditDetailStore((state) => state.close);
  const detail = useAuditLog(isOpen ? logId : null);

  return (
    <DetailSheet
      open={isOpen}
      onOpenChange={(next) => {
        if (!next) close();
      }}
      icon={ScrollText}
      title="Detalhe do registro"
      description={detail.data?.summary.description ?? undefined}
    >
      {detail.isError ? (
        <ErrorState onRetry={() => detail.refetch()} />
      ) : detail.data ? (
        <AuditDetailContent detail={detail.data} />
      ) : (
        <div className="space-y-3" role="status" aria-label="Carregando o registro">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
      )}
    </DetailSheet>
  );
}
