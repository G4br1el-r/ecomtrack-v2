import { API_ENDPOINTS } from "@/constants/Modules/Core/Api/api-endpoints";
import type { InviteFormValues } from "@/schemas/Modules/Administracao/Usuarios/invite-form-schema";
import { type Invite, inviteSchema } from "@/schemas/Modules/Administracao/Usuarios/invite-schema";
import { requestApi } from "@/services/Modules/Core/Api/request-api";

export function createInvite(values: InviteFormValues): Promise<Invite> {
  return requestApi(API_ENDPOINTS.invites.create, inviteSchema, { body: values });
}
