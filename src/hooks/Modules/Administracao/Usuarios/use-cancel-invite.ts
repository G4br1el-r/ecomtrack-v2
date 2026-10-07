"use client";

import { INVITES_LIST_QUERY_KEY, USERS_LIST_QUERY_KEY } from "@/constants/Modules/Administracao/Usuarios/users";
import { useOptimisticListMutation } from "@/hooks/Modules/Core/Api/use-optimistic-list-mutation";
import type { Invite } from "@/schemas/Modules/Administracao/Usuarios/invite-schema";
import { cancelInvite } from "@/services/Modules/Administracao/Usuarios/cancel-invite";

export function useCancelInvite(handlers: { onSuccess?: () => void; onError?: (error: Error) => void } = {}) {
  return useOptimisticListMutation<string, void, Invite>({
    listKey: INVITES_LIST_QUERY_KEY,
    mutationFn: cancelInvite,
    update: (invites, userId) => invites.filter((invite) => invite.userId !== userId),
    invalidateKeys: [USERS_LIST_QUERY_KEY],
    onSuccess: () => handlers.onSuccess?.(),
    onError: (error) => handlers.onError?.(error),
  });
}
