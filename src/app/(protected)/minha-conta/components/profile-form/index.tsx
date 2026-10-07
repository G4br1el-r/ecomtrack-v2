"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

import { FormErrorAlert } from "@/components/Modules/Core/DesignSystem/form-error-alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useUpdateMe } from "@/hooks/Modules/Core/Conta/use-update-me";
import { getInitials } from "@/lib/Modules/Core/Shell/get-initials";
import type { CurrentUser } from "@/schemas/Modules/Core/Auth/current-user-schema";
import { type UpdateMeFormValues, updateMeSchema } from "@/schemas/Modules/Core/Conta/update-me-schema";

export function ProfileForm({ me }: { me: CurrentUser }) {
  const { mutate: save, isPending, error } = useUpdateMe();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty },
  } = useForm<UpdateMeFormValues>({
    resolver: zodResolver(updateMeSchema),
    defaultValues: { firstName: me.firstName, lastName: me.lastName, avatarUrl: me.avatarUrl ?? "" },
  });
  const [firstName, lastName, avatarUrl] = useWatch({ control, name: ["firstName", "lastName", "avatarUrl"] });

  return (
    <Card>
      <form
        noValidate
        onSubmit={handleSubmit((values) =>
          save(values, {
            onSuccess: (user) => {
              reset({ firstName: user.firstName, lastName: user.lastName, avatarUrl: user.avatarUrl ?? "" });
              toast.success("Perfil atualizado");
            },
            onError: (cause) => toast.error("Não foi possível salvar o perfil", { description: cause.message }),
          }),
        )}
      >
        <CardHeader>
          <CardTitle>Meu perfil</CardTitle>
          <CardDescription>O e-mail e o perfil de acesso só podem ser trocados por um gestor.</CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <FormErrorAlert message={error?.message} />
            <div className="flex items-center gap-4">
              <Avatar className="size-14 rounded-lg">
                {avatarUrl ? <AvatarImage src={avatarUrl} alt="" /> : null}
                <AvatarFallback className="rounded-lg">{getInitials(`${firstName} ${lastName}`)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 text-sm">
                <p className="truncate font-medium">{me.email}</p>
                <p className="truncate text-muted-foreground">{me.profileName ?? "Sem perfil"}</p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field data-invalid={errors.firstName ? true : undefined}>
                <FieldLabel htmlFor="me-first-name">Nome</FieldLabel>
                <Input
                  id="me-first-name"
                  autoComplete="given-name"
                  disabled={me.isViewingAs}
                  {...register("firstName")}
                />
                <FieldError errors={[errors.firstName]} />
              </Field>
              <Field data-invalid={errors.lastName ? true : undefined}>
                <FieldLabel htmlFor="me-last-name">Sobrenome</FieldLabel>
                <Input
                  id="me-last-name"
                  autoComplete="family-name"
                  disabled={me.isViewingAs}
                  {...register("lastName")}
                />
                <FieldError errors={[errors.lastName]} />
              </Field>
            </div>
            <Field data-invalid={errors.avatarUrl ? true : undefined}>
              <FieldLabel htmlFor="me-avatar">Foto (endereço da imagem)</FieldLabel>
              <Input
                id="me-avatar"
                type="url"
                placeholder="https://"
                disabled={me.isViewingAs}
                {...register("avatarUrl")}
              />
              <FieldDescription>Deixe em branco para usar as suas iniciais.</FieldDescription>
              <FieldError errors={[errors.avatarUrl]} />
            </Field>
          </FieldGroup>
        </CardContent>
        <CardFooter className="justify-end gap-2">
          <Button type="button" variant="ghost" disabled={!isDirty || isPending} onClick={() => reset()}>
            Descartar
          </Button>
          <Button type="submit" disabled={!isDirty || isPending || me.isViewingAs}>
            {isPending ? <Spinner data-icon="inline-start" /> : null}
            {isPending ? "Salvando..." : "Salvar"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
