"use client";

import { useMutation } from "@tanstack/react-query";

import { LOGIN_HREF } from "@/constants/Modules/Core/Auth/auth";
import { logout } from "@/services/Modules/Core/Auth/logout";

export function useLogout() {
  return useMutation({
    mutationFn: logout,
    onSettled: () => window.location.assign(LOGIN_HREF),
  });
}
