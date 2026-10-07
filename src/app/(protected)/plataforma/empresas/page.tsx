import type { Metadata } from "next";

import { OwnerGuard } from "@/components/Modules/Core/Shell/owner-guard";

import { CompaniesWorkspace } from "./components/companies-workspace";

export const metadata: Metadata = {
  title: "Empresas",
  description: "Empresas da plataforma, planos contratados e situação de acesso.",
};

export default function CompaniesPage() {
  return (
    <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-6 p-4 md:p-6 lg:p-8">
      <OwnerGuard>
        <CompaniesWorkspace />
      </OwnerGuard>
    </div>
  );
}
