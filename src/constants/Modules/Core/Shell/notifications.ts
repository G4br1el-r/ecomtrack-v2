import type { AppNotification } from "@/@types/Modules/Core/Shell/notification";

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: "n1",
    type: "erro-sync",
    title: "Falha ao sincronizar 3 produtos",
    description: "Mercado Livre recusou a atualização de preço.",
    time: "há 5 min",
    read: false,
  },
  {
    id: "n2",
    type: "pedido",
    title: "12 novos pedidos",
    description: "Recebidos da Shopify na última hora.",
    time: "há 18 min",
    read: false,
  },
  {
    id: "n3",
    type: "alerta",
    title: "Estoque baixo",
    description: "Gift Card PlayStation R$ 100 abaixo do mínimo.",
    time: "há 1 h",
    read: false,
  },
  {
    id: "n4",
    type: "nota-fiscal",
    title: "Fechamento de setembro disponível",
    description: "Relatório pronto para conferência.",
    time: "ontem",
    read: true,
  },
];
