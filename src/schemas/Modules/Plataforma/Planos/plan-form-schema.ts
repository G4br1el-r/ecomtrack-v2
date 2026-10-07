import { z } from "zod";

import { DESCRIPTION_MAX_LENGTH, NAME_MAX_LENGTH } from "@/constants/Modules/Core/Api/validation";

export const planFormSchema = z.object({
  name: z.string().trim().min(1, "Informe o nome do plano.").max(NAME_MAX_LENGTH, "Use no máximo 100 caracteres."),
  description: z.string().trim().max(DESCRIPTION_MAX_LENGTH, "Use no máximo 500 caracteres."),
});

export type PlanFormValues = z.infer<typeof planFormSchema>;
