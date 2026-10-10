"use client";

import { useState } from "react";

import { DataTable } from "@/components/Modules/Core/DesignSystem/data-table";
import { EmptyState } from "@/components/Modules/Core/DesignSystem/empty-state";
import { ErrorState } from "@/components/Modules/Core/DesignSystem/error-state";
import { SearchField } from "@/components/Modules/Core/DesignSystem/search-field";
import { SearchIllustration } from "@/components/Modules/Core/DesignSystem/search-illustration";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TOP_PRODUCTS_LIMIT } from "@/constants/Modules/VisaoGeral/Dashboard/dashboard";
import { useTopProducts } from "@/hooks/Modules/VisaoGeral/Dashboard/use-top-products";
import { matchesSearchTerm } from "@/lib/Modules/Core/DesignSystem/matches-search-term";
import { createTopProductColumns } from "@/lib/Modules/VisaoGeral/Dashboard/create-top-product-columns";
import { cn } from "@/lib/utils";

export function TopProductsCard() {
  const { data = [], isPending, isError, isPlaceholderData, refetch } = useTopProducts();
  const [search, setSearch] = useState("");
  const products = data.filter((product) => matchesSearchTerm([product.name, product.sku], search));
  const maxRevenueShare = Math.max(0, ...data.map((product) => product.revenueShare));

  return (
    <Card className={cn("transition-opacity duration-200", isPlaceholderData && "opacity-60")}>
      <CardHeader>
        <CardTitle>Top {TOP_PRODUCTS_LIMIT} produtos</CardTitle>
        <CardDescription>Mais vendidos no período, ordenados por faturamento</CardDescription>
        <CardAction className="max-sm:col-span-2 max-sm:col-start-1 max-sm:row-span-1 max-sm:row-start-3 max-sm:mt-2 max-sm:w-full">
          <SearchField
            aria-label="Buscar produto por nome ou SKU"
            placeholder="Buscar por nome ou SKU"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full sm:w-64"
          />
        </CardAction>
      </CardHeader>
      <CardContent>
        {isError ? (
          <ErrorState
            title="Não foi possível carregar os produtos"
            description="Tente novamente em alguns instantes."
            onRetry={() => refetch()}
          />
        ) : (
          <DataTable
            columns={createTopProductColumns(maxRevenueShare)}
            data={products}
            getRowId={(product) => product.id}
            loading={isPending}
            empty={
              data.length === 0 ? (
                <EmptyState
                  title="Nenhuma venda no período"
                  description="Os produtos mais vendidos aparecem aqui assim que houver pedidos."
                />
              ) : (
                <EmptyState
                  illustration={<SearchIllustration />}
                  title="Nenhum produto encontrado"
                  description={`Nada corresponde a "${search}" entre os mais vendidos.`}
                />
              )
            }
          />
        )}
      </CardContent>
    </Card>
  );
}
