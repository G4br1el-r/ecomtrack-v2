"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { NOTIFICATION_FORM_ID } from "@/constants/Modules/Administracao/Comunicacao/communication";
import { API_ENDPOINTS } from "@/constants/Modules/Core/Api/api-endpoints";
import { useNotificationAction } from "@/hooks/Modules/Administracao/Comunicacao/use-notification-action";
import { useCan } from "@/hooks/Modules/Core/Access/use-can";
import type { NotificationDetail } from "@/schemas/Modules/Administracao/Comunicacao/notification-detail-schema";
import {
  type NotificationFormValues,
  notificationFormSchema,
} from "@/schemas/Modules/Administracao/Comunicacao/notification-form-schema";
import { updateNotification } from "@/services/Modules/Administracao/Comunicacao/update-notification";

import { NotificationPreview } from "../notification-preview";
import { VariableChips } from "../variable-chips";

export function NotificationEditor({ detail, onSaved }: { detail: NotificationDetail; onSaved: () => void }) {
  const { can } = useCan();
  const isMessage = detail.part === "Message";
  const readOnly = !can(API_ENDPOINTS.communication.update.component);
  const initial = { subject: detail.subject ?? "", contentHtml: detail.contentHtml };
  const [previewValues, setPreviewValues] = useState<NotificationFormValues>(initial);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { mutate: save } = useNotificationAction(updateNotification, {
    onSuccess: () => {
      toast.success("E-mail salvo", { description: detail.name });
      onSaved();
    },
    onError: (error) => toast.error("Não foi possível salvar o e-mail", { description: error.message }),
  });
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<NotificationFormValues>({
    resolver: zodResolver(notificationFormSchema(isMessage)),
    defaultValues: initial,
  });
  const { ref: contentRef, ...contentField } = register("contentHtml");

  const insertVariable = (token: string) => {
    const textarea = textareaRef.current;
    const current = getValues("contentHtml");
    const start = textarea?.selectionStart ?? current.length;
    const end = textarea?.selectionEnd ?? current.length;
    setValue("contentHtml", `${current.slice(0, start)}${token}${current.slice(end)}`, { shouldDirty: true });
    requestAnimationFrame(() => {
      textarea?.focus();
      textarea?.setSelectionRange(start + token.length, start + token.length);
    });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <form
        id={NOTIFICATION_FORM_ID}
        noValidate
        onSubmit={handleSubmit((values) => save({ key: detail.key, ...values }))}
      >
        <FieldGroup>
          {isMessage ? (
            <Field data-invalid={errors.subject ? true : undefined}>
              <FieldLabel htmlFor="notification-subject">Assunto</FieldLabel>
              <Input id="notification-subject" disabled={readOnly} {...register("subject")} />
              <FieldError errors={[errors.subject]} />
            </Field>
          ) : null}
          <Field data-invalid={errors.contentHtml ? true : undefined}>
            <FieldLabel htmlFor="notification-content">Conteúdo (HTML)</FieldLabel>
            <VariableChips variables={detail.variables} onInsert={insertVariable} />
            <Textarea
              id="notification-content"
              rows={18}
              spellCheck={false}
              disabled={readOnly}
              className="font-mono text-xs"
              ref={(element) => {
                contentRef(element);
                textareaRef.current = element;
              }}
              {...contentField}
            />
            <FieldDescription>
              Clique numa variável para inserir onde está o cursor. Blocos opcionais: {"{{#if variavel}}...{{/if}}"}.
            </FieldDescription>
            <FieldError errors={[errors.contentHtml]} />
          </Field>
        </FieldGroup>
      </form>
      <NotificationPreview
        notificationKey={detail.key}
        values={previewValues}
        onRefresh={() => setPreviewValues(getValues())}
      />
    </div>
  );
}
