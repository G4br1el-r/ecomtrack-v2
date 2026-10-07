"use client";

import { hasPermission } from "@/lib/Modules/Core/Access/has-permission";

import { useMyPermissions } from "./use-my-permissions";

export function useCan() {
  const { data, isPending } = useMyPermissions();
  return { can: (code: string) => hasPermission(data, code), isChecking: isPending };
}
