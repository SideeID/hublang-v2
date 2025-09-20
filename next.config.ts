import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    const API_BASE =
      process.env.BACKEND_BASE_URL ??
      'https://backend-dashboard-takalar.vercel.app';

    return [
      {
        source: '/auth/:path*',
        destination: `${API_BASE}/auth/:path*`,
      },
      {
        source: '/api/hublang/:path*',
        destination: `${API_BASE}/api/hublang/:path*`,
      },
      {
        source: '/api/filter/:path*',
        destination: `${API_BASE}/api/filter/:path*`,
      },
    ];
  },
};

export default nextConfig;
