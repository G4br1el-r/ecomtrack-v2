import type { BadgeTone } from "@/@types/Modules/Core/DesignSystem/badge-tone";

export type OrderStatus = "pago" | "pendente" | "cancelado" | "enviado" | "processando" | "faturado" | "devolvido";

export type Order = {
  id: string;
  product: string;
  sku: string;
  customer: string;
  total: number;
  status: OrderStatus;
};

export const ORDER_STATUS_TONE: Record<OrderStatus, { label: string; tone: BadgeTone }> = {
  pago: { label: "Pago", tone: "success" },
  pendente: { label: "Pendente", tone: "warning" },
  cancelado: { label: "Cancelado", tone: "destructive" },
  processando: { label: "Processando", tone: "info" },
  faturado: { label: "Faturado", tone: "purple" },
  devolvido: { label: "Devolvido", tone: "orange" },
  enviado: { label: "Enviado", tone: "teal" },
};

export const ORDERS: Order[] = [
  {
    id: "PED-10231",
    product: "Gift Card PlayStation R$ 100",
    sku: "PSN-100-BR",
    customer: "Ana Souza",
    total: 100,
    status: "pago",
  },
  {
    id: "PED-10232",
    product: "Xbox Game Pass Ultimate 3 meses",
    sku: "XGP-ULT-3M",
    customer: "Bruno Lima",
    total: 149.9,
    status: "pendente",
  },
  {
    id: "PED-10233",
    product: "Spotify Premium 12 meses",
    sku: "SPT-PRM-12",
    customer: "Carla Dias",
    total: 239.9,
    status: "cancelado",
  },
  {
    id: "PED-10234",
    product: "Nintendo eShop R$ 50",
    sku: "NIN-050-BR",
    customer: "Diego Alves",
    total: 50,
    status: "enviado",
  },
  {
    id: "PED-10235",
    product: "Google Play R$ 30",
    sku: "GPL-030-BR",
    customer: "Elisa Rocha",
    total: 30,
    status: "faturado",
  },
  {
    id: "PED-10236",
    product: "Apple Gift Card R$ 200",
    sku: "APL-200-BR",
    customer: "Felipe Ramos",
    total: 200,
    status: "processando",
  },
  {
    id: "PED-10237",
    product: "Steam Wallet R$ 80",
    sku: "STM-080-BR",
    customer: "Gabriela Nunes",
    total: 80,
    status: "devolvido",
  },
];

export const ORDERS_TOTAL_ITEMS = 128;
export const ORDERS_PER_PAGE = 7;
export const ORDERS_QUERY_KEY = ["designsystem", "orders"] as const;
export const ORDERS_FILTER_CHIPS = ["Status: Pago", "Canal: Shopify", "Período: Últimos 30 dias"];
