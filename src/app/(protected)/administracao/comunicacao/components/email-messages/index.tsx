"use client";

import { DataTable } from "@/components/Modules/Core/DesignSystem/data-table";
import { EmptyState } from "@/components/Modules/Core/DesignSystem/empty-state";
import { ErrorState } from "@/components/Modules/Core/DesignSystem/error-state";
import { SectionHeader } from "@/components/Modules/Core/DesignSystem/section-header";
import { Skeleton } from "@/components/ui/skeleton";
import { useCommunication } from "@/hooks/Modules/Administracao/Comunicacao/use-communication";
import { createMessageColumns } from "@/lib/Modules/Administracao/Comunicacao/create-message-columns";

import { LayoutCard } from "../layout-card";

const COLUMNS = createMessageColumns();
const LAYOUT_SKELETONS = ["cabecalho", "rodape"] as const;

export function EmailMessages() {
  const { data, isPending, isError, refetch } = useCommunication();

  if (isError) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div className="space-y-8">
      <section aria-label="Componentes do e-mail" className="space-y-3">
        <SectionHeader
          title="Componentes do e-mail"
          description="O cabeçalho e o rodapé entram em todos os e-mails enviados."
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {data
            ? data.layout.map((notification) => <LayoutCard key={notification.key} notification={notification} />)
            : LAYOUT_SKELETONS.map((key) => <Skeleton key={key} className="h-28 w-full" />)}
        </div>
      </section>
      <section aria-label="E-mails disparados" className="space-y-3">
        <SectionHeader
          title="E-mails disparados"
          description="Ligue, desligue e personalize cada e-mail. Os de segurança não podem ser desligados."
        />
        <DataTable
          columns={COLUMNS}
          data={data?.messages ?? []}
          getRowId={(notification) => notification.key}
          loading={isPending}
          empty={<EmptyState title="Nenhum e-mail configurado" />}
        />
      </section>
    </div>
  );
}
