import { CopyButton } from "@/components/Modules/Core/DesignSystem/copy-button";
import { parseGenerationFields } from "@/lib/Modules/Administracao/AgentesIA/parse-generation-fields";
import type { AiGeneration } from "@/schemas/Modules/Administracao/AgentesIA/ai-generation-schema";

export function AiGenerationResult({ generation }: { generation: AiGeneration }) {
  const fields = parseGenerationFields(generation.text);
  return (
    <section aria-label="Resultado da geração" className="space-y-3 rounded-lg border bg-muted/30 p-4">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs text-muted-foreground">
          Gerado por <span className="font-medium text-foreground">{generation.providerCode}</span> · {generation.model}
        </p>
        <CopyButton value={generation.text} label="Copiar resultado" />
      </div>
      {fields ? (
        <dl className="divide-y">
          {fields.map((field) => (
            <div key={field.key} className="flex items-start gap-3 py-2 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1 space-y-0.5">
                <dt className="font-mono text-xs text-muted-foreground">{field.key}</dt>
                <dd className="text-sm break-words whitespace-pre-wrap">{field.value}</dd>
              </div>
              <CopyButton value={field.value} label={`Copiar ${field.key}`} />
            </div>
          ))}
        </dl>
      ) : (
        <p className="text-sm break-words whitespace-pre-wrap">{generation.text}</p>
      )}
    </section>
  );
}
