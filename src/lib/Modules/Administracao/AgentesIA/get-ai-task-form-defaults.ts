import type { AiTaskFormValues } from "@/schemas/Modules/Administracao/AgentesIA/ai-task-form-schema";
import type { AiTaskPreference } from "@/schemas/Modules/Administracao/AgentesIA/ai-task-preference-schema";
import type { AiTask } from "@/schemas/Modules/Administracao/AgentesIA/ai-task-schema";

export function getAiTaskFormDefaults(task: AiTask, preference: AiTaskPreference | null): AiTaskFormValues {
  return {
    integrationId: preference?.integrationId ?? "",
    model: preference?.model ?? "",
    prompt: preference?.prompt || task.defaultPrompt,
    variables: Object.fromEntries(task.variables.map((variable) => [variable.name, ""])),
  };
}
