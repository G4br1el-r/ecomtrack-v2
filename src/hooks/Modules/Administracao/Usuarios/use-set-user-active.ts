"use client";

import { USERS_LIST_QUERY_KEY } from "@/constants/Modules/Administracao/Usuarios/users";
import { useOptimisticListMutation } from "@/hooks/Modules/Core/Api/use-optimistic-list-mutation";
import type { User } from "@/schemas/Modules/Administracao/Usuarios/user-schema";
import { activateUser } from "@/services/Modules/Administracao/Usuarios/activate-user";
import { deactivateUser } from "@/services/Modules/Administracao/Usuarios/deactivate-user";

type SetUserActiveVariables = { id: string; active: boolean };

export function useSetUserActive(
  handlers: {
    onSuccess?: (variables: SetUserActiveVariables) => void;
    onError?: (error: Error, variables: SetUserActiveVariables) => void;
  } = {},
) {
  return useOptimisticListMutation<SetUserActiveVariables, void, User>({
    listKey: USERS_LIST_QUERY_KEY,
    mutationFn: ({ id, active }) => (active ? activateUser(id) : deactivateUser(id)),
    update: (users, { id, active }) =>
      users.map((user) => (user.id === id ? { ...user, status: active ? "Active" : "Inactive" } : user)),
    onSuccess: (_, variables) => handlers.onSuccess?.(variables),
    onError: handlers.onError,
  });
}
