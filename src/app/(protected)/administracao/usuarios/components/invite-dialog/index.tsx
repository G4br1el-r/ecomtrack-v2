"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/animate-ui/components/radix/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { ALL_ITEMS_FILTERS } from "@/constants/Modules/Core/Api/http";
import { useProfiles } from "@/hooks/Modules/Administracao/Usuarios/use-profiles";

import { InviteForm } from "../invite-form";

export function InviteDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { data: profiles, isPending } = useProfiles(ALL_ITEMS_FILTERS);
  const defaultProfile = profiles?.items.find((profile) => profile.isDefault);

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) onClose();
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Convidar usuário</DialogTitle>
          <DialogDescription>
            A pessoa recebe um link por e-mail para criar a senha. O link vale por 72 horas.
          </DialogDescription>
        </DialogHeader>
        {isPending ? (
          <div className="space-y-3" role="status" aria-label="Carregando perfis">
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
          </div>
        ) : open ? (
          <InviteForm defaultProfileId={defaultProfile?.id ?? ""} onDone={onClose} />
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
