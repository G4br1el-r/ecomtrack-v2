"use client";

import { useState } from "react";

import { Checkbox } from "@/components/animate-ui/components/radix/checkbox";
import { FilterSheet } from "@/components/Modules/Core/DesignSystem/filter-sheet";
import { Field, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";

import { FILTER_STATUS_OPTIONS } from "../../mocks/demo";
import { ChannelComboboxDemo } from "../channel-combobox-demo";
import { PeriodFieldDemo } from "../period-field-demo";

export function FilterSheetDemo() {
  const [open, setOpen] = useState(false);
  const [statuses, setStatuses] = useState<string[]>(["Pago"]);
  return (
    <FilterSheet open={open} onOpenChange={setOpen} activeCount={statuses.length} onClear={() => setStatuses([])}>
      <FieldGroup>
        <FieldSet>
          <FieldLegend variant="label">Status</FieldLegend>
          {FILTER_STATUS_OPTIONS.map((status) => (
            <Field key={status} orientation="horizontal">
              <Checkbox
                id={`filtro-${status}`}
                checked={statuses.includes(status)}
                onCheckedChange={(checked) =>
                  setStatuses((current) =>
                    checked === true ? [...current, status] : current.filter((item) => item !== status),
                  )
                }
              />
              <FieldLabel htmlFor={`filtro-${status}`} className="font-normal">
                {status}
              </FieldLabel>
            </Field>
          ))}
        </FieldSet>
        <Field>
          <FieldLabel htmlFor="filtro-canal">Canal</FieldLabel>
          <ChannelComboboxDemo id="filtro-canal" />
        </Field>
        <Field>
          <FieldLabel>Período</FieldLabel>
          <PeriodFieldDemo />
        </Field>
      </FieldGroup>
    </FilterSheet>
  );
}
