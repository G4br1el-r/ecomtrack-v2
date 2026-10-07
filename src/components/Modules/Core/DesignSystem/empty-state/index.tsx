import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { cn } from "@/lib/utils";

import { EmptyIllustration } from "../empty-illustration";

export function EmptyState({
  illustration = <EmptyIllustration />,
  title = "Nenhum resultado encontrado",
  description = "Ajuste os filtros ou adicione um novo item para começar.",
  action,
  className,
}: {
  illustration?: React.ReactNode;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <Empty className={cn("min-h-64", className)}>
      <EmptyHeader>
        <EmptyMedia>{illustration}</EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      {action ? <EmptyContent>{action}</EmptyContent> : null}
    </Empty>
  );
}
