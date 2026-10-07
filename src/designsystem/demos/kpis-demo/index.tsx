"use client";

import { RotateCcw } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { KpiCard } from "@/components/Modules/Core/DesignSystem/kpi-card";
import { KpiCardSkeleton } from "@/components/Modules/Core/DesignSystem/kpi-card-skeleton";
import { Button } from "@/components/ui/button";
import { DURATION_BASE } from "@/constants/Modules/Core/DesignSystem/motion";

import { wait } from "../../helpers/wait";
import { DEMO_LATENCY_MS } from "../../mocks/demo";
import { KPIS } from "../../mocks/kpis";

export function KpisDemo() {
  const [loading, setLoading] = useState(false);
  const [run, setRun] = useState(0);

  const reload = async () => {
    setLoading(true);
    await wait(DEMO_LATENCY_MS);
    setLoading(false);
    setRun((value) => value + 1);
  };

  return (
    <div className="w-full space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AnimatePresence initial={false}>
          {KPIS.map((kpi) => (
            <motion.div
              key={`${kpi.id}-${loading ? "skeleton" : run}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: DURATION_BASE }}
            >
              {loading ? <KpiCardSkeleton /> : <KpiCard kpi={kpi} />}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <Button variant="outline" size="sm" disabled={loading} onClick={reload}>
        <RotateCcw data-icon="inline-start" aria-hidden="true" />
        Recarregar (skeleton → números animados)
      </Button>
    </div>
  );
}
