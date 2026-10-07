import type { Metadata } from "next";

import { NotFoundView } from "@/components/Modules/Core/Shell/not-found-view";
import { NOT_FOUND_FORBIDDEN_TITLE } from "@/constants/Modules/Core/Shell/not-found";

export const metadata: Metadata = { title: NOT_FOUND_FORBIDDEN_TITLE };

export default function ForbiddenPage() {
  return <NotFoundView variant="forbidden" />;
}
