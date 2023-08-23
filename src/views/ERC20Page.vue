<template>
  <div class="h-100 flex-center">
    <ConnectMetamask v-if="!isConnected" />
    <BaseCard v-else width="500" bgColor="#ffffff">
      <div class="d-flex justify-space-between align-center">
        <h1 class="ma-0 main-bright-red-text">{{ name }}</h1>
        <a
          href="https://sepolia.etherscan.io/address/0x02c7802C3Db3a36658fFBc97cce49c31Adbcff03"
          target="_blank"
          class="main-black-text"
        >
          Contract
        </a>
      </div>
      <div>Balance: <span class="size20-weight700 main-red-text">{{ balance }} {{ symbol }}</span></div>
      <BaseDivider class="my-2" color="#000000"/>
      <div>Address:</div>
      <div class="address">
        {{ getAddress }}
      </div>
      <BaseDivider class="my-2" color="#000000"/>
      <SendErc20Form />
    </BaseCard>
  </div>
</template>

<script>
import {useErc20TokenStore} from "@/stores/useErc20TokenStore";
import {computed, defineAsyncComponent} from "vue";
import {useEtherJsStore} from "@/stores/useEtherJsStore";

export default {
  name: "ERC20Page",
  components: {
    SendErc20Form: defineAsyncComponent(() =>
        import("@/components/module/erc20Page/SendErc20Form.vue")
    ),
    ConnectMetamask: defineAsyncComponent(
        () => import("@/components/common/ConnectMetamask.vue")
    ),
  },
  data() {
    return {
      form: {
        address: "",
        amount: "",
      }
    }
  },
  setup() {
    const erc20Token = useErc20TokenStore();
    const balance = computed(() => erc20Token.getCurrentBalance ?? "-.----");
    const symbol = computed(() => erc20Token.symbol ?? "");
    const name = computed(() => erc20Token.name ?? "");

    return {
      erc20Token, balance, symbol, name
    }
  },
  computed: {
    getAddress() {
      let address = "0x5aCD656a61d4b2AAB249C3Fe3129E3867ab99283";
      return `${address.slice(0, 10)}...${address.slice(-10)}`
    },
    isConnected() {
      return useEtherJsStore().isConnected;
    }
  }
}
</script>

<style scoped>
.address {
  max-width: 250px;
  overflow: hidden;
}
</style>
