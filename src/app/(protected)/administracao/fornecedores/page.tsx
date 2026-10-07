import type { Metadata } from "next";

import { PageHeader } from "@/components/Modules/Core/DesignSystem/page-header";

import { SuppliersTabs } from "./components/suppliers-tabs";

export const metadata: Metadata = {
  title: "Fornecedores",
  description: "Fornecedores conectados e o catálogo que eles oferecem.",
};

export default function SuppliersPage() {
  return (
    <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-6 p-4 md:p-6 lg:p-8">
      <PageHeader
        title="Fornecedores"
        description="Conecte fornecedores e veja o catálogo deles, atualizado automaticamente a cada 6 horas."
      />
      <SuppliersTabs />
    </div>
  );
}
