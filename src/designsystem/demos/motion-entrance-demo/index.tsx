"use client";

import { RotateCcw } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ENTER_OFFSET_Y, SPRING_SOFT, STAGGER_CHILDREN } from "@/constants/Modules/Core/DesignSystem/motion";

import { DEMO_STAGGER_ITEMS } from "../../mocks/demo";

export function MotionEntranceDemo() {
  const [run, setRun] = useState(0);
  return (
    <div className="w-full space-y-3">
      <motion.ul
        key={run}
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: STAGGER_CHILDREN } } }}
        className="space-y-2"
      >
        {DEMO_STAGGER_ITEMS.map((item) => (
          <motion.li
            key={item}
            variants={{ hidden: { opacity: 0, y: ENTER_OFFSET_Y }, visible: { opacity: 1, y: 0 } }}
            transition={SPRING_SOFT}
            className="rounded-lg border bg-background px-3 py-2 text-sm shadow-xs"
          >
            {item}
          </motion.li>
        ))}
      </motion.ul>
      <Button variant="outline" size="sm" onClick={() => setRun((value) => value + 1)}>
        <RotateCcw data-icon="inline-start" aria-hidden="true" />
        Repetir
      </Button>
    </div>
  );
}
