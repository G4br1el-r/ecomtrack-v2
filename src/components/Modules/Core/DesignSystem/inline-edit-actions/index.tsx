import { Button } from "@/components/ui/button";

export function InlineEditActions({ onCancel, onConfirm }: { onCancel: () => void; onConfirm: () => void }) {
  return (
    <div className="flex justify-end gap-2 pt-3">
      <Button variant="ghost" size="sm" onClick={onCancel}>
        Cancelar
      </Button>
      <Button size="sm" onClick={onConfirm}>
        Salvar
      </Button>
    </div>
  );
}
