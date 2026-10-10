export const PREFERENCES_QUERY_KEY = ["core", "preferencias"] as const;
export const PREFERENCE_QUERY_KEY = [...PREFERENCES_QUERY_KEY, "chave"] as const;
export const TABLE_PREFERENCE_PREFIX = "table.";
export const DENSITY_PREFERENCE_KEY = "ui.density";
export const AI_TASK_PREFERENCE_PREFIX = "ai.task.";
export const PREFERENCE_SAVE_DEBOUNCE_IN_MS = 800;
