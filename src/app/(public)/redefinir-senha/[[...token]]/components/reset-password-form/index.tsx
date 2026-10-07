"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { AuthLinkInvalid } from "@/components/Modules/Core/Auth/auth-link-invalid";
import { NewPasswordForm } from "@/components/Modules/Core/Auth/new-password-form";
import { FORGOT_PASSWORD_HREF, INVALID_LINK_ERROR_CODE, LOGIN_HREF } from "@/constants/Modules/Core/Auth/auth";
import { useResetPassword } from "@/hooks/Modules/Core/Auth/use-reset-password";
import { getApiErrorCode } from "@/lib/Modules/Core/Api/get-api-error-code";

export function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();
  const { mutate: reset, isPending, error } = useResetPassword();

  if (getApiErrorCode(error) === INVALID_LINK_ERROR_CODE) {
    return (
      <AuthLinkInvalid
        message="Este link já foi usado ou venceu. Peça um novo link de troca de senha."
        actionHref={FORGOT_PASSWORD_HREF}
        actionLabel="Pedir novo link"
      />
    );
  }

  return (
    <NewPasswordForm
      submitLabel="Salvar nova senha"
      pendingLabel="Salvando..."
      pending={isPending}
      error={error?.message}
      onSubmit={(password) =>
        reset(
          { token, password },
          {
            onSuccess: () => {
              toast.success("Senha alterada", { description: "Entre com a sua nova senha." });
              router.replace(LOGIN_HREF);
            },
          },
        )
      }
    />
  );
}
