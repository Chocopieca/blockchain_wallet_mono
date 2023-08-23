<template>
  <Transition mode="out-in">
    <BaseLoading v-if="isLoading" />
    <BaseButton
      v-else
      buttonColor="#E95420"
      class="connect-button"
      @click="onConnectMetamask"
    >
      Connect Metamask
    </BaseButton>
  </Transition>
</template>

<script>
import {defineComponent} from "vue";
import {useEtherJsStore} from "@/stores/useEtherJsStore";
import {useErc20TokenStore} from "@/stores/useErc20TokenStore";

export default defineComponent({
  name: "ConnectMetamask",
  data() {
    return {
      isLoading: false,
    }
  },
  setup() {
    const erc20Token = useErc20TokenStore();

    async function initErc20() {
      await erc20Token.init();
    }
    return {
      initErc20,
    }
  },
  methods: {
    async onConnectMetamask() {
      this.isLoading = true;
      await useEtherJsStore().onConnect();
      await this.loadData();
      this.isLoading = false;
    },
    async loadData() {
      await this.initErc20();
    }
  }
})
</script>

<style scoped>
.connect-button {
  width: 100%;
}
</style>
