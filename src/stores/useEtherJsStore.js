import {defineStore} from "pinia";
import {ethers} from "ethers";
import {markRaw} from "@vue/reactivity";

export const useEtherJsStore = defineStore("etherJs", {
  state() {
    return {
      isConnected: false,
      provider: null,
      signer: null,
      userAddress: null,
      userEtherBalance: 0,
    }
  },
  getters: {
    getProvider: (state) => state.provider,
  },
  actions: {
    async onConnect() {
      this.provider = await this.setProvider();
      if(this.provider) {
        this.isConnected = true;
        await this.getUserData();
      }
    },
    async getUserData() {
      this.signer = this.getProvider.getSigner();
      this.userAddress = await this.getCurrentAccount();
      await this.getUserBalance()
    },
    async setProvider() {
      const provider = markRaw(await new ethers.providers.Web3Provider(window.ethereum));
      await provider.send('eth_requestAccounts', []);
      return provider;
    },
    async getCurrentAccount() {
      return await this.signer.getAddress();
    },
    async getUserBalance() {
      const balance = await this.getProvider.getBalance(
        this.userAddress
      );
      this.userEtherBalance = this.fromDecimals(balance, 18);
    },
    async onSendEth(payload) {
      const {receiver, amount} = payload;
      const sendAmountValue = this.toDecimals(amount, 18);
      const tx = await this.signer.sendTransaction({
        to: receiver,
        value: sendAmountValue
      });
      await tx.wait();
      await this.getUserBalance();
      return tx;
    },
    toDecimals(amount, decimal) {
      if (amount) {
        return ethers.utils
          .parseUnits(`${amount}`, BigInt(decimal))
          .toString();
      }
    },
    fromDecimals(amount, decimal) {
      if (amount) {
        return Number(ethers.utils
          .formatUnits(`${amount}`, decimal))
          .toFixed(4);
      }
    },
  }
})
