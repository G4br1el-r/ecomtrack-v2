"use client";

import type { RowSelectionState } from "@tanstack/react-table";
import { useState } from "react";

import type { PipelineProduct } from "@/@types/Modules/Catalogo/EsteiraCadastro/pipeline-product";
import type { PipelineStage } from "@/@types/Modules/Catalogo/EsteiraCadastro/pipeline-stage";
import type { DataTableColumn, DataTableToolbarSlots } from "@/@types/Modules/Core/DesignSystem/data-table";
import { BulkBar } from "@/components/Modules/Core/DesignSystem/bulk-bar";
import { DataTable } from "@/components/Modules/Core/DesignSystem/data-table";
import { EmptyState } from "@/components/Modules/Core/DesignSystem/empty-state";
import { Card } from "@/components/ui/card";
import { PIPELINE_STAGES } from "@/constants/Modules/Catalogo/EsteiraCadastro/pipeline";
import { PIPELINE_TABLE_SETTINGS } from "@/constants/Modules/Catalogo/EsteiraCadastro/pipeline-table";
import { createPipelineColumns } from "@/lib/Modules/Catalogo/EsteiraCadastro/create-pipeline-columns";

const STAGE_COLUMNS: Record<PipelineStage, DataTableColumn<PipelineProduct>[]> = {
  importacao: createPipelineColumns("importacao"),
  cadastro: createPipelineColumns("cadastro"),
  precificacao: createPipelineColumns("precificacao"),
  publicacao: createPipelineColumns("publicacao"),
  validacao: createPipelineColumns("validacao"),
  finalizado: createPipelineColumns("finalizado"),
};

export function StageTable({
  stage,
  products,
  loading,
  toolbar,
  empty,
  bulkActions,
}: {
  stage: PipelineStage;
  products: PipelineProduct[];
  loading: boolean;
  toolbar?: DataTableToolbarSlots;
  empty?: React.ReactNode;
  bulkActions?: React.ReactNode;
}) {
  const config = PIPELINE_STAGES[stage];
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const selectedCount = Object.values(rowSelection).filter(Boolean).length;
  const selectable = bulkActions !== undefined;

  return (
    <>
      <Card size="sm" className="min-w-0 px-4">
        <DataTable
          columns={STAGE_COLUMNS[stage]}
          data={products}
          getRowId={(product) => product.id}
          rowSelection={selectable ? rowSelection : undefined}
          onRowSelectionChange={selectable ? setRowSelection : undefined}
          loading={loading}
          settings={PIPELINE_TABLE_SETTINGS[stage]}
          toolbar={toolbar}
          empty={empty ?? <EmptyState title={config.emptyTitle} description={config.emptyDescription} />}
        />
      </Card>
      {selectable ? (
        <BulkBar count={selectedCount} onClear={() => setRowSelection({})}>
          {bulkActions}
        </BulkBar>
      ) : null}
    </>
  );
}
