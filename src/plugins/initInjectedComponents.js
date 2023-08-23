import { defineAsyncComponent } from "vue";

const initInjectedComponents = {
  install(vue) {
    const componentList = {
      ...import.meta.glob("../components/ui/**/*.vue"),
    };
    for (const key in componentList) {
      const component = key.split("/");
      const componentName = component[component.length - 1].split(".")[0];
      const module = defineAsyncComponent(componentList[key]);
      vue.component(componentName, module);
    }
  },
};

export default initInjectedComponents;
