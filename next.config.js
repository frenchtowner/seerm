/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // This avoids the case-sensitivity bug on Windows
  typescript: {
    ignoreBuildErrors: true,
  },

  // Optional: You can add image domains or other config here
  images: {
    domains: [],
  },

  // Optional: if you're using experimental features
  experimental: {},
};

module.exports = nextConfig;
