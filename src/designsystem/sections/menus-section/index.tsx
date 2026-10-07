import { Ban, Copy, Download, Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/animate-ui/components/radix/dropdown-menu";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/animate-ui/components/radix/hover-card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/animate-ui/components/radix/popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/animate-ui/components/radix/tooltip";
import { ActionLockedTag } from "@/components/Modules/Core/DesignSystem/action-locked-tag";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";

import { Showcase } from "../../components/showcase";
import { Specimen } from "../../components/specimen";

export function MenusSection() {
  return (
    <Showcase
      id="menus"
      title="Menus e popovers"
      description="Ação destrutiva sempre por último e separada. Ação sem permissão aparece desabilitada com cadeado."
    >
      <div className="grid gap-5 lg:grid-cols-2">
        <Specimen title="Menu de ações">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Mais ações">
                <MoreHorizontal aria-hidden="true" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>Pedido PED-10231</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Eye aria-hidden="true" />
                  Visualizar
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Pencil aria-hidden="true" />
                  Editar
                  <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Copy aria-hidden="true" />
                  Duplicar
                </DropdownMenuItem>
                <DropdownMenuItem disabled>
                  <Download aria-hidden="true" />
                  Baixar NF-e
                  <ActionLockedTag />
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
                <Ban aria-hidden="true" />
                Cancelar pedido
              </DropdownMenuItem>
              <DropdownMenuItem variant="destructive">
                <Trash2 aria-hidden="true" />
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Specimen>
        <Specimen title="Popover, tooltip e hover card">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Popover</Button>
            </PopoverTrigger>
            <PopoverContent className="w-72 space-y-1">
              <p className="text-sm font-medium">Margem calculada</p>
              <p className="text-sm text-muted-foreground">
                Preço de venda menos custo do fornecedor e taxas do canal.
              </p>
            </PopoverContent>
          </Popover>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Tooltip</Button>
            </TooltipTrigger>
            <TooltipContent>
              Buscar <Kbd className="ml-1">⌘K</Kbd>
            </TooltipContent>
          </Tooltip>
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="link">@ana.souza</Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-72">
              <div className="flex gap-3">
                <Avatar>
                  <AvatarFallback>AS</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Ana Souza</p>
                  <p className="text-xs text-muted-foreground">Cliente desde março de 2024 · 37 pedidos</p>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </Specimen>
      </div>
    </Showcase>
  );
}
