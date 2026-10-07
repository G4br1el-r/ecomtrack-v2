"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  COMMUNICATION_QUERY_KEY,
  NOTIFICATION_QUERY_KEY,
} from "@/constants/Modules/Administracao/Comunicacao/communication";
import type { NotificationDetail } from "@/schemas/Modules/Administracao/Comunicacao/notification-detail-schema";

export function useNotificationAction<TVariables>(
  action: (variables: TVariables) => Promise<NotificationDetail>,
  handlers: { onSuccess?: (detail: NotificationDetail) => void; onError?: (error: Error) => void } = {},
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: action,
    onSuccess: (detail) => {
      queryClient.setQueryData([...NOTIFICATION_QUERY_KEY, detail.key], detail);
      handlers.onSuccess?.(detail);
    },
    onError: handlers.onError,
    onSettled: () => queryClient.invalidateQueries({ queryKey: COMMUNICATION_QUERY_KEY, exact: true }),
  });
}
