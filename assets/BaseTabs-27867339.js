


import{_ as T,u as C,r as c,o as a,b as n,w as b,e as l,a as o,z as _,F as f,A as i,B as r,g as m,C as g,T as v,D as y,t as k,p as B,i as w}from"./index-aaecdc93.js";const $=C({name:"BaseTabs",props:{tabs:{type:Array,default:()=>[]},withAddTab:{type:Boolean,default:!1},tabLengthProp:{type:Object,default:()=>{}}},data(){return{selectedTab:this.tabs[0].title}},methods:{changeTab(e){const{index:s,title:d}=e;this.isNativeTabChange(s),this.selectedTab=d},createTab(){this.$emit("onCreateTab")},deleteTab(){this.$emit("onDeleteTab")},isNativeTabChange(e){typeof e=="number"&&this.$emit("onChangeTab",e)}},computed:{selectedTabContent(){return this.tabs.find(e=>e.title===this.selectedTab)},tabMaxLang(){return this.withAddTab?this.tabLengthProp.current<=this.tabLengthProp.max:null}}}),L=e=>(B("data-v-07845650"),e=e(),w(),e),I={class:"tabs-wrapper"},A=["onClick"],N={class:"flex-center mr-2"},D=L(()=>l("span",{class:"size16-weight700"},"+",-1)),P=[D];function S(e,s,d,z,M,V){const p=c("CloseIcon"),h=c("BaseCard");return a(),n(h,{bgColor:"#fff",class:"position-relative"},{default:b(()=>[l("div",I,[(a(!0),o(f,null,_(e.tabs,(t,u)=>(a(),o("div",{key:`tab-button-${t.id}`,class:y(["tab",e.selectedTab===t.title?"active-tab":""]),onClick:i(F=>e.changeTab({index:u,title:t.title}),["prevent"])},[l("span",N,k(t.title),1),e.selectedTab===t.title&&e.tabLengthProp.current!==1?(a(),n(p,{key:0,class:"cursor-pointer",onClick:i(e.deleteTab,["stop"])},null,8,["onClick"])):r("",!0)],10,A))),128)),e.withAddTab&&e.tabMaxLang?(a(),o("div",{key:0,class:"tab add-tab",onClick:s[0]||(s[0]=i((...t)=>e.createTab&&e.createTab(...t),["prevent"]))},P)):r("",!0)]),m(v,null,{default:b(()=>[e.selectedTabContent?(a(),n(g(e.selectedTabContent.component),{key:0,options:e.selectedTabContent.data},null,8,["options"])):r("",!0)]),_:1})]),_:1})}const E=T($,[["render",S],["__scopeId","data-v-07845650"]]);export{E as default};
