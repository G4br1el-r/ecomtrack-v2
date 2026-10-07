export type FileRejectionReason = "type" | "size" | "limit";

export type FileRejection = {
  file: File;
  reason: FileRejectionReason;
};

export type FileValidationResult = {
  accepted: File[];
  rejected: FileRejection[];
};

export type UploadItem = {
  id: string;
  name: string;
  size: number;
  progress: number;
};
