import type { InvitesFilters } from "@/@types/Modules/Administracao/Usuarios/users-filters";
import { API_ENDPOINTS } from "@/constants/Modules/Core/Api/api-endpoints";
import { type InvitesPage, invitesPageSchema } from "@/schemas/Modules/Administracao/Usuarios/invites-page-schema";
import { requestApi } from "@/services/Modules/Core/Api/request-api";

export function listInvites(filters: InvitesFilters): Promise<InvitesPage> {
  return requestApi(API_ENDPOINTS.invites.list, invitesPageSchema, { query: filters });
}
