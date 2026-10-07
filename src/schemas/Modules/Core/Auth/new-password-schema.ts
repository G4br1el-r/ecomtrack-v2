import { z } from "zod";

import { passwordSchema } from "./password-schema";

export const newPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Repita a senha."),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "As senhas não são iguais.",
    path: ["confirmPassword"],
  });

export type NewPasswordFormValues = z.infer<typeof newPasswordSchema>;
