"use client";

import { motion } from "motion/react";

import { REGISTRATION_STEPS_TOTAL } from "@/constants/Modules/Catalogo/EsteiraCadastro/pipeline";
import { SPRING_SOFT } from "@/constants/Modules/Core/DesignSystem/motion";
import { PERCENT_SCALE } from "@/constants/Modules/Core/DesignSystem/number-format";
import { getShare } from "@/lib/Modules/Core/DesignSystem/get-share";
import { cn } from "@/lib/utils";

export function RegistrationProgressCell({ completedSteps }: { completedSteps: number }) {
  const complete = completedSteps >= REGISTRATION_STEPS_TOTAL;
  return (
    <div className="flex min-w-24 flex-col gap-1.5">
      <span className="text-xs text-muted-foreground tabular-nums">
        <span className="font-medium text-foreground">{completedSteps}</span> de {REGISTRATION_STEPS_TOTAL} passos
      </span>
      <div
        className="h-1.5 w-full overflow-hidden rounded-full bg-muted"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={REGISTRATION_STEPS_TOTAL}
        aria-valuenow={completedSteps}
        aria-label="Progresso do cadastro"
      >
        <motion.div
          className={cn("h-full rounded-full", complete ? "bg-success" : "bg-primary")}
          initial={{ width: 0 }}
          animate={{ width: `${getShare(completedSteps, REGISTRATION_STEPS_TOTAL) * PERCENT_SCALE}%` }}
          transition={SPRING_SOFT}
        />
      </div>
    </div>
  );
}
