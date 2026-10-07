import type { NetResult } from "@/@types/Modules/Catalogo/EsteiraCadastro/pricing";
import { Badge } from "@/components/ui/badge";
import { EMPTY_VALUE } from "@/constants/Modules/Core/DesignSystem/number-format";
import { getMarginTone } from "@/lib/Modules/Catalogo/EsteiraCadastro/get-margin-tone";
import { formatNumber } from "@/lib/Modules/Core/DesignSystem/format-number";

export function MarginCell({ result }: { result: NetResult | null }) {
  if (result === null) {
    return <span className="block text-right text-muted-foreground">{EMPTY_VALUE}</span>;
  }
  return (
    <div className="flex flex-col items-end gap-0.5">
      <Badge variant={getMarginTone(result.margin)} className="tabular-nums">
        {formatNumber(result.margin, "percent")}
      </Badge>
      <span className="text-[11px] text-muted-foreground tabular-nums">{formatNumber(result.profit, "currency")}</span>
    </div>
  );
}
