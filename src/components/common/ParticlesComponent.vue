<template>
  <div id="particles"></div>
</template>

<script>
import {defineComponent} from "@vue/runtime-core";
import { tsParticles } from "tsparticles";
import particlesjsConfig from "@/assets/json/particlesjs-config.json";

export default defineComponent({
  name: "ParticlesComponent",
  mounted() {
    tsParticles.load("particles", particlesjsConfig)
  },
})
</script>

<style scoped>
html body #particles {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: var(--color-dark);
  z-index: -1;
}
</style>
