import type { Metadata } from "next";

import { PageHeader } from "@/components/Modules/Core/DesignSystem/page-header";

import { AiAgentsTabs } from "./components/ai-agents-tabs";

export const metadata: Metadata = {
  title: "Agentes IA",
  description: "Provedores de inteligência artificial conectados à empresa e as tarefas em que a IA ajuda.",
};

export default function AiAgentsPage() {
  return (
    <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-6 p-4 md:p-6 lg:p-8">
      <PageHeader
        title="Agentes IA"
        description="Conecte os provedores de IA e escolha qual IA, modelo e prompt cada tarefa usa."
      />
      <AiAgentsTabs />
    </div>
  );
}
