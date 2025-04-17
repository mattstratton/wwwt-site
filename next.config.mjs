/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [process.env.S3_BUCKET_NAME?.split('.')[0] || ''].filter(Boolean),
  },
};

export default nextConfig; 