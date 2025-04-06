/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
};

module.exports = nextConfig;
