import { Showcase } from "../../components/showcase";
import { Specimen } from "../../components/specimen";
import { StepperDemo } from "../../demos/stepper-demo";
import { UploadDemo } from "../../demos/upload-demo";

export function UploadSection() {
  return (
    <Showcase
      id="upload"
      title="Upload e fluxos"
      description="Dropzone com validação de tipo, tamanho e quantidade; stepper para fluxos em etapas."
    >
      <div className="grid gap-5 lg:grid-cols-2">
        <Specimen title="Upload" description="Arraste arquivos ou clique" className="block">
          <UploadDemo />
        </Specimen>
        <Specimen title="Stepper" description="Importação de planilha" className="block">
          <StepperDemo />
        </Specimen>
      </div>
    </Showcase>
  );
}
