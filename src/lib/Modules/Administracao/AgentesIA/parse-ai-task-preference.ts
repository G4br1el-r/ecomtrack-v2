import {
  type AiTaskPreference,
  aiTaskPreferenceSchema,
} from "@/schemas/Modules/Administracao/AgentesIA/ai-task-preference-schema";

export function parseAiTaskPreference(value: unknown): AiTaskPreference | null {
  const parsed = aiTaskPreferenceSchema.safeParse(value);
  return parsed.success ? parsed.data : null;
}
