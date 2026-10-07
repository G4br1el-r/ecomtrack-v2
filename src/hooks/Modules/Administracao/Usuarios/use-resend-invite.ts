"use client";

import { INVITES_LIST_QUERY_KEY } from "@/constants/Modules/Administracao/Usuarios/users";
import { useOptimisticListMutation } from "@/hooks/Modules/Core/Api/use-optimistic-list-mutation";
import type { Invite } from "@/schemas/Modules/Administracao/Usuarios/invite-schema";
import { resendInvite } from "@/services/Modules/Administracao/Usuarios/resend-invite";

export function useResendInvite(
  handlers: { onSuccess?: (invite: Invite) => void; onError?: (error: Error) => void } = {},
) {
  return useOptimisticListMutation<string, Invite, Invite>({
    listKey: INVITES_LIST_QUERY_KEY,
    mutationFn: resendInvite,
    update: (invites, userId) =>
      invites.map((invite) => (invite.userId === userId ? { ...invite, status: "Pending" } : invite)),
    onSuccess: (invite) => handlers.onSuccess?.(invite),
    onError: (error) => handlers.onError?.(error),
  });
}
