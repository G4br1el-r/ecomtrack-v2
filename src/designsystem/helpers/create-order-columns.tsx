import { Eye, Trash2 } from "lucide-react";

import type { DataTableColumn } from "@/@types/Modules/Core/DesignSystem/data-table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/animate-ui/components/radix/tooltip";
import { CopyButton } from "@/components/Modules/Core/DesignSystem/copy-button";
import { DataTableSortHeader } from "@/components/Modules/Core/DesignSystem/data-table-sort-header";
import { ProductCell } from "@/components/Modules/Core/DesignSystem/product-cell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { createSelectColumn } from "@/lib/Modules/Core/DesignSystem/create-select-column";
import { formatNumber } from "@/lib/Modules/Core/DesignSystem/format-number";

import { ORDER_STATUS_TONE, type Order } from "../mocks/orders";

export function createOrderColumns(onDelete: (order: Order) => void): DataTableColumn<Order>[] {
  return [
    createSelectColumn<Order>(),
    {
      accessorKey: "id",
      header: ({ column }) => <DataTableSortHeader column={column} title="Pedido" />,
      cell: ({ row }) => (
        <span className="inline-flex items-center gap-1 font-mono text-xs">
          {row.original.id}
          <CopyButton value={row.original.id} label="Copiar número do pedido" />
        </span>
      ),
    },
    {
      accessorKey: "product",
      header: ({ column }) => <DataTableSortHeader column={column} title="Produto" />,
      cell: ({ row }) => <ProductCell name={row.original.product} sku={row.original.sku} />,
    },
    {
      accessorKey: "customer",
      header: ({ column }) => <DataTableSortHeader column={column} title="Cliente" />,
    },
    {
      accessorKey: "status",
      header: "Status",
      enableSorting: false,
      cell: ({ row }) => {
        const status = ORDER_STATUS_TONE[row.original.status];
        return <Badge variant={status.tone}>{status.label}</Badge>;
      },
    },
    {
      accessorKey: "total",
      header: ({ column }) => <DataTableSortHeader column={column} title="Total" align="right" />,
      cell: ({ row }) => (
        <span className="block text-right font-medium tabular-nums">
          {formatNumber(row.original.total, "currency")}
        </span>
      ),
    },
    {
      id: "actions",
      enableSorting: false,
      header: () => <span className="sr-only">Ações</span>,
      cell: ({ row }) => (
        <div className="flex justify-end gap-0.5">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon-sm" variant="ghost" aria-label={`Visualizar ${row.original.id}`}>
                <Eye aria-hidden="true" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Visualizar</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon-sm"
                variant="destructive-ghost"
                aria-label={`Excluir ${row.original.id}`}
                onClick={() => onDelete(row.original)}
              >
                <Trash2 aria-hidden="true" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Excluir</TooltipContent>
          </Tooltip>
        </div>
      ),
    },
  ];
}
