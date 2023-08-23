


import{_ as B,u as h,r as l,o as i,b as u,w as c,e as a,B as p,D as y,g as s,f as k,a as b,t as g,T as V,p as E,i as C}from"./index-aaecdc93.js";import{u as S}from"./useValidateModule-1f635df4.js";import{u as L}from"./useBtcStore-b1c51fda.js";import"./useErc20TokenStore-157d8b1b.js";import"./useEtherJsStore-51f2c7eb.js";const N=h({name:"SendBtcForm",data(){return{isLoading:!1,transaction:"",form:{fee:"",receiver:"",amount:""},errors:this.validateModule.errorHandlerModule.value}},setup(){const e=L(),r=S();async function t(m){return await e.sendBtc(m)}async function d(){return await e.updateBtcBalance()}return{btcToken:e,validateModule:r,sendBtc:t,updateBtcBalance:d}},methods:{async submitForm(){try{const e={fee:this.form.fee,receiver:this.form.receiver.trim(),amount:this.form.amount};if(!this.validate(e.fee,e.receiver,e.amount))return;this.isLoading=!0,this.transaction=await this.sendBtc(e).then(r=>(alert(r.tx.hash),r.tx.hash)),await this.updateBtcBalance(),this.form={receiver:"",amount:""}}catch(e){console.log("SubmitForm error: ",e)}finally{this.isLoading=!1}},validate(e,r,t){return this.validateModule.validateForm([{key:"address",value:r,method:"isNotEmpty"},{key:"amount",value:t,method:"isNotEmpty"},{key:"fee",value:e,method:"isNotEmpty"},{key:"address",value:r,method:"isBtcAddressValid"},{key:"amount",value:t,method:"isValueOverZero"},{key:"fee",value:e,method:"isValueOverZero"},{key:"amount",value:t,method:"isAmountNoOverBtcBalance"}])}},computed:{getBlockcypherLink(){return this.transaction?`https://live.blockcypher.com/btc-testnet/tx/${this.transaction}`:null}}}),F=e=>(E("data-v-32e25277"),e=e(),C(),e),_=F(()=>a("div",null,"Example: 0.0002",-1)),$={class:"flex-center mb-5"},w={key:1,class:"scan-link"},I=["href"];function M(e,r,t,d,m,T){const f=l("BaseLoading"),n=l("BaseInput"),v=l("BaseButton");return i(),u(V,{mode:"out-in"},{default:c(()=>[a("div",null,[e.isLoading?(i(),u(f,{key:0})):p("",!0),a("form",{class:y(e.transaction?"mb-2":"")},[s(n,{modelValue:e.form.fee,"onUpdate:modelValue":r[0]||(r[0]=o=>e.form.fee=o),label:"Fee",type:"number",error:e.errors.getError("fee"),onClearError:r[1]||(r[1]=o=>e.errors.clearError("fee"))},null,8,["modelValue","error"]),_,a("div",$,[s(n,{modelValue:e.form.receiver,"onUpdate:modelValue":r[2]||(r[2]=o=>e.form.receiver=o),label:"Receiver",class:"mr-2",error:e.errors.getError("address"),onClearError:r[3]||(r[3]=o=>e.errors.clearError("address"))},null,8,["modelValue","error"]),s(n,{modelValue:e.form.amount,"onUpdate:modelValue":r[4]||(r[4]=o=>e.form.amount=o),label:"Amount",class:"ml-2",type:"number",error:e.errors.getError("amount"),onClearError:r[5]||(r[5]=o=>e.errors.clearError("amount"))},null,8,["modelValue","error"])]),s(v,{buttonColor:"#E95420",onClick:e.submitForm},{default:c(()=>[k(" SEND ")]),_:1},8,["onClick"])],2),e.getBlockcypherLink?(i(),b("div",w,[a("a",{href:e.getBlockcypherLink,target:"_blank",class:"main-black-text"}," Blockcypher: "+g(e.transaction),9,I)])):p("",!0)])]),_:1})}const z=B(N,[["render",M],["__scopeId","data-v-32e25277"]]);export{z as default};
