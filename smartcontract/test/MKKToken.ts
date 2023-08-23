import {
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers as eth } from "hardhat";
import type {Contract} from "ethers";
import {HardhatEthersSigner} from "@nomicfoundation/hardhat-ethers/src/signers";

const emissionValue = 8100000n * 10n ** 18n;

describe("MKKToken", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployMKKToken() {
    // Contracts are deployed using the first signer/account by default
    const [owner, firstRunner, secondRunner]: HardhatEthersSigner[] = await eth.getSigners();
    const MKKToken: Contract = await eth.deployContract("MKKToken", [
      "MKKToken", "MKK", 18, emissionValue, emissionValue
    ], owner);
    const decimals = await MKKToken.decimals();
    function withDecimals(val: bigint | number) {
      return BigInt(val) * 10n ** BigInt(decimals);
    }

    return { MKKToken, owner, firstRunner, secondRunner, withDecimals };
  }

  describe("MKKToken", function () {
    it("Should have the right totalSupply", async function () {
      const { MKKToken } = await loadFixture(deployMKKToken);

      expect(await MKKToken.totalSupply()).to.equal(emissionValue);
    });
    it("Should work transfer() correct", async function () {
      const { MKKToken, owner, firstRunner, withDecimals } = await loadFixture(deployMKKToken);
      const senderOldBalance = await MKKToken.balanceOf(owner.address);
      const recipientOldBalance = await MKKToken.balanceOf(firstRunner.address);
      await MKKToken.transfer(firstRunner.address, withDecimals(500));
      const senderNewBalance = await MKKToken.balanceOf(owner.address);
      const recipientNewBalance = await MKKToken.balanceOf(firstRunner.address);

      expect(senderNewBalance).to.equal(senderOldBalance - withDecimals(500));
      expect(recipientNewBalance).to.equal(recipientOldBalance + withDecimals(500));
    });
    it("Should work approve() correct", async function () {
      const { MKKToken, owner, firstRunner, withDecimals } = await loadFixture(deployMKKToken);
      await MKKToken.approve(firstRunner.address, withDecimals(500));
      const allowance = await MKKToken.allowance(owner.address, firstRunner.address);

      expect(allowance).to.equal(withDecimals(500));
    });
    it("Should work transferFrom() correct", async function () {
      const { MKKToken, firstRunner, secondRunner, withDecimals } = await loadFixture(deployMKKToken);
      await MKKToken.transfer(firstRunner.address, withDecimals(500));
      const firstRunnerInstance = MKKToken.connect(firstRunner) as Contract;
      await firstRunnerInstance.approve(firstRunner.address, withDecimals(500));

      const transformFrom = () => {
        return firstRunnerInstance.transferFrom(
          firstRunner.address, secondRunner.address, withDecimals(500)
        )
      }

      await expect(transformFrom()).to.changeTokenBalances(
        firstRunnerInstance,
        [firstRunner.address, secondRunner.address],
        [withDecimals(-500), withDecimals(500)]);
    });
    it("Should not work transferFrom() with low allowance", async function () {
      const { MKKToken, firstRunner, secondRunner, withDecimals } = await loadFixture(deployMKKToken);
      const firstRunnerInstance = MKKToken.connect(firstRunner) as Contract;

      const transformFrom = () => {
        return firstRunnerInstance.transferFrom(firstRunner.address, secondRunner.address, withDecimals(500))
      }

      await expect(transformFrom()).to.be.revertedWith("ERC20: insufficient allowance");
    });
    it("Should work burn() correct", async function () {
      const { MKKToken, firstRunner, withDecimals } = await loadFixture(deployMKKToken);
      await MKKToken.transfer(firstRunner.address, withDecimals(500));
      const firstRunnerInstance = MKKToken.connect(firstRunner) as Contract;

      await expect(
        firstRunnerInstance.burn(withDecimals(500))
      ).to.changeTokenBalance(
        firstRunnerInstance, firstRunner.address, withDecimals(-500)
      );
    });
    it("Should be correct owner", async function () {
      const { MKKToken, owner } = await loadFixture(deployMKKToken);

      expect(await MKKToken.owner()).to.equal(owner.address);
    });
    it("Only owner can use mint", async function () {
      const { MKKToken, firstRunner, withDecimals } = await loadFixture(deployMKKToken);

      expect(await MKKToken.mint(firstRunner.address, withDecimals(0))).to.emit(MKKToken, "Transfer");
    });
    it("Common user can't use mint", async function () {
      const { MKKToken, firstRunner, withDecimals } = await loadFixture(deployMKKToken);
      const firstRunnerInstance = MKKToken.connect(firstRunner) as Contract;

      await expect(firstRunnerInstance.mint(firstRunner.address, withDecimals(500)))
        .to.be.revertedWith("Ownable: caller is not the owner");
    });
    it("Cap can't be overflow", async function () {
      const { MKKToken, firstRunner, withDecimals } = await loadFixture(deployMKKToken);

      await expect(MKKToken.mint(firstRunner.address, withDecimals(8100001)))
        .to.be.revertedWith("ERC20Capped: cap exceeded");
    });
  });
});
