import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
      return [
        {
          source: '/auth/:path*',
          destination: 'https://backend-dashboard-takalar.vercel.app/auth/:path*',
        },
        {
          source: '/api/hublang/:path*',
          destination:
            'https://backend-dashboard-takalar.vercel.app/api/hublang/:path*',
        },
        {
          source: '/api/filter/:path*',
          destination:
            'https://backend-dashboard-takalar.vercel.app/api/filter/:path*',
        },
      ];
    },
};

export default nextConfig;
