import { z } from "zod";

import { AUTH_BFF_ROUTES } from "@/constants/Modules/Core/Auth/auth";
import { requestBff } from "@/services/Modules/Core/Api/request-bff";

export async function logout(): Promise<void> {
  await requestBff(AUTH_BFF_ROUTES.logout, z.null());
}
