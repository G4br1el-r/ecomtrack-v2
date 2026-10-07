import type { ChannelId } from "@/@types/Modules/VisaoGeral/Dashboard/sales-breakdown";

export const CHANNEL_SHARES_MOCK = [
  { id: "lojaPropria", revenueShare: 0.38, ticketFactor: 1.12 },
  { id: "mercadoLivre", revenueShare: 0.27, ticketFactor: 0.96 },
  { id: "shopee", revenueShare: 0.16, ticketFactor: 0.78 },
  { id: "amazon", revenueShare: 0.12, ticketFactor: 1.05 },
  { id: "magalu", revenueShare: 0.07, ticketFactor: 0.94 },
] satisfies { id: ChannelId; revenueShare: number; ticketFactor: number }[];
