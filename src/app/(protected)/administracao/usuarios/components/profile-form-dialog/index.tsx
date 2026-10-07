"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/animate-ui/components/radix/dialog";
import type { Profile } from "@/schemas/Modules/Administracao/Usuarios/profile-schema";

import { ProfileForm } from "../profile-form";

export function ProfileFormDialog({
  open,
  profile,
  onClose,
}: {
  open: boolean;
  profile: Profile | null;
  onClose: () => void;
}) {
  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) onClose();
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{profile ? "Editar perfil" : "Novo perfil"}</DialogTitle>
          <DialogDescription>
            {profile
              ? "Altere o nome, a descrição ou se este é o perfil sugerido nos convites."
              : "Depois de criar, escolha as páginas e ações que o perfil pode usar."}
          </DialogDescription>
        </DialogHeader>
        {open ? <ProfileForm key={profile?.id ?? "novo"} profile={profile} onDone={onClose} /> : null}
      </DialogContent>
    </Dialog>
  );
}
