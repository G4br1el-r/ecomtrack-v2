"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { useState } from "react";
import { MotionProvider } from "@/components/Modules/Core/DesignSystem/motion-provider";
import { PreferencesHydrator } from "@/components/Modules/Core/DesignSystem/preferences-hydrator";
import { Toaster } from "@/components/ui/sonner";
import { QUERY_STALE_TIME_MS } from "@/constants/Modules/Core/Shell/query-client";
import { shouldRetryQuery } from "@/lib/Modules/Core/Api/should-retry-query";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { staleTime: QUERY_STALE_TIME_MS, retry: shouldRetryQuery } },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
        <MotionProvider>
          {children}
          <Toaster />
          <PreferencesHydrator />
        </MotionProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
