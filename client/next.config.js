/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        ETHERSCAN_API: process.env.ETHERSCAN_API,
    },
}

module.exports = nextConfig
