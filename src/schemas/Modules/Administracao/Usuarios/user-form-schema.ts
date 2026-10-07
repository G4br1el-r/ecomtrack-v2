import { z } from "zod";

import { NAME_MAX_LENGTH } from "@/constants/Modules/Core/Api/validation";

export const userFormSchema = z.object({
  firstName: z.string().trim().min(1, "Informe o nome.").max(NAME_MAX_LENGTH, "Use no máximo 100 caracteres."),
  lastName: z.string().trim().min(1, "Informe o sobrenome.").max(NAME_MAX_LENGTH, "Use no máximo 100 caracteres."),
  profileId: z.string().min(1, "Escolha um perfil."),
});

export type UserFormValues = z.infer<typeof userFormSchema>;
