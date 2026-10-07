"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { ActionButton } from "@/components/Modules/Core/DesignSystem/action-button";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { DEMO_LOADING_DELAY_MS } from "@/constants/Modules/Core/DesignSystem/ui";
import { type BrandFormValues, brandSchema } from "@/schemas/Modules/Core/DesignSystem/brand-schema";

import { wait } from "../../helpers/wait";

export function BrandFormDemo({ onSaved }: { onSaved?: () => void }) {
  const form = useForm<BrandFormValues>({
    resolver: zodResolver(brandSchema),
    defaultValues: { name: "", slug: "" },
    mode: "onTouched",
  });

  const onSubmit = async (values: BrandFormValues) => {
    await wait(DEMO_LOADING_DELAY_MS);
    toast.success("Marca salva", { description: values.name });
    form.reset();
    onSaved?.();
  };

  return (
    <form className="w-full" onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="brand-name">Nome da marca</FieldLabel>
              <Input id="brand-name" placeholder="PlayStation" aria-invalid={fieldState.invalid} {...field} />
              {fieldState.error ? (
                <FieldError errors={[fieldState.error]} />
              ) : (
                <FieldDescription>Exibido nos produtos e relatórios.</FieldDescription>
              )}
            </Field>
          )}
        />
        <Controller
          name="slug"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="brand-slug">Slug</FieldLabel>
              <Input id="brand-slug" placeholder="playstation" aria-invalid={fieldState.invalid} {...field} />
              {fieldState.error ? (
                <FieldError errors={[fieldState.error]} />
              ) : (
                <FieldDescription>Usado na URL da loja.</FieldDescription>
              )}
            </Field>
          )}
        />
        <div className="flex justify-end">
          <ActionButton
            type="submit"
            state={form.formState.isSubmitting ? "loading" : "idle"}
            loadingText="Salvando..."
          >
            Salvar marca
          </ActionButton>
        </div>
      </FieldGroup>
    </form>
  );
}
