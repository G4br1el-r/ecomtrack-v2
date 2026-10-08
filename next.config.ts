import type { NextConfig } from "next";

import { FORGOT_PASSWORD_HREF } from "./src/constants/Modules/Core/Auth/auth";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.0.73"],
  async redirects() {
    return [
      { source: "/reset-password/:token", destination: "/redefinir-senha/:token", permanent: false },
      { source: "/invite/:token", destination: "/convite/:token", permanent: false },
      { source: "/esqueci-senha", destination: FORGOT_PASSWORD_HREF, permanent: true },
    ];
  },
};

export default nextConfig;
