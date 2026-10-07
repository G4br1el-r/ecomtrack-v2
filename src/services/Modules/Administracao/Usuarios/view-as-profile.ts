import { API_ENDPOINTS } from "@/constants/Modules/Core/Api/api-endpoints";
import { type ViewAs, viewAsSchema } from "@/schemas/Modules/Core/Access/view-as-schema";
import { requestApi } from "@/services/Modules/Core/Api/request-api";

export function viewAsProfile(id: string): Promise<ViewAs> {
  return requestApi(API_ENDPOINTS.profiles.viewAs, viewAsSchema, { params: { id } });
}
