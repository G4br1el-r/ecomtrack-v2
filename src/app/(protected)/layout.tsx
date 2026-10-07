import { AppShell } from "@/components/Modules/Core/Shell/app-shell";
import { SessionGate } from "@/components/Modules/Core/Shell/session-gate";

export default function ProtectedLayout({ children }: LayoutProps<"/">) {
  return (
    <SessionGate>
      <AppShell>{children}</AppShell>
    </SessionGate>
  );
}
