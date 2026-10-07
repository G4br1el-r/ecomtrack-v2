import type { Currency } from "@/@types/Modules/Catalogo/EsteiraCadastro/pipeline-product";
import { NumberCell } from "@/components/Modules/Core/DesignSystem/number-cell";
import { formatForeignAmount } from "@/lib/Modules/Core/DesignSystem/format-foreign-amount";

export function SupplierCostCell({
  cost,
  supplierCost,
  currency,
}: {
  cost: number;
  supplierCost: number;
  currency: Currency;
}) {
  return (
    <div className="flex flex-col items-end">
      <NumberCell value={cost > 0 ? cost : null} kind="currency" />
      {currency === "BRL" ? null : (
        <span className="font-mono text-[11px] text-muted-foreground tabular-nums">
          {formatForeignAmount(supplierCost, currency)}
        </span>
      )}
    </div>
  );
}
