<script>
import useBitcoinNetwork from "@/composable/bitcoin/useBitcoinNetwork";
import {computed} from "vue";
export default {
  name: "ChangeBtcNetwork",
  setup() {
    const bitcoinNetwork = useBitcoinNetwork();

    const isTestnetNetwork = computed({
      get() {
        return bitcoinNetwork.isTestnetNetwork.value;
      },
      set(value) {
        value
            ? bitcoinNetwork.setCurrentNetwork("testnet")
            : bitcoinNetwork.setCurrentNetwork("mainnet");
      }
    });

    return {isTestnetNetwork}
  },
}
</script>

<template>
  <SwitchItem
    v-model="isTestnetNetwork"
    title="Testnet"
  />
</template>

<style scoped lang="scss">
.change-network {
  &-button {

  }
  &-overlay {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.30);
  }
  &-modal {
    width: 100px;
    text-align: center;
    position: fixed;
    left: calc(50% - 100px);
    top: 50%;
    z-index: 10;
    background-color: white;
    padding: 25px;
    border: 1px solid #E95420;
  }
}
</style>