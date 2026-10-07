import { INTENSITY_STEP_CLASSES } from "@/constants/Modules/Core/DesignSystem/intensity";
import { cn } from "@/lib/utils";

export function IntensityLegend() {
  return (
    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
      Menos
      {INTENSITY_STEP_CLASSES.map((stepClass) => (
        <span key={stepClass} aria-hidden="true" className={cn("size-3 rounded-[3px]", stepClass)} />
      ))}
      Mais
    </div>
  );
}
