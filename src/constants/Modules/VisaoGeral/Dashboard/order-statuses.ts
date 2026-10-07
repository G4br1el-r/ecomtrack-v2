import type { OrderStatusId } from "@/@types/Modules/VisaoGeral/Dashboard/sales-breakdown";

export const ORDER_STATUS_IDS = ["pending", "paid", "picking", "shipped", "delivered", "canceled"] as const;

export const ORDER_STATUSES = {
  pending: { label: "Aguardando pagamento", dotClass: "bg-warning" },
  paid: { label: "Pago", dotClass: "bg-info" },
  picking: { label: "Em separação", dotClass: "bg-status-purple" },
  shipped: { label: "Enviado", dotClass: "bg-status-teal" },
  delivered: { label: "Entregue", dotClass: "bg-success" },
  canceled: { label: "Cancelado", dotClass: "bg-destructive" },
} as const satisfies Record<OrderStatusId, { label: string; dotClass: string }>;
