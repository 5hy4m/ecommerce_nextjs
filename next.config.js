/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
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
