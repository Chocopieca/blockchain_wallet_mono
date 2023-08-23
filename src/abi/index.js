export default async function () {
  const abiList = {};
  const jsonList = {
    ...import.meta.glob("./*.json"),
  };
  for (const key in jsonList) {
    const component = key.split("/");
    const componentName = component[component.length - 1].split(".")[0];
    abiList[componentName] = await import(`../abi/${componentName}.json`);
  }
  return abiList;
};
