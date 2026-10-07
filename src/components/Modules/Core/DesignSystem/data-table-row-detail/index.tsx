"use client";

import { motion } from "motion/react";

import { TableCell, TableRow } from "@/components/ui/table";
import { DURATION_FAST, SPRING_SOFT } from "@/constants/Modules/Core/DesignSystem/motion";

const MotionTableRow = motion.create(TableRow);

export function DataTableRowDetail({ colSpan, children }: { colSpan: number; children: React.ReactNode }) {
  return (
    <MotionTableRow
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: DURATION_FAST }}
      className="bg-muted/30 hover:bg-muted/30"
    >
      <TableCell colSpan={colSpan} className="p-0 whitespace-normal">
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          exit={{ height: 0 }}
          transition={SPRING_SOFT}
          className="overflow-clip"
        >
          <div className="sticky left-0 max-w-3xl p-4">{children}</div>
        </motion.div>
      </TableCell>
    </MotionTableRow>
  );
}
