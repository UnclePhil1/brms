/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/api/:path*', // The endpoint you will call from the client-side
          destination: 'https://1.rpc.thirdweb.com/:path*', // The server you want to proxy requests to
        },
        {
          source: '/another-api/:path*', // Another example endpoint
          destination: 'https://11155111.rpc.thirdweb.com/:path*', // Another server you want to proxy requests to
        },
      ];
    },
  };
  
  export default nextConfig;
  