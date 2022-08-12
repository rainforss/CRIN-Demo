/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.ctfassets.net"],
  },
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/api/members",
        headers: [
          {
            key: "Cache-Control",
            value: "private, max-age=60, must-revalidate",
          },
        ],
      },
      {
        source: "/api/options/membertype",
        headers: [
          {
            key: "Cache-Control",
            value: "private, max-age=1800, must-revalidate",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
