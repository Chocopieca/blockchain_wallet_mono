


import{b as a}from"./useBtcStore-b1c51fda.js";import{_ as c,c as i,r as _,o as l,b as m}from"./index-aaecdc93.js";import"./useEtherJsStore-51f2c7eb.js";const p={name:"ChangeBtcNetwork",setup(){const e=a();return{isTestnetNetwork:i({get(){return e.isTestnetNetwork.value},set(o){o?e.setCurrentNetwork("testnet"):e.setCurrentNetwork("mainnet")}})}}};function u(e,t,o,n,k,w){const s=_("SwitchItem");return l(),m(s,{modelValue:n.isTestnetNetwork,"onUpdate:modelValue":t[0]||(t[0]=r=>n.isTestnetNetwork=r),title:"Testnet"},null,8,["modelValue"])}const B=c(p,[["render",u],["__scopeId","data-v-30050718"]]);export{B as default};
