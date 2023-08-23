<template>
  <div class="icon dynamic-color">
    <i
      :style="{
        '-webkit-mask-image': iconPath,
        'mask-image': iconPath,
        'background-color': iconColor[0],
      }"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BaseIcon",
  props: {
    iconName: {
      type: String,
      default: "close-circle.svg",
    },
    iconColor: {
      type: Object,
      default: {color: 'black', hover: '#292929'},
    },
    height: {
      type: String,
      default: "20px"
    },
    width: {
      type: String,
      default: "20px"
    }
  },
  computed: {
    iconPath() {
      return `url(../../../src/assets/icons/${this.iconName})`;
    },
    getIconColor() {
      return this.iconColor.color;
    },
    getIconHover() {
      return this.iconColor.hover;
    },
    getHeight() {
      return this.height;
    },
    getWidth() {
      return this.width;
    },
  },
});
</script>

<style scoped lang="scss">
.icon {
  cursor: pointer;
  width: v-bind(getHeight);
  height: v-bind(getWidth);

  i {
    display: block;
    -webkit-mask-size: contain;
    mask-size: contain;
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    width: v-bind(getHeight);
    height: v-bind(getWidth);
  }

  &.dynamic-color i {
    background-color: v-bind(getIconColor);
    &:hover {
      background-color: v-bind(getIconHover);
    }
  }
}
</style>
