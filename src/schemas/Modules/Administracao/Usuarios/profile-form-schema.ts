import { z } from "zod";

import { DESCRIPTION_MAX_LENGTH, NAME_MAX_LENGTH } from "@/constants/Modules/Core/Api/validation";

export const profileFormSchema = z.object({
  name: z.string().trim().min(1, "Informe o nome do perfil.").max(NAME_MAX_LENGTH, "Use no máximo 100 caracteres."),
  description: z.string().trim().max(DESCRIPTION_MAX_LENGTH, "Use no máximo 500 caracteres."),
  isDefault: z.boolean(),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
