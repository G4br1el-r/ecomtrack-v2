import type { Density } from "@/@types/Modules/Core/DesignSystem/density";
import { DENSITIES } from "@/constants/Modules/Core/DesignSystem/density";
import { DENSITY_PREFERENCE_KEY, TABLE_PREFERENCE_PREFIX } from "@/constants/Modules/Core/Preferencias/preferences";
import {
  type DataTablePreferences,
  dataTablePreferencesSchema,
} from "@/schemas/Modules/Core/DesignSystem/data-table-preferences-schema";
import type { UserPreference } from "@/schemas/Modules/Core/Preferencias/user-preference-schema";

export function parseRemotePreferences(list: UserPreference[]): {
  tables: Record<string, DataTablePreferences>;
  density: Density | null;
} {
  const tables: Record<string, DataTablePreferences> = {};
  let density: Density | null = null;
  for (const { key, value } of list) {
    if (key === DENSITY_PREFERENCE_KEY) density = DENSITIES.find((option) => option === value) ?? null;
    if (!key.startsWith(TABLE_PREFERENCE_PREFIX)) continue;
    const parsed = dataTablePreferencesSchema.safeParse(value);
    if (parsed.success) tables[key.slice(TABLE_PREFERENCE_PREFIX.length)] = parsed.data;
  }
  return { tables, density };
}
