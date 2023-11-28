const withNextIntl = require("next-intl/plugin")();

/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		ETHERSCAN_API: process.env.ETHERSCAN_API,
	},
	images: {
		domains: ["www.tesourodireto.com.br"],
	},
};

module.exports = withNextIntl(nextConfig);
