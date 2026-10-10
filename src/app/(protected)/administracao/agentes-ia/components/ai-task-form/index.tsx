"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { RotateCcw } from "lucide-react";
import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

import { AiGenerateButton } from "@/components/Modules/Administracao/AgentesIA/ai-generate-button";
import { Combobox } from "@/components/Modules/Core/DesignSystem/combobox";
import { CopyButton } from "@/components/Modules/Core/DesignSystem/copy-button";
import { FormErrorAlert } from "@/components/Modules/Core/DesignSystem/form-error-alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AI_PROMPT_MAX_LENGTH, AI_TASK_FORM_ID } from "@/constants/Modules/Administracao/AgentesIA/ai-agents";
import { ALL_ITEMS_FILTERS } from "@/constants/Modules/Core/Api/http";
import { useIntegrations } from "@/hooks/Modules/Administracao/Integracoes/use-integrations";
import { useSavePreference } from "@/hooks/Modules/Core/Preferencias/use-save-preference";
import { buildAiTaskPreferenceKey } from "@/lib/Modules/Administracao/AgentesIA/build-ai-task-preference-key";
import { buildAiTaskPreferenceValue } from "@/lib/Modules/Administracao/AgentesIA/build-ai-task-preference-value";
import { buildGenerationVariables } from "@/lib/Modules/Administracao/AgentesIA/build-generation-variables";
import { getAiTaskFormDefaults } from "@/lib/Modules/Administracao/AgentesIA/get-ai-task-form-defaults";
import { formatNumber } from "@/lib/Modules/Core/DesignSystem/format-number";
import type { AiGeneration } from "@/schemas/Modules/Administracao/AgentesIA/ai-generation-schema";
import { type AiTaskFormValues, aiTaskFormSchema } from "@/schemas/Modules/Administracao/AgentesIA/ai-task-form-schema";
import type { AiTaskPreference } from "@/schemas/Modules/Administracao/AgentesIA/ai-task-preference-schema";
import type { AiTask } from "@/schemas/Modules/Administracao/AgentesIA/ai-task-schema";

import { AiGenerationResult } from "../ai-generation-result";

export function AiTaskForm({
  task,
  preference,
  readOnly,
  onSaved,
}: {
  task: AiTask;
  preference: AiTaskPreference | null;
  readOnly: boolean;
  onSaved: () => void;
}) {
  const [generation, setGeneration] = useState<AiGeneration | null>(null);
  const { data: connections } = useIntegrations("ai", ALL_ITEMS_FILTERS);
  const { mutate: save, error } = useSavePreference();
  const {
    register,
    control,
    handleSubmit,
    getValues,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<AiTaskFormValues>({
    resolver: zodResolver(aiTaskFormSchema),
    defaultValues: getAiTaskFormDefaults(task, preference),
  });
  const prompt = useWatch({ control, name: "prompt" });
  const options = (connections?.items ?? []).map((connection) => ({
    value: connection.id,
    label: `${connection.providerName} · ${connection.name}${connection.isActive ? "" : " (pausada)"}`,
  }));

  return (
    <form
      id={AI_TASK_FORM_ID}
      noValidate
      onSubmit={handleSubmit((values) =>
        save(
          { key: buildAiTaskPreferenceKey(task.key), value: buildAiTaskPreferenceValue(task, values) },
          {
            onSuccess: () => {
              toast.success("Configuração salva", { description: task.name });
              onSaved();
            },
            onError: (cause) => toast.error("Não foi possível salvar a configuração", { description: cause.message }),
          },
        ),
      )}
    >
      <FieldGroup>
        <FormErrorAlert message={error?.message} />
        <FieldSet>
          <FieldLegend>IA usada nesta tarefa</FieldLegend>
          <Controller
            control={control}
            name="integrationId"
            render={({ field }) => (
              <Field data-invalid={errors.integrationId ? true : undefined}>
                <FieldLabel htmlFor="ai-task-connection">Conexão de IA</FieldLabel>
                <Combobox
                  id="ai-task-connection"
                  label="Conexão de IA"
                  options={options}
                  value={field.value}
                  onValueChange={field.onChange}
                  placeholder={options.length > 0 ? "Escolha uma conexão" : "Nenhuma conexão de IA cadastrada"}
                  searchPlaceholder="Buscar conexão..."
                  className="h-9 w-full"
                />
                <FieldDescription>As conexões ficam na aba Conexões desta página.</FieldDescription>
                <FieldError errors={[errors.integrationId]} />
              </Field>
            )}
          />
          <Field data-invalid={errors.model ? true : undefined}>
            <FieldLabel htmlFor="ai-task-model">
              Modelo <span className="font-normal text-muted-foreground">(opcional)</span>
            </FieldLabel>
            <Input id="ai-task-model" placeholder="Ex.: gpt-5, claude-sonnet-5-5" {...register("model")} />
            <FieldDescription>Vazio usa o modelo da conexão ou o mais recente do provedor.</FieldDescription>
            <FieldError errors={[errors.model]} />
          </Field>
        </FieldSet>
        <FieldSeparator />
        <FieldSet>
          <FieldLegend>Prompt</FieldLegend>
          <Field data-invalid={errors.prompt ? true : undefined}>
            <div className="flex items-center justify-between gap-2">
              <FieldLabel htmlFor="ai-task-prompt">Instruções para a IA</FieldLabel>
              <Button
                type="button"
                variant="ghost"
                size="xs"
                onClick={() => setValue("prompt", task.defaultPrompt, { shouldDirty: true })}
              >
                <RotateCcw data-icon="inline-start" aria-hidden="true" />
                Usar prompt padrão
              </Button>
            </div>
            <Textarea
              id="ai-task-prompt"
              rows={8}
              className="max-h-96 font-mono text-xs md:text-xs"
              {...register("prompt")}
            />
            <FieldDescription className="tabular-nums">
              {formatNumber(prompt.length, "integer")} / {formatNumber(AI_PROMPT_MAX_LENGTH, "integer")} caracteres
            </FieldDescription>
            <FieldError errors={[errors.prompt]} />
          </Field>
          {task.variables.length > 0 ? (
            <div className="space-y-2">
              <p className="text-sm font-medium">Variáveis disponíveis</p>
              <ul className="flex flex-wrap gap-1.5">
                {task.variables.map((variable) => (
                  <li key={variable.name}>
                    <Badge variant="outline" className="gap-1 py-0.5 pr-0.5 font-mono">
                      {`{${variable.name}}`}
                      <span className="font-sans text-muted-foreground">· {variable.label}</span>
                      <CopyButton value={`{${variable.name}}`} label={`Copiar {${variable.name}}`} />
                    </Badge>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </FieldSet>
        <FieldSeparator />
        <FieldSet>
          <FieldLegend>Testar geração</FieldLegend>
          <FieldDescription>Usa a conexão, o modelo e o prompt do formulário, mesmo antes de salvar.</FieldDescription>
          {task.variables.map((variable) => {
            const id = `ai-task-variable-${variable.name}`;
            return (
              <Field key={variable.name}>
                <FieldLabel htmlFor={id}>{variable.label}</FieldLabel>
                <Input id={id} {...register(`variables.${variable.name}`)} />
              </Field>
            );
          })}
          <div>
            <AiGenerateButton
              taskKey={task.key}
              disabled={readOnly}
              onGenerated={setGeneration}
              buildRequest={() => {
                const values = getValues();
                if (!values.integrationId) {
                  trigger("integrationId");
                  return null;
                }
                return {
                  integrationId: values.integrationId,
                  model: values.model.trim() || null,
                  prompt: values.prompt.trim() || null,
                  variables: buildGenerationVariables(values.variables),
                };
              }}
            />
          </div>
          {generation ? <AiGenerationResult generation={generation} /> : null}
        </FieldSet>
      </FieldGroup>
    </form>
  );
}
