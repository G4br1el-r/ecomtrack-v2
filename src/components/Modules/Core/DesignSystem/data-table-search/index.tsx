"use client";

import { Search } from "lucide-react";
import { useCallback, useRef, useState } from "react";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/animate-ui/components/radix/tooltip";
import { Button } from "@/components/ui/button";
import { DATA_TABLE_SEARCH_HOTKEY } from "@/constants/Modules/Core/DesignSystem/data-table";
import { useHotkey } from "@/hooks/Modules/Core/Shell/use-hotkey";
import { isEditableTarget } from "@/lib/Modules/Core/Shell/is-editable-target";

import { SearchField } from "../search-field";

export function DataTableSearch({
  value,
  placeholder = "Buscar...",
  onSearch,
}: {
  value: string;
  placeholder?: string;
  onSearch: (value: string) => void;
}) {
  const [draft, setDraft] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  const focusSearch = useCallback(() => {
    if (!isEditableTarget(document.activeElement)) inputRef.current?.focus();
  }, []);
  useHotkey(DATA_TABLE_SEARCH_HOTKEY, focusSearch);

  return (
    <form
      className="flex w-full gap-2 sm:max-w-md"
      onSubmit={(event) => {
        event.preventDefault();
        onSearch(draft.trim());
      }}
    >
      <SearchField
        ref={inputRef}
        aria-label="Buscar na tabela"
        placeholder={placeholder}
        shortcut={DATA_TABLE_SEARCH_HOTKEY.key}
        value={draft}
        onChange={(event) => {
          setDraft(event.target.value);
          if (event.target.value === "") onSearch("");
        }}
        onClear={() => {
          setDraft("");
          onSearch("");
          inputRef.current?.focus();
        }}
      />
      <Tooltip>
        <TooltipTrigger asChild>
          <Button type="submit" variant="outline" size="icon" aria-label="Pesquisar" className="border-input">
            <Search aria-hidden="true" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Pesquisar (Enter)</TooltipContent>
      </Tooltip>
    </form>
  );
}
