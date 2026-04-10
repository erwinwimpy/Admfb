(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function e(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(s){if(s.ep)return;s.ep=!0;const o=e(s);fetch(s.href,o)}})();class X{constructor(){this.routes={},this.currentRoute=null,window.addEventListener("hashchange",()=>this._onHashChange())}addRoute(t,e){this.routes[t]=e}navigate(t){window.location.hash=t}getCurrentPath(){return window.location.hash.slice(1)||"/"}_onHashChange(){const t=this.getCurrentPath();this._resolve(t)}_resolve(t){const e=this.routes[t]||this.routes["/"];e&&(this.currentRoute=t,e(t))}start(){const t=this.getCurrentPath();this._resolve(t)}}const x=new X,tt=Object.freeze(Object.defineProperty({__proto__:null,default:x,router:x},Symbol.toStringTag,{value:"Module"})),B="cipta_finansial_data",$={family:null,accounts:[],transactions:[],assets:{emas:{bsi_gram:0,tring_gram:0,price_per_gram:165e4},kpr:{total:0,paid:0,monthly:0,bank:"",remaining_months:0},arisan:[]},settings:{togetherMode:!1,allowanceBudget:15e5,userName:"Erwin",spouseName:"Bunda"},categories:[]};class et{constructor(){this._listeners=[],this._state=this._load()}_load(){try{const t=localStorage.getItem(B);if(t){const e=JSON.parse(t);return{...$,...e}}}catch(t){console.warn("Failed to load state",t)}return{...$}}_save(){try{localStorage.setItem(B,JSON.stringify(this._state))}catch(t){console.warn("Failed to save state",t)}this._notify()}_notify(){this._listeners.forEach(t=>t(this._state))}subscribe(t){return this._listeners.push(t),()=>{this._listeners=this._listeners.filter(e=>e!==t)}}getState(){return this._state}setFamily(t){this._state.family=t,this._save()}updateSettings(t){this._state.settings={...this._state.settings,...t},this._save()}toggleTogetherMode(){return this._state.settings.togetherMode=!this._state.settings.togetherMode,this._save(),this._state.settings.togetherMode}addAccount(t){const n=this._state.accounts.reduce((s,o)=>Math.max(s,o.id||0),0)+1;return this._state.accounts.push({id:n,...t}),this._save(),n}updateAccount(t,e){const n=this._state.accounts.findIndex(s=>s.id===t);n!==-1&&(this._state.accounts[n]={...this._state.accounts[n],...e},this._save())}deleteAccount(t){this._state.accounts=this._state.accounts.filter(e=>e.id!==t),this._save()}getAccounts(){return this._state.accounts}getAccountById(t){return this._state.accounts.find(e=>e.id===t)}addTransaction(t){const e=crypto.randomUUID?crypto.randomUUID():Date.now().toString(36)+Math.random().toString(36).substr(2),n={id:e,created_at:new Date().toISOString(),...t};return this._state.transactions.unshift(n),t.type==="income"?this._updateAccountBalance(t.account_id,t.amount):t.type==="expense"?this._updateAccountBalance(t.account_id,-t.amount):t.type==="transfer"&&(this._updateAccountBalance(t.account_id,-t.amount),t.to_account_id&&this._updateAccountBalance(t.to_account_id,t.amount)),this._save(),e}_updateAccountBalance(t,e){const n=this._state.accounts.find(s=>s.id===t);n&&(n.balance=(n.balance||0)+e)}deleteTransaction(t){const e=this._state.transactions.find(n=>n.id===t);e&&(e.type==="income"?this._updateAccountBalance(e.account_id,-e.amount):e.type==="expense"?this._updateAccountBalance(e.account_id,e.amount):e.type==="transfer"&&(this._updateAccountBalance(e.account_id,e.amount),e.to_account_id&&this._updateAccountBalance(e.to_account_id,-e.amount)),this._state.transactions=this._state.transactions.filter(n=>n.id!==t),this._save())}getTransactions(t={}){let e=[...this._state.transactions];if(t.type&&(e=e.filter(n=>n.type===t.type)),t.paid_by&&(e=e.filter(n=>n.paid_by===t.paid_by)),t.for_whom&&(e=e.filter(n=>n.for_whom===t.for_whom)),t.account_id&&(e=e.filter(n=>n.account_id===t.account_id)),t.parent_category&&(e=e.filter(n=>n.parent_category===t.parent_category)),t.month&&(e=e.filter(n=>{const s=new Date(n.created_at);return s.getMonth()===t.month&&s.getFullYear()===(t.year||new Date().getFullYear())})),t.search){const n=t.search.toLowerCase();e=e.filter(s=>(s.description||"").toLowerCase().includes(n)||(s.parent_category||"").toLowerCase().includes(n)||(s.sub_category||"").toLowerCase().includes(n))}return e}getTransactionsByMonth(t,e){return this._state.transactions.filter(n=>{const s=new Date(n.created_at);return s.getFullYear()===t&&s.getMonth()===e})}updateAssets(t){this._state.assets={...this._state.assets,...t},this._save()}updateEmas(t){this._state.assets.emas={...this._state.assets.emas,...t},this._save()}updateKPR(t){this._state.assets.kpr={...this._state.assets.kpr,...t},this._save()}addArisan(t){const e=Date.now();return this._state.assets.arisan.push({id:e,...t}),this._save(),e}getAssets(){return this._state.assets}getTotalBalance(){return this._state.accounts.reduce((t,e)=>t+(e.balance||0),0)}getMonthlyExpenses(t,e){return this.getTransactionsByMonth(t,e).filter(n=>n.type==="expense").reduce((n,s)=>n+s.amount,0)}getMonthlyIncome(t,e){return this.getTransactionsByMonth(t,e).filter(n=>n.type==="income").reduce((n,s)=>n+s.amount,0)}getAllowanceSpent(){const t=new Date;return this.getTransactionsByMonth(t.getFullYear(),t.getMonth()).filter(e=>e.type==="expense"&&e.paid_by==="Suami").reduce((e,n)=>e+n.amount,0)}getDanaPusatBalance(){return this._state.accounts.filter(t=>t.owner_name==="Istri"||t.owner_name==="Bersama").reduce((t,e)=>t+(e.balance||0),0)}getNetWorth(){const t=this.getTotalBalance(),e=this._state.assets.emas,n=(e.bsi_gram+e.tring_gram)*e.price_per_gram,s=this._state.assets.kpr.paid;return t+n+s}getCategorySpending(t,e){const n=this.getTransactionsByMonth(t,e).filter(o=>o.type==="expense"),s={};return n.forEach(o=>{const i=o.parent_category||"Lainnya";s[i]=(s[i]||0)+o.amount}),Object.entries(s).map(([o,i])=>({name:o,amount:i})).sort((o,i)=>i.amount-o.amount)}reset(){this._state=JSON.parse(JSON.stringify($)),localStorage.removeItem(B),this._notify()}}const c=new et,F=4;function at(){const a=c.getState().accounts;a.length>0&&(a.some(u=>u.bank_name==="Dompet Tunai Suami")||c.addAccount({bank_name:"Dompet Tunai Suami",owner_name:"Suami",balance:5e5,is_allowance_account:!0,css_class:"tunai"}),a.some(u=>u.bank_name==="Dompet Tunai Istri")||c.addAccount({bank_name:"Dompet Tunai Istri",owner_name:"Istri",balance:1e6,is_allowance_account:!0,css_class:"tunai"}));const t=localStorage.getItem("cipta_seed_version");if(t&&parseInt(t)>=F&&c.getState().accounts.length>0)return;c.reset(),c.setFamily({id:"family-001",family_name:"Keluarga Erwin",created_at:new Date().toISOString()}),c.updateSettings({userName:"Pak Erwin",spouseName:"Bunda",allowanceBudget:15e5});const e=c.addAccount({bank_name:"BRI",owner_name:"Suami",balance:85e5,is_allowance_account:!1,css_class:"bri"}),n=c.addAccount({bank_name:"Bank Jago",owner_name:"Bersama",balance:32e5,is_allowance_account:!0,css_class:"jago"}),s=c.addAccount({bank_name:"BSI",owner_name:"Istri",balance:12e6,is_allowance_account:!1,css_class:"bsi"});c.addAccount({bank_name:"Dompet Tunai Suami",owner_name:"Suami",balance:5e5,is_allowance_account:!0,css_class:"tunai"}),c.addAccount({bank_name:"Dompet Tunai Istri",owner_name:"Istri",balance:1e6,is_allowance_account:!0,css_class:"tunai"}),c.updateEmas({bsi_gram:15.5,tring_gram:3.2,price_per_gram:165e4}),c.updateKPR({total:25e7,paid:875e5,monthly:21e5,bank:"BTN",remaining_months:96}),c.addArisan({name:"Arisan Kantor Dinas",monthly_amount:2e5,total_members:15,my_turn:8,current_round:3,is_active:!0}),c.addArisan({name:"Arisan Ibu PKK",monthly_amount:15e4,total_members:20,my_turn:14,current_round:5,is_active:!0});const o=new Date,i=o.getFullYear(),r=o.getMonth(),d=[{account_id:e,amount:72e5,type:"income",description:"Gaji Pokok + Tunjangan April",parent_category:"Gaji & Pendapatan",sub_category:"Gaji Pokok",paid_by:"Suami",for_whom:"Bersama",created_at:new Date(i,r,1,8,0).toISOString()},{account_id:e,amount:35e5,type:"income",description:"TPP Bulan April",parent_category:"Gaji & Pendapatan",sub_category:"TPP",paid_by:"Suami",for_whom:"Bersama",created_at:new Date(i,r,5,10,0).toISOString()},{account_id:e,amount:65e5,type:"transfer",description:"Transfer Dana Pusat ke BSI Istri",parent_category:"Transfer",sub_category:"Pindah Buku",paid_by:"Suami",for_whom:"Bersama",to_account_id:s,created_at:new Date(i,r,1,9,0).toISOString()},{account_id:e,amount:15e5,type:"transfer",description:"Pegangan Suami ke Jago",parent_category:"Transfer",sub_category:"Pindah Buku",paid_by:"Suami",for_whom:"Suami",to_account_id:n,created_at:new Date(i,r,1,9,30).toISOString()},{account_id:n,amount:15e4,type:"expense",description:"Bensin Raize Perjalanan LDM",parent_category:"Transportasi",sub_category:"Bensin LDM",paid_by:"Suami",for_whom:"Suami",created_at:new Date(i,r,2,7,30).toISOString()},{account_id:n,amount:35e3,type:"expense",description:"Tol Barru - Makassar",parent_category:"Transportasi",sub_category:"Tol",paid_by:"Suami",for_whom:"Suami",created_at:new Date(i,r,2,8,0).toISOString()},{account_id:n,amount:25e3,type:"expense",description:"Makan Siang Warung Pak Baso",parent_category:"Makanan & Minuman",sub_category:"Makan Harian",paid_by:"Suami",for_whom:"Suami",created_at:new Date(i,r,3,12,0).toISOString()},{account_id:n,amount:15e3,type:"expense",description:"Kopi Kenangan",parent_category:"Makanan & Minuman",sub_category:"Kopi & Minuman",paid_by:"Suami",for_whom:"Suami",created_at:new Date(i,r,3,15,0).toISOString()},{account_id:n,amount:15e4,type:"expense",description:"Bensin Raize Harian",parent_category:"Transportasi",sub_category:"Bensin Harian",paid_by:"Suami",for_whom:"Suami",created_at:new Date(i,r,5,7,0).toISOString()},{account_id:n,amount:2e5,type:"expense",description:"Arisan Kantor Bulan Ini",parent_category:"Sosial & Ibadah",sub_category:"Arisan",paid_by:"Suami",for_whom:"Suami",created_at:new Date(i,r,6,10,0).toISOString()},{account_id:s,amount:35e4,type:"expense",description:"Belanja Bulanan Indomaret",parent_category:"Makanan & Minuman",sub_category:"Groceries",paid_by:"Istri",for_whom:"Bersama",created_at:new Date(i,r,2,10,0).toISOString()},{account_id:s,amount:5e5,type:"expense",description:"SPP TK Aisyah Bulan April",parent_category:"Pendidikan Anak",sub_category:"SPP",paid_by:"Istri",for_whom:"Anak",created_at:new Date(i,r,3,9,0).toISOString()},{account_id:s,amount:18e4,type:"expense",description:"Listrik Rumah B",parent_category:"Rumah Tangga",sub_category:"Listrik",paid_by:"Istri",for_whom:"Bersama",created_at:new Date(i,r,4,11,0).toISOString()},{account_id:s,amount:21e5,type:"expense",description:"Cicilan KPR BTN April",parent_category:"Cicilan",sub_category:"KPR",paid_by:"Istri",for_whom:"Bersama",created_at:new Date(i,r,5,8,0).toISOString()},{account_id:s,amount:15e4,type:"expense",description:"Arisan Ibu PKK",parent_category:"Sosial & Ibadah",sub_category:"Arisan",paid_by:"Istri",for_whom:"Istri",created_at:new Date(i,r,6,14,0).toISOString()},{account_id:s,amount:85e3,type:"expense",description:"Vitamin & Susu Anak",parent_category:"Kesehatan",sub_category:"Vitamin",paid_by:"Istri",for_whom:"Anak",created_at:new Date(i,r,7,10,0).toISOString()},{account_id:n,amount:25e4,type:"expense",description:"Makan Keluarga di Restoran",parent_category:"Hiburan",sub_category:"Quality Time",paid_by:"Suami",for_whom:"Bersama",is_together:!0,created_at:new Date(i,r,7,19,0).toISOString()},{account_id:n,amount:45e3,type:"expense",description:"Es Krim untuk Anak",parent_category:"Makanan & Minuman",sub_category:"Cemilan",paid_by:"Suami",for_whom:"Anak",is_together:!0,created_at:new Date(i,r,7,20,0).toISOString()},{account_id:s,amount:825e3,type:"expense",description:"Beli Emas BSI 0.5 gram",parent_category:"Investasi",sub_category:"Emas BSI",paid_by:"Istri",for_whom:"Bersama",created_at:new Date(i,r,8,9,0).toISOString()}],l=c.getState();d.forEach(u=>{const m=crypto.randomUUID?crypto.randomUUID():Date.now().toString(36)+Math.random().toString(36).substr(2);l.transactions.push({id:m,...u})}),l.transactions.sort((u,m)=>new Date(m.created_at)-new Date(u.created_at)),localStorage.setItem("cipta_finansial_data",JSON.stringify(l)),localStorage.setItem("cipta_seed_version",F.toString())}const nt="modulepreload",st=function(a){return"/Admfb/"+a},q={},E=function(t,e,n){let s=Promise.resolve();if(e&&e.length>0){let i=function(l){return Promise.all(l.map(u=>Promise.resolve(u).then(m=>({status:"fulfilled",value:m}),m=>({status:"rejected",reason:m}))))};document.getElementsByTagName("link");const r=document.querySelector("meta[property=csp-nonce]"),d=(r==null?void 0:r.nonce)||(r==null?void 0:r.getAttribute("nonce"));s=i(e.map(l=>{if(l=st(l),l in q)return;q[l]=!0;const u=l.endsWith(".css"),m=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${m}`))return;const g=document.createElement("link");if(g.rel=u?"stylesheet":nt,u||(g.as="script"),g.crossOrigin="",g.href=l,d&&g.setAttribute("nonce",d),document.head.appendChild(g),u)return new Promise((h,v)=>{g.addEventListener("load",h),g.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${l}`)))})}))}function o(i){const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=i,window.dispatchEvent(r),!r.defaultPrevented)throw i}return s.then(i=>{for(const r of i||[])r.status==="rejected"&&o(r.reason);return t().catch(o)})};function it(){const a=c.getState(),t=a.settings.togetherMode;return`
    <header class="app-header" id="app-header">
      <div class="header-logo">
        <img src="/Admfb/logo.png" alt="Adam Family Budget Logo" class="header-logo-image" style="height: 36px; width: auto; object-fit: contain; margin-right: 8px;">
        <div class="header-logo-text" style="font-size: 18px; line-height: 1.2;">Adam Family<br><span style="font-size: 12px; color: var(--primary);">BUDGET</span></div>
      </div>
      <div class="header-actions">
        <button class="together-toggle ${t?"active":""}" id="together-toggle" aria-label="Together Mode">
          <span class="material-icons-round together-toggle-icon">${t?"favorite":"favorite_border"}</span>
          <span class="together-toggle-label">${t?"Together!":"Together"}</span>
        </button>
        <div class="profile-avatar" id="profile-avatar">
          ${(a.settings.userName||"U").charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  `}function ot(){const a=document.getElementById("together-toggle");a&&a.addEventListener("click",()=>{const e=c.toggleTogetherMode();a.classList.toggle("active",e);const n=a.querySelector(".together-toggle-icon"),s=a.querySelector(".together-toggle-label");n.textContent=e?"favorite":"favorite_border",s.textContent=e?"Together!":"Together",E(async()=>{const{showToast:o}=await Promise.resolve().then(()=>G);return{showToast:o}},void 0).then(({showToast:o})=>{o(e?"💕 Together Mode Aktif!":"Together Mode Nonaktif","info")})});const t=document.getElementById("profile-avatar");t&&t.addEventListener("click",()=>{const n=c.getState().settings.userName||"Erwin",s=n==="Erwin"?"Bunda":"Erwin";confirm(`Ganti sesi dari ${n} ke ${s}?`)&&(c.updateSettings({userName:s}),window.dispatchEvent(new Event("data-updated")),E(async()=>{const{showToast:o}=await Promise.resolve().then(()=>G);return{showToast:o}},void 0).then(({showToast:o})=>{o(`Berhasil login sebagai ${s}`,"success")}))})}const rt=[{path:"/",icon:"dashboard",label:"Beranda"},{path:"/transactions",icon:"receipt_long",label:"Transaksi"},{path:"/accounts",icon:"account_balance_wallet",label:"Rekening"},{path:"/assets",icon:"diamond",label:"Aset"},{path:"/insights",icon:"auto_awesome",label:"AI Insight"}];function ct(){const a=x.getCurrentPath();return`
    <nav class="bottom-nav" id="bottom-nav">
      ${rt.map(t=>`
        <a class="nav-item ${a===t.path?"active":""}"
           href="#${t.path}"
           id="nav-${t.path.replace("/","")||"home"}"
           aria-label="${t.label}">
          <span class="material-icons-round">${t.icon}</span>
          <span>${t.label}</span>
        </a>
      `).join("")}
    </nav>
  `}function dt(a){document.querySelectorAll(".nav-item").forEach(t=>{const e=t.getAttribute("href");t.classList.toggle("active",e===`#${a}`)})}function lt(){return`
    <div class="fab-container" id="fab-container">
      <div class="fab-actions" id="fab-actions">
        <button class="fab-action" id="fab-scan">
          <span class="material-icons-round">photo_camera</span>
          <span>Scan Struk</span>
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
  `}function ut(){var s,o,i,r;const a=document.getElementById("fab-main"),t=document.getElementById("fab-actions");let e=!1;a&&a.addEventListener("click",()=>{e=!e,a.classList.toggle("open",e),t.classList.toggle("open",e)}),document.addEventListener("click",d=>{e&&!d.target.closest("#fab-container")&&(e=!1,a==null||a.classList.remove("open"),t==null||t.classList.remove("open"))}),(s=document.getElementById("fab-expense"))==null||s.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("open-transaction-modal",{detail:{type:"expense"}})),n()}),(o=document.getElementById("fab-income"))==null||o.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("open-transaction-modal",{detail:{type:"income"}})),n()}),(i=document.getElementById("fab-transfer"))==null||i.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("open-transaction-modal",{detail:{type:"transfer"}})),n()}),(r=document.getElementById("fab-scan"))==null||r.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("open-scan-modal")),n()});function n(){e=!1,a==null||a.classList.remove("open"),t==null||t.classList.remove("open")}}const I=[{name:"Makanan & Minuman",icon:"restaurant",subs:["Makan Harian","Makan di Luar","Cemilan","Kopi & Minuman","Groceries"]},{name:"Transportasi",icon:"directions_car",subs:["Bensin LDM","Bensin Harian","Parkir","Tol","Servis Kendaraan","Ojol / Grab"]},{name:"Rumah Tangga",icon:"home",subs:["Listrik","Air PDAM","Internet","Gas LPG","Perabot","Kebersihan"]},{name:"Pendidikan Anak",icon:"school",subs:["SPP","Buku & Alat Tulis","Les/Kursus","Seragam","Uang Jajan"]},{name:"Kesehatan",icon:"local_hospital",subs:["Obat","Dokter","Vitamin","BPJS Tambahan"]},{name:"Pakaian & Fashion",icon:"checkroom",subs:["Pakaian","Sepatu","Aksesoris"]},{name:"Hiburan",icon:"celebration",subs:["Jalan-jalan","Quality Time","Film","Langganan Digital","Hobi"]},{name:"Sosial & Ibadah",icon:"volunteer_activism",subs:["Sedekah","Zakat","Sumbangan","Hajatan","Arisan"]},{name:"Investasi",icon:"trending_up",subs:["Emas BSI","Emas Tring","Tabungan","Deposito"]},{name:"Cicilan",icon:"account_balance",subs:["KPR","Kredit Motor","Pinjaman"]},{name:"Gaji & Pendapatan",icon:"payments",subs:["Gaji Pokok","Tunjangan Kinerja","TPP","Penghasilan Lain","Arisan Masuk"]},{name:"Lainnya",icon:"more_horiz",subs:["Tak Terduga","Donasi","Lain-lain"]}];function pt(a){const t=I.find(e=>e.name===a);return t?t.icon:"receipt_long"}function mt(a){const t=I.find(e=>e.name===a);return t?t.subs:[]}function p(a,t=!1){return t&&Math.abs(a)>=1e6?"Rp "+(a/1e6).toFixed(1).replace(".0","")+" jt":t&&Math.abs(a)>=1e3?"Rp "+(a/1e3).toFixed(0)+" rb":new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",minimumFractionDigits:0,maximumFractionDigits:0}).format(a)}function Y(a,t="long"){const e=new Date(a),n=["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"],s=["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"],o=["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];if(t==="short")return`${e.getDate()} ${n[e.getMonth()]}`;if(t==="long")return`${o[e.getDay()]}, ${e.getDate()} ${s[e.getMonth()]} ${e.getFullYear()}`;if(t==="time")return`${String(e.getHours()).padStart(2,"0")}:${String(e.getMinutes()).padStart(2,"0")}`;if(t==="relative"){const r=new Date-e,d=Math.floor(r/6e4);if(d<1)return"Baru saja";if(d<60)return`${d} menit lalu`;const l=Math.floor(d/60);if(l<24)return`${l} jam lalu`;const u=Math.floor(l/24);return u===1?"Kemarin":u<7?`${u} hari lalu`:`${e.getDate()} ${n[e.getMonth()]}`}if(t==="group"){const i=new Date,r=new Date(i);return r.setDate(r.getDate()-1),e.toDateString()===i.toDateString()?"Hari Ini":e.toDateString()===r.toDateString()?"Kemarin":`${o[e.getDay()]}, ${e.getDate()} ${n[e.getMonth()]}`}return e.toLocaleDateString("id-ID")}function w(){return["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"][new Date().getMonth()]}function W(a){const t={};return a.forEach(e=>{const n=Y(e.created_at,"group");t[n]||(t[n]=[]),t[n].push(e)}),t}function _(a,t="info"){let e=document.querySelector(".toast-container");e||(e=document.createElement("div"),e.className="toast-container",document.body.appendChild(e));const n=document.createElement("div");n.className=`toast toast-${t}`,n.textContent=a,e.appendChild(n),setTimeout(()=>n.remove(),3e3)}function V(a,t=300){let e;return(...n)=>{clearTimeout(e),e=setTimeout(()=>a(...n),t)}}function k(a,t){return t?Math.min(Math.round(a/t*100),100):0}const G=Object.freeze(Object.defineProperty({__proto__:null,debounce:V,formatDate:Y,formatRupiah:p,getCurrentMonthName:w,groupByDate:W,percentage:k,showToast:_},Symbol.toStringTag,{value:"Module"}));function gt(){const a=c.getAccounts(),t=c.getState();return`
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
                ${a.map(e=>`<option value="${e.id}">${e.bank_name}</option>`).join("")}
              </select>
            </div>
            <div class="form-group" id="tx-to-account-group" style="display: none;">
              <label class="form-label">Ke Rekening</label>
              <select class="form-select" id="tx-to-account">
                ${a.map(e=>`<option value="${e.id}">${e.bank_name}</option>`).join("")}
              </select>
            </div>
          </div>

          <!-- Category -->
          <div class="form-row" id="tx-category-row">
            <div class="form-group">
              <label class="form-label">Kategori</label>
              <select class="form-select" id="tx-category">
                <option value="">Pilih Kategori</option>
                ${I.map(e=>`<option value="${e.name}">${e.name}</option>`).join("")}
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
                <button type="button" class="chip ${t.settings.togetherMode?"":"selected"}" data-value="Suami">Suami</button>
                <button type="button" class="chip ${t.settings.togetherMode?"selected":""}" data-value="Istri">Istri</button>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Untuk Siapa</label>
              <div class="chip-group" id="tx-for-whom-chips">
                <button type="button" class="chip" data-value="Suami">Suami</button>
                <button type="button" class="chip" data-value="Istri">Istri</button>
                <button type="button" class="chip" data-value="Anak">Anak</button>
                <button type="button" class="chip ${t.settings.togetherMode?"selected":""}" data-value="Bersama">Bersama</button>
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
  `}function vt(){var e;const a=document.getElementById("tx-modal-backdrop");document.getElementById("tx-modal-sheet");const t=document.getElementById("tx-form");window.addEventListener("open-transaction-modal",n=>{var s;yt(((s=n.detail)==null?void 0:s.type)||"expense")}),a==null||a.addEventListener("click",J),document.querySelectorAll("#tx-type-chips .chip").forEach(n=>{n.addEventListener("click",()=>{document.querySelectorAll("#tx-type-chips .chip").forEach(r=>r.classList.remove("selected")),n.classList.add("selected");const s=n.dataset.type,o=document.getElementById("tx-to-account-group"),i=document.getElementById("tx-category-row");o&&(o.style.display=s==="transfer"?"":"none"),i&&(i.style.display=s==="transfer"?"none":"")})}),document.querySelectorAll("#tx-paid-by-chips .chip").forEach(n=>{n.addEventListener("click",()=>{document.querySelectorAll("#tx-paid-by-chips .chip").forEach(s=>s.classList.remove("selected")),n.classList.add("selected")})}),document.querySelectorAll("#tx-for-whom-chips .chip").forEach(n=>{n.addEventListener("click",()=>{document.querySelectorAll("#tx-for-whom-chips .chip").forEach(s=>s.classList.remove("selected")),n.classList.add("selected")})}),(e=document.getElementById("tx-category"))==null||e.addEventListener("change",n=>{const s=mt(n.target.value),o=document.getElementById("tx-subcategory");o&&(o.innerHTML='<option value="">Pilih Sub-Kategori</option>'+s.map(i=>`<option value="${i}">${i}</option>`).join(""))}),t==null||t.addEventListener("submit",n=>{var S,L,D,z,C,j,R,O,K,N;n.preventDefault();const s=((S=document.querySelector("#tx-type-chips .chip.selected"))==null?void 0:S.dataset.type)||"expense",o=parseFloat(((L=document.getElementById("tx-amount"))==null?void 0:L.value)||0),i=((D=document.getElementById("tx-description"))==null?void 0:D.value)||"",r=parseInt((z=document.getElementById("tx-account"))==null?void 0:z.value),d=s==="transfer"?parseInt((C=document.getElementById("tx-to-account"))==null?void 0:C.value):null,l=((j=document.getElementById("tx-category"))==null?void 0:j.value)||"",u=((R=document.getElementById("tx-subcategory"))==null?void 0:R.value)||"",m=((O=document.querySelector("#tx-paid-by-chips .chip.selected"))==null?void 0:O.dataset.value)||"Suami",g=((K=document.querySelector("#tx-for-whom-chips .chip.selected"))==null?void 0:K.dataset.value)||"Bersama",h=(N=document.getElementById("tx-date"))==null?void 0:N.value,v=h?new Date(h).toISOString():new Date().toISOString(),f=c.getState();if(!o||o<=0){_("Masukkan nominal yang valid","error");return}c.addTransaction({account_id:r,to_account_id:d,amount:o,type:s,description:i,parent_category:s==="transfer"?"Transfer":l,sub_category:s==="transfer"?"Pindah Buku":u,paid_by:m,for_whom:g,is_together:f.settings.togetherMode,created_at:v}),_("✅ Transaksi berhasil disimpan!"),J(),window.dispatchEvent(new CustomEvent("data-updated"))})}function yt(a="expense"){var d;const t=document.getElementById("tx-modal-backdrop"),e=document.getElementById("tx-modal-sheet"),n=document.getElementById("tx-modal-title");(d=document.getElementById("tx-form"))==null||d.reset(),document.getElementById("tx-date").value=new Date().toISOString().slice(0,16),document.querySelectorAll("#tx-type-chips .chip").forEach(l=>{l.classList.toggle("selected",l.dataset.type===a)});const s=document.getElementById("tx-to-account-group"),o=document.getElementById("tx-category-row");s&&(s.style.display=a==="transfer"?"":"none"),o&&(o.style.display=a==="transfer"?"none":""),c.getState().settings.togetherMode&&(document.querySelectorAll("#tx-paid-by-chips .chip").forEach(l=>{l.classList.toggle("selected",l.dataset.value==="Istri")}),document.querySelectorAll("#tx-for-whom-chips .chip").forEach(l=>{l.classList.toggle("selected",l.dataset.value==="Bersama")}));const r={expense:"Tambah Pengeluaran",income:"Tambah Pemasukan",transfer:"Transfer Antar Rekening"};n&&(n.textContent=r[a]||"Tambah Transaksi"),t==null||t.classList.add("open"),e==null||e.classList.add("open")}function J(){var a,t;(a=document.getElementById("tx-modal-backdrop"))==null||a.classList.remove("open"),(t=document.getElementById("tx-modal-sheet"))==null||t.classList.remove("open")}const ht="AIzaSyDqFQw69x7-Bboft5GRDQvc9T5ZrDQ7Szo",ft=`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${ht}`;function bt(){return`
    <div class="modal-backdrop" id="scan-modal-backdrop"></div>
    <div class="modal-sheet" id="scan-modal-sheet">
      <div class="modal-handle"></div>
      <div class="modal-content">
        <h2 class="modal-title">📷 Scan Struk / Slip Gaji</h2>

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

        <!-- AI Result -->
        <div id="scan-result" style="display: none;">
          <div class="ai-bubble">
            <div class="ai-bubble-header">
              <div class="ai-bubble-avatar"><span class="material-icons-round" style="font-size: 16px;">auto_awesome</span></div>
              <span class="ai-bubble-name">Adam Family AI</span>
            </div>
            <div class="ai-bubble-text" id="scan-ai-text">Menganalisis gambar...</div>
          </div>

          <div id="scan-parsed-data" style="display: none;"></div>

          <button class="btn btn-primary btn-block" id="scan-save-btn" style="display: none; margin-top: 12px;">
            <span class="material-icons-round">save</span>
            Simpan Transaksi dari Scan
          </button>
        </div>

        <!-- Loading -->
        <div id="scan-loading" style="display: none; text-align: center; padding: 20px;">
          <div style="width: 40px; height: 40px; border: 3px solid var(--outline-variant); border-top-color: var(--primary); border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto;"></div>
          <p style="color: var(--on-surface-variant); margin-top: 12px; font-weight: 600;">Adam Family AI sedang membaca struk...</p>
        </div>

        <style>
          @keyframes spin { to { transform: rotate(360deg); } }
        </style>
      </div>
    </div>
  `}let y=null;function _t(){var s;const a=document.getElementById("scan-modal-backdrop"),t=document.getElementById("scan-modal-sheet"),e=document.getElementById("scan-upload-area"),n=document.getElementById("scan-file-input");window.addEventListener("open-scan-modal",()=>{a==null||a.classList.add("open"),t==null||t.classList.add("open"),document.getElementById("scan-preview").style.display="none",document.getElementById("scan-result").style.display="none",document.getElementById("scan-loading").style.display="none",document.getElementById("scan-parsed-data").style.display="none",document.getElementById("scan-save-btn").style.display="none",y=null}),a==null||a.addEventListener("click",()=>{a==null||a.classList.remove("open"),t==null||t.classList.remove("open")}),e==null||e.addEventListener("click",()=>n==null?void 0:n.click()),n==null||n.addEventListener("change",async o=>{var d;const i=(d=o.target.files)==null?void 0:d[0];if(!i)return;const r=new FileReader;r.onload=async l=>{const u=l.target.result;document.getElementById("scan-preview-img").src=u,document.getElementById("scan-preview").style.display="block",document.getElementById("scan-loading").style.display="block",document.getElementById("scan-result").style.display="none";try{await kt(u.split(",")[1],i.type)}catch(m){console.error("AI Error:",m),document.getElementById("scan-loading").style.display="none",document.getElementById("scan-result").style.display="block",document.getElementById("scan-ai-text").textContent="❌ Gagal menganalisis gambar. Silakan coba lagi atau input manual."}},r.readAsDataURL(i)}),(s=document.getElementById("scan-save-btn"))==null||s.addEventListener("click",()=>{var r;if(!y)return;const i=(r=c.getAccounts()[0])==null?void 0:r.id;c.addTransaction({account_id:i,amount:y.amount||0,type:y.type||"expense",description:y.description||"Transaksi dari Scan",parent_category:y.category||"Lainnya",sub_category:y.sub_category||"",paid_by:c.getState().settings.togetherMode?"Istri":"Suami",for_whom:c.getState().settings.togetherMode?"Bersama":"Suami",is_together:c.getState().settings.togetherMode,created_at:y.date?new Date(y.date).toISOString():new Date().toISOString()}),_("✅ Transaksi dari scan berhasil disimpan!"),a==null||a.classList.remove("open"),t==null||t.classList.remove("open"),window.dispatchEvent(new CustomEvent("data-updated"))})}async function kt(a,t){var r,d,l,u,m,g;const n=`Analisis gambar struk/nota/slip gaji berikut. Ekstrak informasi keuangan dan kembalikan dalam format JSON SAJA (tanpa markdown):
{
  "type": "expense" atau "income",
  "amount": angka total (tanpa titik/koma pemisah ribuan),
  "description": deskripsi singkat transaksi,
  "merchant": nama toko/merchant jika ada,
  "date": tanggal transaksi format YYYY-MM-DD jika terlihat,
  "category": salah satu dari [${I.map(h=>h.name).join(", ")}],
  "sub_category": sub kategori yang sesuai,
  "items": [{"name": "nama item", "price": harga}] jika ada rincian,
  "summary": ringkasan dalam bahasa Indonesia (1-2 kalimat)
}

Jika ini slip gaji PNS, ekstrak: Gaji Pokok, Tunjangan, Potongan, dan Total Take Home Pay. Set type ke "income" dan amount ke take home pay.`,i=((m=(u=(l=(d=(r=(await(await fetch(ft,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{parts:[{text:n},{inline_data:{mime_type:t||"image/jpeg",data:a}}]}],generationConfig:{temperature:.1,maxOutputTokens:1024}})})).json()).candidates)==null?void 0:r[0])==null?void 0:d.content)==null?void 0:l.parts)==null?void 0:u[0])==null?void 0:m.text)||"";document.getElementById("scan-loading").style.display="none",document.getElementById("scan-result").style.display="block";try{const h=i.match(/\{[\s\S]*\}/);if(h){y=JSON.parse(h[0]),document.getElementById("scan-ai-text").innerHTML=`
        <strong>✅ Berhasil!</strong><br/>
        ${y.summary||"Data berhasil diekstrak dari gambar."}
      `;const v=document.getElementById("scan-parsed-data");v.style.display="block",v.innerHTML=`
        <div style="background: var(--surface-container); border-radius: var(--radius-md); padding: 12px; margin-top: 12px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="font-weight: 600; color: var(--on-surface-variant);">${y.type==="income"?"💰 Pemasukan":"💸 Pengeluaran"}</span>
            <span style="font-weight: 800; color: ${y.type==="income"?"var(--success)":"var(--error)"};">${p(y.amount||0)}</span>
          </div>
          <div style="font-size: 13px; color: var(--on-surface-variant);">
            <p>📝 ${y.description||"-"}</p>
            ${y.merchant?`<p>🏪 ${y.merchant}</p>`:""}
            <p>📂 ${y.category||"-"} → ${y.sub_category||"-"}</p>
            ${y.date?`<p>📅 ${y.date}</p>`:""}
          </div>
          ${(g=y.items)!=null&&g.length?`
            <div style="margin-top: 8px; border-top: 1px solid var(--outline-variant); padding-top: 8px;">
              <p style="font-weight: 600; font-size: 12px; margin-bottom: 4px;">Rincian:</p>
              ${y.items.map(f=>`
                <div style="display: flex; justify-content: space-between; font-size: 12px; color: var(--on-surface-variant); padding: 2px 0;">
                  <span>${f.name}</span>
                  <span>${p(f.price)}</span>
                </div>
              `).join("")}
            </div>
          `:""}
        </div>
      `,document.getElementById("scan-save-btn").style.display="flex"}else document.getElementById("scan-ai-text").textContent=i||"Tidak dapat mengekstrak data dari gambar ini."}catch{document.getElementById("scan-ai-text").textContent=i||"Gagal memproses respons AI."}}function xt(){const a=c.getState(),t=new Date,e=a.settings.allowanceBudget||15e5,n=c.getAllowanceSpent(),s=Math.max(0,e-n),o=k(n,e),i=c.getDanaPusatBalance(),r=c.getMonthlyExpenses(t.getFullYear(),t.getMonth()),d=c.getMonthlyIncome(t.getFullYear(),t.getMonth());return`
    <div class="bento-grid stagger-children">
      <!-- Pegangan Suami -->
      <div class="card card-gradient" id="card-allowance">
        <div class="card-title">💰 Pegangan ${a.settings.userName||"Suami"}</div>
        <div class="card-value">${p(s)}</div>
        <div class="card-subtitle">Terpakai ${p(n)} dari ${p(e)}</div>
        <div style="margin-top: 12px;">
          <div class="progress-bar" style="height: 6px; background: rgba(255,255,255,0.2);">
            <div class="progress-bar-fill ${o>80?"red":"blue"}"
                 style="width: ${o}%; background: ${o>80?"linear-gradient(90deg, #ffab91, #ff5722)":"rgba(255,255,255,0.8)"};"></div>
          </div>
        </div>
      </div>

      <!-- Dana Pusat -->
      <div class="card card-gradient-gold" id="card-dana-pusat">
        <div class="card-title">🏦 Dana Pusat</div>
        <div class="card-value">${p(i)}</div>
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
          <div class="card-title" style="margin-bottom: 0;">Arus Kas ${w()}</div>
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
  `}function wt(a){const t=a.toLowerCase();return t.includes("bri")?"bri":t.includes("jago")?"jago":t.includes("bsi")?"bsi":"default"}function St(a){const t=a.toLowerCase();return t.includes("bri")?"BRI":t.includes("jago")?"JGO":t.includes("bsi")?"BSI":a.slice(0,3).toUpperCase()}function Et(){return`
    <div class="section-header">
      <h2 class="section-title">Rekening Bank</h2>
      <span class="section-action" id="btn-manage-accounts">Kelola</span>
    </div>
    <div class="bank-slider" id="bank-slider">
      ${c.getAccounts().map(t=>{const e=wt(t.bank_name);return`
          <div class="bank-card ${e}" data-account-id="${t.id}">
            <div class="bank-card-icon ${e}">${St(t.bank_name)}</div>
            <div class="bank-card-name">${t.bank_name}</div>
            <div class="bank-card-owner">${t.owner_name}</div>
            <div class="bank-card-balance">${p(t.balance)}</div>
          </div>
        `}).join("")}
      <div class="bank-card-add" id="btn-add-account">
        <span class="material-icons-round">add</span>
        <span>Tambah</span>
      </div>
    </div>
  `}function It(){const a=document.getElementById("btn-add-account");a&&a.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("open-account-modal"))});const t=document.getElementById("btn-manage-accounts");t&&t.addEventListener("click",()=>{E(async()=>{const{default:e}=await Promise.resolve().then(()=>tt);return{default:e}},void 0).then(({default:e})=>e.navigate("/accounts"))})}function Bt(){const a=c.getState(),t=new Date,e=c.getTransactionsByMonth(t.getFullYear(),t.getMonth()),n=a.assets.kpr,s=k(n.paid,n.total),o=6e5,i=e.filter(m=>m.type==="expense"&&m.parent_category==="Transportasi").reduce((m,g)=>m+g.amount,0),r=k(i,o),d=8e5,l=e.filter(m=>m.type==="expense"&&m.for_whom==="Anak").reduce((m,g)=>m+g.amount,0),u=k(l,d);return`
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
          <span>Terpakai: ${p(i,!0)}</span>
          <span>Budget: ${p(o,!0)}</span>
        </div>
      </div>

      <!-- Keperluan Anak -->
      <div class="analysis-card">
        <div class="analysis-card-header">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="material-icons-round" style="color: var(--success); font-size: 20px;">child_care</span>
            <span class="analysis-card-label">Keperluan Anak</span>
          </div>
          <span class="analysis-card-value" style="color: var(--success);">${u}%</span>
        </div>
        <div class="progress-bar">
          <div class="progress-bar-fill green" style="width: ${u}%;"></div>
        </div>
        <div class="analysis-card-detail">
          <span>Terpakai: ${p(l,!0)}</span>
          <span>Budget: ${p(d,!0)}</span>
        </div>
      </div>
    </div>
  `}function P(a=10,t={}){let e=c.getTransactions(t);const n=e.length;if(a&&(e=e.slice(0,a)),e.length===0)return`
      <div class="empty-state">
        <span class="material-icons-round">receipt_long</span>
        <h3>Belum Ada Transaksi</h3>
        <p>Mulai catat pengeluaran dan pemasukan Anda</p>
      </div>
    `;const s=W(e);let o="";return Object.entries(s).forEach(([i,r])=>{o+=`<div class="transaction-group-header">${i}</div>`,r.forEach(d=>{const l=pt(d.parent_category),u=d.type,m=d.type==="expense"?"-":d.type==="income"?"+":"↔",g=c.getAccountById(d.account_id),h=g?g.bank_name:"";o+=`
        <div class="transaction-item" data-tx-id="${d.id}">
          <div class="transaction-icon ${u}">
            <span class="material-icons-round">${l}</span>
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
            <div class="transaction-amount-value ${u}">${m} ${p(d.amount)}</div>
            <div class="transaction-amount-account">${h}</div>
          </div>
        </div>
      `})}),a&&n>a&&(o+=`
      <div style="text-align: center; padding: 16px 0;">
        <a href="#/transactions" class="section-action">Lihat Semua (${n} transaksi) →</a>
      </div>
    `),o}function M(){document.querySelectorAll(".transaction-item").forEach(a=>{a.addEventListener("click",()=>{const t=a.dataset.txId;window.dispatchEvent(new CustomEvent("view-transaction",{detail:{id:t}}))})})}function $t(){const a=c.getState();return`
    <div class="page-container animate-fade-in" id="dashboard-page">
      <!-- Greeting -->
      <div style="margin-bottom: 20px;">
        <h1 style="font-size: 1.5rem; font-weight: 800; color: var(--on-surface); letter-spacing: -0.5px;">
          ${Tt()}, ${a.settings.userName||"User"} 👋
        </h1>
        <p style="font-size: var(--fs-body); color: var(--on-surface-variant); margin-top: 4px;">
          Berikut ringkasan keuangan keluarga bulan ${w()}
        </p>
      </div>

      <!-- Summary Cards -->
      ${xt()}

      <!-- Bank Slider -->
      ${Et()}

      <!-- Analysis -->
      ${Bt()}

      <!-- Recent Transactions -->
      <div class="section-header">
        <h2 class="section-title">Transaksi Terbaru</h2>
        <a href="#/transactions" class="section-action">Lihat Semua</a>
      </div>
      <div id="recent-transactions">
        ${P(8)}
      </div>
    </div>
  `}function At(){It(),M()}function Tt(){const a=new Date().getHours();return a<11?"Selamat Pagi":a<15?"Selamat Siang":a<18?"Selamat Sore":"Selamat Malam"}let b={};function Pt(){const a=new Date,t=c.getMonthlyExpenses(a.getFullYear(),a.getMonth()),e=c.getMonthlyIncome(a.getFullYear(),a.getMonth()),n=e-t;return`
    <div class="page-container animate-fade-in" id="transactions-page">
      <h1 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 4px;">Transaksi</h1>
      <p style="color: var(--on-surface-variant); font-size: var(--fs-body); margin-bottom: 16px;">
        Riwayat keuangan bulan ${w()}
      </p>

      <!-- Monthly Summary Bar -->
      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; margin-bottom: 20px;">
        <div style="background: var(--success-container); border-radius: var(--radius-md); padding: 12px; text-align: center;">
          <div style="font-size: 11px; font-weight: 600; color: var(--success);">Pemasukan</div>
          <div style="font-size: 14px; font-weight: 800; color: var(--success); margin-top: 4px;">${p(e,!0)}</div>
        </div>
        <div style="background: var(--error-container); border-radius: var(--radius-md); padding: 12px; text-align: center;">
          <div style="font-size: 11px; font-weight: 600; color: var(--error);">Pengeluaran</div>
          <div style="font-size: 14px; font-weight: 800; color: var(--error); margin-top: 4px;">${p(t,!0)}</div>
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
        ${P(null,b)}
      </div>
    </div>
  `}function Mt(){M(),document.querySelectorAll("#tx-filters .chip").forEach(t=>{t.addEventListener("click",()=>{document.querySelectorAll("#tx-filters .chip").forEach(n=>n.classList.remove("selected")),t.classList.add("selected");const e=t.dataset.filter;e==="all"?delete b.type:b.type=e,A()})}),document.querySelectorAll("#tx-paid-filter .chip").forEach(t=>{t.addEventListener("click",()=>{document.querySelectorAll("#tx-paid-filter .chip").forEach(n=>n.classList.remove("selected")),t.classList.add("selected");const e=t.dataset.paid;e==="all"?delete b.paid_by:b.paid_by=e,A()})});const a=document.getElementById("tx-search");a&&a.addEventListener("input",V(t=>{const e=t.target.value.trim();e?b.search=e:delete b.search,A()},300)),Lt()}function A(){const a=document.getElementById("filtered-transactions");a&&(a.innerHTML=P(null,b),M())}async function Lt(){const a=document.getElementById("category-chart");if(a)try{const t=await E(()=>import("./auto-eE5P6S0m.js"),[]),e=t.default||t.Chart,n=new Date,s=c.getCategorySpending(n.getFullYear(),n.getMonth());if(s.length===0){a.parentElement.innerHTML=`
        <div style="text-align: center; padding: 20px; color: var(--outline);">
          <span class="material-icons-round" style="font-size: 32px;">pie_chart</span>
          <p style="margin-top: 8px;">Belum ada data pengeluaran bulan ini</p>
        </div>
      `;return}const o=["#30609d","#9a6a1a","#1b6d2f","#ba1a1a","#7b1fa2","#00695c","#e65100","#283593","#4e342e","#546e7a","#ad1457","#00838f"];new e(a,{type:"doughnut",data:{labels:s.map(i=>i.name),datasets:[{data:s.map(i=>i.amount),backgroundColor:o.slice(0,s.length),borderWidth:2,borderColor:"#fff",hoverOffset:6}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"65%",plugins:{legend:{position:"bottom",labels:{padding:12,usePointStyle:!0,pointStyleWidth:8,font:{family:"'Plus Jakarta Sans'",size:11,weight:"600"}}},tooltip:{callbacks:{label:i=>{const r=i.dataset.data.reduce((l,u)=>l+u,0),d=Math.round(i.parsed/r*100);return` ${i.label}: ${p(i.parsed)} (${d}%)`}},titleFont:{family:"'Plus Jakarta Sans'"},bodyFont:{family:"'Plus Jakarta Sans'"}}}}})}catch(t){console.warn("Chart.js not loaded:",t)}}function Dt(){const a=c.getAccounts(),t=c.getTotalBalance();return`
    <div class="page-container animate-fade-in" id="accounts-page">
      <h1 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 4px;">Rekening Bank</h1>
      <p style="color: var(--on-surface-variant); font-size: var(--fs-body); margin-bottom: 20px;">
        Kelola seluruh rekening keluarga
      </p>

      <!-- Total Balance -->
      <div class="net-worth-card" style="margin-bottom: 20px;">
        <div class="net-worth-label">Total Seluruh Saldo</div>
        <div class="net-worth-value">${p(t)}</div>
        <div style="font-size: 13px; opacity: 0.7;">${a.length} rekening terdaftar</div>
      </div>

      <!-- Account Cards -->
      <div style="display: flex; flex-direction: column; gap: 12px;" class="stagger-children" id="account-list">
        ${a.map(e=>zt(e)).join("")}
      </div>

      <!-- Add Account Button -->
      <button class="btn btn-secondary btn-block" style="margin-top: 20px;" id="btn-add-new-account">
        <span class="material-icons-round">add</span>
        Tambah Rekening Baru
      </button>

      <!-- Account Add/Edit Modal -->
      ${Ct()}
    </div>
  `}function zt(a){const t=Q(a.bank_name);return`
    <div class="card" style="display: flex; align-items: center; gap: 16px; cursor: pointer;" data-acc-id="${a.id}">
      <div class="bank-card-icon ${t}" style="flex-shrink: 0;">${Rt(a.bank_name)}</div>
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
  `}function Ct(){return`
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
  `}function jt(){var e;const a=document.getElementById("btn-add-new-account"),t=document.getElementById("acc-modal-backdrop");document.getElementById("acc-modal-sheet"),a==null||a.addEventListener("click",()=>H()),window.addEventListener("open-account-modal",()=>H()),t==null||t.addEventListener("click",()=>U()),document.querySelectorAll("#acc-owner-chips .chip").forEach(n=>{n.addEventListener("click",()=>{document.querySelectorAll("#acc-owner-chips .chip").forEach(s=>s.classList.remove("selected")),n.classList.add("selected")})}),(e=document.getElementById("acc-form"))==null||e.addEventListener("submit",n=>{var d,l,u,m,g;n.preventDefault();const s=(l=(d=document.getElementById("acc-bank-name"))==null?void 0:d.value)==null?void 0:l.trim(),o=((u=document.querySelector("#acc-owner-chips .chip.selected"))==null?void 0:u.dataset.value)||"Suami",i=parseFloat(((m=document.getElementById("acc-balance"))==null?void 0:m.value)||0),r=((g=document.getElementById("acc-is-allowance"))==null?void 0:g.checked)||!1;if(!s){_("Masukkan nama bank","error");return}c.addAccount({bank_name:s,owner_name:o,balance:i,is_allowance_account:r,css_class:Q(s).replace("bank-card-icon ","")}),_("✅ Rekening berhasil ditambahkan!"),U(),window.dispatchEvent(new CustomEvent("data-updated"))}),document.querySelectorAll(".btn-delete-account").forEach(n=>{n.addEventListener("click",s=>{s.stopPropagation();const o=parseInt(n.dataset.accId);confirm("Hapus rekening ini?")&&(c.deleteAccount(o),_("Rekening dihapus"),window.dispatchEvent(new CustomEvent("data-updated")))})})}function H(){var a,t,e;(a=document.getElementById("acc-form"))==null||a.reset(),(t=document.getElementById("acc-modal-backdrop"))==null||t.classList.add("open"),(e=document.getElementById("acc-modal-sheet"))==null||e.classList.add("open")}function U(){var a,t;(a=document.getElementById("acc-modal-backdrop"))==null||a.classList.remove("open"),(t=document.getElementById("acc-modal-sheet"))==null||t.classList.remove("open")}function Q(a){const t=a.toLowerCase();return t.includes("bri")?"bri":t.includes("jago")?"jago":t.includes("bsi")?"bsi":t.includes("tunai")||t.includes("cash")?"tunai":"default"}function Rt(a){const t=a.toLowerCase();return t.includes("bri")?"BRI":t.includes("jago")?"JGO":t.includes("bsi")?"BSI":t.includes("tunai")||t.includes("cash")?"CSH":a.slice(0,3).toUpperCase()}function Ot(){const a=c.getAssets(),t=c.getNetWorth(),e=c.getTotalBalance(),n=a.emas,s=n.bsi_gram+n.tring_gram,o=s*n.price_per_gram,i=a.kpr,r=k(i.paid,i.total),d=i.total-i.paid,l=a.arisan||[];return`
    <div class="page-container animate-fade-in" id="assets-page">
      <h1 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 4px;">Aset & Kekayaan</h1>
      <p style="color: var(--on-surface-variant); font-size: var(--fs-body); margin-bottom: 20px;">
        Pantau kekayaan bersih keluarga secara real-time
      </p>

      <!-- Net Worth Card -->
      <div class="net-worth-card" style="margin-bottom: 24px;">
        <div class="net-worth-label">Kekayaan Bersih (Net Worth)</div>
        <div class="net-worth-value">${p(t)}</div>
        <div class="net-worth-change up">
          <span class="material-icons-round" style="font-size: 14px;">trending_up</span>
          <span>Termasuk aset emas & ekuitas KPR</span>
        </div>

        <!-- Breakdown mini -->
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; margin-top: 16px; position: relative; z-index: 1;">
          <div style="text-align: center;">
            <div style="font-size: 11px; opacity: 0.6;">💰 Bank</div>
            <div style="font-size: 13px; font-weight: 700;">${p(e,!0)}</div>
          </div>
          <div style="text-align: center;">
            <div style="font-size: 11px; opacity: 0.6;">🪙 Emas</div>
            <div style="font-size: 13px; font-weight: 700;">${p(o,!0)}</div>
          </div>
          <div style="text-align: center;">
            <div style="font-size: 11px; opacity: 0.6;">🏠 KPR Equity</div>
            <div style="font-size: 13px; font-weight: 700;">${p(i.paid,!0)}</div>
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
            <div style="font-size: 1.25rem; font-weight: 800; color: var(--tertiary);">${p(o)}</div>
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
            <div class="asset-card-title">KPR ${i.bank||"BTN"}</div>
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
            <div style="font-size: 14px; font-weight: 800; color: var(--success); margin-top: 4px;">${p(i.paid,!0)}</div>
          </div>
          <div style="background: var(--surface-container); border-radius: var(--radius-md); padding: 12px;">
            <div style="font-size: 11px; color: var(--on-surface-variant); font-weight: 600;">Sisa Hutang</div>
            <div style="font-size: 14px; font-weight: 800; color: var(--error); margin-top: 4px;">${p(d,!0)}</div>
          </div>
          <div style="background: var(--surface-container); border-radius: var(--radius-md); padding: 12px;">
            <div style="font-size: 11px; color: var(--on-surface-variant); font-weight: 600;">Cicilan/bulan</div>
            <div style="font-size: 14px; font-weight: 800; color: var(--on-surface); margin-top: 4px;">${p(i.monthly,!0)}</div>
          </div>
          <div style="background: var(--surface-container); border-radius: var(--radius-md); padding: 12px;">
            <div style="font-size: 11px; color: var(--on-surface-variant); font-weight: 600;">Sisa Tenor</div>
            <div style="font-size: 14px; font-weight: 800; color: var(--on-surface); margin-top: 4px;">${i.remaining_months} bulan</div>
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
            <div class="asset-card-subtitle">${l.length} kelompok arisan aktif</div>
          </div>
        </div>

        ${l.length===0?`
          <div style="text-align: center; padding: 20px; color: var(--outline);">
            Belum ada data arisan
          </div>
        `:l.map(u=>`
          <div style="background: var(--surface-container); border-radius: var(--radius-md); padding: 12px; margin-bottom: 8px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <div style="font-weight: 700; font-size: var(--fs-body);">${u.name}</div>
              <span class="badge" style="background: ${u.is_active?"var(--success-container)":"var(--surface-container-high)"}; color: ${u.is_active?"var(--success)":"var(--outline)"};">
                ${u.is_active?"Aktif":"Selesai"}
              </span>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; font-size: 12px;">
              <div>
                <div style="color: var(--on-surface-variant);">Iuran</div>
                <div style="font-weight: 700;">${p(u.monthly_amount,!0)}</div>
              </div>
              <div>
                <div style="color: var(--on-surface-variant);">Giliran Saya</div>
                <div style="font-weight: 700;">Ke-${u.my_turn}</div>
              </div>
              <div>
                <div style="color: var(--on-surface-variant);">Putaran</div>
                <div style="font-weight: 700;">${u.current_round}/${u.total_members}</div>
              </div>
            </div>
            <div style="margin-top: 8px;">
              <div class="progress-bar" style="height: 4px;">
                <div class="progress-bar-fill blue" style="width: ${k(u.current_round,u.total_members)}%;"></div>
              </div>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `}function Kt(){}function Nt(){c.getState();const a=new Date,t=Ft();return`
    <div class="page-container animate-fade-in" id="insights-page">
      <h1 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 4px;">
        <span class="material-icons-round" style="vertical-align: middle; color: var(--primary); font-size: 28px;">auto_awesome</span>
        AI Insight
      </h1>
      <p style="color: var(--on-surface-variant); font-size: var(--fs-body); margin-bottom: 20px;">
        Analisis keuangan cerdas untuk ${w()} ${a.getFullYear()}
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
        ${t.map(e=>`
          <div class="ai-bubble" style="border-left: 3px solid ${e.color};">
            <div class="ai-bubble-header">
              <div class="ai-bubble-avatar" style="background: ${e.color};">
                <span class="material-icons-round" style="font-size: 14px;">${e.icon}</span>
              </div>
              <span class="ai-bubble-name">${e.title}</span>
            </div>
            <div class="ai-bubble-text">${e.message}</div>
            ${e.detail?`
              <div style="margin-top: 8px; padding: 8px 12px; background: rgba(0,0,0,0.04); border-radius: var(--radius-sm); font-size: 12px; color: var(--on-surface-variant);">
                ${e.detail}
              </div>
            `:""}
          </div>
        `).join("")}
      </div>

      <!-- Spending Patterns -->
      <div class="section-header" style="margin-top: 24px;">
        <h2 class="section-title">Pola Pengeluaran</h2>
      </div>

      ${qt()}

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
  `}function Ft(){const a=new Date,t=c.getState(),n=c.getTransactionsByMonth(a.getFullYear(),a.getMonth()).filter(v=>v.type==="expense"),s=n.reduce((v,f)=>v+f.amount,0),o=t.settings.allowanceBudget||15e5,i=c.getAllowanceSpent(),r=[],d=Math.round(i/o*100);d>=80?r.push({title:"Budget Alert",icon:"warning",color:"#e53935",message:`Pegangan ${t.settings.userName} sudah mencapai ${d}% budget. Sisa ${p(o-i)} untuk bulan ini.`,detail:`Budget: ${p(o)} | Terpakai: ${p(i)}`}):d>=50&&r.push({title:"Pemantauan Budget",icon:"info",color:"#fb8c00",message:`${t.settings.userName}, pegangan sudah terpakai ${d}%. Masih ada ${p(o-i)} untuk sisa bulan ini.`,detail:null});const l=n.filter(v=>v.parent_category==="Transportasi").reduce((v,f)=>v+f.amount,0);l>0&&r.push({title:"Transportasi",icon:"directions_car",color:"#9a6a1a",message:`Total pengeluaran transportasi bulan ini: ${p(l)}. ${l>5e5?"Cukup tinggi, pertimbangkan efisiensi perjalanan LDM.":"Masih terkendali, pertahankan!"}`,detail:null});const u=5e5,m=n.filter(v=>v.sub_category==="Groceries"||v.parent_category==="Makanan & Minuman").reduce((v,f)=>v+f.amount,0);m<u&&m>0&&r.push({title:"Apresiasi! 🎉",icon:"celebration",color:"#43a047",message:`${t.settings.spouseName}, bulan ini pengeluaran makanan & groceries ${p(m,!0)}. Hemat ${p(u-m,!0)} yang bisa dialokasikan ke investasi emas!`,detail:null});const g=n.filter(v=>v.is_together);if(g.length>0){const v=g.reduce((f,S)=>f+S.amount,0);r.push({title:"Quality Time 💕",icon:"favorite",color:"#e91e63",message:`Bulan ini ada ${g.length} transaksi saat Together Mode aktif, total ${p(v)}. Waktu berkualitas bersama keluarga itu priceless!`,detail:null})}const h=n.filter(v=>v.for_whom==="Anak").reduce((v,f)=>v+f.amount,0);return h>0&&r.push({title:"Keperluan Anak",icon:"child_care",color:"#1565c0",message:`Total pengeluaran untuk anak bulan ini: ${p(h)}. Investasi terbaik adalah pendidikan anak.`,detail:null}),r.push({title:"Ringkasan Bulanan",icon:"summarize",color:"#30609d",message:`Total pengeluaran ${w()}: ${p(s)} dari ${n.length} transaksi. Saya terus memantau dan akan memberikan insight yang lebih akurat seiring bertambahnya data.`,detail:null}),r}function qt(){var n;const a=new Date,t=c.getCategorySpending(a.getFullYear(),a.getMonth());if(t.length===0)return'<div style="text-align: center; padding: 20px; color: var(--outline);">Belum ada data</div>';const e=((n=t[0])==null?void 0:n.amount)||1;return`
    <div class="card">
      ${t.map((s,o)=>{const i=Math.round(s.amount/e*100),r=["#30609d","#9a6a1a","#1b6d2f","#ba1a1a","#7b1fa2","#00695c","#e65100","#283593"],d=r[o%r.length];return`
          <div style="margin-bottom: 12px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
              <span style="font-size: 13px; font-weight: 600; color: var(--on-surface);">${s.name}</span>
              <span style="font-size: 13px; font-weight: 700; color: ${d};">${p(s.amount,!0)}</span>
            </div>
            <div style="width: 100%; height: 6px; background: var(--surface-container); border-radius: 3px; overflow: hidden;">
              <div style="width: ${i}%; height: 100%; background: ${d}; border-radius: 3px; transition: width 0.8s ease;"></div>
            </div>
          </div>
        `}).join("")}
    </div>
  `}function Gt(){}const Jt=document.getElementById("app"),T={"/":{render:$t,init:At},"/transactions":{render:Pt,init:Mt},"/accounts":{render:Dt,init:jt},"/assets":{render:Ot,init:Kt},"/insights":{render:Nt,init:Gt}};function Z(a){const t=T[a]||T["/"];Jt.innerHTML=`
    ${it()}
    ${ct()}
    ${t.render()}
    ${lt()}
    ${gt()}
    ${bt()}
  `,ot(),ut(),vt(),_t(),t.init(),dt(a),window.scrollTo({top:0,behavior:"instant"})}Object.keys(T).forEach(a=>{x.addRoute(a,Z)});window.addEventListener("data-updated",()=>{const a=x.getCurrentPath();Z(a)});function Ht(){at(),x.start()}document.addEventListener("DOMContentLoaded",Ht);
