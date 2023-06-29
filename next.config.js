/** @type {import('next').NextConfig} */
module.exports = {
  env: {
    SERVER_URL: "http://localhost:10000",
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:10000/:path*",
      },
    ];
  },
};
