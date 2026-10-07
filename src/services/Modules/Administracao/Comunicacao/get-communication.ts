import { API_ENDPOINTS } from "@/constants/Modules/Core/Api/api-endpoints";
import {
  type Communication,
  communicationSchema,
} from "@/schemas/Modules/Administracao/Comunicacao/communication-schema";
import { requestApi } from "@/services/Modules/Core/Api/request-api";

export function getCommunication(): Promise<Communication> {
  return requestApi(API_ENDPOINTS.communication.get, communicationSchema);
}
