/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'your-strapi-domain.com'],
  },
};

module.exports = nextConfig;
