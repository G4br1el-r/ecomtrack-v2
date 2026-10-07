"use client";

import { CheckCircle2, FileText, X } from "lucide-react";
import { motion } from "motion/react";

import type { UploadItem } from "@/@types/Modules/Core/DesignSystem/file-upload";
import { Progress } from "@/components/animate-ui/components/radix/progress";
import { Button } from "@/components/ui/button";
import { ENTER_OFFSET_Y, SPRING_SOFT } from "@/constants/Modules/Core/DesignSystem/motion";
import { UPLOAD_PROGRESS_COMPLETE } from "@/constants/Modules/Core/DesignSystem/upload";
import { formatFileSize } from "@/lib/Modules/Core/DesignSystem/format-file-size";

export function UploadFileRow({ item, onRemove }: { item: UploadItem; onRemove: (id: string) => void }) {
  const done = item.progress >= UPLOAD_PROGRESS_COMPLETE;
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: ENTER_OFFSET_Y }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0, marginTop: 0 }}
      transition={SPRING_SOFT}
      className="flex items-center gap-3 overflow-hidden rounded-lg border bg-card px-3 py-2.5"
    >
      <span className="grid size-8 shrink-0 place-items-center rounded-md bg-muted">
        <FileText className="size-4 text-muted-foreground" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1 space-y-1.5">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-sm font-medium">{item.name}</p>
          <span className="shrink-0 text-xs text-muted-foreground tabular-nums">{formatFileSize(item.size)}</span>
        </div>
        {done ? (
          <p className="flex items-center gap-1 text-xs text-success">
            <CheckCircle2 className="size-3" aria-hidden="true" />
            Enviado
          </p>
        ) : (
          <Progress value={item.progress} className="h-1" aria-label={`Enviando ${item.name}`} />
        )}
      </div>
      <Button variant="ghost" size="icon-xs" aria-label={`Remover ${item.name}`} onClick={() => onRemove(item.id)}>
        <X aria-hidden="true" />
      </Button>
    </motion.li>
  );
}
