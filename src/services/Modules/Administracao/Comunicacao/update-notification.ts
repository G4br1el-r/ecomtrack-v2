import { API_ENDPOINTS } from "@/constants/Modules/Core/Api/api-endpoints";
import {
  type NotificationDetail,
  notificationDetailSchema,
} from "@/schemas/Modules/Administracao/Comunicacao/notification-detail-schema";
import type { NotificationFormValues } from "@/schemas/Modules/Administracao/Comunicacao/notification-form-schema";
import { requestApi } from "@/services/Modules/Core/Api/request-api";

export function updateNotification({
  key,
  subject,
  contentHtml,
}: NotificationFormValues & { key: string }): Promise<NotificationDetail> {
  return requestApi(API_ENDPOINTS.communication.update, notificationDetailSchema, {
    params: { key },
    body: { subject: subject || null, contentHtml },
  });
}
