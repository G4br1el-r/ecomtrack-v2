"use client";

import type { RowSelectionState } from "@tanstack/react-table";
import { useState } from "react";

import { BulkBar } from "@/components/Modules/Core/DesignSystem/bulk-bar";
import { DataTable } from "@/components/Modules/Core/DesignSystem/data-table";
import { EmptyState } from "@/components/Modules/Core/DesignSystem/empty-state";
import { ErrorState } from "@/components/Modules/Core/DesignSystem/error-state";
import { PRODUCTS_TABLE_SETTINGS } from "@/constants/Modules/Tabela/Produtos/products";
import { useProducts } from "@/hooks/Modules/Tabela/Produtos/use-products";
import { createProductColumns } from "@/lib/Modules/Tabela/Produtos/create-product-columns";

import { ProductDetail } from "../product-detail";

const PRODUCT_COLUMNS = createProductColumns();

export function ProductsTable() {
  const { data = [], isPending, isError, refetch } = useProducts();
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const selectedCount = Object.values(rowSelection).filter(Boolean).length;

  if (isError) {
    return (
      <ErrorState
        title="Não foi possível carregar os produtos"
        description="Tente novamente em alguns instantes."
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <>
      <DataTable
        columns={PRODUCT_COLUMNS}
        data={data}
        getRowId={(product) => product.id}
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
        loading={isPending}
        settings={PRODUCTS_TABLE_SETTINGS}
        renderDetail={(product) => <ProductDetail product={product} />}
        empty={<EmptyState title="Nenhum produto" description="Ajuste a busca ou os filtros para ver os produtos." />}
      />
      <BulkBar count={selectedCount} onClear={() => setRowSelection({})} />
    </>
  );
}
