import type { PagedFilters } from "@/@types/Modules/Core/Api/paged-filters";
import { API_ENDPOINTS } from "@/constants/Modules/Core/Api/api-endpoints";
import { type ProfilesPage, profilesPageSchema } from "@/schemas/Modules/Administracao/Usuarios/profiles-page-schema";
import { requestApi } from "@/services/Modules/Core/Api/request-api";

export function listProfiles(filters: PagedFilters): Promise<ProfilesPage> {
  return requestApi(API_ENDPOINTS.profiles.list, profilesPageSchema, { query: filters });
}
