"use client";

import { Braces } from "lucide-react";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/animate-ui/components/radix/tooltip";
import { Button } from "@/components/ui/button";
import type { NotificationDetail } from "@/schemas/Modules/Administracao/Comunicacao/notification-detail-schema";

export function VariableChips({
  variables,
  onInsert,
}: {
  variables: NotificationDetail["variables"];
  onInsert: (token: string) => void;
}) {
  if (variables.length === 0) return null;
  return (
    <fieldset className="flex min-w-0 flex-wrap gap-1.5">
      <legend className="sr-only">Variáveis disponíveis</legend>
      {variables.map((variable) => (
        <Tooltip key={variable.name}>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="outline"
              size="xs"
              className="font-mono"
              onClick={() => onInsert(`{{${variable.name}}}`)}
            >
              <Braces data-icon="inline-start" aria-hidden="true" />
              {variable.name}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {variable.description} · Ex.: {variable.example}
          </TooltipContent>
        </Tooltip>
      ))}
    </fieldset>
  );
}
