import { RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { cn } from "@/lib/utils";

import { ErrorIllustration } from "../error-illustration";

export function ErrorState({
  title = "Não foi possível carregar",
  description = "Tente novamente. Seus dados permanecem preservados.",
  onRetry,
  className,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}) {
  return (
    <Empty className={cn("min-h-64", className)}>
      <EmptyHeader>
        <EmptyMedia>
          <ErrorIllustration />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      {onRetry ? (
        <EmptyContent>
          <Button variant="outline" size="sm" onClick={onRetry}>
            <RotateCcw data-icon="inline-start" aria-hidden="true" />
            Tentar novamente
          </Button>
        </EmptyContent>
      ) : null}
    </Empty>
  );
}
