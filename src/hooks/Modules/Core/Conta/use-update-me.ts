"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ME_QUERY_KEY } from "@/constants/Modules/Core/Conta/account";
import { updateMe } from "@/services/Modules/Core/Conta/update-me";
import { useSessionStore } from "@/store/Modules/Core/Auth/session-store";

export function useUpdateMe() {
  const queryClient = useQueryClient();
  const setUser = useSessionStore((state) => state.setUser);
  return useMutation({
    mutationFn: updateMe,
    onSuccess: (user) => {
      queryClient.setQueryData(ME_QUERY_KEY, user);
      setUser(user);
    },
  });
}
