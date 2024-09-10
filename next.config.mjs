/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://1.rpc.thirdweb.com/:path*',
      },
    ];
  },
  };
  
  export default nextConfig;
  