export const PERMISSIONS_QUERY_KEY = ["core", "access", "permissions"] as const;
export const PERMISSION_MENU_QUERY_KEY = [...PERMISSIONS_QUERY_KEY, "menu"] as const;
export const PAGE_PERMISSIONS_QUERY_KEY = [...PERMISSIONS_QUERY_KEY, "pages"] as const;
export const PERMISSION_CATALOG_QUERY_KEY = ["core", "access", "catalog"] as const;
export const NO_SECTION_LABEL = "Geral";
export const FORBIDDEN_ROUTE = "/sem-permissao";

export const PLATFORM_ONLY_PAGE_CODES = ["empresas", "planos"] as const;
export const PERMISSIONS_HUB_PATH = "/hubs/permissions";
export const PERMISSIONS_CHANGED_EVENT = "PermissionsChanged";
