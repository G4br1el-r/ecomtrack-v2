import { Lock } from "lucide-react";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/animate-ui/components/radix/tooltip";

export function ActionLockTooltip({
  locked,
  reason = "Seu perfil não tem permissão para esta ação.",
  children,
}: {
  locked: boolean;
  reason?: string;
  children: React.ReactElement;
}) {
  if (!locked) return children;
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="inline-flex cursor-not-allowed">
          <span className="pointer-events-none relative inline-flex opacity-60">
            {children}
            <span className="absolute -top-1.5 -right-1.5 grid size-4 place-items-center rounded-full border bg-background text-muted-foreground shadow-xs">
              <Lock className="size-2.5" aria-hidden="true" />
            </span>
          </span>
          <span className="sr-only">{reason}</span>
        </span>
      </TooltipTrigger>
      <TooltipContent>{reason}</TooltipContent>
    </Tooltip>
  );
}
