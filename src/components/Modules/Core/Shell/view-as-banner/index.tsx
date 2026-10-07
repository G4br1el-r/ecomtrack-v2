"use client";

import { Eye, LogOut } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { DURATION_BASE, EASE_OUT } from "@/constants/Modules/Core/DesignSystem/motion";
import { useViewAs } from "@/hooks/Modules/Core/Access/use-view-as";
import { formatDisplayTime } from "@/lib/Modules/Core/DesignSystem/format-display-time";
import { useViewAsStore } from "@/store/Modules/Core/Access/view-as-store";

export function ViewAsBanner() {
  const session = useViewAsStore((state) => state.session);
  const { exit } = useViewAs();

  return (
    <AnimatePresence initial={false}>
      {session ? (
        <motion.div
          role="status"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: DURATION_BASE, ease: EASE_OUT }}
          className="overflow-hidden border-warning/30 border-b bg-warning-soft text-warning-foreground dark:text-warning"
        >
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 px-4 py-2 text-sm">
            <Eye className="size-4 shrink-0" aria-hidden="true" />
            <p className="min-w-0 flex-1">
              Visualizando como <strong className="font-medium">{session.label}</strong>. Somente leitura, até{" "}
              {formatDisplayTime(session.expiresAt)}.
            </p>
            <Button size="sm" variant="outline" className="h-7 bg-background" onClick={exit}>
              <LogOut data-icon="inline-start" aria-hidden="true" />
              Sair da visualização
            </Button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
