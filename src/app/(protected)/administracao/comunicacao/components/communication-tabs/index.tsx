"use client";

import { Mail, Send } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsContents,
  TabsList,
  TabsTrigger,
} from "@/components/animate-ui/components/animate/tabs";
import { IntegrationArea } from "@/components/Modules/Administracao/Integracoes/integration-area";
import { COMMUNICATION_TABS } from "@/constants/Modules/Administracao/Comunicacao/communication";

import { EmailMessages } from "../email-messages";
import { NotificationEditorSheet } from "../notification-editor-sheet";

export function CommunicationTabs() {
  return (
    <>
      <Tabs defaultValue={COMMUNICATION_TABS.emails} className="gap-4">
        <TabsList className="w-fit">
          <TabsTrigger value={COMMUNICATION_TABS.emails}>
            <Mail aria-hidden="true" />
            E-mails
          </TabsTrigger>
          <TabsTrigger value={COMMUNICATION_TABS.sender}>
            <Send aria-hidden="true" />
            Conta de envio
          </TabsTrigger>
        </TabsList>
        <TabsContents>
          <TabsContent value={COMMUNICATION_TABS.emails} aria-label="E-mails">
            <EmailMessages />
          </TabsContent>
          <TabsContent value={COMMUNICATION_TABS.sender} aria-label="Conta de envio">
            <IntegrationArea area="email" />
          </TabsContent>
        </TabsContents>
      </Tabs>
      <NotificationEditorSheet />
    </>
  );
}
