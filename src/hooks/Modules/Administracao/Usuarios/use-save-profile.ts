"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { PROFILE_DETAIL_QUERY_KEY, PROFILES_LIST_QUERY_KEY } from "@/constants/Modules/Administracao/Usuarios/users";
import type { ProfileFormValues } from "@/schemas/Modules/Administracao/Usuarios/profile-form-schema";
import { createProfile } from "@/services/Modules/Administracao/Usuarios/create-profile";
import { updateProfile } from "@/services/Modules/Administracao/Usuarios/update-profile";

type SaveProfileVariables = ProfileFormValues & { id?: string; version?: number };

export function useSaveProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, version, ...values }: SaveProfileVariables) =>
      id && version !== undefined ? updateProfile({ ...values, id, version }) : createProfile(values),
    onSuccess: (profile) => queryClient.setQueryData([...PROFILE_DETAIL_QUERY_KEY, profile.id], profile),
    onSettled: () => queryClient.invalidateQueries({ queryKey: PROFILES_LIST_QUERY_KEY }),
  });
}
