/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        // TODO: Have to change the host name to imageKit.io
        hostname: "media.istockphoto.com",
      },
    ],
  },
};

module.exports = nextConfig;
