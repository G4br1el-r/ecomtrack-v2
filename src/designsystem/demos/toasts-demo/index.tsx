"use client";

import { AlertCircle, AlertTriangle, CheckCircle2, Info, LoaderCircle, Undo2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { wait } from "../../helpers/wait";
import { DEMO_LATENCY_MS } from "../../mocks/demo";

export function ToastsDemo() {
  return (
    <>
      <Button variant="outline" onClick={() => toast.success("Produto salvo")}>
        <CheckCircle2 data-icon="inline-start" className="text-success" aria-hidden="true" />
        Sucesso
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.error("Não foi possível salvar", { description: "Verifique sua conexão e tente novamente." })
        }
      >
        <AlertCircle data-icon="inline-start" className="text-destructive" aria-hidden="true" />
        Erro
      </Button>
      <Button variant="outline" onClick={() => toast.warning("Estoque abaixo do mínimo")}>
        <AlertTriangle data-icon="inline-start" className="text-warning" aria-hidden="true" />
        Atenção
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.info("Relatório em processamento", { description: "Você será avisado ao terminar." })}
      >
        <Info data-icon="inline-start" className="text-info" aria-hidden="true" />
        Informação
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.promise(wait(DEMO_LATENCY_MS), {
            loading: "Sincronizando produtos...",
            success: "248 produtos sincronizados",
            error: "Falha na sincronização",
          })
        }
      >
        <LoaderCircle data-icon="inline-start" aria-hidden="true" />
        Promise
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast("Pedido arquivado", {
            description: "PED-10231 saiu da listagem.",
            action: { label: "Desfazer", onClick: () => toast.success("Pedido restaurado") },
          })
        }
      >
        <Undo2 data-icon="inline-start" aria-hidden="true" />
        Com desfazer
      </Button>
    </>
  );
}
