"use server";
import axios from "./axios";

export const getAbi = async (address: string) => {
	return await axios
		.get(
			`https://api-sepolia.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=${process.env.ETHERSCAN_API}`
		)
		.then((res) => {
			return JSON.parse(res.data.result);
		})
		.catch((err) => {
			return "";
		});
};
