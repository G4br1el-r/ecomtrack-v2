import { ErrorState } from "@/components/Modules/Core/DesignSystem/error-state";
import { Card } from "@/components/ui/card";

export function CardError({ title, onRetry }: { title: string; onRetry: () => void }) {
  return (
    <Card className="h-full justify-center">
      <ErrorState title={title} description="Tente novamente em alguns instantes." onRetry={onRetry} />
    </Card>
  );
}
