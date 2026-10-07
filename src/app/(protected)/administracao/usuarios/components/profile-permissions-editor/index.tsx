"use client";

import { useState } from "react";
import { toast } from "sonner";

import type { PermissionSelection } from "@/@types/Modules/Core/Access/permission-selection";
import { PermissionTree } from "@/components/Modules/Core/Access/permission-tree";
import { PROFILE_PERMISSIONS_FORM_ID } from "@/constants/Modules/Administracao/Usuarios/users";
import { useUpdateProfilePermissions } from "@/hooks/Modules/Administracao/Usuarios/use-update-profile-permissions";
import type { ProfileDetail } from "@/schemas/Modules/Administracao/Usuarios/profile-detail-schema";
import type { CatalogPage } from "@/schemas/Modules/Core/Access/catalog-page-schema";

export function ProfilePermissionsEditor({
  profile,
  catalog,
  onSaved,
}: {
  profile: ProfileDetail;
  catalog: CatalogPage[];
  onSaved: () => void;
}) {
  const [selection, setSelection] = useState<PermissionSelection>({
    pages: profile.pages,
    components: profile.components,
  });
  const { mutate: save } = useUpdateProfilePermissions();

  return (
    <form
      id={PROFILE_PERMISSIONS_FORM_ID}
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        save(
          { id: profile.id, version: profile.version, ...selection },
          {
            onSuccess: (saved) => {
              toast.success("Permissões salvas", {
                description: `${saved.name}: ${saved.pages.length} páginas e ${saved.components.length} ações.`,
              });
              onSaved();
            },
            onError: (error) => toast.error("Não foi possível salvar as permissões", { description: error.message }),
          },
        );
      }}
    >
      <p className="text-muted-foreground text-sm" aria-live="polite">
        {selection.pages.length} páginas e {selection.components.length} ações marcadas · versão {profile.version}
      </p>
      <PermissionTree catalog={catalog} value={selection} onChange={setSelection} />
    </form>
  );
}
