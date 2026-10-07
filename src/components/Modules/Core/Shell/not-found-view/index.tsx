import { LayoutDashboard, Link2Off } from "lucide-react";
import Link from "next/link";

import type { NotFoundVariant } from "@/@types/Modules/Core/Shell/not-found";
import { StaggerReveal } from "@/components/Modules/Core/DesignSystem/stagger-reveal";
import { StaggerRevealItem } from "@/components/Modules/Core/DesignSystem/stagger-reveal-item";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { APP_NAME, HOME_HREF } from "@/constants/Modules/Core/Shell/navigation";
import {
  NOT_FOUND_COPY,
  NOT_FOUND_ERROR_PREFIX,
  NOT_FOUND_HOME_LABEL,
  NOT_FOUND_STATUS_CODES,
} from "@/constants/Modules/Core/Shell/not-found";

import { CurrentPathname } from "../current-pathname";
import { NotFoundGiftCard } from "../not-found-gift-card";

export function NotFoundView({ variant = "not-found" }: { variant?: NotFoundVariant }) {
  const copy = NOT_FOUND_COPY[variant];
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <header className="flex h-16 shrink-0 items-center px-6 lg:px-10">
        <Link href={HOME_HREF} className="text-xl font-bold text-primary">
          {APP_NAME}
        </Link>
      </header>
      <main className="flex flex-1 items-center justify-center overflow-hidden px-6 pb-16">
        <StaggerReveal className="flex w-full max-w-xl flex-col items-center text-center">
          <StaggerRevealItem>
            <NotFoundGiftCard variant={variant} />
          </StaggerRevealItem>
          <StaggerRevealItem className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <Badge variant="outline" className="font-mono">
              {NOT_FOUND_ERROR_PREFIX} {NOT_FOUND_STATUS_CODES[variant]}
            </Badge>
            <span className="inline-flex max-w-full items-center gap-1.5 font-mono text-xs text-muted-foreground">
              <Link2Off className="size-3.5 shrink-0" aria-hidden="true" />
              <CurrentPathname className="truncate" />
            </span>
          </StaggerRevealItem>
          <StaggerRevealItem className="mt-3 space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">{copy.title}</h1>
            <p className="mx-auto max-w-md text-pretty text-muted-foreground">{copy.description}</p>
          </StaggerRevealItem>
          <StaggerRevealItem className="mt-6">
            <Button asChild>
              <Link href={HOME_HREF}>
                <LayoutDashboard data-icon="inline-start" aria-hidden="true" />
                {NOT_FOUND_HOME_LABEL}
              </Link>
            </Button>
          </StaggerRevealItem>
        </StaggerReveal>
      </main>
    </div>
  );
}
