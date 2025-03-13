import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true, // Allow SVGs (ensure input validation for security)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allows external images from any HTTPS source (optimize for specific domains if needed)
      },
    ],
  },

  reactStrictMode: true, // Ensures React best practices
  productionBrowserSourceMaps: false, // Disables source maps in production for security

  devIndicators: {
    position: "bottom-right", // Keeps build activity in a visible position (no deprecated options)
  },
};

export default nextConfig;
