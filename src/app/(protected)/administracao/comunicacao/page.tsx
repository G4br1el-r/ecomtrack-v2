import type { Metadata } from "next";

import { PageHeader } from "@/components/Modules/Core/DesignSystem/page-header";

import { CommunicationTabs } from "./components/communication-tabs";

export const metadata: Metadata = {
  title: "Comunicação",
  description: "E-mails que o sistema envia e a conta usada para enviá-los.",
};

export default function CommunicationPage() {
  return (
    <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-6 p-4 md:p-6 lg:p-8">
      <PageHeader
        title="Comunicação"
        description="Personalize os e-mails que o sistema envia e configure a conta de envio."
      />
      <CommunicationTabs />
    </div>
  );
}
