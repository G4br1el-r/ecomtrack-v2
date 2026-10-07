"use client";

import { useEffect, useRef, useState } from "react";

import { isScrolledToEnd } from "@/lib/Modules/Core/Shell/is-scrolled-to-end";

export function useScrollEnd<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [atEnd, setAtEnd] = useState(true);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const update = () => setAtEnd(isScrolledToEnd(element));
    update();
    element.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => {
      element.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, []);

  return { ref, atEnd };
}
