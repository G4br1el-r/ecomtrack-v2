import type { Metadata } from "next";

import { DesignSystemShowcase } from "@/designsystem/showcase";

export const metadata: Metadata = {
  title: "Componentes",
  description: "Design system do EcomTrack: tokens, componentes e padrões de interface.",
};

export default function ComponentsPage() {
  return <DesignSystemShowcase />;
}
