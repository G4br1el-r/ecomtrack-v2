import { z } from "zod";

export const apiErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
  errors: z.array(z.string()).nullish(),
});

export type ApiError = z.infer<typeof apiErrorSchema>;
