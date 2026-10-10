"use client";

import { useEffect, useRef } from "react";

import {
  DENSITY_PREFERENCE_KEY,
  PREFERENCE_SAVE_DEBOUNCE_IN_MS,
} from "@/constants/Modules/Core/Preferencias/preferences";
import { buildTablePreferenceKey } from "@/lib/Modules/Core/Preferencias/build-table-preference-key";
import { compactTablePreferences } from "@/lib/Modules/Core/Preferencias/compact-table-preferences";
import { parseRemotePreferences } from "@/lib/Modules/Core/Preferencias/parse-remote-preferences";
import { useViewAsStore } from "@/store/Modules/Core/Access/view-as-store";
import { useDataTablePreferencesStore } from "@/store/Modules/Core/DesignSystem/data-table-preferences-store";
import { useDensityStore } from "@/store/Modules/Core/DesignSystem/density-store";

import { usePreferences } from "./use-preferences";
import { useRemovePreference } from "./use-remove-preference";
import { useSavePreference } from "./use-save-preference";

export function usePreferencesSync() {
  const { data } = usePreferences();
  const { mutate: save } = useSavePreference();
  const { mutate: remove } = useRemovePreference();
  const synced = useRef(new Map<string, string>());
  const timers = useRef(new Map<string, ReturnType<typeof setTimeout>>());
  const ready = data !== undefined;

  useEffect(() => {
    if (!data) return;
    const remote = parseRemotePreferences(data);
    for (const [tableId, preferences] of Object.entries(remote.tables)) {
      synced.current.set(buildTablePreferenceKey(tableId), JSON.stringify(compactTablePreferences(preferences)));
    }
    if (remote.density) synced.current.set(DENSITY_PREFERENCE_KEY, JSON.stringify(remote.density));
    useDataTablePreferencesStore.setState((state) => ({ tables: { ...state.tables, ...remote.tables } }));
    if (remote.density) useDensityStore.getState().setDensity(remote.density);
  }, [data]);

  useEffect(() => {
    if (!ready) return;
    const pending = timers.current;
    const schedule = (key: string, value: unknown) => {
      const serialized = JSON.stringify(value);
      if (synced.current.get(key) === serialized) return;
      clearTimeout(pending.get(key));
      pending.set(
        key,
        setTimeout(() => {
          pending.delete(key);
          if (useViewAsStore.getState().session) return;
          synced.current.set(key, serialized);
          if (value === null) remove(key);
          else save({ key, value });
        }, PREFERENCE_SAVE_DEBOUNCE_IN_MS),
      );
    };

    const stopTables = useDataTablePreferencesStore.subscribe((state, previous) => {
      for (const [tableId, preferences] of Object.entries(state.tables)) {
        if (preferences === previous.tables[tableId]) continue;
        schedule(buildTablePreferenceKey(tableId), compactTablePreferences(preferences));
      }
    });
    const stopDensity = useDensityStore.subscribe((state, previous) => {
      if (state.density !== previous.density) schedule(DENSITY_PREFERENCE_KEY, state.density);
    });

    return () => {
      stopTables();
      stopDensity();
      for (const timer of pending.values()) clearTimeout(timer);
      pending.clear();
    };
  }, [ready, save, remove]);
}
