/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "https://www.github.com",
            },
        ],
    },
};

module.exports = nextConfig;
