import {
  AlertTriangle,
  Ban,
  CalendarDays,
  CheckCircle2,
  Clock,
  DollarSign,
  Eye,
  FileSearch,
  Inbox,
  ListTodo,
  Loader,
  PackageCheck,
  Rocket,
  Wrench,
} from "lucide-react";

import type { PipelineStage, StageKpiConfig } from "@/@types/Modules/Catalogo/EsteiraCadastro/pipeline-stage";
import type { BadgeTone } from "@/@types/Modules/Core/DesignSystem/badge-tone";

export const FINALIZED_RECENT_DAYS = 30;

export const KPI_TONE_CLASS: Record<BadgeTone, string> = {
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning-foreground dark:text-warning",
  destructive: "bg-destructive-soft text-destructive",
  info: "bg-info-soft text-info",
  purple: "bg-status-purple-soft text-status-purple",
  orange: "bg-status-orange-soft text-status-orange",
  teal: "bg-status-teal-soft text-status-teal",
  secondary: "bg-muted text-muted-foreground",
};

export const PIPELINE_STAGE_KPIS: Record<PipelineStage, readonly StageKpiConfig[]> = {
  importacao: [
    {
      id: "a-classificar",
      label: "A classificar",
      hint: "Produtos aguardando decisão",
      icon: Inbox,
      tone: "info",
      statuses: ["disponivel", "indisponivel"],
    },
    {
      id: "em-estoque",
      label: "Em estoque no fornecedor",
      hint: "Oportunidade de venda",
      icon: CheckCircle2,
      tone: "success",
      statuses: ["disponivel"],
    },
    {
      id: "sem-estoque",
      label: "Sem estoque",
      hint: "Evitar cadastro até normalizar o estoque",
      icon: AlertTriangle,
      tone: "warning",
      statuses: ["indisponivel"],
    },
    {
      id: "ignorados",
      label: "Ignorados",
      hint: "Controle de curadoria e limpeza do catálogo",
      icon: Ban,
      tone: "secondary",
      statuses: ["ignorado"],
    },
  ],
  cadastro: [
    {
      id: "na-fila",
      label: "Cadastros na fila",
      hint: "Aguardando início do cadastro",
      icon: ListTodo,
      tone: "secondary",
      statuses: ["nao-iniciado"],
    },
    {
      id: "em-andamento",
      label: "Em andamento",
      hint: "Sendo trabalhados pela equipe",
      icon: Loader,
      tone: "info",
      statuses: ["em-andamento"],
    },
    {
      id: "aguardando-revisao",
      label: "Aguardando revisão",
      hint: "Gargalo de conferência antes da publicação",
      icon: FileSearch,
      tone: "purple",
      statuses: ["revisar"],
    },
    {
      id: "para-correcao",
      label: "Para correção",
      hint: "Impacta prazo de publicação e qualidade",
      icon: Wrench,
      tone: "destructive",
      statuses: ["corrigir"],
    },
  ],
  precificacao: [
    {
      id: "aguardando-precificacao",
      label: "Aguardando precificação",
      hint: "Pendentes de definição de preço",
      icon: DollarSign,
      tone: "warning",
      statuses: ["aguardando-preco"],
    },
    {
      id: "aguardando-aprovacao",
      label: "Aguardando aprovação de preço",
      hint: "Precificações definidas aguardando validação",
      icon: Eye,
      tone: "info",
      statuses: ["aguardando-aprovacao"],
    },
  ],
  publicacao: [
    {
      id: "aguardando-publicacao",
      label: "Aguardando publicação",
      hint: "Prontos para publicar",
      icon: Rocket,
      tone: "success",
      statuses: ["pronto"],
    },
    {
      id: "pendencia-integracao",
      label: "Pendência de integração",
      hint: "Marca ou categoria pendentes",
      icon: AlertTriangle,
      tone: "orange",
      statuses: ["pendente-integracao"],
    },
  ],
  validacao: [
    {
      id: "aguardando-aprovacao",
      label: "Aguardando aprovação",
      hint: "Pendentes de aprovação final",
      icon: Clock,
      tone: "teal",
      statuses: ["aguardando-ativacao"],
    },
  ],
  finalizado: [
    {
      id: "finalizados",
      label: "Finalizados",
      hint: "Cadastros concluídos",
      icon: PackageCheck,
      tone: "success",
      statuses: ["ativo", "inativo"],
    },
    {
      id: "ultimos-30-dias",
      label: "Últimos 30 dias",
      hint: "Concluídos no último mês",
      icon: CalendarDays,
      tone: "info",
      statuses: ["ativo", "inativo"],
      recentDays: FINALIZED_RECENT_DAYS,
    },
  ],
};
