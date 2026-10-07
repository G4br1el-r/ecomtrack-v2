import type { Metadata } from "next";

import { UsersWorkspace } from "./components/users-workspace";

export const metadata: Metadata = {
  title: "Usuários",
  description: "Usuários, convites e perfis de acesso da empresa.",
};

export default function UsersPage() {
  return (
    <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-6 p-4 md:p-6 lg:p-8">
      <UsersWorkspace />
    </div>
  );
}
