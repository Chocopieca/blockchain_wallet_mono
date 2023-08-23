


import{_ as c,u as i,o,a,e as t,E as n,I as d,t as p,B as u,p as r,i as _}from"./index-aaecdc93.js";const h=i({name:"SwitchItem",props:{modelValue:{type:Boolean,default:!1},title:{type:String,default:""}},computed:{switchValue:{get(){return this.modelValue},set(e){this.$emit("update:modelValue",e)}}}}),m=e=>(r("data-v-4ec3f38f"),e=e(),_(),e),f={class:"d-inline-block"},w={class:"switch"},V=m(()=>t("span",{class:"slider round"},null,-1)),I={key:0,class:"title"};function S(e,s,v,y,k,B){return o(),a("div",f,[t("label",w,[n(t("input",{type:"checkbox","onUpdate:modelValue":s[0]||(s[0]=l=>e.switchValue=l)},null,512),[[d,e.switchValue]]),V,e.title?(o(),a("span",I,p(e.title),1)):u("",!0)])])}const b=c(h,[["render",S],["__scopeId","data-v-4ec3f38f"]]);export{b as default};
