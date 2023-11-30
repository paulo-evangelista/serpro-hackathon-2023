import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const INFURA_API_KEY = process.env.INFURA_API_KEY || "";
const SEPOLIA_PRIVATE_KEY = process.env.GOV_PK || "";

const config: HardhatUserConfig = {
	solidity: {
		version: "0.8.22",
		settings: {
		  viaIR: true,
		  optimizer: {
			enabled: true,
			details: {
			  yulDetails: {
				optimizerSteps: "u",
			  },
			},
		  },
		},
	  },
	  etherscan: {
		apiKey: {
			sepolia: "HII7CD3WJ4DTQ1UN2Q8858PX6AED2J7TAJ"
		}
	  },
	  
	networks: {
		sepolia: {
			url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
			accounts: [SEPOLIA_PRIVATE_KEY],
		},
	},
};

export default config;
