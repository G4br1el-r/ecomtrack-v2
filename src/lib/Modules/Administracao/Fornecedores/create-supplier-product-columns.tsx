import { createColumnHelper } from "@tanstack/react-table";

import type { DataTableColumn, DataTableFeatures } from "@/@types/Modules/Core/DesignSystem/data-table";
import { DataTableSortHeader } from "@/components/Modules/Core/DesignSystem/data-table-sort-header";
import { DateTimeCell } from "@/components/Modules/Core/DesignSystem/date-time-cell";
import { NumberCell } from "@/components/Modules/Core/DesignSystem/number-cell";
import { ProductCell } from "@/components/Modules/Core/DesignSystem/product-cell";
import { Badge } from "@/components/ui/badge";
import { SUPPLIER_PRODUCT_COLUMN_SIZE } from "@/constants/Modules/Administracao/Fornecedores/suppliers";
import { EMPTY_VALUE } from "@/constants/Modules/Core/DesignSystem/number-format";
import { formatForeignAmount } from "@/lib/Modules/Core/DesignSystem/format-foreign-amount";
import type { SupplierProduct } from "@/schemas/Modules/Administracao/Fornecedores/supplier-product-schema";

const columnHelper = createColumnHelper<DataTableFeatures, SupplierProduct>();

export function createSupplierProductColumns(): DataTableColumn<SupplierProduct>[] {
  return columnHelper.columns([
    columnHelper.accessor("name", {
      size: SUPPLIER_PRODUCT_COLUMN_SIZE.product,
      meta: { label: "Produto" },
      header: ({ column }) => <DataTableSortHeader column={column} />,
      cell: ({ row }) => (
        <div title={row.original.description ?? row.original.name}>
          <ProductCell name={row.original.name} sku={row.original.externalId} />
        </div>
      ),
    }),
    columnHelper.accessor("providerName", {
      size: SUPPLIER_PRODUCT_COLUMN_SIZE.supplier,
      meta: { label: "Fornecedor" },
      header: ({ column }) => <DataTableSortHeader column={column} />,
    }),
    columnHelper.accessor("platform", {
      size: SUPPLIER_PRODUCT_COLUMN_SIZE.platform,
      meta: { label: "Plataforma" },
      header: ({ column }) => <DataTableSortHeader column={column} />,
      cell: ({ getValue }) => getValue() ?? EMPTY_VALUE,
    }),
    columnHelper.accessor("region", {
      size: SUPPLIER_PRODUCT_COLUMN_SIZE.region,
      meta: { label: "Região" },
      header: ({ column }) => <DataTableSortHeader column={column} />,
      cell: ({ getValue }) => getValue() ?? EMPTY_VALUE,
    }),
    columnHelper.accessor((product) => product.languages.join(", "), {
      id: "languages",
      size: SUPPLIER_PRODUCT_COLUMN_SIZE.languages,
      meta: { label: "Idiomas" },
      header: ({ column }) => <DataTableSortHeader column={column} />,
      cell: ({ getValue }) => <span className="text-muted-foreground">{getValue() || EMPTY_VALUE}</span>,
    }),
    columnHelper.accessor((product) => product.price ?? product.minPrice, {
      id: "price",
      size: SUPPLIER_PRODUCT_COLUMN_SIZE.price,
      meta: { label: "Preço do contrato" },
      header: ({ column }) => <DataTableSortHeader column={column} />,
      cell: ({ row }) => (
        <div className="flex flex-col items-end font-mono text-sm tabular-nums">
          <span>{formatForeignAmount(row.original.price ?? row.original.minPrice, row.original.currency)}</span>
          {row.original.price === null && row.original.maxPrice > row.original.minPrice ? (
            <span className="text-[11px] text-muted-foreground">
              até {formatForeignAmount(row.original.maxPrice, row.original.currency)}
            </span>
          ) : null}
        </div>
      ),
    }),
    columnHelper.accessor("quantity", {
      size: SUPPLIER_PRODUCT_COLUMN_SIZE.stock,
      meta: { label: "Estoque" },
      header: ({ column }) => <DataTableSortHeader column={column} />,
      cell: ({ row }) =>
        row.original.isOnDemand ? (
          <Badge variant="info">Sob demanda</Badge>
        ) : (
          <NumberCell value={row.original.quantity} kind="integer" />
        ),
    }),
    columnHelper.accessor("syncedAt", {
      size: SUPPLIER_PRODUCT_COLUMN_SIZE.syncedAt,
      meta: { label: "Sincronizado em" },
      header: ({ column }) => <DataTableSortHeader column={column} />,
      cell: ({ getValue }) => <DateTimeCell value={getValue()} />,
    }),
    columnHelper.accessor("isIntegrated", {
      size: SUPPLIER_PRODUCT_COLUMN_SIZE.integrated,
      meta: { label: "Na loja" },
      header: ({ column }) => <DataTableSortHeader column={column} />,
      cell: ({ getValue }) => (getValue() ? <Badge variant="success">Já é produto</Badge> : null),
    }),
  ]);
}
