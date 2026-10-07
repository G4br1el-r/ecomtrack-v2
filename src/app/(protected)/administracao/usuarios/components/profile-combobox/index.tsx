"use client";

import { Combobox } from "@/components/Modules/Core/DesignSystem/combobox";
import { ALL_ITEMS_FILTERS } from "@/constants/Modules/Core/Api/http";
import { useProfiles } from "@/hooks/Modules/Administracao/Usuarios/use-profiles";

export function ProfileCombobox({
  id,
  value,
  onValueChange,
  allLabel,
  className,
}: {
  id?: string;
  value: string;
  onValueChange: (profileId: string, profileName: string | null) => void;
  allLabel?: string;
  className?: string;
}) {
  const { data } = useProfiles(ALL_ITEMS_FILTERS);
  const profiles = data?.items ?? [];
  const options = [
    ...(allLabel ? [{ value: "", label: allLabel }] : []),
    ...profiles.map((profile) => ({ value: profile.id, label: profile.name })),
  ];
  return (
    <Combobox
      id={id}
      label={allLabel ? "Filtrar por perfil" : "Perfil"}
      options={options}
      value={value}
      searchPlaceholder="Buscar perfil..."
      emptyText="Nenhum perfil encontrado."
      placeholder="Escolha um perfil"
      className={className}
      onValueChange={(profileId) =>
        onValueChange(profileId, profiles.find((profile) => profile.id === profileId)?.name ?? null)
      }
    />
  );
}
