import type { PendingNavigation } from "@/@types/Modules/Core/Shell/navigation";

export function resolveActivePathname(pathname: string, pending: PendingNavigation | null): string {
  if (pending && pending.from === pathname) return pending.href;
  return pathname;
}
