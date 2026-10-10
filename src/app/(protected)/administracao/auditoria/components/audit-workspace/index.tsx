"use client";

import { endOfDay, startOfDay } from "date-fns";
import { useState } from "react";

import type { ComboboxOption } from "@/@types/Modules/Core/DesignSystem/combobox";
import type { DateRange } from "@/@types/Modules/Core/DesignSystem/date-range";
import { Combobox } from "@/components/Modules/Core/DesignSystem/combobox";
import { DataTable } from "@/components/Modules/Core/DesignSystem/data-table";
import { DateRangeField } from "@/components/Modules/Core/DesignSystem/date-range-field";
import { EmptyState } from "@/components/Modules/Core/DesignSystem/empty-state";
import { ErrorState } from "@/components/Modules/Core/DesignSystem/error-state";
import { PageHeader } from "@/components/Modules/Core/DesignSystem/page-header";
import { AUDIT_TYPE_META } from "@/constants/Modules/Administracao/Auditoria/audit";
import { AUDIT_LOGS_TABLE_SETTINGS } from "@/constants/Modules/Administracao/Auditoria/audit-logs";
import { ALL_FILTER_VALUE } from "@/constants/Modules/Core/DesignSystem/segmented-filter";
import { useAuditLogs } from "@/hooks/Modules/Administracao/Auditoria/use-audit-logs";
import { usePagePermissions } from "@/hooks/Modules/Core/Access/use-page-permissions";
import { usePermissionMenu } from "@/hooks/Modules/Core/Access/use-permission-menu";
import { useDataTableServerState } from "@/hooks/Modules/Core/DesignSystem/use-data-table-server-state";
import { createAuditLogColumns } from "@/lib/Modules/Administracao/Auditoria/create-audit-log-columns";
import { type AuditType, auditTypeSchema } from "@/schemas/Modules/Administracao/Auditoria/audit-type-schema";

import { AuditDetailSheet } from "../audit-detail-sheet";

const COLUMNS = createAuditLogColumns();
const TYPE_OPTIONS: ComboboxOption<AuditType | typeof ALL_FILTER_VALUE>[] = [
  { value: ALL_FILTER_VALUE, label: "Todos os tipos" },
  ...auditTypeSchema.options.map((type) => ({ value: type, label: AUDIT_TYPE_META[type].label })),
];

export function AuditWorkspace() {
  const table = useDataTableServerState(AUDIT_LOGS_TABLE_SETTINGS);
  const [type, setType] = useState<AuditType | typeof ALL_FILTER_VALUE>(ALL_FILTER_VALUE);
  const [period, setPeriod] = useState<DateRange>({});
  const [pageCode, setPageCode] = useState<string>(ALL_FILTER_VALUE);
  const [actionCode, setActionCode] = useState<string>(ALL_FILTER_VALUE);
  const { data: menu } = usePermissionMenu();
  const { data: pageComponents } = usePagePermissions(pageCode === ALL_FILTER_VALUE ? undefined : pageCode);
  const pageOptions: ComboboxOption[] = [
    { value: ALL_FILTER_VALUE, label: "Todas as páginas" },
    ...(menu ?? []).flatMap((section) => section.pages.map((page) => ({ value: page.code, label: page.name }))),
  ];
  const actionOptions: ComboboxOption[] = [
    { value: ALL_FILTER_VALUE, label: "Todas as ações" },
    ...(pageComponents?.components ?? []).map((component) => ({ value: component.code, label: component.name })),
  ];
  const { data, isPending, isError, refetch } = useAuditLogs({
    ...table.query,
    Type: type === ALL_FILTER_VALUE ? undefined : type,
    PageCode: pageCode === ALL_FILTER_VALUE ? undefined : pageCode,
    ActionCode: actionCode === ALL_FILTER_VALUE ? undefined : actionCode,
    From: period.from ? startOfDay(period.from).toISOString() : undefined,
    To: period.to ? endOfDay(period.to).toISOString() : undefined,
  });
  const counts = data?.metadata;

  return (
    <>
      <PageHeader
        title="Auditoria"
        description={
          counts
            ? `${counts.creates} criações · ${counts.updates} edições · ${counts.deletes} exclusões · ${counts.others} outros`
            : "Tudo o que foi feito na empresa: quem, quando, onde e o que mudou."
        }
      />
      {isError ? (
        <ErrorState onRetry={() => refetch()} />
      ) : (
        <DataTable
          columns={COLUMNS}
          data={data?.items ?? []}
          getRowId={(log) => log.id}
          loading={isPending}
          settings={AUDIT_LOGS_TABLE_SETTINGS}
          server={table.server(data?.totalCount ?? 0)}
          toolbar={{
            start: (
              <>
                <Combobox
                  label="Tipo de registro"
                  options={TYPE_OPTIONS}
                  value={type}
                  onValueChange={(next) => {
                    setType(next);
                    table.resetPage();
                  }}
                  className="h-9 w-44"
                />
                <Combobox
                  label="Página"
                  options={pageOptions}
                  value={pageCode}
                  onValueChange={(next) => {
                    setPageCode(next);
                    setActionCode(ALL_FILTER_VALUE);
                    table.resetPage();
                  }}
                  searchPlaceholder="Buscar página..."
                  className="h-9 w-48"
                />
                {pageCode === ALL_FILTER_VALUE ? null : (
                  <Combobox
                    label="Ação"
                    options={actionOptions}
                    value={actionCode}
                    onValueChange={(next) => {
                      setActionCode(next);
                      table.resetPage();
                    }}
                    searchPlaceholder="Buscar ação..."
                    className="h-9 w-48"
                  />
                )}
                <DateRangeField
                  value={period}
                  onChange={(next) => {
                    setPeriod(next);
                    table.resetPage();
                  }}
                />
              </>
            ),
          }}
          empty={
            <EmptyState
              title="Nenhum registro encontrado"
              description="Ajuste a busca, o tipo, a página, a ação ou o período."
            />
          }
        />
      )}
      <AuditDetailSheet />
    </>
  );
}
