"use client";

import { Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { DURATION_FAST, ICON_ROTATION_DEGREES } from "@/constants/Modules/Core/DesignSystem/motion";
import { useIsMounted } from "@/hooks/Modules/Core/DesignSystem/use-is-mounted";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useIsMounted();
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      aria-label={isDark ? "Usar tema claro" : "Usar tema escuro"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {mounted ? (
          <motion.span
            key={isDark ? "moon" : "sun"}
            initial={{ opacity: 0, rotate: -ICON_ROTATION_DEGREES }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: ICON_ROTATION_DEGREES }}
            transition={{ duration: DURATION_FAST }}
            className="grid place-items-center"
          >
            {isDark ? <Moon aria-hidden="true" /> : <Sun aria-hidden="true" />}
          </motion.span>
        ) : null}
      </AnimatePresence>
    </Button>
  );
}
