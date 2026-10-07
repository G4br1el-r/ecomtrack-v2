"use client";

import { toast } from "sonner";

import { ErrorState } from "@/components/Modules/Core/DesignSystem/error-state";

export function ErrorStateDemo() {
  return <ErrorState onRetry={() => toast.info("Tentando novamente...")} />;
}
