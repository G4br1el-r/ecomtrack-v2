"use client";

import { format, parseISO } from "date-fns";
import { Info } from "lucide-react";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/animate-ui/components/radix/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import { CURRENCY_NAME, EXCHANGE_RATES_UPDATED_AT_FORMAT } from "@/constants/Modules/Catalogo/EsteiraCadastro/pipeline";
import { useExchangeRates } from "@/hooks/Modules/Catalogo/EsteiraCadastro/use-exchange-rates";
import { formatNumber } from "@/lib/Modules/Core/DesignSystem/format-number";

export function ExchangeRates() {
  const { data, isPending, isError } = useExchangeRates();

  if (isPending) return <Skeleton className="h-9 w-80" />;
  if (isError) return <p className="text-xs text-muted-foreground">Cotações indisponíveis no momento.</p>;

  return (
    <section
      aria-label="Cotações do dia"
      className="flex h-9 shrink-0 items-center gap-3 rounded-md border border-input bg-background pr-1.5 pl-4 text-xs shadow-xs"
    >
      <span className="flex items-center gap-2 font-medium">
        <span aria-hidden="true" className="size-1.5 rounded-full bg-success" />
        Cotações
      </span>
      <dl className="flex items-center gap-3">
        {data.rates.map((rate) => (
          <div key={rate.currency} className="flex items-baseline gap-1">
            <dt className="text-muted-foreground">
              <abbr title={CURRENCY_NAME[rate.currency]} className="no-underline">
                {rate.currency}
              </abbr>
            </dt>
            <dd className="font-medium tabular-nums">{formatNumber(rate.rate, "currency")}</dd>
          </div>
        ))}
      </dl>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            aria-label="Origem das cotações"
            className="grid size-6 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Info className="size-3.5" aria-hidden="true" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="space-y-0.5 text-xs">
          <p>
            <span className="font-medium">Fonte:</span> {data.source}
          </p>
          <p>
            <span className="font-medium">Atualizado em:</span>{" "}
            {format(parseISO(data.updatedAt), EXCHANGE_RATES_UPDATED_AT_FORMAT)}
          </p>
        </TooltipContent>
      </Tooltip>
    </section>
  );
}
