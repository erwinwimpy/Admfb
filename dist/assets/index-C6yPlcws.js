(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function t(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(s){if(s.ep)return;s.ep=!0;const o=t(s);fetch(s.href,o)}})();class se{constructor(){this.routes={},this.currentRoute=null,window.addEventListener("hashchange",()=>this._onHashChange())}addRoute(e,t){this.routes[e]=t}navigate(e){window.location.hash=e}getCurrentPath(){return window.location.hash.slice(1)||"/"}_onHashChange(){const e=this.getCurrentPath();this._resolve(e)}_resolve(e){const t=this.routes[e]||this.routes["/"];t&&(this.currentRoute=e,t(e))}start(){const e=this.getCurrentPath();this._resolve(e)}}const M=new se,ie=Object.freeze(Object.defineProperty({__proto__:null,default:M,router:M},Symbol.toStringTag,{value:"Module"})),j="cipta_finansial_data",R={family:null,accounts:[],transactions:[],assets:{emas:{bsi_gram:0,tring_gram:0,price_per_gram:165e4},kpr:{total:0,paid:0,monthly:0,bank:"",remaining_months:0},arisan:[]},settings:{togetherMode:!1,allowanceBudget:15e5,userName:"Erwin",spouseName:"Nihad",geminiApiKey:""},categories:[]};class oe{constructor(){this._listeners=[],this._state=this._load()}_load(){try{const e=localStorage.getItem(j);if(e){const t=JSON.parse(e);return{...R,...t}}}catch(e){console.warn("Failed to load state",e)}return{...R}}_save(){try{localStorage.setItem(j,JSON.stringify(this._state))}catch(e){console.warn("Failed to save state",e)}this._notify()}_notify(){this._listeners.forEach(e=>e(this._state))}subscribe(e){return this._listeners.push(e),()=>{this._listeners=this._listeners.filter(t=>t!==e)}}getState(){return this._state}setFamily(e){this._state.family=e,this._save()}updateSettings(e){this._state.settings={...this._state.settings,...e},this._save()}toggleTogetherMode(){return this._state.settings.togetherMode=!this._state.settings.togetherMode,this._save(),this._state.settings.togetherMode}addAccount(e){const n=this._state.accounts.reduce((s,o)=>Math.max(s,o.id||0),0)+1;return this._state.accounts.push({id:n,...e}),this._save(),n}updateAccount(e,t){const n=this._state.accounts.findIndex(s=>s.id===e);n!==-1&&(this._state.accounts[n]={...this._state.accounts[n],...t},this._save())}deleteAccount(e){this._state.accounts=this._state.accounts.filter(t=>t.id!==e),this._save()}getAccounts(){return this._state.accounts}getAccountById(e){return this._state.accounts.find(t=>t.id===e)}addTransaction(e){const t=crypto.randomUUID?crypto.randomUUID():Date.now().toString(36)+Math.random().toString(36).substr(2),n={id:t,created_at:new Date().toISOString(),...e};return this._state.transactions.unshift(n),e.type==="income"?this._updateAccountBalance(e.account_id,e.amount):e.type==="expense"?this._updateAccountBalance(e.account_id,-e.amount):e.type==="transfer"&&(this._updateAccountBalance(e.account_id,-e.amount),e.to_account_id&&this._updateAccountBalance(e.to_account_id,e.amount)),this._save(),t}_updateAccountBalance(e,t){const n=this._state.accounts.find(s=>s.id===e);n&&(n.balance=(n.balance||0)+t)}deleteTransaction(e){const t=this._state.transactions.find(n=>n.id===e);t&&(t.type==="income"?this._updateAccountBalance(t.account_id,-t.amount):t.type==="expense"?this._updateAccountBalance(t.account_id,t.amount):t.type==="transfer"&&(this._updateAccountBalance(t.account_id,t.amount),t.to_account_id&&this._updateAccountBalance(t.to_account_id,-t.amount)),this._state.transactions=this._state.transactions.filter(n=>n.id!==e),this._save())}getTransactions(e={}){let t=[...this._state.transactions];if(e.type&&(t=t.filter(n=>n.type===e.type)),e.paid_by&&(t=t.filter(n=>n.paid_by===e.paid_by)),e.for_whom&&(t=t.filter(n=>n.for_whom===e.for_whom)),e.account_id&&(t=t.filter(n=>n.account_id===e.account_id)),e.parent_category&&(t=t.filter(n=>n.parent_category===e.parent_category)),e.month&&(t=t.filter(n=>{const s=new Date(n.created_at);return s.getMonth()===e.month&&s.getFullYear()===(e.year||new Date().getFullYear())})),e.search){const n=e.search.toLowerCase();t=t.filter(s=>(s.description||"").toLowerCase().includes(n)||(s.parent_category||"").toLowerCase().includes(n)||(s.sub_category||"").toLowerCase().includes(n))}return t}getTransactionsByMonth(e,t){return this._state.transactions.filter(n=>{const s=new Date(n.created_at);return s.getFullYear()===e&&s.getMonth()===t})}updateAssets(e){this._state.assets={...this._state.assets,...e},this._save()}updateEmas(e){this._state.assets.emas={...this._state.assets.emas,...e},this._save()}updateKPR(e){this._state.assets.kpr={...this._state.assets.kpr,...e},this._save()}addArisan(e){const t=Date.now();return this._state.assets.arisan.push({id:t,...e}),this._save(),t}getAssets(){return this._state.assets}getTotalBalance(){return this._state.accounts.reduce((e,t)=>e+(t.balance||0),0)}getMonthlyExpenses(e,t){return this.getTransactionsByMonth(e,t).filter(n=>n.type==="expense").reduce((n,s)=>n+s.amount,0)}getMonthlyIncome(e,t){return this.getTransactionsByMonth(e,t).filter(n=>n.type==="income").reduce((n,s)=>n+s.amount,0)}getAllowanceSpent(){const e=new Date;return this.getTransactionsByMonth(e.getFullYear(),e.getMonth()).filter(t=>t.type==="expense"&&t.paid_by==="Suami").reduce((t,n)=>t+n.amount,0)}getDanaPusatBalance(){return this._state.accounts.filter(e=>e.owner_name==="Istri"||e.owner_name==="Bersama").reduce((e,t)=>e+(t.balance||0),0)}getNetWorth(){const e=this.getTotalBalance(),t=this._state.assets.emas,n=(t.bsi_gram+t.tring_gram)*t.price_per_gram,s=this._state.assets.kpr.paid;return e+n+s}getCategorySpending(e,t){const n=this.getTransactionsByMonth(e,t).filter(o=>o.type==="expense"),s={};return n.forEach(o=>{const i=o.parent_category||"Lainnya";s[i]=(s[i]||0)+o.amount}),Object.entries(s).map(([o,i])=>({name:o,amount:i})).sort((o,i)=>i.amount-o.amount)}reset(){this._state=JSON.parse(JSON.stringify(R)),localStorage.removeItem(j),this._notify()}}const d=new oe,G=5;function re(){const a=localStorage.getItem("cipta_seed_version");a&&parseInt(a)>=G||(d.reset(),d.setFamily({id:"family-001",family_name:"Adam Family",papa:"Erwin",mama:"Nihad",anak:"Adam",created_at:new Date().toISOString()}),d.updateSettings({userName:"Erwin",spouseName:"Nihad",allowanceBudget:15e5}),d.addAccount({bank_name:"BRI",owner_name:"Erwin",balance:0,is_allowance_account:!1,css_class:"bri"}),d.addAccount({bank_name:"Bank Jago",owner_name:"Bersama",balance:0,is_allowance_account:!0,css_class:"jago"}),d.addAccount({bank_name:"BSI",owner_name:"Nihad",balance:0,is_allowance_account:!1,css_class:"bsi"}),d.addAccount({bank_name:"Dompet Tunai Erwin",owner_name:"Erwin",balance:0,is_allowance_account:!0,css_class:"tunai"}),d.addAccount({bank_name:"Dompet Tunai Nihad",owner_name:"Nihad",balance:0,is_allowance_account:!0,css_class:"tunai"}),d.updateEmas({bsi_gram:0,tring_gram:0,price_per_gram:165e4}),d.updateKPR({total:0,paid:0,monthly:0,bank:"-",remaining_months:0}),localStorage.setItem("cipta_seed_version",G.toString()),console.log("Final Application Seeded Successfully."))}const le="modulepreload",de=function(a){return"/Admfb/"+a},H={},z=function(e,t,n){let s=Promise.resolve();if(t&&t.length>0){let i=function(c){return Promise.all(c.map(u=>Promise.resolve(u).then(m=>({status:"fulfilled",value:m}),m=>({status:"rejected",reason:m}))))};document.getElementsByTagName("link");const r=document.querySelector("meta[property=csp-nonce]"),l=(r==null?void 0:r.nonce)||(r==null?void 0:r.getAttribute("nonce"));s=i(t.map(c=>{if(c=de(c),c in H)return;H[c]=!0;const u=c.endsWith(".css"),m=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${m}`))return;const y=document.createElement("link");if(y.rel=u?"stylesheet":le,u||(y.as="script"),y.crossOrigin="",y.href=c,l&&y.setAttribute("nonce",l),document.head.appendChild(y),u)return new Promise((b,g)=>{y.addEventListener("load",b),y.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${c}`)))})}))}function o(i){const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=i,window.dispatchEvent(r),!r.defaultPrevented)throw i}return s.then(i=>{for(const r of i||[])r.status==="rejected"&&o(r.reason);return e().catch(o)})};function ce(){const a=d.getState(),e=a.settings.togetherMode;return`
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
  `}function ue(){const a=document.getElementById("together-toggle");a&&a.addEventListener("click",()=>{const t=d.toggleTogetherMode();a.classList.toggle("active",t);const n=a.querySelector(".together-toggle-icon"),s=a.querySelector(".together-toggle-label");n.textContent=t?"favorite":"favorite_border",s.textContent=t?"Together!":"Together",z(async()=>{const{showToast:o}=await Promise.resolve().then(()=>J);return{showToast:o}},void 0).then(({showToast:o})=>{o(t?"💕 Together Mode Aktif!":"Together Mode Nonaktif","info")})});const e=document.getElementById("profile-avatar");e&&e.addEventListener("click",()=>{const n=d.getState().settings.userName||"Erwin",s=n==="Erwin"?"Bunda":"Erwin";confirm(`Ganti sesi dari ${n} ke ${s}?`)&&(d.updateSettings({userName:s}),window.dispatchEvent(new Event("data-updated")),z(async()=>{const{showToast:o}=await Promise.resolve().then(()=>J);return{showToast:o}},void 0).then(({showToast:o})=>{o(`Berhasil login sebagai ${s}`,"success")}))})}const pe=[{path:"/",icon:"dashboard",label:"Beranda"},{path:"/transactions",icon:"receipt_long",label:"Transaksi"},{path:"/accounts",icon:"account_balance_wallet",label:"Rekening"},{path:"/assets",icon:"diamond",label:"Aset"},{path:"/insights",icon:"auto_awesome",label:"AI Insight"}];function me(){const a=M.getCurrentPath();return`
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
  `}function ye(){var s,o,i,r;const a=document.getElementById("fab-main"),e=document.getElementById("fab-actions");let t=!1;a&&a.addEventListener("click",()=>{t=!t,a.classList.toggle("open",t),e.classList.toggle("open",t)}),document.addEventListener("click",l=>{t&&!l.target.closest("#fab-container")&&(t=!1,a==null||a.classList.remove("open"),e==null||e.classList.remove("open"))}),(s=document.getElementById("fab-expense"))==null||s.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("open-transaction-modal",{detail:{type:"expense"}})),n()}),(o=document.getElementById("fab-income"))==null||o.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("open-transaction-modal",{detail:{type:"income"}})),n()}),(i=document.getElementById("fab-transfer"))==null||i.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("open-transaction-modal",{detail:{type:"transfer"}})),n()}),(r=document.getElementById("fab-scan"))==null||r.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("open-scan-modal")),n()});function n(){t=!1,a==null||a.classList.remove("open"),e==null||e.classList.remove("open")}}const C=[{name:"Makanan & Minuman",icon:"restaurant",subs:["Makan Harian","Makan di Luar","Cemilan","Kopi & Minuman","Groceries"]},{name:"Transportasi",icon:"directions_car",subs:["Bensin LDM","Bensin Harian","Parkir","Tol","Servis Kendaraan","Ojol / Grab"]},{name:"Rumah Tangga",icon:"home",subs:["Listrik","Air PDAM","Internet","Gas LPG","Perabot","Kebersihan"]},{name:"Pendidikan Anak",icon:"school",subs:["SPP","Buku & Alat Tulis","Les/Kursus","Seragam","Uang Jajan"]},{name:"Kesehatan",icon:"local_hospital",subs:["Obat","Dokter","Vitamin","BPJS Tambahan"]},{name:"Pakaian & Fashion",icon:"checkroom",subs:["Pakaian","Sepatu","Aksesoris"]},{name:"Hiburan",icon:"celebration",subs:["Jalan-jalan","Quality Time","Film","Langganan Digital","Hobi"]},{name:"Sosial & Ibadah",icon:"volunteer_activism",subs:["Sedekah","Zakat","Sumbangan","Hajatan","Arisan"]},{name:"Investasi",icon:"trending_up",subs:["Emas BSI","Emas Tring","Tabungan","Deposito"]},{name:"Cicilan",icon:"account_balance",subs:["KPR","Kredit Motor","Pinjaman"]},{name:"Gaji & Pendapatan",icon:"payments",subs:["Gaji Pokok","Tunjangan Kinerja","TPP","Penghasilan Lain","Arisan Masuk"]},{name:"Lainnya",icon:"more_horiz",subs:["Tak Terduga","Donasi","Lain-lain"]}];function fe(a){const e=C.find(t=>t.name===a);return e?e.icon:"receipt_long"}function be(a){const e=C.find(t=>t.name===a);return e?e.subs:[]}function p(a,e=!1){return e&&Math.abs(a)>=1e6?"Rp "+(a/1e6).toFixed(1).replace(".0","")+" jt":e&&Math.abs(a)>=1e3?"Rp "+(a/1e3).toFixed(0)+" rb":new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",minimumFractionDigits:0,maximumFractionDigits:0}).format(a)}function X(a,e="long"){const t=new Date(a),n=["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"],s=["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"],o=["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];if(e==="short")return`${t.getDate()} ${n[t.getMonth()]}`;if(e==="long")return`${o[t.getDay()]}, ${t.getDate()} ${s[t.getMonth()]} ${t.getFullYear()}`;if(e==="time")return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`;if(e==="relative"){const r=new Date-t,l=Math.floor(r/6e4);if(l<1)return"Baru saja";if(l<60)return`${l} menit lalu`;const c=Math.floor(l/60);if(c<24)return`${c} jam lalu`;const u=Math.floor(c/24);return u===1?"Kemarin":u<7?`${u} hari lalu`:`${t.getDate()} ${n[t.getMonth()]}`}if(e==="group"){const i=new Date,r=new Date(i);return r.setDate(r.getDate()-1),t.toDateString()===i.toDateString()?"Hari Ini":t.toDateString()===r.toDateString()?"Kemarin":`${o[t.getDay()]}, ${t.getDate()} ${n[t.getMonth()]}`}return t.toLocaleDateString("id-ID")}function D(){return["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"][new Date().getMonth()]}function ee(a){const e={};return a.forEach(t=>{const n=X(t.created_at,"group");e[n]||(e[n]=[]),e[n].push(t)}),e}function S(a,e="info"){let t=document.querySelector(".toast-container");t||(t=document.createElement("div"),t.className="toast-container",document.body.appendChild(t));const n=document.createElement("div");n.className=`toast toast-${e}`,n.textContent=a,t.appendChild(n),setTimeout(()=>n.remove(),3e3)}function te(a,e=300){let t;return(...n)=>{clearTimeout(t),t=setTimeout(()=>a(...n),e)}}function P(a,e){return e?Math.min(Math.round(a/e*100),100):0}const J=Object.freeze(Object.defineProperty({__proto__:null,debounce:te,formatDate:X,formatRupiah:p,getCurrentMonthName:D,groupByDate:ee,percentage:P,showToast:S},Symbol.toStringTag,{value:"Module"}));function he(){const a=d.getAccounts(),e=d.getState();return`
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
                ${C.map(t=>`<option value="${t.name}">${t.name}</option>`).join("")}
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
  `}function ke(){var t;const a=document.getElementById("tx-modal-backdrop");document.getElementById("tx-modal-sheet");const e=document.getElementById("tx-form");window.addEventListener("open-transaction-modal",n=>{var s;xe(((s=n.detail)==null?void 0:s.type)||"expense")}),a==null||a.addEventListener("click",U),document.querySelectorAll("#tx-type-chips .chip").forEach(n=>{n.addEventListener("click",()=>{document.querySelectorAll("#tx-type-chips .chip").forEach(r=>r.classList.remove("selected")),n.classList.add("selected");const s=n.dataset.type,o=document.getElementById("tx-to-account-group"),i=document.getElementById("tx-category-row");o&&(o.style.display=s==="transfer"?"":"none"),i&&(i.style.display=s==="transfer"?"none":"")})}),document.querySelectorAll("#tx-paid-by-chips .chip").forEach(n=>{n.addEventListener("click",()=>{document.querySelectorAll("#tx-paid-by-chips .chip").forEach(s=>s.classList.remove("selected")),n.classList.add("selected")})}),document.querySelectorAll("#tx-for-whom-chips .chip").forEach(n=>{n.addEventListener("click",()=>{document.querySelectorAll("#tx-for-whom-chips .chip").forEach(s=>s.classList.remove("selected")),n.classList.add("selected")})}),(t=document.getElementById("tx-category"))==null||t.addEventListener("change",n=>{const s=be(n.target.value),o=document.getElementById("tx-subcategory");o&&(o.innerHTML='<option value="">Pilih Sub-Kategori</option>'+s.map(i=>`<option value="${i}">${i}</option>`).join(""))}),e==null||e.addEventListener("submit",n=>{var f,_,w,E,v,h,I,k,A,B;n.preventDefault();const s=((f=document.querySelector("#tx-type-chips .chip.selected"))==null?void 0:f.dataset.type)||"expense",o=parseFloat(((_=document.getElementById("tx-amount"))==null?void 0:_.value)||0),i=((w=document.getElementById("tx-description"))==null?void 0:w.value)||"",r=parseInt((E=document.getElementById("tx-account"))==null?void 0:E.value),l=s==="transfer"?parseInt((v=document.getElementById("tx-to-account"))==null?void 0:v.value):null,c=((h=document.getElementById("tx-category"))==null?void 0:h.value)||"",u=((I=document.getElementById("tx-subcategory"))==null?void 0:I.value)||"",m=((k=document.querySelector("#tx-paid-by-chips .chip.selected"))==null?void 0:k.dataset.value)||"Suami",y=((A=document.querySelector("#tx-for-whom-chips .chip.selected"))==null?void 0:A.dataset.value)||"Bersama",b=(B=document.getElementById("tx-date"))==null?void 0:B.value,g=b?new Date(b).toISOString():new Date().toISOString(),x=d.getState();if(!o||o<=0){S("Masukkan nominal yang valid","error");return}d.addTransaction({account_id:r,to_account_id:l,amount:o,type:s,description:i,parent_category:s==="transfer"?"Transfer":c,sub_category:s==="transfer"?"Pindah Buku":u,paid_by:m,for_whom:y,is_together:x.settings.togetherMode,created_at:g}),S("✅ Transaksi berhasil disimpan!"),U(),window.dispatchEvent(new CustomEvent("data-updated"))})}function xe(a="expense"){var l;const e=document.getElementById("tx-modal-backdrop"),t=document.getElementById("tx-modal-sheet"),n=document.getElementById("tx-modal-title");(l=document.getElementById("tx-form"))==null||l.reset(),document.getElementById("tx-date").value=new Date().toISOString().slice(0,16),document.querySelectorAll("#tx-type-chips .chip").forEach(c=>{c.classList.toggle("selected",c.dataset.type===a)});const s=document.getElementById("tx-to-account-group"),o=document.getElementById("tx-category-row");s&&(s.style.display=a==="transfer"?"":"none"),o&&(o.style.display=a==="transfer"?"none":""),d.getState().settings.togetherMode&&(document.querySelectorAll("#tx-paid-by-chips .chip").forEach(c=>{c.classList.toggle("selected",c.dataset.value==="Istri")}),document.querySelectorAll("#tx-for-whom-chips .chip").forEach(c=>{c.classList.toggle("selected",c.dataset.value==="Bersama")}));const r={expense:"Tambah Pengeluaran",income:"Tambah Pemasukan",transfer:"Transfer Antar Rekening"};n&&(n.textContent=r[a]||"Tambah Transaksi"),e==null||e.classList.add("open"),t==null||t.classList.add("open")}function U(){var a,e;(a=document.getElementById("tx-modal-backdrop"))==null||a.classList.remove("open"),(e=document.getElementById("tx-modal-sheet"))==null||e.classList.remove("open")}function we(){return`
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
  `}let T=[];function Ee(){var b,g,x;const a=document.getElementById("scan-modal-backdrop"),e=document.getElementById("scan-modal-sheet"),t=document.getElementById("scan-upload-area"),n=document.getElementById("scan-file-input"),s=document.getElementById("tab-text"),o=document.getElementById("tab-scan"),i=document.getElementById("panel-text"),r=document.getElementById("panel-scan"),l=document.getElementById("ai-key-config"),c=document.getElementById("ai-main-app"),u=document.getElementById("btn-save-key"),m=document.getElementById("ai-key-input");function y(){d.getState().settings.geminiApiKey?(l.style.display="none",c.style.display="block"):(l.style.display="block",c.style.display="none")}u==null||u.addEventListener("click",()=>{const f=m.value.trim();if(!f){S("API Key tidak boleh kosong","error");return}d.updateSettings({geminiApiKey:f}),S("API Key Berhasil Disimpan"),y()}),(b=document.getElementById("btn-force-config"))==null||b.addEventListener("click",()=>{l.style.display="block",c.style.display="none",m.value=d.getState().settings.geminiApiKey||"",m.focus()}),s==null||s.addEventListener("click",()=>{i.style.display="block",r.style.display="none",s.style.background="var(--primary-container)",s.style.color="var(--primary)",s.style.borderColor="var(--primary)",o.style.background="transparent",o.style.color="var(--on-surface-variant)",o.style.borderColor="transparent"}),o==null||o.addEventListener("click",()=>{i.style.display="none",r.style.display="block",o.style.background="var(--primary-container)",o.style.color="var(--primary)",o.style.borderColor="var(--primary)",s.style.background="transparent",s.style.color="var(--on-surface-variant)",s.style.borderColor="transparent"}),window.addEventListener("open-scan-modal",()=>{a==null||a.classList.add("open"),e==null||e.classList.add("open"),y(),Y()}),a==null||a.addEventListener("click",()=>{a==null||a.classList.remove("open"),e==null||e.classList.remove("open")}),(g=document.getElementById("btn-analyze-text"))==null||g.addEventListener("click",async()=>{var _,w;const f=(w=(_=document.getElementById("ai-text-input"))==null?void 0:_.value)==null?void 0:w.trim();if(!f){S("Silakan ceritakan pengeluaran Anda dulu","error");return}V();try{await Q(f,null,null)}catch(E){W(E)}}),t==null||t.addEventListener("click",()=>n==null?void 0:n.click()),n==null||n.addEventListener("change",async f=>{var E;const _=(E=f.target.files)==null?void 0:E[0];if(!_)return;V();const w=new FileReader;w.onload=async v=>{let h=v.target.result;try{h=await _e(h)}catch(I){console.warn("Compression failed, using original",I)}document.getElementById("scan-preview-img").src=h,document.getElementById("scan-preview").style.display="block";try{await Q(null,h.split(",")[1],"image/jpeg")}catch(I){W(I)}},w.readAsDataURL(_)}),(x=document.getElementById("scan-save-btn"))==null||x.addEventListener("click",()=>{if(!T||T.length===0)return;const f=d.getAccounts(),w=d.getState().settings.togetherMode;let E=0;T.forEach(v=>{var k;let h=(k=f.find(A=>A.bank_name.toLowerCase().includes("tunai")))==null?void 0:k.id;if(v.account_guess){const A=v.account_guess.toLowerCase(),B=f.find(L=>L.bank_name.toLowerCase().includes(A));B&&(h=B.id)}!h&&f.length>0&&(h=f[0].id);let I=null;if(v.type==="transfer"&&v.to_account_guess){const A=v.to_account_guess.toLowerCase(),B=f.find(L=>L.bank_name.toLowerCase().includes(A));B&&(I=B.id)}d.addTransaction({account_id:h,to_account_id:I,amount:v.amount||0,type:v.type||"expense",description:v.description||"Transaksi AI",parent_category:v.category||"Lainnya",sub_category:v.sub_category||"",paid_by:w?"Nihad":"Erwin",for_whom:w?"Bersama":"Erwin",is_together:w,created_at:v.date?new Date(v.date).toISOString():new Date().toISOString()}),E++}),S(`✅ ${E} transaksi dari AI berhasil disimpan!`),a==null||a.classList.remove("open"),e==null||e.classList.remove("open"),window.dispatchEvent(new CustomEvent("data-updated")),Y()})}function Y(){document.getElementById("scan-preview").style.display="none",document.getElementById("scan-result").style.display="none",document.getElementById("scan-loading").style.display="none",document.getElementById("scan-parsed-data").style.display="none",document.getElementById("scan-save-btn").style.display="none",document.getElementById("ai-text-input").value="",document.getElementById("scan-file-input").value="",T=[]}function V(){document.getElementById("scan-loading").style.display="block",document.getElementById("scan-result").style.display="none";const a=document.getElementById("ai-key-config");a&&(a.style.display="none");const e=document.getElementById("ai-main-app");e&&(e.style.display="block")}function W(a){console.error("AI Error:",a),document.getElementById("scan-loading").style.display="none",document.getElementById("scan-result").style.display="block";let e="❌ Maaf, Gagal memproses AI. Silakan coba deksripsi yang lebih jelas.";a.message&&(a.message.includes("403")||a.message.includes("leaked")||a.message.includes("Forbidden"))&&(e=`
      <b>❌ Akses Ditolak (API Key Bermasalah)</b><br/>
      Kunci AI Anda saat ini sudah tidak aktif atau dianggap bocor oleh Google.<br/><br/>
      <button class="btn btn-primary" onclick="document.getElementById('btn-force-config').click()" style="padding: 8px 16px; font-size: 12px; height: auto;">
        Klik di sini untuk Memasukkan Key Baru
      </button>
    `,d.updateSettings({geminiApiKey:""})),document.getElementById("scan-ai-text").innerHTML=e,document.getElementById("scan-parsed-data").style.display="none",document.getElementById("scan-save-btn").style.display="none"}async function Q(a,e,t){var g,x,f,_,w,E;const s=d.getState().settings.geminiApiKey;if(!s)throw new Error("API Key Missing");const o=`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${s}`,i=C.map(v=>v.name).join(", "),r=d.getAccounts();let u=[{text:`Anda adalah Asisten Keuangan Keluarga 'Adam Family'. Tugas Anda mengekstrak transaksi dari cerita informal (bahasa gaul/sehari-hari) atau gambar struk.

KONTEKS REKENING YANG TERSEDIA:
${r.map(v=>`- ID ${v.id}: ${v.bank_name} (${v.owner_name})`).join(`
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
- "category": Jika expense pilih dari [${i}]. Jika income: "Gaji/Pendapatan". Jika transfer: "Mutasi".
- "account_id": Pilih ID Rekening SUMBER (Darimana uangnya). Jika tidak disebutkan, gunakan Rekening 'Tunai' atau ID yang paling logis.
- "to_account_id": (Hanya jika type="transfer") ID Rekening TUJUAN (Ke mana uangnya).

INPUT: "${a||"Analisis gambar struk lampiran"}"`}];e&&u.push({inlineData:{mimeType:t||"image/jpeg",data:e}});const m=await fetch(o,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{parts:u}],generationConfig:{temperature:.1,maxOutputTokens:2048}})});if(!m.ok){const h=((g=(await m.json().catch(()=>({}))).error)==null?void 0:g.message)||m.statusText;throw m.status===403?new Error("403 Forbidden: API Key Problem"):m.status===404?new Error("404 Not Found: Model name error"):m.status===503?new Error("503 Service Busy: Server Google penuh, coba lagi sesaat lagi."):new Error(`HTTP Error ${m.status}: ${h}`)}const b=((E=(w=(_=(f=(x=(await m.json()).candidates)==null?void 0:x[0])==null?void 0:f.content)==null?void 0:_.parts)==null?void 0:w[0])==null?void 0:E.text)||"";document.getElementById("scan-loading").style.display="none",document.getElementById("scan-result").style.display="block";try{const v=b.match(/\[[\s\S]*\]/)||b.match(/\{[\s\S]*\}/);if(!v)throw new Error("AI memberikan respon teks saja, bukan data transaksi.");let h=JSON.parse(v[0]);if(Array.isArray(h)||(h=[h]),T=h,T.length===0)throw new Error("Data transaksi kosong.");document.getElementById("scan-ai-text").innerHTML=`
      <strong>✨ AI Selesai Menganalisis!</strong><br/>
      Saya menemukan ${T.length} transaksi dari cerita Anda.
    `;const I=document.getElementById("scan-parsed-data");I.style.display="block",I.innerHTML=T.map(k=>{const A=r.find(L=>L.id==k.account_id)||{bank_name:"Unknown"},B=k.to_account_id?r.find(L=>L.id==k.to_account_id):null;return`
        <div style="background: var(--surface-container); border-radius: var(--radius-md); padding: 12px; margin-top: 12px; border: 1px solid var(--outline-variant);">
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="font-weight: 600; color: var(--on-surface-variant);">${k.type==="income"?"💰 Pemasukan":k.type==="transfer"?"🔁 Transfer":"💸 Pengeluaran"}</span>
            <span style="font-weight: 800; color: ${k.type==="income"?"var(--success)":k.type==="transfer"?"var(--primary)":"var(--error)"};">${p(k.amount||0)}</span>
          </div>
          <div style="font-size: 13px; color: var(--on-surface-variant);">
            <p>📝 <strong>${k.description||"-"}</strong></p>
            <p>📂 ${k.category||"-"} ${k.sub_category?"→ "+k.sub_category:""}</p>
            <p>💳 Rekening: <strong>${A.bank_name} ${B?"➡️ "+B.bank_name:""}</strong></p>
          </div>
        </div>
      `}).join(""),document.getElementById("scan-save-btn").style.display="flex"}catch(v){throw console.error(v,b),new Error("Gagal membaca data: "+v.message)}}function _e(a,e=1200){return new Promise((t,n)=>{const s=new Image;s.src=a,s.onload=()=>{const o=document.createElement("canvas");let i=s.width,r=s.height;i>e&&(r=Math.round(r*e/i),i=e),o.width=i,o.height=r,o.getContext("2d").drawImage(s,0,0,i,r),t(o.toDataURL("image/jpeg",.8))},s.onerror=n})}function Ie(){const a=d.getState(),e=new Date,t=a.settings.allowanceBudget||15e5,n=d.getAllowanceSpent(),s=Math.max(0,t-n),o=P(n,t),i=d.getDanaPusatBalance(),r=d.getMonthlyExpenses(e.getFullYear(),e.getMonth()),l=d.getMonthlyIncome(e.getFullYear(),e.getMonth());return`
    <div class="bento-grid stagger-children">
      <!-- Pegangan Suami -->
      <div class="card card-gradient" id="card-allowance">
        <div class="card-title">💰 Pegangan ${a.settings.userName||"Suami"}</div>
        <div class="card-value">${p(s)}</div>
        <div class="card-subtitle">Terpakai ${p(n)} dari ${p(t)}</div>
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
        <div class="card-value" style="font-size: 1.5rem; color: var(--primary);">${p(d.getTotalBalance())}</div>
        <div class="card-subtitle" style="color: var(--on-surface-variant);">${a.accounts.length} rekening aktif</div>
      </div>

      <!-- Arus Kas Bulan Ini -->
      <div class="card" id="card-cash-flow">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
          <span class="material-icons-round" style="color: var(--success); font-size: 20px;">swap_vert</span>
          <div class="card-title" style="margin-bottom: 0;">Arus Kas ${D()}</div>
        </div>
        <div style="display: flex; gap: 12px; margin-top: 8px;">
          <div>
            <div style="font-size: 11px; color: var(--success); font-weight: 600;">▲ Masuk</div>
            <div style="font-size: 14px; font-weight: 700; color: var(--success);">${p(l,!0)}</div>
          </div>
          <div>
            <div style="font-size: 11px; color: var(--error); font-weight: 600;">▼ Keluar</div>
            <div style="font-size: 14px; font-weight: 700; color: var(--error);">${p(r,!0)}</div>
          </div>
        </div>
      </div>
    </div>
  `}function Be(a){const e=a.toLowerCase();return e.includes("bri")?"bri":e.includes("jago")?"jago":e.includes("bsi")?"bsi":"default"}function Se(a){const e=a.toLowerCase();return e.includes("bri")?"BRI":e.includes("jago")?"JGO":e.includes("bsi")?"BSI":a.slice(0,3).toUpperCase()}function Ae(){return`
    <div class="section-header">
      <h2 class="section-title">Rekening Bank</h2>
      <span class="section-action" id="btn-manage-accounts">Kelola</span>
    </div>
    <div class="bank-slider" id="bank-slider">
      ${d.getAccounts().map(e=>{const t=Be(e.bank_name);return`
          <div class="bank-card ${t}" data-account-id="${e.id}">
            <div class="bank-card-icon ${t}">${Se(e.bank_name)}</div>
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
  `}function $e(){const a=document.getElementById("btn-add-account");a&&a.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("open-account-modal"))});const e=document.getElementById("btn-manage-accounts");e&&e.addEventListener("click",()=>{z(async()=>{const{default:t}=await Promise.resolve().then(()=>ie);return{default:t}},void 0).then(({default:t})=>t.navigate("/accounts"))})}function Te(){const a=d.getState(),e=new Date,t=d.getTransactionsByMonth(e.getFullYear(),e.getMonth()),n=a.assets.kpr,s=P(n.paid,n.total),o=6e5,i=t.filter(m=>m.type==="expense"&&m.parent_category==="Transportasi").reduce((m,y)=>m+y.amount,0),r=P(i,o),l=8e5,c=t.filter(m=>m.type==="expense"&&m.for_whom==="Anak").reduce((m,y)=>m+y.amount,0),u=P(c,l);return`
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
          <span>Terpakai: ${p(c,!0)}</span>
          <span>Budget: ${p(l,!0)}</span>
        </div>
      </div>
    </div>
  `}function O(a=10,e={}){let t=d.getTransactions(e);const n=t.length;if(a&&(t=t.slice(0,a)),t.length===0)return`
      <div class="empty-state">
        <span class="material-icons-round">receipt_long</span>
        <h3>Belum Ada Transaksi</h3>
        <p>Mulai catat pengeluaran dan pemasukan Anda</p>
      </div>
    `;const s=ee(t);let o="";return Object.entries(s).forEach(([i,r])=>{o+=`<div class="transaction-group-header">${i}</div>`,r.forEach(l=>{const c=fe(l.parent_category),u=l.type,m=l.type==="expense"?"-":l.type==="income"?"+":"↔",y=d.getAccountById(l.account_id),b=y?y.bank_name:"";o+=`
        <div class="transaction-item" data-tx-id="${l.id}">
          <div class="transaction-icon ${u}">
            <span class="material-icons-round">${c}</span>
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
            <div class="transaction-amount-value ${u}">${m} ${p(l.amount)}</div>
            <div class="transaction-amount-account">${b}</div>
          </div>
        </div>
      `})}),a&&n>a&&(o+=`
      <div style="text-align: center; padding: 16px 0;">
        <a href="#/transactions" class="section-action">Lihat Semua (${n} transaksi) →</a>
      </div>
    `),o}function q(){document.querySelectorAll(".transaction-item").forEach(a=>{a.addEventListener("click",()=>{const e=a.dataset.txId;window.dispatchEvent(new CustomEvent("view-transaction",{detail:{id:e}}))})})}function Le(){const a=d.getState();return`
    <div class="page-container animate-fade-in" id="dashboard-page">
      <!-- Greeting -->
      <div style="margin-bottom: 20px;">
        <h1 style="font-size: 1.5rem; font-weight: 800; color: var(--on-surface); letter-spacing: -0.5px;">
          ${Me()}, ${a.settings.userName||"User"} 👋
        </h1>
        <p style="font-size: var(--fs-body); color: var(--on-surface-variant); margin-top: 4px;">
          Berikut ringkasan keuangan keluarga bulan ${D()}
        </p>
      </div>

      <!-- Summary Cards -->
      ${Ie()}

      <!-- Bank Slider -->
      ${Ae()}

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
  `}function Pe(){$e(),q()}function Me(){const a=new Date().getHours();return a<11?"Selamat Pagi":a<15?"Selamat Siang":a<18?"Selamat Sore":"Selamat Malam"}let $={};function De(){const a=new Date,e=d.getMonthlyExpenses(a.getFullYear(),a.getMonth()),t=d.getMonthlyIncome(a.getFullYear(),a.getMonth()),n=t-e;return`
    <div class="page-container animate-fade-in" id="transactions-page">
      <h1 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 4px;">Transaksi</h1>
      <p style="color: var(--on-surface-variant); font-size: var(--fs-body); margin-bottom: 16px;">
        Riwayat keuangan bulan ${D()}
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
        ${O(null,$)}
      </div>
    </div>
  `}function ze(){q(),document.querySelectorAll("#tx-filters .chip").forEach(e=>{e.addEventListener("click",()=>{document.querySelectorAll("#tx-filters .chip").forEach(n=>n.classList.remove("selected")),e.classList.add("selected");const t=e.dataset.filter;t==="all"?delete $.type:$.type=t,K()})}),document.querySelectorAll("#tx-paid-filter .chip").forEach(e=>{e.addEventListener("click",()=>{document.querySelectorAll("#tx-paid-filter .chip").forEach(n=>n.classList.remove("selected")),e.classList.add("selected");const t=e.dataset.paid;t==="all"?delete $.paid_by:$.paid_by=t,K()})});const a=document.getElementById("tx-search");a&&a.addEventListener("input",te(e=>{const t=e.target.value.trim();t?$.search=t:delete $.search,K()},300)),Ce()}function K(){const a=document.getElementById("filtered-transactions");a&&(a.innerHTML=O(null,$),q())}async function Ce(){const a=document.getElementById("category-chart");if(a)try{const e=await z(()=>import("./auto-eE5P6S0m.js"),[]),t=e.default||e.Chart,n=new Date,s=d.getCategorySpending(n.getFullYear(),n.getMonth());if(s.length===0){a.parentElement.innerHTML=`
        <div style="text-align: center; padding: 20px; color: var(--outline);">
          <span class="material-icons-round" style="font-size: 32px;">pie_chart</span>
          <p style="margin-top: 8px;">Belum ada data pengeluaran bulan ini</p>
        </div>
      `;return}const o=["#30609d","#9a6a1a","#1b6d2f","#ba1a1a","#7b1fa2","#00695c","#e65100","#283593","#4e342e","#546e7a","#ad1457","#00838f"];new t(a,{type:"doughnut",data:{labels:s.map(i=>i.name),datasets:[{data:s.map(i=>i.amount),backgroundColor:o.slice(0,s.length),borderWidth:2,borderColor:"#fff",hoverOffset:6}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"65%",plugins:{legend:{position:"bottom",labels:{padding:12,usePointStyle:!0,pointStyleWidth:8,font:{family:"'Plus Jakarta Sans'",size:11,weight:"600"}}},tooltip:{callbacks:{label:i=>{const r=i.dataset.data.reduce((c,u)=>c+u,0),l=Math.round(i.parsed/r*100);return` ${i.label}: ${p(i.parsed)} (${l}%)`}},titleFont:{family:"'Plus Jakarta Sans'"},bodyFont:{family:"'Plus Jakarta Sans'"}}}}})}catch(e){console.warn("Chart.js not loaded:",e)}}function je(){const a=d.getAccounts(),e=d.getTotalBalance();return`
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
        <div style="font-weight: 800; font-size: var(--fs-body); color: var(--primary);">${p(a.balance)}</div>
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
              <button type="button" class="chip selected" data-value="Erwin">Erwin</button>
              <button type="button" class="chip" data-value="Nihad">Nihad</button>
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
  `}function Ne(){var t;const a=document.getElementById("btn-add-new-account"),e=document.getElementById("acc-modal-backdrop");document.getElementById("acc-modal-sheet"),a==null||a.addEventListener("click",()=>{document.getElementById("acc-modal-title").innerText="Tambah Rekening",document.getElementById("acc-id").value="",N()}),document.querySelectorAll(".btn-edit-account").forEach(n=>{n.addEventListener("click",s=>{s.stopPropagation();const o=parseInt(n.dataset.accId),i=d.getAccountById(o);i&&(document.getElementById("acc-modal-title").innerText="Edit Rekening",document.getElementById("acc-id").value=i.id,document.getElementById("acc-bank-name").value=i.bank_name,document.getElementById("acc-balance").value=i.balance,document.getElementById("acc-is-allowance").checked=i.is_allowance_account,document.querySelectorAll("#acc-owner-chips .chip").forEach(r=>{r.classList.toggle("selected",r.dataset.value===i.owner_name)}),N())})}),window.addEventListener("open-account-modal",()=>{document.getElementById("acc-modal-title").innerText="Tambah Rekening",document.getElementById("acc-id").value="",N()}),e==null||e.addEventListener("click",()=>Z()),document.querySelectorAll("#acc-owner-chips .chip").forEach(n=>{n.addEventListener("click",()=>{document.querySelectorAll("#acc-owner-chips .chip").forEach(s=>s.classList.remove("selected")),n.classList.add("selected")})}),(t=document.getElementById("acc-form"))==null||t.addEventListener("submit",n=>{var u,m,y,b,g;n.preventDefault();const s=document.getElementById("acc-id").value,o=(m=(u=document.getElementById("acc-bank-name"))==null?void 0:u.value)==null?void 0:m.trim(),i=((y=document.querySelector("#acc-owner-chips .chip.selected"))==null?void 0:y.dataset.value)||"Erwin",r=parseFloat(((b=document.getElementById("acc-balance"))==null?void 0:b.value)||0),l=((g=document.getElementById("acc-is-allowance"))==null?void 0:g.checked)||!1;if(!o){S("Masukkan nama bank","error");return}const c={bank_name:o,owner_name:i,balance:r,is_allowance_account:l,css_class:ae(o).replace("bank-card-icon ","")};s?(d.updateAccount(parseInt(s),c),S("✅ Rekening berhasil diperbarui!")):(d.addAccount(c),S("✅ Rekening berhasil ditambahkan!")),Z(),window.dispatchEvent(new CustomEvent("data-updated"))}),document.querySelectorAll(".btn-delete-account").forEach(n=>{n.addEventListener("click",s=>{s.stopPropagation();const o=parseInt(n.dataset.accId);confirm("Hapus rekening ini?")&&(d.deleteAccount(o),S("Rekening dihapus"),window.dispatchEvent(new CustomEvent("data-updated")))})})}function N(){var a,e,t;(a=document.getElementById("acc-form"))==null||a.reset(),(e=document.getElementById("acc-modal-backdrop"))==null||e.classList.add("open"),(t=document.getElementById("acc-modal-sheet"))==null||t.classList.add("open")}function Z(){var a,e;(a=document.getElementById("acc-modal-backdrop"))==null||a.classList.remove("open"),(e=document.getElementById("acc-modal-sheet"))==null||e.classList.remove("open")}function ae(a){const e=a.toLowerCase();return e.includes("bri")?"bri":e.includes("jago")?"jago":e.includes("bsi")?"bsi":e.includes("tunai")||e.includes("cash")?"tunai":"default"}function Fe(a){const e=a.toLowerCase();return e.includes("bri")?"BRI":e.includes("jago")?"JGO":e.includes("bsi")?"BSI":e.includes("tunai")||e.includes("cash")?"CSH":a.slice(0,3).toUpperCase()}function Oe(){const a=d.getAssets(),e=d.getNetWorth(),t=d.getTotalBalance(),n=a.emas,s=n.bsi_gram+n.tring_gram,o=s*n.price_per_gram,i=a.kpr,r=P(i.paid,i.total),l=i.total-i.paid,c=a.arisan||[];return`
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
        <div class="asset-card-header" style="justify-content: space-between;">
          <div style="display: flex; gap: 12px; align-items: center;">
            <div class="asset-card-icon emas">
              <span class="material-icons-round">diamond</span>
            </div>
            <div>
              <div class="asset-card-title">Investasi Emas</div>
              <div class="asset-card-subtitle">BSI Gold & Tring</div>
            </div>
          </div>
          <button class="btn btn-secondary" style="padding: 8px; border-radius: 50%; width: 40px; height: 40px;" onclick="window.dispatchEvent(new CustomEvent('edit-emas'))">
            <span class="material-icons-round" style="font-size: 20px;">edit</span>
          </button>
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
        <div class="asset-card-header" style="justify-content: space-between;">
          <div style="display: flex; gap: 12px; align-items: center;">
            <div class="asset-card-icon kpr">
              <span class="material-icons-round">home</span>
            </div>
            <div>
              <div class="asset-card-title">KPR ${i.bank||"BTN"}</div>
              <div class="asset-card-subtitle">Kredit Pemilikan Rumah</div>
            </div>
          </div>
          <button class="btn btn-secondary" style="padding: 8px; border-radius: 50%; width: 40px; height: 40px;" onclick="window.dispatchEvent(new CustomEvent('edit-kpr'))">
            <span class="material-icons-round" style="font-size: 20px;">edit</span>
          </button>
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
            <div style="font-size: 14px; font-weight: 800; color: var(--error); margin-top: 4px;">${p(l,!0)}</div>
          </div>
        </div>
      </div>

      <!-- Arisan Section -->
      <div class="asset-card" id="asset-arisan">
        <div class="asset-card-header" style="justify-content: space-between;">
          <div style="display: flex; gap: 12px; align-items: center;">
            <div class="asset-card-icon arisan">
              <span class="material-icons-round">groups</span>
            </div>
            <div>
              <div class="asset-card-title">Arisan</div>
              <div class="asset-card-subtitle">${c.length} kelompok arisan aktif</div>
            </div>
          </div>
          <button class="btn btn-secondary" style="padding: 8px; border-radius: 50%; width: 40px; height: 40px;" id="btn-add-arisan">
            <span class="material-icons-round" style="font-size: 20px;">add</span>
          </button>
        </div>

        ${c.length===0?`
          <div style="text-align: center; padding: 20px; color: var(--outline);">
            Belum ada data arisan
          </div>
        `:c.map(u=>`
          <div style="background: var(--surface-container); border-radius: var(--radius-md); padding: 12px; margin-bottom: 8px; position: relative;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <div style="font-weight: 700; font-size: var(--fs-body);">${u.name}</div>
              <div style="display: flex; gap: 4px; align-items: center;">
                <button class="btn-edit-arisan" data-id="${u.id}" style="padding: 4px; background: none; border: none; color: var(--primary);"><span class="material-icons-round" style="font-size: 18px;">edit</span></button>
                <button class="btn-delete-arisan" data-id="${u.id}" style="padding: 4px; background: none; border: none; color: var(--error);"><span class="material-icons-round" style="font-size: 18px;">delete</span></button>
              </div>
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
                <div class="progress-bar-fill blue" style="width: ${P(u.current_round,u.total_members)}%;"></div>
              </div>
            </div>
          </div>
        `).join("")}
      </div>

      <!-- Modals for Assets -->
      <div class="modal-backdrop" id="asset-modal-backdrop"></div>
      
      <!-- Modal Emas -->
      <div class="modal-sheet" id="modal-edit-emas">
        <div class="modal-handle"></div>
        <div class="modal-content">
          <h2 class="modal-title">Edit Investasi Emas</h2>
          <form id="form-emas">
            <div class="form-group">
              <label class="form-label">Tabungan Emas BSI (gram)</label>
              <input type="number" step="0.01" class="form-input" id="emas-bsi" value="${n.bsi_gram}" />
            </div>
            <div class="form-group">
              <label class="form-label">Emas Tring/Fisik (gram)</label>
              <input type="number" step="0.01" class="form-input" id="emas-tring" value="${n.tring_gram}" />
            </div>
            <div class="form-group">
              <label class="form-label">Harga Emas Saat Ini (Rp/gram)</label>
              <input type="number" class="form-input" id="emas-price" value="${n.price_per_gram}" />
            </div>
            <button type="submit" class="btn btn-primary btn-block">Simpan Perubahan</button>
          </form>
        </div>
      </div>

      <!-- Modal KPR -->
      <div class="modal-sheet" id="modal-edit-kpr">
        <div class="modal-handle"></div>
        <div class="modal-content">
          <h2 class="modal-title">Update Status KPR</h2>
          <form id="form-kpr">
            <div class="form-group">
              <label class="form-label">Nama Bank</label>
              <input type="text" class="form-input" id="kpr-bank" value="${i.bank}" />
            </div>
            <div class="form-group">
              <label class="form-label">Total Harga Rumah/Hutang Awal</label>
              <input type="number" class="form-input" id="kpr-total" value="${i.total}" />
            </div>
            <div class="form-group">
              <label class="form-label">Total yang Sudah Dibayar</label>
              <input type="number" class="form-input" id="kpr-paid" value="${i.paid}" />
            </div>
            <div class="form-group">
              <label class="form-label">Cicilan per bulan</label>
              <input type="number" class="form-input" id="kpr-monthly" value="${i.monthly}" />
            </div>
            <div class="form-group">
              <label class="form-label">Sisa Tenor (Bulan)</label>
              <input type="number" class="form-input" id="kpr-months" value="${i.remaining_months}" />
            </div>
            <button type="submit" class="btn btn-primary btn-block">Simpan Perubahan</button>
          </form>
        </div>
      </div>

      <!-- Modal Arisan -->
      <div class="modal-sheet" id="modal-edit-arisan">
        <div class="modal-handle"></div>
        <div class="modal-content">
          <h2 class="modal-title" id="arisan-modal-title">Tambah Kelompok Arisan</h2>
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
              <label class="form-label">Urutan Kocokan Saya</label>
              <input type="number" class="form-input" id="arisan-turn" required />
            </div>
            <div class="form-group">
              <label class="form-label">Putaran Saat Ini</label>
              <input type="number" class="form-input" id="arisan-round" value="1" />
            </div>
            <button type="submit" class="btn btn-primary btn-block">Simpan Data Arisan</button>
          </form>
        </div>
      </div>
    </div>
  `}function qe(){var t,n,s,o;const a=document.getElementById("asset-modal-backdrop"),e=()=>{a==null||a.classList.remove("open"),document.querySelectorAll(".modal-sheet").forEach(i=>i.classList.remove("open"))};a==null||a.addEventListener("click",e),window.addEventListener("edit-emas",()=>{var i;a==null||a.classList.add("open"),(i=document.getElementById("modal-edit-emas"))==null||i.classList.add("open")}),(t=document.getElementById("form-emas"))==null||t.addEventListener("submit",i=>{i.preventDefault(),d.updateEmas({bsi_gram:parseFloat(document.getElementById("emas-bsi").value||0),tring_gram:parseFloat(document.getElementById("emas-tring").value||0),price_per_gram:parseInt(document.getElementById("emas-price").value||0)}),window.dispatchEvent(new CustomEvent("data-updated")),e()}),window.addEventListener("edit-kpr",()=>{var i;a==null||a.classList.add("open"),(i=document.getElementById("modal-edit-kpr"))==null||i.classList.add("open")}),(n=document.getElementById("form-kpr"))==null||n.addEventListener("submit",i=>{i.preventDefault(),d.updateKPR({bank:document.getElementById("kpr-bank").value,total:parseInt(document.getElementById("kpr-total").value||0),paid:parseInt(document.getElementById("kpr-paid").value||0),monthly:parseInt(document.getElementById("kpr-monthly").value||0),remaining_months:parseInt(document.getElementById("kpr-months").value||0)}),window.dispatchEvent(new CustomEvent("data-updated")),e()}),(s=document.getElementById("btn-add-arisan"))==null||s.addEventListener("click",()=>{var i;document.getElementById("arisan-modal-title").innerText="Tambah Kelompok Arisan",document.getElementById("arisan-id").value="",document.getElementById("form-arisan").reset(),a==null||a.classList.add("open"),(i=document.getElementById("modal-edit-arisan"))==null||i.classList.add("open")}),document.querySelectorAll(".btn-edit-arisan").forEach(i=>{i.addEventListener("click",()=>{var c;const r=i.dataset.id,l=d.getAssets().arisan.find(u=>u.id===r);l&&(document.getElementById("arisan-modal-title").innerText="Edit Arisan",document.getElementById("arisan-id").value=l.id,document.getElementById("arisan-name").value=l.name,document.getElementById("arisan-amount").value=l.monthly_amount,document.getElementById("arisan-members").value=l.total_members,document.getElementById("arisan-turn").value=l.my_turn,document.getElementById("arisan-round").value=l.current_round,a==null||a.classList.add("open"),(c=document.getElementById("modal-edit-arisan"))==null||c.classList.add("open"))})}),document.querySelectorAll(".btn-delete-arisan").forEach(i=>{i.addEventListener("click",()=>{confirm("Hapus data arisan ini?")&&(d.deleteArisan(i.dataset.id),window.dispatchEvent(new CustomEvent("data-updated")))})}),(o=document.getElementById("form-arisan"))==null||o.addEventListener("submit",i=>{i.preventDefault();const r=document.getElementById("arisan-id").value,l={name:document.getElementById("arisan-name").value,monthly_amount:parseInt(document.getElementById("arisan-amount").value),total_members:parseInt(document.getElementById("arisan-members").value),my_turn:parseInt(document.getElementById("arisan-turn").value),current_round:parseInt(document.getElementById("arisan-round").value),is_active:!0};r?d.updateArisan(r,l):d.addArisan(l),window.dispatchEvent(new CustomEvent("data-updated")),e()})}function Ge(){d.getState();const a=new Date,e=He();return`
    <div class="page-container animate-fade-in" id="insights-page">
      <h1 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 4px;">
        <span class="material-icons-round" style="vertical-align: middle; color: var(--primary); font-size: 28px;">auto_awesome</span>
        AI Insight
      </h1>
      <p style="color: var(--on-surface-variant); font-size: var(--fs-body); margin-bottom: 20px;">
        Analisis keuangan cerdas untuk ${D()} ${a.getFullYear()}
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

      ${Je()}

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
  `}function He(){const a=new Date,e=d.getState(),n=d.getTransactionsByMonth(a.getFullYear(),a.getMonth()).filter(g=>g.type==="expense"),s=n.reduce((g,x)=>g+x.amount,0),o=e.settings.allowanceBudget||15e5,i=d.getAllowanceSpent(),r=[],l=Math.round(i/o*100);l>=80?r.push({title:"Budget Alert",icon:"warning",color:"#e53935",message:`Pegangan ${e.settings.userName} sudah mencapai ${l}% budget. Sisa ${p(o-i)} untuk bulan ini.`,detail:`Budget: ${p(o)} | Terpakai: ${p(i)}`}):l>=50&&r.push({title:"Pemantauan Budget",icon:"info",color:"#fb8c00",message:`${e.settings.userName}, pegangan sudah terpakai ${l}%. Masih ada ${p(o-i)} untuk sisa bulan ini.`,detail:null});const c=n.filter(g=>g.parent_category==="Transportasi").reduce((g,x)=>g+x.amount,0);c>0&&r.push({title:"Transportasi",icon:"directions_car",color:"#9a6a1a",message:`Total pengeluaran transportasi bulan ini: ${p(c)}. ${c>5e5?"Cukup tinggi, pertimbangkan efisiensi perjalanan LDM.":"Masih terkendali, pertahankan!"}`,detail:null});const u=5e5,m=n.filter(g=>g.sub_category==="Groceries"||g.parent_category==="Makanan & Minuman").reduce((g,x)=>g+x.amount,0);m<u&&m>0&&r.push({title:"Apresiasi! 🎉",icon:"celebration",color:"#43a047",message:`${e.settings.spouseName}, bulan ini pengeluaran makanan & groceries ${p(m,!0)}. Hemat ${p(u-m,!0)} yang bisa dialokasikan ke investasi emas!`,detail:null});const y=n.filter(g=>g.is_together);if(y.length>0){const g=y.reduce((x,f)=>x+f.amount,0);r.push({title:"Quality Time 💕",icon:"favorite",color:"#e91e63",message:`Bulan ini ada ${y.length} transaksi saat Together Mode aktif, total ${p(g)}. Waktu berkualitas bersama keluarga itu priceless!`,detail:null})}const b=n.filter(g=>g.for_whom==="Anak").reduce((g,x)=>g+x.amount,0);return b>0&&r.push({title:"Keperluan Anak",icon:"child_care",color:"#1565c0",message:`Total pengeluaran untuk anak bulan ini: ${p(b)}. Investasi terbaik adalah pendidikan anak.`,detail:null}),r.push({title:"Ringkasan Bulanan",icon:"summarize",color:"#30609d",message:`Total pengeluaran ${D()}: ${p(s)} dari ${n.length} transaksi. Saya terus memantau dan akan memberikan insight yang lebih akurat seiring bertambahnya data.`,detail:null}),r}function Je(){var n;const a=new Date,e=d.getCategorySpending(a.getFullYear(),a.getMonth());if(e.length===0)return'<div style="text-align: center; padding: 20px; color: var(--outline);">Belum ada data</div>';const t=((n=e[0])==null?void 0:n.amount)||1;return`
    <div class="card">
      ${e.map((s,o)=>{const i=Math.round(s.amount/t*100),r=["#30609d","#9a6a1a","#1b6d2f","#ba1a1a","#7b1fa2","#00695c","#e65100","#283593"],l=r[o%r.length];return`
          <div style="margin-bottom: 12px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
              <span style="font-size: 13px; font-weight: 600; color: var(--on-surface);">${s.name}</span>
              <span style="font-size: 13px; font-weight: 700; color: ${l};">${p(s.amount,!0)}</span>
            </div>
            <div style="width: 100%; height: 6px; background: var(--surface-container); border-radius: 3px; overflow: hidden;">
              <div style="width: ${i}%; height: 100%; background: ${l}; border-radius: 3px; transition: width 0.8s ease;"></div>
            </div>
          </div>
        `}).join("")}
    </div>
  `}function Ue(){}const Ye=document.getElementById("app"),F={"/":{render:Le,init:Pe},"/transactions":{render:De,init:ze},"/accounts":{render:je,init:Ne},"/assets":{render:Oe,init:qe},"/insights":{render:Ge,init:Ue}};function ne(a){const e=F[a]||F["/"];Ye.innerHTML=`
    ${ce()}
    ${me()}
    ${e.render()}
    ${ve()}
    ${he()}
    ${we()}
  `,ue(),ye(),ke(),Ee(),e.init(),ge(a),window.scrollTo({top:0,behavior:"instant"})}Object.keys(F).forEach(a=>{M.addRoute(a,ne)});window.addEventListener("data-updated",()=>{const a=M.getCurrentPath();ne(a)});function Ve(){re(),M.start()}document.addEventListener("DOMContentLoaded",Ve);
