import { TABLE_PREFERENCE_PREFIX } from "@/constants/Modules/Core/Preferencias/preferences";

export function buildTablePreferenceKey(tableId: string): string {
  return `${TABLE_PREFERENCE_PREFIX}${tableId.toLowerCase()}`;
}
