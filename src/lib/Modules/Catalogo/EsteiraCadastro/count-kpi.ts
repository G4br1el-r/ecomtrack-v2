import { differenceInCalendarDays, parseISO } from "date-fns";

import type { PipelineProduct } from "@/@types/Modules/Catalogo/EsteiraCadastro/pipeline-product";
import type { StageKpiConfig } from "@/@types/Modules/Catalogo/EsteiraCadastro/pipeline-stage";

export function countKpi(products: PipelineProduct[], kpi: StageKpiConfig, now: Date): number {
  return products.filter(
    (product) =>
      kpi.statuses.includes(product.status) &&
      (kpi.recentDays === undefined || differenceInCalendarDays(now, parseISO(product.updatedAt)) < kpi.recentDays),
  ).length;
}
