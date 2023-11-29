import { ethers } from "hardhat";

async function main() {
	const currentTimestampInSeconds = Math.round(Date.now() / 1000);
	const unlockTime = currentTimestampInSeconds + 60;

	const fetchFromArray = await ethers.getContractFactory("RealDigital");
	const contract = await fetchFromArray.deploy("0xeF24DE40b96d66c3df86d0A803CC8986221e6c69");

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
