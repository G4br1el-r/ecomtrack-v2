import { Showcase } from "../../components/showcase";
import { Specimen } from "../../components/specimen";
import { TokenCode } from "../../components/token-code";
import { MotionEntranceDemo } from "../../demos/motion-entrance-demo";
import { MotionLayoutDemo } from "../../demos/motion-layout-demo";
import { MotionPresenceDemo } from "../../demos/motion-presence-demo";
import { MOTION_TOKENS } from "../../mocks/demo";

export function MotionSection() {
  return (
    <Showcase
      id="motion"
      title="Motion"
      description="Tudo que abre, fecha, expande ou muda de lugar anima com Motion. Microinterações curtas (150–300ms) e respeito a prefers-reduced-motion."
    >
      <Specimen title="Tokens" className="block divide-y p-0">
        {MOTION_TOKENS.map((item) => (
          <div key={item.token} className="grid items-center gap-2 px-5 py-3 md:grid-cols-[12rem_10rem_1fr]">
            <TokenCode>{item.token}</TokenCode>
            <span className="font-mono text-xs text-muted-foreground">{item.value}</span>
            <span className="text-sm">{item.usage}</span>
          </div>
        ))}
      </Specimen>
      <div className="grid gap-5 md:grid-cols-3">
        <Specimen title="Entrada em sequência" description="staggerChildren + SPRING_SOFT">
          <MotionEntranceDemo />
        </Specimen>
        <Specimen title="Layout" description="layout + SPRING_SNAPPY">
          <MotionLayoutDemo />
        </Specimen>
        <Specimen title="Presença" description="AnimatePresence">
          <MotionPresenceDemo />
        </Specimen>
      </div>
    </Showcase>
  );
}
