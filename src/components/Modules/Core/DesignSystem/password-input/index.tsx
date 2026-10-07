"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";

export function PasswordInput({ className, ...props }: Omit<React.ComponentProps<typeof InputGroupInput>, "type">) {
  const [visible, setVisible] = useState(false);
  const Icon = visible ? EyeOff : Eye;
  return (
    <InputGroup className={className}>
      <InputGroupInput type={visible ? "text" : "password"} {...props} />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          size="icon-xs"
          aria-label={visible ? "Ocultar senha" : "Mostrar senha"}
          aria-pressed={visible}
          disabled={props.disabled}
          className="text-muted-foreground hover:text-foreground"
          onClick={() => setVisible((current) => !current)}
        >
          <Icon key={visible ? "ocultar" : "mostrar"} className="animate-in fade-in zoom-in-75" aria-hidden="true" />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
