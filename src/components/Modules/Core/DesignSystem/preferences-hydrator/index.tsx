"use client";

import { useEffect } from "react";

import { useDataTablePreferencesStore } from "@/store/Modules/Core/DesignSystem/data-table-preferences-store";
import { useDensityStore } from "@/store/Modules/Core/DesignSystem/density-store";
import { useCompanyContextStore } from "@/store/Modules/Core/Shell/company-context-store";

export function PreferencesHydrator() {
  useEffect(() => {
    useDensityStore.persist.rehydrate();
    useDataTablePreferencesStore.persist.rehydrate();
    useCompanyContextStore.persist.rehydrate();
  }, []);
  return null;
}
