export const SECURITY_PIN_ERROR_CODES = {
  required: "PIN01",
  notCreated: "PIN02",
  invalid: "PIN03",
  locked: "PIN04",
  blocked: "PIN05",
} as const;

export const SECURITY_PIN_RETRY_CODES: readonly string[] = [
  SECURITY_PIN_ERROR_CODES.required,
  SECURITY_PIN_ERROR_CODES.invalid,
];
