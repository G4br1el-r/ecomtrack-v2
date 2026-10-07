import { Showcase } from "../../components/showcase";
import { Specimen } from "../../components/specimen";
import { TokenCode } from "../../components/token-code";
import { ArchiveConfirmDemo } from "../../demos/archive-confirm-demo";
import { DeleteFlowDemo } from "../../demos/delete-flow-demo";
import { DetailSheetDemo } from "../../demos/detail-sheet-demo";
import { DialogFormDemo } from "../../demos/dialog-form-demo";
import { FilterSheetDemo } from "../../demos/filter-sheet-demo";
import { SideSheetsDemo } from "../../demos/side-sheets-demo";
import { OVERLAY_WIDTHS } from "../../mocks/demo";

export function OverlaysSection() {
  return (
    <Showcase
      id="overlays"
      title="Modais e sheets"
      description="Animate UI (Radix + Motion). Sheet para detalhe e filtros, Dialog para formulário curto, AlertDialog para confirmação."
    >
      <Specimen title="Larguras padronizadas" className="block divide-y p-0">
        {OVERLAY_WIDTHS.map((item) => (
          <div key={item.name} className="grid gap-2 px-5 py-3 md:grid-cols-[10rem_12rem_1fr]">
            <span className="text-sm font-medium">{item.name}</span>
            <TokenCode>{item.width}</TokenCode>
            <span className="text-sm text-muted-foreground">{item.usage}</span>
          </div>
        ))}
      </Specimen>
      <div className="grid gap-5 lg:grid-cols-2">
        <Specimen title="Sheets">
          <DetailSheetDemo />
          <FilterSheetDemo />
          <SideSheetsDemo />
        </Specimen>
        <Specimen title="Modais">
          <DialogFormDemo />
          <ArchiveConfirmDemo />
          <DeleteFlowDemo />
        </Specimen>
      </div>
    </Showcase>
  );
}
