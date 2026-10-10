"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { PREFERENCE_QUERY_KEY, PREFERENCES_QUERY_KEY } from "@/constants/Modules/Core/Preferencias/preferences";
import type { UserPreference } from "@/schemas/Modules/Core/Preferencias/user-preference-schema";
import { removePreference } from "@/services/Modules/Core/Preferencias/remove-preference";

export function useRemovePreference() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removePreference,
    onSuccess: (_, key) => {
      queryClient.setQueryData<UserPreference[]>(PREFERENCES_QUERY_KEY, (list) =>
        list?.filter((item) => item.key !== key),
      );
      queryClient.setQueryData([...PREFERENCE_QUERY_KEY, key], null);
    },
  });
}
