import { AI_TASK_PREFERENCE_PREFIX } from "@/constants/Modules/Core/Preferencias/preferences";

export function buildAiTaskPreferenceKey(taskKey: string): string {
  return `${AI_TASK_PREFERENCE_PREFIX}${taskKey}`;
}
