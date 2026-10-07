"use client";

import { FileText, Moon, PanelLeft, Plus, Sun } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { toast } from "sonner";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useSidebar } from "@/components/ui/sidebar";
import { COMMAND_PALETTE_HOTKEY, SIDEBAR_TOGGLE_HOTKEY } from "@/constants/Modules/Core/Shell/hotkeys";
import { NAV_GROUPS, REPORT_LINKS } from "@/constants/Modules/Core/Shell/navigation";
import { useHotkey } from "@/hooks/Modules/Core/Shell/use-hotkey";
import { useModKeyLabel } from "@/hooks/Modules/Core/Shell/use-mod-key-label";
import { formatHotkey } from "@/lib/Modules/Core/Shell/format-hotkey";
import { useSessionStore } from "@/store/Modules/Core/Auth/session-store";
import { useCommandPaletteStore } from "@/store/Modules/Core/Shell/command-palette-store";

export function CommandPalette() {
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const { toggleSidebar } = useSidebar();
  const modKey = useModKeyLabel();
  const open = useCommandPaletteStore((state) => state.open);
  const setOpen = useCommandPaletteStore((state) => state.setOpen);
  const toggle = useCommandPaletteStore((state) => state.toggle);
  const isOwner = useSessionStore((state) => state.user?.isPlatformOwner ?? false);
  useHotkey(COMMAND_PALETTE_HOTKEY, toggle);

  const run = (action: () => void) => {
    setOpen(false);
    action();
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen} title="Buscar" description="Navegue e execute ações">
      <Command>
        <CommandInput placeholder="Buscar páginas, relatórios e ações..." />
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
          {NAV_GROUPS.filter((group) => isOwner || !group.ownerOnly).map((group) => (
            <CommandGroup key={group.label} heading={group.label}>
              {group.items.map((item) => (
                <CommandItem
                  key={item.href}
                  value={`${group.label} ${item.title}`}
                  onSelect={() => run(() => router.push(item.href))}
                >
                  <item.icon aria-hidden="true" />
                  {item.title}
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
          <CommandSeparator />
          <CommandGroup heading="Relatórios">
            {REPORT_LINKS.map((report) => (
              <CommandItem
                key={report.href}
                value={`Relatório ${report.title}`}
                onSelect={() => run(() => router.push(report.href))}
              >
                <FileText aria-hidden="true" />
                {report.title}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  );
}
