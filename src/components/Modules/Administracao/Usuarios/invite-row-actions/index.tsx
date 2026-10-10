"use client";

import { Link2, Send, XCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { DropdownMenuItem, DropdownMenuSeparator } from "@/components/animate-ui/components/radix/dropdown-menu";
import { ActionLockedTag } from "@/components/Modules/Core/DesignSystem/action-locked-tag";
import { ConfirmDialog } from "@/components/Modules/Core/DesignSystem/confirm-dialog";
import { RowActionsMenu } from "@/components/Modules/Core/DesignSystem/row-actions-menu";
import { API_ENDPOINTS } from "@/constants/Modules/Core/Api/api-endpoints";
import { useCancelInvite } from "@/hooks/Modules/Administracao/Usuarios/use-cancel-invite";
import { useCopyInviteLink } from "@/hooks/Modules/Administracao/Usuarios/use-copy-invite-link";
import { useResendInvite } from "@/hooks/Modules/Administracao/Usuarios/use-resend-invite";
import { useCan } from "@/hooks/Modules/Core/Access/use-can";
import type { Invite } from "@/schemas/Modules/Administracao/Usuarios/invite-schema";

export function InviteRowActions({ invite }: { invite: Invite }) {
  const { can } = useCan(API_ENDPOINTS.invites.resend.page);
  const [confirming, setConfirming] = useState(false);
  const name = `${invite.firstName} ${invite.lastName}`;
  const { mutate: resend } = useResendInvite({
    onSuccess: () => toast.success("Convite reenviado", { description: `Novo link enviado para ${invite.email}.` }),
    onError: (error) => toast.error("Não foi possível reenviar o convite", { description: error.message }),
  });
  const { mutate: copyLink } = useCopyInviteLink();
  const { mutate: cancel, isPending: cancelling } = useCancelInvite({
    onSuccess: () => toast.success("Convite cancelado", { description: name }),
    onError: (error) => toast.error("Não foi possível cancelar o convite", { description: error.message }),
  });

  const canResend = can(API_ENDPOINTS.invites.resend.component);
  const canCopy = can(API_ENDPOINTS.invites.link.component);
  const canCancel = can(API_ENDPOINTS.invites.cancel.component);
  const accepted = invite.status === "Accepted";

  if (accepted) return null;

  return (
    <>
      <RowActionsMenu label={`Ações do convite de ${name}`}>
        <DropdownMenuItem disabled={!canResend} onSelect={() => resend(invite.userId)}>
          <Send aria-hidden="true" />
          Reenviar convite
          {canResend ? null : <ActionLockedTag />}
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={!canCopy || invite.status !== "Pending"}
          onSelect={() =>
            copyLink(invite.userId, {
              onSuccess: () =>
                toast.success("Link copiado", { description: "Envie para o convidado por outro canal." }),
              onError: (error) => toast.error("Não foi possível copiar o link", { description: error.message }),
            })
          }
        >
          <Link2 aria-hidden="true" />
          Copiar link
          {canCopy ? null : <ActionLockedTag />}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" disabled={!canCancel} onSelect={() => setConfirming(true)}>
          <XCircle aria-hidden="true" />
          Cancelar convite
          {canCancel ? null : <ActionLockedTag />}
        </DropdownMenuItem>
      </RowActionsMenu>
      <ConfirmDialog
        open={confirming}
        onOpenChange={setConfirming}
        title="Cancelar este convite?"
        description={`${name} não vai mais conseguir entrar com o link enviado. Para convidar de novo, envie outro convite.`}
        confirmLabel="Cancelar convite"
        cancelLabel="Voltar"
        destructive
        icon={XCircle}
        state={cancelling ? "loading" : "idle"}
        onConfirm={() => {
          cancel(invite.userId);
          setConfirming(false);
        }}
      />
    </>
  );
}
