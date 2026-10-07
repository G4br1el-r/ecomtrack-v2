import { createColumnHelper } from "@tanstack/react-table";

import type { DataTableColumn, DataTableFeatures } from "@/@types/Modules/Core/DesignSystem/data-table";
import type { Product } from "@/@types/Modules/Tabela/Produtos/product";
import { DataTableSortHeader } from "@/components/Modules/Core/DesignSystem/data-table-sort-header";
import { NumberCell } from "@/components/Modules/Core/DesignSystem/number-cell";
import { ProductCell } from "@/components/Modules/Core/DesignSystem/product-cell";
import { ProductRatingCell } from "@/components/Modules/Tabela/Produtos/product-rating-cell";
import { Badge } from "@/components/ui/badge";
import { PRODUCT_COLUMN_SIZE, PRODUCT_STATUS_BADGE } from "@/constants/Modules/Tabela/Produtos/products";
import { formatDisplayDate } from "@/lib/Modules/Core/DesignSystem/format-display-date";
import { getShare } from "@/lib/Modules/Core/DesignSystem/get-share";
import { cn } from "@/lib/utils";

const columnHelper = createColumnHelper<DataTableFeatures, Product>();

export function createProductColumns(): DataTableColumn<Product>[] {
  return columnHelper.columns([
    columnHelper.accessor("name", {
      size: PRODUCT_COLUMN_SIZE.name,
      meta: { label: "Produto" },
      header: ({ column }) => <DataTableSortHeader column={column} />,
      cell: ({ row }) => (
        <div title={row.original.name}>
          <ProductCell name={row.original.name} sku={row.original.sku} />
        </div>
      ),
    }),
    columnHelper.accessor("category", {
      size: PRODUCT_COLUMN_SIZE.category,
      meta: { label: "Categoria" },
      header: ({ column }) => <DataTableSortHeader column={column} />,
    }),
    columnHelper.accessor("brand", {
      size: PRODUCT_COLUMN_SIZE.brand,
      meta: { label: "Marca" },
      header: ({ column }) => <DataTableSortHeader column={column} />,
    }),
    columnHelper.accessor("supplier", {
      size: PRODUCT_COLUMN_SIZE.supplier,
      meta: { label: "Fornecedor" },
      header: ({ column }) => <DataTableSortHeader column={column} />,
      cell: ({ getValue }) => <span className="text-muted-foreground">{getValue()}</span>,
    }),
    columnHelper.accessor("channel", {
      size: PRODUCT_COLUMN_SIZE.channel,
      meta: { label: "Canal" },
      header: ({ column }) => <DataTableSortHeader column={column} />,
    }),
    columnHelper.accessor("status", {
      size: PRODUCT_COLUMN_SIZE.status,
      meta: { label: "Status" },
      header: ({ column }) => <DataTableSortHeader column={column} />,
      cell: ({ getValue }) => {
        const status = PRODUCT_STATUS_BADGE[getValue()];
        return <Badge variant={status.tone}>{status.label}</Badge>;
      },
    }),
    columnHelper.accessor("stock", {
      size: PRODUCT_COLUMN_SIZE.stock,
      meta: { label: "Estoque" },
      header: ({ column }) => <DataTableSortHeader column={column} align="right" />,
      cell: ({ getValue }) => <NumberCell value={getValue()} kind="integer" />,
    }),
    columnHelper.accessor("minStock", {
      size: PRODUCT_COLUMN_SIZE.minStock,
      meta: { label: "Estoque mínimo" },
      header: ({ column }) => <DataTableSortHeader column={column} align="right" />,
      cell: ({ getValue }) => <NumberCell value={getValue()} kind="integer" muted />,
    }),
    columnHelper.accessor("price", {
      size: PRODUCT_COLUMN_SIZE.price,
      meta: { label: "Preço" },
      header: ({ column }) => <DataTableSortHeader column={column} align="right" />,
      cell: ({ getValue }) => <NumberCell value={getValue()} kind="currency" />,
    }),
    columnHelper.accessor("cost", {
      size: PRODUCT_COLUMN_SIZE.cost,
      meta: { label: "Custo" },
      header: ({ column }) => <DataTableSortHeader column={column} align="right" />,
      cell: ({ getValue }) => <NumberCell value={getValue()} kind="currency" muted />,
    }),
    columnHelper.accessor((product) => getShare(product.price - product.cost, product.price), {
      id: "margin",
      size: PRODUCT_COLUMN_SIZE.margin,
      meta: { label: "Margem" },
      header: ({ column }) => <DataTableSortHeader column={column} align="right" />,
      cell: ({ getValue }) => (
        <div className={cn(getValue() < 0 && "text-destructive")}>
          <NumberCell value={getValue()} kind="percent" />
        </div>
      ),
    }),
    columnHelper.accessor("sold30d", {
      size: PRODUCT_COLUMN_SIZE.sold30d,
      meta: { label: "Vendidos 30 dias" },
      header: ({ column }) => <DataTableSortHeader column={column} align="right" />,
      cell: ({ getValue }) => <NumberCell value={getValue()} kind="integer" />,
    }),
    columnHelper.accessor((product) => product.price * product.sold30d, {
      id: "revenue30d",
      size: PRODUCT_COLUMN_SIZE.revenue30d,
      meta: { label: "Faturamento 30 dias" },
      header: ({ column }) => <DataTableSortHeader column={column} align="right" />,
      cell: ({ getValue }) => <NumberCell value={getValue()} kind="currency" />,
    }),
    columnHelper.accessor("rating", {
      size: PRODUCT_COLUMN_SIZE.rating,
      meta: { label: "Avaliação" },
      header: ({ column }) => <DataTableSortHeader column={column} align="right" />,
      cell: ({ getValue }) => <ProductRatingCell value={getValue()} />,
    }),
    columnHelper.accessor("lastSaleAt", {
      size: PRODUCT_COLUMN_SIZE.lastSaleAt,
      meta: { label: "Última venda" },
      header: ({ column }) => <DataTableSortHeader column={column} />,
      cell: ({ getValue }) => <span className="tabular-nums">{formatDisplayDate(getValue())}</span>,
    }),
    columnHelper.accessor("createdAt", {
      size: PRODUCT_COLUMN_SIZE.createdAt,
      meta: { label: "Cadastrado em" },
      header: ({ column }) => <DataTableSortHeader column={column} />,
      cell: ({ getValue }) => (
        <span className="text-muted-foreground tabular-nums">{formatDisplayDate(getValue())}</span>
      ),
    }),
  ]);
}
