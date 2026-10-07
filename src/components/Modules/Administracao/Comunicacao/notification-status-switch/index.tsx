"use client";

import { toast } from "sonner";
import { Switch } from "@/components/animate-ui/components/radix/switch";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/animate-ui/components/radix/tooltip";
import { API_ENDPOINTS } from "@/constants/Modules/Core/Api/api-endpoints";
import { useSetNotificationStatus } from "@/hooks/Modules/Administracao/Comunicacao/use-set-notification-status";
import { useCan } from "@/hooks/Modules/Core/Access/use-can";
import type { NotificationSummary } from "@/schemas/Modules/Administracao/Comunicacao/notification-summary-schema";

export function NotificationStatusSwitch({ notification }: { notification: NotificationSummary }) {
  const { can } = useCan();
  const { mutate: setStatus } = useSetNotificationStatus({
    onSuccess: ({ key, isEnabled }) =>
      toast.success(isEnabled ? "E-mail ligado" : "E-mail desligado", {
        description: notification.name,
        action: { label: "Desfazer", onClick: () => setStatus({ key, isEnabled: !isEnabled }) },
      }),
    onError: (error) => toast.error("Não foi possível mudar o e-mail", { description: error.message }),
  });
  const locked = !notification.canBeDisabled || !can(API_ENDPOINTS.communication.setStatus.component);
  const toggle = (
    <Switch
      aria-label={`${notification.isEnabled ? "Desligar" : "Ligar"} ${notification.name}`}
      checked={notification.isEnabled}
      disabled={locked}
      onCheckedChange={(isEnabled) => setStatus({ key: notification.key, isEnabled })}
    />
  );
  if (notification.canBeDisabled) return toggle;
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="inline-flex">{toggle}</span>
      </TooltipTrigger>
      <TooltipContent>E-mail de segurança: não pode ser desligado.</TooltipContent>
    </Tooltip>
  );
}
