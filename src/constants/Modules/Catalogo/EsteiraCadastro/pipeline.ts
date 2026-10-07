import { ClipboardList, CloudDownload, Globe, PackageCheck, ShieldCheck, Tag } from "lucide-react";
import type { TargetAndTransition } from "motion/react";

import type { Currency, Supplier } from "@/@types/Modules/Catalogo/EsteiraCadastro/pipeline-product";
import type { PipelineStage, PipelineStageConfig } from "@/@types/Modules/Catalogo/EsteiraCadastro/pipeline-stage";
import type { PipelineStatus, PipelineStatusConfig } from "@/@types/Modules/Catalogo/EsteiraCadastro/pipeline-status";

export const PIPELINE_PRODUCTS_QUERY_KEY = ["catalogo", "esteira-cadastro", "produtos"] as const;

export const EXCHANGE_RATES_QUERY_KEY = ["catalogo", "esteira-cadastro", "cotacoes"] as const;

export const PIPELINE_STAGE_IDS = [
  "importacao",
  "cadastro",
  "precificacao",
  "publicacao",
  "validacao",
  "finalizado",
] as const satisfies readonly PipelineStage[];

export const DEFAULT_PIPELINE_STAGE: PipelineStage = "importacao";

export const REGISTRATION_STEPS_TOTAL = 6;

export const STAGE_ICON_POP: TargetAndTransition = { scale: [1, 1.25, 1], rotate: [0, -10, 0] };

export const DATE_TIME_FORMAT = "dd/MM/yyyy 'às' HH:mm";

export const EXCHANGE_RATES_UPDATED_AT_FORMAT = "dd/MM 'às' HH:mm";

export const PIPELINE_STAGES: Record<PipelineStage, PipelineStageConfig> = {
  importacao: {
    id: "importacao",
    label: "Importação",
    description: "Produtos que chegaram pela API dos fornecedores e aguardam triagem.",
    icon: CloudDownload,
    statuses: ["disponivel", "indisponivel", "ignorado"],
    emptyTitle: "Nenhum produto para triar",
    emptyDescription: "Os produtos novos dos fornecedores aparecem aqui assim que são importados.",
  },
  cadastro: {
    id: "cadastro",
    label: "Cadastro",
    description: "Produtos aceitos sendo cadastrados em seis passos e conferidos antes do preço.",
    icon: ClipboardList,
    statuses: ["nao-iniciado", "em-andamento", "revisar", "corrigir"],
    emptyTitle: "Nenhum cadastro em andamento",
    emptyDescription: "Aceite um produto na Importação para começar o cadastro.",
  },
  precificacao: {
    id: "precificacao",
    label: "Precificação",
    description: "Preço de venda definido a partir do custo e das regras de preço, e depois aprovado.",
    icon: Tag,
    statuses: ["aguardando-preco", "aguardando-aprovacao"],
    emptyTitle: "Nenhum produto para precificar",
    emptyDescription: "Produtos aparecem aqui depois que o cadastro é revisado.",
  },
  publicacao: {
    id: "publicacao",
    label: "Publicação",
    description: "Conferência final e envio para a loja. Marca e categoria precisam estar integradas.",
    icon: Globe,
    statuses: ["pronto", "pendente-integracao"],
    emptyTitle: "Nenhum produto aguardando publicação",
    emptyDescription: "Aprove um preço na Precificação para que o produto apareça aqui.",
  },
  validacao: {
    id: "validacao",
    label: "Validação",
    description: "Produtos publicados na loja aguardando a ativação final.",
    icon: ShieldCheck,
    statuses: ["aguardando-ativacao"],
    emptyTitle: "Nenhum produto aguardando validação",
    emptyDescription: "Produtos aparecem aqui depois de publicados na loja.",
  },
  finalizado: {
    id: "finalizado",
    label: "Finalizados",
    description: "Cadastros concluídos, com o produto no e-commerce.",
    icon: PackageCheck,
    statuses: ["ativo", "inativo"],
    emptyTitle: "Nenhum cadastro finalizado",
    emptyDescription: "Os produtos ativados na Validação ficam registrados aqui.",
  },
};

export const PIPELINE_STATUS: Record<PipelineStatus, PipelineStatusConfig> = {
  disponivel: {
    label: "Disponível",
    hint: "Em estoque no fornecedor, oportunidade de venda",
    tone: "success",
    dotClass: "bg-success",
  },
  indisponivel: {
    label: "Indisponível",
    hint: "Sem estoque no fornecedor, evitar cadastro até normalizar",
    tone: "warning",
    dotClass: "bg-warning",
  },
  ignorado: {
    label: "Ignorado",
    hint: "Fora da curadoria do catálogo",
    tone: "secondary",
    dotClass: "bg-muted-foreground/40",
  },
  "nao-iniciado": {
    label: "Não iniciado",
    hint: "Na fila, aguardando o início do cadastro",
    tone: "secondary",
    dotClass: "bg-muted-foreground/40",
  },
  "em-andamento": {
    label: "Em andamento",
    hint: "Sendo cadastrados pela equipe",
    tone: "info",
    dotClass: "bg-info",
  },
  revisar: {
    label: "Revisar",
    hint: "Aguardando conferência antes do preço",
    tone: "purple",
    dotClass: "bg-status-purple",
  },
  corrigir: {
    label: "Corrigir",
    hint: "Seções reprovadas na revisão",
    tone: "destructive",
    dotClass: "bg-destructive",
  },
  "aguardando-preco": {
    label: "Aguardando preço",
    hint: "Sem preço de venda definido",
    tone: "warning",
    dotClass: "bg-warning",
  },
  "aguardando-aprovacao": {
    label: "Aguardando aprovação",
    hint: "Preço definido, aguardando validação",
    tone: "info",
    dotClass: "bg-info",
  },
  pronto: {
    label: "Pronto para publicar",
    hint: "Dados completos e integrados à loja",
    tone: "success",
    dotClass: "bg-success",
  },
  "pendente-integracao": {
    label: "Pendência de integração",
    hint: "Marca ou categoria sem vínculo com a loja",
    tone: "orange",
    dotClass: "bg-status-orange",
  },
  "aguardando-ativacao": {
    label: "Aguardando ativação",
    hint: "Publicado, aguardando a aprovação final",
    tone: "teal",
    dotClass: "bg-status-teal",
  },
  ativo: {
    label: "Ativo",
    hint: "Disponível para venda na loja",
    tone: "success",
    dotClass: "bg-success",
  },
  inativo: {
    label: "Inativo",
    hint: "Concluído, mas fora do ar na loja",
    tone: "secondary",
    dotClass: "bg-muted-foreground/40",
  },
};

export const SUPPLIER_LABEL: Record<Supplier, string> = {
  ubiqfy: "UBIQFY",
  codeswholesale: "Codeswholesale",
  manual: "Manual",
};

export const CURRENCY_NAME: Record<Exclude<Currency, "BRL">, string> = {
  USD: "Dólar",
  EUR: "Euro",
  GBP: "Libra",
};
