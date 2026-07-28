/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  logging: {
    warnings: false,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api-palstravels.webdadsprojects.com",
        pathname: "/storage/**",
      },
      {
        protocol: "http",
        hostname: "192.168.1.86",
        port: "3000",
        pathname: "/storage/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/storage/**",
      },
    ],
  },
  compress: true,
};

module.exports = nextConfig;
