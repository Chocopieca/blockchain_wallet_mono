import {defineStore} from "pinia";
import {ethers} from "ethers";
import {useEtherJsStore} from "@/stores/useEtherJsStore";
import abi from "@/abi";
import {computed} from "vue";
import {markRaw} from "@vue/reactivity";

const userAddress = computed(() => useEtherJsStore().userAddress);
const signer = computed(() => useEtherJsStore().signer);

function toDecimals(amount, decimal) {
  return useEtherJsStore().toDecimals(amount, decimal);
}
function fromDecimals(amount, decimal) {
  return useEtherJsStore().fromDecimals(amount, decimal);
}

export const useErc20TokenStore = defineStore("erc20Token", {
  state() {
    return {
      instance: null,
      balance: null,
      decimals: '',
      symbol: '',
      name: '',
    }
  },
  getters: {
    getProvider: state => state.provider,
    getCurrentBalance: state => {
      if (state.balance && state.decimals) {
        return fromDecimals(state.balance, state.decimals);
      } else return 0
    }
  },
  actions: {
    async init() {
      if(!this.instance) await this.initInstance();
      await this.getData();
    },
    async initInstance() {
      const [tokenAbi, address] = [
        (await abi()).MKKTokenABI.default, import.meta.env.VITE_ERC20_TOKEN
      ];
      if (!this.instance && signer.value) {
        this.instance = markRaw(await new ethers.Contract(address, tokenAbi, signer.value));
      }
      this.decimals = await this.instance.decimals();
      this.symbol = await this.instance.symbol();
      this.name = await this.instance.name();
    },
    async getData(){
      if(this.instance) {
        this.balance = await this.loadBalance();
      }
    },
    async loadBalance() {
      return await this.instance.balanceOf(userAddress.value);
    },
    async sendCurrency(payload) {
      const { receiver, amount } = payload;
      const parseAmount = toDecimals(amount, this.decimals);
      const tx = await this.instance.transfer(receiver, parseAmount);
      await tx.wait();
      await this.getData();
      return tx;
    }
  }
})
