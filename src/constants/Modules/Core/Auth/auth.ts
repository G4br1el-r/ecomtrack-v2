const ONE_MINUTE_IN_MS = 60_000;
const SESSION_REFRESH_MINUTES = 13;

export const LOGIN_HREF = "/login";
export const REDIRECT_PARAM = "redirect";

export const PUBLIC_ROUTES = [LOGIN_HREF, "/redefinir-senha", "/convite", "/nao-encontrado", "/sem-permissao"] as const;

export const SESSION_COOKIE_NAME = "ecomtrack_session";
export const SESSION_QUERY_KEY = ["core", "auth", "session"] as const;
export const SESSION_REFRESH_INTERVAL_MS = SESSION_REFRESH_MINUTES * ONE_MINUTE_IN_MS;

export const LOGIN_CODE_LENGTH = 6;

export const SESSION_EXPIRED_ERROR = {
  code: "AUT06",
  message: "Sua sessão expirou. Entre de novo.",
} as const;

export const AUTH_BFF_ROUTES = {
  login: "/api/modules/core/auth/login",
  verify: "/api/modules/core/auth/verify",
  resend: "/api/modules/core/auth/resend",
  refresh: "/api/modules/core/auth/refresh",
  logout: "/api/modules/core/auth/logout",
} as const;

export const LOGIN_STEP_PARAM = "etapa";
export const LOGIN_FORGOT_STEP = "esqueci-senha";
export const FORGOT_PASSWORD_HREF = `${LOGIN_HREF}?${LOGIN_STEP_PARAM}=${LOGIN_FORGOT_STEP}`;
export const RESET_PASSWORD_HREF = "/redefinir-senha";
export const INVITE_HREF = "/convite";
export const PASSWORD_MIN_LENGTH = 10;
export const INVITE_QUERY_KEY = ["core", "auth", "convite"] as const;
export const INVALID_LINK_ERROR_CODE = "AUT07";
