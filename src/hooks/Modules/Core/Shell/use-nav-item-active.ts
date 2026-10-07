"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { isNavItemActive } from "@/lib/Modules/Core/Shell/is-nav-item-active";
import { resolveActivePathname } from "@/lib/Modules/Core/Shell/resolve-active-pathname";
import { useSidebarNavStore } from "@/store/Modules/Core/Shell/sidebar-nav-store";

export function useNavItemActive(href: string) {
  const pathname = usePathname();
  const pending = useSidebarNavStore((state) => state.pending);
  const setPending = useSidebarNavStore((state) => state.setPending);
  const clearStale = useSidebarNavStore((state) => state.clearStale);

  useEffect(() => {
    clearStale(pathname);
  }, [pathname, clearStale]);

  return {
    isActive: isNavItemActive(resolveActivePathname(pathname, pending), href),
    markPending: () => setPending({ href, from: pathname }),
  };
}
