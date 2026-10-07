import { API_ENDPOINTS } from "@/constants/Modules/Core/Api/api-endpoints";
import { type Invite, inviteSchema } from "@/schemas/Modules/Administracao/Usuarios/invite-schema";
import { requestApi } from "@/services/Modules/Core/Api/request-api";

export function resendInvite(userId: string): Promise<Invite> {
  return requestApi(API_ENDPOINTS.invites.resend, inviteSchema, { params: { userId } });
}
