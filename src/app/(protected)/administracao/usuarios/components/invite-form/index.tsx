"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { DialogFooter } from "@/components/animate-ui/components/radix/dialog";
import { FormErrorAlert } from "@/components/Modules/Core/DesignSystem/form-error-alert";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useCreateInvite } from "@/hooks/Modules/Administracao/Usuarios/use-create-invite";
import { type InviteFormValues, inviteFormSchema } from "@/schemas/Modules/Administracao/Usuarios/invite-form-schema";

import { ProfileCombobox } from "../profile-combobox";

export function InviteForm({ defaultProfileId, onDone }: { defaultProfileId: string; onDone: () => void }) {
  const { mutate: invite, isPending, error } = useCreateInvite();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InviteFormValues>({
    resolver: zodResolver(inviteFormSchema),
    defaultValues: { firstName: "", lastName: "", email: "", profileId: defaultProfileId },
  });

  return (
    <form
      noValidate
      className="space-y-6"
      onSubmit={handleSubmit((values) =>
        invite(values, {
          onSuccess: (created) => {
            toast.success("Convite enviado", { description: `Enviado para ${created.email}.` });
            onDone();
          },
        }),
      )}
    >
      <FieldGroup>
        <FormErrorAlert message={error?.message} />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field data-invalid={errors.firstName ? true : undefined}>
            <FieldLabel htmlFor="invite-first-name">Nome</FieldLabel>
            <Input id="invite-first-name" autoFocus {...register("firstName")} />
            <FieldError errors={[errors.firstName]} />
          </Field>
          <Field data-invalid={errors.lastName ? true : undefined}>
            <FieldLabel htmlFor="invite-last-name">Sobrenome</FieldLabel>
            <Input id="invite-last-name" {...register("lastName")} />
            <FieldError errors={[errors.lastName]} />
          </Field>
        </div>
        <Field data-invalid={errors.email ? true : undefined}>
          <FieldLabel htmlFor="invite-email">E-mail</FieldLabel>
          <Input id="invite-email" type="email" placeholder="nome@empresa.com" {...register("email")} />
          <FieldError errors={[errors.email]} />
        </Field>
        <Field data-invalid={errors.profileId ? true : undefined}>
          <FieldLabel htmlFor="invite-profile">Perfil</FieldLabel>
          <Controller
            control={control}
            name="profileId"
            render={({ field }) => (
              <ProfileCombobox
                id="invite-profile"
                value={field.value}
                className="h-9 w-full"
                onValueChange={(profileId) => field.onChange(profileId)}
              />
            )}
          />
          <FieldError errors={[errors.profileId]} />
        </Field>
      </FieldGroup>
      <DialogFooter>
        <Button type="button" variant="ghost" onClick={onDone}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? <Spinner data-icon="inline-start" /> : <Send data-icon="inline-start" aria-hidden="true" />}
          {isPending ? "Enviando..." : "Enviar convite"}
        </Button>
      </DialogFooter>
    </form>
  );
}
