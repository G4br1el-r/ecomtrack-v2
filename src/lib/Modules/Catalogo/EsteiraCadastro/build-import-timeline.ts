import { format, parseISO } from "date-fns";

import type { PipelineProduct } from "@/@types/Modules/Catalogo/EsteiraCadastro/pipeline-product";
import type { TimelineEvent } from "@/@types/Modules/Core/DesignSystem/timeline-event";
import { DATE_TIME_FORMAT } from "@/constants/Modules/Catalogo/EsteiraCadastro/pipeline";

export function buildImportTimeline(product: PipelineProduct): TimelineEvent[] {
  const imported: TimelineEvent = {
    id: "importado",
    type: "importacao",
    description: "Produto inserido no catálogo",
    meta: format(parseISO(product.importedAt), DATE_TIME_FORMAT),
    author: "Sistema",
  };
  if (product.status !== "ignorado") return [imported];
  return [
    {
      id: "ignorado",
      type: "exclusao",
      description: "Produto ignorado",
      meta: format(parseISO(product.updatedAt), DATE_TIME_FORMAT),
      author: "Operador",
    },
    imported,
  ];
}
