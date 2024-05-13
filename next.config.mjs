/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_ROUTE: process.env.NEXT_PUBLIC_API_ROUTE,
  }
};

export default nextConfig;
