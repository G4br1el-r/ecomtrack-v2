"use client";

import { useMutation } from "@tanstack/react-query";

import { generateAiTask } from "@/services/Modules/Administracao/AgentesIA/generate-ai-task";

export function useGenerateAiTask() {
  return useMutation({ mutationFn: generateAiTask });
}
