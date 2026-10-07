"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ME_QUERY_KEY } from "@/constants/Modules/Core/Conta/account";
import { setPin } from "@/services/Modules/Core/Conta/set-pin";

export function useSetPin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: setPin,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ME_QUERY_KEY }),
  });
}
