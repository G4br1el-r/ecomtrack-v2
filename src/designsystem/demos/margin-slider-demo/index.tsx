"use client";

import { useState } from "react";

import { Field, FieldLabel } from "@/components/ui/field";
import { Slider } from "@/components/ui/slider";

import { DEMO_MARGIN_DEFAULT, DEMO_MARGIN_MAX, DEMO_MARGIN_STEP } from "../../mocks/demo";

export function MarginSliderDemo() {
  const [margin, setMargin] = useState(DEMO_MARGIN_DEFAULT);
  return (
    <Field>
      <FieldLabel htmlFor="margem">
        Margem mínima <span className="ml-auto font-mono text-xs text-muted-foreground tabular-nums">{margin[0]}%</span>
      </FieldLabel>
      <Slider id="margem" value={margin} onValueChange={setMargin} max={DEMO_MARGIN_MAX} step={DEMO_MARGIN_STEP} />
    </Field>
  );
}
