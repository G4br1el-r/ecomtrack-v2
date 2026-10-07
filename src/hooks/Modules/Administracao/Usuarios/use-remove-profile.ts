"use client";

import { PROFILES_LIST_QUERY_KEY } from "@/constants/Modules/Administracao/Usuarios/users";
import { useOptimisticListMutation } from "@/hooks/Modules/Core/Api/use-optimistic-list-mutation";
import type { Profile } from "@/schemas/Modules/Administracao/Usuarios/profile-schema";
import { removeProfile } from "@/services/Modules/Administracao/Usuarios/remove-profile";

export function useRemoveProfile(handlers: { onSuccess?: () => void; onError?: (error: Error) => void } = {}) {
  return useOptimisticListMutation<string, void, Profile>({
    listKey: PROFILES_LIST_QUERY_KEY,
    mutationFn: removeProfile,
    update: (profiles, id) => profiles.filter((profile) => profile.id !== id),
    onSuccess: () => handlers.onSuccess?.(),
    onError: (error) => handlers.onError?.(error),
  });
}
