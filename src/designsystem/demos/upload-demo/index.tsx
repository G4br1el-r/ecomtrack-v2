"use client";

import { AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import type { UploadItem } from "@/@types/Modules/Core/DesignSystem/file-upload";
import { FileDropzone } from "@/components/Modules/Core/DesignSystem/file-dropzone";
import { UploadFileRow } from "@/components/Modules/Core/DesignSystem/upload-file-row";
import {
  UPLOAD_PROGRESS_COMPLETE,
  UPLOAD_PROGRESS_INTERVAL_MS,
  UPLOAD_PROGRESS_STEP,
} from "@/constants/Modules/Core/DesignSystem/upload";

const REJECTION_MESSAGES = {
  type: "Formato não aceito",
  size: "Arquivo maior que o limite",
  limit: "Limite de arquivos atingido",
} as const;

export function UploadDemo() {
  const [items, setItems] = useState<UploadItem[]>([]);
  const uploading = items.some((item) => item.progress < UPLOAD_PROGRESS_COMPLETE);

  useEffect(() => {
    if (!uploading) return;
    const interval = window.setInterval(() => {
      setItems((current) =>
        current.map((item) => ({
          ...item,
          progress: Math.min(item.progress + UPLOAD_PROGRESS_STEP, UPLOAD_PROGRESS_COMPLETE),
        })),
      );
    }, UPLOAD_PROGRESS_INTERVAL_MS);
    return () => window.clearInterval(interval);
  }, [uploading]);

  return (
    <div className="w-full space-y-3">
      <FileDropzone
        selectedCount={items.length}
        onAccepted={(files) =>
          setItems((current) => [
            ...current,
            ...files.map((file) => ({
              id: `${file.name}-${file.lastModified}`,
              name: file.name,
              size: file.size,
              progress: 0,
            })),
          ])
        }
        onRejected={(rejections) => {
          for (const rejection of rejections) {
            toast.error(REJECTION_MESSAGES[rejection.reason], { description: rejection.file.name });
          }
        }}
      />
      <ul className="space-y-2">
        <AnimatePresence initial={false}>
          {items.map((item) => (
            <UploadFileRow
              key={item.id}
              item={item}
              onRemove={(id) => setItems((current) => current.filter((entry) => entry.id !== id))}
            />
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
