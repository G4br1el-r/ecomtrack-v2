"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { NOTIFICATION_PREVIEW_QUERY_KEY } from "@/constants/Modules/Administracao/Comunicacao/communication";
import type { NotificationFormValues } from "@/schemas/Modules/Administracao/Comunicacao/notification-form-schema";
import { previewNotification } from "@/services/Modules/Administracao/Comunicacao/preview-notification";

export function useNotificationPreview(key: string, values: NotificationFormValues) {
  return useQuery({
    queryKey: [...NOTIFICATION_PREVIEW_QUERY_KEY, key, values],
    queryFn: () => previewNotification({ key, ...values }),
    placeholderData: keepPreviousData,
    retry: false,
  });
}
