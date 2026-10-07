import { Search, X } from "lucide-react";

import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { Kbd } from "@/components/ui/kbd";

export function SearchField({
  className,
  shortcut,
  onClear,
  ...props
}: Omit<React.ComponentProps<typeof InputGroupInput>, "type"> & { shortcut?: string; onClear?: () => void }) {
  const canClear = onClear !== undefined && String(props.value ?? "") !== "";
  return (
    <InputGroup className={className}>
      <InputGroupInput type="search" {...props} />
      <InputGroupAddon>
        <Search aria-hidden="true" />
      </InputGroupAddon>
      {canClear ? (
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            size="icon-xs"
            aria-label="Limpar busca"
            className="animate-in fade-in zoom-in-75 text-muted-foreground hover:text-foreground"
            onClick={onClear}
          >
            <X aria-hidden="true" />
          </InputGroupButton>
        </InputGroupAddon>
      ) : shortcut ? (
        <InputGroupAddon align="inline-end">
          <Kbd>{shortcut}</Kbd>
        </InputGroupAddon>
      ) : null}
    </InputGroup>
  );
}
