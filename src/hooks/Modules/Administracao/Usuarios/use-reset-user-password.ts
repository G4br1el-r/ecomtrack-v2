"use client";

import { useMutation } from "@tanstack/react-query";

import { resetUserPassword } from "@/services/Modules/Administracao/Usuarios/reset-user-password";

export function useResetUserPassword() {
  return useMutation({ mutationFn: resetUserPassword });
}
