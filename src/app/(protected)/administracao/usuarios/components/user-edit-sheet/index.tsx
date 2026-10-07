"use client";

import { UserCog } from "lucide-react";

import { DetailSheet } from "@/components/Modules/Core/DesignSystem/detail-sheet";
import { ErrorState } from "@/components/Modules/Core/DesignSystem/error-state";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { USER_EDIT_FORM_ID } from "@/constants/Modules/Administracao/Usuarios/users";
import { useUser } from "@/hooks/Modules/Administracao/Usuarios/use-user";
import type { User } from "@/schemas/Modules/Administracao/Usuarios/user-schema";

import { UserEditForm } from "../user-edit-form";

export function UserEditSheet({ open, user, onClose }: { open: boolean; user: User | null; onClose: () => void }) {
  const detail = useUser(open && user ? user.id : null);

  return (
    <DetailSheet
      open={open}
      onOpenChange={(next) => {
        if (!next) onClose();
      }}
      icon={UserCog}
      title="Editar usuário"
      description={user?.email}
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" form={USER_EDIT_FORM_ID} disabled={!detail.data}>
            Salvar
          </Button>
        </>
      }
    >
      {detail.isError ? (
        <ErrorState onRetry={() => detail.refetch()} className="min-h-40" />
      ) : detail.data ? (
        <UserEditForm key={detail.data.id} user={detail.data} onSaved={onClose} />
      ) : (
        <div className="space-y-3" role="status" aria-label="Carregando o usuário">
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
        </div>
      )}
    </DetailSheet>
  );
}
