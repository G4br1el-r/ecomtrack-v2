"use client";

import { RefreshCw } from "lucide-react";

import { ErrorState } from "@/components/Modules/Core/DesignSystem/error-state";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useNotificationPreview } from "@/hooks/Modules/Administracao/Comunicacao/use-notification-preview";
import type { NotificationFormValues } from "@/schemas/Modules/Administracao/Comunicacao/notification-form-schema";

export function NotificationPreview({
  notificationKey,
  values,
  onRefresh,
}: {
  notificationKey: string;
  values: NotificationFormValues;
  onRefresh: () => void;
}) {
  const { data, isPending, isFetching, error } = useNotificationPreview(notificationKey, values);
  return (
    <section aria-label="Prévia" className="flex min-h-0 flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-medium text-sm">Prévia</h3>
        <Button type="button" variant="outline" size="sm" onClick={onRefresh} disabled={isFetching}>
          <RefreshCw data-icon="inline-start" aria-hidden="true" className={isFetching ? "animate-spin" : undefined} />
          Atualizar prévia
        </Button>
      </div>
      {error ? (
        <ErrorState title="Não foi possível montar a prévia" description={error.message} className="min-h-40" />
      ) : isPending ? (
        <Skeleton className="h-[60vh] w-full" />
      ) : (
        <>
          {data.subject ? (
            <p className="truncate text-sm">
              <span className="text-muted-foreground">Assunto: </span>
              {data.subject}
            </p>
          ) : null}
          <iframe
            title="Prévia do e-mail"
            srcDoc={data.html}
            sandbox=""
            className="h-[60vh] w-full rounded-md border bg-white"
          />
        </>
      )}
    </section>
  );
}
