"use client";

import { useState } from "react";

import { Stepper } from "@/components/Modules/Core/DesignSystem/stepper";
import { Button } from "@/components/ui/button";

import { IMPORT_STEPS } from "../../mocks/steps";

export function StepperDemo() {
  const [current, setCurrent] = useState(1);
  const lastIndex = IMPORT_STEPS.length;
  return (
    <div className="w-full space-y-5">
      <Stepper steps={IMPORT_STEPS} current={current} />
      <div className="flex justify-end gap-2">
        <Button variant="outline" size="sm" disabled={current === 0} onClick={() => setCurrent((value) => value - 1)}>
          Voltar
        </Button>
        <Button size="sm" disabled={current === lastIndex} onClick={() => setCurrent((value) => value + 1)}>
          {current >= lastIndex - 1 ? "Concluir" : "Continuar"}
        </Button>
      </div>
    </div>
  );
}
