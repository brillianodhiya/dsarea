/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.mayar.club",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "api-dsarea.aitilokal.com",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "api-dsarea.aitilokal.com",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
