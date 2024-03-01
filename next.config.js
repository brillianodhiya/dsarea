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
        hostname: "media.mayar.id",
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
      {
        protocol: "https",
        hostname: "api.dsarea.com",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "api.dsarea.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "api-dsprod.aitilokal.com",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "api-dsprod.aitilokal.com",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
