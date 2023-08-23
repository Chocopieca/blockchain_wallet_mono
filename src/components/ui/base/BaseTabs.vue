<template>
  <BaseCard bgColor="#fff" class="position-relative">
    <template v-slot>
      <div class="tabs-wrapper">
        <div
          v-for="(item, index) of tabs"
          :key="`tab-button-${item.id}`"
          class="tab"
          :class="selectedTab === item.title ? 'active-tab' : ''"
          @click.prevent="changeTab({index, title: item.title})"
        >
          <span class="flex-center mr-2">{{ item.title }}</span>
          <CloseIcon
            v-if="selectedTab === item.title && tabLengthProp.current !== 1"
            class="cursor-pointer"
            @click.stop="deleteTab"
          />
        </div>
        <div
          v-if="withAddTab && tabMaxLang"
          class="tab add-tab"
          @click.prevent="createTab"
        >
          <span class="size16-weight700">+</span>
        </div>
      </div>
      <Transition>
        <component
          v-if="selectedTabContent"
          :is="selectedTabContent.component"
          :options="selectedTabContent.data"
        />
      </Transition>
    </template>
  </BaseCard>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "BaseTabs",
  props: {
    tabs: {
      type: Array,
      default: () => [],
    },
    withAddTab: {
      type: Boolean,
      default: false,
    },
    tabLengthProp: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      selectedTab: this.tabs[0].title,
    };
  },
  methods: {
    changeTab(payload) {
      const { index, title } = payload;
      this.isNativeTabChange(index);
      this.selectedTab = title;
    },
    createTab() {
      this.$emit("onCreateTab");
    },
    deleteTab() {
      this.$emit("onDeleteTab");
    },
    isNativeTabChange(index) {
      if (typeof index === "number") this.$emit("onChangeTab", index);
    }
  },
  computed: {
    selectedTabContent() {
      return this.tabs.find((item) => {
        return item.title === this.selectedTab;
      });
    },
    tabMaxLang() {
      return this.withAddTab
          ? this.tabLengthProp.current <= this.tabLengthProp.max
          : null;
    },
  },
});
</script>

<style scoped lang="scss">
.tabs-wrapper {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  transform: translateY(calc(-100% + 1px));
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  background-color: #f5deb3;

  &:before {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    height: 20px;
    bottom: -19px;
    background-color: #fff;
    z-index: 11;
    border-top-right-radius: 15px;
  }

  .tab {
    background-color: #ebebeb;
    padding: 5px 10px;
    box-shadow: 0 0 15px hsl(0deg 0% 58% / 44%);
    cursor: pointer;
    font-size: 10px;
    font-weight: 700;
    width: 75px;
    height: 20px;
    overflow: hidden;

    &.add-tab {
      background-color: #E95420;
    }

    &.active-tab {
      background-color: #fff;
      z-index: 10;
      display: flex;
      width: 100px;
      font-size: 12px;

      span {
        text-align: center;
      }
    }
  }
}
</style>
