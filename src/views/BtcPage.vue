<template>
  <div class="btc-card h-100 flex-center">
    <BaseTabs
      :tabs="list"
      :tab-length-prop="{current: tabCount, max: 4}"
      withAddTab
      ref="tabModule"
      @onChangeTab="onChangeTab"
      @onCreateTab="onCreateNewTab"
      @onDeleteTab="onDeleteTab"
    />
  </div>
</template>

<script>
import {computed, defineAsyncComponent} from "vue";
import {useBtcStore} from "@/stores/useBtcStore";
import {markRaw} from "@vue/reactivity";

export default {
  name: "BtcPage",
  setup() {
    const btcStore = useBtcStore();

    const getCurrentWalletId = computed(() => btcStore.getCurrentWalletId);
    const selectedIndex = computed(() => btcStore.getSelectedIndex);

    function createWallet() {
      btcStore.createWallet();
    }
    function deleteWallet() {
      btcStore.deleteWallet();
    }
    function updateSelectedIndex(index) {
      btcStore.updateSelectedIndex(index);
    }

    return {
      btcStore, getCurrentWalletId, selectedIndex, createWallet, deleteWallet, updateSelectedIndex,
    }
  },
  data() {
    return {
      tabCount: 1,
      list: markRaw([
        {
          id: 0,
          title: 'My wallet',
          component: defineAsyncComponent(
              () => import('@/components/module/btcPage/BtcCard.vue')
          ),
          data: {},
        },
      ])
    }
  },
  methods: {
    onChangeTab(index) {
      this.updateSelectedIndex(index);
    },
    onCreateNewTab() {
      this.createWallet();
      this.tabCount += 1;
      this.updateSelectedIndex(this.tabCount - 1);
      const newTitle = `My wallet ${this.getCurrentWalletId}`
      this.list.push(
        {
          id: this.getCurrentWalletId,
          title: newTitle,
          component: defineAsyncComponent(
              () => import('@/components/module/btcPage/BtcCard.vue')
          ),
          data: {},
        },
      )
      this.$refs.tabModule.changeTab({
        index: null,
        title: newTitle
      });
    },
    onDeleteTab() {
      const currentIndex = this.selectedIndex === 0
          ? this.selectedIndex + 1
          : this.selectedIndex - 1;
      const currentTitle = this.list[currentIndex].title;
      this.$refs.tabModule.changeTab({
        index: null,
        title: currentTitle
      });
      this.deleteWallet();
      this.list.splice(this.selectedIndex, 1);
      this.updateSelectedIndex(currentIndex);
      this.tabCount -= 1;
    }
  },
}
</script>

<style scoped>
.btc-card {
  max-width: 500px;
  width: 100%;
}
</style>
