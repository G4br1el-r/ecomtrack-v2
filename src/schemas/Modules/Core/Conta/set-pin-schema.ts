import { z } from "zod";

const DIGITS_ONLY_PATTERN = /^\d+$/;

export function setPinSchema(length: number) {
  return z
    .object({
      pin: z.string().length(length, `O PIN tem ${length} dígitos.`).regex(DIGITS_ONLY_PATTERN, "Use só números."),
      confirmPin: z.string().min(1, "Repita o PIN."),
      currentPassword: z.string().min(1, "Informe a sua senha."),
    })
    .refine((values) => values.pin === values.confirmPin, { message: "Os PINs não são iguais.", path: ["confirmPin"] });
}

export type SetPinFormValues = z.infer<ReturnType<typeof setPinSchema>>;
