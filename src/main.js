import './assets/main.css'

import { Buffer } from 'buffer'
globalThis.Buffer = Buffer

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import initPinia from "./plugins/InitPinia";
import initBaseScripts from "./plugins/InitBaseScripts";
import initRegisterLayouts from "./plugins/RegisterLayouts";
import initInjectedComponents from "./plugins/initInjectedComponents";

const app = createApp(App)

app.use(router)
app.use(initPinia)
app.use(initBaseScripts)
app.use(initRegisterLayouts)
app.use(initInjectedComponents)

app.mount('#app')
