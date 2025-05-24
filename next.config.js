/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: 'export',
    images: {
        unoptimized: true,
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
    async redirects() {
        return [
            {
                source: '/admin/relogin',
                destination:
                    'https://dev-lhn0nvvpalisbbnw.us.auth0.com/authorize',
                permanent: true,
            },
        ];
    },
};

module.exports = nextConfig;
