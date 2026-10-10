"use client";

import { usePermissionsHub } from "@/hooks/Modules/Core/Access/use-permissions-hub";

export function PermissionsHub({ hubUrl }: { hubUrl: string | null }) {
  usePermissionsHub(hubUrl);
  return null;
}
