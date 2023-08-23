// @ts-ignore
import { ethers, run } from "hardhat";

async function main() {
  const [owner] = await ethers.getSigners();
  const emissionValue = 8100000n * 10n ** 18n;
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const parameters = [
    'MKKToken', 'MKK', 18, emissionValue, emissionValue
  ]
  const MKKToken = await ethers.deployContract("MKKToken", parameters, owner);

  await MKKToken.waitForDeployment();

  console.log(
    `MKKToken deployed to ${MKKToken.target} at ${currentTimestampInSeconds}`
  );
  setTimeout(() => {
    run(`verify:verify`, {
      address: MKKToken.target,
      constructorArguments: [...parameters],
    });
  }, 20000);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
