import { API_ENDPOINTS } from "@/constants/Modules/Core/Api/api-endpoints";
import {
  type NotificationDetail,
  notificationDetailSchema,
} from "@/schemas/Modules/Administracao/Comunicacao/notification-detail-schema";
import { requestApi } from "@/services/Modules/Core/Api/request-api";

export function setNotificationStatus({
  key,
  isEnabled,
}: {
  key: string;
  isEnabled: boolean;
}): Promise<NotificationDetail> {
  return requestApi(API_ENDPOINTS.communication.setStatus, notificationDetailSchema, {
    params: { key },
    body: { isEnabled },
  });
}
