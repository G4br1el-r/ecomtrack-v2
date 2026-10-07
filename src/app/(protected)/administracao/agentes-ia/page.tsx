import type { Metadata } from "next";

import { IntegrationArea } from "@/components/Modules/Administracao/Integracoes/integration-area";
import { PageHeader } from "@/components/Modules/Core/DesignSystem/page-header";

export const metadata: Metadata = {
  title: "Agentes IA",
  description: "Provedores de inteligência artificial conectados à empresa.",
};

export default function AiAgentsPage() {
  return (
    <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-6 p-4 md:p-6 lg:p-8">
      <PageHeader title="Agentes IA" description="Conecte os provedores de IA usados pelos agentes da empresa." />
      <IntegrationArea area="ai" />
    </div>
  );
}
