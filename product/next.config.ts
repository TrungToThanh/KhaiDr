import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "images.unsplash.com",
      "theme.hstatic.net",
      "product.hstatic.net",
      "www.laneige.com",
      "www.etude.com",
      "www.sulwhasoo.com",
      "nocohub-001-prod-app-attachments.s3.us-east-2.amazonaws.com",
    ],
  },
};

export default nextConfig;
