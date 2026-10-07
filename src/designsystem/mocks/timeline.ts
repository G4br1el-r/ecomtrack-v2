import type { TimelineEvent } from "@/@types/Modules/Core/DesignSystem/timeline-event";

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: "1",
    type: "pedido",
    description: "Pedido PED-10231 recebido",
    meta: "04/10/2026 às 09:12",
    author: "Integração Shopify",
  },
  { id: "2", type: "pagamento", description: "Pagamento aprovado via Pix", meta: "04/10/2026 às 09:13" },
  { id: "3", type: "nota-fiscal", description: "NF-e 4512 emitida", meta: "04/10/2026 às 09:20", author: "Sistema" },
  { id: "4", type: "entrega", description: "Código enviado ao cliente por e-mail", meta: "04/10/2026 às 09:21" },
  { id: "5", type: "erro-sync", description: "Falha ao atualizar status no marketplace", meta: "04/10/2026 às 09:25" },
];

export const TIMELINE_PREVIEW_COUNT = 3;
