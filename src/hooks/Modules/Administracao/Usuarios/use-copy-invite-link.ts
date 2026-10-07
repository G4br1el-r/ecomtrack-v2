"use client";

import { useMutation } from "@tanstack/react-query";

import { getInviteLink } from "@/services/Modules/Administracao/Usuarios/get-invite-link";

export function useCopyInviteLink() {
  return useMutation({
    mutationFn: async (userId: string) => {
      const { link } = await getInviteLink(userId);
      await navigator.clipboard.writeText(link);
      return link;
    },
  });
}
