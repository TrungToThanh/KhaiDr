import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
    deviceSizes: [320, 420, 768, 1024, 1200], // Hỗ trợ ảnh responsive
    formats: ["image/avif", "image/webp"], // Ưu tiên định dạng ảnh tối ưu
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
