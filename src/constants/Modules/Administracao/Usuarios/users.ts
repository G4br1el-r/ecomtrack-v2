import type { BadgeTone } from "@/@types/Modules/Core/DesignSystem/badge-tone";
import type { DataTableSettings } from "@/@types/Modules/Core/DesignSystem/data-table";
import { DEFAULT_PAGE_SIZE_OPTIONS } from "@/constants/Modules/Core/DesignSystem/table-pagination";
import type { InviteStatus } from "@/schemas/Modules/Administracao/Usuarios/invite-schema";
import type { UserStatus } from "@/schemas/Modules/Administracao/Usuarios/user-schema";

export const USERS_HREF = "/administracao/usuarios";

export const USERS_LIST_QUERY_KEY = ["administracao", "usuarios", "lista"] as const;
export const USER_DETAIL_QUERY_KEY = ["administracao", "usuarios", "detalhe"] as const;
export const USER_ACTIVITY_QUERY_KEY = ["administracao", "usuarios", "atividade"] as const;
export const INVITES_LIST_QUERY_KEY = ["administracao", "convites", "lista"] as const;
export const PROFILES_LIST_QUERY_KEY = ["administracao", "perfis", "lista"] as const;
export const PROFILE_DETAIL_QUERY_KEY = ["administracao", "perfis", "detalhe"] as const;

export const USERS_TABS = { users: "usuarios", invites: "convites", profiles: "perfis" } as const;

export const USER_STATUS_BADGE: Record<UserStatus, { label: string; tone: BadgeTone }> = {
  Active: { label: "Ativo", tone: "success" },
  Invited: { label: "Convidado", tone: "info" },
  Inactive: { label: "Inativo", tone: "secondary" },
};

export const INVITE_STATUS_BADGE: Record<InviteStatus, { label: string; tone: BadgeTone }> = {
  Pending: { label: "Pendente", tone: "warning" },
  Expired: { label: "Vencido", tone: "destructive" },
  Accepted: { label: "Aceito", tone: "success" },
};

export const USERS_TABLE_SETTINGS: DataTableSettings = {
  id: "administracao-usuarios",
  features: { sorting: false, columnResizing: false, expanding: false, rowPinning: false },
  searchPlaceholder: "Buscar por nome ou e-mail...",
  pagination: { pageSizeOptions: DEFAULT_PAGE_SIZE_OPTIONS },
};

export const INVITES_TABLE_SETTINGS: DataTableSettings = {
  id: "administracao-convites",
  features: { sorting: false, columnResizing: false, expanding: false, rowPinning: false },
  searchPlaceholder: "Buscar por nome ou e-mail...",
  pagination: { pageSizeOptions: DEFAULT_PAGE_SIZE_OPTIONS },
};

export const PROFILES_TABLE_SETTINGS: DataTableSettings = {
  id: "administracao-perfis",
  features: { sorting: false, columnResizing: false, expanding: false, rowPinning: false },
  searchPlaceholder: "Buscar perfil...",
  pagination: { pageSizeOptions: DEFAULT_PAGE_SIZE_OPTIONS },
};

export const USER_COLUMN_SIZE = {
  user: 300,
  profile: 180,
  status: 130,
  lastLoginAt: 170,
  createdAt: 140,
  actions: 64,
} as const;

export const INVITE_COLUMN_SIZE = {
  invitee: 300,
  profile: 170,
  status: 130,
  sentAt: 170,
  expiresAt: 170,
  invitedBy: 180,
  actions: 64,
} as const;

export const PROFILE_COLUMN_SIZE = {
  profile: 320,
  users: 120,
  isDefault: 130,
  version: 100,
  updatedAt: 170,
  actions: 64,
} as const;

export const ACTIVITY_PERIODS = [
  { value: "inicio", label: "Desde o início", days: null },
  { value: "7", label: "Últimos 7 dias", days: 7 },
  { value: "30", label: "Últimos 30 dias", days: 30 },
  { value: "90", label: "Últimos 90 dias", days: 90 },
] as const;

export const ACTIVITY_PAGE_SIZE = 50;
export const USER_EDIT_FORM_ID = "user-edit-form";
export const PROFILE_PERMISSIONS_FORM_ID = "profile-permissions-form";
