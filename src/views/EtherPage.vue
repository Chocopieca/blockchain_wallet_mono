<template>
  <div class="h-100 flex-center">
    <ConnectMetamask v-if="!isConnected" />
    <BaseCard v-else width="500" bgColor="#ffffff">
      <h1 class="ma-0 main-bright-red-text">ETH</h1>
      <div>Balance: <span class="size20-weight700 main-red-text">{{ userEtherBalance }}</span> ETH</div>
      <BaseDivider class="my-2" color="#000000"/>
      <div>Address:</div>
      <div class="address">
        {{ getAddress }}
      </div>
      <BaseDivider class="my-2" color="#000000"/>
      <SendEtherForm />
    </BaseCard>
  </div>
</template>

<script>
import {useEtherJsStore} from "@/stores/useEtherJsStore";
import {computed, defineAsyncComponent} from "vue";

export default {
  name: "EtherPage",
  components: {
    SendEtherForm: defineAsyncComponent(
        () => import("@/components/module/etherPage/SendEtherForm.vue")
    ),
    ConnectMetamask: defineAsyncComponent(
        () => import("@/components/common/ConnectMetamask.vue")
    ),
  },
  setup() {
    const useEtherJs = useEtherJsStore();
    const userAddress = computed(() => useEtherJs.userAddress);
    const userEtherBalance = computed(() => useEtherJs.userEtherBalance);
    const isConnected = computed(() => useEtherJs.isConnected);

    return {useEtherJs, userAddress, userEtherBalance, isConnected};
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
