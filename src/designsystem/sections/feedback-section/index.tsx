import { AlertCircle, AlertTriangle, CheckCircle2, Info, Plus } from "lucide-react";

import { Progress } from "@/components/animate-ui/components/radix/progress";
import { EmptyState } from "@/components/Modules/Core/DesignSystem/empty-state";
import { SearchIllustration } from "@/components/Modules/Core/DesignSystem/search-illustration";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";

import { Showcase } from "../../components/showcase";
import { Specimen } from "../../components/specimen";
import { SpecimenLabel } from "../../components/specimen-label";
import { ErrorStateDemo } from "../../demos/error-state-demo";
import { DEMO_PROGRESS_SAMPLE, DEMO_SKELETON_ROWS } from "../../mocks/demo";

export function FeedbackSection() {
  return (
    <Showcase
      id="feedback"
      title="Alertas e estados"
      description="Vazio, erro e carregamento sempre ilustrados e com ação clara."
    >
      <Specimen title="Alertas" className="grid gap-3 md:grid-cols-2">
        <Alert variant="success">
          <CheckCircle2 />
          <AlertTitle>Integração conectada</AlertTitle>
          <AlertDescription>Os pedidos da Shopify serão importados automaticamente.</AlertDescription>
        </Alert>
        <Alert variant="destructive">
          <AlertCircle />
          <AlertTitle>Falha na sincronização</AlertTitle>
          <AlertDescription>3 produtos não foram atualizados no Mercado Livre.</AlertDescription>
        </Alert>
        <Alert variant="warning">
          <AlertTriangle />
          <AlertTitle>Estoque baixo</AlertTitle>
          <AlertDescription>12 produtos estão abaixo do estoque mínimo.</AlertDescription>
        </Alert>
        <Alert variant="info">
          <Info />
          <AlertTitle>Fechamento mensal</AlertTitle>
          <AlertDescription>O relatório de setembro já está disponível.</AlertDescription>
        </Alert>
      </Specimen>
      <div className="grid gap-5 lg:grid-cols-3">
        <Specimen title="Lista vazia" className="block p-0">
          <EmptyState
            action={
              <Button size="sm">
                <Plus data-icon="inline-start" aria-hidden="true" />
                Adicionar produto
              </Button>
            }
          />
        </Specimen>
        <Specimen title="Busca sem resultado" className="block p-0">
          <EmptyState
            illustration={<SearchIllustration />}
            title="Nada encontrado"
            description="Nenhum pedido corresponde a “PED-99999”."
          />
        </Specimen>
        <Specimen title="Erro ao carregar" className="block p-0">
          <ErrorStateDemo />
        </Specimen>
      </div>
      <Specimen title="Carregamento" className="grid gap-6 md:grid-cols-3">
        <div className="space-y-3">
          <SpecimenLabel>Skeleton espelhando o layout</SpecimenLabel>
          {DEMO_SKELETON_ROWS.map((row) => (
            <div key={row} className="flex items-center gap-3">
              <Skeleton className="size-9 rounded-md" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-3.5 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-3">
          <SpecimenLabel>Spinner</SpecimenLabel>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Spinner />
            Buscando...
          </div>
        </div>
        <div className="space-y-3">
          <SpecimenLabel>Progresso</SpecimenLabel>
          <Progress value={DEMO_PROGRESS_SAMPLE} aria-label="Progresso da importação" />
          <p className="text-xs text-muted-foreground tabular-nums">{DEMO_PROGRESS_SAMPLE}% importado</p>
        </div>
      </Specimen>
    </Showcase>
  );
}
