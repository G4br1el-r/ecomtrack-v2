import type { FileRejection, FileValidationResult } from "@/@types/Modules/Core/DesignSystem/file-upload";
import { ACCEPTED_FILE_EXTENSIONS, MAX_FILE_SIZE_BYTES, MAX_FILES } from "@/constants/Modules/Core/DesignSystem/upload";

export function validateFiles(files: File[], alreadySelected: number): FileValidationResult {
  const accepted: File[] = [];
  const rejected: FileRejection[] = [];
  for (const file of files) {
    const name = file.name.toLowerCase();
    if (!ACCEPTED_FILE_EXTENSIONS.some((extension) => name.endsWith(extension))) {
      rejected.push({ file, reason: "type" });
    } else if (file.size > MAX_FILE_SIZE_BYTES) {
      rejected.push({ file, reason: "size" });
    } else if (alreadySelected + accepted.length >= MAX_FILES) {
      rejected.push({ file, reason: "limit" });
    } else {
      accepted.push(file);
    }
  }
  return { accepted, rejected };
}
