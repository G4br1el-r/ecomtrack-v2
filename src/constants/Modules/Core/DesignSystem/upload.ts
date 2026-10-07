const BYTES_PER_KILOBYTE = 1024;
const MAX_FILE_SIZE_MEGABYTES = 5;

export const FILE_SIZE_UNIT_STEP = BYTES_PER_KILOBYTE;
export const FILE_SIZE_UNITS = ["B", "KB", "MB", "GB"] as const;
export const FILE_SIZE_DECIMALS = 1;

export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MEGABYTES * BYTES_PER_KILOBYTE * BYTES_PER_KILOBYTE;
export const MAX_FILES = 5;
export const ACCEPTED_FILE_EXTENSIONS = [".csv", ".xlsx", ".pdf", ".png", ".jpg"] as const;

export const UPLOAD_PROGRESS_STEP = 20;
export const UPLOAD_PROGRESS_INTERVAL_MS = 250;
export const UPLOAD_PROGRESS_COMPLETE = 100;
