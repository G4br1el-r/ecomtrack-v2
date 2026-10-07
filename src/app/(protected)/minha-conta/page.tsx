import type { Metadata } from "next";

import { PageHeader } from "@/components/Modules/Core/DesignSystem/page-header";
import { ACCOUNT_TAB_PARAM, ACCOUNT_TABS } from "@/constants/Modules/Core/Conta/account";

import { AccountTabs } from "./components/account-tabs";

export const metadata: Metadata = {
  title: "Minha conta",
  description: "Seus dados, sua senha e seus PINs de segurança.",
};

export default async function AccountPage({ searchParams }: PageProps<"/minha-conta">) {
  const tab = (await searchParams)[ACCOUNT_TAB_PARAM];
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 p-4 md:p-6 lg:p-8">
      <PageHeader title="Minha conta" description="Seus dados, sua senha e seus PINs de segurança." />
      <AccountTabs defaultTab={tab === ACCOUNT_TABS.security ? ACCOUNT_TABS.security : ACCOUNT_TABS.profile} />
    </div>
  );
}
