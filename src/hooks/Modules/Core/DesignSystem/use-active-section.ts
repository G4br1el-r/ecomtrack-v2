"use client";

import { useEffect, useState } from "react";

import { SCROLL_SPY_ROOT_MARGIN } from "@/constants/Modules/Core/DesignSystem/ui";

export function useActiveSection(ids: readonly string[]) {
  const [activeId, setActiveId] = useState<string | undefined>(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: SCROLL_SPY_ROOT_MARGIN },
    );
    for (const id of ids) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}
