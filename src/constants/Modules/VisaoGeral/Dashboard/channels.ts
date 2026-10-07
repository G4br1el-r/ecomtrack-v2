import type { ChannelId } from "@/@types/Modules/VisaoGeral/Dashboard/sales-breakdown";

export const CHANNEL_IDS = ["lojaPropria", "mercadoLivre", "shopee", "amazon", "magalu"] as const;

export const CHANNELS = {
  lojaPropria: { label: "Loja própria", color: "var(--chart-1)" },
  mercadoLivre: { label: "Mercado Livre", color: "var(--chart-2)" },
  shopee: { label: "Shopee", color: "var(--chart-3)" },
  amazon: { label: "Amazon", color: "var(--chart-4)" },
  magalu: { label: "Magalu", color: "var(--chart-5)" },
} as const satisfies Record<ChannelId, { label: string; color: string }>;
