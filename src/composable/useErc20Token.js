import {ethers} from "ethers";
import abi from "@/abi";
import {useEtherJsStore} from "@/stores/useEtherJsStore";
import {computed, onMounted, ref} from "vue";

const provider = computed(() => useEtherJsStore().getProvider);
const userAddress = computed(() => useEtherJsStore().userAddress);
const signer = computed(() => useEtherJsStore().signer);

function toDecimals(amount, decimal) {
  return useEtherJsStore().toDecimals(amount, decimal);
}
function fromDecimals(amount, decimal) {
  return useEtherJsStore().fromDecimals(amount, decimal);
}

export function useErc20TokenStore() {
  let instance = ref(null);
  let balance = ref(null);
  let decimals = ref("");
  let symbol = ref("");
  let name = ref("");

  async function initInstance() {
    const [tokenAbi, address] = [
      (await abi()).MKKTokenABI.default, import.meta.env.VITE_ERC20_TOKEN
    ];
    if (!instance.value && signer.value) {
      instance.value = await new ethers.Contract(address, tokenAbi, signer.value);
    }
    decimals.value = await instance.value.decimals();
    symbol.value = (await instance.value.symbol());
    name.value = (await instance.value.name());
  }

  async function getData(){
    if(instance.value) {
      balance.value = await loadBalance();
    }
  }

  async function loadBalance() {
    return await instance.value.balanceOf(userAddress.value);
  }

  const getCurrentBalance = computed(() => {
    if (balance.value && decimals.value) {
      return fromDecimals(balance.value, decimals.value);
    }
  })

  onMounted(async () => {
    if(!instance.value) await initInstance();
    await getData();
  })

  async function sendCurrency(payload) {
    const { receiver, amount } = payload;
    const parseAmount = toDecimals(amount, decimals.value);
    const tx = await this.instance.value.transfer(receiver, parseAmount);
    await tx.wait();
    await getData();
    return tx;
  }

  return {
    instance, getCurrentBalance, decimals, symbol, name, balance, getData, sendCurrency
  }
}
