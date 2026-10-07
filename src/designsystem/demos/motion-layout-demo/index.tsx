"use client";

import { ArrowDownUp } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { SPRING_SNAPPY } from "@/constants/Modules/Core/DesignSystem/motion";
import { cn } from "@/lib/utils";

import { DEMO_REORDER_ITEMS } from "../../mocks/demo";

export function MotionLayoutDemo() {
  const [items, setItems] = useState(DEMO_REORDER_ITEMS);
  return (
    <div className="w-full space-y-3">
      <ul className="space-y-2">
        {items.map((item) => (
          <motion.li
            key={item.id}
            layout
            transition={SPRING_SNAPPY}
            className="flex items-center gap-2 rounded-lg border bg-background px-3 py-2 text-sm shadow-xs"
          >
            <span className={cn("size-2 rounded-full", item.tone)} />
            {item.label}
          </motion.li>
        ))}
      </ul>
      <Button variant="outline" size="sm" onClick={() => setItems((current) => [...current].reverse())}>
        <ArrowDownUp data-icon="inline-start" aria-hidden="true" />
        Reordenar
      </Button>
    </div>
  );
}
