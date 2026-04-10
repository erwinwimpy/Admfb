(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();class se{constructor(){this.routes={},this.currentRoute=null,window.addEventListener("hashchange",()=>this._onHashChange())}addRoute(e,t){this.routes[e]=t}navigate(e){window.location.hash=e}getCurrentPath(){return window.location.hash.slice(1)||"/"}_onHashChange(){const e=this.getCurrentPath();this._resolve(e)}_resolve(e){const t=this.routes[e]||this.routes["/"];t&&(this.currentRoute=e,t(e))}start(){const e=this.getCurrentPath();this._resolve(e)}}const M=new se,ie=Object.freeze(Object.defineProperty({__proto__:null,default:M,router:M},Symbol.toStringTag,{value:"Module"})),j="cipta_finansial_data",R={family:null,accounts:[],transactions:[],settings:{togetherMode:!1,allowanceBudget:15e5,transportBudget:6e5,anakBudget:8e5,userName:"Erwin",spouseName:"Nihad",geminiApiKey:""},budgetRules:{needs:["Rumah Tangga","Transportasi","Pendidikan Anak","Kesehatan","Cicilan"],wants:["Hiburan","Pakaian & Fashion","Makanan & Minuman"],savings:["Investasi","Sosial & Ibadah"]},assets:{emas:{bsi_gram:0,tring_gram:0,price_per_gram:165e4},kpr:{total:0,paid:0,monthly:0,bank:"",remaining_months:0},arisan:[],custom:[]},categories:[]};class oe{constructor(){this._listeners=[],this._state=this._load()}_load(){try{const e=localStorage.getItem(j);if(e){const t=JSON.parse(e);return{...R,...t}}}catch(e){console.warn("Failed to load state",e)}return{...R}}_save(){try{localStorage.setItem(j,JSON.stringify(this._state))}catch(e){console.warn("Failed to save state",e)}this._notify()}_notify(){this._listeners.forEach(e=>e(this._state))}subscribe(e){return this._listeners.push(e),()=>{this._listeners=this._listeners.filter(t=>t!==e)}}getState(){return this._state}setFamily(e){this._state.family=e,this._save()}updateSettings(e){this._state.settings={...this._state.settings,...e},this._save()}toggleTogetherMode(){return this._state.settings.togetherMode=!this._state.settings.togetherMode,this._save(),this._state.settings.togetherMode}addAccount(e){const n=this._state.accounts.reduce((s,i)=>Math.max(s,i.id||0),0)+1;return this._state.accounts.push({id:n,...e}),this._save(),n}updateAccount(e,t){const n=this._state.accounts.findIndex(s=>s.id===e);n!==-1&&(this._state.accounts[n]={...this._state.accounts[n],...t},this._save())}deleteAccount(e){this._state.accounts=this._state.accounts.filter(t=>t.id!==e),this._save()}getAccounts(){return this._state.accounts}getAccountById(e){return this._state.accounts.find(t=>t.id===e)}addTransaction(e){const t=crypto.randomUUID?crypto.randomUUID():Date.now().toString(36)+Math.random().toString(36).substr(2),n={id:t,created_at:new Date().toISOString(),...e};return this._state.transactions.unshift(n),e.type==="income"?this._updateAccountBalance(e.account_id,e.amount):e.type==="expense"?this._updateAccountBalance(e.account_id,-e.amount):e.type==="transfer"&&(this._updateAccountBalance(e.account_id,-e.amount),e.to_account_id&&this._updateAccountBalance(e.to_account_id,e.amount)),this._save(),t}_updateAccountBalance(e,t){const n=this._state.accounts.find(s=>s.id===e);n&&(n.balance=(n.balance||0)+t)}deleteTransaction(e){const t=this._state.transactions.find(n=>n.id===e);t&&(t.type==="income"?this._updateAccountBalance(t.account_id,-t.amount):t.type==="expense"?this._updateAccountBalance(t.account_id,t.amount):t.type==="transfer"&&(this._updateAccountBalance(t.account_id,t.amount),t.to_account_id&&this._updateAccountBalance(t.to_account_id,-t.amount)),this._state.transactions=this._state.transactions.filter(n=>n.id!==e),this._save())}getTransactions(e={}){let t=[...this._state.transactions];if(e.type&&(t=t.filter(n=>n.type===e.type)),e.paid_by&&(t=t.filter(n=>n.paid_by===e.paid_by)),e.for_whom&&(t=t.filter(n=>n.for_whom===e.for_whom)),e.account_id&&(t=t.filter(n=>n.account_id===e.account_id)),e.parent_category&&(t=t.filter(n=>n.parent_category===e.parent_category)),e.month&&(t=t.filter(n=>{const s=new Date(n.created_at);return s.getMonth()===e.month&&s.getFullYear()===(e.year||new Date().getFullYear())})),e.search){const n=e.search.toLowerCase();t=t.filter(s=>(s.description||"").toLowerCase().includes(n)||(s.parent_category||"").toLowerCase().includes(n)||(s.sub_category||"").toLowerCase().includes(n))}return t}getTransactionsByMonth(e,t){return this._state.transactions.filter(n=>{const s=new Date(n.created_at);return s.getFullYear()===e&&s.getMonth()===t})}updateAssets(e){this._state.assets={...this._state.assets,...e},this._save()}updateEmas(e){this._state.assets.emas={...this._state.assets.emas,...e},this._save()}updateKPR(e){this._state.assets.kpr={...this._state.assets.kpr,...e},this._save()}addArisan(e){const t=Date.now();return this._state.assets.arisan.push({id:t,...e}),this._save(),t}getAssets(){return this._state.assets}getTotalBalance(){return this._state.accounts.reduce((e,t)=>e+(t.balance||0),0)}getMonthlyExpenses(e,t){return this.getTransactionsByMonth(e,t).filter(n=>n.type==="expense").reduce((n,s)=>n+s.amount,0)}getMonthlyIncome(e,t){return this.getTransactionsByMonth(e,t).filter(n=>n.type==="income").reduce((n,s)=>n+s.amount,0)}getAllowanceSpent(){const e=new Date;return this.getTransactionsByMonth(e.getFullYear(),e.getMonth()).filter(t=>t.type==="expense"&&t.paid_by==="Suami").reduce((t,n)=>t+n.amount,0)}getDanaPusatBalance(){return this._state.accounts.filter(e=>e.owner_name==="Istri"||e.owner_name==="Bersama").reduce((e,t)=>e+(t.balance||0),0)}getNetWorth(){const e=this.getTotalBalance(),t=this._state.assets.emas,n=(t.bsi_gram+t.tring_gram)*t.price_per_gram,s=this._state.assets.kpr.paid;return e+n+s}getCategorySpending(e,t){const n=this.getTransactionsByMonth(e,t).filter(i=>i.type==="expense"),s={};return n.forEach(i=>{const o=i.parent_category||"Lainnya";s[o]=(s[o]||0)+i.amount}),Object.entries(s).map(([i,o])=>({name:i,amount:o})).sort((i,o)=>o.amount-i.amount)}getBudgetPerformance(){const e=new Date,t=this.getTransactionsByMonth(e.getFullYear(),e.getMonth()).filter(l=>l.type==="expense"),n=this._state.budgetRules;let s=0,i=0,o=0;t.forEach(l=>{const p=l.parent_category,d=l.sub_category||"";n.needs.includes(p)?s+=l.amount:n.savings.includes(p)?o+=l.amount:n.wants.includes(p)?p==="Makanan & Minuman"?["Makan di Luar","Cemilan","Kopi & Minuman"].includes(d)?i+=l.amount:s+=l.amount:i+=l.amount:s+=l.amount});const r=s+i+o;return{needs:s,wants:i,savings:o,total:r}}addCustomAsset(e){const t=Date.now().toString(36);return this._state.assets.custom.push({id:t,...e}),this._save(),t}updateCustomAsset(e,t){const n=this._state.assets.custom.findIndex(s=>s.id===e);n!==-1&&(this._state.assets.custom[n]={...this._state.assets.custom[n],...t},this._save())}deleteCustomAsset(e){this._state.assets.custom=this._state.assets.custom.filter(t=>t.id!==e),this._save()}payAssetMonthly(e,t,n){const s=this._state;let i=0,o="",r="Cicilan";if(e==="kpr")i=s.assets.kpr.monthly,o=`Cicilan KPR ${s.assets.kpr.bank} (Bulan ini)`,this.updateKPR({paid:s.assets.kpr.paid+i,remaining_months:s.assets.kpr.remaining_months-1});else if(e==="arisan"){const l=s.assets.arisan.find(p=>p.id===t);l&&(i=l.monthly_amount,o=`Iuran Arisan ${l.name}`,r="Sosial & Ibadah",this.updateArisan(t,{current_round:l.current_round+1}))}else if(e==="custom"){const l=s.assets.custom.find(p=>p.id===t);l&&(i=l.monthly_amount||0,o=`Cicilan ${l.name}`,this.updateCustomAsset(t,{paid:(l.paid||0)+i}))}i>0&&this.addTransaction({account_id:n,amount:i,type:"expense",description:o,parent_category:r,paid_by:s.settings.userName,for_whom:"Bersama"})}reset(){this._state=JSON.parse(JSON.stringify(R)),localStorage.removeItem(j),this._notify()}}const c=new oe,G=5;function re(){const a=localStorage.getItem("cipta_seed_version");a&&parseInt(a)>=G||(c.reset(),c.setFamily({id:"family-001",family_name:"Adam Family",papa:"Erwin",mama:"Nihad",anak:"Adam",created_at:new Date().toISOString()}),c.updateSettings({userName:"Erwin",spouseName:"Nihad",allowanceBudget:15e5}),c.addAccount({bank_name:"BRI",owner_name:"Erwin",balance:0,is_allowance_account:!1,css_class:"bri"}),c.addAccount({bank_name:"Bank Jago",owner_name:"Bersama",balance:0,is_allowance_account:!0,css_class:"jago"}),c.addAccount({bank_name:"BSI",owner_name:"Nihad",balance:0,is_allowance_account:!1,css_class:"bsi"}),c.addAccount({bank_name:"Dompet Tunai Erwin",owner_name:"Erwin",balance:0,is_allowance_account:!0,css_class:"tunai"}),c.addAccount({bank_name:"Dompet Tunai Nihad",owner_name:"Nihad",balance:0,is_allowance_account:!0,css_class:"tunai"}),c.updateEmas({bsi_gram:0,tring_gram:0,price_per_gram:165e4}),c.updateKPR({total:0,paid:0,monthly:0,bank:"-",remaining_months:0}),localStorage.setItem("cipta_seed_version",G.toString()),console.log("Final Application Seeded Successfully."))}const le="modulepreload",de=function(a){return"/Admfb/"+a},H={},C=function(e,t,n){let s=Promise.resolve();if(t&&t.length>0){let o=function(p){return Promise.all(p.map(d=>Promise.resolve(d).then(u=>({status:"fulfilled",value:u}),u=>({status:"rejected",reason:u}))))};document.getElementsByTagName("link");const r=document.querySelector("meta[property=csp-nonce]"),l=(r==null?void 0:r.nonce)||(r==null?void 0:r.getAttribute("nonce"));s=o(t.map(p=>{if(p=de(p),p in H)return;H[p]=!0;const d=p.endsWith(".css"),u=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${p}"]${u}`))return;const g=document.createElement("link");if(g.rel=d?"stylesheet":le,d||(g.as="script"),g.crossOrigin="",g.href=p,l&&g.setAttribute("nonce",l),document.head.appendChild(g),d)return new Promise((f,v)=>{g.addEventListener("load",f),g.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${p}`)))})}))}function i(o){const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=o,window.dispatchEvent(r),!r.defaultPrevented)throw o}return s.then(o=>{for(const r of o||[])r.status==="rejected"&&i(r.reason);return e().catch(i)})};function ce(){const a=c.getState(),e=a.settings.togetherMode;return`
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
  `}function ue(){const a=document.getElementById("together-toggle");a&&a.addEventListener("click",()=>{const t=c.toggleTogetherMode();a.classList.toggle("active",t);const n=a.querySelector(".together-toggle-icon"),s=a.querySelector(".together-toggle-label");n.textContent=t?"favorite":"favorite_border",s.textContent=t?"Together!":"Together",C(async()=>{const{showToast:i}=await Promise.resolve().then(()=>J);return{showToast:i}},void 0).then(({showToast:i})=>{i(t?"💕 Together Mode Aktif!":"Together Mode Nonaktif","info")})});const e=document.getElementById("profile-avatar");e&&e.addEventListener("click",()=>{const n=c.getState().settings.userName||"Erwin",s=n==="Erwin"?"Nihad":"Erwin";confirm(`Ganti sesi dari ${n} ke ${s}?`)&&(c.updateSettings({userName:s}),window.dispatchEvent(new Event("data-updated")),C(async()=>{const{showToast:i}=await Promise.resolve().then(()=>J);return{showToast:i}},void 0).then(({showToast:i})=>{i(`Berhasil login sebagai ${s}`,"success")}))})}const pe=[{path:"/",icon:"dashboard",label:"Beranda"},{path:"/transactions",icon:"receipt_long",label:"Transaksi"},{path:"/accounts",icon:"account_balance_wallet",label:"Rekening"},{path:"/assets",icon:"diamond",label:"Aset"},{path:"/insights",icon:"auto_awesome",label:"AI Insight"},{path:"/settings",icon:"settings",label:"Set"}];function me(){const a=M.getCurrentPath();return`
    <nav class="bottom-nav" id="bottom-nav">
      ${pe.map(e=>`
        <a class="nav-item ${a===e.path?"active":""}"
           href="#${e.path}"
           id="nav-${e.path.replace("/","")||"home"}"
           aria-label="${e.label}">
          <span class="material-icons-round">${e.icon}</span>
          <span>${e.label}</span>
        </a>
      `).join("")}
    </nav>
  `}function ge(a){document.querySelectorAll(".nav-item").forEach(e=>{const t=e.getAttribute("href");e.classList.toggle("active",t===`#${a}`)})}function ve(){return`
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
  `}function ye(){var s,i,o,r;const a=document.getElementById("fab-main"),e=document.getElementById("fab-actions");let t=!1;a&&a.addEventListener("click",()=>{t=!t,a.classList.toggle("open",t),e.classList.toggle("open",t)}),document.addEventListener("click",l=>{t&&!l.target.closest("#fab-container")&&(t=!1,a==null||a.classList.remove("open"),e==null||e.classList.remove("open"))}),(s=document.getElementById("fab-expense"))==null||s.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("open-transaction-modal",{detail:{type:"expense"}})),n()}),(i=document.getElementById("fab-income"))==null||i.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("open-transaction-modal",{detail:{type:"income"}})),n()}),(o=document.getElementById("fab-transfer"))==null||o.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("open-transaction-modal",{detail:{type:"transfer"}})),n()}),(r=document.getElementById("fab-scan"))==null||r.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("open-scan-modal")),n()});function n(){t=!1,a==null||a.classList.remove("open"),e==null||e.classList.remove("open")}}const D=[{name:"Makanan & Minuman",icon:"restaurant",subs:["Makan Harian","Makan di Luar","Cemilan","Kopi & Minuman","Groceries"]},{name:"Transportasi",icon:"directions_car",subs:["Bensin LDM","Bensin Harian","Parkir","Tol","Servis Kendaraan","Ojol / Grab"]},{name:"Rumah Tangga",icon:"home",subs:["Listrik","Air PDAM","Internet","Gas LPG","Perabot","Kebersihan"]},{name:"Pendidikan Anak",icon:"school",subs:["SPP","Buku & Alat Tulis","Les/Kursus","Seragam","Uang Jajan"]},{name:"Kesehatan",icon:"local_hospital",subs:["Obat","Dokter","Vitamin","BPJS Tambahan"]},{name:"Pakaian & Fashion",icon:"checkroom",subs:["Pakaian","Sepatu","Aksesoris"]},{name:"Hiburan",icon:"celebration",subs:["Jalan-jalan","Quality Time","Film","Langganan Digital","Hobi"]},{name:"Sosial & Ibadah",icon:"volunteer_activism",subs:["Sedekah","Zakat","Sumbangan","Hajatan","Arisan"]},{name:"Investasi",icon:"trending_up",subs:["Emas BSI","Emas Tring","Tabungan","Deposito"]},{name:"Cicilan",icon:"account_balance",subs:["KPR","Kredit Motor","Pinjaman"]},{name:"Gaji & Pendapatan",icon:"payments",subs:["Gaji Pokok","Tunjangan Kinerja","TPP","Penghasilan Lain","Arisan Masuk"]},{name:"Lainnya",icon:"more_horiz",subs:["Tak Terduga","Donasi","Lain-lain"]}];function be(a){const e=D.find(t=>t.name===a);return e?e.icon:"receipt_long"}function fe(a){const e=D.find(t=>t.name===a);return e?e.subs:[]}function m(a,e=!1){return e&&Math.abs(a)>=1e6?"Rp "+(a/1e6).toFixed(1).replace(".0","")+" jt":e&&Math.abs(a)>=1e3?"Rp "+(a/1e3).toFixed(0)+" rb":new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",minimumFractionDigits:0,maximumFractionDigits:0}).format(a)}function X(a,e="long"){const t=new Date(a),n=["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"],s=["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"],i=["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];if(e==="short")return`${t.getDate()} ${n[t.getMonth()]}`;if(e==="long")return`${i[t.getDay()]}, ${t.getDate()} ${s[t.getMonth()]} ${t.getFullYear()}`;if(e==="time")return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`;if(e==="relative"){const r=new Date-t,l=Math.floor(r/6e4);if(l<1)return"Baru saja";if(l<60)return`${l} menit lalu`;const p=Math.floor(l/60);if(p<24)return`${p} jam lalu`;const d=Math.floor(p/24);return d===1?"Kemarin":d<7?`${d} hari lalu`:`${t.getDate()} ${n[t.getMonth()]}`}if(e==="group"){const o=new Date,r=new Date(o);return r.setDate(r.getDate()-1),t.toDateString()===o.toDateString()?"Hari Ini":t.toDateString()===r.toDateString()?"Kemarin":`${i[t.getDay()]}, ${t.getDate()} ${n[t.getMonth()]}`}return t.toLocaleDateString("id-ID")}function z(){return["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"][new Date().getMonth()]}function ee(a){const e={};return a.forEach(t=>{const n=X(t.created_at,"group");e[n]||(e[n]=[]),e[n].push(t)}),e}function I(a,e="info"){let t=document.querySelector(".toast-container");t||(t=document.createElement("div"),t.className="toast-container",document.body.appendChild(t));const n=document.createElement("div");n.className=`toast toast-${e}`,n.textContent=a,t.appendChild(n),setTimeout(()=>n.remove(),3e3)}function te(a,e=300){let t;return(...n)=>{clearTimeout(t),t=setTimeout(()=>a(...n),e)}}function L(a,e){return e?Math.min(Math.round(a/e*100),100):0}const J=Object.freeze(Object.defineProperty({__proto__:null,debounce:te,formatDate:X,formatRupiah:m,getCurrentMonthName:z,groupByDate:ee,percentage:L,showToast:I},Symbol.toStringTag,{value:"Module"}));function he(){const a=c.getAccounts(),e=c.getState();return`
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
                <button type="button" class="chip ${e.settings.togetherMode?"":"selected"}" data-value="Erwin">Papa</button>
                <button type="button" class="chip ${e.settings.togetherMode?"selected":""}" data-value="Nihad">Mama</button>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Untuk Siapa</label>
              <div class="chip-group" id="tx-for-whom-chips">
                <button type="button" class="chip" data-value="Erwin">Papa</button>
                <button type="button" class="chip" data-value="Nihad">Mama</button>
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
  `}function ke(){var t;const a=document.getElementById("tx-modal-backdrop");document.getElementById("tx-modal-sheet");const e=document.getElementById("tx-form");window.addEventListener("open-transaction-modal",n=>{var s;xe(((s=n.detail)==null?void 0:s.type)||"expense")}),a==null||a.addEventListener("click",U),document.querySelectorAll("#tx-type-chips .chip").forEach(n=>{n.addEventListener("click",()=>{document.querySelectorAll("#tx-type-chips .chip").forEach(r=>r.classList.remove("selected")),n.classList.add("selected");const s=n.dataset.type,i=document.getElementById("tx-to-account-group"),o=document.getElementById("tx-category-row");i&&(i.style.display=s==="transfer"?"":"none"),o&&(o.style.display=s==="transfer"?"none":"")})}),document.querySelectorAll("#tx-paid-by-chips .chip").forEach(n=>{n.addEventListener("click",()=>{document.querySelectorAll("#tx-paid-by-chips .chip").forEach(s=>s.classList.remove("selected")),n.classList.add("selected")})}),document.querySelectorAll("#tx-for-whom-chips .chip").forEach(n=>{n.addEventListener("click",()=>{document.querySelectorAll("#tx-for-whom-chips .chip").forEach(s=>s.classList.remove("selected")),n.classList.add("selected")})}),(t=document.getElementById("tx-category"))==null||t.addEventListener("change",n=>{const s=fe(n.target.value),i=document.getElementById("tx-subcategory");i&&(i.innerHTML='<option value="">Pilih Sub-Kategori</option>'+s.map(o=>`<option value="${o}">${o}</option>`).join(""))}),e==null||e.addEventListener("submit",n=>{var y,_,w,E,b,k,B,x,S,A;n.preventDefault();const s=((y=document.querySelector("#tx-type-chips .chip.selected"))==null?void 0:y.dataset.type)||"expense",i=parseFloat(((_=document.getElementById("tx-amount"))==null?void 0:_.value)||0),o=((w=document.getElementById("tx-description"))==null?void 0:w.value)||"",r=parseInt((E=document.getElementById("tx-account"))==null?void 0:E.value),l=s==="transfer"?parseInt((b=document.getElementById("tx-to-account"))==null?void 0:b.value):null,p=((k=document.getElementById("tx-category"))==null?void 0:k.value)||"",d=((B=document.getElementById("tx-subcategory"))==null?void 0:B.value)||"",u=((x=document.querySelector("#tx-paid-by-chips .chip.selected"))==null?void 0:x.dataset.value)||"Suami",g=((S=document.querySelector("#tx-for-whom-chips .chip.selected"))==null?void 0:S.dataset.value)||"Bersama",f=(A=document.getElementById("tx-date"))==null?void 0:A.value,v=f?new Date(f).toISOString():new Date().toISOString(),h=c.getState();if(!i||i<=0){I("Masukkan nominal yang valid","error");return}c.addTransaction({account_id:r,to_account_id:l,amount:i,type:s,description:o,parent_category:s==="transfer"?"Transfer":p,sub_category:s==="transfer"?"Pindah Buku":d,paid_by:u,for_whom:g,is_together:h.settings.togetherMode,created_at:v}),I("✅ Transaksi berhasil disimpan!"),U(),window.dispatchEvent(new CustomEvent("data-updated"))})}function xe(a="expense"){var l;const e=document.getElementById("tx-modal-backdrop"),t=document.getElementById("tx-modal-sheet"),n=document.getElementById("tx-modal-title");(l=document.getElementById("tx-form"))==null||l.reset(),document.getElementById("tx-date").value=new Date().toISOString().slice(0,16),document.querySelectorAll("#tx-type-chips .chip").forEach(p=>{p.classList.toggle("selected",p.dataset.type===a)});const s=document.getElementById("tx-to-account-group"),i=document.getElementById("tx-category-row");s&&(s.style.display=a==="transfer"?"":"none"),i&&(i.style.display=a==="transfer"?"none":""),c.getState().settings.togetherMode&&(document.querySelectorAll("#tx-paid-by-chips .chip").forEach(p=>{p.classList.toggle("selected",p.dataset.value==="Istri")}),document.querySelectorAll("#tx-for-whom-chips .chip").forEach(p=>{p.classList.toggle("selected",p.dataset.value==="Bersama")}));const r={expense:"Tambah Pengeluaran",income:"Tambah Pemasukan",transfer:"Transfer Antar Rekening"};n&&(n.textContent=r[a]||"Tambah Transaksi"),e==null||e.classList.add("open"),t==null||t.classList.add("open")}function U(){var a,e;(a=document.getElementById("tx-modal-backdrop"))==null||a.classList.remove("open"),(e=document.getElementById("tx-modal-sheet"))==null||e.classList.remove("open")}function we(){return`
    <div class="modal-backdrop" id="scan-modal-backdrop"></div>
    <div class="modal-sheet" id="scan-modal-sheet">
      <div class="modal-handle"></div>
      <div class="modal-content">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <h2 class="modal-title" style="margin-bottom: 0;">🤖 Adam Family AI</h2>
          <button id="btn-force-config" class="btn btn-secondary" style="padding: 4px 8px; font-size: 11px;">
            <span class="material-icons-round" style="font-size: 14px; vertical-align: middle;">settings</span> Ganti Key
          </button>
        </div>

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
              <input type="file" id="scan-file-input" accept="image/*" style="display: none;" />
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
  `}let T=[];function Ee(){var f,v,h;const a=document.getElementById("scan-modal-backdrop"),e=document.getElementById("scan-modal-sheet"),t=document.getElementById("scan-upload-area"),n=document.getElementById("scan-file-input"),s=document.getElementById("tab-text"),i=document.getElementById("tab-scan"),o=document.getElementById("panel-text"),r=document.getElementById("panel-scan"),l=document.getElementById("ai-key-config"),p=document.getElementById("ai-main-app"),d=document.getElementById("btn-save-key"),u=document.getElementById("ai-key-input");function g(){c.getState().settings.geminiApiKey?(l.style.display="none",p.style.display="block"):(l.style.display="block",p.style.display="none")}d==null||d.addEventListener("click",()=>{const y=u.value.trim();if(!y){I("API Key tidak boleh kosong","error");return}c.updateSettings({geminiApiKey:y}),I("API Key Berhasil Disimpan"),g()}),(f=document.getElementById("btn-force-config"))==null||f.addEventListener("click",()=>{l.style.display="block",p.style.display="none",u.value=c.getState().settings.geminiApiKey||"",u.focus()}),s==null||s.addEventListener("click",()=>{o.style.display="block",r.style.display="none",s.style.background="var(--primary-container)",s.style.color="var(--primary)",s.style.borderColor="var(--primary)",i.style.background="transparent",i.style.color="var(--on-surface-variant)",i.style.borderColor="transparent"}),i==null||i.addEventListener("click",()=>{o.style.display="none",r.style.display="block",i.style.background="var(--primary-container)",i.style.color="var(--primary)",i.style.borderColor="var(--primary)",s.style.background="transparent",s.style.color="var(--on-surface-variant)",s.style.borderColor="transparent"}),window.addEventListener("open-scan-modal",()=>{a==null||a.classList.add("open"),e==null||e.classList.add("open"),g(),Y()}),a==null||a.addEventListener("click",()=>{a==null||a.classList.remove("open"),e==null||e.classList.remove("open")}),(v=document.getElementById("btn-analyze-text"))==null||v.addEventListener("click",async()=>{var _,w;const y=(w=(_=document.getElementById("ai-text-input"))==null?void 0:_.value)==null?void 0:w.trim();if(!y){I("Silakan ceritakan pengeluaran Anda dulu","error");return}V();try{await Q(y,null,null)}catch(E){W(E)}}),t==null||t.addEventListener("click",()=>n==null?void 0:n.click()),n==null||n.addEventListener("change",async y=>{var E;const _=(E=y.target.files)==null?void 0:E[0];if(!_)return;V();const w=new FileReader;w.onload=async b=>{let k=b.target.result;try{k=await _e(k)}catch(B){console.warn("Compression failed, using original",B)}document.getElementById("scan-preview-img").src=k,document.getElementById("scan-preview").style.display="block";try{await Q(null,k.split(",")[1],"image/jpeg")}catch(B){W(B)}},w.readAsDataURL(_)}),(h=document.getElementById("scan-save-btn"))==null||h.addEventListener("click",()=>{if(!T||T.length===0)return;const y=c.getAccounts(),w=c.getState().settings.togetherMode;let E=0;T.forEach(b=>{var x;let k=(x=y.find(S=>S.bank_name.toLowerCase().includes("tunai")))==null?void 0:x.id;if(b.account_guess){const S=b.account_guess.toLowerCase(),A=y.find(P=>P.bank_name.toLowerCase().includes(S));A&&(k=A.id)}!k&&y.length>0&&(k=y[0].id);let B=null;if(b.type==="transfer"&&b.to_account_guess){const S=b.to_account_guess.toLowerCase(),A=y.find(P=>P.bank_name.toLowerCase().includes(S));A&&(B=A.id)}c.addTransaction({account_id:k,to_account_id:B,amount:b.amount||0,type:b.type||"expense",description:b.description||"Transaksi AI",parent_category:b.category||"Lainnya",sub_category:b.sub_category||"",paid_by:w?"Nihad":"Erwin",for_whom:w?"Bersama":"Erwin",is_together:w,created_at:b.date?new Date(b.date).toISOString():new Date().toISOString()}),E++}),I(`✅ ${E} transaksi dari AI berhasil disimpan!`),a==null||a.classList.remove("open"),e==null||e.classList.remove("open"),window.dispatchEvent(new CustomEvent("data-updated")),Y()})}function Y(){document.getElementById("scan-preview").style.display="none",document.getElementById("scan-result").style.display="none",document.getElementById("scan-loading").style.display="none",document.getElementById("scan-parsed-data").style.display="none",document.getElementById("scan-save-btn").style.display="none",document.getElementById("ai-text-input").value="",document.getElementById("scan-file-input").value="",T=[]}function V(){document.getElementById("scan-loading").style.display="block",document.getElementById("scan-result").style.display="none";const a=document.getElementById("ai-key-config");a&&(a.style.display="none");const e=document.getElementById("ai-main-app");e&&(e.style.display="block")}function W(a){console.error("AI Error:",a),document.getElementById("scan-loading").style.display="none",document.getElementById("scan-result").style.display="block";let e="❌ Maaf, Gagal memproses AI. Silakan coba deksripsi yang lebih jelas.";a.message&&(a.message.includes("403")||a.message.includes("leaked")||a.message.includes("Forbidden"))&&(e=`
      <b>❌ Akses Ditolak (API Key Bermasalah)</b><br/>
      Kunci AI Anda saat ini sudah tidak aktif atau dianggap bocor oleh Google.<br/><br/>
      <button class="btn btn-primary" onclick="document.getElementById('btn-force-config').click()" style="padding: 8px 16px; font-size: 12px; height: auto;">
        Klik di sini untuk Memasukkan Key Baru
      </button>
    `,c.updateSettings({geminiApiKey:""})),document.getElementById("scan-ai-text").innerHTML=e,document.getElementById("scan-parsed-data").style.display="none",document.getElementById("scan-save-btn").style.display="none"}async function Q(a,e,t){var v,h,y,_,w,E;const s=c.getState().settings.geminiApiKey;if(!s)throw new Error("API Key Missing");const i=`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${s}`,o=D.map(b=>b.name).join(", "),r=c.getAccounts();let d=[{text:`Anda adalah Asisten Keuangan Keluarga 'Adam Family'. Tugas Anda mengekstrak transaksi dari cerita informal (bahasa gaul/sehari-hari) atau gambar struk.

KONTEKS REKENING YANG TERSEDIA:
${r.map(b=>`- ID ${b.id}: ${b.bank_name} (${b.owner_name})`).join(`
`)}

ATURAN EKSTRAKSI:
1. Sangat Pahami bahasa Indonesia informal/gaul (cth: jeti/jt=juta, rb/k=ribu, duit/dana/saldu, sisaan, pake, dikasih, gajian, pelicin, jajan, narik atm, dll).
2. Lakukan perhitungan matematika jika ada kata 'sisanya' atau 'remainder'. 
   Contoh: "Gaji 5jt, sedekah 1jt, sisanya tabung" -> Transaksi 1: 5jt (Income), Transaksi 2: 1jt (Expense), Transaksi 3: 4jt (Transfer/Save).
3. Sangat sensitif terhadap arah mutasi uang (Pemasukan vs Pengeluaran).
4. Hasil harus berupa JSON ARRAY valid ([ {...} ]) SAJA tanpa markdown.

STRUKTUR JSON ITEM:
- "type": "expense", "income", atau "transfer"
- "amount": angka integer murni (tanpa titik/huruf). Pahami "4jt" = 4000000, "150rb" = 150000, "50k" = 50000.
- "description": nama item/kegiatan.
- "category": Jika expense pilih dari [${o}]. Jika income: "Gaji/Pendapatan". Jika transfer: "Mutasi".
- "account_id": Pilih ID Rekening SUMBER (Darimana uangnya). Jika tidak disebutkan, gunakan Rekening 'Tunai' atau ID yang paling logis.
- "to_account_id": (Hanya jika type="transfer") ID Rekening TUJUAN (Ke mana uangnya).

INPUT: "${a||"Analisis gambar struk lampiran"}"`}];e&&d.push({inlineData:{mimeType:t||"image/jpeg",data:e}});const u=await fetch(i,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{parts:d}],generationConfig:{temperature:.1,maxOutputTokens:2048}})});if(!u.ok){const k=((v=(await u.json().catch(()=>({}))).error)==null?void 0:v.message)||u.statusText;throw u.status===403?new Error("403 Forbidden: API Key Problem"):u.status===404?new Error("404 Not Found: Model name error"):u.status===503?new Error("503 Service Busy: Server Google penuh, coba lagi sesaat lagi."):new Error(`HTTP Error ${u.status}: ${k}`)}const f=((E=(w=(_=(y=(h=(await u.json()).candidates)==null?void 0:h[0])==null?void 0:y.content)==null?void 0:_.parts)==null?void 0:w[0])==null?void 0:E.text)||"";document.getElementById("scan-loading").style.display="none",document.getElementById("scan-result").style.display="block";try{const b=f.match(/\[[\s\S]*\]/)||f.match(/\{[\s\S]*\}/);if(!b)throw new Error("AI memberikan respon teks saja, bukan data transaksi.");let k=JSON.parse(b[0]);if(Array.isArray(k)||(k=[k]),T=k,T.length===0)throw new Error("Data transaksi kosong.");document.getElementById("scan-ai-text").innerHTML=`
      <strong>✨ AI Selesai Menganalisis!</strong><br/>
      Saya menemukan ${T.length} transaksi dari cerita Anda.
    `;const B=document.getElementById("scan-parsed-data");B.style.display="block",B.innerHTML=T.map(x=>{const S=r.find(P=>P.id==x.account_id)||{bank_name:"Unknown"},A=x.to_account_id?r.find(P=>P.id==x.to_account_id):null;return`
        <div style="background: var(--surface-container); border-radius: var(--radius-md); padding: 12px; margin-top: 12px; border: 1px solid var(--outline-variant);">
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="font-weight: 600; color: var(--on-surface-variant);">${x.type==="income"?"💰 Pemasukan":x.type==="transfer"?"🔁 Transfer":"💸 Pengeluaran"}</span>
            <span style="font-weight: 800; color: ${x.type==="income"?"var(--success)":x.type==="transfer"?"var(--primary)":"var(--error)"};">${m(x.amount||0)}</span>
          </div>
          <div style="font-size: 13px; color: var(--on-surface-variant);">
            <p>📝 <strong>${x.description||"-"}</strong></p>
            <p>📂 ${x.category||"-"} ${x.sub_category?"→ "+x.sub_category:""}</p>
            <p>💳 Rekening: <strong>${S.bank_name} ${A?"➡️ "+A.bank_name:""}</strong></p>
          </div>
        </div>
      `}).join(""),document.getElementById("scan-save-btn").style.display="flex"}catch(b){throw console.error(b,f),new Error("Gagal membaca data: "+b.message)}}function _e(a,e=1200){return new Promise((t,n)=>{const s=new Image;s.src=a,s.onload=()=>{const i=document.createElement("canvas");let o=s.width,r=s.height;o>e&&(r=Math.round(r*e/o),o=e),i.width=o,i.height=r,i.getContext("2d").drawImage(s,0,0,o,r),t(i.toDataURL("image/jpeg",.8))},s.onerror=n})}function Ie(){const a=c.getState(),e=new Date,t=a.settings.allowanceBudget||15e5,n=c.getAllowanceSpent(),s=Math.max(0,t-n),i=L(n,t),o=c.getDanaPusatBalance(),r=c.getMonthlyExpenses(e.getFullYear(),e.getMonth()),l=c.getMonthlyIncome(e.getFullYear(),e.getMonth());return`
    <div class="bento-grid stagger-children">
      <!-- Pegangan Papa -->
      <div class="card card-gradient" id="card-allowance">
        <div class="card-title">💰 Pegangan ${a.settings.userName||"Papa"}</div>
        <div class="card-value">${m(s)}</div>
        <div class="card-subtitle">Terpakai ${m(n)} dari ${m(t)}</div>
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
        <div class="card-value">${m(o)}</div>
        <div class="card-subtitle">Dikelola oleh ${a.settings.spouseName||"Mama"}</div>
      </div>

      <!-- Total Saldo -->
      <div class="card" id="card-total-balance">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
          <span class="material-icons-round" style="color: var(--primary); font-size: 20px;">account_balance</span>
          <div class="card-title" style="margin-bottom: 0;">Total Saldo</div>
        </div>
        <div class="card-value" style="font-size: 1.5rem; color: var(--primary);">${m(c.getTotalBalance())}</div>
        <div class="card-subtitle" style="color: var(--on-surface-variant);">${a.accounts.length} rekening aktif</div>
      </div>

      <!-- Arus Kas Bulan Ini -->
      <div class="card" id="card-cash-flow">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
          <span class="material-icons-round" style="color: var(--success); font-size: 20px;">swap_vert</span>
          <div class="card-title" style="margin-bottom: 0;">Arus Kas ${z()}</div>
        </div>
        <div style="display: flex; gap: 12px; margin-top: 8px;">
          <div>
            <div style="font-size: 11px; color: var(--success); font-weight: 600;">▲ Masuk</div>
            <div style="font-size: 14px; font-weight: 700; color: var(--success);">${m(l,!0)}</div>
          </div>
          <div>
            <div style="font-size: 11px; color: var(--error); font-weight: 600;">▼ Keluar</div>
            <div style="font-size: 14px; font-weight: 700; color: var(--error);">${m(r,!0)}</div>
          </div>
        </div>
      </div>
    </div>
  `}function Be(a){const e=a.toLowerCase();return e.includes("bri")?"bri":e.includes("jago")?"jago":e.includes("bsi")?"bsi":"default"}function Ae(a){const e=a.toLowerCase();return e.includes("bri")?"BRI":e.includes("jago")?"JGO":e.includes("bsi")?"BSI":a.slice(0,3).toUpperCase()}function Se(){return`
    <div class="section-header">
      <h2 class="section-title">Rekening Bank</h2>
      <span class="section-action" id="btn-manage-accounts">Kelola</span>
    </div>
    <div class="bank-slider" id="bank-slider">
      ${c.getAccounts().map(e=>{const t=Be(e.bank_name);return`
          <div class="bank-card ${t}" data-account-id="${e.id}">
            <div class="bank-card-icon ${t}">${Ae(e.bank_name)}</div>
            <div class="bank-card-name">${e.bank_name}</div>
            <div class="bank-card-owner">${e.owner_name}</div>
            <div class="bank-card-balance">${m(e.balance)}</div>
          </div>
        `}).join("")}
      <div class="bank-card-add" id="btn-add-account">
        <span class="material-icons-round">add</span>
        <span>Tambah</span>
      </div>
    </div>
  `}function $e(){const a=document.getElementById("btn-add-account");a&&a.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("open-account-modal"))});const e=document.getElementById("btn-manage-accounts");e&&e.addEventListener("click",()=>{C(async()=>{const{default:t}=await Promise.resolve().then(()=>ie);return{default:t}},void 0).then(({default:t})=>t.navigate("/accounts"))})}function Te(){const a=c.getState(),e=new Date,t=c.getTransactionsByMonth(e.getFullYear(),e.getMonth()),n=a.assets.kpr,s=L(n.paid,n.total),i=a.settings.transportBudget||6e5,o=t.filter(u=>u.type==="expense"&&u.parent_category==="Transportasi").reduce((u,g)=>u+g.amount,0),r=L(o,i),l=a.settings.anakBudget||8e5,p=t.filter(u=>u.type==="expense"&&u.for_whom==="Anak").reduce((u,g)=>u+g.amount,0),d=L(p,l);return`
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
          <span>Lunas: ${m(n.paid,!0)}</span>
          <span>Total: ${m(n.total,!0)}</span>
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
          <span>Terpakai: ${m(o,!0)}</span>
          <span>Budget: ${m(i,!0)}</span>
        </div>
      </div>

      <!-- Keperluan Anak -->
      <div class="analysis-card">
        <div class="analysis-card-header">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="material-icons-round" style="color: var(--success); font-size: 20px;">child_care</span>
            <span class="analysis-card-label">Keperluan Anak</span>
          </div>
          <span class="analysis-card-value" style="color: var(--success);">${d}%</span>
        </div>
        <div class="progress-bar">
          <div class="progress-bar-fill green" style="width: ${d}%;"></div>
        </div>
        <div class="analysis-card-detail">
          <span>Terpakai: ${m(p,!0)}</span>
          <span>Budget: ${m(l,!0)}</span>
        </div>
      </div>
    </div>
  `}function O(a=10,e={}){let t=c.getTransactions(e);const n=t.length;if(a&&(t=t.slice(0,a)),t.length===0)return`
      <div class="empty-state">
        <span class="material-icons-round">receipt_long</span>
        <h3>Belum Ada Transaksi</h3>
        <p>Mulai catat pengeluaran dan pemasukan Anda</p>
      </div>
    `;const s=ee(t);let i="";return Object.entries(s).forEach(([o,r])=>{i+=`<div class="transaction-group-header">${o}</div>`,r.forEach(l=>{const p=be(l.parent_category),d=l.type,u=l.type==="expense"?"-":l.type==="income"?"+":"↔",g=c.getAccountById(l.account_id),f=g?g.bank_name:"";i+=`
        <div class="transaction-item" data-tx-id="${l.id}">
          <div class="transaction-icon ${d}">
            <span class="material-icons-round">${p}</span>
          </div>
          <div class="transaction-info">
            <div class="transaction-desc">${l.description}</div>
            <div class="transaction-meta">
              <span class="badge badge-${(l.paid_by||"").toLowerCase()}">${l.paid_by||"-"}</span>
              ${l.is_together?'<span class="badge badge-together">💕</span>':""}
              <span>${l.sub_category||l.parent_category||""}</span>
            </div>
          </div>
          <div class="transaction-amount">
            <div class="transaction-amount-value ${d}">${u} ${m(l.amount)}</div>
            <div class="transaction-amount-account">${f}</div>
          </div>
        </div>
      `})}),a&&n>a&&(i+=`
      <div style="text-align: center; padding: 16px 0;">
        <a href="#/transactions" class="section-action">Lihat Semua (${n} transaksi) →</a>
      </div>
    `),i}function q(){document.querySelectorAll(".transaction-item").forEach(a=>{a.addEventListener("click",()=>{const e=a.dataset.txId;window.dispatchEvent(new CustomEvent("view-transaction",{detail:{id:e}}))})})}function Pe(){const a=c.getState();return`
    <div class="page-container animate-fade-in" id="dashboard-page">
      <!-- Greeting -->
      <div style="margin-bottom: 20px;">
        <h1 style="font-size: 1.5rem; font-weight: 800; color: var(--on-surface); letter-spacing: -0.5px;">
          ${Me()}, ${a.settings.userName||"User"} 👋
        </h1>
        <p style="font-size: var(--fs-body); color: var(--on-surface-variant); margin-top: 4px;">
          Berikut ringkasan keuangan keluarga bulan ${z()}
        </p>
      </div>

      <!-- Summary Cards -->
      ${Ie()}

      <!-- Bank Slider -->
      ${Se()}

      <!-- Analysis -->
      ${Te()}

      <!-- Recent Transactions -->
      <div class="section-header">
        <h2 class="section-title">Transaksi Terbaru</h2>
        <a href="#/transactions" class="section-action">Lihat Semua</a>
      </div>
      <div id="recent-transactions">
        ${O(8)}
      </div>
    </div>
  `}function Le(){$e(),q()}function Me(){const a=new Date().getHours();return a<11?"Selamat Pagi":a<15?"Selamat Siang":a<18?"Selamat Sore":"Selamat Malam"}let $={};function ze(){const a=new Date,e=c.getMonthlyExpenses(a.getFullYear(),a.getMonth()),t=c.getMonthlyIncome(a.getFullYear(),a.getMonth()),n=t-e;return`
    <div class="page-container animate-fade-in" id="transactions-page">
      <h1 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 4px;">Transaksi</h1>
      <p style="color: var(--on-surface-variant); font-size: var(--fs-body); margin-bottom: 16px;">
        Riwayat keuangan bulan ${z()}
      </p>

      <!-- Monthly Summary Bar -->
      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; margin-bottom: 20px;">
        <div style="background: var(--success-container); border-radius: var(--radius-md); padding: 12px; text-align: center;">
          <div style="font-size: 11px; font-weight: 600; color: var(--success);">Pemasukan</div>
          <div style="font-size: 14px; font-weight: 800; color: var(--success); margin-top: 4px;">${m(t,!0)}</div>
        </div>
        <div style="background: var(--error-container); border-radius: var(--radius-md); padding: 12px; text-align: center;">
          <div style="font-size: 11px; font-weight: 600; color: var(--error);">Pengeluaran</div>
          <div style="font-size: 14px; font-weight: 800; color: var(--error); margin-top: 4px;">${m(e,!0)}</div>
        </div>
        <div style="background: var(--primary-container); border-radius: var(--radius-md); padding: 12px; text-align: center;">
          <div style="font-size: 11px; font-weight: 600; color: var(--primary);">Selisih</div>
          <div style="font-size: 14px; font-weight: 800; color: ${n>=0?"var(--success)":"var(--error)"}; margin-top: 4px;">${m(n,!0)}</div>
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
        ${O(null,$)}
      </div>
    </div>
  `}function Ce(){q(),document.querySelectorAll("#tx-filters .chip").forEach(e=>{e.addEventListener("click",()=>{document.querySelectorAll("#tx-filters .chip").forEach(n=>n.classList.remove("selected")),e.classList.add("selected");const t=e.dataset.filter;t==="all"?delete $.type:$.type=t,K()})}),document.querySelectorAll("#tx-paid-filter .chip").forEach(e=>{e.addEventListener("click",()=>{document.querySelectorAll("#tx-paid-filter .chip").forEach(n=>n.classList.remove("selected")),e.classList.add("selected");const t=e.dataset.paid;t==="all"?delete $.paid_by:$.paid_by=t,K()})});const a=document.getElementById("tx-search");a&&a.addEventListener("input",te(e=>{const t=e.target.value.trim();t?$.search=t:delete $.search,K()},300)),De()}function K(){const a=document.getElementById("filtered-transactions");a&&(a.innerHTML=O(null,$),q())}async function De(){const a=document.getElementById("category-chart");if(a)try{const e=await C(()=>import("./auto-eE5P6S0m.js"),[]),t=e.default||e.Chart,n=new Date,s=c.getCategorySpending(n.getFullYear(),n.getMonth());if(s.length===0){a.parentElement.innerHTML=`
        <div style="text-align: center; padding: 20px; color: var(--outline);">
          <span class="material-icons-round" style="font-size: 32px;">pie_chart</span>
          <p style="margin-top: 8px;">Belum ada data pengeluaran bulan ini</p>
        </div>
      `;return}const i=["#30609d","#9a6a1a","#1b6d2f","#ba1a1a","#7b1fa2","#00695c","#e65100","#283593","#4e342e","#546e7a","#ad1457","#00838f"];new t(a,{type:"doughnut",data:{labels:s.map(o=>o.name),datasets:[{data:s.map(o=>o.amount),backgroundColor:i.slice(0,s.length),borderWidth:2,borderColor:"#fff",hoverOffset:6}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"65%",plugins:{legend:{position:"bottom",labels:{padding:12,usePointStyle:!0,pointStyleWidth:8,font:{family:"'Plus Jakarta Sans'",size:11,weight:"600"}}},tooltip:{callbacks:{label:o=>{const r=o.dataset.data.reduce((p,d)=>p+d,0),l=Math.round(o.parsed/r*100);return` ${o.label}: ${m(o.parsed)} (${l}%)`}},titleFont:{family:"'Plus Jakarta Sans'"},bodyFont:{family:"'Plus Jakarta Sans'"}}}}})}catch(e){console.warn("Chart.js not loaded:",e)}}function je(){const a=c.getAccounts(),e=c.getTotalBalance();return`
    <div class="page-container animate-fade-in" id="accounts-page">
      <h1 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 4px;">Rekening Bank</h1>
      <p style="color: var(--on-surface-variant); font-size: var(--fs-body); margin-bottom: 20px;">
        Kelola seluruh rekening keluarga
      </p>

      <!-- Total Balance -->
      <div class="net-worth-card" style="margin-bottom: 20px;">
        <div class="net-worth-label">Total Seluruh Saldo</div>
        <div class="net-worth-value">${m(e)}</div>
        <div style="font-size: 13px; opacity: 0.7;">${a.length} rekening terdaftar</div>
      </div>

      <!-- Account Cards -->
      <div style="display: flex; flex-direction: column; gap: 12px;" class="stagger-children" id="account-list">
        ${a.map(t=>Re(t)).join("")}
      </div>

      <!-- Add Account Button -->
      <button class="btn btn-secondary btn-block" style="margin-top: 20px;" id="btn-add-new-account">
        <span class="material-icons-round">add</span>
        Tambah Rekening Baru
      </button>

      <!-- Account Add/Edit Modal -->
      ${Ke()}
    </div>
  `}function Re(a){const e=ae(a.bank_name);return`
    <div class="card" style="display: flex; align-items: center; gap: 16px; cursor: pointer;" data-acc-id="${a.id}">
      <div class="bank-card-icon ${e}" style="flex-shrink: 0;">${Fe(a.bank_name)}</div>
      <div style="flex: 1; min-width: 0;">
        <div style="font-weight: 700; font-size: var(--fs-body);">${a.bank_name}</div>
        <div style="font-size: var(--fs-caption); color: var(--on-surface-variant);">
          ${a.owner_name} ${a.is_allowance_account?"• Pegangan":""}
        </div>
      </div>
      <div style="text-align: right; margin-right: 8px;">
        <div style="font-weight: 800; font-size: var(--fs-body); color: var(--primary);">${m(a.balance)}</div>
      </div>
      <div style="display: flex; gap: 4px;">
        <button class="btn-edit-account" data-acc-id="${a.id}" style="color: var(--primary); padding: 8px; border-radius: 50%; background: none; border: none; cursor: pointer;" title="Edit">
          <span class="material-icons-round" style="font-size: 18px;">edit</span>
        </button>
        <button class="btn-delete-account" data-acc-id="${a.id}" style="color: var(--error); padding: 8px; border-radius: 50%; background: none; border: none; cursor: pointer;" title="Hapus">
          <span class="material-icons-round" style="font-size: 18px;">delete_outline</span>
        </button>
      </div>
    </div>
  `}function Ke(){return`
    <div class="modal-backdrop" id="acc-modal-backdrop"></div>
    <div class="modal-sheet" id="acc-modal-sheet">
      <div class="modal-handle"></div>
      <div class="modal-content">
        <h2 class="modal-title" id="acc-modal-title">Tambah Rekening</h2>
        <form id="acc-form">
          <input type="hidden" id="acc-id" />
          <div class="form-group">
            <label class="form-label">Nama Bank</label>
            <input type="text" class="form-input" id="acc-bank-name" placeholder="Contoh: BRI, BSI, Bank Jago" required />
          </div>
          <div class="form-group">
            <label class="form-label">Pemilik</label>
            <div class="chip-group" id="acc-owner-chips">
              <button type="button" class="chip selected" data-value="Erwin">Papa (Erwin)</button>
              <button type="button" class="chip" data-value="Nihad">Mama (Nihad)</button>
              <button type="button" class="chip" data-value="Bersama">Bersama</button>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Saldo Saat Ini (Rp)</label>
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
  `}function Ne(){var t;const a=document.getElementById("btn-add-new-account"),e=document.getElementById("acc-modal-backdrop");document.getElementById("acc-modal-sheet"),a==null||a.addEventListener("click",()=>{document.getElementById("acc-modal-title").innerText="Tambah Rekening",document.getElementById("acc-id").value="",N()}),document.querySelectorAll(".btn-edit-account").forEach(n=>{n.addEventListener("click",s=>{s.stopPropagation();const i=parseInt(n.dataset.accId),o=c.getAccountById(i);o&&(document.getElementById("acc-modal-title").innerText="Edit Rekening",document.getElementById("acc-id").value=o.id,document.getElementById("acc-bank-name").value=o.bank_name,document.getElementById("acc-balance").value=o.balance,document.getElementById("acc-is-allowance").checked=o.is_allowance_account,document.querySelectorAll("#acc-owner-chips .chip").forEach(r=>{r.classList.toggle("selected",r.dataset.value===o.owner_name)}),N())})}),window.addEventListener("open-account-modal",()=>{document.getElementById("acc-modal-title").innerText="Tambah Rekening",document.getElementById("acc-id").value="",N()}),e==null||e.addEventListener("click",()=>Z()),document.querySelectorAll("#acc-owner-chips .chip").forEach(n=>{n.addEventListener("click",()=>{document.querySelectorAll("#acc-owner-chips .chip").forEach(s=>s.classList.remove("selected")),n.classList.add("selected")})}),(t=document.getElementById("acc-form"))==null||t.addEventListener("submit",n=>{var d,u,g,f,v;n.preventDefault();const s=document.getElementById("acc-id").value,i=(u=(d=document.getElementById("acc-bank-name"))==null?void 0:d.value)==null?void 0:u.trim(),o=((g=document.querySelector("#acc-owner-chips .chip.selected"))==null?void 0:g.dataset.value)||"Erwin",r=parseFloat(((f=document.getElementById("acc-balance"))==null?void 0:f.value)||0),l=((v=document.getElementById("acc-is-allowance"))==null?void 0:v.checked)||!1;if(!i){I("Masukkan nama bank","error");return}const p={bank_name:i,owner_name:o,balance:r,is_allowance_account:l,css_class:ae(i).replace("bank-card-icon ","")};s?(c.updateAccount(parseInt(s),p),I("✅ Rekening berhasil diperbarui!")):(c.addAccount(p),I("✅ Rekening berhasil ditambahkan!")),Z(),window.dispatchEvent(new CustomEvent("data-updated"))}),document.querySelectorAll(".btn-delete-account").forEach(n=>{n.addEventListener("click",s=>{s.stopPropagation();const i=parseInt(n.dataset.accId);confirm("Hapus rekening ini?")&&(c.deleteAccount(i),I("Rekening dihapus"),window.dispatchEvent(new CustomEvent("data-updated")))})})}function N(){var a,e,t;(a=document.getElementById("acc-form"))==null||a.reset(),(e=document.getElementById("acc-modal-backdrop"))==null||e.classList.add("open"),(t=document.getElementById("acc-modal-sheet"))==null||t.classList.add("open")}function Z(){var a,e;(a=document.getElementById("acc-modal-backdrop"))==null||a.classList.remove("open"),(e=document.getElementById("acc-modal-sheet"))==null||e.classList.remove("open")}function ae(a){const e=a.toLowerCase();return e.includes("bri")?"bri":e.includes("jago")?"jago":e.includes("bsi")?"bsi":e.includes("tunai")||e.includes("cash")?"tunai":"default"}function Fe(a){const e=a.toLowerCase();return e.includes("bri")?"BRI":e.includes("jago")?"JGO":e.includes("bsi")?"BSI":e.includes("tunai")||e.includes("cash")?"CSH":a.slice(0,3).toUpperCase()}function Oe(){const e=c.getState().assets,t=c.getNetWorth(),n=c.getTotalBalance(),s=e.emas,i=s.bsi_gram+s.tring_gram,o=i*s.price_per_gram,r=e.kpr,l=L(r.paid,r.total);r.total-r.paid;const p=e.arisan||[],d=e.custom||[];return`
    <div class="page-container animate-fade-in" id="assets-page" style="padding-bottom: 100px;">
      <h1 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 4px;">Aset & Kekayaan</h1>
      <p style="color: var(--on-surface-variant); font-size: var(--fs-body); margin-bottom: 20px;">
        Pantau kekayaan bersih keluarga secara real-time
      </p>

      <!-- Net Worth Card -->
      <div class="net-worth-card" style="margin-bottom: 24px;">
        <div class="net-worth-label">Kekayaan Bersih (Net Worth)</div>
        <div class="net-worth-value">${m(t)}</div>
        <div class="net-worth-change up">
          <span class="material-icons-round" style="font-size: 14px;">trending_up</span>
          <span>Termasuk aset emas & ekuitas KPR</span>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; margin-top: 16px; position: relative; z-index: 1;">
          <div style="text-align: center;">
            <div style="font-size: 11px; opacity: 0.6;">💰 Bank</div>
            <div style="font-size: 13px; font-weight: 700;">${m(n,!0)}</div>
          </div>
          <div style="text-align: center;">
            <div style="font-size: 11px; opacity: 0.6;">🪙 Emas</div>
            <div style="font-size: 13px; font-weight: 700;">${m(o,!0)}</div>
          </div>
          <div style="text-align: center;">
            <div style="font-size: 11px; opacity: 0.6;">🏠 KPR Equity</div>
            <div style="font-size: 13px; font-weight: 700;">${m(r.paid,!0)}</div>
          </div>
        </div>
      </div>

      <!-- Quick Action: Tambah Aset -->
      <button class="btn btn-secondary btn-block" style="margin-bottom: 24px; border: 2px dashed var(--outline-variant); background: none;" id="btn-show-add-asset">
        <span class="material-icons-round">add_business</span>
        Tambah Aset / Cicilan Baru
      </button>

      <!-- Emas Section -->
      <div class="asset-card" id="asset-emas">
        <div class="asset-card-header" style="justify-content: space-between;">
          <div style="display: flex; gap: 12px; align-items: center;">
            <div class="asset-card-icon emas"><span class="material-icons-round">diamond</span></div>
            <div>
              <div class="asset-card-title">Investasi Emas</div>
              <div class="asset-card-subtitle">BSI Gold & Tring</div>
            </div>
          </div>
          <button class="btn btn-secondary" style="padding: 8px; border-radius: 50%; width: 36px; height: 36px;" id="btn-edit-emas-trigger">
            <span class="material-icons-round" style="font-size: 18px;">edit</span>
          </button>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
          <div style="background: var(--tertiary-container); border-radius: var(--radius-md); padding: 12px;">
            <div style="font-size: 11px; font-weight: 600; color: var(--on-tertiary-container);">BSI Gold</div>
            <div style="font-size: 1.1rem; font-weight: 800; color: var(--tertiary); margin-top: 4px;">${s.bsi_gram}g</div>
            <div style="font-size: 12px; color: var(--on-tertiary-container); opacity: 0.8;">${m(s.bsi_gram*s.price_per_gram,!0)}</div>
          </div>
          <div style="background: var(--tertiary-container); border-radius: var(--radius-md); padding: 12px;">
            <div style="font-size: 11px; font-weight: 600; color: var(--on-tertiary-container);">Tring</div>
            <div style="font-size: 1.1rem; font-weight: 800; color: var(--tertiary); margin-top: 4px;">${s.tring_gram}g</div>
            <div style="font-size: 12px; color: var(--on-tertiary-container); opacity: 0.8;">${m(s.tring_gram*s.price_per_gram,!0)}</div>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 12px; border-top: 1px solid var(--outline-variant);">
          <div>
            <div style="font-size: 12px; color: var(--on-surface-variant);">Total Emas</div>
            <div style="font-size: 1.25rem; font-weight: 800; color: var(--tertiary);">${i}g</div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 12px; color: var(--on-surface-variant);">Nilai Pasar</div>
            <div style="font-size: 1.25rem; font-weight: 800; color: var(--tertiary);">${m(o)}</div>
          </div>
        </div>
      </div>

      <!-- KPR Section -->
      <div class="asset-card" id="asset-kpr">
        <div class="asset-card-header" style="justify-content: space-between;">
          <div style="display: flex; gap: 12px; align-items: center;">
            <div class="asset-card-icon kpr"><span class="material-icons-round">home</span></div>
            <div>
              <div class="asset-card-title">KPR ${r.bank||"BTN"}</div>
              <div class="asset-card-subtitle">Kredit Pemilikan Rumah</div>
            </div>
          </div>
          <button class="btn btn-secondary" style="padding: 8px; border-radius: 50%; width: 36px; height: 36px;" id="btn-edit-kpr-trigger">
            <span class="material-icons-round" style="font-size: 18px;">edit</span>
          </button>
        </div>

        <div style="text-align: center; margin-bottom: 16px;">
          <div style="position: relative; width: 120px; height: 120px; margin: 0 auto;">
            <svg width="120" height="120" viewBox="0 0 120 120" style="transform: rotate(-90deg);">
              <circle cx="60" cy="60" r="50" fill="none" stroke="var(--outline-variant)" stroke-width="8" opacity="0.3" />
              <circle cx="60" cy="60" r="50" fill="none" stroke="var(--primary)" stroke-width="8"
                stroke-dasharray="${2*Math.PI*50}"
                stroke-dashoffset="${2*Math.PI*50*(1-l/100)}"
                stroke-linecap="round" />
            </svg>
            <div style="position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center;">
              <div style="font-size: 1.5rem; font-weight: 800; color: var(--primary);">${l}%</div>
            </div>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px;">
          <div style="background: var(--surface-container); border-radius: var(--radius-md); padding: 12px;">
            <div style="font-size: 11px; color: var(--on-surface-variant);">Sudah Bayar</div>
            <div style="font-size: 14px; font-weight: 800; color: var(--success);">${m(r.paid,!0)}</div>
          </div>
          <div style="background: var(--surface-container); border-radius: var(--radius-md); padding: 12px;">
            <div style="font-size: 11px; color: var(--on-surface-variant);">Iuran/Bulan</div>
            <div style="font-size: 14px; font-weight: 800; color: var(--on-surface);">${m(r.monthly,!0)}</div>
          </div>
        </div>
        
        <button class="btn btn-primary btn-block btn-pay-monthly" data-type="kpr" style="background: var(--primary-container); color: var(--on-primary-container);">
          <span class="material-icons-round">check_circle</span>
          Bayar Cicilan Bulan Ini
        </button>
      </div>

      <!-- Arisan Section -->
      <div class="asset-card" id="asset-arisan">
        <div class="asset-card-header" style="justify-content: space-between;">
          <div style="display: flex; gap: 12px; align-items: center;">
            <div class="asset-card-icon arisan"><span class="material-icons-round">groups</span></div>
            <div>
              <div class="asset-card-title">Arisan</div>
              <div class="asset-card-subtitle">${p.length} kelompok aktif</div>
            </div>
          </div>
          <button class="btn btn-secondary" style="padding: 8px; border-radius: 50%; width: 36px; height: 36px;" id="btn-add-arisan">
            <span class="material-icons-round" style="font-size: 18px;">add</span>
          </button>
        </div>

        ${p.map(u=>`
          <div style="background: var(--surface-container); border-radius: var(--radius-md); padding: 12px; margin-bottom: 8px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <div style="font-weight: 700;">${u.name}</div>
              <div style="display: flex; gap: 4px;">
                <button class="btn-edit-arisan" data-id="${u.id}" style="padding: 4px; background: none; border: none; color: var(--primary);"><span class="material-icons-round" style="font-size: 18px;">edit</span></button>
                <button class="btn-delete-arisan" data-id="${u.id}" style="padding: 4px; background: none; border: none; color: var(--error);"><span class="material-icons-round" style="font-size: 18px;">delete</span></button>
              </div>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 8px;">
               <span>Iuran: <b>${m(u.monthly_amount,!0)}</b></span>
               <span>Putaran: <b>${u.current_round}/${u.total_members}</b></span>
            </div>
            <button class="btn btn-block btn-pay-monthly" data-type="arisan" data-id="${u.id}" style="font-size: 12px; padding: 6px; border: 1px dashed var(--primary); color: var(--primary); background: none;">
              Bayar Iuran
            </button>
          </div>
        `).join("")}
      </div>

      <!-- Custom Assets Section -->
      ${d.length>0?`
        <div class="section-header" style="margin-top: 24px;">
          <h2 class="section-title">Aset Lain & Cicilan</h2>
        </div>
        ${d.map(u=>`
          <div class="asset-card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
               <div style="font-weight: 800;">${u.name}</div>
               <button class="btn-delete-custom" data-id="${u.id}" style="color: var(--error); background: none; border: none;"><span class="material-icons-round">delete</span></button>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px;">
              <div style="background: var(--surface-container); padding: 10px; border-radius: var(--radius-sm);">
                <div style="font-size: 10px; opacity: 0.6;">Nilai/Plafon</div>
                <div style="font-weight: 700;">${m(u.total_value||u.total_loan,!0)}</div>
              </div>
              <div style="background: var(--surface-container); padding: 10px; border-radius: var(--radius-sm);">
                <div style="font-size: 10px; opacity: 0.6;">Terbayar</div>
                <div style="font-weight: 700;">${m(u.paid||0,!0)}</div>
              </div>
            </div>
            <button class="btn btn-block btn-pay-monthly" data-type="custom" data-id="${u.id}" style="font-size: 12px; padding: 8px; background: var(--tertiary-container); color: var(--on-tertiary-container);">
              Bayar Cicilan (${m(u.monthly_amount||0,!0)})
            </button>
          </div>
        `).join("")}
      `:""}

      <!-- Modals Layer -->
      <div class="modal-backdrop" id="asset-modal-backdrop"></div>
      
      <!-- Account Picker for Monthly Payment -->
      <div class="modal-sheet" id="pick-acc-sheet">
        <div class="modal-handle"></div>
        <div class="modal-content">
           <h2 class="modal-title">Pilih Rekening Pembayar</h2>
           <p style="font-size: 13px; color: var(--on-surface-variant); margin-bottom: 16px;">
             Uang akan dipotong dari saldo rekening yang dipilih.
           </p>
           <div id="acc-picker-list" style="display: flex; flex-direction: column; gap: 8px;"></div>
           <input type="hidden" id="pending-pay-type" />
           <input type="hidden" id="pending-pay-id" />
        </div>
      </div>

      <!-- Add General Asset Modal -->
      <div class="modal-sheet" id="gen-asset-sheet">
         <div class="modal-handle"></div>
         <div class="modal-content">
            <h2 class="modal-title">Tambah Aset / Cicilan</h2>
            <form id="form-add-gen-asset">
               <div class="form-group">
                 <label class="form-label">Nama Aset (Misal: Tanah, Laptop)</label>
                 <input type="text" class="form-input" id="gen-asset-name" required />
               </div>
               <div class="form-group">
                 <label class="form-label">Nilai Total / Plafon Hutang</label>
                 <input type="number" class="form-input" id="gen-asset-total" required />
               </div>
               <div class="form-group">
                 <label class="form-label">Cicilan per Bulan (Opsional)</label>
                 <input type="number" class="form-input" id="gen-asset-monthly" placeholder="Kosongkan jika bukan cicilan" />
               </div>
               <button type="submit" class="btn btn-primary btn-block">Tambahkan Aset</button>
            </form>
         </div>
      </div>

      <!-- Edit Emas Modal -->
      <div class="modal-sheet" id="modal-edit-emas">
        <div class="modal-handle"></div>
        <div class="modal-content">
          <h2 class="modal-title">Edit Investasi Emas</h2>
          <form id="form-emas">
            <div class="form-group">
              <label class="form-label">Tabungan Emas BSI (gram)</label>
              <input type="number" step="0.01" class="form-input" id="emas-bsi" value="${s.bsi_gram}" />
            </div>
            <div class="form-group">
              <label class="form-label">Emas Tring/Fisik (gram)</label>
              <input type="number" step="0.01" class="form-input" id="emas-tring" value="${s.tring_gram}" />
            </div>
            <div class="form-group">
              <label class="form-label">Harga Emas Saat Ini (Rp/gram)</label>
              <input type="number" class="form-input" id="emas-price" value="${s.price_per_gram}" />
            </div>
            <button type="submit" class="btn btn-primary btn-block">Simpan Perubahan</button>
          </form>
        </div>
      </div>

      <!-- Edit KPR Modal -->
      <div class="modal-sheet" id="modal-edit-kpr">
        <div class="modal-handle"></div>
        <div class="modal-content">
          <h2 class="modal-title">Update Status KPR</h2>
          <form id="form-kpr">
            <div class="form-group">
              <label class="form-label">Nama Bank</label>
              <input type="text" class="form-input" id="kpr-bank" value="${r.bank}" />
            </div>
            <div class="form-group">
              <label class="form-label">Total Harga Rumah / Plafon</label>
              <input type="number" class="form-input" id="kpr-total" value="${r.total}" />
            </div>
            <div class="form-group">
              <label class="form-label">Sudah Terbayar</label>
              <input type="number" class="form-input" id="kpr-paid" value="${r.paid}" />
            </div>
            <div class="form-group">
              <label class="form-label">Cicilan per Bulan</label>
              <input type="number" class="form-input" id="kpr-monthly" value="${r.monthly}" />
            </div>
            <div class="form-group">
              <label class="form-label">Sisa Tenor (Bulan)</label>
              <input type="number" class="form-input" id="kpr-months" value="${r.remaining_months}" />
            </div>
            <button type="submit" class="btn btn-primary btn-block">Simpan Perubahan</button>
          </form>
        </div>
      </div>

      <!-- Modal Arisan -->
      <div class="modal-sheet" id="modal-edit-arisan">
        <div class="modal-handle"></div>
        <div class="modal-content">
          <h2 class="modal-title" id="arisan-modal-title">Arisan</h2>
          <form id="form-arisan">
            <input type="hidden" id="arisan-id" />
            <div class="form-group">
              <label class="form-label">Nama Kelompok Arisan</label>
              <input type="text" class="form-input" id="arisan-name" required />
            </div>
            <div class="form-group">
              <label class="form-label">Iuran Bulanan (Rp)</label>
              <input type="number" class="form-input" id="arisan-amount" required />
            </div>
            <div class="form-group">
              <label class="form-label">Total Anggota</label>
              <input type="number" class="form-input" id="arisan-members" required />
            </div>
            <div class="form-group">
              <label class="form-label">Urutan Saya</label>
              <input type="number" class="form-input" id="arisan-turn" required />
            </div>
            <div class="form-group">
              <label class="form-label">Putaran Saat Ini</label>
              <input type="number" class="form-input" id="arisan-round" value="1" />
            </div>
            <button type="submit" class="btn btn-primary btn-block">Simpan Arisan</button>
          </form>
        </div>
      </div>
    </div>
  `}function qe(){var t,n,s,i,o,r,l,p;const a=document.getElementById("asset-modal-backdrop"),e=()=>{a==null||a.classList.remove("open"),document.querySelectorAll(".modal-sheet").forEach(d=>d.classList.remove("open"))};a==null||a.addEventListener("click",e),(t=document.getElementById("btn-show-add-asset"))==null||t.addEventListener("click",()=>{var d;a.classList.add("open"),(d=document.getElementById("gen-asset-sheet"))==null||d.classList.add("open")}),(n=document.getElementById("btn-edit-emas-trigger"))==null||n.addEventListener("click",()=>{var d;a.classList.add("open"),(d=document.getElementById("modal-edit-emas"))==null||d.classList.add("open")}),(s=document.getElementById("btn-edit-kpr-trigger"))==null||s.addEventListener("click",()=>{var d;a.classList.add("open"),(d=document.getElementById("modal-edit-kpr"))==null||d.classList.add("open")}),(i=document.getElementById("btn-add-arisan"))==null||i.addEventListener("click",()=>{var d;document.getElementById("form-arisan").reset(),document.getElementById("arisan-id").value="",a.classList.add("open"),(d=document.getElementById("modal-edit-arisan"))==null||d.classList.add("open")}),document.querySelectorAll(".btn-pay-monthly").forEach(d=>{d.addEventListener("click",()=>{var h;const u=d.dataset.type,g=d.dataset.id||"";document.getElementById("pending-pay-type").value=u,document.getElementById("pending-pay-id").value=g;const f=c.getAccounts(),v=document.getElementById("acc-picker-list");v.innerHTML=f.map(y=>`
        <div class="card acc-pick-item" data-acc-id="${y.id}" style="display: flex; justify-content: space-between; align-items: center; padding: 12px; cursor: pointer;">
          <div>
            <div style="font-weight: 700;">${y.bank_name}</div>
            <div style="font-size: 11px; opacity: 0.6;">${y.owner_name}</div>
          </div>
          <div style="font-weight: 800; color: var(--primary);">${m(y.balance,!0)}</div>
        </div>
      `).join(""),document.querySelectorAll(".acc-pick-item").forEach(y=>{y.onclick=()=>{const _=parseInt(y.dataset.accId),w=document.getElementById("pending-pay-type").value,E=document.getElementById("pending-pay-id").value;c.payAssetMonthly(w,E,_),I("✅ Pembayaran berhasil dicatat!","success"),e(),window.dispatchEvent(new CustomEvent("data-updated"))}}),a.classList.add("open"),(h=document.getElementById("pick-acc-sheet"))==null||h.classList.add("open")})}),(o=document.getElementById("form-emas"))==null||o.addEventListener("submit",d=>{d.preventDefault(),c.updateEmas({bsi_gram:parseFloat(document.getElementById("emas-bsi").value||0),tring_gram:parseFloat(document.getElementById("emas-tring").value||0),price_per_gram:parseInt(document.getElementById("emas-price").value||0)}),window.dispatchEvent(new CustomEvent("data-updated")),e()}),(r=document.getElementById("form-kpr"))==null||r.addEventListener("submit",d=>{d.preventDefault(),c.updateKPR({bank:document.getElementById("kpr-bank").value,total:parseInt(document.getElementById("kpr-total").value||0),paid:parseInt(document.getElementById("kpr-paid").value||0),monthly:parseInt(document.getElementById("kpr-monthly").value||0),remaining_months:parseInt(document.getElementById("kpr-months").value||0)}),window.dispatchEvent(new CustomEvent("data-updated")),e()}),(l=document.getElementById("form-add-gen-asset"))==null||l.addEventListener("submit",d=>{d.preventDefault(),c.addCustomAsset({name:document.getElementById("gen-asset-name").value,total_value:parseInt(document.getElementById("gen-asset-total").value),monthly_amount:parseInt(document.getElementById("gen-asset-monthly").value||0),paid:0}),window.dispatchEvent(new CustomEvent("data-updated")),e()}),document.querySelectorAll(".btn-edit-arisan").forEach(d=>{d.addEventListener("click",()=>{const u=d.dataset.id,g=c.getAssets().arisan.find(f=>f.id===u);g&&(document.getElementById("arisan-id").value=g.id,document.getElementById("arisan-name").value=g.name,document.getElementById("arisan-amount").value=g.monthly_amount,document.getElementById("arisan-members").value=g.total_members,document.getElementById("arisan-turn").value=g.my_turn,document.getElementById("arisan-round").value=g.current_round,a.classList.add("open"),document.getElementById("modal-edit-arisan").classList.add("open"))})}),document.querySelectorAll(".btn-delete-arisan").forEach(d=>{d.addEventListener("click",()=>{confirm("Hapus arisan ini?")&&(c.deleteArisan(d.dataset.id),window.dispatchEvent(new CustomEvent("data-updated")))})}),(p=document.getElementById("form-arisan"))==null||p.addEventListener("submit",d=>{d.preventDefault();const u=document.getElementById("arisan-id").value,g={name:document.getElementById("arisan-name").value,monthly_amount:parseInt(document.getElementById("arisan-amount").value),total_members:parseInt(document.getElementById("arisan-members").value),my_turn:parseInt(document.getElementById("arisan-turn").value),current_round:parseInt(document.getElementById("arisan-round").value),is_active:!0};u?c.updateArisan(u,g):c.addArisan(g),window.dispatchEvent(new CustomEvent("data-updated")),e()}),document.querySelectorAll(".btn-delete-custom").forEach(d=>{d.addEventListener("click",()=>{confirm("Hapus aset kustom ini?")&&(c.deleteCustomAsset(d.dataset.id),window.dispatchEvent(new CustomEvent("data-updated")))})})}function Ge(){c.getState();const a=new Date,e=He();return`
    <div class="page-container animate-fade-in" id="insights-page">
      <h1 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 4px;">
        <span class="material-icons-round" style="vertical-align: middle; color: var(--primary); font-size: 28px;">auto_awesome</span>
        AI Insight
      </h1>
      <p style="color: var(--on-surface-variant); font-size: var(--fs-body); margin-bottom: 20px;">
        Analisis keuangan cerdas untuk ${z()} ${a.getFullYear()}
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
        <h2 class="section-title">Snapshot 50 / 30 / 20</h2>
      </div>
      
      ${Je()}

      <div class="section-header" style="margin-top: 24px;">
        <h2 class="section-title">Pola Pengeluaran</h2>
      </div>

      ${Ue()}

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
  `}function He(){const a=new Date,e=c.getState(),n=c.getTransactionsByMonth(a.getFullYear(),a.getMonth()).filter(v=>v.type==="expense"),s=n.reduce((v,h)=>v+h.amount,0),i=e.settings.allowanceBudget||15e5,o=c.getAllowanceSpent(),r=[],l=Math.round(o/i*100);l>=80?r.push({title:"Budget Alert",icon:"warning",color:"#e53935",message:`Pegangan ${e.settings.userName} sudah mencapai ${l}% budget. Sisa ${m(i-o)} untuk bulan ini.`,detail:`Budget: ${m(i)} | Terpakai: ${m(o)}`}):l>=50&&r.push({title:"Pemantauan Budget",icon:"info",color:"#fb8c00",message:`${e.settings.userName}, pegangan sudah terpakai ${l}%. Masih ada ${m(i-o)} untuk sisa bulan ini.`,detail:null});const p=n.filter(v=>v.parent_category==="Transportasi").reduce((v,h)=>v+h.amount,0);p>0&&r.push({title:"Transportasi",icon:"directions_car",color:"#9a6a1a",message:`Total pengeluaran transportasi bulan ini: ${m(p)}. ${p>5e5?"Cukup tinggi, pertimbangkan efisiensi perjalanan LDM.":"Masih terkendali, pertahankan!"}`,detail:null});const d=5e5,u=n.filter(v=>v.sub_category==="Groceries"||v.parent_category==="Makanan & Minuman").reduce((v,h)=>v+h.amount,0);u<d&&u>0&&r.push({title:"Apresiasi! 🎉",icon:"celebration",color:"#43a047",message:`${e.settings.spouseName}, bulan ini pengeluaran makanan & groceries ${m(u,!0)}. Hemat ${m(d-u,!0)} yang bisa dialokasikan ke investasi emas!`,detail:null});const g=n.filter(v=>v.is_together);if(g.length>0){const v=g.reduce((h,y)=>h+y.amount,0);r.push({title:"Quality Time 💕",icon:"favorite",color:"#e91e63",message:`Bulan ini ada ${g.length} transaksi saat Together Mode aktif, total ${m(v)}. Waktu berkualitas bersama keluarga itu priceless!`,detail:null})}const f=n.filter(v=>v.for_whom==="Anak").reduce((v,h)=>v+h.amount,0);return f>0&&r.push({title:"Keperluan Anak",icon:"child_care",color:"#1565c0",message:`Total pengeluaran untuk anak bulan ini: ${m(f)}. Investasi terbaik adalah pendidikan anak.`,detail:null}),r.push({title:"Ringkasan Bulanan",icon:"summarize",color:"#30609d",message:`Total pengeluaran ${z()}: ${m(s)} dari ${n.length} transaksi. Saya terus memantau dan akan memberikan insight yang lebih akurat seiring bertambahnya data.`,detail:null}),r}function Je(){const a=c.getBudgetPerformance(),e=a.total||1,t=Math.round(a.needs/e*100),n=Math.round(a.wants/e*100),s=Math.round(a.savings/e*100);return`
    <div class="card" style="padding: 20px;">
      <div style="font-size: 13px; color: var(--on-surface-variant); margin-bottom: 20px; text-align: center;">
        Target Ideal: <b style="color: var(--primary);">50%</b> Pokok | <b style="color: var(--tertiary);">30%</b> Keinginan | <b style="color: var(--success);">20%</b> Investasi
      </div>

      <div style="height: 32px; width: 100%; display: flex; border-radius: 16px; overflow: hidden; background: var(--surface-container); margin-bottom: 24px; box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);">
        <div style="width: ${t}%; background: var(--primary); transition: width 1s ease;"></div>
        <div style="width: ${n}%; background: var(--tertiary); transition: width 1s ease;"></div>
        <div style="width: ${s}%; background: var(--success); transition: width 1s ease;"></div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px;">
        <div style="text-align: center;">
          <div style="font-size: 20px; font-weight: 800; color: var(--primary);">${t}%</div>
          <div style="font-size: 11px; font-weight: 700; color: var(--on-surface-variant);">KEBUTUHAN</div>
          <div style="font-size: 10px; color: var(--outline); margin-top: 2px;">${m(a.needs,!0)}</div>
        </div>
        <div style="text-align: center; border-left: 1px solid var(--outline-variant); border-right: 1px solid var(--outline-variant);">
          <div style="font-size: 20px; font-weight: 800; color: var(--tertiary);">${n}%</div>
          <div style="font-size: 11px; font-weight: 700; color: var(--on-surface-variant);">KEINGINAN</div>
          <div style="font-size: 10px; color: var(--outline); margin-top: 2px;">${m(a.wants,!0)}</div>
        </div>
        <div style="text-align: center;">
          <div style="font-size: 20px; font-weight: 800; color: var(--success);">${s}%</div>
          <div style="font-size: 11px; font-weight: 700; color: var(--on-surface-variant);">INVESTASI</div>
          <div style="font-size: 10px; color: var(--outline); margin-top: 2px;">${m(a.savings,!0)}</div>
        </div>
      </div>

      ${n>30?`
        <div style="margin-top: 20px; padding: 12px; background: #fffcf0; border: 1px solid #ffe082; border-radius: var(--radius-md); display: flex; gap: 12px; align-items: flex-start;">
          <span class="material-icons-round" style="color: #f57c00; font-size: 20px;">priority_high</span>
          <div style="font-size: 12px; color: #5d4037; line-height: 1.5;">
            <b>Waspada!</b> Alokasi keinginan Anda (<b>${n}%</b>) sudah melebihi batas ideal 30%. Coba cek jajan di luar atau belanja impulsif bulan ini.
          </div>
        </div>
      `:""}
    </div>
  `}function Ue(){var n;const a=new Date,e=c.getCategorySpending(a.getFullYear(),a.getMonth());if(e.length===0)return'<div style="text-align: center; padding: 20px; color: var(--outline);">Belum ada data</div>';const t=((n=e[0])==null?void 0:n.amount)||1;return`
    <div class="card">
      ${e.map((s,i)=>{const o=Math.round(s.amount/t*100),r=["#30609d","#9a6a1a","#1b6d2f","#ba1a1a","#7b1fa2","#00695c","#e65100","#283593"],l=r[i%r.length];return`
          <div style="margin-bottom: 12px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
              <span style="font-size: 13px; font-weight: 600; color: var(--on-surface);">${s.name}</span>
              <span style="font-size: 13px; font-weight: 700; color: ${l};">${m(s.amount,!0)}</span>
            </div>
            <div style="width: 100%; height: 6px; background: var(--surface-container); border-radius: 3px; overflow: hidden;">
              <div style="width: ${o}%; height: 100%; background: ${l}; border-radius: 3px; transition: width 0.8s ease;"></div>
            </div>
          </div>
        `}).join("")}
    </div>
  `}function Ye(){}function Ve(){const e=c.getState().settings;return`
    <div class="page-container animate-fade-in" id="settings-page">
      <h1 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 4px;">Pengaturan</h1>
      <p style="color: var(--on-surface-variant); font-size: var(--fs-body); margin-bottom: 24px;">
        Sesuaikan budget dan profil keluarga Anda
      </p>

      <form id="settings-form">
        <!-- Personal Info -->
        <div class="card" style="margin-bottom: 20px;">
          <h3 style="margin-bottom: 16px; font-size: 16px; display: flex; align-items: center; gap: 8px;">
            <span class="material-icons-round" style="color: var(--primary);">person</span>
            Profil Keluarga
          </h3>
          <div class="form-group">
            <label class="form-label">Nama Papa</label>
            <input type="text" class="form-input" id="set-user-name" value="${e.userName}" required />
          </div>
          <div class="form-group">
            <label class="form-label">Nama Mama</label>
            <input type="text" class="form-input" id="set-spouse-name" value="${e.spouseName}" required />
          </div>
        </div>

        <!-- Budget Targets -->
        <div class="card" style="margin-bottom: 20px;">
          <h3 style="margin-bottom: 16px; font-size: 16px; display: flex; align-items: center; gap: 8px;">
            <span class="material-icons-round" style="color: var(--tertiary);">track_changes</span>
            Target Budget Bulanan
          </h3>
          
          <div class="form-group">
            <label class="form-label">Budget Uang Harian Papa (Allowance)</label>
            <div style="position: relative;">
               <span style="position: absolute; left: 12px; top: 12px; color: var(--outline);">Rp</span>
               <input type="number" class="form-input" id="set-allowance" value="${e.allowanceBudget}" style="padding-left: 40px;" />
            </div>
            <p style="font-size: 11px; color: var(--on-surface-variant); margin-top: 4px;">Digunakan untuk analisis "Pegangan Papa" di dashboard.</p>
          </div>

          <div class="form-group">
            <label class="form-label">Budget Transportasi (Bensin LDM dll)</label>
            <div style="position: relative;">
               <span style="position: absolute; left: 12px; top: 12px; color: var(--outline);">Rp</span>
               <input type="number" class="form-input" id="set-transport" value="${e.transportBudget}" style="padding-left: 40px;" />
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Budget Keperluan Anak</label>
            <div style="position: relative;">
               <span style="position: absolute; left: 12px; top: 12px; color: var(--outline);">Rp</span>
               <input type="number" class="form-input" id="set-anak" value="${e.anakBudget}" style="padding-left: 40px;" />
            </div>
          </div>
        </div>

        <!-- AI Config -->
        <div class="card" style="margin-bottom: 24px;">
           <h3 style="margin-bottom: 16px; font-size: 16px; display: flex; align-items: center; gap: 8px;">
            <span class="material-icons-round" style="color: #7b1fa2;">psychology</span>
            Konfigurasi AI (Gemini)
          </h3>
          <div class="form-group">
            <label class="form-label">Gemini API Key</label>
            <input type="password" class="form-input" id="set-ai-key" value="${e.geminiApiKey}" placeholder="Masukkan API Key Anda..." />
            <p style="font-size: 11px; color: var(--on-surface-variant); margin-top: 4px;">Key ini disimpan secara lokal di perangkat Anda.</p>
          </div>
        </div>

        <button type="submit" class="btn btn-primary btn-block" style="padding: 16px; font-weight: 700;">
          <span class="material-icons-round">save</span>
          Simpan Perubahan
        </button>
        
        <div style="height: 100px;"></div>
      </form>
    </div>
  `}function We(){const a=document.getElementById("settings-form");a&&a.addEventListener("submit",e=>{e.preventDefault();const t={userName:document.getElementById("set-user-name").value.trim(),spouseName:document.getElementById("set-spouse-name").value.trim(),allowanceBudget:parseInt(document.getElementById("set-allowance").value||0),transportBudget:parseInt(document.getElementById("set-transport").value||0),anakBudget:parseInt(document.getElementById("set-anak").value||0),geminiApiKey:document.getElementById("set-ai-key").value.trim()};c.updateSettings(t),I("✅ Pengaturan berhasil disimpan!"),setTimeout(()=>{window.dispatchEvent(new CustomEvent("data-updated"))},500)})}const Qe=document.getElementById("app"),F={"/":{render:Pe,init:Le},"/transactions":{render:ze,init:Ce},"/accounts":{render:je,init:Ne},"/assets":{render:Oe,init:qe},"/insights":{render:Ge,init:Ye},"/settings":{render:Ve,init:We}};function ne(a){const e=F[a]||F["/"];Qe.innerHTML=`
    ${ce()}
    ${me()}
    ${e.render()}
    ${ve()}
    ${he()}
    ${we()}
  `,ue(),ye(),ke(),Ee(),e.init(),ge(a),window.scrollTo({top:0,behavior:"instant"})}Object.keys(F).forEach(a=>{M.addRoute(a,ne)});window.addEventListener("data-updated",()=>{const a=M.getCurrentPath();ne(a)});function Ze(){re(),M.start()}document.addEventListener("DOMContentLoaded",Ze);
