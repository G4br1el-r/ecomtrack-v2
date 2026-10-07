"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Combobox } from "@/components/Modules/Core/DesignSystem/combobox";
import { FormErrorAlert } from "@/components/Modules/Core/DesignSystem/form-error-alert";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ALL_ITEMS_FILTERS } from "@/constants/Modules/Core/Api/http";
import { COMPANY_FORM_ID } from "@/constants/Modules/Plataforma/Empresas/companies";
import { useSaveCompany } from "@/hooks/Modules/Plataforma/Empresas/use-save-company";
import { usePlans } from "@/hooks/Modules/Plataforma/Planos/use-plans";
import { formatDocument } from "@/lib/Modules/Plataforma/Empresas/format-document";
import { type CompanyFormValues, companyFormSchema } from "@/schemas/Modules/Plataforma/Empresas/company-form-schema";
import type { Company } from "@/schemas/Modules/Plataforma/Empresas/company-schema";

export function CompanyForm({ company, onSaved }: { company: Company | null; onSaved: () => void }) {
  const { data: plans } = usePlans(ALL_ITEMS_FILTERS);
  const { mutate: save, error } = useSaveCompany();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyFormValues>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      name: company?.name ?? "",
      document: formatDocument(company?.document ?? null),
      planId: company?.planId ?? "",
    },
  });

  return (
    <form
      id={COMPANY_FORM_ID}
      noValidate
      onSubmit={handleSubmit((values) =>
        save(
          { ...values, id: company?.id },
          {
            onSuccess: (saved) => {
              toast.success(company ? "Empresa atualizada" : "Empresa criada", {
                description: company
                  ? saved.name
                  : `${saved.name}. Use a empresa no topo e convide o primeiro usuário.`,
              });
              onSaved();
            },
          },
        ),
      )}
    >
      <FieldGroup>
        <FormErrorAlert message={error?.message} />
        <Field data-invalid={errors.name ? true : undefined}>
          <FieldLabel htmlFor="company-name">Nome</FieldLabel>
          <Input id="company-name" autoFocus {...register("name")} />
          <FieldError errors={[errors.name]} />
        </Field>
        <Field data-invalid={errors.document ? true : undefined}>
          <FieldLabel htmlFor="company-document">
            CNPJ ou CPF <span className="font-normal text-muted-foreground">(opcional)</span>
          </FieldLabel>
          <Input id="company-document" inputMode="numeric" {...register("document")} />
          <FieldDescription>Pode digitar com ou sem pontuação.</FieldDescription>
          <FieldError errors={[errors.document]} />
        </Field>
        <Field data-invalid={errors.planId ? true : undefined}>
          <FieldLabel htmlFor="company-plan">Plano</FieldLabel>
          <Controller
            control={control}
            name="planId"
            render={({ field }) => (
              <Combobox
                id="company-plan"
                label="Plano"
                placeholder="Escolha um plano"
                searchPlaceholder="Buscar plano..."
                emptyText="Nenhum plano encontrado."
                className="h-9 w-full"
                options={(plans?.items ?? []).map((plan) => ({ value: plan.id, label: plan.name }))}
                value={field.value}
                onValueChange={field.onChange}
              />
            )}
          />
          <FieldError errors={[errors.planId]} />
        </Field>
      </FieldGroup>
    </form>
  );
}
