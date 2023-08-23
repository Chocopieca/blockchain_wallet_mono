<script>
import {defineAsyncComponent} from "vue";

export default {
  name: "Shell",
  components: {
    AppLayout: defineAsyncComponent(() => import("./components/layout/AppLayout.vue"))
  }
}
</script>

<template>
  <AppLayout />
</template>
