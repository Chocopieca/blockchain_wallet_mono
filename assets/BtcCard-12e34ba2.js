


import{_ as A,d as p,h,c as n,r as c,o as d,a as b,g as o,w as f,b as C,e as t,t as i,T as w,p as y,i as x}from"./index-aaecdc93.js";import{u as S,a as I,b as N}from"./useBtcStore-b1c51fda.js";import"./useEtherJsStore-51f2c7eb.js";const D={name:"BtcCard",components:{SendBtcForm:p(()=>h(()=>import("./SendBtcForm-6ab22963.js"),["assets/SendBtcForm-6ab22963.js","assets/index-aaecdc93.js","assets/index-17b485b8.css","assets/useValidateModule-1f635df4.js","assets/useBtcStore-b1c51fda.js","assets/useEtherJsStore-51f2c7eb.js","assets/useErc20TokenStore-157d8b1b.js","assets/SendBtcForm-96445419.css"])),BtcConnectionMenu:p(()=>h(()=>import("./BtcConnectionMenu-06ab488b.js"),["assets/BtcConnectionMenu-06ab488b.js","assets/index-aaecdc93.js","assets/index-17b485b8.css"]))},setup(){const e=S(),l=n(()=>I().getAddressLink.value),u=n(()=>N().getSelectedNetwork.value.name),s=n(()=>e.getCurrentWallet.isConnected),m=n(()=>e.getCurrentWallet.btcAddress),a=n(()=>e.getCurrentWallet.btcBalance);async function r(){await e.updateBtcBalance()}return{scanAddress:l,userAddress:m,userBtcBalance:a,isConnected:s,networkName:u,updateBtcBalance:r}},methods:{async updateBalance(){await this.updateBtcBalance()}},computed:{getAddress(){return this.userAddress?`${this.userAddress.slice(0,10)}...${this.userAddress.slice(-10)}`:"---"}}},_=e=>(y("data-v-13753b73"),e=e(),x(),e),E={class:"d-flex align-center"},T=_(()=>t("h1",{class:"ma-0 main-bright-red-text mr-2"},"Btc",-1)),R={class:"size12-weight400"},V={class:"d-flex justify-start align-center"},F=_(()=>t("div",{class:"mr-2"},"Balance:",-1)),L={class:"size20-weight700 main-red-text mr-2"},M=_(()=>t("div",null,"Address:",-1)),P=["href"];function W(e,l,u,s,m,a){const r=c("BtcConnectionMenu"),v=c("RefreshIcon"),B=c("BaseDivider"),g=c("SendBtcForm"),k=c("BaseCard");return d(),b("div",null,[o(w,{mode:"out-in"},{default:f(()=>[s.isConnected?(d(),C(k,{key:1,width:"500",bgColor:"#ffffff"},{default:f(()=>[t("div",E,[T,t("span",R,"("+i(s.networkName)+")",1)]),t("div",V,[F,t("div",L,i(s.userBtcBalance)+" BTC ",1),o(v,{onClick:a.updateBalance,class:"cursor-pointer"},null,8,["onClick"])]),o(B,{class:"my-2",color:"#000000"}),M,t("a",{href:s.scanAddress,class:"address main-black-text",target:"_blank"},i(s.userAddress),9,P),o(B,{class:"my-2",color:"#000000"}),o(g)]),_:1})):(d(),C(r,{key:0}))]),_:1})])}const U=A(D,[["render",W],["__scopeId","data-v-13753b73"]]);export{U as default};
