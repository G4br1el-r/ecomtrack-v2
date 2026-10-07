"use client";

import { ShieldCheck } from "lucide-react";

import { DetailSheet } from "@/components/Modules/Core/DesignSystem/detail-sheet";
import { ErrorState } from "@/components/Modules/Core/DesignSystem/error-state";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PROFILE_PERMISSIONS_FORM_ID } from "@/constants/Modules/Administracao/Usuarios/users";
import { useProfile } from "@/hooks/Modules/Administracao/Usuarios/use-profile";
import { usePermissionCatalog } from "@/hooks/Modules/Core/Access/use-permission-catalog";
import type { Profile } from "@/schemas/Modules/Administracao/Usuarios/profile-schema";

import { ProfilePermissionsEditor } from "../profile-permissions-editor";

export function ProfilePermissionsSheet({
  open,
  profile,
  onClose,
}: {
  open: boolean;
  profile: Profile | null;
  onClose: () => void;
}) {
  const detail = useProfile(open && profile ? profile.id : null);
  const catalog = usePermissionCatalog(open);
  const ready = detail.data && catalog.data;

  return (
    <DetailSheet
      open={open}
      onOpenChange={(next) => {
        if (!next) onClose();
      }}
      icon={ShieldCheck}
      title={profile ? `Permissões: ${profile.name}` : "Permissões"}
      description="Marque as páginas e as ações que este perfil pode usar. Componente só vale com a página marcada."
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" form={PROFILE_PERMISSIONS_FORM_ID} disabled={!ready}>
            Salvar permissões
          </Button>
        </>
      }
    >
      {detail.isError || catalog.isError ? (
        <ErrorState
          onRetry={() => {
            detail.refetch();
            catalog.refetch();
          }}
        />
      ) : ready ? (
        <ProfilePermissionsEditor
          key={`${detail.data.id}-${detail.data.version}`}
          profile={detail.data}
          catalog={catalog.data}
          onSaved={onClose}
        />
      ) : (
        <div className="space-y-3" role="status" aria-label="Carregando permissões">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
      )}
    </DetailSheet>
  );
}
