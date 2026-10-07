"use client";

import { useUsersPanelStore } from "@/store/Modules/Administracao/Usuarios/users-panel-store";

import { InviteDialog } from "../invite-dialog";
import { ProfileFormDialog } from "../profile-form-dialog";
import { ProfilePermissionsSheet } from "../profile-permissions-sheet";
import { UserActivitySheet } from "../user-activity-sheet";
import { UserEditSheet } from "../user-edit-sheet";

export function UsersPanels() {
  const panel = useUsersPanelStore((state) => state.panel);
  const isOpen = useUsersPanelStore((state) => state.isOpen);
  const close = useUsersPanelStore((state) => state.close);

  return (
    <>
      <UserEditSheet
        open={isOpen && panel?.kind === "edit-user"}
        user={panel?.kind === "edit-user" ? panel.user : null}
        onClose={close}
      />
      <UserActivitySheet
        open={isOpen && panel?.kind === "activity"}
        user={panel?.kind === "activity" ? panel.user : null}
        onClose={close}
      />
      <InviteDialog open={isOpen && panel?.kind === "invite"} onClose={close} />
      <ProfileFormDialog
        open={isOpen && panel?.kind === "profile-form"}
        profile={panel?.kind === "profile-form" ? panel.profile : null}
        onClose={close}
      />
      <ProfilePermissionsSheet
        open={isOpen && panel?.kind === "profile-permissions"}
        profile={panel?.kind === "profile-permissions" ? panel.profile : null}
        onClose={close}
      />
    </>
  );
}
