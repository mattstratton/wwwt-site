/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  // Remove experimental.serverActions as it's now enabled by default
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
  // Add this to prevent environment variables from being exposed
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't bundle AWS SDK on the client side
      config.resolve.fallback = {
        aws4: false,
        'aws-sdk': false,
        '@aws-sdk/client-s3': false,
        '@aws-sdk/s3-request-presigner': false,
      }
    }
    return config
  },
};

export default nextConfig; 