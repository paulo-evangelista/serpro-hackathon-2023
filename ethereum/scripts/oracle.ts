import { ethers } from "hardhat";

async function main() {
	console.time("IPCAOracle deployed");
	const ipcaOracle = await ethers.getContractFactory("IPCAOracle");
	const contract = await ipcaOracle.deploy();

	await contract.waitForDeployment();

	console.log(`IPCAORracle deployed to: ${await contract.getAddress()}`);
	console.timeEnd("IPCAOracle deployed");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
