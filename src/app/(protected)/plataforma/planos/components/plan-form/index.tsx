"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { DialogFooter } from "@/components/animate-ui/components/radix/dialog";
import { FormErrorAlert } from "@/components/Modules/Core/DesignSystem/form-error-alert";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { useSavePlan } from "@/hooks/Modules/Plataforma/Planos/use-save-plan";
import { type PlanFormValues, planFormSchema } from "@/schemas/Modules/Plataforma/Planos/plan-form-schema";
import type { Plan } from "@/schemas/Modules/Plataforma/Planos/plan-schema";
import { usePlanPanelStore } from "@/store/Modules/Plataforma/Planos/plan-panel-store";

export function PlanForm({ plan, onDone }: { plan: Plan | null; onDone: () => void }) {
  const openPanel = usePlanPanelStore((state) => state.open);
  const { mutate: save, isPending, error } = useSavePlan();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PlanFormValues>({
    resolver: zodResolver(planFormSchema),
    defaultValues: { name: plan?.name ?? "", description: plan?.description ?? "" },
  });

  return (
    <form
      noValidate
      className="space-y-6"
      onSubmit={handleSubmit((values) =>
        save(
          { ...values, id: plan?.id },
          {
            onSuccess: (saved) => {
              if (plan) {
                toast.success("Plano atualizado", { description: saved.name });
                onDone();
                return;
              }
              toast.success("Plano criado", { description: "Agora escolha as páginas que ele libera." });
              openPanel({
                kind: "permissions",
                plan: { ...saved, pageCount: 0, componentCount: 0 },
              });
            },
          },
        ),
      )}
    >
      <FieldGroup>
        <FormErrorAlert message={error?.message} />
        <Field data-invalid={errors.name ? true : undefined}>
          <FieldLabel htmlFor="plan-name">Nome</FieldLabel>
          <Input id="plan-name" autoFocus {...register("name")} />
          <FieldError errors={[errors.name]} />
        </Field>
        <Field data-invalid={errors.description ? true : undefined}>
          <FieldLabel htmlFor="plan-description">Descrição</FieldLabel>
          <Textarea id="plan-description" rows={3} {...register("description")} />
          <FieldError errors={[errors.description]} />
        </Field>
      </FieldGroup>
      <DialogFooter>
        <Button type="button" variant="ghost" onClick={onDone}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? <Spinner data-icon="inline-start" /> : null}
          {isPending ? "Salvando..." : plan ? "Salvar" : "Criar plano"}
        </Button>
      </DialogFooter>
    </form>
  );
}
