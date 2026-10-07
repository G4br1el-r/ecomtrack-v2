"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import type { IntegrationArea } from "@/@types/Modules/Administracao/Integracoes/integration-area";
import type { IntegrationPanel } from "@/@types/Modules/Administracao/Integracoes/integration-panel";
import { Switch } from "@/components/animate-ui/components/radix/switch";
import { FormErrorAlert } from "@/components/Modules/Core/DesignSystem/form-error-alert";
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { INTEGRATION_AREA_COPY, INTEGRATION_FORM_ID } from "@/constants/Modules/Administracao/Integracoes/integrations";
import { useSaveIntegration } from "@/hooks/Modules/Administracao/Integracoes/use-save-integration";
import { getIntegrationFormDefaults } from "@/lib/Modules/Administracao/Integracoes/get-integration-form-defaults";
import { getStoredSecrets } from "@/lib/Modules/Administracao/Integracoes/get-stored-secrets";
import {
  type IntegrationFormValues,
  integrationFormSchema,
} from "@/schemas/Modules/Administracao/Integracoes/integration-form-schema";

import { IntegrationFieldInput } from "../integration-field-input";

export function IntegrationForm({
  area,
  panel,
  onSaved,
}: {
  area: IntegrationArea;
  panel: IntegrationPanel;
  onSaved: () => void;
}) {
  const integration = panel.mode === "edit" ? panel.integration : null;
  const { fields, allowsMultiple } = panel.provider;
  const storedSecrets = getStoredSecrets(fields, integration);
  const { mutate: save, error } = useSaveIntegration(area, {
    onSuccess: (saved, variables) =>
      toast.success(variables.id ? "Conexão atualizada" : "Conexão criada", {
        description: `${saved.providerName} · ${saved.name}`,
      }),
    onError: (cause) => toast.error("Não foi possível salvar a conexão", { description: cause.message }),
  });
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IntegrationFormValues>({
    resolver: zodResolver(integrationFormSchema(fields, storedSecrets)),
    defaultValues: getIntegrationFormDefaults(fields, integration),
  });

  return (
    <form
      id={INTEGRATION_FORM_ID}
      noValidate
      onSubmit={handleSubmit((values) => {
        save({
          id: integration?.id,
          providerId: panel.provider.id,
          name: values.name.trim() || null,
          isActive: values.isActive,
          values: Object.fromEntries(Object.entries(values.values).map(([key, value]) => [key, value.trim()])),
        });
        onSaved();
      })}
    >
      <FieldGroup>
        <FormErrorAlert message={error?.message} />
        <Field data-invalid={errors.name ? true : undefined}>
          <FieldLabel htmlFor="integration-name">Nome da conexão</FieldLabel>
          <Input
            id="integration-name"
            placeholder={allowsMultiple ? "Ex.: Loja principal" : panel.provider.name}
            {...register("name")}
          />
          <FieldDescription>
            {allowsMultiple
              ? `Dê um nome para identificar cada ${INTEGRATION_AREA_COPY[area].noun}.`
              : "Opcional. Sem nome, usamos o nome do provedor."}
          </FieldDescription>
          <FieldError errors={[errors.name]} />
        </Field>
        {fields.map((field) => {
          const id = `integration-field-${field.name}`;
          const fieldError = errors.values?.[field.name];
          return (
            <Field key={field.name} data-invalid={fieldError ? true : undefined}>
              <FieldLabel htmlFor={id}>
                {field.label}
                {field.required ? null : <span className="font-normal text-muted-foreground"> (opcional)</span>}
              </FieldLabel>
              <IntegrationFieldInput
                id={id}
                field={field}
                registration={register(`values.${field.name}`)}
                storedMask={integration?.values[field.name]}
                invalid={Boolean(fieldError)}
              />
              <FieldError errors={[fieldError]} />
            </Field>
          );
        })}
        <Controller
          control={control}
          name="isActive"
          render={({ field }) => (
            <Field orientation="horizontal">
              <FieldContent>
                <FieldLabel htmlFor="integration-active">Conexão ativa</FieldLabel>
                <FieldDescription>Desative para pausar sem perder as credenciais.</FieldDescription>
              </FieldContent>
              <Switch id="integration-active" checked={field.value} onCheckedChange={field.onChange} />
            </Field>
          )}
        />
      </FieldGroup>
    </form>
  );
}
