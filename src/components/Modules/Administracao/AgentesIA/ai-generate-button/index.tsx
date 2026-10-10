"use client";

import { Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";

import type { GenerateAiTaskRequest } from "@/@types/Modules/Administracao/AgentesIA/generate-ai-task-request";
import { Button } from "@/components/ui/button";
import { AI_GENERATE_ERROR_TITLE } from "@/constants/Modules/Administracao/AgentesIA/ai-agents";
import { useGenerateAiTask } from "@/hooks/Modules/Administracao/AgentesIA/use-generate-ai-task";
import type { AiGeneration } from "@/schemas/Modules/Administracao/AgentesIA/ai-generation-schema";

export function AiGenerateButton({
  taskKey,
  buildRequest,
  onGenerated,
  label = "Gerar com IA",
  disabled = false,
}: {
  taskKey: string;
  buildRequest: () => Omit<GenerateAiTaskRequest, "key"> | null;
  onGenerated: (generation: AiGeneration) => void;
  label?: string;
  disabled?: boolean;
}) {
  const { mutate: generate, isPending } = useGenerateAiTask();

  return (
    <Button
      type="button"
      variant="outline"
      disabled={disabled || isPending}
      onClick={() => {
        const request = buildRequest();
        if (!request) return;
        generate(
          { key: taskKey, ...request },
          {
            onSuccess: (generation) => {
              onGenerated(generation);
              toast.success("Conteúdo gerado", { description: `${generation.providerCode} · ${generation.model}` });
            },
            onError: (cause) => toast.error(AI_GENERATE_ERROR_TITLE, { description: cause.message }),
          },
        );
      }}
    >
      {isPending ? (
        <Loader2 data-icon="inline-start" className="animate-spin" aria-hidden="true" />
      ) : (
        <Sparkles data-icon="inline-start" aria-hidden="true" />
      )}
      {isPending ? "Gerando..." : label}
    </Button>
  );
}
