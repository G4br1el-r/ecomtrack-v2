"use client";

import { KeyRound } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PIN_SETTINGS } from "@/constants/Modules/Core/Conta/account";
import type { PinType } from "@/schemas/Modules/Core/Conta/pin-type-schema";

import { PinDialog } from "../pin-dialog";

export function PinCard({ type, created, readOnly }: { type: PinType; created: boolean; readOnly: boolean }) {
  const [open, setOpen] = useState(false);
  const settings = PIN_SETTINGS[type];
  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <KeyRound className="size-4 text-muted-foreground" aria-hidden="true" />
          {settings.title}
        </CardTitle>
        <CardDescription>{settings.description}</CardDescription>
        <CardAction>
          <Badge variant={created ? "success" : "secondary"}>{created ? "Criado" : "Não criado"}</Badge>
        </CardAction>
      </CardHeader>
      <CardFooter>
        <Button variant="outline" size="sm" disabled={readOnly} onClick={() => setOpen(true)}>
          {created ? "Trocar PIN" : "Criar PIN"}
        </Button>
      </CardFooter>
      <PinDialog type={type} created={created} open={open} onOpenChange={setOpen} />
    </Card>
  );
}
