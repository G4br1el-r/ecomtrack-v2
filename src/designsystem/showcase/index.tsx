import { OnThisPage } from "../components/on-this-page";
import { BadgesSection } from "../sections/badges-section";
import { ButtonsSection } from "../sections/buttons-section";
import { ColorsSection } from "../sections/colors-section";
import { DataSection } from "../sections/data-section";
import { FeedbackSection } from "../sections/feedback-section";
import { FormsSection } from "../sections/forms-section";
import { KpisSection } from "../sections/kpis-section";
import { MenusSection } from "../sections/menus-section";
import { MotionSection } from "../sections/motion-section";
import { NavigationSection } from "../sections/navigation-section";
import { OverlaysSection } from "../sections/overlays-section";
import { SpacingSection } from "../sections/spacing-section";
import { ToastsSection } from "../sections/toasts-section";
import { TypographySection } from "../sections/typography-section";
import { UploadSection } from "../sections/upload-section";

export function DesignSystemShowcase() {
  return (
    <div className="mx-auto flex w-full max-w-page gap-10 px-4 py-8 sm:px-6 lg:px-8">
      <main className="min-w-0 flex-1 space-y-16">
        <header className="space-y-2">
          <p className="text-xs font-medium tracking-wide text-primary uppercase">Design system</p>
          <h1 className="font-heading text-3xl font-semibold tracking-tight">Componentes</h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Referência única de interface do EcomTrack. Toda tela nasce daqui: mesmos tokens, mesmos componentes, mesmo
            movimento. Pressione <span className="font-medium text-foreground">⌘K</span> para navegar.
          </p>
        </header>
        <ColorsSection />
        <TypographySection />
        <SpacingSection />
        <MotionSection />
        <ButtonsSection />
        <BadgesSection />
        <FormsSection />
        <FeedbackSection />
        <ToastsSection />
        <OverlaysSection />
        <MenusSection />
        <KpisSection />
        <DataSection />
        <UploadSection />
        <NavigationSection />
      </main>
      <OnThisPage />
    </div>
  );
}
