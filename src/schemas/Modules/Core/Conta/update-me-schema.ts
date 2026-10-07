import { z } from "zod";

import { NAME_MAX_LENGTH, URL_MAX_LENGTH } from "@/constants/Modules/Core/Api/validation";

export const updateMeSchema = z.object({
  firstName: z.string().trim().min(1, "Informe o nome.").max(NAME_MAX_LENGTH, "Use no máximo 100 caracteres."),
  lastName: z.string().trim().min(1, "Informe o sobrenome.").max(NAME_MAX_LENGTH, "Use no máximo 100 caracteres."),
  avatarUrl: z.union([
    z.literal(""),
    z.url("Informe um endereço válido, começando com https://.").max(URL_MAX_LENGTH, "Use no máximo 500 caracteres."),
  ]),
});

export type UpdateMeFormValues = z.infer<typeof updateMeSchema>;
