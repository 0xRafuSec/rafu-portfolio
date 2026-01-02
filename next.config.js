/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  // React 19 compatibility
  experimental: {
    reactCompiler: false,
  },
}

module.exports = nextConfig

