"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PROFILE_DETAIL_QUERY_KEY, PROFILES_LIST_QUERY_KEY } from "@/constants/Modules/Administracao/Usuarios/users";
import { MY_PERMISSIONS_QUERY_KEY } from "@/constants/Modules/Core/Access/access";
import { updateProfilePermissions } from "@/services/Modules/Administracao/Usuarios/update-profile-permissions";

export function useUpdateProfilePermissions() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProfilePermissions,
    onSuccess: (profile) => queryClient.setQueryData([...PROFILE_DETAIL_QUERY_KEY, profile.id], profile),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: PROFILES_LIST_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: MY_PERMISSIONS_QUERY_KEY });
    },
  });
}
