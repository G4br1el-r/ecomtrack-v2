"use client";

import type { RowSelectionState } from "@tanstack/react-table";
import { Download, Plus, Trash2 } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { BulkBar } from "@/components/Modules/Core/DesignSystem/bulk-bar";
import { DataTable } from "@/components/Modules/Core/DesignSystem/data-table";
import { DensityToggle } from "@/components/Modules/Core/DesignSystem/density-toggle";
import { EmptyState } from "@/components/Modules/Core/DesignSystem/empty-state";
import { FilterChip } from "@/components/Modules/Core/DesignSystem/filter-chip";
import { PageHeader } from "@/components/Modules/Core/DesignSystem/page-header";
import { PaginationBar } from "@/components/Modules/Core/DesignSystem/pagination-bar";
import { SearchField } from "@/components/Modules/Core/DesignSystem/search-field";
import { Button } from "@/components/ui/button";
import { FIRST_PAGE } from "@/constants/Modules/Core/DesignSystem/ui";
import { getTotalPages } from "@/lib/Modules/Core/DesignSystem/get-total-pages";
import { removeById } from "@/lib/Modules/Core/DesignSystem/remove-by-id";

import { createOrderColumns } from "../../helpers/create-order-columns";
import { useDeleteOrderMutation } from "../../hooks/use-delete-order-mutation";
import { useOrdersQuery } from "../../hooks/use-orders-query";
import { useRestoreOrderMutation } from "../../hooks/use-restore-order-mutation";
import { ORDERS_FILTER_CHIPS, ORDERS_PER_PAGE, ORDERS_TOTAL_ITEMS, type Order } from "../../mocks/orders";

export function OrdersTableDemo() {
  const { data = [], isLoading } = useOrdersQuery();
  const deleteMutation = useDeleteOrderMutation();
  const restoreMutation = useRestoreOrderMutation();
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [page, setPage] = useState(FIRST_PAGE);
  const [chips, setChips] = useState(ORDERS_FILTER_CHIPS);
  const selectedIds = Object.keys(rowSelection).filter((id) => rowSelection[id]);

  const columns = useMemo(
    () =>
      createOrderColumns((order: Order) => {
        const removed = removeById(data, order.id).removed;
        deleteMutation.mutate(order.id);
        toast("Pedido excluído", {
          description: `${order.id} · ${order.product}`,
          action: removed ? { label: "Desfazer", onClick: () => restoreMutation.mutate(removed) } : undefined,
        });
      }),
    [data, deleteMutation, restoreMutation],
  );

  const deleteSelected = () => {
    for (const id of selectedIds) deleteMutation.mutate(id);
    toast.success(`${selectedIds.length} pedido(s) excluído(s)`);
    setRowSelection({});
  };

  return (
    <div className="space-y-5 rounded-xl border bg-background p-5 shadow-card sm:p-6">
      <PageHeader
        title="Pedidos"
        description="Acompanhe e gerencie os pedidos de todos os canais."
        actions={
          <>
            <Button variant="outline">
              <Download data-icon="inline-start" aria-hidden="true" />
              Exportar
            </Button>
            <Button>
              <Plus data-icon="inline-start" aria-hidden="true" />
              Novo pedido
            </Button>
          </>
        }
      />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SearchField placeholder="Buscar por pedido, produto ou cliente..." className="sm:max-w-sm" />
        <DensityToggle />
      </div>
      <div className="flex flex-wrap gap-2">
        <AnimatePresence mode="popLayout">
          {chips.map((chip) => (
            <FilterChip
              key={chip}
              label={chip}
              onRemove={() => setChips((current) => current.filter((item) => item !== chip))}
            />
          ))}
        </AnimatePresence>
      </div>
      <DataTable
        columns={columns}
        data={data}
        getRowId={(order) => order.id}
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
        loading={isLoading}
        empty={
          <EmptyState title="Nenhum pedido" description="Os pedidos excluídos podem ser restaurados pelo toast." />
        }
      />
      <PaginationBar
        currentPage={page}
        totalPages={getTotalPages(ORDERS_PER_PAGE, ORDERS_TOTAL_ITEMS)}
        totalItems={ORDERS_TOTAL_ITEMS}
        itemsPerPage={ORDERS_PER_PAGE}
        onPageChange={setPage}
      />
      <BulkBar count={selectedIds.length} onClear={() => setRowSelection({})}>
        <Button size="sm" variant="destructive-ghost" onClick={deleteSelected}>
          <Trash2 data-icon="inline-start" aria-hidden="true" />
          Excluir
        </Button>
      </BulkBar>
    </div>
  );
}
