<template>
  <Transition mode="out-in">
    <div class="card">
      <BaseLoading v-if="isLoading" />
      <form>
        <h3>Connect your BTC address</h3>
        <div class="mb-5">Enter your private key for wallet connection.</div>

        <BaseInput
          v-model="privateKey"
          label="Private key"
          class="mb-5"
          :error="errors.getError('privateKey')"
          @clearError="errors.clearError('privateKey')"
        />
        <BaseButton
          buttonColor="#E95420"
          class="connect-button"
          @click="onConnectBtcWallet"
        >
          Connect your btc wallet
        </BaseButton>
      </form>
    </div>
  </Transition>
</template>

<script>
import {defineComponent} from "vue";
import {useBtcStore} from "@/stores/useBtcStore";
import useValidateModule from "@/composable/useValidateModule";

export default defineComponent({
  name: "ConnectBtcWallet",
  data() {
    return {
      privateKey: "",
      isLoading: false,
      errors: this.validateModule.errorHandlerModule.value,
    }
  },
  setup() {
    const useBtc = useBtcStore();
    const validateModule = useValidateModule();

    async function initBtcWallet(privateKey) {
      return await useBtc.initBtcWallet(privateKey);
    }
    return {
      validateModule, initBtcWallet
    }
  },
  methods: {
    async onConnectBtcWallet() {
      if (!this.validate(this.privateKey)) return
      this.isLoading = true;
      await this.initBtcWallet(this.privateKey);
      this.isLoading = false;
    },
    validate(privateKey) {
      return this.validateModule.validateForm([
        { key: "privateKey", value: privateKey, method: "isNotEmpty" },
        { key: "privateKey", value: privateKey, method: "isPrivateKey" },
      ])
    }
  }
})
</script>

<style scoped>
.card {
  min-width: 280px;
}
.connect-button {
  width: 100%;
}
</style>
