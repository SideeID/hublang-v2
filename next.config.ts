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
        source: '/api/:path*',
        destination: `${API_BASE}/api/:path*`,
      },
      {
        source: '/api/direksi/:path*',
        destination: `${API_BASE}/api/direksi/:path*`,
      },
      {
        source: '/api/direksi/filter/:path*',
        destination: `${API_BASE}/api/direksi/filter/:path*`,
      },
    ];
  },
};

export default nextConfig;
