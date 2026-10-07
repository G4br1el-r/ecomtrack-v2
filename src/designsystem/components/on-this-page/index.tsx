"use client";

import { motion } from "motion/react";

import { SPRING_SNAPPY } from "@/constants/Modules/Core/DesignSystem/motion";
import { useActiveSection } from "@/hooks/Modules/Core/DesignSystem/use-active-section";
import { cn } from "@/lib/utils";

import { SHOWCASE_SECTION_IDS, SHOWCASE_SECTIONS } from "../../mocks/sections";

export function OnThisPage() {
  const activeId = useActiveSection(SHOWCASE_SECTION_IDS);
  return (
    <nav aria-label="Nesta página" className="sticky top-20 hidden h-fit w-44 shrink-0 xl:block">
      <p className="mb-2 px-3 text-xs font-medium tracking-wide text-muted-foreground uppercase">Nesta página</p>
      <ul className="relative space-y-0.5 border-l">
        {SHOWCASE_SECTIONS.map((section) => {
          const isActive = activeId === section.id;
          return (
            <li key={section.id} className="relative">
              {isActive ? (
                <motion.span
                  layoutId="on-this-page-indicator"
                  transition={SPRING_SNAPPY}
                  className="absolute inset-y-0 -left-px w-px bg-foreground"
                />
              ) : null}
              <a
                href={`#${section.id}`}
                className={cn(
                  "block px-3 py-1 text-sm transition-colors hover:text-foreground",
                  isActive ? "font-medium text-foreground" : "text-muted-foreground",
                )}
              >
                {section.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
