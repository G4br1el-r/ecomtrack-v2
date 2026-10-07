"use client";

import { AuditTypeBadge } from "@/components/Modules/Administracao/Auditoria/audit-type-badge";
import { CopyButton } from "@/components/Modules/Core/DesignSystem/copy-button";
import { DataTable } from "@/components/Modules/Core/DesignSystem/data-table";
import { DetailRow } from "@/components/Modules/Core/DesignSystem/detail-row";
import { DetailSection } from "@/components/Modules/Core/DesignSystem/detail-section";
import { EmptyState } from "@/components/Modules/Core/DesignSystem/empty-state";
import { EMPTY_VALUE } from "@/constants/Modules/Core/DesignSystem/number-format";
import { buildAuditDiff } from "@/lib/Modules/Administracao/Auditoria/build-audit-diff";
import { createAuditDiffColumns } from "@/lib/Modules/Administracao/Auditoria/create-audit-diff-columns";
import { formatDisplayDate } from "@/lib/Modules/Core/DesignSystem/format-display-date";
import { formatDisplayTime } from "@/lib/Modules/Core/DesignSystem/format-display-time";
import type { AuditLogDetail } from "@/schemas/Modules/Administracao/Auditoria/audit-log-detail-schema";

const DIFF_COLUMNS = createAuditDiffColumns();

export function AuditDetailContent({ detail }: { detail: AuditLogDetail }) {
  const { summary } = detail;
  const diff = buildAuditDiff(detail);
  return (
    <>
      <DetailSection title="Registro">
        <DetailRow label="Tipo" value={<AuditTypeBadge type={summary.type} />} />
        <DetailRow
          label="Quando"
          value={`${formatDisplayDate(summary.createdAt)} às ${formatDisplayTime(summary.createdAt)}`}
        />
        <DetailRow
          label="Quem fez"
          value={summary.userName ? `${summary.userName} · ${summary.userEmail}` : "Sistema"}
        />
        <DetailRow label="Página" value={summary.pageCode ?? EMPTY_VALUE} />
        <DetailRow label="Ação" value={summary.actionCode ?? EMPTY_VALUE} />
        <DetailRow
          label="Registro"
          value={summary.entityName ? `${summary.entityName} · ${summary.entityId ?? ""}` : EMPTY_VALUE}
        />
      </DetailSection>
      <DetailSection title="O que mudou">
        {diff.length > 0 ? (
          <DataTable columns={DIFF_COLUMNS} data={diff} getRowId={(row) => row.field} />
        ) : (
          <EmptyState className="min-h-0 py-4" illustration={null} title="Nenhum campo alterado neste registro" />
        )}
      </DetailSection>
      <DetailSection title="Dados técnicos">
        <DetailRow label="IP" value={detail.ip ?? EMPTY_VALUE} />
        <DetailRow label="Navegador" value={detail.userAgent ?? EMPTY_VALUE} valueClassName="break-all text-xs" />
        <DetailRow
          label="Requisição"
          value={
            detail.correlationId ? (
              <span className="inline-flex items-center gap-1 font-mono text-xs">
                {detail.correlationId}
                <CopyButton value={detail.correlationId} label="Copiar identificador da requisição" />
              </span>
            ) : (
              EMPTY_VALUE
            )
          }
        />
      </DetailSection>
    </>
  );
}
