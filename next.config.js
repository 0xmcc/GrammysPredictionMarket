/** @type {import('next').NextConfig} */

const nextConfig = {
  
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
  },
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/',
  //       permanent: true,
  //     },
  //   ]
  // },
}

module.exports = nextConfig 