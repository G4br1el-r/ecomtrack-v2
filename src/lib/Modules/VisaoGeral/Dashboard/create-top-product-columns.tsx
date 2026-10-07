import type { DataTableColumn } from "@/@types/Modules/Core/DesignSystem/data-table";
import type { TopProduct } from "@/@types/Modules/VisaoGeral/Dashboard/top-product";
import { DataTableSortHeader } from "@/components/Modules/Core/DesignSystem/data-table-sort-header";
import { NumberCell } from "@/components/Modules/Core/DesignSystem/number-cell";
import { ProductCell } from "@/components/Modules/Core/DesignSystem/product-cell";
import { ShareBar } from "@/components/Modules/VisaoGeral/Dashboard/share-bar";
import { formatNumber } from "@/lib/Modules/Core/DesignSystem/format-number";

export function createTopProductColumns(maxRevenueShare: number): DataTableColumn<TopProduct>[] {
  return [
    {
      accessorKey: "rank",
      header: ({ column }) => <DataTableSortHeader column={column} title="#" />,
      cell: ({ row }) => (
        <span className="grid size-6 place-items-center rounded-md bg-muted font-mono text-xs text-muted-foreground tabular-nums">
          {row.original.rank}
        </span>
      ),
    },
    {
      accessorKey: "name",
      header: ({ column }) => <DataTableSortHeader column={column} title="Produto" />,
      cell: ({ row }) => (
        <div className="max-w-72" title={row.original.name}>
          <ProductCell name={row.original.name} sku={row.original.sku} />
        </div>
      ),
    },
    {
      accessorKey: "unitsSold",
      header: ({ column }) => <DataTableSortHeader column={column} title="Qtd. vendida" align="right" />,
      cell: ({ row }) => <NumberCell value={row.original.unitsSold} kind="integer" />,
    },
    {
      accessorKey: "revenue",
      header: ({ column }) => <DataTableSortHeader column={column} title="Faturamento" align="right" />,
      cell: ({ row }) => <NumberCell value={row.original.revenue} kind="currency" />,
    },
    {
      accessorKey: "profit",
      header: ({ column }) => <DataTableSortHeader column={column} title="Lucro" align="right" />,
      cell: ({ row }) => <NumberCell value={row.original.profit} kind="currency" />,
    },
    {
      accessorKey: "revenueShare",
      header: ({ column }) => <DataTableSortHeader column={column} title="% Fat." align="right" />,
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-2.5">
          <ShareBar value={row.original.revenueShare} max={maxRevenueShare} className="w-16" />
          <span className="w-12 text-right text-muted-foreground tabular-nums">
            {formatNumber(row.original.revenueShare, "percent")}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "profitShare",
      header: ({ column }) => <DataTableSortHeader column={column} title="% Lucro" align="right" />,
      cell: ({ row }) => <NumberCell value={row.original.profitShare} kind="percent" muted />,
    },
    {
      accessorKey: "ordersShare",
      header: ({ column }) => <DataTableSortHeader column={column} title="% Pedidos" align="right" />,
      cell: ({ row }) => <NumberCell value={row.original.ordersShare} kind="percent" muted />,
    },
  ];
}
