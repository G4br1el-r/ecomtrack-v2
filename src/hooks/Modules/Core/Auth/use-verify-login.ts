"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { SESSION_QUERY_KEY } from "@/constants/Modules/Core/Auth/auth";
import { verifyLogin } from "@/services/Modules/Core/Auth/verify-login";
import { useSessionStore } from "@/store/Modules/Core/Auth/session-store";

export function useVerifyLogin() {
  const queryClient = useQueryClient();
  const setSession = useSessionStore((state) => state.setSession);
  return useMutation({
    mutationFn: verifyLogin,
    onSuccess: (tokens) => {
      setSession(tokens);
      queryClient.setQueryData(SESSION_QUERY_KEY, tokens);
    },
  });
}
