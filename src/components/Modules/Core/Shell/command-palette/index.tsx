"use client";

import { Moon, PanelLeft, Plus, Sun } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { toast } from "sonner";

import { LucideIcon } from "@/components/Modules/Core/DesignSystem/lucide-icon";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";
import { useSidebar } from "@/components/ui/sidebar";
import { NO_SECTION_LABEL } from "@/constants/Modules/Core/Access/access";
import { COMMAND_PALETTE_HOTKEY, SIDEBAR_TOGGLE_HOTKEY } from "@/constants/Modules/Core/Shell/hotkeys";
import { usePermissionMenu } from "@/hooks/Modules/Core/Access/use-permission-menu";
import { useHotkey } from "@/hooks/Modules/Core/Shell/use-hotkey";
import { useModKeyLabel } from "@/hooks/Modules/Core/Shell/use-mod-key-label";
import { formatHotkey } from "@/lib/Modules/Core/Shell/format-hotkey";
import { getVisibleMenuSections } from "@/lib/Modules/Core/Shell/get-visible-menu-sections";
import { useCommandPaletteStore } from "@/store/Modules/Core/Shell/command-palette-store";

export function CommandPalette() {
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const { toggleSidebar } = useSidebar();
  const modKey = useModKeyLabel();
  const open = useCommandPaletteStore((state) => state.open);
  const setOpen = useCommandPaletteStore((state) => state.setOpen);
  const toggle = useCommandPaletteStore((state) => state.toggle);
  const { data: menu } = usePermissionMenu();
  useHotkey(COMMAND_PALETTE_HOTKEY, toggle);

  const run = (action: () => void) => {
    setOpen(false);
    action();
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen} title="Buscar" description="Navegue e execute ações">
      <Command>
        <CommandInput placeholder="Buscar páginas e ações..." />
        <CommandList>
          <CommandEmpty>Nada encontrado.</CommandEmpty>
          <CommandGroup heading="Ações">
            <CommandItem
              onSelect={() => run(() => toast.info("Novo pedido", { description: "Fluxo ainda não implementado." }))}
            >
              <Plus aria-hidden="true" />
              Novo pedido
            </CommandItem>
            <CommandItem onSelect={() => run(() => setTheme(resolvedTheme === "dark" ? "light" : "dark"))}>
              {resolvedTheme === "dark" ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
              Alternar tema
            </CommandItem>
            <CommandItem onSelect={() => run(toggleSidebar)}>
              <PanelLeft aria-hidden="true" />
              Recolher menu lateral
              <CommandShortcut>{formatHotkey(SIDEBAR_TOGGLE_HOTKEY, modKey)}</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          {getVisibleMenuSections(menu).map((section) => {
            const label = section.name || NO_SECTION_LABEL;
            const pages = section.pages.filter((page) => page.enabled);
            if (pages.length === 0) return null;
            return (
              <CommandGroup key={section.sectionId ?? label} heading={label}>
                {pages.map((page) => (
                  <CommandItem
                    key={page.id}
                    value={`${label} ${page.name}`}
                    onSelect={() => run(() => router.push(page.route ?? ""))}
                  >
                    <LucideIcon name={page.icon} aria-hidden="true" />
                    {page.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            );
          })}
        </CommandList>
      </Command>
    </CommandDialog>
  );
}
