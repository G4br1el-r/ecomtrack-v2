import type { GenerationField } from "@/@types/Modules/Administracao/AgentesIA/generation-field";
import { AI_GENERATION_CODE_FENCE } from "@/constants/Modules/Administracao/AgentesIA/ai-agents";

export function parseGenerationFields(text: string): GenerationField[] | null {
  const trimmed = text.trim();
  const json = AI_GENERATION_CODE_FENCE.exec(trimmed)?.[1] ?? trimmed;
  try {
    const parsed: unknown = JSON.parse(json);
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) return null;
    return Object.entries(parsed).map(([key, value]) => ({
      key,
      value: typeof value === "string" ? value : JSON.stringify(value),
    }));
  } catch {
    return null;
  }
}
