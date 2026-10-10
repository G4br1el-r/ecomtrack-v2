"use client";

import { Eye, Pencil, ShieldCheck, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { DropdownMenuItem, DropdownMenuSeparator } from "@/components/animate-ui/components/radix/dropdown-menu";
import { ActionLockedTag } from "@/components/Modules/Core/DesignSystem/action-locked-tag";
import { ConfirmDialog } from "@/components/Modules/Core/DesignSystem/confirm-dialog";
import { RowActionsMenu } from "@/components/Modules/Core/DesignSystem/row-actions-menu";
import { API_ENDPOINTS } from "@/constants/Modules/Core/Api/api-endpoints";
import { useRemoveProfile } from "@/hooks/Modules/Administracao/Usuarios/use-remove-profile";
import { useCan } from "@/hooks/Modules/Core/Access/use-can";
import { useViewAs } from "@/hooks/Modules/Core/Access/use-view-as";
import type { Profile } from "@/schemas/Modules/Administracao/Usuarios/profile-schema";
import { viewAsProfile } from "@/services/Modules/Administracao/Usuarios/view-as-profile";
import { useUsersPanelStore } from "@/store/Modules/Administracao/Usuarios/users-panel-store";

export function ProfileRowActions({ profile }: { profile: Profile }) {
  const { can } = useCan(API_ENDPOINTS.profiles.update.page);
  const open = useUsersPanelStore((state) => state.open);
  const { enter } = useViewAs();
  const [confirming, setConfirming] = useState(false);
  const { mutate: remove, isPending: removing } = useRemoveProfile({
    onSuccess: () => toast.success("Perfil removido", { description: profile.name }),
    onError: (error) => toast.error("Não foi possível remover o perfil", { description: error.message }),
  });

  const canEdit = can(API_ENDPOINTS.profiles.update.component);
  const canPermissions = can(API_ENDPOINTS.profiles.updatePermissions.component);
  const canRemove = can(API_ENDPOINTS.profiles.remove.component);
  const canViewAs = can(API_ENDPOINTS.profiles.viewAs.component);
  const platformProfile = profile.kind !== "Company";

  return (
    <>
      <RowActionsMenu label={`Ações do perfil ${profile.name}`}>
        <DropdownMenuItem
          disabled={!canEdit || platformProfile}
          onSelect={() => open({ kind: "profile-form", profile })}
        >
          <Pencil aria-hidden="true" />
          Editar
          {canEdit ? null : <ActionLockedTag />}
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={!canPermissions || platformProfile}
          onSelect={() => open({ kind: "profile-permissions", profile })}
        >
          <ShieldCheck aria-hidden="true" />
          Permissões
          {canPermissions ? null : <ActionLockedTag />}
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={!canViewAs}
          onSelect={() =>
            enter.mutate(
              { label: `perfil ${profile.name}`, request: () => viewAsProfile(profile.id) },
              {
                onSuccess: () =>
                  toast.success(`Visualizando como o perfil ${profile.name}`, { description: "Somente leitura." }),
                onError: (error) =>
                  toast.error("Não foi possível visualizar como este perfil", { description: error.message }),
              },
            )
          }
        >
          <Eye aria-hidden="true" />
          Visualizar como
          {canViewAs ? null : <ActionLockedTag />}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          disabled={!canRemove || platformProfile}
          onSelect={() => setConfirming(true)}
        >
          <Trash2 aria-hidden="true" />
          Remover perfil
          {canRemove ? null : <ActionLockedTag />}
        </DropdownMenuItem>
      </RowActionsMenu>
      <ConfirmDialog
        open={confirming}
        onOpenChange={setConfirming}
        title={`Remover o perfil ${profile.name}?`}
        description={
          profile.userCount > 0
            ? `${profile.userCount} usuário(s) usam este perfil. Troque o perfil deles antes de remover.`
            : "O perfil e as permissões dele serão apagados. Essa ação não pode ser desfeita."
        }
        confirmLabel="Remover perfil"
        destructive
        state={removing ? "loading" : "idle"}
        onConfirm={() => {
          remove(profile.id);
          setConfirming(false);
        }}
      />
    </>
  );
}
