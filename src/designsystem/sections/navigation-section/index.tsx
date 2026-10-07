import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/animate-ui/components/radix/accordion";
import { Timeline } from "@/components/Modules/Core/DesignSystem/timeline";
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { Showcase } from "../../components/showcase";
import { Specimen } from "../../components/specimen";
import { TabsDemo } from "../../demos/tabs-demo";
import { TIMELINE_EVENTS, TIMELINE_PREVIEW_COUNT } from "../../mocks/timeline";

export function NavigationSection() {
  return (
    <Showcase
      id="navegacao"
      title="Navegação e conteúdo"
      description="Abas com indicador deslizante, accordion animado e linha do tempo."
    >
      <div className="grid gap-5 lg:grid-cols-2">
        <Specimen title="Abas" className="block">
          <TabsDemo />
        </Specimen>
        <Specimen title="Breadcrumb e avatares" className="flex-col items-start gap-5">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#navegacao">Relatórios</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#navegacao">Auditoria</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Estoque</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <AvatarGroup>
            <Avatar>
              <AvatarFallback>AS</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>BL</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>CD</AvatarFallback>
            </Avatar>
            <AvatarGroupCount>+4</AvatarGroupCount>
          </AvatarGroup>
        </Specimen>
        <Card>
          <CardHeader>
            <CardTitle>Atividade recente</CardTitle>
            <CardDescription>Timeline com ícone e cor por tipo de evento.</CardDescription>
          </CardHeader>
          <CardContent>
            <Timeline events={TIMELINE_EVENTS.slice(0, TIMELINE_PREVIEW_COUNT)} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Perguntas frequentes</CardTitle>
            <CardDescription>Accordion animado com Motion.</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              <AccordionItem value="sync">
                <AccordionTrigger>Como funciona a sincronização?</AccordionTrigger>
                <AccordionContent>Preço e estoque são enviados ao canal sempre que o produto muda.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="duplicado">
                <AccordionTrigger>O que é um código duplicado?</AccordionTrigger>
                <AccordionContent>Um mesmo código de resgate vinculado a mais de um pedido.</AccordionContent>
              </AccordionItem>
            </Accordion>
            <Separator className="my-4" />
            <p className="text-xs text-muted-foreground">Atualizado em 04/10/2026</p>
          </CardContent>
        </Card>
      </div>
    </Showcase>
  );
}
