/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    minimumCacheTTL: 2678400,
    domains: [
      "localhost",
      "d20esn902458fk.cloudfront.net",
      "d134sx875xrex2.cloudfront.net",
      "imgproxy7.tinhte.vn",
      "photo2.tinhte.vn",
      "example.com",
    ],
  },
  env: {
    API_URL: process.env.API_URL,
    AUTH_API_URL: process.env.AUTH_API_URL,
  },
  async headers() {
    return [
      {
        source: "/(.*)\\.(png|jpg|jpeg|svg|gif|webp)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
