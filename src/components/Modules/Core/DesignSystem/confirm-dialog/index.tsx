import { type LucideIcon, Trash2 } from "lucide-react";

import type { ActionState } from "@/@types/Modules/Core/DesignSystem/action-state";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/animate-ui/components/radix/alert-dialog";

import { ActionButton } from "../action-button";

export function ConfirmDialog({
  trigger,
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  destructive = false,
  icon: Icon = Trash2,
  state = "idle",
  onConfirm,
}: {
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  icon?: LucideIcon;
  state?: ActionState;
  onConfirm: () => void;
}) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      {trigger ? <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger> : null}
      <AlertDialogContent>
        <AlertDialogHeader>
          {destructive ? (
            <span className="mb-2 grid size-10 place-items-center rounded-full bg-destructive-soft text-destructive">
              <Icon className="size-5" aria-hidden="true" />
            </span>
          ) : null}
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={state !== "idle"}>{cancelLabel}</AlertDialogCancel>
          <ActionButton variant={destructive ? "destructive" : "default"} state={state} onClick={onConfirm}>
            {confirmLabel}
          </ActionButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
