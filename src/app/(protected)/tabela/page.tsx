import type { Metadata } from "next";

import { PageHeader } from "@/components/Modules/Core/DesignSystem/page-header";

import { ProductsTable } from "./components/products-table";

export const metadata: Metadata = {
  title: "Tabela",
  description: "Produtos com seleção por checkbox.",
};

export default function TabelaPage() {
  return (
    <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-6 p-4 md:p-6 lg:p-8">
      <PageHeader title="Tabela" description="Produtos com seleção por checkbox." />
      <ProductsTable />
    </div>
  );
}
