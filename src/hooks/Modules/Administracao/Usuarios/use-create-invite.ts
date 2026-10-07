"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { INVITES_LIST_QUERY_KEY, USERS_LIST_QUERY_KEY } from "@/constants/Modules/Administracao/Usuarios/users";
import { createInvite } from "@/services/Modules/Administracao/Usuarios/create-invite";

export function useCreateInvite() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createInvite,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: INVITES_LIST_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: USERS_LIST_QUERY_KEY });
    },
  });
}
