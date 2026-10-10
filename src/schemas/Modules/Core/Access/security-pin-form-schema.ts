import { z } from "zod";

const DIGITS_ONLY_PATTERN = /^\d+$/;

export function securityPinFormSchema(length: number) {
  return z.object({
    pin: z.string().length(length, `O PIN tem ${length} dígitos.`).regex(DIGITS_ONLY_PATTERN, "Use só números."),
  });
}

export type SecurityPinFormValues = z.infer<ReturnType<typeof securityPinFormSchema>>;
