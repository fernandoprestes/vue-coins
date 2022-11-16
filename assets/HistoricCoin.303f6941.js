import{_ as v,o as n,c as o,p as S,a as D,b as t,d as w,i as b,r as L,e as C,w as k,f as j,g as p,t as i,h as f,u as g,j as h,k as B,v as R}from"./index.b2d4c2cc.js";const U={},V=s=>(S("data-v-49196f92"),s=s(),D(),s),I={class:"flex flex-1 items-center justify-center"},H=V(()=>t("div",null,[t("div",null,[t("div",{class:"dot-typing"})])],-1)),$=[H];function M(s,r){return n(),o("div",I,$)}const y=v(U,[["render",M],["__scopeId","data-v-49196f92"]]),O={key:1,class:"flex w-full flex-1 flex-col justify-between gap-4"},A={class:"flex items-center justify-start gap-4"},N=["src","alt"],T={class:"text-2xl"},E={class:"text-xl font-thin"},F={key:1},P={key:0,class:"flex flex-1 flex-wrap items-center justify-center text-center"},q={class:"w-64"},z={key:1,class:"flex flex-col"},G={class:"flex justify-between text-lg"},J={class:"flex justify-between"},K={class:"rounded-lg bg-gray-700 py-2 text-white"},Q=w({__name:"HistoricCoin",props:{data:null},setup(s){const r=s,_=b("coinsService"),l=L(""),e=C({isLoadingContent:!0,isValidDateRange:!0,isLoadingUpdate:!1,date:new Date().toLocaleString("pt-BR",{dateStyle:"short"}).replaceAll("/","-"),inputDateSearch:new Date().toLocaleString("pt-BR",{dateStyle:"short"}).replaceAll("/","-").split("-").reverse().join("-"),coin:{name:"",symbol:"",image:"",current_price:{brl:0,usd:0}}});async function m(){e.isLoadingContent=!0;const{name:a,symbol:c,image:d,market_data:u}=await _.getCoinsHistoricalByDate(r.data.id,e.date);e.coin={name:a,symbol:c,image:d.small,current_price:{brl:u.current_price.brl,usd:u.current_price.usd}},e.isLoadingContent=!1}async function x(){e.isValidDateRange=!1,e.isLoadingUpdate=!0;const{market_data:a}=await _.getCoinsHistoricalByDate(r.data.id,e.date);e.coin={...e.coin,current_price:{brl:a.current_price.brl,usd:a.current_price.usd}},e.isValidDateRange=!0,e.isLoadingUpdate=!1}return k(()=>e.inputDateSearch,()=>{if(l.value="",!e.inputDateSearch)return;if(new Date(e.inputDateSearch).toISOString()>new Date().toISOString()){l.value="Data incorreta! Selecione uma data anterior da data atual!",e.isValidDateRange=!1,e.isLoadingUpdate=!1;return}const a=e.inputDateSearch.toString().split("-").reverse().join("-");e.date=a,x()}),j(async()=>{await m(),e.isLoadingContent=!1}),(a,c)=>e.isLoadingContent?(n(),p(y,{key:0})):(n(),o("div",O,[t("div",A,[t("img",{class:"h-12 w-12",src:e.coin.image,alt:e.coin.name},null,8,N),t("div",null,[t("h2",T,i(e.coin.name),1),t("span",E,i(e.coin.symbol),1)])]),e.isLoadingUpdate?(n(),p(y,{key:0})):(n(),o("div",F,[e.isValidDateRange?(n(),o("div",z,[t("div",G,[f(" R$ "),t("span",null,i(g(h)(e.coin.current_price.brl.toString(),"BRL")),1)]),t("div",J,[f(" US$ "),t("span",null,i(g(h)(e.coin.current_price.usd.toString(),"USD")),1)])])):(n(),o("div",P,[t("p",q,i(l.value),1)]))])),t("div",K,[B(t("input",{"onUpdate:modelValue":c[0]||(c[0]=d=>e.inputDateSearch=d),class:"w-full appearance-none border-none bg-transparent p-2 outline-none",type:"date"},null,512),[[R,e.inputDateSearch]])])]))}});const X=v(Q,[["__scopeId","data-v-ca03af8e"]]);export{X as default};