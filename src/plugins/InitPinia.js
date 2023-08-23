import { createPinia } from "pinia";

const initPinia = {
  install(app) {
    const pinia = createPinia();
    app.use(pinia);
  },
};

export default initPinia;
