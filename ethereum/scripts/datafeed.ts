import { ethers } from "hardhat";

async function main() {
	const currentTimestampInSeconds = Math.round(Date.now() / 1000);
	const unlockTime = currentTimestampInSeconds + 60;

	const dataFeed = await ethers.getContractFactory("DataFeed");
	const contract = await dataFeed.deploy();

	await contract.waitForDeployment();

	// await dataFeed.waitForDeployment();

	console.log(
		`DataFeed deployed to: ${await contract.getAddress()} with unlockTime: ${unlockTime}`
	);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
