import { SECURITY_PIN_ERROR_CODES, SECURITY_PIN_RETRY_CODES } from "@/constants/Modules/Core/Access/security-pin";
import { readApiErrorCode } from "@/lib/Modules/Core/Api/read-api-error-code";
import type { PinType } from "@/schemas/Modules/Core/Conta/pin-type-schema";
import { useSecurityPinStore } from "@/store/Modules/Core/Access/security-pin-store";

export async function retryWithSecurityPin(
  type: PinType,
  first: Response | null,
  send: () => Promise<Response | null>,
): Promise<Response | null> {
  let response = first;
  let code = await readApiErrorCode(response);
  while (code && SECURITY_PIN_RETRY_CODES.includes(code)) {
    useSecurityPinStore.getState().forget(type);
    const mode = code === SECURITY_PIN_ERROR_CODES.invalid ? "invalid" : "ask";
    const pin = await useSecurityPinStore.getState().request(type, mode);
    if (!pin) return response;
    response = await send();
    code = await readApiErrorCode(response);
  }
  if (code === SECURITY_PIN_ERROR_CODES.notCreated) void useSecurityPinStore.getState().request(type, "missing");
  return response;
}
