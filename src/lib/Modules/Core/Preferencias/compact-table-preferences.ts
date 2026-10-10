import type { DataTablePreferences } from "@/schemas/Modules/Core/DesignSystem/data-table-preferences-schema";

export function compactTablePreferences(preferences: DataTablePreferences | undefined): DataTablePreferences | null {
  const entries = Object.entries(preferences ?? {}).filter(([, value]) => {
    if (value === undefined || value === null) return false;
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === "object") return Object.keys(value).length > 0;
    return true;
  });
  return entries.length > 0 ? Object.fromEntries(entries) : null;
}
