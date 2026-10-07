import type { Metadata } from "next";

import { IntegrationArea } from "@/components/Modules/Administracao/Integracoes/integration-area";
import { PageHeader } from "@/components/Modules/Core/DesignSystem/page-header";

export const metadata: Metadata = {
  title: "E-commerce",
  description: "Lojas virtuais conectadas à empresa.",
};

export default function EcommercePage() {
  return (
    <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-6 p-4 md:p-6 lg:p-8">
      <PageHeader
        title="E-commerce"
        description="Conecte as suas lojas virtuais. Cada plataforma aceita várias lojas, cada uma com o seu nome."
      />
      <IntegrationArea area="ecommerce" />
    </div>
  );
}
