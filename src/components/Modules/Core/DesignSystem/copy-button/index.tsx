"use client";

import { Check, Copy } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/animate-ui/components/radix/tooltip";
import { Button } from "@/components/ui/button";
import { DURATION_FAST, POP_SCALE } from "@/constants/Modules/Core/DesignSystem/motion";
import { useCopyToClipboard } from "@/hooks/Modules/Core/DesignSystem/use-copy-to-clipboard";

export function CopyButton({ value, label = "Copiar" }: { value: string; label?: string }) {
  const { copied, copy } = useCopyToClipboard();
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon-xs" aria-label={label} onClick={() => copy(value)}>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={copied ? "check" : "copy"}
              initial={{ opacity: 0, scale: POP_SCALE }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: POP_SCALE }}
              transition={{ duration: DURATION_FAST }}
              className="grid place-items-center"
            >
              {copied ? <Check className="text-success" aria-hidden="true" /> : <Copy aria-hidden="true" />}
            </motion.span>
          </AnimatePresence>
        </Button>
      </TooltipTrigger>
      <TooltipContent>{copied ? "Copiado" : label}</TooltipContent>
    </Tooltip>
  );
}
