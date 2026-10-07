"use client";

import { Plug } from "lucide-react";

import { ActionLockTooltip } from "@/components/Modules/Core/DesignSystem/action-lock-tooltip";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { IntegrationProvider } from "@/schemas/Modules/Administracao/Integracoes/integration-provider-schema";

export function ProviderCard({
  provider,
  connections,
  canConnect,
  onConnect,
}: {
  provider: IntegrationProvider;
  connections: number;
  canConnect: boolean;
  onConnect: () => void;
}) {
  const full = connections > 0 && !provider.allowsMultiple;
  return (
    <Card size="sm" className="transition-shadow hover:shadow-md">
      <CardHeader>
        <CardTitle>{provider.name}</CardTitle>
        <CardDescription className="line-clamp-2">{provider.description}</CardDescription>
        {connections > 0 ? (
          <CardAction>
            <Badge variant="success">{provider.allowsMultiple ? `${connections} conectada(s)` : "Conectado"}</Badge>
          </CardAction>
        ) : null}
      </CardHeader>
      <CardFooter>
        <ActionLockTooltip locked={!canConnect}>
          <Button variant="outline" size="sm" disabled={full} onClick={onConnect}>
            <Plug data-icon="inline-start" aria-hidden="true" />
            {full ? "Já conectado" : provider.allowsMultiple && connections > 0 ? "Conectar outra" : "Conectar"}
          </Button>
        </ActionLockTooltip>
      </CardFooter>
    </Card>
  );
}
