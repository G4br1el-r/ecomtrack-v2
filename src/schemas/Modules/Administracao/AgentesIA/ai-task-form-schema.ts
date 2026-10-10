import { z } from "zod";

import { AI_MODEL_MAX_LENGTH, AI_PROMPT_MAX_LENGTH } from "@/constants/Modules/Administracao/AgentesIA/ai-agents";
import { formatNumber } from "@/lib/Modules/Core/DesignSystem/format-number";

export const aiTaskFormSchema = z.object({
  integrationId: z.string().min(1, "Escolha qual IA usar nesta tarefa."),
  model: z.string().trim().max(AI_MODEL_MAX_LENGTH, `Use até ${AI_MODEL_MAX_LENGTH} caracteres.`),
  prompt: z
    .string()
    .trim()
    .min(1, "Escreva o prompt da tarefa.")
    .max(AI_PROMPT_MAX_LENGTH, `Use até ${formatNumber(AI_PROMPT_MAX_LENGTH, "integer")} caracteres.`),
  variables: z.record(z.string(), z.string()),
});

export type AiTaskFormValues = z.infer<typeof aiTaskFormSchema>;
