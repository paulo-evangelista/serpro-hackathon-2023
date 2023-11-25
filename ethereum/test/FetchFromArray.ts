import {
	time,
	loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";

import { expect } from "chai";
import { ethers, network } from "hardhat";

// 0x3fFBc36024f9b9f089bea898Baaefd8adB4dcfb6
// Contract address

describe("FetchFromArray", function () {
	it("Should fetch from array", async function () {
		const FetchFromArray = await ethers.getContractFactory(
			"FetchFromArray"
		);
		const fetchFromArray = await FetchFromArray.deploy();

		await fetchFromArray.waitForDeployment();

		const currentTimestampInSeconds = Math.round(Date.now() / 1000);
		const unlockTime = currentTimestampInSeconds + 60;

		console.log(
			`FetchFromArray deployed to: ${await fetchFromArray.getAddress()} with unlockTime: ${unlockTime}`
		);

		const tx = await fetchFromArray.requestFirstId();
		const receipt = await tx.wait();

		console.log(receipt, tx);
	});
});
