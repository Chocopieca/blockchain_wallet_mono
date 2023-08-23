// @ts-ignore
import { ethers } from "hardhat";
import type {Contract} from "ethers";

async function main() {
  const [owner] = await ethers.getSigners();
  let date = String(Date.now()).slice(0, -3);
  const numberOfMonth = 26;
  const emissionValue = 8100000n * 10n ** 18n;

  const MKKToken: {[key: string]: any} | Contract = await ethers.deployContract("MKKToken", [
    "MKKToken", "MKK", 18, emissionValue, emissionValue / 2n
  ], owner);
  const MKKVesting: {[key: string]: any} | Contract = await ethers.deployContract("MKKVesting", [
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    date,
    numberOfMonth,
  ], owner);

  await MKKToken.waitForDeployment();
  await MKKVesting.waitForDeployment();

  await MKKToken.transfer(MKKVesting.target, emissionValue / 100n * 5n);
  console.log('vesting amount', 8100000 * 0.05);

  const amountOneMonth = await MKKVesting["vestedAmount(address,uint64)"](
    MKKToken.target,
    +date + (30 * 24 * 60 * 60)
  )
  console.log('amountOneMonth', Math.round(Number(amountOneMonth) * 10 ** -18));

  const amountSixMonth = await MKKVesting["vestedAmount(address,uint64)"](
    MKKToken.target,
    +date + (6 * 30 * 24 * 60 * 60)
  )
  console.log('amountSixMonth', Math.round(Number(amountSixMonth) * 10 ** -18));

  const amountLastMonth = await MKKVesting["vestedAmount(address,uint64)"](
    MKKToken.target,
    +date + (numberOfMonth * 30 * 24 * 60 * 60)
  )
  console.log('amountLastMonth', Math.round(Number(amountLastMonth) * 10 ** -18));

  console.log(
    `MKKToken deployed to ${MKKToken.target}`
  );
  console.log(
    `MKKVesting deployed to ${MKKVesting.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
