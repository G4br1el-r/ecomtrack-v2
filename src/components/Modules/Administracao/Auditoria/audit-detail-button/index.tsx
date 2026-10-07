"use client";

import { Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuditDetailStore } from "@/store/Modules/Administracao/Auditoria/audit-detail-store";

export function AuditDetailButton({ logId, description }: { logId: string; description: string }) {
  const open = useAuditDetailStore((state) => state.open);
  return (
    <div className="flex justify-end">
      <Button variant="ghost" size="icon-sm" aria-label={`Ver detalhe: ${description}`} onClick={() => open(logId)}>
        <Eye aria-hidden="true" />
      </Button>
    </div>
  );
}
