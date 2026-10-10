"use client";

import { useState } from "react";

import { EmptyState } from "@/components/Modules/Core/DesignSystem/empty-state";
import { ErrorState } from "@/components/Modules/Core/DesignSystem/error-state";
import { Skeleton } from "@/components/ui/skeleton";
import { AI_TASK_SKELETON_CARDS } from "@/constants/Modules/Administracao/AgentesIA/ai-agents";
import { useAiTasks } from "@/hooks/Modules/Administracao/AgentesIA/use-ai-tasks";
import { usePreferences } from "@/hooks/Modules/Core/Preferencias/use-preferences";
import { buildAiTaskPreferenceKey } from "@/lib/Modules/Administracao/AgentesIA/build-ai-task-preference-key";

import { AiTaskCard } from "../ai-task-card";
import { AiTaskSheet } from "../ai-task-sheet";

export function AiTasksPanel() {
  const { data: tasks, isPending, isError, refetch } = useAiTasks();
  const { data: preferences } = usePreferences();
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const configured = new Set(preferences?.map((preference) => preference.key));
  const selected = tasks?.find((task) => task.key === selectedKey) ?? null;

  if (isError) return <ErrorState onRetry={() => refetch()} className="min-h-60" />;

  if (isPending) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3" role="status" aria-label="Carregando as tarefas">
        {AI_TASK_SKELETON_CARDS.map((key) => (
          <Skeleton key={key} className="h-36 rounded-xl" />
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <EmptyState
        title="Nenhuma tarefa de IA disponível"
        description="As tarefas em que a IA ajuda no cadastro aparecem aqui assim que forem liberadas."
      />
    );
  }

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {tasks.map((task) => (
          <AiTaskCard
            key={task.key}
            task={task}
            configured={configured.has(buildAiTaskPreferenceKey(task.key))}
            onConfigure={() => {
              setSelectedKey(task.key);
              setOpen(true);
            }}
          />
        ))}
      </div>
      <AiTaskSheet task={selected} open={open} onOpenChange={setOpen} />
    </>
  );
}
