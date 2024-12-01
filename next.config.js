/** @type {import('next').NextConfig} */
console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('Supabase Anon Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
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