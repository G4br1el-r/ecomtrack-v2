"use client";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/animate-ui/components/radix/tooltip";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { SIDEBAR_TOGGLE_HOTKEY } from "@/constants/Modules/Core/Shell/hotkeys";
import { useModKeyLabel } from "@/hooks/Modules/Core/Shell/use-mod-key-label";

const KBD_IN_TOOLTIP = "bg-background/20 text-background dark:bg-background/10";

export function SidebarToggle() {
  const { state } = useSidebar();
  const modKey = useModKeyLabel();
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <SidebarTrigger className="shrink-0" />
      </TooltipTrigger>
      <TooltipContent side="right" className="flex items-center gap-2">
        {state === "expanded" ? "Recolher menu" : "Abrir menu"}
        <KbdGroup>
          <Kbd className={KBD_IN_TOOLTIP}>{modKey}</Kbd>
          <Kbd className={KBD_IN_TOOLTIP}>{SIDEBAR_TOGGLE_HOTKEY.key.toUpperCase()}</Kbd>
        </KbdGroup>
      </TooltipContent>
    </Tooltip>
  );
}
