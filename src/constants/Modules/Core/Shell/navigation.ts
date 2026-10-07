import {
  Bell,
  Bot,
  Building,
  Building2,
  DollarSign,
  FileText,
  FolderTree,
  Gift,
  History,
  Inbox,
  KeyRound,
  Layers,
  LayoutDashboard,
  LifeBuoy,
  Mail,
  Megaphone,
  Package,
  PackageSearch,
  Palette,
  Receipt,
  SearchX,
  ShieldCheck,
  ShoppingCart,
  Store,
  Table,
  Tag,
  Truck,
  UserCog,
  UserPlus,
  Users,
  Wallet,
} from "lucide-react";

import type { NavGroup, ReportLink } from "@/@types/Modules/Core/Shell/navigation";

export const APP_NAME = "Ecomtrack";
export const HOME_HREF = "/visao-geral/dashboard";
export const DESIGN_SYSTEM_HREF = "/components";

export const NAV_GROUPS: NavGroup[] = [
  {
    label: "Painel",
    items: [
      { title: "Dashboard", href: "/visao-geral/dashboard", icon: LayoutDashboard },
      { title: "Supervisão", href: "/relatorios/todos", icon: FileText },
    ],
  },
  {
    label: "Operacional",
    items: [
      { title: "Pedidos", href: "/vendas/pedidos", icon: ShoppingCart },
      { title: "Clientes", href: "/vendas/clientes", icon: Users },
      { title: "Envios", href: "/operacao/envios", icon: Truck },
    ],
  },
  {
    label: "Atendimento",
    items: [
      { title: "Atendimento", href: "/vendas/atendimento", icon: Inbox },
      { title: "Central de Ajuda", href: "/suporte/central-ajuda", icon: LifeBuoy },
    ],
  },
  {
    label: "Financeiro",
    items: [
      { title: "Fiscal", href: "/financeiro/fiscal", icon: Receipt },
      { title: "Financeiro", href: "/financeiro/visao-geral", icon: Wallet },
    ],
  },
  {
    label: "Marketing",
    items: [{ title: "Campanhas", href: "/vendas/campanhas", icon: Megaphone }],
  },
  {
    label: "Catálogo",
    items: [
      { title: "Cadastro", href: "/catalogo/esteira-cadastro", icon: FileText },
      { title: "Produtos", href: "/catalogo/produtos", icon: Package },
      { title: "Marcas", href: "/catalogo/marcas", icon: Tag },
      { title: "Categorias", href: "/catalogo/categorias", icon: FolderTree },
      { title: "Precificação", href: "/catalogo/precos", icon: DollarSign },
      { title: "Estoque", href: "/catalogo/fornecedores", icon: Building2 },
    ],
  },
  {
    label: "Administração",
    items: [
      { title: "Resgate", href: "/operacao/resgates", icon: Gift },
      { title: "Usuários", href: "/administracao/usuarios", icon: UserCog },
      { title: "Agentes IA", href: "/administracao/agentes-ia", icon: Bot },
      { title: "Proteções", href: "/administracao/protecoes", icon: ShieldCheck },
      { title: "E-commerce", href: "/administracao/ecommerce", icon: Store },
      { title: "Fornecedores", href: "/administracao/fornecedores", icon: PackageSearch },
      { title: "Comunicação", href: "/administracao/comunicacao", icon: Mail },
      { title: "Notificações", href: "/administracao/notificacoes", icon: Bell },
      { title: "Auditoria", href: "/administracao/auditoria", icon: History },
      { title: "Redefinir Senha", href: "/redefinir-senha", icon: KeyRound },
      { title: "Convite", href: "/convite", icon: UserPlus },
      { title: "Página não encontrada", href: "/nao-encontrado", icon: SearchX },
    ],
  },
  {
    label: "Plataforma",
    ownerOnly: true,
    items: [
      { title: "Empresas", href: "/plataforma/empresas", icon: Building },
      { title: "Planos", href: "/plataforma/planos", icon: Layers },
    ],
  },
  {
    label: "Desenvolvimento",
    items: [
      { title: "Design System", href: DESIGN_SYSTEM_HREF, icon: Palette },
      { title: "Tabela", href: "/tabela", icon: Table },
    ],
  },
];

export const REPORT_LINKS: ReportLink[] = [
  { title: "Auditoria de códigos", href: "/relatorios/auditoria-codigos" },
  { title: "Auditoria de envios", href: "/relatorios/auditoria-envios" },
  { title: "Auditoria de estoque", href: "/relatorios/auditoria-estoque" },
  { title: "Auditoria de pedidos e produtos", href: "/relatorios/auditoria-pedidos-produtos" },
  { title: "Perda de códigos", href: "/relatorios/auditoria-perda-codigos" },
  { title: "Clientes de alto volume", href: "/relatorios/clientes-alto-volume" },
  { title: "LTV de clientes", href: "/relatorios/clientes-ltv" },
  { title: "Códigos duplicados", href: "/relatorios/codigos-duplicados" },
  { title: "Códigos sem pedido", href: "/relatorios/codigos-sem-pedido" },
  { title: "Compliance", href: "/relatorios/compliance" },
  { title: "Conciliação de códigos", href: "/relatorios/conciliacao-codigos" },
  { title: "Conciliação de pedidos", href: "/relatorios/conciliacao-pedidos" },
  { title: "Curva ABC", href: "/relatorios/curva-abc" },
  { title: "Detalhamento de pedidos", href: "/relatorios/detalhamento-pedidos" },
  { title: "Diagnóstico de bugs", href: "/relatorios/diagnostico-bugs" },
  { title: "Diário de bordo", href: "/relatorios/diario-bordo" },
  { title: "E-mails suspeitos", href: "/relatorios/emails-suspeitos" },
  { title: "Entrega de e-mails", href: "/relatorios/entrega-emails" },
  { title: "Estoque imobilizado", href: "/relatorios/estoque-imobilizado" },
  { title: "Falhas de envio", href: "/relatorios/falhas-envio" },
  { title: "Fechamento mensal", href: "/relatorios/fechamento-mensal" },
  { title: "Match fornecedor x API", href: "/relatorios/fornecedor-api-match" },
  { title: "Histórico de preço de envios", href: "/relatorios/historico-preco-envios" },
  { title: "Log de atividade", href: "/relatorios/log-atividade" },
  { title: "Lucratividade por fornecedor", href: "/relatorios/lucratividade-fornecedor" },
  { title: "Origem dos pedidos", href: "/relatorios/origem-pedidos" },
  { title: "Pedidos duplicados", href: "/relatorios/pedidos-duplicados" },
  { title: "Pedidos não pagos", href: "/relatorios/pedidos-nao-pagos" },
  { title: "Pagos não processados", href: "/relatorios/pedidos-pagos-nao-processados" },
  { title: "Previsões", href: "/relatorios/previsoes" },
  { title: "Produtos divergentes", href: "/relatorios/produtos-divergentes" },
  { title: "Rastreio de códigos", href: "/relatorios/rastreio-codigos" },
  { title: "Reposição", href: "/relatorios/reposicao" },
  { title: "Resgates expirados", href: "/relatorios/resgates-expirados" },
  { title: "Segurança e acessos", href: "/relatorios/seguranca-acessos" },
];
