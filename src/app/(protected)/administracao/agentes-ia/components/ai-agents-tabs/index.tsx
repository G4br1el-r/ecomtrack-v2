"use client";

import { Plug, Sparkles } from "lucide-react";

import {
  Tabs,
  TabsContent,
  TabsContents,
  TabsList,
  TabsTrigger,
} from "@/components/animate-ui/components/animate/tabs";
import { IntegrationArea } from "@/components/Modules/Administracao/Integracoes/integration-area";
import { AI_AGENTS_TABS } from "@/constants/Modules/Administracao/AgentesIA/ai-agents";

import { AiTasksPanel } from "../ai-tasks-panel";

export function AiAgentsTabs() {
  return (
    <Tabs defaultValue={AI_AGENTS_TABS.connections} className="gap-4">
      <TabsList className="w-fit">
        <TabsTrigger value={AI_AGENTS_TABS.connections}>
          <Plug aria-hidden="true" />
          Conexões
        </TabsTrigger>
        <TabsTrigger value={AI_AGENTS_TABS.tasks}>
          <Sparkles aria-hidden="true" />
          Tarefas
        </TabsTrigger>
      </TabsList>
      <TabsContents>
        <TabsContent value={AI_AGENTS_TABS.connections} aria-label="Conexões">
          <IntegrationArea area="ai" />
        </TabsContent>
        <TabsContent value={AI_AGENTS_TABS.tasks} aria-label="Tarefas">
          <AiTasksPanel />
        </TabsContent>
      </TabsContents>
    </Tabs>
  );
}
