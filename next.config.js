/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                // TODO: Have to change the host name to imageKit.io
                hostname: 'media.istockphoto.com',
            },
            {
                protocol: 'https',
                hostname: 'ik.imagekit.io',
                // TODO: Have to add pathName to imageKit
            },
        ],
    },
};

module.exports = nextConfig;
