const initRegisterLayouts = {
  async install(vue) {
    const componentList = import.meta.globEager(
      "../components/layout/*.vue"
    );

    Object.entries(componentList).forEach(([key, component]) => {
      const componentString = key.split("/");
      const componentName =
        componentString[componentString.length - 1].split(".")[0];
      vue.component(componentName, component?.default);
    });
  },
};

export default initRegisterLayouts;
