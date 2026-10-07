"use client";

import { UploadCloud } from "lucide-react";
import { motion } from "motion/react";
import { useId, useRef, useState } from "react";

import type { FileRejection } from "@/@types/Modules/Core/DesignSystem/file-upload";
import { DRAG_SCALE, SPRING_SNAPPY } from "@/constants/Modules/Core/DesignSystem/motion";
import { ACCEPTED_FILE_EXTENSIONS, MAX_FILE_SIZE_BYTES, MAX_FILES } from "@/constants/Modules/Core/DesignSystem/upload";
import { formatFileSize } from "@/lib/Modules/Core/DesignSystem/format-file-size";
import { validateFiles } from "@/lib/Modules/Core/DesignSystem/validate-files";
import { cn } from "@/lib/utils";

export function FileDropzone({
  selectedCount,
  onAccepted,
  onRejected,
}: {
  selectedCount: number;
  onAccepted: (files: File[]) => void;
  onRejected: (rejections: FileRejection[]) => void;
}) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFiles = (list: FileList | null) => {
    if (!list) return;
    const { accepted, rejected } = validateFiles(Array.from(list), selectedCount);
    if (accepted.length > 0) onAccepted(accepted);
    if (rejected.length > 0) onRejected(rejected);
  };

  return (
    <motion.label
      htmlFor={inputId}
      animate={{ scale: dragging ? DRAG_SCALE : 1 }}
      transition={SPRING_SNAPPY}
      onDragOver={(event) => {
        event.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(event) => {
        event.preventDefault();
        setDragging(false);
        handleFiles(event.dataTransfer.files);
      }}
      className={cn(
        "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border border-dashed px-6 py-10 text-center transition-colors",
        "hover:border-foreground/30 hover:bg-muted/40 has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-ring/50",
        dragging && "border-primary bg-primary/5",
      )}
    >
      <span
        className={cn(
          "grid size-10 place-items-center rounded-lg border bg-card shadow-xs transition-colors",
          dragging && "border-primary text-primary",
        )}
      >
        <UploadCloud className="size-5" aria-hidden="true" />
      </span>
      <div className="space-y-1">
        <p className="text-sm font-medium">
          {dragging ? "Solte para enviar" : "Arraste arquivos ou clique para selecionar"}
        </p>
        <p className="text-xs text-muted-foreground">
          {ACCEPTED_FILE_EXTENSIONS.join(", ")} · até {formatFileSize(MAX_FILE_SIZE_BYTES)} · máximo {MAX_FILES}{" "}
          arquivos
        </p>
      </div>
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        multiple
        accept={ACCEPTED_FILE_EXTENSIONS.join(",")}
        className="sr-only"
        onChange={(event) => {
          handleFiles(event.target.files);
          if (inputRef.current) inputRef.current.value = "";
        }}
      />
    </motion.label>
  );
}
