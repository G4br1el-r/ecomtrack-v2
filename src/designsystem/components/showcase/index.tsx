import { SectionHeader } from "@/components/Modules/Core/DesignSystem/section-header";

export function Showcase({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20 space-y-5">
      <SectionHeader title={title} description={description} />
      <div className="space-y-5">{children}</div>
    </section>
  );
}
