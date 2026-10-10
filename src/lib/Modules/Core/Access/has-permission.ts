import type { PagePermissionComponents } from "@/schemas/Modules/Core/Access/page-permission-components-schema";

export function hasPermission(permissions: PagePermissionComponents | undefined, componentCode?: string): boolean {
  if (!permissions?.pageEnabled) return false;
  if (!componentCode) return true;
  return permissions.components.some((component) => component.code === componentCode && component.enabled);
}
