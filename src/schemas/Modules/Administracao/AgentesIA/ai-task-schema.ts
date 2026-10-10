import { z } from "zod";

export const aiTaskVariableSchema = z.object({
  name: z.string(),
  label: z.string(),
});

export const aiTaskSchema = z.object({
  key: z.string(),
  name: z.string(),
  description: z.string(),
  defaultPrompt: z.string(),
  variables: z.array(aiTaskVariableSchema),
});

export type AiTaskVariable = z.infer<typeof aiTaskVariableSchema>;
export type AiTask = z.infer<typeof aiTaskSchema>;
