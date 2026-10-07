import { LOGIN_HREF } from "@/constants/Modules/Core/Auth/auth";
import { HOME_HREF } from "@/constants/Modules/Core/Shell/navigation";

export function resolveSafeRedirect(target: string | null): string {
  if (!target?.startsWith("/") || target.startsWith("//") || target.startsWith("/\\")) return HOME_HREF;
  if (target === LOGIN_HREF || target.startsWith(`${LOGIN_HREF}?`)) return HOME_HREF;
  return target;
}
