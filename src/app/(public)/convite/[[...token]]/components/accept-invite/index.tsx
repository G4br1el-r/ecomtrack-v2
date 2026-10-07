"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { AuthLinkInvalid } from "@/components/Modules/Core/Auth/auth-link-invalid";
import { NewPasswordForm } from "@/components/Modules/Core/Auth/new-password-form";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { INVALID_LINK_ERROR_CODE, LOGIN_HREF } from "@/constants/Modules/Core/Auth/auth";
import { useAcceptInvite } from "@/hooks/Modules/Core/Auth/use-accept-invite";
import { useInvite } from "@/hooks/Modules/Core/Auth/use-invite";
import { getApiErrorCode } from "@/lib/Modules/Core/Api/get-api-error-code";
import { formatDisplayDate } from "@/lib/Modules/Core/DesignSystem/format-display-date";
import { formatDisplayTime } from "@/lib/Modules/Core/DesignSystem/format-display-time";

export function AcceptInvite({ token }: { token: string }) {
  const router = useRouter();
  const { data: invite, isPending, error: inviteError } = useInvite(token);
  const { mutate: accept, isPending: accepting, error } = useAcceptInvite();

  if (isPending) {
    return (
      <div className="space-y-3" role="status" aria-label="Conferindo o convite">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-full" />
      </div>
    );
  }

  const linkInvalid = [inviteError, error].some((cause) => getApiErrorCode(cause) === INVALID_LINK_ERROR_CODE);
  if (!invite || linkInvalid) {
    return (
      <AuthLinkInvalid
        message={
          linkInvalid
            ? "Este convite venceu ou já foi usado. Peça um novo convite a quem te convidou."
            : (inviteError?.message ?? "Não foi possível conferir o convite.")
        }
        actionHref={LOGIN_HREF}
        actionLabel="Ir para o login"
      />
    );
  }

  return (
    <NewPasswordForm
      submitLabel="Criar senha e entrar"
      pendingLabel="Criando senha..."
      pending={accepting}
      error={error?.message}
      onSubmit={(password) =>
        accept(
          { token, password },
          {
            onSuccess: () => {
              toast.success("Senha criada", { description: "Agora é só entrar com o seu e-mail e a nova senha." });
              router.replace(LOGIN_HREF);
            },
          },
        )
      }
    >
      <p className="text-sm">
        Olá, <strong className="font-medium">{invite.firstName}</strong>! Crie a sua senha para entrar
        {invite.companyName ? (
          <>
            {" "}
            na <strong className="font-medium">{invite.companyName}</strong>
          </>
        ) : null}
        . O convite vale até {formatDisplayDate(invite.expiresAt)} às {formatDisplayTime(invite.expiresAt)}.
      </p>
      <Field>
        <FieldLabel htmlFor="invite-email">E-mail</FieldLabel>
        <Input id="invite-email" value={invite.email} readOnly disabled autoComplete="username" />
      </Field>
    </NewPasswordForm>
  );
}
