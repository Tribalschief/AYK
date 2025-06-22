import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    remotePatterns:[
      {
        hostname: "cdn.sanity.io",
        protocol: "https",
        port: ""
      }
    ]
  },
  reactStrictMode: false,
     // Only needed for GitHub Pages or similar
};

export default nextConfig;
