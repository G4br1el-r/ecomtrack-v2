import type { BadgeTone } from "@/@types/Modules/Core/DesignSystem/badge-tone";

export type PipelineStatus =
  | "disponivel"
  | "indisponivel"
  | "ignorado"
  | "nao-iniciado"
  | "em-andamento"
  | "revisar"
  | "corrigir"
  | "aguardando-preco"
  | "aguardando-aprovacao"
  | "pronto"
  | "pendente-integracao"
  | "aguardando-ativacao"
  | "ativo"
  | "inativo";

export type PipelineStatusConfig = {
  label: string;
  hint: string;
  tone: BadgeTone;
  dotClass: string;
};
