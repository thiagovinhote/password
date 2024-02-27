/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  typescript: {
    ignoreBuildErrors: true
  },
  experimental: {
    serverComponentsExternalPackages: ['@adonisjs/encryption'],
  },
}
