import { API_ENDPOINTS } from "@/constants/Modules/Core/Api/api-endpoints";
import { type InviteInfo, inviteInfoSchema } from "@/schemas/Modules/Core/Auth/invite-info-schema";
import { requestApi } from "@/services/Modules/Core/Api/request-api";

export function getInvite(token: string): Promise<InviteInfo> {
  return requestApi(API_ENDPOINTS.auth.getInvite, inviteInfoSchema, { params: { token } });
}
