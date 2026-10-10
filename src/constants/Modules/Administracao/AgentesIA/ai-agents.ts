export const AI_AGENTS_TABS = { connections: "conexoes", tasks: "tarefas" } as const;
export const AI_TASKS_QUERY_KEY = ["administracao", "agentes-ia", "tarefas"] as const;
export const AI_TASK_FORM_ID = "ai-task-form";
export const AI_PROMPT_MAX_LENGTH = 20_000;
export const AI_MODEL_MAX_LENGTH = 100;
export const AI_TASK_SKELETON_CARDS = ["ai-task-skeleton-1", "ai-task-skeleton-2", "ai-task-skeleton-3"] as const;
export const AI_GENERATION_CODE_FENCE = /^```(?:json)?\s*([\s\S]*?)\s*```$/;
export const AI_GENERATE_ERROR_TITLE = "Não foi possível gerar o conteúdo";
