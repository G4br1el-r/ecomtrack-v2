import { z } from "zod";

import { EMAIL_SUBJECT_MAX_LENGTH } from "@/constants/Modules/Core/Api/validation";

export function notificationFormSchema(requiresSubject: boolean) {
  return z.object({
    subject: requiresSubject
      ? z.string().trim().min(1, "Informe o assunto.").max(EMAIL_SUBJECT_MAX_LENGTH, "Use no máximo 200 caracteres.")
      : z.string(),
    contentHtml: z.string().trim().min(1, "O conteúdo não pode ficar vazio."),
  });
}

export type NotificationFormValues = z.infer<ReturnType<typeof notificationFormSchema>>;
