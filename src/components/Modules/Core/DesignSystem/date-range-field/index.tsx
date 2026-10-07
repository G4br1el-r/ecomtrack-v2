"use client";

import { addYears, startOfMonth, subYears } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarDays, RotateCcw } from "lucide-react";
import { useState } from "react";

import type { DateRange } from "@/@types/Modules/Core/DesignSystem/date-range";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/animate-ui/components/radix/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  CALENDAR_MONTHS_VISIBLE,
  CALENDAR_YEARS_AFTER,
  CALENDAR_YEARS_BEFORE,
} from "@/constants/Modules/Core/DesignSystem/ui";
import { findActivePreset } from "@/lib/Modules/Core/DesignSystem/find-active-preset";
import { formatPeriodLabel } from "@/lib/Modules/Core/DesignSystem/format-period-label";
import { resolvePeriodPreset } from "@/lib/Modules/Core/DesignSystem/resolve-period-preset";
import { cn } from "@/lib/utils";

import { PeriodPresetList } from "../period-preset-list";

export function DateRangeField({
  value,
  onChange,
  defaultRange = {},
  today = new Date(),
  className,
}: {
  value: DateRange;
  onChange: (range: DateRange) => void;
  defaultRange?: DateRange;
  today?: Date;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<DateRange>(value);
  const [month, setMonth] = useState<Date>(startOfMonth(value.from ?? today));

  const applyDraft = (range: DateRange) => {
    setDraft(range);
    if (range.from) setMonth(startOfMonth(range.from));
  };

  return (
    <Popover
      open={open}
      onOpenChange={(nextOpen) => {
        if (nextOpen) applyDraft(value);
        setOpen(nextOpen);
      }}
    >
      <PopoverTrigger asChild>
        <Button variant="outline" className={cn("min-w-0 justify-start font-normal", className)}>
          <CalendarDays data-icon="inline-start" className="text-muted-foreground" aria-hidden="true" />
          <span className="truncate">{formatPeriodLabel(value)}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[min(46rem,calc(100vw-2rem))] p-0">
        <div className="flex flex-col sm:flex-row">
          <div className="shrink-0 border-b p-3 sm:w-48 sm:border-r sm:border-b-0">
            <p className="mb-2 px-2.5 text-xs font-medium tracking-wide text-muted-foreground uppercase">Períodos</p>
            <PeriodPresetList
              activeId={findActivePreset(draft, today)}
              onSelect={(id) => applyDraft(resolvePeriodPreset(id, today))}
            />
          </div>
          <div className="min-w-0 flex-1 p-4">
            <Calendar
              mode="range"
              locale={ptBR}
              captionLayout="dropdown"
              numberOfMonths={CALENDAR_MONTHS_VISIBLE}
              startMonth={subYears(today, CALENDAR_YEARS_BEFORE)}
              endMonth={addYears(today, CALENDAR_YEARS_AFTER)}
              month={month}
              onMonthChange={setMonth}
              selected={draft.from ? { from: draft.from, to: draft.to } : undefined}
              onSelect={(range) => setDraft({ from: range?.from, to: range?.to })}
              className="mx-auto p-0"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 border-t px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <Button
            variant="ghost"
            size="sm"
            className="justify-start text-muted-foreground"
            onClick={() => applyDraft(defaultRange)}
          >
            <RotateCcw data-icon="inline-start" aria-hidden="true" />
            Restaurar padrão
          </Button>
          <div className="flex items-center justify-end gap-2">
            <span className="mr-2 hidden text-sm text-muted-foreground tabular-nums sm:inline">
              {formatPeriodLabel(draft)}
            </span>
            <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button
              size="sm"
              disabled={!draft.from}
              onClick={() => {
                onChange(draft);
                setOpen(false);
              }}
            >
              Aplicar
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
