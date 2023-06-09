/** @type {import('next').NextConfig} */
module.exports = {
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'http://localhost:10000/:path*',
          },
        ]
      },
  };