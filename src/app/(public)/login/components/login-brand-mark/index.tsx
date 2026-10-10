import { APP_NAME } from "@/constants/Modules/Core/Shell/navigation";

import { LoginDrawnIcon } from "../login-drawn-icon";

export function LoginBrandMark() {
  return (
    <div className="flex items-center gap-3">
      <span className="grid size-10 place-items-center rounded-xl bg-primary-foreground text-brand-from shadow-overlay">
        <LoginDrawnIcon name="brand" className="size-5" />
      </span>
      <span className="font-semibold text-xl tracking-tight">{APP_NAME}</span>
    </div>
  );
}
