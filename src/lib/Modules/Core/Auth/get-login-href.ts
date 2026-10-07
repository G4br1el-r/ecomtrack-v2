import { LOGIN_HREF, REDIRECT_PARAM } from "@/constants/Modules/Core/Auth/auth";

export function getLoginHref(returnTo: string): string {
  return `${LOGIN_HREF}?${new URLSearchParams({ [REDIRECT_PARAM]: returnTo })}`;
}
