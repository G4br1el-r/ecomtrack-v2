"use client";

import type {
  DataTableFeature,
  DataTableFeatureFlags,
  DataTableSettings,
} from "@/@types/Modules/Core/DesignSystem/data-table";
import { DATA_TABLE_BASIC_FEATURES } from "@/constants/Modules/Core/DesignSystem/data-table";
import { resolveDataTableFeatures } from "@/lib/Modules/Core/DesignSystem/resolve-data-table-features";
import type { DataTablePreferences } from "@/schemas/Modules/Core/DesignSystem/data-table-preferences-schema";
import { useDataTablePreferencesStore } from "@/store/Modules/Core/DesignSystem/data-table-preferences-store";

const NO_PREFERENCES: DataTablePreferences = {};

export function useDataTablePreferences(settings: DataTableSettings | undefined): {
  features: DataTableFeatureFlags;
  preferences: DataTablePreferences;
  patch: (patch: DataTablePreferences) => void;
  setFeature: (feature: DataTableFeature, enabled: boolean) => void;
  resetFeatures: () => void;
} {
  const tableId = settings?.id;
  const preferences = useDataTablePreferencesStore((state) => (tableId ? state.tables[tableId] : undefined));
  const patchTable = useDataTablePreferencesStore((state) => state.patchTable);
  const current = preferences ?? NO_PREFERENCES;

  const patch = (next: DataTablePreferences) => {
    if (tableId) patchTable(tableId, next);
  };

  return {
    features: resolveDataTableFeatures(settings?.features ?? DATA_TABLE_BASIC_FEATURES, current.features),
    preferences: current,
    patch,
    setFeature: (feature, enabled) => patch({ features: { ...current.features, [feature]: enabled } }),
    resetFeatures: () => patch({ features: {} }),
  };
}
