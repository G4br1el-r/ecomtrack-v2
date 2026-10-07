import { LOGIN_HREF, PUBLIC_ROUTES } from "@/constants/Modules/Core/Auth/auth";
import { HOME_HREF } from "@/constants/Modules/Core/Shell/navigation";

import { getLoginHref } from "./get-login-href";

export function resolveAuthRedirect(pathname: string, search: string, hasSession: boolean): string | null {
  if (pathname === LOGIN_HREF) return hasSession ? HOME_HREF : null;
  if (hasSession) return null;
  const isPublic = PUBLIC_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`));
  return isPublic ? null : getLoginHref(`${pathname}${search}`);
}
