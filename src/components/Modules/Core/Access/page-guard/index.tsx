"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import { FORBIDDEN_ROUTE } from "@/constants/Modules/Core/Access/access";
import { usePermissionMenu } from "@/hooks/Modules/Core/Access/use-permission-menu";
import { findMenuEntry } from "@/lib/Modules/Core/Shell/find-menu-entry";

export function PageGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: menu } = usePermissionMenu();
  const blocked = findMenuEntry(menu, pathname)?.page.enabled === false;

  useEffect(() => {
    if (blocked) router.replace(FORBIDDEN_ROUTE);
  }, [blocked, router]);

  return blocked ? null : children;
}
