import type { ProfilePermissions } from "@/schemas/Modules/Core/Access/profile-permissions-schema";

export function hasPermission(permissions: ProfilePermissions | undefined, code: string): boolean {
  if (!permissions) return false;
  if (permissions.kind === "Owner") return true;
  return permissions.components.includes(code) || permissions.pages.some((page) => page.code === code);
}
