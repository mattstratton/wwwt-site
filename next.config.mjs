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
};

export default nextConfig; 