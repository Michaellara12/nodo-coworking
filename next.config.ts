import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imagedelivery.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "videodelivery.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "iframe.videodelivery.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "customer-efn0kmspdh2xb186.cloudflarestream.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
