import type { MeasureSummary, PeriodSales, SalesMeasureId } from "@/@types/Modules/VisaoGeral/Dashboard/sales-measure";

export function buildMeasureSummary(id: SalesMeasureId, current: PeriodSales, previous: PeriodSales): MeasureSummary {
  return {
    total: current.totals[id],
    previousTotal: previous.totals[id],
    series: current.series.map((totals) => totals[id]),
    previousSeries: previous.series.map((totals) => totals[id]),
  };
}
