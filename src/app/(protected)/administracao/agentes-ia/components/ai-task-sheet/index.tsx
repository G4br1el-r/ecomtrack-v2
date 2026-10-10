"use client";

import { Sparkles } from "lucide-react";
import { toast } from "sonner";

import { DetailSheet } from "@/components/Modules/Core/DesignSystem/detail-sheet";
import { ErrorState } from "@/components/Modules/Core/DesignSystem/error-state";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AI_TASK_FORM_ID } from "@/constants/Modules/Administracao/AgentesIA/ai-agents";
import { usePreference } from "@/hooks/Modules/Core/Preferencias/use-preference";
import { useRemovePreference } from "@/hooks/Modules/Core/Preferencias/use-remove-preference";
import { useSavePreference } from "@/hooks/Modules/Core/Preferencias/use-save-preference";
import { buildAiTaskPreferenceKey } from "@/lib/Modules/Administracao/AgentesIA/build-ai-task-preference-key";
import { parseAiTaskPreference } from "@/lib/Modules/Administracao/AgentesIA/parse-ai-task-preference";
import type { AiTask } from "@/schemas/Modules/Administracao/AgentesIA/ai-task-schema";
import { useViewAsStore } from "@/store/Modules/Core/Access/view-as-store";

import { AiTaskForm } from "../ai-task-form";

export function AiTaskSheet({
  task,
  open,
  onOpenChange,
}: {
  task: AiTask | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const key = buildAiTaskPreferenceKey(task?.key ?? "");
  const readOnly = useViewAsStore((state) => state.session !== null);
  const preference = usePreference(key, open && task !== null);
  const { mutate: remove, isPending: removing } = useRemovePreference();
  const { mutate: save } = useSavePreference();
  const saved = preference.data ? parseAiTaskPreference(preference.data.value) : null;

  const restore = () => {
    if (!task || !preference.data) return;
    const previous = preference.data.value;
    remove(key, {
      onSuccess: () => {
        toast.success("Configuração restaurada", {
          description: `${task.name} volta a usar o prompt padrão.`,
          action: { label: "Desfazer", onClick: () => save({ key, value: previous }) },
        });
        onOpenChange(false);
      },
      onError: (cause) => toast.error("Não foi possível restaurar o padrão", { description: cause.message }),
    });
  };

  return (
    <DetailSheet
      open={open}
      onOpenChange={onOpenChange}
      icon={Sparkles}
      title={task ? task.name : "Tarefa de IA"}
      description={task?.description}
      footer={
        <>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          {saved ? (
            <Button variant="outline" disabled={readOnly || removing} onClick={restore}>
              Restaurar padrão
            </Button>
          ) : null}
          <Button type="submit" form={AI_TASK_FORM_ID} disabled={readOnly || preference.isPending}>
            Salvar
          </Button>
        </>
      }
    >
      {preference.isError ? (
        <ErrorState onRetry={() => preference.refetch()} className="min-h-40" />
      ) : task && !preference.isPending ? (
        <AiTaskForm
          key={`${task.key}-${preference.dataUpdatedAt}`}
          task={task}
          preference={saved}
          readOnly={readOnly}
          onSaved={() => onOpenChange(false)}
        />
      ) : (
        <div className="space-y-3" role="status" aria-label="Carregando a configuração">
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
      )}
    </DetailSheet>
  );
}
