import { z } from "zod";

import { EMAIL_MAX_LENGTH, NAME_MAX_LENGTH } from "@/constants/Modules/Core/Api/validation";

export const inviteFormSchema = z.object({
  firstName: z.string().trim().min(1, "Informe o nome.").max(NAME_MAX_LENGTH, "Use no máximo 100 caracteres."),
  lastName: z.string().trim().min(1, "Informe o sobrenome.").max(NAME_MAX_LENGTH, "Use no máximo 100 caracteres."),
  email: z
    .string()
    .trim()
    .min(1, "Informe o e-mail.")
    .max(EMAIL_MAX_LENGTH, "Use no máximo 150 caracteres.")
    .pipe(z.email("Informe um e-mail válido.")),
  profileId: z.string().min(1, "Escolha um perfil."),
});

export type InviteFormValues = z.infer<typeof inviteFormSchema>;
