<template>
  <div>
    <Transition mode="out-in">
      <ConnectBtcWallet v-if="connectType === 'withPrivateKey'" class="mb-5" />
      <GenerateBtcAddress v-else-if="connectType === 'generateAddress'" class="mb-5" />
    </Transition>
    <div class="d-flex justify-space-between">
      <span class="size16-weight700 main-orange-text cursor-pointer">
        <Transition mode="out-in">
          <span
            v-if="connectType === 'withPrivateKey'"
            @click="connectType = 'generateAddress'"
          >Create address</span>
          <span
            v-else-if="connectType === 'generateAddress'"
            @click="connectType = 'withPrivateKey'"
          >I have private key</span>
        </Transition>
      </span>
      <ChangeBtcNetwork />
    </div>
  </div>
</template>

<script>
import {defineAsyncComponent} from "vue";

export default {
  name: "BtcConnectionMenu",
  components: {
    ConnectBtcWallet: defineAsyncComponent(
        () => import("@/components/module/btcPage/ConnectBtcWallet.vue")
    ),
    GenerateBtcAddress: defineAsyncComponent(
        () => import("@/components/module/btcPage/GenerateBtcAddress.vue")
    ),
    ChangeBtcNetwork: defineAsyncComponent(
        () => import("@/components/module/btcPage/ChangeBtcNetwork.vue")
    ),
  },
  data() {
    return {
      connectType: "withPrivateKey",
    }
  }
}
</script>

<style scoped>

</style>
