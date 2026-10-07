"use client";

import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { NotificationSummary } from "@/schemas/Modules/Administracao/Comunicacao/notification-summary-schema";
import { useNotificationEditorStore } from "@/store/Modules/Administracao/Comunicacao/notification-editor-store";

export function NotificationEditButton({ notification }: { notification: NotificationSummary }) {
  const open = useNotificationEditorStore((state) => state.open);
  return (
    <div className="flex justify-end">
      <Button variant="ghost" size="sm" aria-label={`Editar ${notification.name}`} onClick={() => open(notification)}>
        <Pencil data-icon="inline-start" aria-hidden="true" />
        Editar
      </Button>
    </div>
  );
}
