<template>
  <ParticlesComponent />
  <div class="wrapper font-family-poppins">
    <AppHeader />
    <main>
      <slot />
    </main>
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from "vue";

export default defineComponent({
  name: "DefaultLayout",
  components: {
    AppHeader: defineAsyncComponent(
      () => import("@/components/common/AppHeader.vue")
    ),
    ParticlesComponent: defineAsyncComponent(
      () => import("@/components/common/ParticlesComponent.vue")
    ),
  },
});
</script>

<style scoped lang="scss">
.wrapper {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  border: 0;
  height: 100%;
}
main {
  height: calc(100% - 52px);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
