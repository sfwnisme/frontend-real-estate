import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "20mb",
    },
  },
  images: {
    unoptimized: process.env.NEXT_PUBLIC_NETLIFY === "true",
    remotePatterns: [
      // AWS S3 buckets
      {
        protocol: "https",
        hostname: "*.s3.*.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "*.s3.amazonaws.com",
      },
      // CloudFront CDN
      {
        protocol: "https",
        hostname: "*.cloudfront.net",
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");
export default withNextIntl(nextConfig);
