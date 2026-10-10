"use client";

import { Eye, History, KeyRound, Pencil, UserCheck, UserX } from "lucide-react";
import { toast } from "sonner";
import { DropdownMenuItem, DropdownMenuSeparator } from "@/components/animate-ui/components/radix/dropdown-menu";
import { ActionLockedTag } from "@/components/Modules/Core/DesignSystem/action-locked-tag";
import { RowActionsMenu } from "@/components/Modules/Core/DesignSystem/row-actions-menu";
import { API_ENDPOINTS } from "@/constants/Modules/Core/Api/api-endpoints";
import { useResetUserPassword } from "@/hooks/Modules/Administracao/Usuarios/use-reset-user-password";
import { useSetUserActive } from "@/hooks/Modules/Administracao/Usuarios/use-set-user-active";
import { useCan } from "@/hooks/Modules/Core/Access/use-can";
import { useViewAs } from "@/hooks/Modules/Core/Access/use-view-as";
import type { User } from "@/schemas/Modules/Administracao/Usuarios/user-schema";
import { viewAsUser } from "@/services/Modules/Administracao/Usuarios/view-as-user";
import { useUsersPanelStore } from "@/store/Modules/Administracao/Usuarios/users-panel-store";
import { useSessionStore } from "@/store/Modules/Core/Auth/session-store";

export function UserRowActions({ user }: { user: User }) {
  const { can } = useCan(API_ENDPOINTS.users.update.page);
  const open = useUsersPanelStore((state) => state.open);
  const currentUserId = useSessionStore((state) => state.user?.id);
  const { enter } = useViewAs();
  const name = `${user.firstName} ${user.lastName}`;
  const isSelf = user.id === currentUserId;
  const { mutate: resetPassword } = useResetUserPassword();
  const { mutate: setActive } = useSetUserActive({
    onSuccess: ({ id, active }) =>
      toast.success(active ? "Usuário reativado" : "Usuário desativado", {
        description: active ? name : `${name} perdeu o acesso.`,
        action: active ? undefined : { label: "Desfazer", onClick: () => setActive({ id, active: true }) },
      }),
    onError: (error, { active }) =>
      toast.error(active ? "Não foi possível reativar" : "Não foi possível desativar", { description: error.message }),
  });

  const canEdit = can(API_ENDPOINTS.users.update.component);
  const canToggle = can(API_ENDPOINTS.users.deactivate.component);
  const canReset = can(API_ENDPOINTS.users.resetPassword.component);
  const canViewAs = can(API_ENDPOINTS.users.viewAs.component);
  const canLogs = can(API_ENDPOINTS.users.activity.component);
  const invited = user.status === "Invited";

  return (
    <RowActionsMenu label={`Ações de ${name}`}>
      <DropdownMenuItem disabled={!canEdit} onSelect={() => open({ kind: "edit-user", user })}>
        <Pencil aria-hidden="true" />
        Editar
        {canEdit ? null : <ActionLockedTag />}
      </DropdownMenuItem>
      <DropdownMenuItem disabled={!canLogs} onSelect={() => open({ kind: "activity", user })}>
        <History aria-hidden="true" />
        Log de atividades
        {canLogs ? null : <ActionLockedTag />}
      </DropdownMenuItem>
      <DropdownMenuItem
        disabled={!canViewAs || isSelf || user.status !== "Active"}
        onSelect={() =>
          enter.mutate(
            { label: name, request: () => viewAsUser(user.id) },
            {
              onSuccess: () => toast.success(`Visualizando como ${name}`, { description: "Somente leitura." }),
              onError: (error) =>
                toast.error("Não foi possível visualizar como este usuário", { description: error.message }),
            },
          )
        }
      >
        <Eye aria-hidden="true" />
        Visualizar como
        {canViewAs ? null : <ActionLockedTag />}
      </DropdownMenuItem>
      <DropdownMenuItem
        disabled={!canReset || user.status !== "Active"}
        onSelect={() =>
          resetPassword(user.id, {
            onSuccess: () =>
              toast.success("Link de troca de senha enviado", { description: `Enviado para ${user.email}.` }),
            onError: (error) => toast.error("Não foi possível enviar o link", { description: error.message }),
          })
        }
      >
        <KeyRound aria-hidden="true" />
        Redefinir senha
        {canReset ? null : <ActionLockedTag />}
      </DropdownMenuItem>
      {invited ? null : (
        <>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant={user.status === "Active" ? "destructive" : "default"}
            disabled={!canToggle || isSelf}
            onSelect={() => setActive({ id: user.id, active: user.status !== "Active" })}
          >
            {user.status === "Active" ? <UserX aria-hidden="true" /> : <UserCheck aria-hidden="true" />}
            {user.status === "Active" ? "Desativar" : "Reativar"}
            {canToggle ? null : <ActionLockedTag />}
          </DropdownMenuItem>
        </>
      )}
    </RowActionsMenu>
  );
}
