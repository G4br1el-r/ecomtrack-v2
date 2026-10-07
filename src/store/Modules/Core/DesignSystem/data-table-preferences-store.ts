import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { DATA_TABLE_PREFERENCES_STORAGE_KEY } from "@/constants/Modules/Core/DesignSystem/data-table";
import {
  type DataTablePreferences,
  dataTablePreferencesMapSchema,
} from "@/schemas/Modules/Core/DesignSystem/data-table-preferences-schema";

type DataTablePreferencesState = {
  tables: Record<string, DataTablePreferences>;
  patchTable: (tableId: string, patch: DataTablePreferences) => void;
};

export const useDataTablePreferencesStore = create<DataTablePreferencesState>()(
  persist(
    (set) => ({
      tables: {},
      patchTable: (tableId, patch) =>
        set((state) => ({ tables: { ...state.tables, [tableId]: { ...state.tables[tableId], ...patch } } })),
    }),
    {
      name: DATA_TABLE_PREFERENCES_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (state) => ({ tables: state.tables }),
      merge: (persisted, current) => {
        const stored: unknown = persisted;
        const tables = typeof stored === "object" && stored !== null && "tables" in stored ? stored.tables : null;
        const parsed = dataTablePreferencesMapSchema.safeParse(tables);
        return { ...current, tables: parsed.success ? parsed.data : {} };
      },
    },
  ),
);
