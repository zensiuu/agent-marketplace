/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@paperclipai/sdk'],
  env: {
    NEXT_PUBLIC_PAPERCLIP_URL: process.env.PAPERCLIP_API_URL || 'http://localhost:3100',
  },
  async rewrites() {
    return [
      {
        source: '/api/paperclip/:path*',
        destination: `${process.env.PAPERCLIP_API_URL || 'http://localhost:3100'}/api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
