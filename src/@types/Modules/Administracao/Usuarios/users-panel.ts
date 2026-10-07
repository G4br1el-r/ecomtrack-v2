import type { Profile } from "@/schemas/Modules/Administracao/Usuarios/profile-schema";
import type { User } from "@/schemas/Modules/Administracao/Usuarios/user-schema";

export type UsersPanel =
  | { kind: "edit-user"; user: User }
  | { kind: "activity"; user: User }
  | { kind: "invite" }
  | { kind: "profile-form"; profile: Profile | null }
  | { kind: "profile-permissions"; profile: Profile };
