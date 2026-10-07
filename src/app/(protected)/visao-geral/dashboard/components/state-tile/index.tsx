import { INTENSITY_STEP_CLASSES, INTENSITY_STRONG_FROM_STEP } from "@/constants/Modules/Core/DesignSystem/intensity";
import { cn } from "@/lib/utils";

export function StateTile({
  code,
  label,
  row,
  column,
  step,
  active,
  onActivate,
  onDeactivate,
}: {
  code: string;
  label: string;
  row: number;
  column: number;
  step: number;
  active: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      onPointerEnter={onActivate}
      onFocus={onActivate}
      onPointerLeave={onDeactivate}
      onBlur={onDeactivate}
      style={{ gridRowStart: row + 1, gridColumnStart: column + 1 }}
      className={cn(
        "grid aspect-square place-items-center rounded-md text-[11px] font-semibold transition-[transform,box-shadow] duration-150 outline-none hover:z-10 hover:scale-110 hover:ring-2 hover:ring-foreground/60 focus-visible:z-10 focus-visible:scale-110 focus-visible:ring-2 focus-visible:ring-ring active:scale-105",
        INTENSITY_STEP_CLASSES[step],
        step >= INTENSITY_STRONG_FROM_STEP ? "text-primary-foreground" : "text-foreground/80",
        active && "z-10 scale-110 ring-2 ring-foreground/60",
      )}
    >
      {code}
    </button>
  );
}
