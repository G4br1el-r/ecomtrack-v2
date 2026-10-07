import type { Metadata } from "next";

import { PageHeader } from "@/components/Modules/Core/DesignSystem/page-header";
import { StaggerReveal } from "@/components/Modules/Core/DesignSystem/stagger-reveal";
import { StaggerRevealItem } from "@/components/Modules/Core/DesignSystem/stagger-reveal-item";

import { PipelineBoard } from "./components/pipeline-board";

export const metadata: Metadata = {
  title: "Esteira de cadastro",
  description: "Do catálogo do fornecedor até a loja: importação, cadastro, preço e publicação.",
};

export default function EsteiraCadastroPage() {
  return (
    <StaggerReveal className="mx-auto flex w-full max-w-screen-2xl flex-col gap-8 p-4 md:p-6 lg:p-8">
      <StaggerRevealItem>
        <PageHeader
          title="Esteira de cadastro"
          description="Do catálogo do fornecedor até a loja: importação, cadastro, preço e publicação."
        />
      </StaggerRevealItem>
      <StaggerRevealItem className="min-w-0">
        <PipelineBoard />
      </StaggerRevealItem>
    </StaggerReveal>
  );
}
