import type { Metadata } from "next";

import { OwnerGuard } from "@/components/Modules/Core/Shell/owner-guard";

import { PlansWorkspace } from "./components/plans-workspace";

export const metadata: Metadata = {
  title: "Planos",
  description: "Planos da plataforma e o que cada um libera.",
};

export default function PlansPage() {
  return (
    <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-6 p-4 md:p-6 lg:p-8">
      <OwnerGuard>
        <PlansWorkspace />
      </OwnerGuard>
    </div>
  );
}
