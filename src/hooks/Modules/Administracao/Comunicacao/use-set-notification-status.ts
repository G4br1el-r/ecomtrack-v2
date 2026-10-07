"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  COMMUNICATION_QUERY_KEY,
  NOTIFICATION_QUERY_KEY,
} from "@/constants/Modules/Administracao/Comunicacao/communication";
import type { Communication } from "@/schemas/Modules/Administracao/Comunicacao/communication-schema";
import { setNotificationStatus } from "@/services/Modules/Administracao/Comunicacao/set-notification-status";

type StatusVariables = { key: string; isEnabled: boolean };

export function useSetNotificationStatus(
  handlers: { onSuccess?: (variables: StatusVariables) => void; onError?: (error: Error) => void } = {},
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: setNotificationStatus,
    onMutate: async ({ key, isEnabled }) => {
      await queryClient.cancelQueries({ queryKey: COMMUNICATION_QUERY_KEY, exact: true });
      const previous = queryClient.getQueryData<Communication>(COMMUNICATION_QUERY_KEY);
      queryClient.setQueryData<Communication>(COMMUNICATION_QUERY_KEY, (data) =>
        data
          ? {
              ...data,
              messages: data.messages.map((message) => (message.key === key ? { ...message, isEnabled } : message)),
            }
          : data,
      );
      return { previous };
    },
    onError: (error, _variables, context) => {
      queryClient.setQueryData(COMMUNICATION_QUERY_KEY, context?.previous);
      handlers.onError?.(error);
    },
    onSuccess: (detail, variables) => {
      queryClient.setQueryData([...NOTIFICATION_QUERY_KEY, detail.key], detail);
      handlers.onSuccess?.(variables);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: COMMUNICATION_QUERY_KEY, exact: true }),
  });
}
