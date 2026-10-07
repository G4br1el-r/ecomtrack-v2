import type { PagedFilters } from "@/@types/Modules/Core/Api/paged-filters";
import type { InviteStatus } from "@/schemas/Modules/Administracao/Usuarios/invite-schema";
import type { UserStatus } from "@/schemas/Modules/Administracao/Usuarios/user-schema";

export type UsersFilters = PagedFilters & { Status?: UserStatus; ProfileId?: string };

export type InvitesFilters = PagedFilters & { Status?: InviteStatus };

export type UserActivityFilters = PagedFilters & { From?: string; To?: string };
