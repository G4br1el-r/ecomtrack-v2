import { Construction } from "lucide-react";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { findNavEntry } from "@/lib/Modules/Core/Shell/find-nav-entry";
import { getNavSlugs } from "@/lib/Modules/Core/Shell/get-nav-slugs";
import { ConstructionBlueprint } from "./components/construction-blueprint";
import { StatusIllustration } from "./components/status-illustration";
import { StatusScreen } from "./components/status-screen";

export const dynamicParams = false;

export function generateStaticParams() {
  return getNavSlugs();
}

export default async function UnderConstructionPage({ params }: PageProps<"/[...slug]">) {
  const { slug } = await params;
  const entry = findNavEntry(`/${slug.join("/")}`);
  if (!entry) notFound();
  const Icon = entry.icon ?? Construction;
  return (
    <StatusScreen
      illustration={
        <StatusIllustration icon={<Icon />}>
          <ConstructionBlueprint label={entry.title} />
        </StatusIllustration>
      }
      eyebrow={
        <Badge variant="warning" className="gap-1.5">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full rounded-full bg-current opacity-75 motion-safe:animate-ping" />
            <span className="relative inline-flex size-1.5 rounded-full bg-current" />
          </span>
          Em construção
        </Badge>
      }
      title={`${entry.title} está a caminho`}
      description="Estamos reconstruindo esta tela no novo Ecomtrack, mais rápida e mais simples de usar. Em breve ela estará disponível aqui."
    />
  );
}
