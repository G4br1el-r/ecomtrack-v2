"use client";

import { BookmarkCheck, RotateCcw, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { ActionLockTooltip } from "@/components/Modules/Core/DesignSystem/action-lock-tooltip";
import { ConfirmDialog } from "@/components/Modules/Core/DesignSystem/confirm-dialog";
import { Button } from "@/components/ui/button";
import { NOTIFICATION_FORM_ID } from "@/constants/Modules/Administracao/Comunicacao/communication";
import { API_ENDPOINTS } from "@/constants/Modules/Core/Api/api-endpoints";
import { useNotificationAction } from "@/hooks/Modules/Administracao/Comunicacao/use-notification-action";
import { useSendTestNotification } from "@/hooks/Modules/Administracao/Comunicacao/use-send-test-notification";
import { useCan } from "@/hooks/Modules/Core/Access/use-can";
import type { NotificationDetail } from "@/schemas/Modules/Administracao/Comunicacao/notification-detail-schema";
import { restoreNotification } from "@/services/Modules/Administracao/Comunicacao/restore-notification";
import { saveNotificationDefault } from "@/services/Modules/Administracao/Comunicacao/save-notification-default";
import { useSessionStore } from "@/store/Modules/Core/Auth/session-store";

export function NotificationEditorActions({ detail, onClose }: { detail: NotificationDetail; onClose: () => void }) {
  const { can } = useCan(API_ENDPOINTS.communication.update.page);
  const email = useSessionStore((state) => state.user?.email);
  const [confirmingRestore, setConfirmingRestore] = useState(false);
  const canEdit = can(API_ENDPOINTS.communication.update.component);
  const canTest = can(API_ENDPOINTS.communication.sendTest.component);
  const restore = useNotificationAction(restoreNotification);
  const saveDefault = useNotificationAction(saveNotificationDefault);
  const sendTest = useSendTestNotification();

  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-2">
      <div className="flex flex-wrap gap-2">
        <ActionLockTooltip locked={!canEdit}>
          <Button variant="ghost" disabled={!detail.isCustom} onClick={() => setConfirmingRestore(true)}>
            <RotateCcw data-icon="inline-start" aria-hidden="true" />
            Restaurar padrão
          </Button>
        </ActionLockTooltip>
        <ActionLockTooltip locked={!canEdit}>
          <Button
            variant="ghost"
            onClick={() =>
              saveDefault.mutate(detail.key, {
                onSuccess: () => toast.success("Salvo como padrão da empresa", { description: detail.name }),
                onError: (error) => toast.error("Não foi possível salvar o padrão", { description: error.message }),
              })
            }
          >
            <BookmarkCheck data-icon="inline-start" aria-hidden="true" />
            Salvar como padrão
          </Button>
        </ActionLockTooltip>
        {detail.part === "Message" ? (
          <ActionLockTooltip locked={!canTest}>
            <Button
              variant="ghost"
              disabled={sendTest.isPending}
              onClick={() =>
                sendTest.mutate(detail.key, {
                  onSuccess: () => toast.success("E-mail de teste enviado", { description: `Enviado para ${email}.` }),
                  onError: (error) => toast.error("Não foi possível enviar o teste", { description: error.message }),
                })
              }
            >
              <Send data-icon="inline-start" aria-hidden="true" />
              Enviar teste
            </Button>
          </ActionLockTooltip>
        ) : null}
      </div>
      <div className="flex gap-2">
        <Button variant="outline" onClick={onClose}>
          Fechar
        </Button>
        <ActionLockTooltip locked={!canEdit}>
          <Button type="submit" form={NOTIFICATION_FORM_ID}>
            Salvar
          </Button>
        </ActionLockTooltip>
      </div>
      <ConfirmDialog
        open={confirmingRestore}
        onOpenChange={setConfirmingRestore}
        title="Restaurar o texto padrão?"
        description={
          detail.companyDefaultContentHtml
            ? "O texto personalizado será descartado e volta o padrão salvo pela empresa."
            : "O texto personalizado será descartado e volta o padrão da plataforma."
        }
        confirmLabel="Restaurar"
        icon={RotateCcw}
        state={restore.isPending ? "loading" : "idle"}
        onConfirm={() =>
          restore.mutate(detail.key, {
            onSuccess: () => {
              toast.success("Texto padrão restaurado", { description: detail.name });
              setConfirmingRestore(false);
            },
            onError: (error) => toast.error("Não foi possível restaurar", { description: error.message }),
          })
        }
      />
    </div>
  );
}
