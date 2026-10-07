"use client";

import { useQuery } from "@tanstack/react-query";

import { MY_PERMISSIONS_QUERY_KEY } from "@/constants/Modules/Core/Access/access";
import { getMyPermissions } from "@/services/Modules/Core/Access/get-my-permissions";

export function useMyPermissions() {
  return useQuery({ queryKey: MY_PERMISSIONS_QUERY_KEY, queryFn: getMyPermissions });
}
