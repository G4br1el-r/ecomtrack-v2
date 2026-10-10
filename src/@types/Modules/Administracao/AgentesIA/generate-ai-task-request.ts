export type GenerateAiTaskRequest = {
  key: string;
  variables: Record<string, string | null>;
  integrationId?: string | null;
  model?: string | null;
  prompt?: string | null;
};
