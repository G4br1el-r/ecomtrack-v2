import type { Metadata } from "next";

import { AuditWorkspace } from "./components/audit-workspace";

export const metadata: Metadata = {
  title: "Auditoria",
  description: "Tudo o que foi feito na empresa: quem, quando, onde e o que mudou.",
};

export default function AuditPage() {
  return (
    <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-6 p-4 md:p-6 lg:p-8">
      <AuditWorkspace />
    </div>
  );
}
