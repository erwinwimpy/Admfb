(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();class ne{constructor(){this.routes={},this.currentRoute=null,window.addEventListener("hashchange",()=>this._onHashChange())}addRoute(e,t){this.routes[e]=t}navigate(e){window.location.hash=e}getCurrentPath(){return window.location.hash.slice(1)||"/"}_onHashChange(){const e=this.getCurrentPath();this._resolve(e)}_resolve(e){const t=this.routes[e]||this.routes["/"];t&&(this.currentRoute=e,t(e))}start(){const e=this.getCurrentPath();this._resolve(e)}}const P=new ne,se=Object.freeze(Object.defineProperty({__proto__:null,default:P,router:P},Symbol.toStringTag,{value:"Module"})),z="cipta_finansial_data",C={family:null,accounts:[],transactions:[],assets:{emas:{bsi_gram:0,tring_gram:0,price_per_gram:165e4},kpr:{total:0,paid:0,monthly:0,bank:"",remaining_months:0},arisan:[]},settings:{togetherMode:!1,allowanceBudget:15e5,userName:"Erwin",spouseName:"Bunda",geminiApiKey:""},categories:[]};class ie{constructor(){this._listeners=[],this._state=this._load()}_load(){try{const e=localStorage.getItem(z);if(e){const t=JSON.parse(e);return{...C,...t}}}catch(e){console.warn("Failed to load state",e)}return{...C}}_save(){try{localStorage.setItem(z,JSON.stringify(this._state))}catch(e){console.warn("Failed to save state",e)}this._notify()}_notify(){this._listeners.forEach(e=>e(this._state))}subscribe(e){return this._listeners.push(e),()=>{this._listeners=this._listeners.filter(t=>t!==e)}}getState(){return this._state}setFamily(e){this._state.family=e,this._save()}updateSettings(e){this._state.settings={...this._state.settings,...e},this._save()}toggleTogetherMode(){return this._state.settings.togetherMode=!this._state.settings.togetherMode,this._save(),this._state.settings.togetherMode}addAccount(e){const n=this._state.accounts.reduce((s,i)=>Math.max(s,i.id||0),0)+1;return this._state.accounts.push({id:n,...e}),this._save(),n}updateAccount(e,t){const n=this._state.accounts.findIndex(s=>s.id===e);n!==-1&&(this._state.accounts[n]={...this._state.accounts[n],...t},this._save())}deleteAccount(e){this._state.accounts=this._state.accounts.filter(t=>t.id!==e),this._save()}getAccounts(){return this._state.accounts}getAccountById(e){return this._state.accounts.find(t=>t.id===e)}addTransaction(e){const t=crypto.randomUUID?crypto.randomUUID():Date.now().toString(36)+Math.random().toString(36).substr(2),n={id:t,created_at:new Date().toISOString(),...e};return this._state.transactions.unshift(n),e.type==="income"?this._updateAccountBalance(e.account_id,e.amount):e.type==="expense"?this._updateAccountBalance(e.account_id,-e.amount):e.type==="transfer"&&(this._updateAccountBalance(e.account_id,-e.amount),e.to_account_id&&this._updateAccountBalance(e.to_account_id,e.amount)),this._save(),t}_updateAccountBalance(e,t){const n=this._state.accounts.find(s=>s.id===e);n&&(n.balance=(n.balance||0)+t)}deleteTransaction(e){const t=this._state.transactions.find(n=>n.id===e);t&&(t.type==="income"?this._updateAccountBalance(t.account_id,-t.amount):t.type==="expense"?this._updateAccountBalance(t.account_id,t.amount):t.type==="transfer"&&(this._updateAccountBalance(t.account_id,t.amount),t.to_account_id&&this._updateAccountBalance(t.to_account_id,-t.amount)),this._state.transactions=this._state.transactions.filter(n=>n.id!==e),this._save())}getTransactions(e={}){let t=[...this._state.transactions];if(e.type&&(t=t.filter(n=>n.type===e.type)),e.paid_by&&(t=t.filter(n=>n.paid_by===e.paid_by)),e.for_whom&&(t=t.filter(n=>n.for_whom===e.for_whom)),e.account_id&&(t=t.filter(n=>n.account_id===e.account_id)),e.parent_category&&(t=t.filter(n=>n.parent_category===e.parent_category)),e.month&&(t=t.filter(n=>{const s=new Date(n.created_at);return s.getMonth()===e.month&&s.getFullYear()===(e.year||new Date().getFullYear())})),e.search){const n=e.search.toLowerCase();t=t.filter(s=>(s.description||"").toLowerCase().includes(n)||(s.parent_category||"").toLowerCase().includes(n)||(s.sub_category||"").toLowerCase().includes(n))}return t}getTransactionsByMonth(e,t){return this._state.transactions.filter(n=>{const s=new Date(n.created_at);return s.getFullYear()===e&&s.getMonth()===t})}updateAssets(e){this._state.assets={...this._state.assets,...e},this._save()}updateEmas(e){this._state.assets.emas={...this._state.assets.emas,...e},this._save()}updateKPR(e){this._state.assets.kpr={...this._state.assets.kpr,...e},this._save()}addArisan(e){const t=Date.now();return this._state.assets.arisan.push({id:t,...e}),this._save(),t}getAssets(){return this._state.assets}getTotalBalance(){return this._state.accounts.reduce((e,t)=>e+(t.balance||0),0)}getMonthlyExpenses(e,t){return this.getTransactionsByMonth(e,t).filter(n=>n.type==="expense").reduce((n,s)=>n+s.amount,0)}getMonthlyIncome(e,t){return this.getTransactionsByMonth(e,t).filter(n=>n.type==="income").reduce((n,s)=>n+s.amount,0)}getAllowanceSpent(){const e=new Date;return this.getTransactionsByMonth(e.getFullYear(),e.getMonth()).filter(t=>t.type==="expense"&&t.paid_by==="Suami").reduce((t,n)=>t+n.amount,0)}getDanaPusatBalance(){return this._state.accounts.filter(e=>e.owner_name==="Istri"||e.owner_name==="Bersama").reduce((e,t)=>e+(t.balance||0),0)}getNetWorth(){const e=this.getTotalBalance(),t=this._state.assets.emas,n=(t.bsi_gram+t.tring_gram)*t.price_per_gram,s=this._state.assets.kpr.paid;return e+n+s}getCategorySpending(e,t){const n=this.getTransactionsByMonth(e,t).filter(i=>i.type==="expense"),s={};return n.forEach(i=>{const o=i.parent_category||"Lainnya";s[o]=(s[o]||0)+i.amount}),Object.entries(s).map(([i,o])=>({name:i,amount:o})).sort((i,o)=>o.amount-i.amount)}reset(){this._state=JSON.parse(JSON.stringify(C)),localStorage.removeItem(z),this._notify()}}const c=new ie,F=4;function oe(){const a=c.getState().accounts;a.length>0&&(a.some(l=>l.bank_name==="Dompet Tunai Suami")||c.addAccount({bank_name:"Dompet Tunai Suami",owner_name:"Suami",balance:5e5,is_allowance_account:!0,css_class:"tunai"}),a.some(l=>l.bank_name==="Dompet Tunai Istri")||c.addAccount({bank_name:"Dompet Tunai Istri",owner_name:"Istri",balance:1e6,is_allowance_account:!0,css_class:"tunai"}));const e=localStorage.getItem("cipta_seed_version");if(e&&parseInt(e)>=F&&c.getState().accounts.length>0)return;c.reset(),c.setFamily({id:"family-001",family_name:"Keluarga Erwin",created_at:new Date().toISOString()}),c.updateSettings({userName:"Pak Erwin",spouseName:"Bunda",allowanceBudget:15e5});const t=c.addAccount({bank_name:"BRI",owner_name:"Suami",balance:85e5,is_allowance_account:!1,css_class:"bri"}),n=c.addAccount({bank_name:"Bank Jago",owner_name:"Bersama",balance:32e5,is_allowance_account:!0,css_class:"jago"}),s=c.addAccount({bank_name:"BSI",owner_name:"Istri",balance:12e6,is_allowance_account:!1,css_class:"bsi"});c.addAccount({bank_name:"Dompet Tunai Suami",owner_name:"Suami",balance:5e5,is_allowance_account:!0,css_class:"tunai"}),c.addAccount({bank_name:"Dompet Tunai Istri",owner_name:"Istri",balance:1e6,is_allowance_account:!0,css_class:"tunai"}),c.updateEmas({bsi_gram:15.5,tring_gram:3.2,price_per_gram:165e4}),c.updateKPR({total:25e7,paid:875e5,monthly:21e5,bank:"BTN",remaining_months:96}),c.addArisan({name:"Arisan Kantor Dinas",monthly_amount:2e5,total_members:15,my_turn:8,current_round:3,is_active:!0}),c.addArisan({name:"Arisan Ibu PKK",monthly_amount:15e4,total_members:20,my_turn:14,current_round:5,is_active:!0});const i=new Date,o=i.getFullYear(),r=i.getMonth(),d=[{account_id:t,amount:72e5,type:"income",description:"Gaji Pokok + Tunjangan April",parent_category:"Gaji & Pendapatan",sub_category:"Gaji Pokok",paid_by:"Suami",for_whom:"Bersama",created_at:new Date(o,r,1,8,0).toISOString()},{account_id:t,amount:35e5,type:"income",description:"TPP Bulan April",parent_category:"Gaji & Pendapatan",sub_category:"TPP",paid_by:"Suami",for_whom:"Bersama",created_at:new Date(o,r,5,10,0).toISOString()},{account_id:t,amount:65e5,type:"transfer",description:"Transfer Dana Pusat ke BSI Istri",parent_category:"Transfer",sub_category:"Pindah Buku",paid_by:"Suami",for_whom:"Bersama",to_account_id:s,created_at:new Date(o,r,1,9,0).toISOString()},{account_id:t,amount:15e5,type:"transfer",description:"Pegangan Suami ke Jago",parent_category:"Transfer",sub_category:"Pindah Buku",paid_by:"Suami",for_whom:"Suami",to_account_id:n,created_at:new Date(o,r,1,9,30).toISOString()},{account_id:n,amount:15e4,type:"expense",description:"Bensin Raize Perjalanan LDM",parent_category:"Transportasi",sub_category:"Bensin LDM",paid_by:"Suami",for_whom:"Suami",created_at:new Date(o,r,2,7,30).toISOString()},{account_id:n,amount:35e3,type:"expense",description:"Tol Barru - Makassar",parent_category:"Transportasi",sub_category:"Tol",paid_by:"Suami",for_whom:"Suami",created_at:new Date(o,r,2,8,0).toISOString()},{account_id:n,amount:25e3,type:"expense",description:"Makan Siang Warung Pak Baso",parent_category:"Makanan & Minuman",sub_category:"Makan Harian",paid_by:"Suami",for_whom:"Suami",created_at:new Date(o,r,3,12,0).toISOString()},{account_id:n,amount:15e3,type:"expense",description:"Kopi Kenangan",parent_category:"Makanan & Minuman",sub_category:"Kopi & Minuman",paid_by:"Suami",for_whom:"Suami",created_at:new Date(o,r,3,15,0).toISOString()},{account_id:n,amount:15e4,type:"expense",description:"Bensin Raize Harian",parent_category:"Transportasi",sub_category:"Bensin Harian",paid_by:"Suami",for_whom:"Suami",created_at:new Date(o,r,5,7,0).toISOString()},{account_id:n,amount:2e5,type:"expense",description:"Arisan Kantor Bulan Ini",parent_category:"Sosial & Ibadah",sub_category:"Arisan",paid_by:"Suami",for_whom:"Suami",created_at:new Date(o,r,6,10,0).toISOString()},{account_id:s,amount:35e4,type:"expense",description:"Belanja Bulanan Indomaret",parent_category:"Makanan & Minuman",sub_category:"Groceries",paid_by:"Istri",for_whom:"Bersama",created_at:new Date(o,r,2,10,0).toISOString()},{account_id:s,amount:5e5,type:"expense",description:"SPP TK Aisyah Bulan April",parent_category:"Pendidikan Anak",sub_category:"SPP",paid_by:"Istri",for_whom:"Anak",created_at:new Date(o,r,3,9,0).toISOString()},{account_id:s,amount:18e4,type:"expense",description:"Listrik Rumah B",parent_category:"Rumah Tangga",sub_category:"Listrik",paid_by:"Istri",for_whom:"Bersama",created_at:new Date(o,r,4,11,0).toISOString()},{account_id:s,amount:21e5,type:"expense",description:"Cicilan KPR BTN April",parent_category:"Cicilan",sub_category:"KPR",paid_by:"Istri",for_whom:"Bersama",created_at:new Date(o,r,5,8,0).toISOString()},{account_id:s,amount:15e4,type:"expense",description:"Arisan Ibu PKK",parent_category:"Sosial & Ibadah",sub_category:"Arisan",paid_by:"Istri",for_whom:"Istri",created_at:new Date(o,r,6,14,0).toISOString()},{account_id:s,amount:85e3,type:"expense",description:"Vitamin & Susu Anak",parent_category:"Kesehatan",sub_category:"Vitamin",paid_by:"Istri",for_whom:"Anak",created_at:new Date(o,r,7,10,0).toISOString()},{account_id:n,amount:25e4,type:"expense",description:"Makan Keluarga di Restoran",parent_category:"Hiburan",sub_category:"Quality Time",paid_by:"Suami",for_whom:"Bersama",is_together:!0,created_at:new Date(o,r,7,19,0).toISOString()},{account_id:n,amount:45e3,type:"expense",description:"Es Krim untuk Anak",parent_category:"Makanan & Minuman",sub_category:"Cemilan",paid_by:"Suami",for_whom:"Anak",is_together:!0,created_at:new Date(o,r,7,20,0).toISOString()},{account_id:s,amount:825e3,type:"expense",description:"Beli Emas BSI 0.5 gram",parent_category:"Investasi",sub_category:"Emas BSI",paid_by:"Istri",for_whom:"Bersama",created_at:new Date(o,r,8,9,0).toISOString()}],u=c.getState();d.forEach(l=>{const m=crypto.randomUUID?crypto.randomUUID():Date.now().toString(36)+Math.random().toString(36).substr(2);u.transactions.push({id:m,...l})}),u.transactions.sort((l,m)=>new Date(m.created_at)-new Date(l.created_at)),localStorage.setItem("cipta_finansial_data",JSON.stringify(u)),localStorage.setItem("cipta_seed_version",F.toString())}const re="modulepreload",ce=function(a){return"/Admfb/"+a},H={},M=function(e,t,n){let s=Promise.resolve();if(t&&t.length>0){let o=function(u){return Promise.all(u.map(l=>Promise.resolve(l).then(m=>({status:"fulfilled",value:m}),m=>({status:"rejected",reason:m}))))};document.getElementsByTagName("link");const r=document.querySelector("meta[property=csp-nonce]"),d=(r==null?void 0:r.nonce)||(r==null?void 0:r.getAttribute("nonce"));s=o(t.map(u=>{if(u=ce(u),u in H)return;H[u]=!0;const l=u.endsWith(".css"),m=l?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${m}`))return;const g=document.createElement("link");if(g.rel=l?"stylesheet":re,l||(g.as="script"),g.crossOrigin="",g.href=u,d&&g.setAttribute("nonce",d),document.head.appendChild(g),l)return new Promise((k,v)=>{g.addEventListener("load",k),g.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${u}`)))})}))}function i(o){const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=o,window.dispatchEvent(r),!r.defaultPrevented)throw o}return s.then(o=>{for(const r of o||[])r.status==="rejected"&&i(r.reason);return e().catch(i)})};function de(){const a=c.getState(),e=a.settings.togetherMode;return`
    <header class="app-header" id="app-header">
      <div class="header-logo">
        <img src="/Admfb/logo.png" alt="Adam Family Budget Logo" class="header-logo-image" style="height: 36px; width: auto; object-fit: contain; margin-right: 8px;">
        <div class="header-logo-text" style="font-size: 18px; line-height: 1.2;">Adam Family<br><span style="font-size: 12px; color: var(--primary);">BUDGET</span></div>
      </div>
      <div class="header-actions">
        <button class="together-toggle ${e?"active":""}" id="together-toggle" aria-label="Together Mode">
          <span class="material-icons-round together-toggle-icon">${e?"favorite":"favorite_border"}</span>
          <span class="together-toggle-label">${e?"Together!":"Together"}</span>
        </button>
        <div class="profile-avatar" id="profile-avatar">
          ${(a.settings.userName||"U").charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  `}function le(){const a=document.getElementById("together-toggle");a&&a.addEventListener("click",()=>{const t=c.toggleTogetherMode();a.classList.toggle("active",t);const n=a.querySelector(".together-toggle-icon"),s=a.querySelector(".together-toggle-label");n.textContent=t?"favorite":"favorite_border",s.textContent=t?"Together!":"Together",M(async()=>{const{showToast:i}=await Promise.resolve().then(()=>q);return{showToast:i}},void 0).then(({showToast:i})=>{i(t?"💕 Together Mode Aktif!":"Together Mode Nonaktif","info")})});const e=document.getElementById("profile-avatar");e&&e.addEventListener("click",()=>{const n=c.getState().settings.userName||"Erwin",s=n==="Erwin"?"Bunda":"Erwin";confirm(`Ganti sesi dari ${n} ke ${s}?`)&&(c.updateSettings({userName:s}),window.dispatchEvent(new Event("data-updated")),M(async()=>{const{showToast:i}=await Promise.resolve().then(()=>q);return{showToast:i}},void 0).then(({showToast:i})=>{i(`Berhasil login sebagai ${s}`,"success")}))})}const ue=[{path:"/",icon:"dashboard",label:"Beranda"},{path:"/transactions",icon:"receipt_long",label:"Transaksi"},{path:"/accounts",icon:"account_balance_wallet",label:"Rekening"},{path:"/assets",icon:"diamond",label:"Aset"},{path:"/insights",icon:"auto_awesome",label:"AI Insight"}];function pe(){const a=P.getCurrentPath();return`
    <nav class="bottom-nav" id="bottom-nav">
      ${ue.map(e=>`
        <a class="nav-item ${a===e.path?"active":""}"
           href="#${e.path}"
           id="nav-${e.path.replace("/","")||"home"}"
           aria-label="${e.label}">
          <span class="material-icons-round">${e.icon}</span>
          <span>${e.label}</span>
        </a>
      `).join("")}
    </nav>
  `}function me(a){document.querySelectorAll(".nav-item").forEach(e=>{const t=e.getAttribute("href");e.classList.toggle("active",t===`#${a}`)})}function ge(){return`
    <div class="fab-container" id="fab-container">
      <div class="fab-actions" id="fab-actions">
        <button class="fab-action" id="fab-scan">
          <span class="material-icons-round">auto_awesome</span>
          <span>Asisten AI</span>
        </button>
        <button class="fab-action" id="fab-transfer">
          <span class="material-icons-round">swap_horiz</span>
          <span>Transfer</span>
        </button>
        <button class="fab-action" id="fab-income">
          <span class="material-icons-round">arrow_downward</span>
          <span>Pemasukan</span>
        </button>
        <button class="fab-action" id="fab-expense">
          <span class="material-icons-round">arrow_upward</span>
          <span>Pengeluaran</span>
        </button>
      </div>
      <button class="fab-main" id="fab-main" aria-label="Tambah Transaksi">
        <span class="material-icons-round">add</span>
      </button>
    </div>
  `}function ve(){var s,i,o,r;const a=document.getElementById("fab-main"),e=document.getElementById("fab-actions");let t=!1;a&&a.addEventListener("click",()=>{t=!t,a.classList.toggle("open",t),e.classList.toggle("open",t)}),document.addEventListener("click",d=>{t&&!d.target.closest("#fab-container")&&(t=!1,a==null||a.classList.remove("open"),e==null||e.classList.remove("open"))}),(s=document.getElementById("fab-expense"))==null||s.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("open-transaction-modal",{detail:{type:"expense"}})),n()}),(i=document.getElementById("fab-income"))==null||i.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("open-transaction-modal",{detail:{type:"income"}})),n()}),(o=document.getElementById("fab-transfer"))==null||o.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("open-transaction-modal",{detail:{type:"transfer"}})),n()}),(r=document.getElementById("fab-scan"))==null||r.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("open-scan-modal")),n()});function n(){t=!1,a==null||a.classList.remove("open"),e==null||e.classList.remove("open")}}const D=[{name:"Makanan & Minuman",icon:"restaurant",subs:["Makan Harian","Makan di Luar","Cemilan","Kopi & Minuman","Groceries"]},{name:"Transportasi",icon:"directions_car",subs:["Bensin LDM","Bensin Harian","Parkir","Tol","Servis Kendaraan","Ojol / Grab"]},{name:"Rumah Tangga",icon:"home",subs:["Listrik","Air PDAM","Internet","Gas LPG","Perabot","Kebersihan"]},{name:"Pendidikan Anak",icon:"school",subs:["SPP","Buku & Alat Tulis","Les/Kursus","Seragam","Uang Jajan"]},{name:"Kesehatan",icon:"local_hospital",subs:["Obat","Dokter","Vitamin","BPJS Tambahan"]},{name:"Pakaian & Fashion",icon:"checkroom",subs:["Pakaian","Sepatu","Aksesoris"]},{name:"Hiburan",icon:"celebration",subs:["Jalan-jalan","Quality Time","Film","Langganan Digital","Hobi"]},{name:"Sosial & Ibadah",icon:"volunteer_activism",subs:["Sedekah","Zakat","Sumbangan","Hajatan","Arisan"]},{name:"Investasi",icon:"trending_up",subs:["Emas BSI","Emas Tring","Tabungan","Deposito"]},{name:"Cicilan",icon:"account_balance",subs:["KPR","Kredit Motor","Pinjaman"]},{name:"Gaji & Pendapatan",icon:"payments",subs:["Gaji Pokok","Tunjangan Kinerja","TPP","Penghasilan Lain","Arisan Masuk"]},{name:"Lainnya",icon:"more_horiz",subs:["Tak Terduga","Donasi","Lain-lain"]}];function ye(a){const e=D.find(t=>t.name===a);return e?e.icon:"receipt_long"}function fe(a){const e=D.find(t=>t.name===a);return e?e.subs:[]}function p(a,e=!1){return e&&Math.abs(a)>=1e6?"Rp "+(a/1e6).toFixed(1).replace(".0","")+" jt":e&&Math.abs(a)>=1e3?"Rp "+(a/1e3).toFixed(0)+" rb":new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",minimumFractionDigits:0,maximumFractionDigits:0}).format(a)}function Z(a,e="long"){const t=new Date(a),n=["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"],s=["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"],i=["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];if(e==="short")return`${t.getDate()} ${n[t.getMonth()]}`;if(e==="long")return`${i[t.getDay()]}, ${t.getDate()} ${s[t.getMonth()]} ${t.getFullYear()}`;if(e==="time")return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`;if(e==="relative"){const r=new Date-t,d=Math.floor(r/6e4);if(d<1)return"Baru saja";if(d<60)return`${d} menit lalu`;const u=Math.floor(d/60);if(u<24)return`${u} jam lalu`;const l=Math.floor(u/24);return l===1?"Kemarin":l<7?`${l} hari lalu`:`${t.getDate()} ${n[t.getMonth()]}`}if(e==="group"){const o=new Date,r=new Date(o);return r.setDate(r.getDate()-1),t.toDateString()===o.toDateString()?"Hari Ini":t.toDateString()===r.toDateString()?"Kemarin":`${i[t.getDay()]}, ${t.getDate()} ${n[t.getMonth()]}`}return t.toLocaleDateString("id-ID")}function L(){return["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"][new Date().getMonth()]}function X(a){const e={};return a.forEach(t=>{const n=Z(t.created_at,"group");e[n]||(e[n]=[]),e[n].push(t)}),e}function S(a,e="info"){let t=document.querySelector(".toast-container");t||(t=document.createElement("div"),t.className="toast-container",document.body.appendChild(t));const n=document.createElement("div");n.className=`toast toast-${e}`,n.textContent=a,t.appendChild(n),setTimeout(()=>n.remove(),3e3)}function ee(a,e=300){let t;return(...n)=>{clearTimeout(t),t=setTimeout(()=>a(...n),e)}}function A(a,e){return e?Math.min(Math.round(a/e*100),100):0}const q=Object.freeze(Object.defineProperty({__proto__:null,debounce:ee,formatDate:Z,formatRupiah:p,getCurrentMonthName:L,groupByDate:X,percentage:A,showToast:S},Symbol.toStringTag,{value:"Module"}));function he(){const a=c.getAccounts(),e=c.getState();return`
    <div class="modal-backdrop" id="tx-modal-backdrop"></div>
    <div class="modal-sheet" id="tx-modal-sheet">
      <div class="modal-handle"></div>
      <div class="modal-content">
        <h2 class="modal-title" id="tx-modal-title">Tambah Transaksi</h2>

        <form id="tx-form">
          <!-- Type Chips -->
          <div class="form-group">
            <label class="form-label">Jenis Transaksi</label>
            <div class="chip-group" id="tx-type-chips">
              <button type="button" class="chip selected" data-type="expense">Pengeluaran</button>
              <button type="button" class="chip" data-type="income">Pemasukan</button>
              <button type="button" class="chip" data-type="transfer">Transfer</button>
            </div>
          </div>

          <!-- Amount -->
          <div class="form-group">
            <label class="form-label">Nominal (Rp)</label>
            <input type="number" class="form-input" id="tx-amount" placeholder="Contoh: 150000" required min="1" inputmode="numeric" style="font-size: 1.25rem; font-weight: 700;" />
          </div>

          <!-- Description -->
          <div class="form-group">
            <label class="form-label">Deskripsi</label>
            <input type="text" class="form-input" id="tx-description" placeholder="Contoh: Bensin Raize" required />
          </div>

          <!-- Account Selection -->
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Dari Rekening</label>
              <select class="form-select" id="tx-account">
                ${a.map(t=>`<option value="${t.id}">${t.bank_name}</option>`).join("")}
              </select>
            </div>
            <div class="form-group" id="tx-to-account-group" style="display: none;">
              <label class="form-label">Ke Rekening</label>
              <select class="form-select" id="tx-to-account">
                ${a.map(t=>`<option value="${t.id}">${t.bank_name}</option>`).join("")}
              </select>
            </div>
          </div>

          <!-- Category -->
          <div class="form-row" id="tx-category-row">
            <div class="form-group">
              <label class="form-label">Kategori</label>
              <select class="form-select" id="tx-category">
                <option value="">Pilih Kategori</option>
                ${D.map(t=>`<option value="${t.name}">${t.name}</option>`).join("")}
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Sub-Kategori</label>
              <select class="form-select" id="tx-subcategory">
                <option value="">Pilih dulu kategori</option>
              </select>
            </div>
          </div>

          <!-- Paid By & For Whom -->
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Dibayar Oleh</label>
              <div class="chip-group" id="tx-paid-by-chips">
                <button type="button" class="chip ${e.settings.togetherMode?"":"selected"}" data-value="Suami">Suami</button>
                <button type="button" class="chip ${e.settings.togetherMode?"selected":""}" data-value="Istri">Istri</button>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Untuk Siapa</label>
              <div class="chip-group" id="tx-for-whom-chips">
                <button type="button" class="chip" data-value="Suami">Suami</button>
                <button type="button" class="chip" data-value="Istri">Istri</button>
                <button type="button" class="chip" data-value="Anak">Anak</button>
                <button type="button" class="chip ${e.settings.togetherMode?"selected":""}" data-value="Bersama">Bersama</button>
              </div>
            </div>
          </div>

          <!-- Date -->
          <div class="form-group">
            <label class="form-label">Tanggal</label>
            <input type="datetime-local" class="form-input" id="tx-date" value="${new Date().toISOString().slice(0,16)}" />
          </div>

          <!-- Submit -->
          <button type="submit" class="btn btn-primary btn-block" style="margin-top: 16px;" id="tx-submit">
            <span class="material-icons-round">save</span>
            Simpan Transaksi
          </button>
        </form>
      </div>
    </div>
  `}function be(){var t;const a=document.getElementById("tx-modal-backdrop");document.getElementById("tx-modal-sheet");const e=document.getElementById("tx-form");window.addEventListener("open-transaction-modal",n=>{var s;_e(((s=n.detail)==null?void 0:s.type)||"expense")}),a==null||a.addEventListener("click",J),document.querySelectorAll("#tx-type-chips .chip").forEach(n=>{n.addEventListener("click",()=>{document.querySelectorAll("#tx-type-chips .chip").forEach(r=>r.classList.remove("selected")),n.classList.add("selected");const s=n.dataset.type,i=document.getElementById("tx-to-account-group"),o=document.getElementById("tx-category-row");i&&(i.style.display=s==="transfer"?"":"none"),o&&(o.style.display=s==="transfer"?"none":"")})}),document.querySelectorAll("#tx-paid-by-chips .chip").forEach(n=>{n.addEventListener("click",()=>{document.querySelectorAll("#tx-paid-by-chips .chip").forEach(s=>s.classList.remove("selected")),n.classList.add("selected")})}),document.querySelectorAll("#tx-for-whom-chips .chip").forEach(n=>{n.addEventListener("click",()=>{document.querySelectorAll("#tx-for-whom-chips .chip").forEach(s=>s.classList.remove("selected")),n.classList.add("selected")})}),(t=document.getElementById("tx-category"))==null||t.addEventListener("change",n=>{const s=fe(n.target.value),i=document.getElementById("tx-subcategory");i&&(i.innerHTML='<option value="">Pilih Sub-Kategori</option>'+s.map(o=>`<option value="${o}">${o}</option>`).join(""))}),e==null||e.addEventListener("submit",n=>{var f,b,w,_,h,x,I,E,T,N;n.preventDefault();const s=((f=document.querySelector("#tx-type-chips .chip.selected"))==null?void 0:f.dataset.type)||"expense",i=parseFloat(((b=document.getElementById("tx-amount"))==null?void 0:b.value)||0),o=((w=document.getElementById("tx-description"))==null?void 0:w.value)||"",r=parseInt((_=document.getElementById("tx-account"))==null?void 0:_.value),d=s==="transfer"?parseInt((h=document.getElementById("tx-to-account"))==null?void 0:h.value):null,u=((x=document.getElementById("tx-category"))==null?void 0:x.value)||"",l=((I=document.getElementById("tx-subcategory"))==null?void 0:I.value)||"",m=((E=document.querySelector("#tx-paid-by-chips .chip.selected"))==null?void 0:E.dataset.value)||"Suami",g=((T=document.querySelector("#tx-for-whom-chips .chip.selected"))==null?void 0:T.dataset.value)||"Bersama",k=(N=document.getElementById("tx-date"))==null?void 0:N.value,v=k?new Date(k).toISOString():new Date().toISOString(),y=c.getState();if(!i||i<=0){S("Masukkan nominal yang valid","error");return}c.addTransaction({account_id:r,to_account_id:d,amount:i,type:s,description:o,parent_category:s==="transfer"?"Transfer":u,sub_category:s==="transfer"?"Pindah Buku":l,paid_by:m,for_whom:g,is_together:y.settings.togetherMode,created_at:v}),S("✅ Transaksi berhasil disimpan!"),J(),window.dispatchEvent(new CustomEvent("data-updated"))})}function _e(a="expense"){var d;const e=document.getElementById("tx-modal-backdrop"),t=document.getElementById("tx-modal-sheet"),n=document.getElementById("tx-modal-title");(d=document.getElementById("tx-form"))==null||d.reset(),document.getElementById("tx-date").value=new Date().toISOString().slice(0,16),document.querySelectorAll("#tx-type-chips .chip").forEach(u=>{u.classList.toggle("selected",u.dataset.type===a)});const s=document.getElementById("tx-to-account-group"),i=document.getElementById("tx-category-row");s&&(s.style.display=a==="transfer"?"":"none"),i&&(i.style.display=a==="transfer"?"none":""),c.getState().settings.togetherMode&&(document.querySelectorAll("#tx-paid-by-chips .chip").forEach(u=>{u.classList.toggle("selected",u.dataset.value==="Istri")}),document.querySelectorAll("#tx-for-whom-chips .chip").forEach(u=>{u.classList.toggle("selected",u.dataset.value==="Bersama")}));const r={expense:"Tambah Pengeluaran",income:"Tambah Pemasukan",transfer:"Transfer Antar Rekening"};n&&(n.textContent=r[a]||"Tambah Transaksi"),e==null||e.classList.add("open"),t==null||t.classList.add("open")}function J(){var a,e;(a=document.getElementById("tx-modal-backdrop"))==null||a.classList.remove("open"),(e=document.getElementById("tx-modal-sheet"))==null||e.classList.remove("open")}function ke(){return`
    <div class="modal-backdrop" id="scan-modal-backdrop"></div>
    <div class="modal-sheet" id="scan-modal-sheet">
      <div class="modal-handle"></div>
      <div class="modal-content">
        <h2 class="modal-title">🤖 Adam Family AI</h2>

        <!-- API Key Setup (Hanya tampil jika kosong) -->
        <div id="ai-key-config" style="display: none; background: var(--error-container); padding: 12px; border-radius: var(--radius-md); margin-bottom: 16px;">
           <p style="font-size: 13px; color: var(--error); margin-bottom: 8px;"><b>⚠️ API Key AI Terputus</b><br/>Karena alasan keamanan dari pihak penyedia (Google), kunci bawaan telah dicabut. Untuk menggunakan fitur ini, Anda perlu membuat API Key gratis dari Google AI Studio dan memasukkannya di bawah ini.</p>
           <input type="text" id="ai-key-input" class="form-input" placeholder="Paste API Key Gemini Anda di sini..." />
           <p style="font-size: 11px; color: var(--error); margin-top: 4px;">Dapatkan gratis di: <a href="https://aistudio.google.com/app/apikey" target="_blank" style="text-decoration: underline; font-weight: bold;">aistudio.google.com</a></p>
           <button class="btn btn-primary" id="btn-save-key" style="margin-top: 8px;">Simpan Kunci di Memori HP</button>
        </div>

        <div id="ai-main-app">
          <div class="ai-tabs" style="display: flex; gap: 8px; margin-bottom: 16px;">
            <button id="tab-text" class="btn btn-secondary" style="flex:1; border-color: var(--primary); color: var(--primary); background: var(--primary-container);">📝 Cerita Bebas</button>
            <button id="tab-scan" class="btn btn-secondary" style="flex:1;">📷 Scan Foto</button>
          </div>

          <!-- Panel Text -->
          <div id="panel-text">
            <label class="form-label">Ceritakan pengeluaran Anda (Bisa Voice-to-Text):</label>
            <textarea class="form-input" id="ai-text-input" rows="4" placeholder="Contoh: Hari ini isi bensin 150rb pakai Jago, lalu makan padang 35rb..." style="resize: vertical;"></textarea>
            <button class="btn btn-primary btn-block" id="btn-analyze-text" style="margin-top: 12px;">
              <span class="material-icons-round">auto_awesome</span> Minta AI Mengkategorikan
            </button>
          </div>

          <!-- Panel Scan (Image) -->
          <div id="panel-scan" style="display: none;">
            <div id="scan-upload-area" style="
              border: 2px dashed var(--outline-variant);
              border-radius: var(--radius-lg);
              padding: 40px 20px;
              text-align: center;
              cursor: pointer;
              transition: all 0.2s;
              margin-bottom: 16px;
            ">
              <span class="material-icons-round" style="font-size: 48px; color: var(--outline);">add_a_photo</span>
              <p style="color: var(--on-surface-variant); margin-top: 8px; font-weight: 600;">Tap untuk ambil foto atau pilih gambar</p>
              <p style="color: var(--outline); font-size: 12px; margin-top: 4px;">Struk belanja, slip gaji, atau nota</p>
              <input type="file" id="scan-file-input" accept="image/*" capture="environment" style="display: none;" />
            </div>

            <!-- Preview -->
            <div id="scan-preview" style="display: none; margin-bottom: 16px; background: var(--surface-container-high); padding: 8px; border-radius: var(--radius-md); border: 1px solid var(--outline-variant);">
              <img id="scan-preview-img" style="width: 100%; border-radius: 4px; height: auto; object-fit: contain;" />
            </div>
          </div>
        </div> <!-- End of AI App -->

        <!-- AI Result -->
        <div id="scan-result" style="display: none; margin-top: 16px;">
          <div class="ai-bubble" style="background: var(--primary-container); border-radius: var(--radius-lg) var(--radius-lg) var(--radius-lg) 0px; padding: 12px; margin-bottom: 16px;">
            <div class="ai-bubble-header" style="display: flex; align-items: center; gap: 6px; margin-bottom: 8px; color: var(--primary); font-weight: 700;">
              <span class="material-icons-round" style="font-size: 18px;">auto_awesome</span>
              <span>Adam Family AI</span>
            </div>
            <div class="ai-bubble-text" id="scan-ai-text" style="font-size: 14px; line-height: 1.5;">Menganalisis...</div>
          </div>

          <div id="scan-parsed-data" style="display: none; max-height: 250px; overflow-y: auto; padding-right: 4px;"></div>

          <button class="btn btn-primary btn-block" id="scan-save-btn" style="display: none; margin-top: 16px;">
            <span class="material-icons-round">save</span>
            Simpan Semua Transaksi
          </button>
        </div>

        <!-- Loading -->
        <div id="scan-loading" style="display: none; text-align: center; padding: 20px;">
          <div style="width: 40px; height: 40px; border: 3px solid var(--outline-variant); border-top-color: var(--primary); border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto;"></div>
          <p style="color: var(--on-surface-variant); margin-top: 12px; font-weight: 600;">AI sedang memahami maksud Anda...</p>
        </div>

        <style>
          @keyframes spin { to { transform: rotate(360deg); } }
        </style>
      </div>
    </div>
  `}let $=[];function we(){var k,v;const a=document.getElementById("scan-modal-backdrop"),e=document.getElementById("scan-modal-sheet"),t=document.getElementById("scan-upload-area"),n=document.getElementById("scan-file-input"),s=document.getElementById("tab-text"),i=document.getElementById("tab-scan"),o=document.getElementById("panel-text"),r=document.getElementById("panel-scan"),d=document.getElementById("ai-key-config"),u=document.getElementById("ai-main-app"),l=document.getElementById("btn-save-key"),m=document.getElementById("ai-key-input");function g(){c.getState().settings.geminiApiKey?(d.style.display="none",u.style.display="block"):(d.style.display="block",u.style.display="none")}l==null||l.addEventListener("click",()=>{const y=m.value.trim();if(!y){S("API Key tidak boleh kosong","error");return}c.updateSettings({geminiApiKey:y}),S("API Key Berhasil Disimpan"),g()}),s==null||s.addEventListener("click",()=>{o.style.display="block",r.style.display="none",s.style.background="var(--primary-container)",s.style.color="var(--primary)",s.style.borderColor="var(--primary)",i.style.background="transparent",i.style.color="var(--on-surface-variant)",i.style.borderColor="transparent"}),i==null||i.addEventListener("click",()=>{o.style.display="none",r.style.display="block",i.style.background="var(--primary-container)",i.style.color="var(--primary)",i.style.borderColor="var(--primary)",s.style.background="transparent",s.style.color="var(--on-surface-variant)",s.style.borderColor="transparent"}),window.addEventListener("open-scan-modal",()=>{a==null||a.classList.add("open"),e==null||e.classList.add("open"),g(),G()}),a==null||a.addEventListener("click",()=>{a==null||a.classList.remove("open"),e==null||e.classList.remove("open")}),(k=document.getElementById("btn-analyze-text"))==null||k.addEventListener("click",async()=>{var f,b;const y=(b=(f=document.getElementById("ai-text-input"))==null?void 0:f.value)==null?void 0:b.trim();if(!y){S("Silakan ceritakan pengeluaran Anda dulu","error");return}U();try{await W(y,null,null)}catch(w){Y(w)}}),t==null||t.addEventListener("click",()=>n==null?void 0:n.click()),n==null||n.addEventListener("change",async y=>{var w;const f=(w=y.target.files)==null?void 0:w[0];if(!f)return;U();const b=new FileReader;b.onload=async _=>{const h=_.target.result;document.getElementById("scan-preview-img").src=h,document.getElementById("scan-preview").style.display="block";try{await W(null,h.split(",")[1],f.type)}catch(x){Y(x)}},b.readAsDataURL(f)}),(v=document.getElementById("scan-save-btn"))==null||v.addEventListener("click",()=>{if(!$||$.length===0)return;const y=c.getAccounts(),b=c.getState().settings.togetherMode;let w=0;$.forEach(_=>{var x;let h=(x=y.find(I=>I.bank_name.toLowerCase().includes("tunai")))==null?void 0:x.id;if(_.account_guess){const I=_.account_guess.toLowerCase(),E=y.find(T=>T.bank_name.toLowerCase().includes(I));E&&(h=E.id)}!h&&y.length>0&&(h=y[0].id),c.addTransaction({account_id:h,amount:_.amount||0,type:_.type||"expense",description:_.description||"Transaksi AI",parent_category:_.category||"Lainnya",sub_category:_.sub_category||"",paid_by:b?"Istri":"Suami",for_whom:b?"Bersama":"Suami",is_together:b,created_at:_.date?new Date(_.date).toISOString():new Date().toISOString()}),w++}),S(`✅ ${w} transaksi dari AI berhasil disimpan!`),a==null||a.classList.remove("open"),e==null||e.classList.remove("open"),window.dispatchEvent(new CustomEvent("data-updated")),G()})}function G(){document.getElementById("scan-preview").style.display="none",document.getElementById("scan-result").style.display="none",document.getElementById("scan-loading").style.display="none",document.getElementById("scan-parsed-data").style.display="none",document.getElementById("scan-save-btn").style.display="none",document.getElementById("ai-text-input").value="",document.getElementById("scan-file-input").value="",$=[]}function U(){document.getElementById("scan-loading").style.display="block",document.getElementById("scan-result").style.display="none";const a=document.getElementById("ai-key-config");a&&(a.style.display="none");const e=document.getElementById("ai-main-app");e&&(e.style.display="block")}function Y(a){console.error("AI Error:",a),document.getElementById("scan-loading").style.display="none",document.getElementById("scan-result").style.display="block";let e="❌ Maaf, Gagal memproses AI. Silakan coba deksripsi yang lebih jelas.";a.message&&a.message.includes("403")&&(e="❌ API Key tidak valid atau telah diblokir limit. Hapus dan buat key yang baru.",c.updateSettings({geminiApiKey:""}),setTimeout(()=>{document.getElementById("ai-key-config").style.display="block",document.getElementById("ai-main-app").style.display="none",document.getElementById("scan-result").style.display="none"},3e3)),document.getElementById("scan-ai-text").innerHTML=e,document.getElementById("scan-parsed-data").style.display="none",document.getElementById("scan-save-btn").style.display="none"}async function W(a,e,t){var m,g,k,v,y;const n=c.getState().settings.geminiApiKey;if(!n)throw new Error("API Key Missing");const s=`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${n}`,i=D.map(f=>f.name).join(", ");let r=[{text:`Secara mendalam analisis ${a?"teks/cerita":"gambar struk"} berikut terkait pencatatan pengeluaran. Ekstrak rincian keuangan ke dalam format array JSON Object valid ([ { ... }, { ... } ]) TANPA block markdown.
  
Informasi Input Teks: "${a||"via gambar/struk"}"

Setiap item JSON merepresentasikan SATU transaksi. Harus memiliki kunci berikut:
- "type": "expense" atau "income"
- "amount": angka total transaksi ini (tanpa koma/huruf)
- "description": deskripsi/nama item pengeluaran ini
- "merchant": nama toko (jika ada)
- "date": estimasi tanggal format YYYY-MM-DD
- "category": wajib persis salah satu dari [${i}]
- "sub_category": tebakan sub kategori
- "account_guess": tebak pembayar menggunakan apa. Kembalikan salah satu keyword ini: 'jago', 'bsi', 'bri', 'tunai'. Jika tidak bisa menerka, berikan 'tunai'.

Pastikan merespon hanya dengan RAW JSON Array saja, contoh:
[
  { "type": "expense", "amount": 100000, "description": "Token Listrik", "category": "Rumah Tangga", "sub_category": "Listrik", "account_guess": "tunai" }
]`}];e&&r.push({inlineData:{mimeType:t||"image/jpeg",data:e}});const d=await fetch(s,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{parts:r}],generationConfig:{temperature:.1,maxOutputTokens:2048}})});if(!d.ok)throw d.status===403?new Error("403 Forbidden: API Key Invalid or Leaked"):new Error("HTTP Error "+d.status);const l=((y=(v=(k=(g=(m=(await d.json()).candidates)==null?void 0:m[0])==null?void 0:g.content)==null?void 0:k.parts)==null?void 0:v[0])==null?void 0:y.text)||"";document.getElementById("scan-loading").style.display="none",document.getElementById("scan-result").style.display="block";try{const f=l.match(/\[[\s\S]*\]/)||l.match(/\{[\s\S]*\}/);if(!f)throw new Error("No JSON Array found");let b=JSON.parse(f[0]);if(Array.isArray(b)||(b=[b]),$=b,$.length===0)throw new Error("Parsed data is empty");document.getElementById("scan-ai-text").innerHTML=`
      <strong>✅ AI Berhasil Memahami!</strong><br/>
      Ditemukan ${$.length} transaksi yang diekstrak.
    `;const w=c.getAccounts(),_=document.getElementById("scan-parsed-data");_.style.display="block",_.innerHTML=$.map(h=>{let x="Tunai (Otomatis)";if(h.account_guess){const I=h.account_guess.toLowerCase(),E=w.find(T=>T.bank_name.toLowerCase().includes(I));E&&(x=E.bank_name)}return`
        <div style="background: var(--surface-container); border-radius: var(--radius-md); padding: 12px; margin-top: 12px; border: 1px solid var(--outline-variant);">
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="font-weight: 600; color: var(--on-surface-variant);">${h.type==="income"?"💰 Pemasukan":"💸 Pengeluaran"}</span>
            <span style="font-weight: 800; color: ${h.type==="income"?"var(--success)":"var(--error)"};">${p(h.amount||0)}</span>
          </div>
          <div style="font-size: 13px; color: var(--on-surface-variant);">
            <p>📝 <strong>${h.description||"-"}</strong></p>
            <p>📂 ${h.category||"-"} → ${h.sub_category||"-"}</p>
            <p>💳 Menggunakan: <strong>${x}</strong></p>
          </div>
        </div>
      `}).join(""),document.getElementById("scan-save-btn").style.display="flex"}catch(f){throw console.error(f,l),new Error("Parsing Error: "+f.message)}}function xe(){const a=c.getState(),e=new Date,t=a.settings.allowanceBudget||15e5,n=c.getAllowanceSpent(),s=Math.max(0,t-n),i=A(n,t),o=c.getDanaPusatBalance(),r=c.getMonthlyExpenses(e.getFullYear(),e.getMonth()),d=c.getMonthlyIncome(e.getFullYear(),e.getMonth());return`
    <div class="bento-grid stagger-children">
      <!-- Pegangan Suami -->
      <div class="card card-gradient" id="card-allowance">
        <div class="card-title">💰 Pegangan ${a.settings.userName||"Suami"}</div>
        <div class="card-value">${p(s)}</div>
        <div class="card-subtitle">Terpakai ${p(n)} dari ${p(t)}</div>
        <div style="margin-top: 12px;">
          <div class="progress-bar" style="height: 6px; background: rgba(255,255,255,0.2);">
            <div class="progress-bar-fill ${i>80?"red":"blue"}"
                 style="width: ${i}%; background: ${i>80?"linear-gradient(90deg, #ffab91, #ff5722)":"rgba(255,255,255,0.8)"};"></div>
          </div>
        </div>
      </div>

      <!-- Dana Pusat -->
      <div class="card card-gradient-gold" id="card-dana-pusat">
        <div class="card-title">🏦 Dana Pusat</div>
        <div class="card-value">${p(o)}</div>
        <div class="card-subtitle">Dikelola oleh ${a.settings.spouseName||"Istri"}</div>
      </div>

      <!-- Total Saldo -->
      <div class="card" id="card-total-balance">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
          <span class="material-icons-round" style="color: var(--primary); font-size: 20px;">account_balance</span>
          <div class="card-title" style="margin-bottom: 0;">Total Saldo</div>
        </div>
        <div class="card-value" style="font-size: 1.5rem; color: var(--primary);">${p(c.getTotalBalance())}</div>
        <div class="card-subtitle" style="color: var(--on-surface-variant);">${a.accounts.length} rekening aktif</div>
      </div>

      <!-- Arus Kas Bulan Ini -->
      <div class="card" id="card-cash-flow">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
          <span class="material-icons-round" style="color: var(--success); font-size: 20px;">swap_vert</span>
          <div class="card-title" style="margin-bottom: 0;">Arus Kas ${L()}</div>
        </div>
        <div style="display: flex; gap: 12px; margin-top: 8px;">
          <div>
            <div style="font-size: 11px; color: var(--success); font-weight: 600;">▲ Masuk</div>
            <div style="font-size: 14px; font-weight: 700; color: var(--success);">${p(d,!0)}</div>
          </div>
          <div>
            <div style="font-size: 11px; color: var(--error); font-weight: 600;">▼ Keluar</div>
            <div style="font-size: 14px; font-weight: 700; color: var(--error);">${p(r,!0)}</div>
          </div>
        </div>
      </div>
    </div>
  `}function Se(a){const e=a.toLowerCase();return e.includes("bri")?"bri":e.includes("jago")?"jago":e.includes("bsi")?"bsi":"default"}function Ie(a){const e=a.toLowerCase();return e.includes("bri")?"BRI":e.includes("jago")?"JGO":e.includes("bsi")?"BSI":a.slice(0,3).toUpperCase()}function Ee(){return`
    <div class="section-header">
      <h2 class="section-title">Rekening Bank</h2>
      <span class="section-action" id="btn-manage-accounts">Kelola</span>
    </div>
    <div class="bank-slider" id="bank-slider">
      ${c.getAccounts().map(e=>{const t=Se(e.bank_name);return`
          <div class="bank-card ${t}" data-account-id="${e.id}">
            <div class="bank-card-icon ${t}">${Ie(e.bank_name)}</div>
            <div class="bank-card-name">${e.bank_name}</div>
            <div class="bank-card-owner">${e.owner_name}</div>
            <div class="bank-card-balance">${p(e.balance)}</div>
          </div>
        `}).join("")}
      <div class="bank-card-add" id="btn-add-account">
        <span class="material-icons-round">add</span>
        <span>Tambah</span>
      </div>
    </div>
  `}function Be(){const a=document.getElementById("btn-add-account");a&&a.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("open-account-modal"))});const e=document.getElementById("btn-manage-accounts");e&&e.addEventListener("click",()=>{M(async()=>{const{default:t}=await Promise.resolve().then(()=>se);return{default:t}},void 0).then(({default:t})=>t.navigate("/accounts"))})}function $e(){const a=c.getState(),e=new Date,t=c.getTransactionsByMonth(e.getFullYear(),e.getMonth()),n=a.assets.kpr,s=A(n.paid,n.total),i=6e5,o=t.filter(m=>m.type==="expense"&&m.parent_category==="Transportasi").reduce((m,g)=>m+g.amount,0),r=A(o,i),d=8e5,u=t.filter(m=>m.type==="expense"&&m.for_whom==="Anak").reduce((m,g)=>m+g.amount,0),l=A(u,d);return`
    <div class="section-header">
      <h2 class="section-title">Analisis Budget</h2>
    </div>
    <div style="display: flex; flex-direction: column; gap: 12px;" class="stagger-children">
      <!-- KPR Progress -->
      <div class="analysis-card">
        <div class="analysis-card-header">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="material-icons-round" style="color: var(--primary); font-size: 20px;">home</span>
            <span class="analysis-card-label">Progres KPR ${n.bank||"BTN"}</span>
          </div>
          <span class="analysis-card-value" style="color: var(--primary);">${s}%</span>
        </div>
        <div class="progress-bar">
          <div class="progress-bar-fill blue" style="width: ${s}%;"></div>
        </div>
        <div class="analysis-card-detail">
          <span>Lunas: ${p(n.paid,!0)}</span>
          <span>Total: ${p(n.total,!0)}</span>
        </div>
      </div>

      <!-- Bensin / Transportasi -->
      <div class="analysis-card">
        <div class="analysis-card-header">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="material-icons-round" style="color: ${r>80?"var(--error)":"var(--tertiary)"}; font-size: 20px;">local_gas_station</span>
            <span class="analysis-card-label">Budget Transportasi</span>
          </div>
          <span class="analysis-card-value" style="color: ${r>80?"var(--error)":"var(--tertiary)"};">${r}%</span>
        </div>
        <div class="progress-bar">
          <div class="progress-bar-fill ${r>80?"red":"gold"}" style="width: ${r}%;"></div>
        </div>
        <div class="analysis-card-detail">
          <span>Terpakai: ${p(o,!0)}</span>
          <span>Budget: ${p(i,!0)}</span>
        </div>
      </div>

      <!-- Keperluan Anak -->
      <div class="analysis-card">
        <div class="analysis-card-header">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="material-icons-round" style="color: var(--success); font-size: 20px;">child_care</span>
            <span class="analysis-card-label">Keperluan Anak</span>
          </div>
          <span class="analysis-card-value" style="color: var(--success);">${l}%</span>
        </div>
        <div class="progress-bar">
          <div class="progress-bar-fill green" style="width: ${l}%;"></div>
        </div>
        <div class="analysis-card-detail">
          <span>Terpakai: ${p(u,!0)}</span>
          <span>Budget: ${p(d,!0)}</span>
        </div>
      </div>
    </div>
  `}function O(a=10,e={}){let t=c.getTransactions(e);const n=t.length;if(a&&(t=t.slice(0,a)),t.length===0)return`
      <div class="empty-state">
        <span class="material-icons-round">receipt_long</span>
        <h3>Belum Ada Transaksi</h3>
        <p>Mulai catat pengeluaran dan pemasukan Anda</p>
      </div>
    `;const s=X(t);let i="";return Object.entries(s).forEach(([o,r])=>{i+=`<div class="transaction-group-header">${o}</div>`,r.forEach(d=>{const u=ye(d.parent_category),l=d.type,m=d.type==="expense"?"-":d.type==="income"?"+":"↔",g=c.getAccountById(d.account_id),k=g?g.bank_name:"";i+=`
        <div class="transaction-item" data-tx-id="${d.id}">
          <div class="transaction-icon ${l}">
            <span class="material-icons-round">${u}</span>
          </div>
          <div class="transaction-info">
            <div class="transaction-desc">${d.description}</div>
            <div class="transaction-meta">
              <span class="badge badge-${(d.paid_by||"").toLowerCase()}">${d.paid_by||"-"}</span>
              ${d.is_together?'<span class="badge badge-together">💕</span>':""}
              <span>${d.sub_category||d.parent_category||""}</span>
            </div>
          </div>
          <div class="transaction-amount">
            <div class="transaction-amount-value ${l}">${m} ${p(d.amount)}</div>
            <div class="transaction-amount-account">${k}</div>
          </div>
        </div>
      `})}),a&&n>a&&(i+=`
      <div style="text-align: center; padding: 16px 0;">
        <a href="#/transactions" class="section-action">Lihat Semua (${n} transaksi) →</a>
      </div>
    `),i}function R(){document.querySelectorAll(".transaction-item").forEach(a=>{a.addEventListener("click",()=>{const e=a.dataset.txId;window.dispatchEvent(new CustomEvent("view-transaction",{detail:{id:e}}))})})}function Ae(){const a=c.getState();return`
    <div class="page-container animate-fade-in" id="dashboard-page">
      <!-- Greeting -->
      <div style="margin-bottom: 20px;">
        <h1 style="font-size: 1.5rem; font-weight: 800; color: var(--on-surface); letter-spacing: -0.5px;">
          ${Pe()}, ${a.settings.userName||"User"} 👋
        </h1>
        <p style="font-size: var(--fs-body); color: var(--on-surface-variant); margin-top: 4px;">
          Berikut ringkasan keuangan keluarga bulan ${L()}
        </p>
      </div>

      <!-- Summary Cards -->
      ${xe()}

      <!-- Bank Slider -->
      ${Ee()}

      <!-- Analysis -->
      ${$e()}

      <!-- Recent Transactions -->
      <div class="section-header">
        <h2 class="section-title">Transaksi Terbaru</h2>
        <a href="#/transactions" class="section-action">Lihat Semua</a>
      </div>
      <div id="recent-transactions">
        ${O(8)}
      </div>
    </div>
  `}function Te(){Be(),R()}function Pe(){const a=new Date().getHours();return a<11?"Selamat Pagi":a<15?"Selamat Siang":a<18?"Selamat Sore":"Selamat Malam"}let B={};function Le(){const a=new Date,e=c.getMonthlyExpenses(a.getFullYear(),a.getMonth()),t=c.getMonthlyIncome(a.getFullYear(),a.getMonth()),n=t-e;return`
    <div class="page-container animate-fade-in" id="transactions-page">
      <h1 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 4px;">Transaksi</h1>
      <p style="color: var(--on-surface-variant); font-size: var(--fs-body); margin-bottom: 16px;">
        Riwayat keuangan bulan ${L()}
      </p>

      <!-- Monthly Summary Bar -->
      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; margin-bottom: 20px;">
        <div style="background: var(--success-container); border-radius: var(--radius-md); padding: 12px; text-align: center;">
          <div style="font-size: 11px; font-weight: 600; color: var(--success);">Pemasukan</div>
          <div style="font-size: 14px; font-weight: 800; color: var(--success); margin-top: 4px;">${p(t,!0)}</div>
        </div>
        <div style="background: var(--error-container); border-radius: var(--radius-md); padding: 12px; text-align: center;">
          <div style="font-size: 11px; font-weight: 600; color: var(--error);">Pengeluaran</div>
          <div style="font-size: 14px; font-weight: 800; color: var(--error); margin-top: 4px;">${p(e,!0)}</div>
        </div>
        <div style="background: var(--primary-container); border-radius: var(--radius-md); padding: 12px; text-align: center;">
          <div style="font-size: 11px; font-weight: 600; color: var(--primary);">Selisih</div>
          <div style="font-size: 14px; font-weight: 800; color: ${n>=0?"var(--success)":"var(--error)"}; margin-top: 4px;">${p(n,!0)}</div>
        </div>
      </div>

      <!-- Search -->
      <div class="search-bar" style="margin-bottom: 12px;">
        <span class="material-icons-round">search</span>
        <input type="text" id="tx-search" placeholder="Cari transaksi..." />
      </div>

      <!-- Filter Chips -->
      <div class="filter-bar" id="tx-filters">
        <button class="chip selected" data-filter="all">Semua</button>
        <button class="chip" data-filter="expense">Pengeluaran</button>
        <button class="chip" data-filter="income">Pemasukan</button>
        <button class="chip" data-filter="transfer">Transfer</button>
      </div>

      <!-- Paid By Filter -->
      <div class="filter-bar" id="tx-paid-filter" style="margin-top: -8px;">
        <button class="chip selected" data-paid="all">Semua</button>
        <button class="chip" data-paid="Suami">👨 Suami</button>
        <button class="chip" data-paid="Istri">👩 Istri</button>
      </div>

      <!-- Chart -->
      <div class="chart-container" style="margin-bottom: 16px;">
        <div style="font-weight: 700; font-size: var(--fs-label); margin-bottom: 12px; color: var(--on-surface-variant);">
          📊 Pengeluaran per Kategori
        </div>
        <div style="position: relative; height: 250px; width: 100%;">
          <canvas id="category-chart"></canvas>
        </div>
      </div>

      <!-- Transaction List -->
      <div id="filtered-transactions">
        ${O(null,B)}
      </div>
    </div>
  `}function Me(){R(),document.querySelectorAll("#tx-filters .chip").forEach(e=>{e.addEventListener("click",()=>{document.querySelectorAll("#tx-filters .chip").forEach(n=>n.classList.remove("selected")),e.classList.add("selected");const t=e.dataset.filter;t==="all"?delete B.type:B.type=t,K()})}),document.querySelectorAll("#tx-paid-filter .chip").forEach(e=>{e.addEventListener("click",()=>{document.querySelectorAll("#tx-paid-filter .chip").forEach(n=>n.classList.remove("selected")),e.classList.add("selected");const t=e.dataset.paid;t==="all"?delete B.paid_by:B.paid_by=t,K()})});const a=document.getElementById("tx-search");a&&a.addEventListener("input",ee(e=>{const t=e.target.value.trim();t?B.search=t:delete B.search,K()},300)),De()}function K(){const a=document.getElementById("filtered-transactions");a&&(a.innerHTML=O(null,B),R())}async function De(){const a=document.getElementById("category-chart");if(a)try{const e=await M(()=>import("./auto-eE5P6S0m.js"),[]),t=e.default||e.Chart,n=new Date,s=c.getCategorySpending(n.getFullYear(),n.getMonth());if(s.length===0){a.parentElement.innerHTML=`
        <div style="text-align: center; padding: 20px; color: var(--outline);">
          <span class="material-icons-round" style="font-size: 32px;">pie_chart</span>
          <p style="margin-top: 8px;">Belum ada data pengeluaran bulan ini</p>
        </div>
      `;return}const i=["#30609d","#9a6a1a","#1b6d2f","#ba1a1a","#7b1fa2","#00695c","#e65100","#283593","#4e342e","#546e7a","#ad1457","#00838f"];new t(a,{type:"doughnut",data:{labels:s.map(o=>o.name),datasets:[{data:s.map(o=>o.amount),backgroundColor:i.slice(0,s.length),borderWidth:2,borderColor:"#fff",hoverOffset:6}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"65%",plugins:{legend:{position:"bottom",labels:{padding:12,usePointStyle:!0,pointStyleWidth:8,font:{family:"'Plus Jakarta Sans'",size:11,weight:"600"}}},tooltip:{callbacks:{label:o=>{const r=o.dataset.data.reduce((u,l)=>u+l,0),d=Math.round(o.parsed/r*100);return` ${o.label}: ${p(o.parsed)} (${d}%)`}},titleFont:{family:"'Plus Jakarta Sans'"},bodyFont:{family:"'Plus Jakarta Sans'"}}}}})}catch(e){console.warn("Chart.js not loaded:",e)}}function ze(){const a=c.getAccounts(),e=c.getTotalBalance();return`
    <div class="page-container animate-fade-in" id="accounts-page">
      <h1 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 4px;">Rekening Bank</h1>
      <p style="color: var(--on-surface-variant); font-size: var(--fs-body); margin-bottom: 20px;">
        Kelola seluruh rekening keluarga
      </p>

      <!-- Total Balance -->
      <div class="net-worth-card" style="margin-bottom: 20px;">
        <div class="net-worth-label">Total Seluruh Saldo</div>
        <div class="net-worth-value">${p(e)}</div>
        <div style="font-size: 13px; opacity: 0.7;">${a.length} rekening terdaftar</div>
      </div>

      <!-- Account Cards -->
      <div style="display: flex; flex-direction: column; gap: 12px;" class="stagger-children" id="account-list">
        ${a.map(t=>Ce(t)).join("")}
      </div>

      <!-- Add Account Button -->
      <button class="btn btn-secondary btn-block" style="margin-top: 20px;" id="btn-add-new-account">
        <span class="material-icons-round">add</span>
        Tambah Rekening Baru
      </button>

      <!-- Account Add/Edit Modal -->
      ${Ke()}
    </div>
  `}function Ce(a){const e=te(a.bank_name);return`
    <div class="card" style="display: flex; align-items: center; gap: 16px; cursor: pointer;" data-acc-id="${a.id}">
      <div class="bank-card-icon ${e}" style="flex-shrink: 0;">${Oe(a.bank_name)}</div>
      <div style="flex: 1; min-width: 0;">
        <div style="font-weight: 700; font-size: var(--fs-body);">${a.bank_name}</div>
        <div style="font-size: var(--fs-caption); color: var(--on-surface-variant);">
          ${a.owner_name} ${a.is_allowance_account?"• Pegangan":""}
        </div>
      </div>
      <div style="text-align: right;">
        <div style="font-weight: 800; font-size: var(--fs-body); color: var(--primary);">${p(a.balance)}</div>
      </div>
      <button class="btn-delete-account" data-acc-id="${a.id}" style="color: var(--error); padding: 8px; border-radius: 50%;" title="Hapus">
        <span class="material-icons-round" style="font-size: 18px;">delete_outline</span>
      </button>
    </div>
  `}function Ke(){return`
    <div class="modal-backdrop" id="acc-modal-backdrop"></div>
    <div class="modal-sheet" id="acc-modal-sheet">
      <div class="modal-handle"></div>
      <div class="modal-content">
        <h2 class="modal-title" id="acc-modal-title">Tambah Rekening</h2>
        <form id="acc-form">
          <div class="form-group">
            <label class="form-label">Nama Bank</label>
            <input type="text" class="form-input" id="acc-bank-name" placeholder="Contoh: BRI, BSI, Bank Jago" required />
          </div>
          <div class="form-group">
            <label class="form-label">Pemilik</label>
            <div class="chip-group" id="acc-owner-chips">
              <button type="button" class="chip selected" data-value="Suami">Suami</button>
              <button type="button" class="chip" data-value="Istri">Istri</button>
              <button type="button" class="chip" data-value="Bersama">Bersama</button>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Saldo Awal (Rp)</label>
            <input type="number" class="form-input" id="acc-balance" placeholder="0" min="0" inputmode="numeric" />
          </div>
          <div class="form-group">
            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
              <input type="checkbox" id="acc-is-allowance" style="width: 18px; height: 18px; accent-color: var(--primary);" />
              <span class="form-label" style="margin-bottom: 0;">Rekening Pegangan (Uang Harian)</span>
            </label>
          </div>
          <button type="submit" class="btn btn-primary btn-block" style="margin-top: 16px;">
            <span class="material-icons-round">save</span>
            Simpan Rekening
          </button>
        </form>
      </div>
    </div>
  `}function je(){var t;const a=document.getElementById("btn-add-new-account"),e=document.getElementById("acc-modal-backdrop");document.getElementById("acc-modal-sheet"),a==null||a.addEventListener("click",()=>V()),window.addEventListener("open-account-modal",()=>V()),e==null||e.addEventListener("click",()=>Q()),document.querySelectorAll("#acc-owner-chips .chip").forEach(n=>{n.addEventListener("click",()=>{document.querySelectorAll("#acc-owner-chips .chip").forEach(s=>s.classList.remove("selected")),n.classList.add("selected")})}),(t=document.getElementById("acc-form"))==null||t.addEventListener("submit",n=>{var d,u,l,m,g;n.preventDefault();const s=(u=(d=document.getElementById("acc-bank-name"))==null?void 0:d.value)==null?void 0:u.trim(),i=((l=document.querySelector("#acc-owner-chips .chip.selected"))==null?void 0:l.dataset.value)||"Suami",o=parseFloat(((m=document.getElementById("acc-balance"))==null?void 0:m.value)||0),r=((g=document.getElementById("acc-is-allowance"))==null?void 0:g.checked)||!1;if(!s){S("Masukkan nama bank","error");return}c.addAccount({bank_name:s,owner_name:i,balance:o,is_allowance_account:r,css_class:te(s).replace("bank-card-icon ","")}),S("✅ Rekening berhasil ditambahkan!"),Q(),window.dispatchEvent(new CustomEvent("data-updated"))}),document.querySelectorAll(".btn-delete-account").forEach(n=>{n.addEventListener("click",s=>{s.stopPropagation();const i=parseInt(n.dataset.accId);confirm("Hapus rekening ini?")&&(c.deleteAccount(i),S("Rekening dihapus"),window.dispatchEvent(new CustomEvent("data-updated")))})})}function V(){var a,e,t;(a=document.getElementById("acc-form"))==null||a.reset(),(e=document.getElementById("acc-modal-backdrop"))==null||e.classList.add("open"),(t=document.getElementById("acc-modal-sheet"))==null||t.classList.add("open")}function Q(){var a,e;(a=document.getElementById("acc-modal-backdrop"))==null||a.classList.remove("open"),(e=document.getElementById("acc-modal-sheet"))==null||e.classList.remove("open")}function te(a){const e=a.toLowerCase();return e.includes("bri")?"bri":e.includes("jago")?"jago":e.includes("bsi")?"bsi":e.includes("tunai")||e.includes("cash")?"tunai":"default"}function Oe(a){const e=a.toLowerCase();return e.includes("bri")?"BRI":e.includes("jago")?"JGO":e.includes("bsi")?"BSI":e.includes("tunai")||e.includes("cash")?"CSH":a.slice(0,3).toUpperCase()}function Re(){const a=c.getAssets(),e=c.getNetWorth(),t=c.getTotalBalance(),n=a.emas,s=n.bsi_gram+n.tring_gram,i=s*n.price_per_gram,o=a.kpr,r=A(o.paid,o.total),d=o.total-o.paid,u=a.arisan||[];return`
    <div class="page-container animate-fade-in" id="assets-page">
      <h1 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 4px;">Aset & Kekayaan</h1>
      <p style="color: var(--on-surface-variant); font-size: var(--fs-body); margin-bottom: 20px;">
        Pantau kekayaan bersih keluarga secara real-time
      </p>

      <!-- Net Worth Card -->
      <div class="net-worth-card" style="margin-bottom: 24px;">
        <div class="net-worth-label">Kekayaan Bersih (Net Worth)</div>
        <div class="net-worth-value">${p(e)}</div>
        <div class="net-worth-change up">
          <span class="material-icons-round" style="font-size: 14px;">trending_up</span>
          <span>Termasuk aset emas & ekuitas KPR</span>
        </div>

        <!-- Breakdown mini -->
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; margin-top: 16px; position: relative; z-index: 1;">
          <div style="text-align: center;">
            <div style="font-size: 11px; opacity: 0.6;">💰 Bank</div>
            <div style="font-size: 13px; font-weight: 700;">${p(t,!0)}</div>
          </div>
          <div style="text-align: center;">
            <div style="font-size: 11px; opacity: 0.6;">🪙 Emas</div>
            <div style="font-size: 13px; font-weight: 700;">${p(i,!0)}</div>
          </div>
          <div style="text-align: center;">
            <div style="font-size: 11px; opacity: 0.6;">🏠 KPR Equity</div>
            <div style="font-size: 13px; font-weight: 700;">${p(o.paid,!0)}</div>
          </div>
        </div>
      </div>

      <!-- Emas Section -->
      <div class="asset-card" id="asset-emas">
        <div class="asset-card-header">
          <div class="asset-card-icon emas">
            <span class="material-icons-round">diamond</span>
          </div>
          <div>
            <div class="asset-card-title">Investasi Emas</div>
            <div class="asset-card-subtitle">BSI Gold & Tring</div>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
          <div style="background: var(--tertiary-container); border-radius: var(--radius-md); padding: 12px;">
            <div style="font-size: 11px; font-weight: 600; color: var(--on-tertiary-container);">BSI Gold</div>
            <div style="font-size: 1.1rem; font-weight: 800; color: var(--tertiary); margin-top: 4px;">${n.bsi_gram}g</div>
            <div style="font-size: 12px; color: var(--on-tertiary-container); opacity: 0.8;">${p(n.bsi_gram*n.price_per_gram,!0)}</div>
          </div>
          <div style="background: var(--tertiary-container); border-radius: var(--radius-md); padding: 12px;">
            <div style="font-size: 11px; font-weight: 600; color: var(--on-tertiary-container);">Tring</div>
            <div style="font-size: 1.1rem; font-weight: 800; color: var(--tertiary); margin-top: 4px;">${n.tring_gram}g</div>
            <div style="font-size: 12px; color: var(--on-tertiary-container); opacity: 0.8;">${p(n.tring_gram*n.price_per_gram,!0)}</div>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 12px; border-top: 1px solid var(--outline-variant);">
          <div>
            <div style="font-size: 12px; color: var(--on-surface-variant);">Total Emas</div>
            <div style="font-size: 1.25rem; font-weight: 800; color: var(--tertiary);">${s}g</div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 12px; color: var(--on-surface-variant);">Nilai Pasar</div>
            <div style="font-size: 1.25rem; font-weight: 800; color: var(--tertiary);">${p(i)}</div>
          </div>
        </div>

        <div style="margin-top: 12px; padding: 8px 12px; background: var(--surface-container); border-radius: var(--radius-sm); display: flex; align-items: center; gap: 8px;">
          <span class="material-icons-round" style="font-size: 16px; color: var(--outline);">info</span>
          <span style="font-size: 11px; color: var(--on-surface-variant);">Harga emas: ${p(n.price_per_gram)}/gram (update manual)</span>
        </div>
      </div>

      <!-- KPR Section -->
      <div class="asset-card" id="asset-kpr">
        <div class="asset-card-header">
          <div class="asset-card-icon kpr">
            <span class="material-icons-round">home</span>
          </div>
          <div>
            <div class="asset-card-title">KPR ${o.bank||"BTN"}</div>
            <div class="asset-card-subtitle">Kredit Pemilikan Rumah</div>
          </div>
        </div>

        <!-- Big Progress -->
        <div style="text-align: center; margin-bottom: 16px;">
          <div style="position: relative; width: 140px; height: 140px; margin: 0 auto;">
            <svg width="140" height="140" viewBox="0 0 140 140" style="transform: rotate(-90deg);">
              <circle cx="70" cy="70" r="60" fill="none" stroke="var(--outline-variant)" stroke-width="10" opacity="0.3" />
              <circle cx="70" cy="70" r="60" fill="none" stroke="var(--primary)" stroke-width="10"
                stroke-dasharray="${2*Math.PI*60}"
                stroke-dashoffset="${2*Math.PI*60*(1-r/100)}"
                stroke-linecap="round"
                style="transition: stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1);" />
            </svg>
            <div style="position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center;">
              <div style="font-size: 1.75rem; font-weight: 800; color: var(--primary);">${r}%</div>
              <div style="font-size: 11px; color: var(--on-surface-variant); font-weight: 600;">Lunas</div>
            </div>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          <div style="background: var(--surface-container); border-radius: var(--radius-md); padding: 12px;">
            <div style="font-size: 11px; color: var(--on-surface-variant); font-weight: 600;">Sudah Bayar</div>
            <div style="font-size: 14px; font-weight: 800; color: var(--success); margin-top: 4px;">${p(o.paid,!0)}</div>
          </div>
          <div style="background: var(--surface-container); border-radius: var(--radius-md); padding: 12px;">
            <div style="font-size: 11px; color: var(--on-surface-variant); font-weight: 600;">Sisa Hutang</div>
            <div style="font-size: 14px; font-weight: 800; color: var(--error); margin-top: 4px;">${p(d,!0)}</div>
          </div>
          <div style="background: var(--surface-container); border-radius: var(--radius-md); padding: 12px;">
            <div style="font-size: 11px; color: var(--on-surface-variant); font-weight: 600;">Cicilan/bulan</div>
            <div style="font-size: 14px; font-weight: 800; color: var(--on-surface); margin-top: 4px;">${p(o.monthly,!0)}</div>
          </div>
          <div style="background: var(--surface-container); border-radius: var(--radius-md); padding: 12px;">
            <div style="font-size: 11px; color: var(--on-surface-variant); font-weight: 600;">Sisa Tenor</div>
            <div style="font-size: 14px; font-weight: 800; color: var(--on-surface); margin-top: 4px;">${o.remaining_months} bulan</div>
          </div>
        </div>
      </div>

      <!-- Arisan Section -->
      <div class="asset-card" id="asset-arisan">
        <div class="asset-card-header">
          <div class="asset-card-icon arisan">
            <span class="material-icons-round">groups</span>
          </div>
          <div>
            <div class="asset-card-title">Arisan</div>
            <div class="asset-card-subtitle">${u.length} kelompok arisan aktif</div>
          </div>
        </div>

        ${u.length===0?`
          <div style="text-align: center; padding: 20px; color: var(--outline);">
            Belum ada data arisan
          </div>
        `:u.map(l=>`
          <div style="background: var(--surface-container); border-radius: var(--radius-md); padding: 12px; margin-bottom: 8px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <div style="font-weight: 700; font-size: var(--fs-body);">${l.name}</div>
              <span class="badge" style="background: ${l.is_active?"var(--success-container)":"var(--surface-container-high)"}; color: ${l.is_active?"var(--success)":"var(--outline)"};">
                ${l.is_active?"Aktif":"Selesai"}
              </span>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; font-size: 12px;">
              <div>
                <div style="color: var(--on-surface-variant);">Iuran</div>
                <div style="font-weight: 700;">${p(l.monthly_amount,!0)}</div>
              </div>
              <div>
                <div style="color: var(--on-surface-variant);">Giliran Saya</div>
                <div style="font-weight: 700;">Ke-${l.my_turn}</div>
              </div>
              <div>
                <div style="color: var(--on-surface-variant);">Putaran</div>
                <div style="font-weight: 700;">${l.current_round}/${l.total_members}</div>
              </div>
            </div>
            <div style="margin-top: 8px;">
              <div class="progress-bar" style="height: 4px;">
                <div class="progress-bar-fill blue" style="width: ${A(l.current_round,l.total_members)}%;"></div>
              </div>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `}function Ne(){}function Fe(){c.getState();const a=new Date,e=He();return`
    <div class="page-container animate-fade-in" id="insights-page">
      <h1 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 4px;">
        <span class="material-icons-round" style="vertical-align: middle; color: var(--primary); font-size: 28px;">auto_awesome</span>
        AI Insight
      </h1>
      <p style="color: var(--on-surface-variant); font-size: var(--fs-body); margin-bottom: 20px;">
        Analisis keuangan cerdas untuk ${L()} ${a.getFullYear()}
      </p>

      <!-- AI Status Card -->
      <div class="card" style="background: linear-gradient(135deg, #e8eeff, #f0e6ff); border: 1px solid rgba(48, 96, 157, 0.15); margin-bottom: 20px;">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
          <div style="width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, var(--primary), #7b1fa2); display: flex; align-items: center; justify-content: center;">
            <span class="material-icons-round" style="color: white; font-size: 22px;">psychology</span>
          </div>
          <div>
            <div style="font-weight: 700; font-size: var(--fs-body);">Adam Family AI Assistant</div>
            <div style="font-size: 11px; color: var(--on-surface-variant);">Fase Belajar — Memantau pola pengeluaran</div>
          </div>
        </div>
        <div style="font-size: var(--fs-body); color: var(--on-surface); line-height: 1.6;">
          Saya sedang mempelajari pola keuangan keluarga Anda. Berikut beberapa insight awal yang saya temukan:
        </div>
      </div>

      <!-- Insights List -->
      <div style="display: flex; flex-direction: column; gap: 12px;" class="stagger-children">
        ${e.map(t=>`
          <div class="ai-bubble" style="border-left: 3px solid ${t.color};">
            <div class="ai-bubble-header">
              <div class="ai-bubble-avatar" style="background: ${t.color};">
                <span class="material-icons-round" style="font-size: 14px;">${t.icon}</span>
              </div>
              <span class="ai-bubble-name">${t.title}</span>
            </div>
            <div class="ai-bubble-text">${t.message}</div>
            ${t.detail?`
              <div style="margin-top: 8px; padding: 8px 12px; background: rgba(0,0,0,0.04); border-radius: var(--radius-sm); font-size: 12px; color: var(--on-surface-variant);">
                ${t.detail}
              </div>
            `:""}
          </div>
        `).join("")}
      </div>

      <!-- Spending Patterns -->
      <div class="section-header" style="margin-top: 24px;">
        <h2 class="section-title">Pola Pengeluaran</h2>
      </div>

      ${qe()}

      <!-- Tips Section -->
      <div class="section-header" style="margin-top: 24px;">
        <h2 class="section-title">💡 Tips Keuangan</h2>
      </div>

      <div style="display: flex; flex-direction: column; gap: 12px;">
        <div class="card" style="border-left: 3px solid var(--success);">
          <div style="font-weight: 700; font-size: var(--fs-body); margin-bottom: 4px;">📊 Aturan 50/30/20</div>
          <p style="font-size: var(--fs-caption); color: var(--on-surface-variant); line-height: 1.6;">
            Alokasikan 50% untuk kebutuhan pokok, 30% untuk keinginan, dan 20% untuk tabungan & investasi. 
            Dengan gaji take home pay, pastikan investasi emas tetap konsisten setiap bulan.
          </p>
        </div>

        <div class="card" style="border-left: 3px solid var(--tertiary);">
          <div style="font-weight: 700; font-size: var(--fs-body); margin-bottom: 4px;">🪙 Target Emas</div>
          <p style="font-size: var(--fs-caption); color: var(--on-surface-variant); line-height: 1.6;">
            Dengan menabung emas 0.5 gram/bulan, dalam setahun Anda bisa mengumpulkan 6 gram tambahan.
            Konsistensi adalah kunci investasi emas jangka panjang.
          </p>
        </div>

        <div class="card" style="border-left: 3px solid var(--primary);">
          <div style="font-weight: 700; font-size: var(--fs-body); margin-bottom: 4px;">🏠 Percepat KPR</div>
          <p style="font-size: var(--fs-caption); color: var(--on-surface-variant); line-height: 1.6;">
            Pertimbangkan untuk membayar cicilan KPR lebih besar saat ada dana TPP atau bonus. 
            Setiap Rp 1 juta tambahan bisa memangkas bunga secara signifikan.
          </p>
        </div>
      </div>
    </div>
  `}function He(){const a=new Date,e=c.getState(),n=c.getTransactionsByMonth(a.getFullYear(),a.getMonth()).filter(v=>v.type==="expense"),s=n.reduce((v,y)=>v+y.amount,0),i=e.settings.allowanceBudget||15e5,o=c.getAllowanceSpent(),r=[],d=Math.round(o/i*100);d>=80?r.push({title:"Budget Alert",icon:"warning",color:"#e53935",message:`Pegangan ${e.settings.userName} sudah mencapai ${d}% budget. Sisa ${p(i-o)} untuk bulan ini.`,detail:`Budget: ${p(i)} | Terpakai: ${p(o)}`}):d>=50&&r.push({title:"Pemantauan Budget",icon:"info",color:"#fb8c00",message:`${e.settings.userName}, pegangan sudah terpakai ${d}%. Masih ada ${p(i-o)} untuk sisa bulan ini.`,detail:null});const u=n.filter(v=>v.parent_category==="Transportasi").reduce((v,y)=>v+y.amount,0);u>0&&r.push({title:"Transportasi",icon:"directions_car",color:"#9a6a1a",message:`Total pengeluaran transportasi bulan ini: ${p(u)}. ${u>5e5?"Cukup tinggi, pertimbangkan efisiensi perjalanan LDM.":"Masih terkendali, pertahankan!"}`,detail:null});const l=5e5,m=n.filter(v=>v.sub_category==="Groceries"||v.parent_category==="Makanan & Minuman").reduce((v,y)=>v+y.amount,0);m<l&&m>0&&r.push({title:"Apresiasi! 🎉",icon:"celebration",color:"#43a047",message:`${e.settings.spouseName}, bulan ini pengeluaran makanan & groceries ${p(m,!0)}. Hemat ${p(l-m,!0)} yang bisa dialokasikan ke investasi emas!`,detail:null});const g=n.filter(v=>v.is_together);if(g.length>0){const v=g.reduce((y,f)=>y+f.amount,0);r.push({title:"Quality Time 💕",icon:"favorite",color:"#e91e63",message:`Bulan ini ada ${g.length} transaksi saat Together Mode aktif, total ${p(v)}. Waktu berkualitas bersama keluarga itu priceless!`,detail:null})}const k=n.filter(v=>v.for_whom==="Anak").reduce((v,y)=>v+y.amount,0);return k>0&&r.push({title:"Keperluan Anak",icon:"child_care",color:"#1565c0",message:`Total pengeluaran untuk anak bulan ini: ${p(k)}. Investasi terbaik adalah pendidikan anak.`,detail:null}),r.push({title:"Ringkasan Bulanan",icon:"summarize",color:"#30609d",message:`Total pengeluaran ${L()}: ${p(s)} dari ${n.length} transaksi. Saya terus memantau dan akan memberikan insight yang lebih akurat seiring bertambahnya data.`,detail:null}),r}function qe(){var n;const a=new Date,e=c.getCategorySpending(a.getFullYear(),a.getMonth());if(e.length===0)return'<div style="text-align: center; padding: 20px; color: var(--outline);">Belum ada data</div>';const t=((n=e[0])==null?void 0:n.amount)||1;return`
    <div class="card">
      ${e.map((s,i)=>{const o=Math.round(s.amount/t*100),r=["#30609d","#9a6a1a","#1b6d2f","#ba1a1a","#7b1fa2","#00695c","#e65100","#283593"],d=r[i%r.length];return`
          <div style="margin-bottom: 12px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
              <span style="font-size: 13px; font-weight: 600; color: var(--on-surface);">${s.name}</span>
              <span style="font-size: 13px; font-weight: 700; color: ${d};">${p(s.amount,!0)}</span>
            </div>
            <div style="width: 100%; height: 6px; background: var(--surface-container); border-radius: 3px; overflow: hidden;">
              <div style="width: ${o}%; height: 100%; background: ${d}; border-radius: 3px; transition: width 0.8s ease;"></div>
            </div>
          </div>
        `}).join("")}
    </div>
  `}function Je(){}const Ge=document.getElementById("app"),j={"/":{render:Ae,init:Te},"/transactions":{render:Le,init:Me},"/accounts":{render:ze,init:je},"/assets":{render:Re,init:Ne},"/insights":{render:Fe,init:Je}};function ae(a){const e=j[a]||j["/"];Ge.innerHTML=`
    ${de()}
    ${pe()}
    ${e.render()}
    ${ge()}
    ${he()}
    ${ke()}
  `,le(),ve(),be(),we(),e.init(),me(a),window.scrollTo({top:0,behavior:"instant"})}Object.keys(j).forEach(a=>{P.addRoute(a,ae)});window.addEventListener("data-updated",()=>{const a=P.getCurrentPath();ae(a)});function Ue(){oe(),P.start()}document.addEventListener("DOMContentLoaded",Ue);
