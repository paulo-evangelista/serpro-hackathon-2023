// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require('hardhat');

async function main() {

    const contract = await hre.ethers.deployContract('CustomPublicTitle', [
        "O titulo do bgl",
        "TTT",
        12,
        1000,
        12347669,
        "SGDDYTUI",
        "SHRTY45Y4RGR",
        2134542341, 
        353245234642,
        1000,
        123123,
        324324234,
        "SDFsdfsafd"
    ]);

  await contract.waitForDeployment();

  console.log(`deployed to ${contract.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
