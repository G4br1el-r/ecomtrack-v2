import { StaggerReveal } from "@/components/Modules/Core/DesignSystem/stagger-reveal";
import { StaggerRevealItem } from "@/components/Modules/Core/DesignSystem/stagger-reveal-item";

export function StatusScreen({
  illustration,
  eyebrow,
  title,
  description,
  children,
}: {
  illustration: React.ReactNode;
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 items-center overflow-hidden">
      <StaggerReveal className="mx-auto grid w-full max-w-5xl items-center gap-16 px-6 py-16 lg:grid-cols-2 lg:px-8">
        <StaggerRevealItem className="order-last lg:order-first">{illustration}</StaggerRevealItem>
        <div className="space-y-5 text-center lg:text-left">
          <StaggerRevealItem>{eyebrow}</StaggerRevealItem>
          <StaggerRevealItem className="space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{title}</h1>
            <p className="mx-auto max-w-md text-pretty text-muted-foreground lg:mx-0">{description}</p>
          </StaggerRevealItem>
          {children ? (
            <StaggerRevealItem className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              {children}
            </StaggerRevealItem>
          ) : null}
        </div>
      </StaggerReveal>
    </div>
  );
}
