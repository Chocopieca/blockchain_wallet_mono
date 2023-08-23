<template>
  <div>
    <Transition mode="out-in">
      <BtcConnectionMenu v-if="!isConnected"/>
      <BaseCard v-else width="500" bgColor="#ffffff">
        <div class="d-flex align-center">
          <h1 class="ma-0 main-bright-red-text mr-2">Btc</h1>
          <span class="size12-weight400">({{networkName}})</span>
        </div>
        <div class="d-flex justify-start align-center">
          <div class="mr-2">Balance:</div>
          <div class="size20-weight700 main-red-text mr-2">
            {{ userBtcBalance }} BTC
          </div>
          <RefreshIcon @click="updateBalance" class="cursor-pointer"/>
        </div>
        <BaseDivider class="my-2" color="#000000"/>
        <div>Address:</div>
        <a
            :href="scanAddress"
            class="address main-black-text"
            target="_blank"
        >
          {{ userAddress }}
        </a>
        <BaseDivider class="my-2" color="#000000"/>
        <SendBtcForm />
      </BaseCard>
    </Transition>
  </div>
</template>

<script>
import {computed, defineAsyncComponent} from "vue";
import {useBtcStore} from "@/stores/useBtcStore";
import useBitcoinUtils from "@/composable/bitcoin/useBitcoinUtils";
import useBitcoinNetwork from "@/composable/bitcoin/useBitcoinNetwork";

export default {
  name: "BtcCard",
  components: {
    SendBtcForm: defineAsyncComponent(
        () => import("@/components/module/btcPage/SendBtcForm.vue")
    ),
    BtcConnectionMenu: defineAsyncComponent(
        () => import("@/components/module/btcPage/BtcConnectionMenu.vue")
    ),
  },
  setup() {
    const btcStore = useBtcStore();
    const scanAddress = computed(() => useBitcoinUtils().getAddressLink.value)
    const networkName = computed(() => useBitcoinNetwork().getSelectedNetwork.value.name)
    const isConnected = computed(() => btcStore.getCurrentWallet.isConnected);
    const userAddress = computed(() => btcStore.getCurrentWallet.btcAddress);
    const userBtcBalance = computed(() => btcStore.getCurrentWallet.btcBalance);

    async function updateBtcBalance() {
      await btcStore.updateBtcBalance();
    }

    return {scanAddress, userAddress, userBtcBalance, isConnected, networkName, updateBtcBalance};
  },
  methods: {
    async updateBalance() {
      await this.updateBtcBalance();
    }
  },
  computed: {
    getAddress() {
      return this.userAddress ? `${this.userAddress.slice(0, 10)}...${this.userAddress.slice(-10)}` : "---"
    },
  }
}
</script>

<style scoped>
.address {
  max-width: 400px;
  width: 100%;
  overflow: hidden;
}
</style>
