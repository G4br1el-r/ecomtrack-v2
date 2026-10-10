import type { AiTaskFormValues } from "@/schemas/Modules/Administracao/AgentesIA/ai-task-form-schema";
import type { AiTaskPreference } from "@/schemas/Modules/Administracao/AgentesIA/ai-task-preference-schema";
import type { AiTask } from "@/schemas/Modules/Administracao/AgentesIA/ai-task-schema";

export function buildAiTaskPreferenceValue(task: AiTask, values: AiTaskFormValues): AiTaskPreference {
  const prompt = values.prompt.trim();
  return {
    integrationId: values.integrationId,
    model: values.model.trim() || null,
    prompt: prompt === task.defaultPrompt.trim() ? null : prompt,
  };
}
