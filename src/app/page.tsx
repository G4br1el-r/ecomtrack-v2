import { redirect } from "next/navigation";

import { DESIGN_SYSTEM_HREF } from "@/constants/Modules/Core/Shell/navigation";

export default function Home() {
  redirect(DESIGN_SYSTEM_HREF);
}
