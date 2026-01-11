/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            // MODIFICA QUI SOTTO: Ho aggiunto frame-src e ampliato img-src
            value: `
              default-src 'self'; 
              style-src 'self' 'unsafe-inline'; 
              script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live https://vercel.com; 
              img-src 'self' data: blob: *.supabase.co https://*.googleapis.com https://*.gstatic.com; 
              font-src 'self' data:; 
              connect-src 'self' *.supabase.co; 
              frame-src 'self' https://www.google.com https://maps.google.com https://googleusercontent.com http://googleusercontent.com https://www.openstreetmap.org;
            `.replace(/\s{2,}/g, ' ').trim(),
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin-allow-popups',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
        ],
      },
    ];
  },
}

export default nextConfig;