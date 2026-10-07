import { API_ENDPOINTS } from "@/constants/Modules/Core/Api/api-endpoints";
import { type InviteLink, inviteLinkSchema } from "@/schemas/Modules/Administracao/Usuarios/invite-link-schema";
import { requestApi } from "@/services/Modules/Core/Api/request-api";

export function getInviteLink(userId: string): Promise<InviteLink> {
  return requestApi(API_ENDPOINTS.invites.link, inviteLinkSchema, { params: { userId } });
}
