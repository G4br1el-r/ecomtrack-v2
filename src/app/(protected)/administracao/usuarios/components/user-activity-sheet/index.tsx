"use client";

import { History } from "lucide-react";
import { useState } from "react";

import { Combobox } from "@/components/Modules/Core/DesignSystem/combobox";
import { DetailRow } from "@/components/Modules/Core/DesignSystem/detail-row";
import { DetailSection } from "@/components/Modules/Core/DesignSystem/detail-section";
import { DetailSheet } from "@/components/Modules/Core/DesignSystem/detail-sheet";
import { ACTIVITY_PERIODS } from "@/constants/Modules/Administracao/Usuarios/users";
import { formatDisplayDate } from "@/lib/Modules/Core/DesignSystem/format-display-date";
import { formatDisplayTime } from "@/lib/Modules/Core/DesignSystem/format-display-time";
import type { User } from "@/schemas/Modules/Administracao/Usuarios/user-schema";

import { ActivityList } from "../activity-list";

type PeriodValue = (typeof ACTIVITY_PERIODS)[number]["value"];

export function UserActivitySheet({ open, user, onClose }: { open: boolean; user: User | null; onClose: () => void }) {
  const [period, setPeriod] = useState<PeriodValue>(ACTIVITY_PERIODS[0].value);
  const days = ACTIVITY_PERIODS.find((option) => option.value === period)?.days ?? null;

  return (
    <DetailSheet
      open={open}
      onOpenChange={(next) => {
        if (!next) onClose();
      }}
      icon={History}
      title="Log de atividades"
      description={user ? `${user.firstName} ${user.lastName} · ${user.email}` : undefined}
    >
      {user ? (
        <>
          <DetailSection title="Resumo">
            <DetailRow
              label="Último login"
              value={
                user.lastLoginAt
                  ? `${formatDisplayDate(user.lastLoginAt)} às ${formatDisplayTime(user.lastLoginAt)}`
                  : "Nunca entrou"
              }
            />
          </DetailSection>
          <DetailSection
            title="Atividades"
            action={
              <Combobox
                label="Período"
                options={ACTIVITY_PERIODS.map(({ value, label }) => ({ value, label }))}
                value={period}
                onValueChange={setPeriod}
                className="w-44"
              />
            }
          >
            <ActivityList key={`${user.id}-${period}`} userId={user.id} days={days} />
          </DetailSection>
        </>
      ) : null}
    </DetailSheet>
  );
}
