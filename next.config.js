/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['@vercel/postgres', '@vercel/blob'],
  },
  images: {
    domains: ['vercel.com', 'blob.vercel-storage.com'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 's-maxage=60, stale-while-revalidate=30',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
