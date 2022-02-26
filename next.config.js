const withImages = require('next-images');
const isProd = process.env.NODE_ENV === 'production'
module.exports = withImages({
  images: {
    minimumCacheTTL: 31536000,
    domains: ['trumfashion.com'],
    disableStaticImages: true,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  reactStrictMode: true,
  webpack(config, options) {
    return config
  }
})