"use client";

import { redirect, usePathname } from "next/navigation";

import { ErrorState } from "@/components/Modules/Core/DesignSystem/error-state";
import { Spinner } from "@/components/ui/spinner";
import { useSession } from "@/hooks/Modules/Core/Auth/use-session";
import { getLoginHref } from "@/lib/Modules/Core/Auth/get-login-href";

export function SessionGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data, isPending, isError, refetch } = useSession();

  if (isPending) {
    return (
      <div className="grid min-h-dvh place-items-center text-muted-foreground">
        <Spinner className="size-6" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="grid min-h-dvh place-items-center p-4">
        <ErrorState
          title="Não foi possível abrir sua sessão"
          description="O servidor não respondeu. Tente de novo em alguns instantes."
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  if (!data) return redirect(getLoginHref(pathname));

  return children;
}
