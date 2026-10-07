"use client";

import { useMutation } from "@tanstack/react-query";

import { sendTestNotification } from "@/services/Modules/Administracao/Comunicacao/send-test-notification";

export function useSendTestNotification() {
  return useMutation({ mutationFn: sendTestNotification });
}
