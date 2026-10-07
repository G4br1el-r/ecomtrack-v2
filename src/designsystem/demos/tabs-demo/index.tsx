"use client";

import {
  Tabs,
  TabsContent,
  TabsContents,
  TabsList,
  TabsTrigger,
} from "@/components/animate-ui/components/animate/tabs";

export function TabsDemo() {
  return (
    <Tabs defaultValue="geral" className="w-full">
      <TabsList>
        <TabsTrigger value="geral">Geral</TabsTrigger>
        <TabsTrigger value="estoque">Estoque</TabsTrigger>
        <TabsTrigger value="historico">Histórico</TabsTrigger>
      </TabsList>
      <TabsContents className="mt-3 rounded-lg border bg-background">
        <TabsContent value="geral" className="p-4 text-sm text-muted-foreground">
          Dados gerais do produto: nome, marca, categoria e status.
        </TabsContent>
        <TabsContent value="estoque" className="p-4 text-sm text-muted-foreground">
          Códigos disponíveis, reservados e vendidos, com alerta de estoque mínimo.
        </TabsContent>
        <TabsContent value="historico" className="p-4 text-sm text-muted-foreground">
          Linha do tempo de alterações de preço, sincronizações e vendas.
        </TabsContent>
      </TabsContents>
    </Tabs>
  );
}
