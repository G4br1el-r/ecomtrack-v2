"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { DialogFooter } from "@/components/animate-ui/components/radix/dialog";
import { Switch } from "@/components/animate-ui/components/radix/switch";
import { FormErrorAlert } from "@/components/Modules/Core/DesignSystem/form-error-alert";
import { Button } from "@/components/ui/button";
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { useSaveProfile } from "@/hooks/Modules/Administracao/Usuarios/use-save-profile";
import {
  type ProfileFormValues,
  profileFormSchema,
} from "@/schemas/Modules/Administracao/Usuarios/profile-form-schema";
import type { Profile } from "@/schemas/Modules/Administracao/Usuarios/profile-schema";
import { useUsersPanelStore } from "@/store/Modules/Administracao/Usuarios/users-panel-store";

export function ProfileForm({ profile, onDone }: { profile: Profile | null; onDone: () => void }) {
  const openPanel = useUsersPanelStore((state) => state.open);
  const { mutate: save, isPending, error } = useSaveProfile();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: profile?.name ?? "",
      description: profile?.description ?? "",
      isDefault: profile?.isDefault ?? false,
    },
  });

  return (
    <form
      noValidate
      className="space-y-6"
      onSubmit={handleSubmit((values) =>
        save(
          { ...values, id: profile?.id, version: profile?.version },
          {
            onSuccess: (saved) => {
              if (profile) {
                toast.success("Perfil atualizado", { description: saved.name });
                onDone();
                return;
              }
              toast.success("Perfil criado", { description: "Agora escolha as permissões dele." });
              openPanel({ kind: "profile-permissions", profile: { ...saved, updatedAt: null } });
            },
          },
        ),
      )}
    >
      <FieldGroup>
        <FormErrorAlert message={error?.message} />
        <Field data-invalid={errors.name ? true : undefined}>
          <FieldLabel htmlFor="profile-name">Nome</FieldLabel>
          <Input id="profile-name" placeholder="Ex.: Atendimento" autoFocus {...register("name")} />
          <FieldError errors={[errors.name]} />
        </Field>
        <Field data-invalid={errors.description ? true : undefined}>
          <FieldLabel htmlFor="profile-description">Descrição</FieldLabel>
          <Textarea
            id="profile-description"
            rows={3}
            placeholder="Para que serve este perfil"
            {...register("description")}
          />
          <FieldError errors={[errors.description]} />
        </Field>
        <Controller
          control={control}
          name="isDefault"
          render={({ field }) => (
            <Field orientation="horizontal">
              <FieldContent>
                <FieldLabel htmlFor="profile-default">Sugerir nos convites</FieldLabel>
                <FieldDescription>Vem marcado ao convidar alguém. Só um perfil pode ser o padrão.</FieldDescription>
              </FieldContent>
              <Switch id="profile-default" checked={field.value} onCheckedChange={field.onChange} />
            </Field>
          )}
        />
      </FieldGroup>
      <DialogFooter>
        <Button type="button" variant="ghost" onClick={onDone}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? <Spinner data-icon="inline-start" /> : null}
          {isPending ? "Salvando..." : profile ? "Salvar" : "Criar perfil"}
        </Button>
      </DialogFooter>
    </form>
  );
}
