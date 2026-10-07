"use client";

import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { COMMAND_PALETTE_HOTKEY } from "@/constants/Modules/Core/Shell/hotkeys";
import { useModKeyLabel } from "@/hooks/Modules/Core/Shell/use-mod-key-label";
import { useCommandPaletteStore } from "@/store/Modules/Core/Shell/command-palette-store";

export function CommandPaletteTrigger() {
  const setOpen = useCommandPaletteStore((state) => state.setOpen);
  const modKey = useModKeyLabel();
  return (
    <Button
      variant="outline"
      aria-label="Buscar"
      className="size-8 justify-center gap-2 px-0 font-normal text-muted-foreground sm:w-64 sm:justify-start sm:px-2.5"
      onClick={() => setOpen(true)}
    >
      <Search aria-hidden="true" />
      <span className="hidden flex-1 text-left sm:inline">Buscar...</span>
      <KbdGroup className="hidden sm:inline-flex">
        <Kbd>{modKey}</Kbd>
        <Kbd>{COMMAND_PALETTE_HOTKEY.key.toUpperCase()}</Kbd>
      </KbdGroup>
    </Button>
  );
}
