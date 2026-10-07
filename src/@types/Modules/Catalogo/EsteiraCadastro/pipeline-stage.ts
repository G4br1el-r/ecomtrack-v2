import type { LucideIcon } from "lucide-react";

import type { BadgeTone } from "@/@types/Modules/Core/DesignSystem/badge-tone";

import type { PipelineStatus } from "./pipeline-status";

export type PipelineStage = "importacao" | "cadastro" | "precificacao" | "publicacao" | "validacao" | "finalizado";

export type PipelineStageConfig = {
  id: PipelineStage;
  label: string;
  description: string;
  icon: LucideIcon;
  statuses: readonly PipelineStatus[];
  emptyTitle: string;
  emptyDescription: string;
};

export type StageKpiConfig = {
  id: string;
  label: string;
  hint: string;
  icon: LucideIcon;
  tone: BadgeTone;
  statuses: readonly PipelineStatus[];
  recentDays?: number;
};
