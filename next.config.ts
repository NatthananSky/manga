import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['firebasestorage.googleapis.com','images.mynovel.co','manga-store.s3.us-west-000.backblazeb2.com'],
  },
  experimental: {
    typedRoutes: false, // <--- เพิ่มบรรทัดนี้
  },
};

export default nextConfig;
