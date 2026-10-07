"use client";

import { PanelBottom, PanelTop, Pencil } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { NotificationSummary } from "@/schemas/Modules/Administracao/Comunicacao/notification-summary-schema";
import { useNotificationEditorStore } from "@/store/Modules/Administracao/Comunicacao/notification-editor-store";

export function LayoutCard({ notification }: { notification: NotificationSummary }) {
  const open = useNotificationEditorStore((state) => state.open);
  const Icon = notification.part === "Header" ? PanelTop : PanelBottom;
  return (
    <Card size="sm" className="transition-shadow hover:shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className="size-4 text-muted-foreground" aria-hidden="true" />
          {notification.name}
        </CardTitle>
        <CardDescription>{notification.description}</CardDescription>
        {notification.isCustom ? (
          <CardAction>
            <Badge variant="info">Personalizado</Badge>
          </CardAction>
        ) : null}
      </CardHeader>
      <CardFooter>
        <Button variant="outline" size="sm" onClick={() => open(notification)}>
          <Pencil data-icon="inline-start" aria-hidden="true" />
          Editar {notification.name.toLowerCase()}
        </Button>
      </CardFooter>
    </Card>
  );
}
