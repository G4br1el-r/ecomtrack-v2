import { Settings2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { AiTask } from "@/schemas/Modules/Administracao/AgentesIA/ai-task-schema";

export function AiTaskCard({
  task,
  configured,
  onConfigure,
}: {
  task: AiTask;
  configured: boolean;
  onConfigure: () => void;
}) {
  return (
    <Card size="sm" className="transition-shadow hover:shadow-md">
      <CardHeader>
        <CardTitle>{task.name}</CardTitle>
        <CardDescription className="line-clamp-2">{task.description}</CardDescription>
        <CardAction>
          <Badge variant={configured ? "success" : "outline"}>{configured ? "Configurada" : "Padrão"}</Badge>
        </CardAction>
      </CardHeader>
      <CardFooter className="justify-between gap-2">
        <span className="text-xs text-muted-foreground">
          {task.variables.length === 1 ? "1 variável" : `${task.variables.length} variáveis`}
        </span>
        <Button variant="outline" size="sm" onClick={onConfigure}>
          <Settings2 data-icon="inline-start" aria-hidden="true" />
          Configurar
        </Button>
      </CardFooter>
    </Card>
  );
}
