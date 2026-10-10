import { z } from "zod";

export const aiTaskPreferenceSchema = z.object({
  integrationId: z.string().nullable().optional().catch(null),
  model: z.string().nullable().optional().catch(null),
  prompt: z.string().nullable().optional().catch(null),
});

export type AiTaskPreference = z.infer<typeof aiTaskPreferenceSchema>;
