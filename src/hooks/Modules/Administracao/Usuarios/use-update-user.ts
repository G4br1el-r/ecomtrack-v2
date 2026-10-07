"use client";

import { USER_DETAIL_QUERY_KEY, USERS_LIST_QUERY_KEY } from "@/constants/Modules/Administracao/Usuarios/users";
import { useOptimisticListMutation } from "@/hooks/Modules/Core/Api/use-optimistic-list-mutation";
import type { UserFormValues } from "@/schemas/Modules/Administracao/Usuarios/user-form-schema";
import type { User } from "@/schemas/Modules/Administracao/Usuarios/user-schema";
import { updateUser } from "@/services/Modules/Administracao/Usuarios/update-user";

type UpdateUserVariables = UserFormValues & { id: string; profileName: string | null };

export function useUpdateUser(handlers: { onSuccess?: (user: User) => void; onError?: (error: Error) => void } = {}) {
  return useOptimisticListMutation<UpdateUserVariables, User, User>({
    listKey: USERS_LIST_QUERY_KEY,
    invalidateKeys: [USER_DETAIL_QUERY_KEY],
    mutationFn: ({ profileName: _profileName, ...values }) => updateUser(values),
    update: (users, { id, firstName, lastName, profileId, profileName }) =>
      users.map((user) => (user.id === id ? { ...user, firstName, lastName, profileId, profileName } : user)),
    onSuccess: (user) => handlers.onSuccess?.(user),
    onError: (error) => handlers.onError?.(error),
  });
}
