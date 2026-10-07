import { API_ENDPOINTS } from "@/constants/Modules/Core/Api/api-endpoints";
import {
  type NotificationDetail,
  notificationDetailSchema,
} from "@/schemas/Modules/Administracao/Comunicacao/notification-detail-schema";
import { requestApi } from "@/services/Modules/Core/Api/request-api";

export function saveNotificationDefault(key: string): Promise<NotificationDetail> {
  return requestApi(API_ENDPOINTS.communication.saveAsDefault, notificationDetailSchema, { params: { key } });
}
