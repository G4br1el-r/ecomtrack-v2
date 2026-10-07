"use client";

import { Mail } from "lucide-react";

import { DetailSheet } from "@/components/Modules/Core/DesignSystem/detail-sheet";
import { ErrorState } from "@/components/Modules/Core/DesignSystem/error-state";
import { Skeleton } from "@/components/ui/skeleton";
import { useNotification } from "@/hooks/Modules/Administracao/Comunicacao/use-notification";
import { useNotificationEditorStore } from "@/store/Modules/Administracao/Comunicacao/notification-editor-store";

import { NotificationEditor } from "../notification-editor";
import { NotificationEditorActions } from "../notification-editor-actions";

export function NotificationEditorSheet() {
  const notification = useNotificationEditorStore((state) => state.notification);
  const isOpen = useNotificationEditorStore((state) => state.isOpen);
  const close = useNotificationEditorStore((state) => state.close);
  const detail = useNotification(isOpen && notification ? notification.key : null);

  return (
    <DetailSheet
      open={isOpen}
      onOpenChange={(next) => {
        if (!next) close();
      }}
      size="wide"
      icon={Mail}
      title={notification ? `Editar ${notification.name}` : "Editar e-mail"}
      description={notification?.description}
      footer={detail.data ? <NotificationEditorActions detail={detail.data} onClose={close} /> : undefined}
    >
      {detail.isError ? (
        <ErrorState onRetry={() => detail.refetch()} />
      ) : detail.data ? (
        <NotificationEditor
          key={`${detail.data.key}:${detail.data.subject ?? ""}:${detail.data.contentHtml}`}
          detail={detail.data}
          onSaved={close}
        />
      ) : (
        <div className="grid gap-4 lg:grid-cols-2" role="status" aria-label="Carregando o e-mail">
          <Skeleton className="h-96 w-full" />
          <Skeleton className="h-96 w-full" />
        </div>
      )}
    </DetailSheet>
  );
}
