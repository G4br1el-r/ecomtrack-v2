import { Showcase } from "../../components/showcase";
import { Specimen } from "../../components/specimen";
import { ToastsDemo } from "../../demos/toasts-demo";

export function ToastsSection() {
  return (
    <Showcase
      id="toasts"
      title="Toasts"
      description="Sonner do shadcn (toast, toast.success, toast.promise). Superfície neutra, ícone colorido, canto superior direito."
    >
      <Specimen title="Tipos" description="Clique para disparar">
        <ToastsDemo />
      </Specimen>
      <Specimen title="Regra de uso" className="block space-y-1.5 text-sm">
        <p>Ação rápida (salvar, editar): só o estado do botão e o toast de resultado.</p>
        <p>Ação longa (sincronizar, importar): toast.promise com loading, sucesso e erro.</p>
        <p>Ação reversível (arquivar, excluir com desfazer): sem confirmação, toast com ação Desfazer.</p>
      </Specimen>
    </Showcase>
  );
}
