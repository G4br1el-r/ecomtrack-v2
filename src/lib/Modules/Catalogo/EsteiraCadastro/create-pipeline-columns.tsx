import { createColumnHelper } from "@tanstack/react-table";

import type { PipelineProduct } from "@/@types/Modules/Catalogo/EsteiraCadastro/pipeline-product";
import type { PipelineStage } from "@/@types/Modules/Catalogo/EsteiraCadastro/pipeline-stage";
import type { DataTableColumn, DataTableFeatures } from "@/@types/Modules/Core/DesignSystem/data-table";
import { CategoryCell } from "@/components/Modules/Catalogo/EsteiraCadastro/category-cell";
import { IntegrationCell } from "@/components/Modules/Catalogo/EsteiraCadastro/integration-cell";
import { MarginCell } from "@/components/Modules/Catalogo/EsteiraCadastro/margin-cell";
import { RegistrationProgressCell } from "@/components/Modules/Catalogo/EsteiraCadastro/registration-progress-cell";
import { ResponsibleCell } from "@/components/Modules/Catalogo/EsteiraCadastro/responsible-cell";
import { SupplierCostCell } from "@/components/Modules/Catalogo/EsteiraCadastro/supplier-cost-cell";
import { ViewDetailButton } from "@/components/Modules/Catalogo/EsteiraCadastro/view-detail-button";
import { DataTableSortHeader } from "@/components/Modules/Core/DesignSystem/data-table-sort-header";
import { DateTimeCell } from "@/components/Modules/Core/DesignSystem/date-time-cell";
import { NumberCell } from "@/components/Modules/Core/DesignSystem/number-cell";
import { ProductCell } from "@/components/Modules/Core/DesignSystem/product-cell";
import { Badge } from "@/components/ui/badge";
import { PIPELINE_STATUS, SUPPLIER_LABEL } from "@/constants/Modules/Catalogo/EsteiraCadastro/pipeline";
import {
  PIPELINE_COLUMN_SIZE,
  PIPELINE_STAGE_COLUMNS,
} from "@/constants/Modules/Catalogo/EsteiraCadastro/pipeline-table";
import { PRICING_RULES } from "@/constants/Modules/Catalogo/EsteiraCadastro/pricing";
import {
  DATA_TABLE_ACTIONS_COLUMN_ID,
  DATA_TABLE_UTILITY_COLUMN_OPTIONS,
} from "@/constants/Modules/Core/DesignSystem/data-table";
import { EMPTY_VALUE } from "@/constants/Modules/Core/DesignSystem/number-format";
import { getNetResult } from "@/lib/Modules/Catalogo/EsteiraCadastro/get-net-result";
import { getSuggestedPrice } from "@/lib/Modules/Catalogo/EsteiraCadastro/get-suggested-price";
import { formatDisplayDate } from "@/lib/Modules/Core/DesignSystem/format-display-date";

const columnHelper = createColumnHelper<DataTableFeatures, PipelineProduct>();

export function createPipelineColumns(stage: PipelineStage): DataTableColumn<PipelineProduct>[] {
  const columns = columnHelper.columns([
    columnHelper.accessor((product) => `${product.name} ${product.sku}`, {
      id: "product",
      size: PIPELINE_COLUMN_SIZE.product,
      meta: { label: "Produto" },
      header: ({ column }) => <DataTableSortHeader column={column} />,
      cell: ({ row }) => (
        <div title={row.original.name}>
          <ProductCell name={row.original.name} sku={row.original.sku} />
        </div>
      ),
    }),
    columnHelper.accessor((product) => SUPPLIER_LABEL[product.supplier], {
      id: "supplier",
      size: PIPELINE_COLUMN_SIZE.supplier,
      meta: { label: "Fornecedor" },
      header: ({ column }) => <DataTableSortHeader column={column} />,
      cell: ({ getValue }) => <span className="text-muted-foreground">{getValue()}</span>,
    }),
    columnHelper.accessor("supplierCategory", {
      id: "supplierCategory",
      size: PIPELINE_COLUMN_SIZE.supplierCategory,
      meta: { label: "Categoria" },
      header: ({ column }) => <DataTableSortHeader column={column} />,
    }),
    columnHelper.accessor("region", {
      id: "region",
      size: PIPELINE_COLUMN_SIZE.region,
      meta: { label: "Região" },
      header: ({ column }) => <DataTableSortHeader column={column} />,
      cell: ({ getValue }) => <span className="text-muted-foreground">{getValue()}</span>,
    }),
    columnHelper.accessor((product) => product.categoryPath.join(" › "), {
      id: "category",
      size: PIPELINE_COLUMN_SIZE.category,
      meta: { label: "Categoria" },
      header: ({ column }) => <DataTableSortHeader column={column} />,
      cell: ({ row }) => <CategoryCell path={row.original.categoryPath} />,
    }),
    columnHelper.accessor((product) => product.brand ?? EMPTY_VALUE, {
      id: "brand",
      size: PIPELINE_COLUMN_SIZE.brand,
      meta: { label: "Marca" },
      header: ({ column }) => <DataTableSortHeader column={column} />,
    }),
    columnHelper.accessor((product) => product.responsible ?? "", {
      id: "responsible",
      size: PIPELINE_COLUMN_SIZE.responsible,
      meta: { label: "Responsável" },
      header: ({ column }) => <DataTableSortHeader column={column} />,
      cell: ({ row }) => <ResponsibleCell name={row.original.responsible} />,
    }),
    columnHelper.accessor("completedSteps", {
      id: "progress",
      size: PIPELINE_COLUMN_SIZE.progress,
      meta: { label: "Progresso" },
      header: ({ column }) => <DataTableSortHeader column={column} />,
      cell: ({ getValue }) => <RegistrationProgressCell completedSteps={getValue()} />,
    }),
    columnHelper.accessor("cost", {
      id: "cost",
      size: PIPELINE_COLUMN_SIZE.cost,
      meta: { label: "Custo", card: "highlight" },
      header: ({ column }) => <DataTableSortHeader column={column} align="right" />,
      cell: ({ row }) => (
        <SupplierCostCell
          cost={row.original.cost}
          supplierCost={row.original.supplierCost}
          currency={row.original.currency}
        />
      ),
    }),
    columnHelper.accessor((product) => getSuggestedPrice(product.cost, PRICING_RULES), {
      id: "suggestedPrice",
      size: PIPELINE_COLUMN_SIZE.suggestedPrice,
      meta: { label: "Sugerido" },
      header: ({ column }) => <DataTableSortHeader column={column} align="right" />,
      cell: ({ getValue }) => <NumberCell value={getValue()} kind="currency" muted />,
    }),
    columnHelper.accessor("price", {
      id: "price",
      size: PIPELINE_COLUMN_SIZE.price,
      meta: { label: "Venda", card: "highlight" },
      header: ({ column }) => <DataTableSortHeader column={column} align="right" />,
      cell: ({ getValue }) => <NumberCell value={getValue()} kind="currency" />,
    }),
    columnHelper.accessor((product) => getNetResult(product.price, product.cost, PRICING_RULES)?.margin ?? null, {
      id: "margin",
      size: PIPELINE_COLUMN_SIZE.margin,
      meta: { label: "Margem líquida", card: "highlight" },
      header: ({ column }) => <DataTableSortHeader column={column} align="right" />,
      cell: ({ row }) => <MarginCell result={getNetResult(row.original.price, row.original.cost, PRICING_RULES)} />,
    }),
    columnHelper.accessor((product) => Number(product.brandLinked) + Number(product.categoryLinked), {
      id: "integration",
      size: PIPELINE_COLUMN_SIZE.integration,
      meta: { label: "Integração com a loja" },
      header: ({ column }) => <DataTableSortHeader column={column} />,
      cell: ({ row }) => (
        <IntegrationCell brandLinked={row.original.brandLinked} categoryLinked={row.original.categoryLinked} />
      ),
    }),
    columnHelper.accessor((product) => PIPELINE_STATUS[product.status].label, {
      id: "status",
      size: PIPELINE_COLUMN_SIZE.status,
      meta: { label: "Status", card: "badge" },
      header: ({ column }) => <DataTableSortHeader column={column} />,
      cell: ({ row }) => {
        const status = PIPELINE_STATUS[row.original.status];
        return <Badge variant={status.tone}>{status.label}</Badge>;
      },
    }),
    columnHelper.accessor("importedAt", {
      id: "importedAt",
      size: PIPELINE_COLUMN_SIZE.importedAt,
      meta: { label: "Inserido" },
      header: ({ column }) => <DataTableSortHeader column={column} />,
      cell: ({ getValue }) => <DateTimeCell value={getValue()} />,
    }),
    columnHelper.accessor("updatedAt", {
      id: "updatedAt",
      size: PIPELINE_COLUMN_SIZE.updatedAt,
      meta: { label: "Atualizado em" },
      header: ({ column }) => <DataTableSortHeader column={column} />,
      cell: ({ getValue }) => (
        <span className="text-muted-foreground tabular-nums">{formatDisplayDate(getValue())}</span>
      ),
    }),
    columnHelper.display({
      ...DATA_TABLE_UTILITY_COLUMN_OPTIONS,
      id: DATA_TABLE_ACTIONS_COLUMN_ID,
      size: PIPELINE_COLUMN_SIZE.actions,
      minSize: PIPELINE_COLUMN_SIZE.actions,
      meta: { label: "Ações" },
      header: () => <span className="block text-right">Ações</span>,
      cell: ({ row }) => <ViewDetailButton productId={row.original.id} productName={row.original.name} />,
    }),
  ]);
  return PIPELINE_STAGE_COLUMNS[stage].flatMap((id) => columns.filter((column) => column.id === id));
}
