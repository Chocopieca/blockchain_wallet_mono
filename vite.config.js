import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// fix problem "ESM integration proposal for Wasm" is not supported currently.
import wasm from "vite-plugin-wasm";

// fix problem with crypto and stream
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  return {
    base: "/blockchain_wallet_mono/",
    plugins: [
      vue(),
      wasm(),
      nodePolyfills({
        protocolImports: true
      })
    ],
    build: {
      target: 'esnext' //browsers can handle the latest ES features
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "~~": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    optimizeDeps: {
      exclude: ['js-big-decimal']
    },
    assetsInclude: ["**/*.png", "**/*.svg"],
  }
})
