import { Copy, Download, ExternalLink, Eye, MoreHorizontal, Pencil, Plus, RefreshCw, Send, Trash2 } from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "@/components/animate-ui/components/radix/toggle-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/animate-ui/components/radix/tooltip";
import { ActionButton } from "@/components/Modules/Core/DesignSystem/action-button";
import { ActionLockTooltip } from "@/components/Modules/Core/DesignSystem/action-lock-tooltip";
import { CopyButton } from "@/components/Modules/Core/DesignSystem/copy-button";
import { Button } from "@/components/ui/button";

import { Showcase } from "../../components/showcase";
import { Specimen } from "../../components/specimen";
import { SpecimenLabel } from "../../components/specimen-label";
import { TokenCode } from "../../components/token-code";
import { ActionStateDemo } from "../../demos/action-state-demo";
import { DeleteFlowDemo } from "../../demos/delete-flow-demo";
import { BUTTON_SIZES, BUTTON_USAGE, BUTTON_VARIANTS, ICON_BUTTON_SIZES } from "../../mocks/demo";

const ROW_ACTIONS = [
  { label: "Visualizar", icon: Eye },
  { label: "Editar", icon: Pencil },
  { label: "Duplicar", icon: Copy },
  { label: "Mais ações", icon: MoreHorizontal },
];

export function ButtonsSection() {
  return (
    <Showcase
      id="botoes"
      title="Botões"
      description="Um único Button. Nunca sobrescrever cor, altura ou padding por className. Passe o mouse, clique e use Tab."
    >
      <Specimen title="Variantes">
        {BUTTON_VARIANTS.map((variant) => (
          <Button key={variant} variant={variant}>
            {variant}
          </Button>
        ))}
      </Specimen>
      <Specimen title="Quando usar" className="block divide-y p-0">
        {BUTTON_USAGE.map((item) => (
          <div key={item.variant} className="grid gap-2 px-5 py-3 md:grid-cols-[12rem_1fr]">
            <TokenCode>{item.variant}</TokenCode>
            <span className="text-sm">{item.usage}</span>
          </div>
        ))}
      </Specimen>
      <div className="grid gap-5 lg:grid-cols-2">
        <Specimen title="Tamanhos" description="default (36px) = altura do input; sm em tabelas e toolbars">
          {BUTTON_SIZES.map((size) => (
            <Button key={size} size={size}>
              <Plus data-icon="inline-start" aria-hidden="true" />
              {size}
            </Button>
          ))}
        </Specimen>
        <Specimen title="Somente ícone" description="Sempre com aria-label e tooltip">
          {ICON_BUTTON_SIZES.map((size) => (
            <Tooltip key={size}>
              <TooltipTrigger asChild>
                <Button size={size} variant="outline" aria-label={`Atualizar (${size})`}>
                  <RefreshCw aria-hidden="true" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>{size}</TooltipContent>
            </Tooltip>
          ))}
          <SpecimenLabel>Ações de linha</SpecimenLabel>
          <div className="flex items-center gap-0.5">
            {ROW_ACTIONS.map(({ label, icon: Icon }) => (
              <Tooltip key={label}>
                <TooltipTrigger asChild>
                  <Button size="icon-sm" variant="ghost" aria-label={label}>
                    <Icon aria-hidden="true" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{label}</TooltipContent>
              </Tooltip>
            ))}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon-sm" variant="destructive-ghost" aria-label="Excluir">
                  <Trash2 aria-hidden="true" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Excluir</TooltipContent>
            </Tooltip>
          </div>
        </Specimen>
      </div>
      <Specimen title="Com ícone">
        <Button>
          <Plus data-icon="inline-start" aria-hidden="true" />
          Novo produto
        </Button>
        <Button variant="outline">
          <Download data-icon="inline-start" aria-hidden="true" />
          Exportar
        </Button>
        <Button variant="ghost">
          Abrir no marketplace
          <ExternalLink data-icon="inline-end" aria-hidden="true" />
        </Button>
        <Button variant="secondary">
          <Send data-icon="inline-start" aria-hidden="true" />
          Reenviar código
        </Button>
      </Specimen>
      <div className="grid gap-5 lg:grid-cols-2">
        <Specimen title="Estados" description="idle → loading → sucesso (✓) → idle">
          <ActionStateDemo />
          <ActionButton state="loading" variant="outline">
            Sincronizando
          </ActionButton>
          <Button disabled>Desabilitado</Button>
        </Specimen>
        <Specimen title="Permissão" description="Sem permissão: desabilitado com cadeado e motivo no tooltip">
          <ActionLockTooltip locked>
            <Button variant="destructive">
              <Trash2 data-icon="inline-start" aria-hidden="true" />
              Cancelar pedido
            </Button>
          </ActionLockTooltip>
          <ActionLockTooltip locked={false}>
            <Button variant="outline">Faturar</Button>
          </ActionLockTooltip>
        </Specimen>
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <Specimen
          title="Exclusão irreversível"
          description="Lixeira abre a confirmação; o botão destrutivo confirma com loading"
        >
          <DeleteFlowDemo />
        </Specimen>
        <Specimen title="Copiar e alternar">
          <span className="flex items-center gap-1.5 rounded-md border bg-muted/40 py-1 pr-1 pl-2.5 font-mono text-xs">
            PSN-100-BR
            <CopyButton value="PSN-100-BR" label="Copiar SKU" />
          </span>
          <ToggleGroup type="single" defaultValue="todos" variant="outline" size="sm">
            <ToggleGroupItem value="todos">Todos</ToggleGroupItem>
            <ToggleGroupItem value="ativos">Ativos</ToggleGroupItem>
            <ToggleGroupItem value="inativos">Inativos</ToggleGroupItem>
          </ToggleGroup>
        </Specimen>
      </div>
    </Showcase>
  );
}
