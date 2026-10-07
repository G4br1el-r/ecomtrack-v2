import type { OrderStatusId } from "@/@types/Modules/VisaoGeral/Dashboard/sales-breakdown";

export const ORDER_STATUS_SHARES_MOCK = [
  { id: "pending", share: 0.04 },
  { id: "paid", share: 0.06 },
  { id: "picking", share: 0.08 },
  { id: "shipped", share: 0.17 },
  { id: "delivered", share: 0.61 },
  { id: "canceled", share: 0.04 },
] satisfies { id: OrderStatusId; share: number }[];
