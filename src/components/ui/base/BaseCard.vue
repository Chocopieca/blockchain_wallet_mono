<template>
  <div class="bh-card" :style="{ maxWidth: width ? `${width}px` : '100%' }">
    <div class="bh-card-inner" :style="{ backgroundColor: bgColor }">
      <slot />
    </div>
  </div>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: 'BaseCard',
  props: {
    width: {
      type: String,
    },
    bgColor: {
      type: String,
    },
  }
})
</script>

<style lang="scss" scoped>
.bh-card {
  display: grid;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}
.bh-card-inner {
  padding: 25px;
}
@media (max-width: 768px) {
  .bh-card-inner {
    padding: 15px;
  }
}
</style>
