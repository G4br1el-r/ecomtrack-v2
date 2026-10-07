"use client";

import { useMutation } from "@tanstack/react-query";

import { changePassword } from "@/services/Modules/Core/Conta/change-password";

export function useChangePassword() {
  return useMutation({ mutationFn: changePassword });
}
