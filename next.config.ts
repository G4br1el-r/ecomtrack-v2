import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/reset-password/:token", destination: "/redefinir-senha/:token", permanent: false },
      { source: "/invite/:token", destination: "/convite/:token", permanent: false },
    ];
  },
};

export default nextConfig;
