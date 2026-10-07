"use client";

import { ShieldCheck, User } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsContents,
  TabsList,
  TabsTrigger,
} from "@/components/animate-ui/components/animate/tabs";
import { ErrorState } from "@/components/Modules/Core/DesignSystem/error-state";
import { Skeleton } from "@/components/ui/skeleton";
import { ACCOUNT_TABS } from "@/constants/Modules/Core/Conta/account";
import { useMe } from "@/hooks/Modules/Core/Conta/use-me";
import { pinTypeSchema } from "@/schemas/Modules/Core/Conta/pin-type-schema";

import { PasswordForm } from "../password-form";
import { PinCard } from "../pin-card";
import { ProfileForm } from "../profile-form";

export function AccountTabs({ defaultTab }: { defaultTab: string }) {
  const { data: me, isPending, isError, refetch } = useMe();

  if (isPending) {
    return (
      <div className="space-y-4" role="status" aria-label="Carregando a sua conta">
        <Skeleton className="h-9 w-64" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (isError) return <ErrorState onRetry={() => refetch()} />;

  return (
    <Tabs defaultValue={defaultTab} className="gap-6">
      <TabsList className="w-fit">
        <TabsTrigger value={ACCOUNT_TABS.profile}>
          <User aria-hidden="true" />
          Meu perfil
        </TabsTrigger>
        <TabsTrigger value={ACCOUNT_TABS.security}>
          <ShieldCheck aria-hidden="true" />
          Segurança
        </TabsTrigger>
      </TabsList>
      <TabsContents>
        <TabsContent value={ACCOUNT_TABS.profile} aria-label="Meu perfil">
          <ProfileForm me={me} />
        </TabsContent>
        <TabsContent value={ACCOUNT_TABS.security} aria-label="Segurança" className="space-y-6">
          <PasswordForm readOnly={me.isViewingAs} />
          <div className="grid gap-4 sm:grid-cols-2">
            {pinTypeSchema.options.map((type) => (
              <PinCard
                key={type}
                type={type}
                created={type === "Four" ? me.hasPinFour : me.hasPinSix}
                readOnly={me.isViewingAs}
              />
            ))}
          </div>
        </TabsContent>
      </TabsContents>
    </Tabs>
  );
}
