"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { PREFERENCE_QUERY_KEY, PREFERENCES_QUERY_KEY } from "@/constants/Modules/Core/Preferencias/preferences";
import { upsertPreference } from "@/lib/Modules/Core/Preferencias/upsert-preference";
import type { UserPreference } from "@/schemas/Modules/Core/Preferencias/user-preference-schema";
import { savePreference } from "@/services/Modules/Core/Preferencias/save-preference";

export function useSavePreference() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: savePreference,
    onSuccess: (saved) => {
      queryClient.setQueryData<UserPreference[]>(PREFERENCES_QUERY_KEY, (list) =>
        list ? upsertPreference(list, saved) : list,
      );
      queryClient.setQueryData([...PREFERENCE_QUERY_KEY, saved.key], saved);
    },
  });
}
