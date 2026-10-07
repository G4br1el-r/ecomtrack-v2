export const HTTP_STATUS = {
  ok: 200,
  noContent: 204,
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  badGateway: 502,
} as const;

export const API_UNAVAILABLE_ERROR = {
  code: "NET01",
  message: "Não foi possível falar com o servidor. Tente de novo em alguns instantes.",
} as const;

export const API_NOT_FOUND_ERROR = {
  code: "NFD01",
  message: "Endereço da API não encontrado.",
} as const;

export const API_UNEXPECTED_ERROR_MESSAGE = "Algo deu errado. Tente de novo em alguns instantes.";

export const COMPANY_HEADER = "X-Company-Id";
export const SECURITY_PIN_HEADER = "X-Security-Pin";

export const FORWARDED_API_HEADERS = [
  "authorization",
  COMPANY_HEADER.toLowerCase(),
  SECURITY_PIN_HEADER.toLowerCase(),
  "user-agent",
  "x-forwarded-for",
] as const;

export const API_PROXY_BASE_PATH = "/api/modules/core/ecomtrack";

export const API_PROXY_BLOCKED_PATHS = ["auth/login", "auth/refresh", "auth/logout"] as const;

export const API_MAX_PAGE_SIZE = 100;

export const API_FIRST_PAGE = 1;

export const ALL_ITEMS_FILTERS = { Page: API_FIRST_PAGE, PageSize: API_MAX_PAGE_SIZE, Search: "" } as const;
