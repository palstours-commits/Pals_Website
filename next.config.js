/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  logging: {
    warnings: false,
  },

  images: {
    remotePatterns: [
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

      // Unsplash direct CDN
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },

      // Unsplash random source
      {
        protocol: "https",
        hostname: "source.unsplash.com",
      },

      // Picsum
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
};

module.exports = nextConfig;
