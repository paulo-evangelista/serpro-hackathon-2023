const withNextIntl = require("next-intl/plugin")();

/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		ETHERSCAN_API: process.env.ETHERSCAN_API,
	},
	images: {
		// domains: ["www.tesourodireto.com.br"],
		remotePatterns: [
			{
				hostname: "www.tesourodireto.com.br",
				pathname: "/**",
				protocol: "https",
			},
			{
				hostname: "avatars.githubusercontent.com",
				pathname: "/**",
				protocol: "https",
			},
			{
				// (https://github.com/paulo-evangelista.png)
				hostname: "github.com",
				pathname: "/**",
				protocol: "https",
			},
		],
	},
};

module.exports = withNextIntl(nextConfig);
