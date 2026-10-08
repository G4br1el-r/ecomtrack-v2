import { ShoppingBag } from "lucide-react";

import { APP_NAME } from "@/constants/Modules/Core/Shell/navigation";

export function LoginBrandMark() {
  return (
    <div className="flex flex-col items-center gap-3">
      <span className="grid size-16 place-items-center rounded-full bg-primary-foreground text-brand-from shadow-overlay lg:size-20">
        <ShoppingBag className="size-8 lg:size-10" aria-hidden="true" />
      </span>
      <span className="font-semibold text-2xl tracking-tight lg:text-3xl">{APP_NAME}</span>
    </div>
  );
}
