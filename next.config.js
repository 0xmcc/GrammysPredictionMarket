/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'standalone', // Add this for Netlify deployment
  webpack: (config) => {
    if (!config.externals) {
      config.externals = []
    } else if (!Array.isArray(config.externals)) {
      config.externals = [config.externals]
    }
    config.externals.push('encoding', 'bufferutil', 'utf-8-validate')
    return config
  },
  images: {
    domains: ['i.scdn.co'],
    unoptimized: true, // Add this for Netlify deployment

  },

}

module.exports = nextConfig 