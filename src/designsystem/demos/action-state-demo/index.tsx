"use client";

import { Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import type { ActionState } from "@/@types/Modules/Core/DesignSystem/action-state";
import { ActionButton } from "@/components/Modules/Core/DesignSystem/action-button";
import { DEMO_LOADING_DELAY_MS, SUCCESS_STATE_DURATION_MS } from "@/constants/Modules/Core/DesignSystem/ui";

import { wait } from "../../helpers/wait";

export function ActionStateDemo() {
  const [state, setState] = useState<ActionState>("idle");

  const handleSave = async () => {
    setState("loading");
    await wait(DEMO_LOADING_DELAY_MS);
    setState("success");
    toast.success("Alterações salvas");
    await wait(SUCCESS_STATE_DURATION_MS);
    setState("idle");
  };

  return (
    <ActionButton state={state} loadingText="Salvando..." successText="Salvo" onClick={handleSave}>
      <Save data-icon="inline-start" aria-hidden="true" />
      Salvar alterações
    </ActionButton>
  );
}
