import { PERMISSIONS_HUB_PATH } from "@/constants/Modules/Core/Access/access";

export function buildPermissionsHubUrl(apiUrl: string | undefined): string | null {
  if (!apiUrl) return null;
  return `${apiUrl.replace(/\/+$/, "")}${PERMISSIONS_HUB_PATH}`;
}
