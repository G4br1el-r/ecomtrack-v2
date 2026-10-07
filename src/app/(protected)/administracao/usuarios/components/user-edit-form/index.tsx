"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { DetailRow } from "@/components/Modules/Core/DesignSystem/detail-row";
import { DetailSection } from "@/components/Modules/Core/DesignSystem/detail-section";
import { Badge } from "@/components/ui/badge";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { USER_EDIT_FORM_ID, USER_STATUS_BADGE } from "@/constants/Modules/Administracao/Usuarios/users";
import { useUpdateUser } from "@/hooks/Modules/Administracao/Usuarios/use-update-user";
import { formatDisplayDate } from "@/lib/Modules/Core/DesignSystem/format-display-date";
import { type UserFormValues, userFormSchema } from "@/schemas/Modules/Administracao/Usuarios/user-form-schema";
import type { User } from "@/schemas/Modules/Administracao/Usuarios/user-schema";
import { useSessionStore } from "@/store/Modules/Core/Auth/session-store";

import { ProfileCombobox } from "../profile-combobox";

export function UserEditForm({ user, onSaved }: { user: User; onSaved: () => void }) {
  const isSelf = useSessionStore((state) => state.user?.id === user.id);
  const status = USER_STATUS_BADGE[user.status];
  const { mutate: save } = useUpdateUser({
    onSuccess: (saved) => toast.success("Usuário atualizado", { description: `${saved.firstName} ${saved.lastName}` }),
    onError: (error) => toast.error("Não foi possível salvar o usuário", { description: error.message }),
  });
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: { firstName: user.firstName, lastName: user.lastName, profileId: user.profileId ?? "" },
  });
  const [profileName, setProfileName] = useState(user.profileName);

  return (
    <form
      id={USER_EDIT_FORM_ID}
      noValidate
      onSubmit={handleSubmit((values) => {
        save({ ...values, id: user.id, profileName });
        onSaved();
      })}
      className="space-y-7"
    >
      <FieldGroup>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field data-invalid={errors.firstName ? true : undefined}>
            <FieldLabel htmlFor="user-first-name">Nome</FieldLabel>
            <Input id="user-first-name" {...register("firstName")} />
            <FieldError errors={[errors.firstName]} />
          </Field>
          <Field data-invalid={errors.lastName ? true : undefined}>
            <FieldLabel htmlFor="user-last-name">Sobrenome</FieldLabel>
            <Input id="user-last-name" {...register("lastName")} />
            <FieldError errors={[errors.lastName]} />
          </Field>
        </div>
        <Field data-invalid={errors.profileId ? true : undefined}>
          <FieldLabel htmlFor="user-profile">Perfil</FieldLabel>
          <Controller
            control={control}
            name="profileId"
            render={({ field }) =>
              isSelf ? (
                <Input id="user-profile" value={user.profileName ?? ""} disabled readOnly />
              ) : (
                <ProfileCombobox
                  id="user-profile"
                  value={field.value}
                  className="h-9 w-full"
                  onValueChange={(profileId, profileName) => {
                    field.onChange(profileId);
                    setProfileName(profileName);
                  }}
                />
              )
            }
          />
          <FieldDescription>
            {isSelf
              ? "Você não pode trocar o seu próprio perfil."
              : "O novo perfil vale a partir da próxima renovação de sessão do usuário (até 15 minutos)."}
          </FieldDescription>
          <FieldError errors={[errors.profileId]} />
        </Field>
      </FieldGroup>
      <DetailSection title="Informações">
        <DetailRow label="Situação" value={<Badge variant={status.tone}>{status.label}</Badge>} />
        <DetailRow label="Criado em" value={formatDisplayDate(user.createdAt)} />
        <DetailRow
          label="Último login"
          value={user.lastLoginAt ? formatDisplayDate(user.lastLoginAt) : "Nunca entrou"}
        />
        <DetailRow label="Convidado por" value={user.invitedByName ?? "—"} />
      </DetailSection>
    </form>
  );
}
