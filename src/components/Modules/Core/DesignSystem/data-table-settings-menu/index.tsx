"use client";

import { Columns3, Rows3, Settings, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

import type {
  DataTableColumnLayout,
  DataTableColumnOption,
  DataTableFeature,
  DataTableFeatureFlags,
} from "@/@types/Modules/Core/DesignSystem/data-table";
import {
  Tabs,
  TabsContent,
  TabsContents,
  TabsList,
  TabsTrigger,
} from "@/components/animate-ui/components/animate/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/animate-ui/components/radix/popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/animate-ui/components/radix/tooltip";
import { Button } from "@/components/ui/button";
import {
  DATA_TABLE_POPOVER_CLASS,
  DATA_TABLE_POPOVER_COLLISION_PADDING,
} from "@/constants/Modules/Core/DesignSystem/data-table";
import { cn } from "@/lib/utils";

import { DataTableColumnsPanel } from "../data-table-columns-panel";
import { DataTableFeaturesPanel } from "../data-table-features-panel";
import { DensityToggle } from "../density-toggle";

export function DataTableSettingsMenu({
  columns,
  columnLayout,
  onApplyColumns,
  available,
  features,
  onFeatureChange,
  onResetFeatures,
}: {
  columns: DataTableColumnOption[];
  columnLayout: DataTableColumnLayout;
  onApplyColumns: (layout: DataTableColumnLayout) => void;
  available: DataTableFeature[];
  features: DataTableFeatureFlags;
  onFeatureChange: (feature: DataTableFeature, enabled: boolean) => void;
  onResetFeatures: () => void;
}) {
  const [open, setOpen] = useState(false);
  const hiddenCount = columns.filter((column) => columnLayout.columnVisibility[column.id] === false).length;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              aria-label="Configurações da tabela"
              className="relative border-input"
            >
              <Settings aria-hidden="true" />
              {hiddenCount > 0 ? (
                <span aria-hidden="true" className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-primary" />
              ) : null}
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>
        <TooltipContent>Configurações da tabela</TooltipContent>
      </Tooltip>
      <PopoverContent
        align="end"
        collisionPadding={DATA_TABLE_POPOVER_COLLISION_PADDING}
        className={cn("w-80", DATA_TABLE_POPOVER_CLASS)}
      >
        <Tabs defaultValue="columns" className="min-h-0 gap-0">
          <div className="border-b p-2">
            <TabsList className="w-full">
              <TabsTrigger value="columns">
                <Columns3 aria-hidden="true" />
                Colunas
                {hiddenCount > 0 ? (
                  <span className="text-xs text-muted-foreground tabular-nums">({hiddenCount})</span>
                ) : null}
              </TabsTrigger>
              <TabsTrigger value="display">
                <Rows3 aria-hidden="true" />
                Exibição
              </TabsTrigger>
              {available.length > 0 ? (
                <TabsTrigger value="features">
                  <SlidersHorizontal aria-hidden="true" />
                  Recursos
                </TabsTrigger>
              ) : null}
            </TabsList>
          </div>
          <TabsContents>
            <TabsContent value="columns" aria-label="Colunas">
              <DataTableColumnsPanel
                columns={columns}
                layout={columnLayout}
                onApply={(layout) => {
                  onApplyColumns(layout);
                  setOpen(false);
                }}
                onCancel={() => setOpen(false)}
              />
            </TabsContent>
            <TabsContent value="display" aria-label="Exibição">
              <div className="flex items-center justify-between gap-4 px-4 py-3">
                <div className="min-w-0 space-y-1">
                  <p className="text-sm font-medium">Densidade</p>
                  <p className="text-xs text-muted-foreground">Altura das linhas da tabela.</p>
                </div>
                <DensityToggle />
              </div>
            </TabsContent>
            {available.length > 0 ? (
              <TabsContent value="features" aria-label="Recursos">
                <DataTableFeaturesPanel
                  available={available}
                  features={features}
                  onFeatureChange={onFeatureChange}
                  onReset={onResetFeatures}
                />
              </TabsContent>
            ) : null}
          </TabsContents>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}
