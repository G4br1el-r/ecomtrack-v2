"use client";

import { PackageSearch, Plug } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsContents,
  TabsList,
  TabsTrigger,
} from "@/components/animate-ui/components/animate/tabs";
import { IntegrationArea } from "@/components/Modules/Administracao/Integracoes/integration-area";
import { SUPPLIERS_TABS } from "@/constants/Modules/Administracao/Fornecedores/suppliers";
import { API_ENDPOINTS } from "@/constants/Modules/Core/Api/api-endpoints";
import { useCan } from "@/hooks/Modules/Core/Access/use-can";

import { SupplierCatalog } from "../supplier-catalog";

export function SuppliersTabs() {
  const { can } = useCan();
  const canSeeCatalog = can(API_ENDPOINTS.supplierProducts.list.component);
  return (
    <Tabs defaultValue={SUPPLIERS_TABS.connections} className="gap-4">
      <TabsList className="w-fit">
        <TabsTrigger value={SUPPLIERS_TABS.connections}>
          <Plug aria-hidden="true" />
          Conexões
        </TabsTrigger>
        {canSeeCatalog ? (
          <TabsTrigger value={SUPPLIERS_TABS.catalog}>
            <PackageSearch aria-hidden="true" />
            Catálogo
          </TabsTrigger>
        ) : null}
      </TabsList>
      <TabsContents>
        <TabsContent value={SUPPLIERS_TABS.connections} aria-label="Conexões">
          <IntegrationArea area="supplier" />
        </TabsContent>
        {canSeeCatalog ? (
          <TabsContent value={SUPPLIERS_TABS.catalog} aria-label="Catálogo">
            <SupplierCatalog />
          </TabsContent>
        ) : null}
      </TabsContents>
    </Tabs>
  );
}
