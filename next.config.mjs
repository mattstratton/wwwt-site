/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  // Ensure AWS credentials are only available on the server
  serverRuntimeConfig: {
    // Will only be available on the server side
    WWWT_AWS_ACCESS_KEY_ID: process.env.WWWT_AWS_ACCESS_KEY_ID,
    WWWT_AWS_SECRET_ACCESS_KEY: process.env.WWWT_AWS_SECRET_ACCESS_KEY,
    WWWT_AWS_REGION: process.env.WWWT_AWS_REGION,
    S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
  },
  // Empty publicRuntimeConfig to ensure no secrets leak
  publicRuntimeConfig: {},
  // Add security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  // Disable webpack5 cache in production
  webpack: (config, { dev }) => {
    if (!dev) {
      // Disable persistent caching in production
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig; 