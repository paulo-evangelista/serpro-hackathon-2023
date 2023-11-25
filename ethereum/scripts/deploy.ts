import { ethers } from "hardhat";

async function main() {
	const currentTimestampInSeconds = Math.round(Date.now() / 1000);
	const unlockTime = currentTimestampInSeconds + 60;

	// constructor() ConfirmedOwner(msg.sender) {
	//     setChainlinkToken(0x779877A7B0D9E8603169DdbD7836e478b4624789);
	//     setChainlinkOracle(0x6090149792dAAeE9D1D568c9f9a6F6B46AA29eFD);
	//     jobId = "7d80a6386ef543a3abb52817f6707e3b";
	//     fee = (1 * LINK_DIVISIBILITY) / 10; // 0,1 * 10**18 (Varies by network and job)
	// }
	// const fetchFromArray = await ethers.deployContract("FetchFromArray", [
	// 	"0x779877A7B0D9E8603169DdbD7836e478b4624789",
	// 	"0x6090149792dAAeE9D1D568c9f9a6F6B46AA29eFD",
	// 	"7d80a6386ef543a3abb52817f6707e3b",
	// 	0.1 * 10 ** 18,
	// ]);

	const fetchFromArray = await ethers.getContractFactory("FetchFromArray");
	const contract = await fetchFromArray.deploy();

	await contract.waitForDeployment();

	// await fetchFromArray.waitForDeployment();

	console.log(
		`FetchFromArray deployed to: ${await contract.getAddress()} with unlockTime: ${unlockTime}`
	);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
