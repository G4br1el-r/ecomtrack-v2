"use client";

import { MailPlus, ShieldCheck, UserPlus, Users } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsContents,
  TabsList,
  TabsTrigger,
} from "@/components/animate-ui/components/animate/tabs";
import { ActionLockTooltip } from "@/components/Modules/Core/DesignSystem/action-lock-tooltip";
import { PageHeader } from "@/components/Modules/Core/DesignSystem/page-header";
import { Button } from "@/components/ui/button";
import { USERS_TABS } from "@/constants/Modules/Administracao/Usuarios/users";
import { API_ENDPOINTS } from "@/constants/Modules/Core/Api/api-endpoints";
import { useCan } from "@/hooks/Modules/Core/Access/use-can";
import { useUsersPanelStore } from "@/store/Modules/Administracao/Usuarios/users-panel-store";

import { InvitesTable } from "../invites-table";
import { ProfilesTable } from "../profiles-table";
import { UsersPanels } from "../users-panels";
import { UsersTable } from "../users-table";

export function UsersWorkspace() {
  const { can } = useCan();
  const open = useUsersPanelStore((state) => state.open);
  const canInvite = can(API_ENDPOINTS.invites.create.component);
  const canSeeInvites = can(API_ENDPOINTS.invites.list.component);

  return (
    <>
      <PageHeader
        title="Usuários"
        description="Quem acessa a empresa, os convites enviados e os perfis de acesso."
        actions={
          <ActionLockTooltip locked={!canInvite}>
            <Button onClick={() => open({ kind: "invite" })}>
              <UserPlus data-icon="inline-start" aria-hidden="true" />
              Convidar usuário
            </Button>
          </ActionLockTooltip>
        }
      />
      <Tabs defaultValue={USERS_TABS.users} className="gap-4">
        <TabsList className="w-fit">
          <TabsTrigger value={USERS_TABS.users}>
            <Users aria-hidden="true" />
            Usuários
          </TabsTrigger>
          {canSeeInvites ? (
            <TabsTrigger value={USERS_TABS.invites}>
              <MailPlus aria-hidden="true" />
              Convites
            </TabsTrigger>
          ) : null}
          <TabsTrigger value={USERS_TABS.profiles}>
            <ShieldCheck aria-hidden="true" />
            Perfis
          </TabsTrigger>
        </TabsList>
        <TabsContents>
          <TabsContent value={USERS_TABS.users} aria-label="Usuários">
            <UsersTable />
          </TabsContent>
          {canSeeInvites ? (
            <TabsContent value={USERS_TABS.invites} aria-label="Convites">
              <InvitesTable />
            </TabsContent>
          ) : null}
          <TabsContent value={USERS_TABS.profiles} aria-label="Perfis">
            <ProfilesTable />
          </TabsContent>
        </TabsContents>
      </Tabs>
      <UsersPanels />
    </>
  );
}
