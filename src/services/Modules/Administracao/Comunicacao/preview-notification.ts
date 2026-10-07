import { API_ENDPOINTS } from "@/constants/Modules/Core/Api/api-endpoints";
import {
  type EmailPreview,
  emailPreviewSchema,
} from "@/schemas/Modules/Administracao/Comunicacao/email-preview-schema";
import type { NotificationFormValues } from "@/schemas/Modules/Administracao/Comunicacao/notification-form-schema";
import { requestApi } from "@/services/Modules/Core/Api/request-api";

export function previewNotification({
  key,
  subject,
  contentHtml,
}: NotificationFormValues & { key: string }): Promise<EmailPreview> {
  return requestApi(API_ENDPOINTS.communication.preview, emailPreviewSchema, {
    params: { key },
    body: { subject: subject || null, contentHtml },
  });
}
