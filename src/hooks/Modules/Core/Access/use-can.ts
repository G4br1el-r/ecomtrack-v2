"use client";

import { hasPermission } from "@/lib/Modules/Core/Access/has-permission";

import { usePagePermissions } from "./use-page-permissions";

export function useCan(pageCode: string | undefined) {
  const { data, isPending } = usePagePermissions(pageCode);
  return {
    can: (componentCode?: string) => hasPermission(data, componentCode),
    pageEnabled: data?.pageEnabled ?? false,
    isChecking: isPending,
  };
}
