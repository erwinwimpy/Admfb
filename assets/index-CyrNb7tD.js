(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(r){if(r.ep)return;r.ep=!0;const i=t(r);fetch(r.href,i)}})();class Kh{constructor(){this.routes={},this.currentRoute=null,window.addEventListener("hashchange",()=>this._onHashChange())}addRoute(e,t){this.routes[e]=t}navigate(e){window.location.hash=e}getCurrentPath(){return window.location.hash.slice(1)||"/"}_onHashChange(){const e=this.getCurrentPath();this._resolve(e)}_resolve(e){const t=this.routes[e]||this.routes["/"];t&&(this.currentRoute=e,t(e))}start(){const e=this.getCurrentPath();this._resolve(e)}}const wt=new Kh,Hh=Object.freeze(Object.defineProperty({__proto__:null,default:wt,router:wt},Symbol.toStringTag,{value:"Module"})),Gh="modulepreload",Wh=function(n){return"/Admfb/"+n},Xo={},rr=function(e,t,s){let r=Promise.resolve();if(t&&t.length>0){let o=function(h){return Promise.all(h.map(f=>Promise.resolve(f).then(m=>({status:"fulfilled",value:m}),m=>({status:"rejected",reason:m}))))};document.getElementsByTagName("link");const c=document.querySelector("meta[property=csp-nonce]"),u=(c==null?void 0:c.nonce)||(c==null?void 0:c.getAttribute("nonce"));r=o(t.map(h=>{if(h=Wh(h),h in Xo)return;Xo[h]=!0;const f=h.endsWith(".css"),m=f?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${h}"]${m}`))return;const E=document.createElement("link");if(E.rel=f?"stylesheet":Gh,f||(E.as="script"),E.crossOrigin="",E.href=h,u&&E.setAttribute("nonce",u),document.head.appendChild(E),f)return new Promise((S,P)=>{E.addEventListener("load",S),E.addEventListener("error",()=>P(new Error(`Unable to preload CSS for ${h}`)))})}))}function i(o){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=o,window.dispatchEvent(c),!c.defaultPrevented)throw o}return r.then(o=>{for(const c of o||[])c.status==="rejected"&&i(c.reason);return e().catch(i)})},Qh=()=>{};var Zo={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vl=function(n){const e=[];let t=0;for(let s=0;s<n.length;s++){let r=n.charCodeAt(s);r<128?e[t++]=r:r<2048?(e[t++]=r>>6|192,e[t++]=r&63|128):(r&64512)===55296&&s+1<n.length&&(n.charCodeAt(s+1)&64512)===56320?(r=65536+((r&1023)<<10)+(n.charCodeAt(++s)&1023),e[t++]=r>>18|240,e[t++]=r>>12&63|128,e[t++]=r>>6&63|128,e[t++]=r&63|128):(e[t++]=r>>12|224,e[t++]=r>>6&63|128,e[t++]=r&63|128)}return e},Jh=function(n){const e=[];let t=0,s=0;for(;t<n.length;){const r=n[t++];if(r<128)e[s++]=String.fromCharCode(r);else if(r>191&&r<224){const i=n[t++];e[s++]=String.fromCharCode((r&31)<<6|i&63)}else if(r>239&&r<365){const i=n[t++],o=n[t++],c=n[t++],u=((r&7)<<18|(i&63)<<12|(o&63)<<6|c&63)-65536;e[s++]=String.fromCharCode(55296+(u>>10)),e[s++]=String.fromCharCode(56320+(u&1023))}else{const i=n[t++],o=n[t++];e[s++]=String.fromCharCode((r&15)<<12|(i&63)<<6|o&63)}}return e.join("")},Ll={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let r=0;r<n.length;r+=3){const i=n[r],o=r+1<n.length,c=o?n[r+1]:0,u=r+2<n.length,h=u?n[r+2]:0,f=i>>2,m=(i&3)<<4|c>>4;let E=(c&15)<<2|h>>6,S=h&63;u||(S=64,o||(E=64)),s.push(t[f],t[m],t[E],t[S])}return s.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Vl(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Jh(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let r=0;r<n.length;){const i=t[n.charAt(r++)],c=r<n.length?t[n.charAt(r)]:0;++r;const h=r<n.length?t[n.charAt(r)]:64;++r;const m=r<n.length?t[n.charAt(r)]:64;if(++r,i==null||c==null||h==null||m==null)throw new Yh;const E=i<<2|c>>4;if(s.push(E),h!==64){const S=c<<4&240|h>>2;if(s.push(S),m!==64){const P=h<<6&192|m;s.push(P)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Yh extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Xh=function(n){const e=Vl(n);return Ll.encodeByteArray(e,!0)},ir=function(n){return Xh(n).replace(/\./g,"")},Ml=function(n){try{return Ll.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zh(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ef=()=>Zh().__FIREBASE_DEFAULTS__,tf=()=>{if(typeof process>"u"||typeof Zo>"u")return;const n=Zo.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},nf=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Ml(n[1]);return e&&JSON.parse(e)},Ar=()=>{try{return Qh()||ef()||tf()||nf()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Ol=n=>{var e,t;return(t=(e=Ar())==null?void 0:e.emulatorHosts)==null?void 0:t[n]},sf=n=>{const e=Ol(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const s=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),s]:[e.substring(0,t),s]},Bl=()=>{var n;return(n=Ar())==null?void 0:n.config},Fl=n=>{var e;return(e=Ar())==null?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rf{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,s)=>{t?this.reject(t):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,s))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function af(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},s=e||"demo-project",r=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${s}`,aud:s,iat:r,exp:r+3600,auth_time:r,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...n};return[ir(JSON.stringify(t)),ir(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Te(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function of(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Te())}function cf(){var e;const n=(e=Ar())==null?void 0:e.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function lf(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function uf(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function df(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function hf(){const n=Te();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function ff(){return!cf()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function pf(){try{return typeof indexedDB=="object"}catch{return!1}}function mf(){return new Promise((n,e)=>{try{let t=!0;const s="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(s);r.onsuccess=()=>{r.result.close(),t||self.indexedDB.deleteDatabase(s),n(!0)},r.onupgradeneeded=()=>{t=!1},r.onerror=()=>{var i;e(((i=r.error)==null?void 0:i.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gf="FirebaseError";class nt extends Error{constructor(e,t,s){super(t),this.code=e,this.customData=s,this.name=gf,Object.setPrototypeOf(this,nt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ms.prototype.create)}}class ms{constructor(e,t,s){this.service=e,this.serviceName=t,this.errors=s}create(e,...t){const s=t[0]||{},r=`${this.service}/${e}`,i=this.errors[e],o=i?yf(i,s):"Error",c=`${this.serviceName}: ${o} (${r}).`;return new nt(r,c,s)}}function yf(n,e){return n.replace(_f,(t,s)=>{const r=e[s];return r!=null?String(r):`<${s}?>`})}const _f=/\{\$([^}]+)}/g;function vf(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function jt(n,e){if(n===e)return!0;const t=Object.keys(n),s=Object.keys(e);for(const r of t){if(!s.includes(r))return!1;const i=n[r],o=e[r];if(ec(i)&&ec(o)){if(!jt(i,o))return!1}else if(i!==o)return!1}for(const r of s)if(!t.includes(r))return!1;return!0}function ec(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gs(n){const e=[];for(const[t,s]of Object.entries(n))Array.isArray(s)?s.forEach(r=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(r))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(s));return e.length?"&"+e.join("&"):""}function Gn(n){const e={};return n.replace(/^\?/,"").split("&").forEach(s=>{if(s){const[r,i]=s.split("=");e[decodeURIComponent(r)]=decodeURIComponent(i)}}),e}function Wn(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function Ef(n,e){const t=new bf(n,e);return t.subscribe.bind(t)}class bf{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(s=>{this.error(s)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,s){let r;if(e===void 0&&t===void 0&&s===void 0)throw new Error("Missing Observer.");If(e,["next","error","complete"])?r=e:r={next:e,error:t,complete:s},r.next===void 0&&(r.next=gi),r.error===void 0&&(r.error=gi),r.complete===void 0&&(r.complete=gi);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch{}}),this.observers.push(r),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(s){typeof console<"u"&&console.error&&console.error(s)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function If(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function gi(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function me(n){return n&&n._delegate?n._delegate:n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ys(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Ul(n){return(await fetch(n,{credentials:"include"})).ok}class zt{constructor(e,t,s){this.name=e,this.instanceFactory=t,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ft="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wf{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const s=new rf;if(this.instancesDeferred.set(t,s),this.isInitialized(t)||this.shouldAutoInitialize())try{const r=this.getOrInitializeService({instanceIdentifier:t});r&&s.resolve(r)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(e==null?void 0:e.optional)??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(r){if(s)return null;throw r}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Af(e))try{this.getOrInitializeService({instanceIdentifier:Ft})}catch{}for(const[t,s]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:r});s.resolve(i)}catch{}}}}clearInstance(e=Ft){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Ft){return this.instances.has(e)}getOptions(e=Ft){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:s,options:t});for(const[i,o]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);s===c&&o.resolve(r)}return r}onInit(e,t){const s=this.normalizeInstanceIdentifier(t),r=this.onInitCallbacks.get(s)??new Set;r.add(e),this.onInitCallbacks.set(s,r);const i=this.instances.get(s);return i&&e(i,s),()=>{r.delete(e)}}invokeOnInitCallbacks(e,t){const s=this.onInitCallbacks.get(t);if(s)for(const r of s)try{r(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:Tf(e),options:t}),this.instances.set(e,s),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=Ft){return this.component?this.component.multipleInstances?e:Ft:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Tf(n){return n===Ft?void 0:n}function Af(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sf{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new wf(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var W;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(W||(W={}));const kf={debug:W.DEBUG,verbose:W.VERBOSE,info:W.INFO,warn:W.WARN,error:W.ERROR,silent:W.SILENT},Rf=W.INFO,Pf={[W.DEBUG]:"log",[W.VERBOSE]:"log",[W.INFO]:"info",[W.WARN]:"warn",[W.ERROR]:"error"},Cf=(n,e,...t)=>{if(e<n.logLevel)return;const s=new Date().toISOString(),r=Pf[e];if(r)console[r](`[${s}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class ia{constructor(e){this.name=e,this._logLevel=Rf,this._logHandler=Cf,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in W))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?kf[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,W.DEBUG,...e),this._logHandler(this,W.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,W.VERBOSE,...e),this._logHandler(this,W.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,W.INFO,...e),this._logHandler(this,W.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,W.WARN,...e),this._logHandler(this,W.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,W.ERROR,...e),this._logHandler(this,W.ERROR,...e)}}const xf=(n,e)=>e.some(t=>n instanceof t);let tc,nc;function Df(){return tc||(tc=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Nf(){return nc||(nc=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const $l=new WeakMap,Di=new WeakMap,jl=new WeakMap,yi=new WeakMap,aa=new WeakMap;function Vf(n){const e=new Promise((t,s)=>{const r=()=>{n.removeEventListener("success",i),n.removeEventListener("error",o)},i=()=>{t(_t(n.result)),r()},o=()=>{s(n.error),r()};n.addEventListener("success",i),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&$l.set(t,n)}).catch(()=>{}),aa.set(e,n),e}function Lf(n){if(Di.has(n))return;const e=new Promise((t,s)=>{const r=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",o),n.removeEventListener("abort",o)},i=()=>{t(),r()},o=()=>{s(n.error||new DOMException("AbortError","AbortError")),r()};n.addEventListener("complete",i),n.addEventListener("error",o),n.addEventListener("abort",o)});Di.set(n,e)}let Ni={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Di.get(n);if(e==="objectStoreNames")return n.objectStoreNames||jl.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return _t(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Mf(n){Ni=n(Ni)}function Of(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const s=n.call(_i(this),e,...t);return jl.set(s,e.sort?e.sort():[e]),_t(s)}:Nf().includes(n)?function(...e){return n.apply(_i(this),e),_t($l.get(this))}:function(...e){return _t(n.apply(_i(this),e))}}function Bf(n){return typeof n=="function"?Of(n):(n instanceof IDBTransaction&&Lf(n),xf(n,Df())?new Proxy(n,Ni):n)}function _t(n){if(n instanceof IDBRequest)return Vf(n);if(yi.has(n))return yi.get(n);const e=Bf(n);return e!==n&&(yi.set(n,e),aa.set(e,n)),e}const _i=n=>aa.get(n);function Ff(n,e,{blocked:t,upgrade:s,blocking:r,terminated:i}={}){const o=indexedDB.open(n,e),c=_t(o);return s&&o.addEventListener("upgradeneeded",u=>{s(_t(o.result),u.oldVersion,u.newVersion,_t(o.transaction),u)}),t&&o.addEventListener("blocked",u=>t(u.oldVersion,u.newVersion,u)),c.then(u=>{i&&u.addEventListener("close",()=>i()),r&&u.addEventListener("versionchange",h=>r(h.oldVersion,h.newVersion,h))}).catch(()=>{}),c}const Uf=["get","getKey","getAll","getAllKeys","count"],$f=["put","add","delete","clear"],vi=new Map;function sc(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(vi.get(e))return vi.get(e);const t=e.replace(/FromIndex$/,""),s=e!==t,r=$f.includes(t);if(!(t in(s?IDBIndex:IDBObjectStore).prototype)||!(r||Uf.includes(t)))return;const i=async function(o,...c){const u=this.transaction(o,r?"readwrite":"readonly");let h=u.store;return s&&(h=h.index(c.shift())),(await Promise.all([h[t](...c),r&&u.done]))[0]};return vi.set(e,i),i}Mf(n=>({...n,get:(e,t,s)=>sc(e,t)||n.get(e,t,s),has:(e,t)=>!!sc(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jf{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(zf(t)){const s=t.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(t=>t).join(" ")}}function zf(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Vi="@firebase/app",rc="0.14.11";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xe=new ia("@firebase/app"),qf="@firebase/app-compat",Kf="@firebase/analytics-compat",Hf="@firebase/analytics",Gf="@firebase/app-check-compat",Wf="@firebase/app-check",Qf="@firebase/auth",Jf="@firebase/auth-compat",Yf="@firebase/database",Xf="@firebase/data-connect",Zf="@firebase/database-compat",ep="@firebase/functions",tp="@firebase/functions-compat",np="@firebase/installations",sp="@firebase/installations-compat",rp="@firebase/messaging",ip="@firebase/messaging-compat",ap="@firebase/performance",op="@firebase/performance-compat",cp="@firebase/remote-config",lp="@firebase/remote-config-compat",up="@firebase/storage",dp="@firebase/storage-compat",hp="@firebase/firestore",fp="@firebase/ai",pp="@firebase/firestore-compat",mp="firebase",gp="12.12.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Li="[DEFAULT]",yp={[Vi]:"fire-core",[qf]:"fire-core-compat",[Hf]:"fire-analytics",[Kf]:"fire-analytics-compat",[Wf]:"fire-app-check",[Gf]:"fire-app-check-compat",[Qf]:"fire-auth",[Jf]:"fire-auth-compat",[Yf]:"fire-rtdb",[Xf]:"fire-data-connect",[Zf]:"fire-rtdb-compat",[ep]:"fire-fn",[tp]:"fire-fn-compat",[np]:"fire-iid",[sp]:"fire-iid-compat",[rp]:"fire-fcm",[ip]:"fire-fcm-compat",[ap]:"fire-perf",[op]:"fire-perf-compat",[cp]:"fire-rc",[lp]:"fire-rc-compat",[up]:"fire-gcs",[dp]:"fire-gcs-compat",[hp]:"fire-fst",[pp]:"fire-fst-compat",[fp]:"fire-vertex","fire-js":"fire-js",[mp]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ar=new Map,_p=new Map,Mi=new Map;function ic(n,e){try{n.container.addComponent(e)}catch(t){Xe.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function pn(n){const e=n.name;if(Mi.has(e))return Xe.debug(`There were multiple attempts to register component ${e}.`),!1;Mi.set(e,n);for(const t of ar.values())ic(t,n);for(const t of _p.values())ic(t,n);return!0}function oa(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function De(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vp={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},vt=new ms("app","Firebase",vp);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ep{constructor(e,t,s){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new zt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw vt.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const In=gp;function zl(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const s={name:Li,automaticDataCollectionEnabled:!0,...e},r=s.name;if(typeof r!="string"||!r)throw vt.create("bad-app-name",{appName:String(r)});if(t||(t=Bl()),!t)throw vt.create("no-options");const i=ar.get(r);if(i){if(jt(t,i.options)&&jt(s,i.config))return i;throw vt.create("duplicate-app",{appName:r})}const o=new Sf(r);for(const u of Mi.values())o.addComponent(u);const c=new Ep(t,s,o);return ar.set(r,c),c}function ql(n=Li){const e=ar.get(n);if(!e&&n===Li&&Bl())return zl();if(!e)throw vt.create("no-app",{appName:n});return e}function Et(n,e,t){let s=yp[n]??n;t&&(s+=`-${t}`);const r=s.match(/\s|\//),i=e.match(/\s|\//);if(r||i){const o=[`Unable to register library "${s}" with version "${e}":`];r&&o.push(`library name "${s}" contains illegal characters (whitespace or "/")`),r&&i&&o.push("and"),i&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Xe.warn(o.join(" "));return}pn(new zt(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bp="firebase-heartbeat-database",Ip=1,rs="firebase-heartbeat-store";let Ei=null;function Kl(){return Ei||(Ei=Ff(bp,Ip,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(rs)}catch(t){console.warn(t)}}}}).catch(n=>{throw vt.create("idb-open",{originalErrorMessage:n.message})})),Ei}async function wp(n){try{const t=(await Kl()).transaction(rs),s=await t.objectStore(rs).get(Hl(n));return await t.done,s}catch(e){if(e instanceof nt)Xe.warn(e.message);else{const t=vt.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Xe.warn(t.message)}}}async function ac(n,e){try{const s=(await Kl()).transaction(rs,"readwrite");await s.objectStore(rs).put(e,Hl(n)),await s.done}catch(t){if(t instanceof nt)Xe.warn(t.message);else{const s=vt.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});Xe.warn(s.message)}}}function Hl(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tp=1024,Ap=30;class Sp{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Rp(t),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){var e,t;try{const r=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=oc();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:r}),this._heartbeatsCache.heartbeats.length>Ap){const o=Pp(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(s){Xe.warn(s)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=oc(),{heartbeatsToSend:s,unsentEntries:r}=kp(this._heartbeatsCache.heartbeats),i=ir(JSON.stringify({version:2,heartbeats:s}));return this._heartbeatsCache.lastSentHeartbeatDate=t,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return Xe.warn(t),""}}}function oc(){return new Date().toISOString().substring(0,10)}function kp(n,e=Tp){const t=[];let s=n.slice();for(const r of n){const i=t.find(o=>o.agent===r.agent);if(i){if(i.dates.push(r.date),cc(t)>e){i.dates.pop();break}}else if(t.push({agent:r.agent,dates:[r.date]}),cc(t)>e){t.pop();break}s=s.slice(1)}return{heartbeatsToSend:t,unsentEntries:s}}class Rp{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return pf()?mf().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await wp(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return ac(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return ac(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function cc(n){return ir(JSON.stringify({version:2,heartbeats:n})).length}function Pp(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let s=1;s<n.length;s++)n[s].date<t&&(t=n[s].date,e=s);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cp(n){pn(new zt("platform-logger",e=>new jf(e),"PRIVATE")),pn(new zt("heartbeat",e=>new Sp(e),"PRIVATE")),Et(Vi,rc,n),Et(Vi,rc,"esm2020"),Et("fire-js","")}Cp("");var xp="firebase",Dp="12.12.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Et(xp,Dp,"app");function Gl(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Np=Gl,Wl=new ms("auth","Firebase",Gl());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const or=new ia("@firebase/auth");function Vp(n,...e){or.logLevel<=W.WARN&&or.warn(`Auth (${In}): ${n}`,...e)}function Ws(n,...e){or.logLevel<=W.ERROR&&or.error(`Auth (${In}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Me(n,...e){throw ca(n,...e)}function Ue(n,...e){return ca(n,...e)}function Ql(n,e,t){const s={...Np(),[e]:t};return new ms("auth","Firebase",s).create(e,{appName:n.name})}function Ye(n){return Ql(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function ca(n,...e){if(typeof n!="string"){const t=e[0],s=[...e.slice(1)];return s[0]&&(s[0].appName=n.name),n._errorFactory.create(t,...s)}return Wl.create(n,...e)}function F(n,e,...t){if(!n)throw ca(e,...t)}function Qe(n){const e="INTERNAL ASSERTION FAILED: "+n;throw Ws(e),new Error(e)}function Ze(n,e){n||Qe(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Oi(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.href)||""}function Lp(){return lc()==="http:"||lc()==="https:"}function lc(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mp(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Lp()||uf()||"connection"in navigator)?navigator.onLine:!0}function Op(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _s{constructor(e,t){this.shortDelay=e,this.longDelay=t,Ze(t>e,"Short delay should be less than long delay!"),this.isMobile=of()||df()}get(){return Mp()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function la(n,e){Ze(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jl{static initialize(e,t,s){this.fetchImpl=e,t&&(this.headersImpl=t),s&&(this.responseImpl=s)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Qe("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Qe("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Qe("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bp={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fp=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Up=new _s(3e4,6e4);function Ct(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function st(n,e,t,s,r={}){return Yl(n,r,async()=>{let i={},o={};s&&(e==="GET"?o=s:i={body:JSON.stringify(s)});const c=gs({key:n.config.apiKey,...o}).slice(1),u=await n._getAdditionalHeaders();u["Content-Type"]="application/json",n.languageCode&&(u["X-Firebase-Locale"]=n.languageCode);const h={method:e,headers:u,...i};return lf()||(h.referrerPolicy="no-referrer"),n.emulatorConfig&&ys(n.emulatorConfig.host)&&(h.credentials="include"),Jl.fetch()(await Xl(n,n.config.apiHost,t,c),h)})}async function Yl(n,e,t){n._canInitEmulator=!1;const s={...Bp,...e};try{const r=new jp(n),i=await Promise.race([t(),r.promise]);r.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw js(n,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const c=i.ok?o.errorMessage:o.error.message,[u,h]=c.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw js(n,"credential-already-in-use",o);if(u==="EMAIL_EXISTS")throw js(n,"email-already-in-use",o);if(u==="USER_DISABLED")throw js(n,"user-disabled",o);const f=s[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw Ql(n,f,h);Me(n,f)}}catch(r){if(r instanceof nt)throw r;Me(n,"network-request-failed",{message:String(r)})}}async function vs(n,e,t,s,r={}){const i=await st(n,e,t,s,r);return"mfaPendingCredential"in i&&Me(n,"multi-factor-auth-required",{_serverResponse:i}),i}async function Xl(n,e,t,s){const r=`${e}${t}?${s}`,i=n,o=i.config.emulator?la(n.config,r):`${n.config.apiScheme}://${r}`;return Fp.includes(t)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(o).toString():o}function $p(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class jp{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,s)=>{this.timer=setTimeout(()=>s(Ue(this.auth,"network-request-failed")),Up.get())})}}function js(n,e,t){const s={appName:n.name};t.email&&(s.email=t.email),t.phoneNumber&&(s.phoneNumber=t.phoneNumber);const r=Ue(n,e,s);return r.customData._tokenResponse=t,r}function uc(n){return n!==void 0&&n.enterprise!==void 0}class zp{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return $p(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function qp(n,e){return st(n,"GET","/v2/recaptchaConfig",Ct(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Kp(n,e){return st(n,"POST","/v1/accounts:delete",e)}async function cr(n,e){return st(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zn(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Hp(n,e=!1){const t=me(n),s=await t.getIdToken(e),r=ua(s);F(r&&r.exp&&r.auth_time&&r.iat,t.auth,"internal-error");const i=typeof r.firebase=="object"?r.firebase:void 0,o=i==null?void 0:i.sign_in_provider;return{claims:r,token:s,authTime:Zn(bi(r.auth_time)),issuedAtTime:Zn(bi(r.iat)),expirationTime:Zn(bi(r.exp)),signInProvider:o||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function bi(n){return Number(n)*1e3}function ua(n){const[e,t,s]=n.split(".");if(e===void 0||t===void 0||s===void 0)return Ws("JWT malformed, contained fewer than 3 sections"),null;try{const r=Ml(t);return r?JSON.parse(r):(Ws("Failed to decode base64 JWT payload"),null)}catch(r){return Ws("Caught error parsing JWT payload as JSON",r==null?void 0:r.toString()),null}}function dc(n){const e=ua(n);return F(e,"internal-error"),F(typeof e.exp<"u","internal-error"),F(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function mn(n,e,t=!1){if(t)return e;try{return await e}catch(s){throw s instanceof nt&&Gp(s)&&n.auth.currentUser===n&&await n.auth.signOut(),s}}function Gp({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wp{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const s=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bi{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Zn(this.lastLoginAt),this.creationTime=Zn(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function lr(n){var m;const e=n.auth,t=await n.getIdToken(),s=await mn(n,cr(e,{idToken:t}));F(s==null?void 0:s.users.length,e,"internal-error");const r=s.users[0];n._notifyReloadListener(r);const i=(m=r.providerUserInfo)!=null&&m.length?Zl(r.providerUserInfo):[],o=Jp(n.providerData,i),c=n.isAnonymous,u=!(n.email&&r.passwordHash)&&!(o!=null&&o.length),h=c?u:!1,f={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:o,metadata:new Bi(r.createdAt,r.lastLoginAt),isAnonymous:h};Object.assign(n,f)}async function Qp(n){const e=me(n);await lr(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Jp(n,e){return[...n.filter(s=>!e.some(r=>r.providerId===s.providerId)),...e]}function Zl(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Yp(n,e){const t=await Yl(n,{},async()=>{const s=gs({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:r,apiKey:i}=n.config,o=await Xl(n,r,"/v1/token",`key=${i}`),c=await n._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const u={method:"POST",headers:c,body:s};return n.emulatorConfig&&ys(n.emulatorConfig.host)&&(u.credentials="include"),Jl.fetch()(o,u)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function Xp(n,e){return st(n,"POST","/v2/accounts:revokeToken",Ct(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class on{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){F(e.idToken,"internal-error"),F(typeof e.idToken<"u","internal-error"),F(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):dc(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){F(e.length!==0,"internal-error");const t=dc(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(F(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:s,refreshToken:r,expiresIn:i}=await Yp(e,t);this.updateTokensAndExpiration(s,r,Number(i))}updateTokensAndExpiration(e,t,s){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+s*1e3}static fromJSON(e,t){const{refreshToken:s,accessToken:r,expirationTime:i}=t,o=new on;return s&&(F(typeof s=="string","internal-error",{appName:e}),o.refreshToken=s),r&&(F(typeof r=="string","internal-error",{appName:e}),o.accessToken=r),i&&(F(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new on,this.toJSON())}_performRefresh(){return Qe("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ut(n,e){F(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class Ve{constructor({uid:e,auth:t,stsTokenManager:s,...r}){this.providerId="firebase",this.proactiveRefresh=new Wp(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=r.displayName||null,this.email=r.email||null,this.emailVerified=r.emailVerified||!1,this.phoneNumber=r.phoneNumber||null,this.photoURL=r.photoURL||null,this.isAnonymous=r.isAnonymous||!1,this.tenantId=r.tenantId||null,this.providerData=r.providerData?[...r.providerData]:[],this.metadata=new Bi(r.createdAt||void 0,r.lastLoginAt||void 0)}async getIdToken(e){const t=await mn(this,this.stsTokenManager.getToken(this.auth,e));return F(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Hp(this,e)}reload(){return Qp(this)}_assign(e){this!==e&&(F(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Ve({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){F(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let s=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),s=!0),t&&await lr(this),await this.auth._persistUserIfCurrent(this),s&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(De(this.auth.app))return Promise.reject(Ye(this.auth));const e=await this.getIdToken();return await mn(this,Kp(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const s=t.displayName??void 0,r=t.email??void 0,i=t.phoneNumber??void 0,o=t.photoURL??void 0,c=t.tenantId??void 0,u=t._redirectEventId??void 0,h=t.createdAt??void 0,f=t.lastLoginAt??void 0,{uid:m,emailVerified:E,isAnonymous:S,providerData:P,stsTokenManager:D}=t;F(m&&D,e,"internal-error");const C=on.fromJSON(this.name,D);F(typeof m=="string",e,"internal-error"),ut(s,e.name),ut(r,e.name),F(typeof E=="boolean",e,"internal-error"),F(typeof S=="boolean",e,"internal-error"),ut(i,e.name),ut(o,e.name),ut(c,e.name),ut(u,e.name),ut(h,e.name),ut(f,e.name);const B=new Ve({uid:m,auth:e,email:r,emailVerified:E,displayName:s,isAnonymous:S,photoURL:o,phoneNumber:i,tenantId:c,stsTokenManager:C,createdAt:h,lastLoginAt:f});return P&&Array.isArray(P)&&(B.providerData=P.map($=>({...$}))),u&&(B._redirectEventId=u),B}static async _fromIdTokenResponse(e,t,s=!1){const r=new on;r.updateFromServerResponse(t);const i=new Ve({uid:t.localId,auth:e,stsTokenManager:r,isAnonymous:s});return await lr(i),i}static async _fromGetAccountInfoResponse(e,t,s){const r=t.users[0];F(r.localId!==void 0,"internal-error");const i=r.providerUserInfo!==void 0?Zl(r.providerUserInfo):[],o=!(r.email&&r.passwordHash)&&!(i!=null&&i.length),c=new on;c.updateFromIdToken(s);const u=new Ve({uid:r.localId,auth:e,stsTokenManager:c,isAnonymous:o}),h={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:i,metadata:new Bi(r.createdAt,r.lastLoginAt),isAnonymous:!(r.email&&r.passwordHash)&&!(i!=null&&i.length)};return Object.assign(u,h),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hc=new Map;function Je(n){Ze(n instanceof Function,"Expected a class definition");let e=hc.get(n);return e?(Ze(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,hc.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eu{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}eu.type="NONE";const fc=eu;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qs(n,e,t){return`firebase:${n}:${e}:${t}`}class cn{constructor(e,t,s){this.persistence=e,this.auth=t,this.userKey=s;const{config:r,name:i}=this.auth;this.fullUserKey=Qs(this.userKey,r.apiKey,i),this.fullPersistenceKey=Qs("persistence",r.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await cr(this.auth,{idToken:e}).catch(()=>{});return t?Ve._fromGetAccountInfoResponse(this.auth,t,e):null}return Ve._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,s="authUser"){if(!t.length)return new cn(Je(fc),e,s);const r=(await Promise.all(t.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let i=r[0]||Je(fc);const o=Qs(s,e.config.apiKey,e.name);let c=null;for(const h of t)try{const f=await h._get(o);if(f){let m;if(typeof f=="string"){const E=await cr(e,{idToken:f}).catch(()=>{});if(!E)break;m=await Ve._fromGetAccountInfoResponse(e,E,f)}else m=Ve._fromJSON(e,f);h!==i&&(c=m),i=h;break}}catch{}const u=r.filter(h=>h._shouldAllowMigration);return!i._shouldAllowMigration||!u.length?new cn(i,e,s):(i=u[0],c&&await i._set(o,c.toJSON()),await Promise.all(t.map(async h=>{if(h!==i)try{await h._remove(o)}catch{}})),new cn(i,e,s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pc(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(ru(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(tu(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(au(e))return"Blackberry";if(ou(e))return"Webos";if(nu(e))return"Safari";if((e.includes("chrome/")||su(e))&&!e.includes("edge/"))return"Chrome";if(iu(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,s=n.match(t);if((s==null?void 0:s.length)===2)return s[1]}return"Other"}function tu(n=Te()){return/firefox\//i.test(n)}function nu(n=Te()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function su(n=Te()){return/crios\//i.test(n)}function ru(n=Te()){return/iemobile/i.test(n)}function iu(n=Te()){return/android/i.test(n)}function au(n=Te()){return/blackberry/i.test(n)}function ou(n=Te()){return/webos/i.test(n)}function da(n=Te()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function Zp(n=Te()){var e;return da(n)&&!!((e=window.navigator)!=null&&e.standalone)}function em(){return hf()&&document.documentMode===10}function cu(n=Te()){return da(n)||iu(n)||ou(n)||au(n)||/windows phone/i.test(n)||ru(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lu(n,e=[]){let t;switch(n){case"Browser":t=pc(Te());break;case"Worker":t=`${pc(Te())}-${n}`;break;default:t=n}const s=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${In}/${s}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tm{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const s=i=>new Promise((o,c)=>{try{const u=e(i);o(u)}catch(u){c(u)}});s.onAbort=t,this.queue.push(s);const r=this.queue.length-1;return()=>{this.queue[r]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const s of this.queue)await s(e),s.onAbort&&t.push(s.onAbort)}catch(s){t.reverse();for(const r of t)try{r()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:s==null?void 0:s.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function nm(n,e={}){return st(n,"GET","/v2/passwordPolicy",Ct(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sm=6;class rm{constructor(e){var s;const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??sm,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((s=e.allowedNonAlphanumericCharacters)==null?void 0:s.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const s=this.customStrengthOptions.minPasswordLength,r=this.customStrengthOptions.maxPasswordLength;s&&(t.meetsMinPasswordLength=e.length>=s),r&&(t.meetsMaxPasswordLength=e.length<=r)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let s;for(let r=0;r<e.length;r++)s=e.charAt(r),this.updatePasswordCharacterOptionsStatuses(t,s>="a"&&s<="z",s>="A"&&s<="Z",s>="0"&&s<="9",this.allowedNonAlphanumericCharacters.includes(s))}updatePasswordCharacterOptionsStatuses(e,t,s,r,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=s)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=r)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class im{constructor(e,t,s,r){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=s,this.config=r,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new mc(this),this.idTokenSubscription=new mc(this),this.beforeStateQueue=new tm(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Wl,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=r.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Je(t)),this._initializationPromise=this.queue(async()=>{var s,r,i;if(!this._deleted&&(this.persistenceManager=await cn.create(this,e),(s=this._resolvePersistenceManagerAvailable)==null||s.call(this),!this._deleted)){if((r=this._popupRedirectResolver)!=null&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)==null?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await cr(this,{idToken:e}),s=await Ve._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(s)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var i;if(De(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(c,c))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let s=t,r=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(i=this.redirectUser)==null?void 0:i._redirectEventId,c=s==null?void 0:s._redirectEventId,u=await this.tryRedirectSignIn(e);(!o||o===c)&&(u!=null&&u.user)&&(s=u.user,r=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(r)try{await this.beforeStateQueue.runMiddleware(s)}catch(o){s=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return F(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await lr(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Op()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(De(this.app))return Promise.reject(Ye(this));const t=e?me(e):null;return t&&F(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&F(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return De(this.app)?Promise.reject(Ye(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return De(this.app)?Promise.reject(Ye(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Je(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await nm(this),t=new rm(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new ms("auth","Firebase",e())}onAuthStateChanged(e,t,s){return this.registerStateListener(this.authStateSubscription,e,t,s)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,s){return this.registerStateListener(this.idTokenSubscription,e,t,s)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const s=this.onAuthStateChanged(()=>{s(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),s={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(s.tenantId=this.tenantId),await Xp(this,s)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,t){const s=await this.getOrInitRedirectPersistenceManager(t);return e===null?s.removeCurrentUser():s.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Je(e)||this._popupRedirectResolver;F(t,this,"argument-error"),this.redirectPersistenceManager=await cn.create(this,[Je(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,s;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)==null?void 0:t._redirectEventId)===e?this._currentUser:((s=this.redirectUser)==null?void 0:s._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((t=this.currentUser)==null?void 0:t.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,s,r){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let o=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(F(c,this,"internal-error"),c.then(()=>{o||i(this.currentUser)}),typeof t=="function"){const u=e.addObserver(t,s,r);return()=>{o=!0,u()}}else{const u=e.addObserver(t);return()=>{o=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return F(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=lu(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var r;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await((r=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:r.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const s=await this._getAppCheckToken();return s&&(e["X-Firebase-AppCheck"]=s),e}async _getAppCheckToken(){var t;if(De(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((t=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:t.getToken());return e!=null&&e.error&&Vp(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function Qt(n){return me(n)}class mc{constructor(e){this.auth=e,this.observer=null,this.addObserver=Ef(t=>this.observer=t)}get next(){return F(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Sr={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function am(n){Sr=n}function uu(n){return Sr.loadJS(n)}function om(){return Sr.recaptchaEnterpriseScript}function cm(){return Sr.gapiScript}function lm(n){return`__${n}${Math.floor(Math.random()*1e6)}`}class um{constructor(){this.enterprise=new dm}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class dm{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const hm="recaptcha-enterprise",du="NO_RECAPTCHA";class fm{constructor(e){this.type=hm,this.auth=Qt(e)}async verify(e="verify",t=!1){async function s(i){if(!t){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(o,c)=>{qp(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(u=>{if(u.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const h=new zp(u);return i.tenantId==null?i._agentRecaptchaConfig=h:i._tenantRecaptchaConfigs[i.tenantId]=h,o(h.siteKey)}}).catch(u=>{c(u)})})}function r(i,o,c){const u=window.grecaptcha;uc(u)?u.enterprise.ready(()=>{u.enterprise.execute(i,{action:e}).then(h=>{o(h)}).catch(()=>{o(du)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new um().execute("siteKey",{action:"verify"}):new Promise((i,o)=>{s(this.auth).then(c=>{if(!t&&uc(window.grecaptcha))r(c,i,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let u=om();u.length!==0&&(u+=c),uu(u).then(()=>{r(c,i,o)}).catch(h=>{o(h)})}}).catch(c=>{o(c)})})}}async function gc(n,e,t,s=!1,r=!1){const i=new fm(n);let o;if(r)o=du;else try{o=await i.verify(t)}catch{o=await i.verify(t,!0)}const c={...e};if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in c){const u=c.phoneEnrollmentInfo.phoneNumber,h=c.phoneEnrollmentInfo.recaptchaToken;Object.assign(c,{phoneEnrollmentInfo:{phoneNumber:u,recaptchaToken:h,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in c){const u=c.phoneSignInInfo.recaptchaToken;Object.assign(c,{phoneSignInInfo:{recaptchaToken:u,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return c}return s?Object.assign(c,{captchaResp:o}):Object.assign(c,{captchaResponse:o}),Object.assign(c,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(c,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),c}async function Fi(n,e,t,s,r){var i;if((i=n._getRecaptchaConfig())!=null&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const o=await gc(n,e,t,t==="getOobCode");return s(n,o)}else return s(n,e).catch(async o=>{if(o.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const c=await gc(n,e,t,t==="getOobCode");return s(n,c)}else return Promise.reject(o)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pm(n,e){const t=oa(n,"auth");if(t.isInitialized()){const r=t.getImmediate(),i=t.getOptions();if(jt(i,e??{}))return r;Me(r,"already-initialized")}return t.initialize({options:e})}function mm(n,e){const t=(e==null?void 0:e.persistence)||[],s=(Array.isArray(t)?t:[t]).map(Je);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(s,e==null?void 0:e.popupRedirectResolver)}function gm(n,e,t){const s=Qt(n);F(/^https?:\/\//.test(e),s,"invalid-emulator-scheme");const r=!1,i=hu(e),{host:o,port:c}=ym(e),u=c===null?"":`:${c}`,h={url:`${i}//${o}${u}/`},f=Object.freeze({host:o,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:r})});if(!s._canInitEmulator){F(s.config.emulator&&s.emulatorConfig,s,"emulator-config-failed"),F(jt(h,s.config.emulator)&&jt(f,s.emulatorConfig),s,"emulator-config-failed");return}s.config.emulator=h,s.emulatorConfig=f,s.settings.appVerificationDisabledForTesting=!0,ys(o)?Ul(`${i}//${o}${u}`):_m()}function hu(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function ym(n){const e=hu(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const s=t[2].split("@").pop()||"",r=/^(\[[^\]]+\])(:|$)/.exec(s);if(r){const i=r[1];return{host:i,port:yc(s.substr(i.length+1))}}else{const[i,o]=s.split(":");return{host:i,port:yc(o)}}}function yc(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function _m(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ha{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Qe("not implemented")}_getIdTokenResponse(e){return Qe("not implemented")}_linkToIdToken(e,t){return Qe("not implemented")}_getReauthenticationResolver(e){return Qe("not implemented")}}async function vm(n,e){return st(n,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Em(n,e){return vs(n,"POST","/v1/accounts:signInWithPassword",Ct(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function bm(n,e){return vs(n,"POST","/v1/accounts:signInWithEmailLink",Ct(n,e))}async function Im(n,e){return vs(n,"POST","/v1/accounts:signInWithEmailLink",Ct(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class is extends ha{constructor(e,t,s,r=null){super("password",s),this._email=e,this._password=t,this._tenantId=r}static _fromEmailAndPassword(e,t){return new is(e,t,"password")}static _fromEmailAndCode(e,t,s=null){return new is(e,t,"emailLink",s)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Fi(e,t,"signInWithPassword",Em);case"emailLink":return bm(e,{email:this._email,oobCode:this._password});default:Me(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const s={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Fi(e,s,"signUpPassword",vm);case"emailLink":return Im(e,{idToken:t,email:this._email,oobCode:this._password});default:Me(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ln(n,e){return vs(n,"POST","/v1/accounts:signInWithIdp",Ct(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wm="http://localhost";class qt extends ha{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new qt(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Me("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:s,signInMethod:r,...i}=t;if(!s||!r)return null;const o=new qt(s,r);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return ln(e,t)}_linkToIdToken(e,t){const s=this.buildRequest();return s.idToken=t,ln(e,s)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,ln(e,t)}buildRequest(){const e={requestUri:wm,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=gs(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tm(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Am(n){const e=Gn(Wn(n)).link,t=e?Gn(Wn(e)).deep_link_id:null,s=Gn(Wn(n)).deep_link_id;return(s?Gn(Wn(s)).link:null)||s||t||e||n}class fa{constructor(e){const t=Gn(Wn(e)),s=t.apiKey??null,r=t.oobCode??null,i=Tm(t.mode??null);F(s&&r&&i,"argument-error"),this.apiKey=s,this.operation=i,this.code=r,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(e){const t=Am(e);try{return new fa(t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wn{constructor(){this.providerId=wn.PROVIDER_ID}static credential(e,t){return is._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const s=fa.parseLink(t);return F(s,"argument-error"),is._fromEmailAndCode(e,s.code,s.tenantId)}}wn.PROVIDER_ID="password";wn.EMAIL_PASSWORD_SIGN_IN_METHOD="password";wn.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fu{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Es extends fu{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ht extends Es{constructor(){super("facebook.com")}static credential(e){return qt._fromParams({providerId:ht.PROVIDER_ID,signInMethod:ht.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return ht.credentialFromTaggedObject(e)}static credentialFromError(e){return ht.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return ht.credential(e.oauthAccessToken)}catch{return null}}}ht.FACEBOOK_SIGN_IN_METHOD="facebook.com";ht.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ft extends Es{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return qt._fromParams({providerId:ft.PROVIDER_ID,signInMethod:ft.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return ft.credentialFromTaggedObject(e)}static credentialFromError(e){return ft.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:s}=e;if(!t&&!s)return null;try{return ft.credential(t,s)}catch{return null}}}ft.GOOGLE_SIGN_IN_METHOD="google.com";ft.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pt extends Es{constructor(){super("github.com")}static credential(e){return qt._fromParams({providerId:pt.PROVIDER_ID,signInMethod:pt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return pt.credentialFromTaggedObject(e)}static credentialFromError(e){return pt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return pt.credential(e.oauthAccessToken)}catch{return null}}}pt.GITHUB_SIGN_IN_METHOD="github.com";pt.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mt extends Es{constructor(){super("twitter.com")}static credential(e,t){return qt._fromParams({providerId:mt.PROVIDER_ID,signInMethod:mt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return mt.credentialFromTaggedObject(e)}static credentialFromError(e){return mt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:s}=e;if(!t||!s)return null;try{return mt.credential(t,s)}catch{return null}}}mt.TWITTER_SIGN_IN_METHOD="twitter.com";mt.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Sm(n,e){return vs(n,"POST","/v1/accounts:signUp",Ct(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kt{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,s,r=!1){const i=await Ve._fromIdTokenResponse(e,s,r),o=_c(s);return new Kt({user:i,providerId:o,_tokenResponse:s,operationType:t})}static async _forOperation(e,t,s){await e._updateTokensIfNecessary(s,!0);const r=_c(s);return new Kt({user:e,providerId:r,_tokenResponse:s,operationType:t})}}function _c(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ur extends nt{constructor(e,t,s,r){super(t.code,t.message),this.operationType=s,this.user=r,Object.setPrototypeOf(this,ur.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:s}}static _fromErrorAndOperation(e,t,s,r){return new ur(e,t,s,r)}}function pu(n,e,t,s){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?ur._fromErrorAndOperation(n,i,e,s):i})}async function km(n,e,t=!1){const s=await mn(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Kt._forOperation(n,"link",s)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Rm(n,e,t=!1){const{auth:s}=n;if(De(s.app))return Promise.reject(Ye(s));const r="reauthenticate";try{const i=await mn(n,pu(s,r,e,n),t);F(i.idToken,s,"internal-error");const o=ua(i.idToken);F(o,s,"internal-error");const{sub:c}=o;return F(n.uid===c,s,"user-mismatch"),Kt._forOperation(n,r,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&Me(s,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function mu(n,e,t=!1){if(De(n.app))return Promise.reject(Ye(n));const s="signIn",r=await pu(n,s,e),i=await Kt._fromIdTokenResponse(n,s,r);return t||await n._updateCurrentUser(i.user),i}async function Pm(n,e){return mu(Qt(n),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function gu(n){const e=Qt(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function Cm(n,e,t){if(De(n.app))return Promise.reject(Ye(n));const s=Qt(n),o=await Fi(s,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",Sm).catch(u=>{throw u.code==="auth/password-does-not-meet-requirements"&&gu(n),u}),c=await Kt._fromIdTokenResponse(s,"signIn",o);return await s._updateCurrentUser(c.user),c}function xm(n,e,t){return De(n.app)?Promise.reject(Ye(n)):Pm(me(n),wn.credential(e,t)).catch(async s=>{throw s.code==="auth/password-does-not-meet-requirements"&&gu(n),s})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Dm(n,e){return st(n,"POST","/v1/accounts:update",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Nm(n,{displayName:e,photoURL:t}){const s=me(n),i={idToken:await s.getIdToken(),displayName:e,photoUrl:t,returnSecureToken:!0},o=await mn(s,Dm(s.auth,i));s.displayName=o.displayName||null,s.photoURL=o.photoUrl||null;const c=s.providerData.find(({providerId:u})=>u==="password");c&&(c.displayName=s.displayName,c.photoURL=s.photoURL),await s._updateTokensIfNecessary(o)}function Vm(n,e,t,s){return me(n).onIdTokenChanged(e,t,s)}function Lm(n,e,t){return me(n).beforeAuthStateChanged(e,t)}function Mm(n,e,t,s){return me(n).onAuthStateChanged(e,t,s)}function Om(n){return me(n).signOut()}const dr="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yu{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(dr,"1"),this.storage.removeItem(dr),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bm=1e3,Fm=10;class _u extends yu{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=cu(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const s=this.storage.getItem(t),r=this.localCache[t];s!==r&&e(t,r,s)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,c,u)=>{this.notifyListeners(o,u)});return}const s=e.key;t?this.detachListener():this.stopPolling();const r=()=>{const o=this.storage.getItem(s);!t&&this.localCache[s]===o||this.notifyListeners(s,o)},i=this.storage.getItem(s);em()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(r,Fm):r()}notifyListeners(e,t){this.localCache[e]=t;const s=this.listeners[e];if(s)for(const r of Array.from(s))r(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,s)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:s}),!0)})},Bm)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}_u.type="LOCAL";const Um=_u;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vu extends yu{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}vu.type="SESSION";const Eu=vu;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $m(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kr{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(r=>r.isListeningto(e));if(t)return t;const s=new kr(e);return this.receivers.push(s),s}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:s,eventType:r,data:i}=t.data,o=this.handlersMap[r];if(!(o!=null&&o.size))return;t.ports[0].postMessage({status:"ack",eventId:s,eventType:r});const c=Array.from(o).map(async h=>h(t.origin,i)),u=await $m(c);t.ports[0].postMessage({status:"done",eventId:s,eventType:r,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}kr.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pa(n="",e=10){let t="";for(let s=0;s<e;s++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jm{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,s=50){const r=typeof MessageChannel<"u"?new MessageChannel:null;if(!r)throw new Error("connection_unavailable");let i,o;return new Promise((c,u)=>{const h=pa("",20);r.port1.start();const f=setTimeout(()=>{u(new Error("unsupported_event"))},s);o={messageChannel:r,onMessage(m){const E=m;if(E.data.eventId===h)switch(E.data.status){case"ack":clearTimeout(f),i=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(E.data.response);break;default:clearTimeout(f),clearTimeout(i),u(new Error("invalid_response"));break}}},this.handlers.add(o),r.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:h,data:t},[r.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $e(){return window}function zm(n){$e().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bu(){return typeof $e().WorkerGlobalScope<"u"&&typeof $e().importScripts=="function"}async function qm(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Km(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)==null?void 0:n.controller)||null}function Hm(){return bu()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Iu="firebaseLocalStorageDb",Gm=1,hr="firebaseLocalStorage",wu="fbase_key";class bs{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Rr(n,e){return n.transaction([hr],e?"readwrite":"readonly").objectStore(hr)}function Wm(){const n=indexedDB.deleteDatabase(Iu);return new bs(n).toPromise()}function Ui(){const n=indexedDB.open(Iu,Gm);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const s=n.result;try{s.createObjectStore(hr,{keyPath:wu})}catch(r){t(r)}}),n.addEventListener("success",async()=>{const s=n.result;s.objectStoreNames.contains(hr)?e(s):(s.close(),await Wm(),e(await Ui()))})})}async function vc(n,e,t){const s=Rr(n,!0).put({[wu]:e,value:t});return new bs(s).toPromise()}async function Qm(n,e){const t=Rr(n,!1).get(e),s=await new bs(t).toPromise();return s===void 0?null:s.value}function Ec(n,e){const t=Rr(n,!0).delete(e);return new bs(t).toPromise()}const Jm=800,Ym=3;class Tu{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Ui(),this.db)}async _withRetries(e){let t=0;for(;;)try{const s=await this._openDb();return await e(s)}catch(s){if(t++>Ym)throw s;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return bu()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=kr._getInstance(Hm()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var t,s;if(this.activeServiceWorker=await qm(),!this.activeServiceWorker)return;this.sender=new jm(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(t=e[0])!=null&&t.fulfilled&&(s=e[0])!=null&&s.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Km()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Ui();return await vc(e,dr,"1"),await Ec(e,dr),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(s=>vc(s,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(s=>Qm(s,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Ec(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(r=>{const i=Rr(r,!1).getAll();return new bs(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],s=new Set;if(e.length!==0)for(const{fbase_key:r,value:i}of e)s.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(i)&&(this.notifyListeners(r,i),t.push(r));for(const r of Object.keys(this.localCache))this.localCache[r]&&!s.has(r)&&(this.notifyListeners(r,null),t.push(r));return t}notifyListeners(e,t){this.localCache[e]=t;const s=this.listeners[e];if(s)for(const r of Array.from(s))r(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Jm)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Tu.type="LOCAL";const Xm=Tu;new _s(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zm(n,e){return e?Je(e):(F(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ma extends ha{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return ln(e,this._buildIdpRequest())}_linkToIdToken(e,t){return ln(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return ln(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function eg(n){return mu(n.auth,new ma(n),n.bypassAuthState)}function tg(n){const{auth:e,user:t}=n;return F(t,e,"internal-error"),Rm(t,new ma(n),n.bypassAuthState)}async function ng(n){const{auth:e,user:t}=n;return F(t,e,"internal-error"),km(t,new ma(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Au{constructor(e,t,s,r,i=!1){this.auth=e,this.resolver=s,this.user=r,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(s){this.reject(s)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:s,postBody:r,tenantId:i,error:o,type:c}=e;if(o){this.reject(o);return}const u={auth:this.auth,requestUri:t,sessionId:s,tenantId:i||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(u))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return eg;case"linkViaPopup":case"linkViaRedirect":return ng;case"reauthViaPopup":case"reauthViaRedirect":return tg;default:Me(this.auth,"internal-error")}}resolve(e){Ze(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Ze(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sg=new _s(2e3,1e4);class an extends Au{constructor(e,t,s,r,i){super(e,t,r,i),this.provider=s,this.authWindow=null,this.pollId=null,an.currentPopupAction&&an.currentPopupAction.cancel(),an.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return F(e,this.auth,"internal-error"),e}async onExecution(){Ze(this.filter.length===1,"Popup operations only handle one event");const e=pa();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Ue(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(Ue(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,an.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,s;if((s=(t=this.authWindow)==null?void 0:t.window)!=null&&s.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Ue(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,sg.get())};e()}}an.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rg="pendingRedirect",Js=new Map;class ig extends Au{constructor(e,t,s=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,s),this.eventId=null}async execute(){let e=Js.get(this.auth._key());if(!e){try{const s=await ag(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(s)}catch(t){e=()=>Promise.reject(t)}Js.set(this.auth._key(),e)}return this.bypassAuthState||Js.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function ag(n,e){const t=lg(e),s=cg(n);if(!await s._isAvailable())return!1;const r=await s._get(t)==="true";return await s._remove(t),r}function og(n,e){Js.set(n._key(),e)}function cg(n){return Je(n._redirectPersistence)}function lg(n){return Qs(rg,n.config.apiKey,n.name)}async function ug(n,e,t=!1){if(De(n.app))return Promise.reject(Ye(n));const s=Qt(n),r=Zm(s,e),o=await new ig(s,r,t).execute();return o&&!t&&(delete o.user._redirectEventId,await s._persistUserIfCurrent(o.user),await s._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dg=600*1e3;class hg{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(s=>{this.isEventForConsumer(e,s)&&(t=!0,this.sendToConsumer(e,s),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!fg(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var s;if(e.error&&!Su(e)){const r=((s=e.error.code)==null?void 0:s.split("auth/")[1])||"internal-error";t.onError(Ue(this.auth,r))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const s=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&s}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=dg&&this.cachedEventUids.clear(),this.cachedEventUids.has(bc(e))}saveEventToCache(e){this.cachedEventUids.add(bc(e)),this.lastProcessedEventTime=Date.now()}}function bc(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Su({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function fg(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Su(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function pg(n,e={}){return st(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mg=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,gg=/^https?/;async function yg(n){if(n.config.emulator)return;const{authorizedDomains:e}=await pg(n);for(const t of e)try{if(_g(t))return}catch{}Me(n,"unauthorized-domain")}function _g(n){const e=Oi(),{protocol:t,hostname:s}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&s===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===s}if(!gg.test(t))return!1;if(mg.test(n))return s===n;const r=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+r+"|"+r+")$","i").test(s)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vg=new _s(3e4,6e4);function Ic(){const n=$e().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function Eg(n){return new Promise((e,t)=>{var r,i,o;function s(){Ic(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Ic(),t(Ue(n,"network-request-failed"))},timeout:vg.get()})}if((i=(r=$e().gapi)==null?void 0:r.iframes)!=null&&i.Iframe)e(gapi.iframes.getContext());else if((o=$e().gapi)!=null&&o.load)s();else{const c=lm("iframefcb");return $e()[c]=()=>{gapi.load?s():t(Ue(n,"network-request-failed"))},uu(`${cm()}?onload=${c}`).catch(u=>t(u))}}).catch(e=>{throw Ys=null,e})}let Ys=null;function bg(n){return Ys=Ys||Eg(n),Ys}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ig=new _s(5e3,15e3),wg="__/auth/iframe",Tg="emulator/auth/iframe",Ag={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Sg=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function kg(n){const e=n.config;F(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?la(e,Tg):`https://${n.config.authDomain}/${wg}`,s={apiKey:e.apiKey,appName:n.name,v:In},r=Sg.get(n.config.apiHost);r&&(s.eid=r);const i=n._getFrameworks();return i.length&&(s.fw=i.join(",")),`${t}?${gs(s).slice(1)}`}async function Rg(n){const e=await bg(n),t=$e().gapi;return F(t,n,"internal-error"),e.open({where:document.body,url:kg(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Ag,dontclear:!0},s=>new Promise(async(r,i)=>{await s.restyle({setHideOnLeave:!1});const o=Ue(n,"network-request-failed"),c=$e().setTimeout(()=>{i(o)},Ig.get());function u(){$e().clearTimeout(c),r(s)}s.ping(u).then(u,()=>{i(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pg={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Cg=500,xg=600,Dg="_blank",Ng="http://localhost";class wc{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Vg(n,e,t,s=Cg,r=xg){const i=Math.max((window.screen.availHeight-r)/2,0).toString(),o=Math.max((window.screen.availWidth-s)/2,0).toString();let c="";const u={...Pg,width:s.toString(),height:r.toString(),top:i,left:o},h=Te().toLowerCase();t&&(c=su(h)?Dg:t),tu(h)&&(e=e||Ng,u.scrollbars="yes");const f=Object.entries(u).reduce((E,[S,P])=>`${E}${S}=${P},`,"");if(Zp(h)&&c!=="_self")return Lg(e||"",c),new wc(null);const m=window.open(e||"",c,f);F(m,n,"popup-blocked");try{m.focus()}catch{}return new wc(m)}function Lg(n,e){const t=document.createElement("a");t.href=n,t.target=e;const s=document.createEvent("MouseEvent");s.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(s)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mg="__/auth/handler",Og="emulator/auth/handler",Bg=encodeURIComponent("fac");async function Tc(n,e,t,s,r,i){F(n.config.authDomain,n,"auth-domain-config-required"),F(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:s,v:In,eventId:r};if(e instanceof fu){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",vf(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,m]of Object.entries({}))o[f]=m}if(e instanceof Es){const f=e.getScopes().filter(m=>m!=="");f.length>0&&(o.scopes=f.join(","))}n.tenantId&&(o.tid=n.tenantId);const c=o;for(const f of Object.keys(c))c[f]===void 0&&delete c[f];const u=await n._getAppCheckToken(),h=u?`#${Bg}=${encodeURIComponent(u)}`:"";return`${Fg(n)}?${gs(c).slice(1)}${h}`}function Fg({config:n}){return n.emulator?la(n,Og):`https://${n.authDomain}/${Mg}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ii="webStorageSupport";class Ug{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Eu,this._completeRedirectFn=ug,this._overrideRedirectResult=og}async _openPopup(e,t,s,r){var o;Ze((o=this.eventManagers[e._key()])==null?void 0:o.manager,"_initialize() not called before _openPopup()");const i=await Tc(e,t,s,Oi(),r);return Vg(e,i,pa())}async _openRedirect(e,t,s,r){await this._originValidation(e);const i=await Tc(e,t,s,Oi(),r);return zm(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:r,promise:i}=this.eventManagers[t];return r?Promise.resolve(r):(Ze(i,"If manager is not set, promise should be"),i)}const s=this.initAndGetManager(e);return this.eventManagers[t]={promise:s},s.catch(()=>{delete this.eventManagers[t]}),s}async initAndGetManager(e){const t=await Rg(e),s=new hg(e);return t.register("authEvent",r=>(F(r==null?void 0:r.authEvent,e,"invalid-auth-event"),{status:s.onEvent(r.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:s},this.iframes[e._key()]=t,s}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Ii,{type:Ii},r=>{var o;const i=(o=r==null?void 0:r[0])==null?void 0:o[Ii];i!==void 0&&t(!!i),Me(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=yg(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return cu()||nu()||da()}}const $g=Ug;var Ac="@firebase/auth",Sc="1.13.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jg{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(s=>{e((s==null?void 0:s.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){F(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zg(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function qg(n){pn(new zt("auth",(e,{options:t})=>{const s=e.getProvider("app").getImmediate(),r=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:c}=s.options;F(o&&!o.includes(":"),"invalid-api-key",{appName:s.name});const u={apiKey:o,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:lu(n)},h=new im(s,r,i,u);return mm(h,t),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,s)=>{e.getProvider("auth-internal").initialize()})),pn(new zt("auth-internal",e=>{const t=Qt(e.getProvider("auth").getImmediate());return(s=>new jg(s))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Et(Ac,Sc,zg(n)),Et(Ac,Sc,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kg=300,Hg=Fl("authIdTokenMaxAge")||Kg;let kc=null;const Gg=n=>async e=>{const t=e&&await e.getIdTokenResult(),s=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(s&&s>Hg)return;const r=t==null?void 0:t.token;kc!==r&&(kc=r,await fetch(n,{method:r?"POST":"DELETE",headers:r?{Authorization:`Bearer ${r}`}:{}}))};function Wg(n=ql()){const e=oa(n,"auth");if(e.isInitialized())return e.getImmediate();const t=pm(n,{popupRedirectResolver:$g,persistence:[Xm,Um,Eu]}),s=Fl("authTokenSyncURL");if(s&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(s,location.origin);if(location.origin===i.origin){const o=Gg(i.toString());Lm(t,o,()=>o(t.currentUser)),Vm(t,c=>o(c))}}const r=Ol("auth");return r&&gm(t,`http://${r}`),t}function Qg(){var n;return((n=document.getElementsByTagName("head"))==null?void 0:n[0])??document}am({loadJS(n){return new Promise((e,t)=>{const s=document.createElement("script");s.setAttribute("src",n),s.onload=e,s.onerror=r=>{const i=Ue("internal-error");i.customData=r,t(i)},s.type="text/javascript",s.charset="UTF-8",Qg().appendChild(s)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});qg("Browser");var Rc=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var bt,ku;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(v,g){function y(){}y.prototype=g.prototype,v.F=g.prototype,v.prototype=new y,v.prototype.constructor=v,v.D=function(I,b,T){for(var _=Array(arguments.length-2),ke=2;ke<arguments.length;ke++)_[ke-2]=arguments[ke];return g.prototype[b].apply(I,_)}}function t(){this.blockSize=-1}function s(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(s,t),s.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function r(v,g,y){y||(y=0);const I=Array(16);if(typeof g=="string")for(var b=0;b<16;++b)I[b]=g.charCodeAt(y++)|g.charCodeAt(y++)<<8|g.charCodeAt(y++)<<16|g.charCodeAt(y++)<<24;else for(b=0;b<16;++b)I[b]=g[y++]|g[y++]<<8|g[y++]<<16|g[y++]<<24;g=v.g[0],y=v.g[1],b=v.g[2];let T=v.g[3],_;_=g+(T^y&(b^T))+I[0]+3614090360&4294967295,g=y+(_<<7&4294967295|_>>>25),_=T+(b^g&(y^b))+I[1]+3905402710&4294967295,T=g+(_<<12&4294967295|_>>>20),_=b+(y^T&(g^y))+I[2]+606105819&4294967295,b=T+(_<<17&4294967295|_>>>15),_=y+(g^b&(T^g))+I[3]+3250441966&4294967295,y=b+(_<<22&4294967295|_>>>10),_=g+(T^y&(b^T))+I[4]+4118548399&4294967295,g=y+(_<<7&4294967295|_>>>25),_=T+(b^g&(y^b))+I[5]+1200080426&4294967295,T=g+(_<<12&4294967295|_>>>20),_=b+(y^T&(g^y))+I[6]+2821735955&4294967295,b=T+(_<<17&4294967295|_>>>15),_=y+(g^b&(T^g))+I[7]+4249261313&4294967295,y=b+(_<<22&4294967295|_>>>10),_=g+(T^y&(b^T))+I[8]+1770035416&4294967295,g=y+(_<<7&4294967295|_>>>25),_=T+(b^g&(y^b))+I[9]+2336552879&4294967295,T=g+(_<<12&4294967295|_>>>20),_=b+(y^T&(g^y))+I[10]+4294925233&4294967295,b=T+(_<<17&4294967295|_>>>15),_=y+(g^b&(T^g))+I[11]+2304563134&4294967295,y=b+(_<<22&4294967295|_>>>10),_=g+(T^y&(b^T))+I[12]+1804603682&4294967295,g=y+(_<<7&4294967295|_>>>25),_=T+(b^g&(y^b))+I[13]+4254626195&4294967295,T=g+(_<<12&4294967295|_>>>20),_=b+(y^T&(g^y))+I[14]+2792965006&4294967295,b=T+(_<<17&4294967295|_>>>15),_=y+(g^b&(T^g))+I[15]+1236535329&4294967295,y=b+(_<<22&4294967295|_>>>10),_=g+(b^T&(y^b))+I[1]+4129170786&4294967295,g=y+(_<<5&4294967295|_>>>27),_=T+(y^b&(g^y))+I[6]+3225465664&4294967295,T=g+(_<<9&4294967295|_>>>23),_=b+(g^y&(T^g))+I[11]+643717713&4294967295,b=T+(_<<14&4294967295|_>>>18),_=y+(T^g&(b^T))+I[0]+3921069994&4294967295,y=b+(_<<20&4294967295|_>>>12),_=g+(b^T&(y^b))+I[5]+3593408605&4294967295,g=y+(_<<5&4294967295|_>>>27),_=T+(y^b&(g^y))+I[10]+38016083&4294967295,T=g+(_<<9&4294967295|_>>>23),_=b+(g^y&(T^g))+I[15]+3634488961&4294967295,b=T+(_<<14&4294967295|_>>>18),_=y+(T^g&(b^T))+I[4]+3889429448&4294967295,y=b+(_<<20&4294967295|_>>>12),_=g+(b^T&(y^b))+I[9]+568446438&4294967295,g=y+(_<<5&4294967295|_>>>27),_=T+(y^b&(g^y))+I[14]+3275163606&4294967295,T=g+(_<<9&4294967295|_>>>23),_=b+(g^y&(T^g))+I[3]+4107603335&4294967295,b=T+(_<<14&4294967295|_>>>18),_=y+(T^g&(b^T))+I[8]+1163531501&4294967295,y=b+(_<<20&4294967295|_>>>12),_=g+(b^T&(y^b))+I[13]+2850285829&4294967295,g=y+(_<<5&4294967295|_>>>27),_=T+(y^b&(g^y))+I[2]+4243563512&4294967295,T=g+(_<<9&4294967295|_>>>23),_=b+(g^y&(T^g))+I[7]+1735328473&4294967295,b=T+(_<<14&4294967295|_>>>18),_=y+(T^g&(b^T))+I[12]+2368359562&4294967295,y=b+(_<<20&4294967295|_>>>12),_=g+(y^b^T)+I[5]+4294588738&4294967295,g=y+(_<<4&4294967295|_>>>28),_=T+(g^y^b)+I[8]+2272392833&4294967295,T=g+(_<<11&4294967295|_>>>21),_=b+(T^g^y)+I[11]+1839030562&4294967295,b=T+(_<<16&4294967295|_>>>16),_=y+(b^T^g)+I[14]+4259657740&4294967295,y=b+(_<<23&4294967295|_>>>9),_=g+(y^b^T)+I[1]+2763975236&4294967295,g=y+(_<<4&4294967295|_>>>28),_=T+(g^y^b)+I[4]+1272893353&4294967295,T=g+(_<<11&4294967295|_>>>21),_=b+(T^g^y)+I[7]+4139469664&4294967295,b=T+(_<<16&4294967295|_>>>16),_=y+(b^T^g)+I[10]+3200236656&4294967295,y=b+(_<<23&4294967295|_>>>9),_=g+(y^b^T)+I[13]+681279174&4294967295,g=y+(_<<4&4294967295|_>>>28),_=T+(g^y^b)+I[0]+3936430074&4294967295,T=g+(_<<11&4294967295|_>>>21),_=b+(T^g^y)+I[3]+3572445317&4294967295,b=T+(_<<16&4294967295|_>>>16),_=y+(b^T^g)+I[6]+76029189&4294967295,y=b+(_<<23&4294967295|_>>>9),_=g+(y^b^T)+I[9]+3654602809&4294967295,g=y+(_<<4&4294967295|_>>>28),_=T+(g^y^b)+I[12]+3873151461&4294967295,T=g+(_<<11&4294967295|_>>>21),_=b+(T^g^y)+I[15]+530742520&4294967295,b=T+(_<<16&4294967295|_>>>16),_=y+(b^T^g)+I[2]+3299628645&4294967295,y=b+(_<<23&4294967295|_>>>9),_=g+(b^(y|~T))+I[0]+4096336452&4294967295,g=y+(_<<6&4294967295|_>>>26),_=T+(y^(g|~b))+I[7]+1126891415&4294967295,T=g+(_<<10&4294967295|_>>>22),_=b+(g^(T|~y))+I[14]+2878612391&4294967295,b=T+(_<<15&4294967295|_>>>17),_=y+(T^(b|~g))+I[5]+4237533241&4294967295,y=b+(_<<21&4294967295|_>>>11),_=g+(b^(y|~T))+I[12]+1700485571&4294967295,g=y+(_<<6&4294967295|_>>>26),_=T+(y^(g|~b))+I[3]+2399980690&4294967295,T=g+(_<<10&4294967295|_>>>22),_=b+(g^(T|~y))+I[10]+4293915773&4294967295,b=T+(_<<15&4294967295|_>>>17),_=y+(T^(b|~g))+I[1]+2240044497&4294967295,y=b+(_<<21&4294967295|_>>>11),_=g+(b^(y|~T))+I[8]+1873313359&4294967295,g=y+(_<<6&4294967295|_>>>26),_=T+(y^(g|~b))+I[15]+4264355552&4294967295,T=g+(_<<10&4294967295|_>>>22),_=b+(g^(T|~y))+I[6]+2734768916&4294967295,b=T+(_<<15&4294967295|_>>>17),_=y+(T^(b|~g))+I[13]+1309151649&4294967295,y=b+(_<<21&4294967295|_>>>11),_=g+(b^(y|~T))+I[4]+4149444226&4294967295,g=y+(_<<6&4294967295|_>>>26),_=T+(y^(g|~b))+I[11]+3174756917&4294967295,T=g+(_<<10&4294967295|_>>>22),_=b+(g^(T|~y))+I[2]+718787259&4294967295,b=T+(_<<15&4294967295|_>>>17),_=y+(T^(b|~g))+I[9]+3951481745&4294967295,v.g[0]=v.g[0]+g&4294967295,v.g[1]=v.g[1]+(b+(_<<21&4294967295|_>>>11))&4294967295,v.g[2]=v.g[2]+b&4294967295,v.g[3]=v.g[3]+T&4294967295}s.prototype.v=function(v,g){g===void 0&&(g=v.length);const y=g-this.blockSize,I=this.C;let b=this.h,T=0;for(;T<g;){if(b==0)for(;T<=y;)r(this,v,T),T+=this.blockSize;if(typeof v=="string"){for(;T<g;)if(I[b++]=v.charCodeAt(T++),b==this.blockSize){r(this,I),b=0;break}}else for(;T<g;)if(I[b++]=v[T++],b==this.blockSize){r(this,I),b=0;break}}this.h=b,this.o+=g},s.prototype.A=function(){var v=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);v[0]=128;for(var g=1;g<v.length-8;++g)v[g]=0;g=this.o*8;for(var y=v.length-8;y<v.length;++y)v[y]=g&255,g/=256;for(this.v(v),v=Array(16),g=0,y=0;y<4;++y)for(let I=0;I<32;I+=8)v[g++]=this.g[y]>>>I&255;return v};function i(v,g){var y=c;return Object.prototype.hasOwnProperty.call(y,v)?y[v]:y[v]=g(v)}function o(v,g){this.h=g;const y=[];let I=!0;for(let b=v.length-1;b>=0;b--){const T=v[b]|0;I&&T==g||(y[b]=T,I=!1)}this.g=y}var c={};function u(v){return-128<=v&&v<128?i(v,function(g){return new o([g|0],g<0?-1:0)}):new o([v|0],v<0?-1:0)}function h(v){if(isNaN(v)||!isFinite(v))return m;if(v<0)return C(h(-v));const g=[];let y=1;for(let I=0;v>=y;I++)g[I]=v/y|0,y*=4294967296;return new o(g,0)}function f(v,g){if(v.length==0)throw Error("number format error: empty string");if(g=g||10,g<2||36<g)throw Error("radix out of range: "+g);if(v.charAt(0)=="-")return C(f(v.substring(1),g));if(v.indexOf("-")>=0)throw Error('number format error: interior "-" character');const y=h(Math.pow(g,8));let I=m;for(let T=0;T<v.length;T+=8){var b=Math.min(8,v.length-T);const _=parseInt(v.substring(T,T+b),g);b<8?(b=h(Math.pow(g,b)),I=I.j(b).add(h(_))):(I=I.j(y),I=I.add(h(_)))}return I}var m=u(0),E=u(1),S=u(16777216);n=o.prototype,n.m=function(){if(D(this))return-C(this).m();let v=0,g=1;for(let y=0;y<this.g.length;y++){const I=this.i(y);v+=(I>=0?I:4294967296+I)*g,g*=4294967296}return v},n.toString=function(v){if(v=v||10,v<2||36<v)throw Error("radix out of range: "+v);if(P(this))return"0";if(D(this))return"-"+C(this).toString(v);const g=h(Math.pow(v,6));var y=this;let I="";for(;;){const b=q(y,g).g;y=B(y,b.j(g));let T=((y.g.length>0?y.g[0]:y.h)>>>0).toString(v);if(y=b,P(y))return T+I;for(;T.length<6;)T="0"+T;I=T+I}},n.i=function(v){return v<0?0:v<this.g.length?this.g[v]:this.h};function P(v){if(v.h!=0)return!1;for(let g=0;g<v.g.length;g++)if(v.g[g]!=0)return!1;return!0}function D(v){return v.h==-1}n.l=function(v){return v=B(this,v),D(v)?-1:P(v)?0:1};function C(v){const g=v.g.length,y=[];for(let I=0;I<g;I++)y[I]=~v.g[I];return new o(y,~v.h).add(E)}n.abs=function(){return D(this)?C(this):this},n.add=function(v){const g=Math.max(this.g.length,v.g.length),y=[];let I=0;for(let b=0;b<=g;b++){let T=I+(this.i(b)&65535)+(v.i(b)&65535),_=(T>>>16)+(this.i(b)>>>16)+(v.i(b)>>>16);I=_>>>16,T&=65535,_&=65535,y[b]=_<<16|T}return new o(y,y[y.length-1]&-2147483648?-1:0)};function B(v,g){return v.add(C(g))}n.j=function(v){if(P(this)||P(v))return m;if(D(this))return D(v)?C(this).j(C(v)):C(C(this).j(v));if(D(v))return C(this.j(C(v)));if(this.l(S)<0&&v.l(S)<0)return h(this.m()*v.m());const g=this.g.length+v.g.length,y=[];for(var I=0;I<2*g;I++)y[I]=0;for(I=0;I<this.g.length;I++)for(let b=0;b<v.g.length;b++){const T=this.i(I)>>>16,_=this.i(I)&65535,ke=v.i(b)>>>16,Nt=v.i(b)&65535;y[2*I+2*b]+=_*Nt,$(y,2*I+2*b),y[2*I+2*b+1]+=T*Nt,$(y,2*I+2*b+1),y[2*I+2*b+1]+=_*ke,$(y,2*I+2*b+1),y[2*I+2*b+2]+=T*ke,$(y,2*I+2*b+2)}for(v=0;v<g;v++)y[v]=y[2*v+1]<<16|y[2*v];for(v=g;v<2*g;v++)y[v]=0;return new o(y,0)};function $(v,g){for(;(v[g]&65535)!=v[g];)v[g+1]+=v[g]>>>16,v[g]&=65535,g++}function H(v,g){this.g=v,this.h=g}function q(v,g){if(P(g))throw Error("division by zero");if(P(v))return new H(m,m);if(D(v))return g=q(C(v),g),new H(C(g.g),C(g.h));if(D(g))return g=q(v,C(g)),new H(C(g.g),g.h);if(v.g.length>30){if(D(v)||D(g))throw Error("slowDivide_ only works with positive integers.");for(var y=E,I=g;I.l(v)<=0;)y=G(y),I=G(I);var b=Z(y,1),T=Z(I,1);for(I=Z(I,2),y=Z(y,2);!P(I);){var _=T.add(I);_.l(v)<=0&&(b=b.add(y),T=_),I=Z(I,1),y=Z(y,1)}return g=B(v,b.j(g)),new H(b,g)}for(b=m;v.l(g)>=0;){for(y=Math.max(1,Math.floor(v.m()/g.m())),I=Math.ceil(Math.log(y)/Math.LN2),I=I<=48?1:Math.pow(2,I-48),T=h(y),_=T.j(g);D(_)||_.l(v)>0;)y-=I,T=h(y),_=T.j(g);P(T)&&(T=E),b=b.add(T),v=B(v,_)}return new H(b,v)}n.B=function(v){return q(this,v).h},n.and=function(v){const g=Math.max(this.g.length,v.g.length),y=[];for(let I=0;I<g;I++)y[I]=this.i(I)&v.i(I);return new o(y,this.h&v.h)},n.or=function(v){const g=Math.max(this.g.length,v.g.length),y=[];for(let I=0;I<g;I++)y[I]=this.i(I)|v.i(I);return new o(y,this.h|v.h)},n.xor=function(v){const g=Math.max(this.g.length,v.g.length),y=[];for(let I=0;I<g;I++)y[I]=this.i(I)^v.i(I);return new o(y,this.h^v.h)};function G(v){const g=v.g.length+1,y=[];for(let I=0;I<g;I++)y[I]=v.i(I)<<1|v.i(I-1)>>>31;return new o(y,v.h)}function Z(v,g){const y=g>>5;g%=32;const I=v.g.length-y,b=[];for(let T=0;T<I;T++)b[T]=g>0?v.i(T+y)>>>g|v.i(T+y+1)<<32-g:v.i(T+y);return new o(b,v.h)}s.prototype.digest=s.prototype.A,s.prototype.reset=s.prototype.u,s.prototype.update=s.prototype.v,ku=s,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.B,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=h,o.fromString=f,bt=o}).apply(typeof Rc<"u"?Rc:typeof self<"u"?self:typeof window<"u"?window:{});var zs=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Ru,Qn,Pu,Xs,$i,Cu,xu,Du;(function(){var n,e=Object.defineProperty;function t(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof zs=="object"&&zs];for(var l=0;l<a.length;++l){var d=a[l];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var s=t(this);function r(a,l){if(l)e:{var d=s;a=a.split(".");for(var p=0;p<a.length-1;p++){var w=a[p];if(!(w in d))break e;d=d[w]}a=a[a.length-1],p=d[a],l=l(p),l!=p&&l!=null&&e(d,a,{configurable:!0,writable:!0,value:l})}}r("Symbol.dispose",function(a){return a||Symbol("Symbol.dispose")}),r("Array.prototype.values",function(a){return a||function(){return this[Symbol.iterator]()}}),r("Object.entries",function(a){return a||function(l){var d=[],p;for(p in l)Object.prototype.hasOwnProperty.call(l,p)&&d.push([p,l[p]]);return d}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var i=i||{},o=this||self;function c(a){var l=typeof a;return l=="object"&&a!=null||l=="function"}function u(a,l,d){return a.call.apply(a.bind,arguments)}function h(a,l,d){return h=u,h.apply(null,arguments)}function f(a,l){var d=Array.prototype.slice.call(arguments,1);return function(){var p=d.slice();return p.push.apply(p,arguments),a.apply(this,p)}}function m(a,l){function d(){}d.prototype=l.prototype,a.Z=l.prototype,a.prototype=new d,a.prototype.constructor=a,a.Ob=function(p,w,A){for(var x=Array(arguments.length-2),K=2;K<arguments.length;K++)x[K-2]=arguments[K];return l.prototype[w].apply(p,x)}}var E=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?a=>a&&AsyncContext.Snapshot.wrap(a):a=>a;function S(a){const l=a.length;if(l>0){const d=Array(l);for(let p=0;p<l;p++)d[p]=a[p];return d}return[]}function P(a,l){for(let p=1;p<arguments.length;p++){const w=arguments[p];var d=typeof w;if(d=d!="object"?d:w?Array.isArray(w)?"array":d:"null",d=="array"||d=="object"&&typeof w.length=="number"){d=a.length||0;const A=w.length||0;a.length=d+A;for(let x=0;x<A;x++)a[d+x]=w[x]}else a.push(w)}}class D{constructor(l,d){this.i=l,this.j=d,this.h=0,this.g=null}get(){let l;return this.h>0?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function C(a){o.setTimeout(()=>{throw a},0)}function B(){var a=v;let l=null;return a.g&&(l=a.g,a.g=a.g.next,a.g||(a.h=null),l.next=null),l}class ${constructor(){this.h=this.g=null}add(l,d){const p=H.get();p.set(l,d),this.h?this.h.next=p:this.g=p,this.h=p}}var H=new D(()=>new q,a=>a.reset());class q{constructor(){this.next=this.g=this.h=null}set(l,d){this.h=l,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let G,Z=!1,v=new $,g=()=>{const a=Promise.resolve(void 0);G=()=>{a.then(y)}};function y(){for(var a;a=B();){try{a.h.call(a.g)}catch(d){C(d)}var l=H;l.j(a),l.h<100&&(l.h++,a.next=l.g,l.g=a)}Z=!1}function I(){this.u=this.u,this.C=this.C}I.prototype.u=!1,I.prototype.dispose=function(){this.u||(this.u=!0,this.N())},I.prototype[Symbol.dispose]=function(){this.dispose()},I.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function b(a,l){this.type=a,this.g=this.target=l,this.defaultPrevented=!1}b.prototype.h=function(){this.defaultPrevented=!0};var T=(function(){if(!o.addEventListener||!Object.defineProperty)return!1;var a=!1,l=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const d=()=>{};o.addEventListener("test",d,l),o.removeEventListener("test",d,l)}catch{}return a})();function _(a){return/^[\s\xa0]*$/.test(a)}function ke(a,l){b.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a&&this.init(a,l)}m(ke,b),ke.prototype.init=function(a,l){const d=this.type=a.type,p=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;this.target=a.target||a.srcElement,this.g=l,l=a.relatedTarget,l||(d=="mouseover"?l=a.fromElement:d=="mouseout"&&(l=a.toElement)),this.relatedTarget=l,p?(this.clientX=p.clientX!==void 0?p.clientX:p.pageX,this.clientY=p.clientY!==void 0?p.clientY:p.pageY,this.screenX=p.screenX||0,this.screenY=p.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=a.pointerType,this.state=a.state,this.i=a,a.defaultPrevented&&ke.Z.h.call(this)},ke.prototype.h=function(){ke.Z.h.call(this);const a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var Nt="closure_listenable_"+(Math.random()*1e6|0),fh=0;function ph(a,l,d,p,w){this.listener=a,this.proxy=null,this.src=l,this.type=d,this.capture=!!p,this.ha=w,this.key=++fh,this.da=this.fa=!1}function ks(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function Rs(a,l,d){for(const p in a)l.call(d,a[p],p,a)}function mh(a,l){for(const d in a)l.call(void 0,a[d],d,a)}function Ja(a){const l={};for(const d in a)l[d]=a[d];return l}const Ya="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Xa(a,l){let d,p;for(let w=1;w<arguments.length;w++){p=arguments[w];for(d in p)a[d]=p[d];for(let A=0;A<Ya.length;A++)d=Ya[A],Object.prototype.hasOwnProperty.call(p,d)&&(a[d]=p[d])}}function Ps(a){this.src=a,this.g={},this.h=0}Ps.prototype.add=function(a,l,d,p,w){const A=a.toString();a=this.g[A],a||(a=this.g[A]=[],this.h++);const x=Gr(a,l,p,w);return x>-1?(l=a[x],d||(l.fa=!1)):(l=new ph(l,this.src,A,!!p,w),l.fa=d,a.push(l)),l};function Hr(a,l){const d=l.type;if(d in a.g){var p=a.g[d],w=Array.prototype.indexOf.call(p,l,void 0),A;(A=w>=0)&&Array.prototype.splice.call(p,w,1),A&&(ks(l),a.g[d].length==0&&(delete a.g[d],a.h--))}}function Gr(a,l,d,p){for(let w=0;w<a.length;++w){const A=a[w];if(!A.da&&A.listener==l&&A.capture==!!d&&A.ha==p)return w}return-1}var Wr="closure_lm_"+(Math.random()*1e6|0),Qr={};function Za(a,l,d,p,w){if(Array.isArray(l)){for(let A=0;A<l.length;A++)Za(a,l[A],d,p,w);return null}return d=no(d),a&&a[Nt]?a.J(l,d,c(p)?!!p.capture:!1,w):gh(a,l,d,!1,p,w)}function gh(a,l,d,p,w,A){if(!l)throw Error("Invalid event type");const x=c(w)?!!w.capture:!!w;let K=Yr(a);if(K||(a[Wr]=K=new Ps(a)),d=K.add(l,d,p,x,A),d.proxy)return d;if(p=yh(),d.proxy=p,p.src=a,p.listener=d,a.addEventListener)T||(w=x),w===void 0&&(w=!1),a.addEventListener(l.toString(),p,w);else if(a.attachEvent)a.attachEvent(to(l.toString()),p);else if(a.addListener&&a.removeListener)a.addListener(p);else throw Error("addEventListener and attachEvent are unavailable.");return d}function yh(){function a(d){return l.call(a.src,a.listener,d)}const l=_h;return a}function eo(a,l,d,p,w){if(Array.isArray(l))for(var A=0;A<l.length;A++)eo(a,l[A],d,p,w);else p=c(p)?!!p.capture:!!p,d=no(d),a&&a[Nt]?(a=a.i,A=String(l).toString(),A in a.g&&(l=a.g[A],d=Gr(l,d,p,w),d>-1&&(ks(l[d]),Array.prototype.splice.call(l,d,1),l.length==0&&(delete a.g[A],a.h--)))):a&&(a=Yr(a))&&(l=a.g[l.toString()],a=-1,l&&(a=Gr(l,d,p,w)),(d=a>-1?l[a]:null)&&Jr(d))}function Jr(a){if(typeof a!="number"&&a&&!a.da){var l=a.src;if(l&&l[Nt])Hr(l.i,a);else{var d=a.type,p=a.proxy;l.removeEventListener?l.removeEventListener(d,p,a.capture):l.detachEvent?l.detachEvent(to(d),p):l.addListener&&l.removeListener&&l.removeListener(p),(d=Yr(l))?(Hr(d,a),d.h==0&&(d.src=null,l[Wr]=null)):ks(a)}}}function to(a){return a in Qr?Qr[a]:Qr[a]="on"+a}function _h(a,l){if(a.da)a=!0;else{l=new ke(l,this);const d=a.listener,p=a.ha||a.src;a.fa&&Jr(a),a=d.call(p,l)}return a}function Yr(a){return a=a[Wr],a instanceof Ps?a:null}var Xr="__closure_events_fn_"+(Math.random()*1e9>>>0);function no(a){return typeof a=="function"?a:(a[Xr]||(a[Xr]=function(l){return a.handleEvent(l)}),a[Xr])}function ve(){I.call(this),this.i=new Ps(this),this.M=this,this.G=null}m(ve,I),ve.prototype[Nt]=!0,ve.prototype.removeEventListener=function(a,l,d,p){eo(this,a,l,d,p)};function Ae(a,l){var d,p=a.G;if(p)for(d=[];p;p=p.G)d.push(p);if(a=a.M,p=l.type||l,typeof l=="string")l=new b(l,a);else if(l instanceof b)l.target=l.target||a;else{var w=l;l=new b(p,a),Xa(l,w)}w=!0;let A,x;if(d)for(x=d.length-1;x>=0;x--)A=l.g=d[x],w=Cs(A,p,!0,l)&&w;if(A=l.g=a,w=Cs(A,p,!0,l)&&w,w=Cs(A,p,!1,l)&&w,d)for(x=0;x<d.length;x++)A=l.g=d[x],w=Cs(A,p,!1,l)&&w}ve.prototype.N=function(){if(ve.Z.N.call(this),this.i){var a=this.i;for(const l in a.g){const d=a.g[l];for(let p=0;p<d.length;p++)ks(d[p]);delete a.g[l],a.h--}}this.G=null},ve.prototype.J=function(a,l,d,p){return this.i.add(String(a),l,!1,d,p)},ve.prototype.K=function(a,l,d,p){return this.i.add(String(a),l,!0,d,p)};function Cs(a,l,d,p){if(l=a.i.g[String(l)],!l)return!0;l=l.concat();let w=!0;for(let A=0;A<l.length;++A){const x=l[A];if(x&&!x.da&&x.capture==d){const K=x.listener,ue=x.ha||x.src;x.fa&&Hr(a.i,x),w=K.call(ue,p)!==!1&&w}}return w&&!p.defaultPrevented}function vh(a,l){if(typeof a!="function")if(a&&typeof a.handleEvent=="function")a=h(a.handleEvent,a);else throw Error("Invalid listener argument");return Number(l)>2147483647?-1:o.setTimeout(a,l||0)}function so(a){a.g=vh(()=>{a.g=null,a.i&&(a.i=!1,so(a))},a.l);const l=a.h;a.h=null,a.m.apply(null,l)}class Eh extends I{constructor(l,d){super(),this.m=l,this.l=d,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:so(this)}N(){super.N(),this.g&&(o.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Pn(a){I.call(this),this.h=a,this.g={}}m(Pn,I);var ro=[];function io(a){Rs(a.g,function(l,d){this.g.hasOwnProperty(d)&&Jr(l)},a),a.g={}}Pn.prototype.N=function(){Pn.Z.N.call(this),io(this)},Pn.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Zr=o.JSON.stringify,bh=o.JSON.parse,Ih=class{stringify(a){return o.JSON.stringify(a,void 0)}parse(a){return o.JSON.parse(a,void 0)}};function ao(){}function oo(){}var Cn={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function ei(){b.call(this,"d")}m(ei,b);function ti(){b.call(this,"c")}m(ti,b);var Vt={},co=null;function xs(){return co=co||new ve}Vt.Ia="serverreachability";function lo(a){b.call(this,Vt.Ia,a)}m(lo,b);function xn(a){const l=xs();Ae(l,new lo(l))}Vt.STAT_EVENT="statevent";function uo(a,l){b.call(this,Vt.STAT_EVENT,a),this.stat=l}m(uo,b);function Se(a){const l=xs();Ae(l,new uo(l,a))}Vt.Ja="timingevent";function ho(a,l){b.call(this,Vt.Ja,a),this.size=l}m(ho,b);function Dn(a,l){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return o.setTimeout(function(){a()},l)}function Nn(){this.g=!0}Nn.prototype.ua=function(){this.g=!1};function wh(a,l,d,p,w,A){a.info(function(){if(a.g)if(A){var x="",K=A.split("&");for(let ee=0;ee<K.length;ee++){var ue=K[ee].split("=");if(ue.length>1){const fe=ue[0];ue=ue[1];const Be=fe.split("_");x=Be.length>=2&&Be[1]=="type"?x+(fe+"="+ue+"&"):x+(fe+"=redacted&")}}}else x=null;else x=A;return"XMLHTTP REQ ("+p+") [attempt "+w+"]: "+l+`
`+d+`
`+x})}function Th(a,l,d,p,w,A,x){a.info(function(){return"XMLHTTP RESP ("+p+") [ attempt "+w+"]: "+l+`
`+d+`
`+A+" "+x})}function Xt(a,l,d,p){a.info(function(){return"XMLHTTP TEXT ("+l+"): "+Sh(a,d)+(p?" "+p:"")})}function Ah(a,l){a.info(function(){return"TIMEOUT: "+l})}Nn.prototype.info=function(){};function Sh(a,l){if(!a.g)return l;if(!l)return null;try{const A=JSON.parse(l);if(A){for(a=0;a<A.length;a++)if(Array.isArray(A[a])){var d=A[a];if(!(d.length<2)){var p=d[1];if(Array.isArray(p)&&!(p.length<1)){var w=p[0];if(w!="noop"&&w!="stop"&&w!="close")for(let x=1;x<p.length;x++)p[x]=""}}}}return Zr(A)}catch{return l}}var Ds={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},fo={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},po;function ni(){}m(ni,ao),ni.prototype.g=function(){return new XMLHttpRequest},po=new ni;function Vn(a){return encodeURIComponent(String(a))}function kh(a){var l=1;a=a.split(":");const d=[];for(;l>0&&a.length;)d.push(a.shift()),l--;return a.length&&d.push(a.join(":")),d}function rt(a,l,d,p){this.j=a,this.i=l,this.l=d,this.S=p||1,this.V=new Pn(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new mo}function mo(){this.i=null,this.g="",this.h=!1}var go={},si={};function ri(a,l,d){a.M=1,a.A=Vs(Oe(l)),a.u=d,a.R=!0,yo(a,null)}function yo(a,l){a.F=Date.now(),Ns(a),a.B=Oe(a.A);var d=a.B,p=a.S;Array.isArray(p)||(p=[String(p)]),Co(d.i,"t",p),a.C=0,d=a.j.L,a.h=new mo,a.g=Wo(a.j,d?l:null,!a.u),a.P>0&&(a.O=new Eh(h(a.Y,a,a.g),a.P)),l=a.V,d=a.g,p=a.ba;var w="readystatechange";Array.isArray(w)||(w&&(ro[0]=w.toString()),w=ro);for(let A=0;A<w.length;A++){const x=Za(d,w[A],p||l.handleEvent,!1,l.h||l);if(!x)break;l.g[x.key]=x}l=a.J?Ja(a.J):{},a.u?(a.v||(a.v="POST"),l["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.B,a.v,a.u,l)):(a.v="GET",a.g.ea(a.B,a.v,null,l)),xn(),wh(a.i,a.v,a.B,a.l,a.S,a.u)}rt.prototype.ba=function(a){a=a.target;const l=this.O;l&&ot(a)==3?l.j():this.Y(a)},rt.prototype.Y=function(a){try{if(a==this.g)e:{const K=ot(this.g),ue=this.g.ya(),ee=this.g.ca();if(!(K<3)&&(K!=3||this.g&&(this.h.h||this.g.la()||Oo(this.g)))){this.K||K!=4||ue==7||(ue==8||ee<=0?xn(3):xn(2)),ii(this);var l=this.g.ca();this.X=l;var d=Rh(this);if(this.o=l==200,Th(this.i,this.v,this.B,this.l,this.S,K,l),this.o){if(this.U&&!this.L){t:{if(this.g){var p,w=this.g;if((p=w.g?w.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!_(p)){var A=p;break t}}A=null}if(a=A)Xt(this.i,this.l,a,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,ai(this,a);else{this.o=!1,this.m=3,Se(12),Lt(this),Ln(this);break e}}if(this.R){a=!0;let fe;for(;!this.K&&this.C<d.length;)if(fe=Ph(this,d),fe==si){K==4&&(this.m=4,Se(14),a=!1),Xt(this.i,this.l,null,"[Incomplete Response]");break}else if(fe==go){this.m=4,Se(15),Xt(this.i,this.l,d,"[Invalid Chunk]"),a=!1;break}else Xt(this.i,this.l,fe,null),ai(this,fe);if(_o(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),K!=4||d.length!=0||this.h.h||(this.m=1,Se(16),a=!1),this.o=this.o&&a,!a)Xt(this.i,this.l,d,"[Invalid Chunked Response]"),Lt(this),Ln(this);else if(d.length>0&&!this.W){this.W=!0;var x=this.j;x.g==this&&x.aa&&!x.P&&(x.j.info("Great, no buffering proxy detected. Bytes received: "+d.length),pi(x),x.P=!0,Se(11))}}else Xt(this.i,this.l,d,null),ai(this,d);K==4&&Lt(this),this.o&&!this.K&&(K==4?qo(this.j,this):(this.o=!1,Ns(this)))}else zh(this.g),l==400&&d.indexOf("Unknown SID")>0?(this.m=3,Se(12)):(this.m=0,Se(13)),Lt(this),Ln(this)}}}catch{}finally{}};function Rh(a){if(!_o(a))return a.g.la();const l=Oo(a.g);if(l==="")return"";let d="";const p=l.length,w=ot(a.g)==4;if(!a.h.i){if(typeof TextDecoder>"u")return Lt(a),Ln(a),"";a.h.i=new o.TextDecoder}for(let A=0;A<p;A++)a.h.h=!0,d+=a.h.i.decode(l[A],{stream:!(w&&A==p-1)});return l.length=0,a.h.g+=d,a.C=0,a.h.g}function _o(a){return a.g?a.v=="GET"&&a.M!=2&&a.j.Aa:!1}function Ph(a,l){var d=a.C,p=l.indexOf(`
`,d);return p==-1?si:(d=Number(l.substring(d,p)),isNaN(d)?go:(p+=1,p+d>l.length?si:(l=l.slice(p,p+d),a.C=p+d,l)))}rt.prototype.cancel=function(){this.K=!0,Lt(this)};function Ns(a){a.T=Date.now()+a.H,vo(a,a.H)}function vo(a,l){if(a.D!=null)throw Error("WatchDog timer not null");a.D=Dn(h(a.aa,a),l)}function ii(a){a.D&&(o.clearTimeout(a.D),a.D=null)}rt.prototype.aa=function(){this.D=null;const a=Date.now();a-this.T>=0?(Ah(this.i,this.B),this.M!=2&&(xn(),Se(17)),Lt(this),this.m=2,Ln(this)):vo(this,this.T-a)};function Ln(a){a.j.I==0||a.K||qo(a.j,a)}function Lt(a){ii(a);var l=a.O;l&&typeof l.dispose=="function"&&l.dispose(),a.O=null,io(a.V),a.g&&(l=a.g,a.g=null,l.abort(),l.dispose())}function ai(a,l){try{var d=a.j;if(d.I!=0&&(d.g==a||oi(d.h,a))){if(!a.L&&oi(d.h,a)&&d.I==3){try{var p=d.Ba.g.parse(l)}catch{p=null}if(Array.isArray(p)&&p.length==3){var w=p;if(w[0]==0){e:if(!d.v){if(d.g)if(d.g.F+3e3<a.F)Fs(d),Os(d);else break e;fi(d),Se(18)}}else d.xa=w[1],0<d.xa-d.K&&w[2]<37500&&d.F&&d.A==0&&!d.C&&(d.C=Dn(h(d.Va,d),6e3));Io(d.h)<=1&&d.ta&&(d.ta=void 0)}else Ot(d,11)}else if((a.L||d.g==a)&&Fs(d),!_(l))for(w=d.Ba.g.parse(l),l=0;l<w.length;l++){let ee=w[l];const fe=ee[0];if(!(fe<=d.K))if(d.K=fe,ee=ee[1],d.I==2)if(ee[0]=="c"){d.M=ee[1],d.ba=ee[2];const Be=ee[3];Be!=null&&(d.ka=Be,d.j.info("VER="+d.ka));const Bt=ee[4];Bt!=null&&(d.za=Bt,d.j.info("SVER="+d.za));const ct=ee[5];ct!=null&&typeof ct=="number"&&ct>0&&(p=1.5*ct,d.O=p,d.j.info("backChannelRequestTimeoutMs_="+p)),p=d;const lt=a.g;if(lt){const $s=lt.g?lt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if($s){var A=p.h;A.g||$s.indexOf("spdy")==-1&&$s.indexOf("quic")==-1&&$s.indexOf("h2")==-1||(A.j=A.l,A.g=new Set,A.h&&(ci(A,A.h),A.h=null))}if(p.G){const mi=lt.g?lt.g.getResponseHeader("X-HTTP-Session-Id"):null;mi&&(p.wa=mi,te(p.J,p.G,mi))}}d.I=3,d.l&&d.l.ra(),d.aa&&(d.T=Date.now()-a.F,d.j.info("Handshake RTT: "+d.T+"ms")),p=d;var x=a;if(p.na=Go(p,p.L?p.ba:null,p.W),x.L){wo(p.h,x);var K=x,ue=p.O;ue&&(K.H=ue),K.D&&(ii(K),Ns(K)),p.g=x}else jo(p);d.i.length>0&&Bs(d)}else ee[0]!="stop"&&ee[0]!="close"||Ot(d,7);else d.I==3&&(ee[0]=="stop"||ee[0]=="close"?ee[0]=="stop"?Ot(d,7):hi(d):ee[0]!="noop"&&d.l&&d.l.qa(ee),d.A=0)}}xn(4)}catch{}}var Ch=class{constructor(a,l){this.g=a,this.map=l}};function Eo(a){this.l=a||10,o.PerformanceNavigationTiming?(a=o.performance.getEntriesByType("navigation"),a=a.length>0&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(o.chrome&&o.chrome.loadTimes&&o.chrome.loadTimes()&&o.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function bo(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function Io(a){return a.h?1:a.g?a.g.size:0}function oi(a,l){return a.h?a.h==l:a.g?a.g.has(l):!1}function ci(a,l){a.g?a.g.add(l):a.h=l}function wo(a,l){a.h&&a.h==l?a.h=null:a.g&&a.g.has(l)&&a.g.delete(l)}Eo.prototype.cancel=function(){if(this.i=To(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function To(a){if(a.h!=null)return a.i.concat(a.h.G);if(a.g!=null&&a.g.size!==0){let l=a.i;for(const d of a.g.values())l=l.concat(d.G);return l}return S(a.i)}var Ao=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function xh(a,l){if(a){a=a.split("&");for(let d=0;d<a.length;d++){const p=a[d].indexOf("=");let w,A=null;p>=0?(w=a[d].substring(0,p),A=a[d].substring(p+1)):w=a[d],l(w,A?decodeURIComponent(A.replace(/\+/g," ")):"")}}}function it(a){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let l;a instanceof it?(this.l=a.l,Mn(this,a.j),this.o=a.o,this.g=a.g,On(this,a.u),this.h=a.h,li(this,xo(a.i)),this.m=a.m):a&&(l=String(a).match(Ao))?(this.l=!1,Mn(this,l[1]||"",!0),this.o=Bn(l[2]||""),this.g=Bn(l[3]||"",!0),On(this,l[4]),this.h=Bn(l[5]||"",!0),li(this,l[6]||"",!0),this.m=Bn(l[7]||"")):(this.l=!1,this.i=new Un(null,this.l))}it.prototype.toString=function(){const a=[];var l=this.j;l&&a.push(Fn(l,So,!0),":");var d=this.g;return(d||l=="file")&&(a.push("//"),(l=this.o)&&a.push(Fn(l,So,!0),"@"),a.push(Vn(d).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.u,d!=null&&a.push(":",String(d))),(d=this.h)&&(this.g&&d.charAt(0)!="/"&&a.push("/"),a.push(Fn(d,d.charAt(0)=="/"?Vh:Nh,!0))),(d=this.i.toString())&&a.push("?",d),(d=this.m)&&a.push("#",Fn(d,Mh)),a.join("")},it.prototype.resolve=function(a){const l=Oe(this);let d=!!a.j;d?Mn(l,a.j):d=!!a.o,d?l.o=a.o:d=!!a.g,d?l.g=a.g:d=a.u!=null;var p=a.h;if(d)On(l,a.u);else if(d=!!a.h){if(p.charAt(0)!="/")if(this.g&&!this.h)p="/"+p;else{var w=l.h.lastIndexOf("/");w!=-1&&(p=l.h.slice(0,w+1)+p)}if(w=p,w==".."||w==".")p="";else if(w.indexOf("./")!=-1||w.indexOf("/.")!=-1){p=w.lastIndexOf("/",0)==0,w=w.split("/");const A=[];for(let x=0;x<w.length;){const K=w[x++];K=="."?p&&x==w.length&&A.push(""):K==".."?((A.length>1||A.length==1&&A[0]!="")&&A.pop(),p&&x==w.length&&A.push("")):(A.push(K),p=!0)}p=A.join("/")}else p=w}return d?l.h=p:d=a.i.toString()!=="",d?li(l,xo(a.i)):d=!!a.m,d&&(l.m=a.m),l};function Oe(a){return new it(a)}function Mn(a,l,d){a.j=d?Bn(l,!0):l,a.j&&(a.j=a.j.replace(/:$/,""))}function On(a,l){if(l){if(l=Number(l),isNaN(l)||l<0)throw Error("Bad port number "+l);a.u=l}else a.u=null}function li(a,l,d){l instanceof Un?(a.i=l,Oh(a.i,a.l)):(d||(l=Fn(l,Lh)),a.i=new Un(l,a.l))}function te(a,l,d){a.i.set(l,d)}function Vs(a){return te(a,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),a}function Bn(a,l){return a?l?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function Fn(a,l,d){return typeof a=="string"?(a=encodeURI(a).replace(l,Dh),d&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function Dh(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var So=/[#\/\?@]/g,Nh=/[#\?:]/g,Vh=/[#\?]/g,Lh=/[#\?@]/g,Mh=/#/g;function Un(a,l){this.h=this.g=null,this.i=a||null,this.j=!!l}function Mt(a){a.g||(a.g=new Map,a.h=0,a.i&&xh(a.i,function(l,d){a.add(decodeURIComponent(l.replace(/\+/g," ")),d)}))}n=Un.prototype,n.add=function(a,l){Mt(this),this.i=null,a=Zt(this,a);let d=this.g.get(a);return d||this.g.set(a,d=[]),d.push(l),this.h+=1,this};function ko(a,l){Mt(a),l=Zt(a,l),a.g.has(l)&&(a.i=null,a.h-=a.g.get(l).length,a.g.delete(l))}function Ro(a,l){return Mt(a),l=Zt(a,l),a.g.has(l)}n.forEach=function(a,l){Mt(this),this.g.forEach(function(d,p){d.forEach(function(w){a.call(l,w,p,this)},this)},this)};function Po(a,l){Mt(a);let d=[];if(typeof l=="string")Ro(a,l)&&(d=d.concat(a.g.get(Zt(a,l))));else for(a=Array.from(a.g.values()),l=0;l<a.length;l++)d=d.concat(a[l]);return d}n.set=function(a,l){return Mt(this),this.i=null,a=Zt(this,a),Ro(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[l]),this.h+=1,this},n.get=function(a,l){return a?(a=Po(this,a),a.length>0?String(a[0]):l):l};function Co(a,l,d){ko(a,l),d.length>0&&(a.i=null,a.g.set(Zt(a,l),S(d)),a.h+=d.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],l=Array.from(this.g.keys());for(let p=0;p<l.length;p++){var d=l[p];const w=Vn(d);d=Po(this,d);for(let A=0;A<d.length;A++){let x=w;d[A]!==""&&(x+="="+Vn(d[A])),a.push(x)}}return this.i=a.join("&")};function xo(a){const l=new Un;return l.i=a.i,a.g&&(l.g=new Map(a.g),l.h=a.h),l}function Zt(a,l){return l=String(l),a.j&&(l=l.toLowerCase()),l}function Oh(a,l){l&&!a.j&&(Mt(a),a.i=null,a.g.forEach(function(d,p){const w=p.toLowerCase();p!=w&&(ko(this,p),Co(this,w,d))},a)),a.j=l}function Bh(a,l){const d=new Nn;if(o.Image){const p=new Image;p.onload=f(at,d,"TestLoadImage: loaded",!0,l,p),p.onerror=f(at,d,"TestLoadImage: error",!1,l,p),p.onabort=f(at,d,"TestLoadImage: abort",!1,l,p),p.ontimeout=f(at,d,"TestLoadImage: timeout",!1,l,p),o.setTimeout(function(){p.ontimeout&&p.ontimeout()},1e4),p.src=a}else l(!1)}function Fh(a,l){const d=new Nn,p=new AbortController,w=setTimeout(()=>{p.abort(),at(d,"TestPingServer: timeout",!1,l)},1e4);fetch(a,{signal:p.signal}).then(A=>{clearTimeout(w),A.ok?at(d,"TestPingServer: ok",!0,l):at(d,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(w),at(d,"TestPingServer: error",!1,l)})}function at(a,l,d,p,w){try{w&&(w.onload=null,w.onerror=null,w.onabort=null,w.ontimeout=null),p(d)}catch{}}function Uh(){this.g=new Ih}function ui(a){this.i=a.Sb||null,this.h=a.ab||!1}m(ui,ao),ui.prototype.g=function(){return new Ls(this.i,this.h)};function Ls(a,l){ve.call(this),this.H=a,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}m(Ls,ve),n=Ls.prototype,n.open=function(a,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=a,this.D=l,this.readyState=1,jn(this)},n.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const l={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};a&&(l.body=a),(this.H||o).fetch(new Request(this.D,l)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,$n(this)),this.readyState=0},n.Pa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,jn(this)),this.g&&(this.readyState=3,jn(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof o.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;Do(this)}else a.text().then(this.Oa.bind(this),this.ga.bind(this))};function Do(a){a.j.read().then(a.Ma.bind(a)).catch(a.ga.bind(a))}n.Ma=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var l=a.value?a.value:new Uint8Array(0);(l=this.B.decode(l,{stream:!a.done}))&&(this.response=this.responseText+=l)}a.done?$n(this):jn(this),this.readyState==3&&Do(this)}},n.Oa=function(a){this.g&&(this.response=this.responseText=a,$n(this))},n.Na=function(a){this.g&&(this.response=a,$n(this))},n.ga=function(){this.g&&$n(this)};function $n(a){a.readyState=4,a.l=null,a.j=null,a.B=null,jn(a)}n.setRequestHeader=function(a,l){this.A.append(a,l)},n.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],l=this.h.entries();for(var d=l.next();!d.done;)d=d.value,a.push(d[0]+": "+d[1]),d=l.next();return a.join(`\r
`)};function jn(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(Ls.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function No(a){let l="";return Rs(a,function(d,p){l+=p,l+=":",l+=d,l+=`\r
`}),l}function di(a,l,d){e:{for(p in d){var p=!1;break e}p=!0}p||(d=No(d),typeof a=="string"?d!=null&&Vn(d):te(a,l,d))}function ie(a){ve.call(this),this.headers=new Map,this.L=a||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}m(ie,ve);var $h=/^https?$/i,jh=["POST","PUT"];n=ie.prototype,n.Fa=function(a){this.H=a},n.ea=function(a,l,d,p){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);l=l?l.toUpperCase():"GET",this.D=a,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():po.g(),this.g.onreadystatechange=E(h(this.Ca,this));try{this.B=!0,this.g.open(l,String(a),!0),this.B=!1}catch(A){Vo(this,A);return}if(a=d||"",d=new Map(this.headers),p)if(Object.getPrototypeOf(p)===Object.prototype)for(var w in p)d.set(w,p[w]);else if(typeof p.keys=="function"&&typeof p.get=="function")for(const A of p.keys())d.set(A,p.get(A));else throw Error("Unknown input type for opt_headers: "+String(p));p=Array.from(d.keys()).find(A=>A.toLowerCase()=="content-type"),w=o.FormData&&a instanceof o.FormData,!(Array.prototype.indexOf.call(jh,l,void 0)>=0)||p||w||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[A,x]of d)this.g.setRequestHeader(A,x);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(a),this.v=!1}catch(A){Vo(this,A)}};function Vo(a,l){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=l,a.o=5,Lo(a),Ms(a)}function Lo(a){a.A||(a.A=!0,Ae(a,"complete"),Ae(a,"error"))}n.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=a||7,Ae(this,"complete"),Ae(this,"abort"),Ms(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Ms(this,!0)),ie.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?Mo(this):this.Xa())},n.Xa=function(){Mo(this)};function Mo(a){if(a.h&&typeof i<"u"){if(a.v&&ot(a)==4)setTimeout(a.Ca.bind(a),0);else if(Ae(a,"readystatechange"),ot(a)==4){a.h=!1;try{const A=a.ca();e:switch(A){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break e;default:l=!1}var d;if(!(d=l)){var p;if(p=A===0){let x=String(a.D).match(Ao)[1]||null;!x&&o.self&&o.self.location&&(x=o.self.location.protocol.slice(0,-1)),p=!$h.test(x?x.toLowerCase():"")}d=p}if(d)Ae(a,"complete"),Ae(a,"success");else{a.o=6;try{var w=ot(a)>2?a.g.statusText:""}catch{w=""}a.l=w+" ["+a.ca()+"]",Lo(a)}}finally{Ms(a)}}}}function Ms(a,l){if(a.g){a.m&&(clearTimeout(a.m),a.m=null);const d=a.g;a.g=null,l||Ae(a,"ready");try{d.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function ot(a){return a.g?a.g.readyState:0}n.ca=function(){try{return ot(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(a){if(this.g){var l=this.g.responseText;return a&&l.indexOf(a)==0&&(l=l.substring(a.length)),bh(l)}};function Oo(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.F){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function zh(a){const l={};a=(a.g&&ot(a)>=2&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let p=0;p<a.length;p++){if(_(a[p]))continue;var d=kh(a[p]);const w=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const A=l[w]||[];l[w]=A,A.push(d)}mh(l,function(p){return p.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function zn(a,l,d){return d&&d.internalChannelParams&&d.internalChannelParams[a]||l}function Bo(a){this.za=0,this.i=[],this.j=new Nn,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=zn("failFast",!1,a),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=zn("baseRetryDelayMs",5e3,a),this.Za=zn("retryDelaySeedMs",1e4,a),this.Ta=zn("forwardChannelMaxRetries",2,a),this.va=zn("forwardChannelRequestTimeoutMs",2e4,a),this.ma=a&&a.xmlHttpFactory||void 0,this.Ua=a&&a.Rb||void 0,this.Aa=a&&a.useFetchStreams||!1,this.O=void 0,this.L=a&&a.supportsCrossDomainXhr||!1,this.M="",this.h=new Eo(a&&a.concurrentRequestLimit),this.Ba=new Uh,this.S=a&&a.fastHandshake||!1,this.R=a&&a.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=a&&a.Pb||!1,a&&a.ua&&this.j.ua(),a&&a.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&a&&a.detectBufferingProxy||!1,this.ia=void 0,a&&a.longPollingTimeout&&a.longPollingTimeout>0&&(this.ia=a.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=Bo.prototype,n.ka=8,n.I=1,n.connect=function(a,l,d,p){Se(0),this.W=a,this.H=l||{},d&&p!==void 0&&(this.H.OSID=d,this.H.OAID=p),this.F=this.X,this.J=Go(this,null,this.W),Bs(this)};function hi(a){if(Fo(a),a.I==3){var l=a.V++,d=Oe(a.J);if(te(d,"SID",a.M),te(d,"RID",l),te(d,"TYPE","terminate"),qn(a,d),l=new rt(a,a.j,l),l.M=2,l.A=Vs(Oe(d)),d=!1,o.navigator&&o.navigator.sendBeacon)try{d=o.navigator.sendBeacon(l.A.toString(),"")}catch{}!d&&o.Image&&(new Image().src=l.A,d=!0),d||(l.g=Wo(l.j,null),l.g.ea(l.A)),l.F=Date.now(),Ns(l)}Ho(a)}function Os(a){a.g&&(pi(a),a.g.cancel(),a.g=null)}function Fo(a){Os(a),a.v&&(o.clearTimeout(a.v),a.v=null),Fs(a),a.h.cancel(),a.m&&(typeof a.m=="number"&&o.clearTimeout(a.m),a.m=null)}function Bs(a){if(!bo(a.h)&&!a.m){a.m=!0;var l=a.Ea;G||g(),Z||(G(),Z=!0),v.add(l,a),a.D=0}}function qh(a,l){return Io(a.h)>=a.h.j-(a.m?1:0)?!1:a.m?(a.i=l.G.concat(a.i),!0):a.I==1||a.I==2||a.D>=(a.Sa?0:a.Ta)?!1:(a.m=Dn(h(a.Ea,a,l),Ko(a,a.D)),a.D++,!0)}n.Ea=function(a){if(this.m)if(this.m=null,this.I==1){if(!a){this.V=Math.floor(Math.random()*1e5),a=this.V++;const w=new rt(this,this.j,a);let A=this.o;if(this.U&&(A?(A=Ja(A),Xa(A,this.U)):A=this.U),this.u!==null||this.R||(w.J=A,A=null),this.S)e:{for(var l=0,d=0;d<this.i.length;d++){t:{var p=this.i[d];if("__data__"in p.map&&(p=p.map.__data__,typeof p=="string")){p=p.length;break t}p=void 0}if(p===void 0)break;if(l+=p,l>4096){l=d;break e}if(l===4096||d===this.i.length-1){l=d+1;break e}}l=1e3}else l=1e3;l=$o(this,w,l),d=Oe(this.J),te(d,"RID",a),te(d,"CVER",22),this.G&&te(d,"X-HTTP-Session-Id",this.G),qn(this,d),A&&(this.R?l="headers="+Vn(No(A))+"&"+l:this.u&&di(d,this.u,A)),ci(this.h,w),this.Ra&&te(d,"TYPE","init"),this.S?(te(d,"$req",l),te(d,"SID","null"),w.U=!0,ri(w,d,null)):ri(w,d,l),this.I=2}}else this.I==3&&(a?Uo(this,a):this.i.length==0||bo(this.h)||Uo(this))};function Uo(a,l){var d;l?d=l.l:d=a.V++;const p=Oe(a.J);te(p,"SID",a.M),te(p,"RID",d),te(p,"AID",a.K),qn(a,p),a.u&&a.o&&di(p,a.u,a.o),d=new rt(a,a.j,d,a.D+1),a.u===null&&(d.J=a.o),l&&(a.i=l.G.concat(a.i)),l=$o(a,d,1e3),d.H=Math.round(a.va*.5)+Math.round(a.va*.5*Math.random()),ci(a.h,d),ri(d,p,l)}function qn(a,l){a.H&&Rs(a.H,function(d,p){te(l,p,d)}),a.l&&Rs({},function(d,p){te(l,p,d)})}function $o(a,l,d){d=Math.min(a.i.length,d);const p=a.l?h(a.l.Ka,a.l,a):null;e:{var w=a.i;let K=-1;for(;;){const ue=["count="+d];K==-1?d>0?(K=w[0].g,ue.push("ofs="+K)):K=0:ue.push("ofs="+K);let ee=!0;for(let fe=0;fe<d;fe++){var A=w[fe].g;const Be=w[fe].map;if(A-=K,A<0)K=Math.max(0,w[fe].g-100),ee=!1;else try{A="req"+A+"_"||"";try{var x=Be instanceof Map?Be:Object.entries(Be);for(const[Bt,ct]of x){let lt=ct;c(ct)&&(lt=Zr(ct)),ue.push(A+Bt+"="+encodeURIComponent(lt))}}catch(Bt){throw ue.push(A+"type="+encodeURIComponent("_badmap")),Bt}}catch{p&&p(Be)}}if(ee){x=ue.join("&");break e}}x=void 0}return a=a.i.splice(0,d),l.G=a,x}function jo(a){if(!a.g&&!a.v){a.Y=1;var l=a.Da;G||g(),Z||(G(),Z=!0),v.add(l,a),a.A=0}}function fi(a){return a.g||a.v||a.A>=3?!1:(a.Y++,a.v=Dn(h(a.Da,a),Ko(a,a.A)),a.A++,!0)}n.Da=function(){if(this.v=null,zo(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var a=4*this.T;this.j.info("BP detection timer enabled: "+a),this.B=Dn(h(this.Wa,this),a)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,Se(10),Os(this),zo(this))};function pi(a){a.B!=null&&(o.clearTimeout(a.B),a.B=null)}function zo(a){a.g=new rt(a,a.j,"rpc",a.Y),a.u===null&&(a.g.J=a.o),a.g.P=0;var l=Oe(a.na);te(l,"RID","rpc"),te(l,"SID",a.M),te(l,"AID",a.K),te(l,"CI",a.F?"0":"1"),!a.F&&a.ia&&te(l,"TO",a.ia),te(l,"TYPE","xmlhttp"),qn(a,l),a.u&&a.o&&di(l,a.u,a.o),a.O&&(a.g.H=a.O);var d=a.g;a=a.ba,d.M=1,d.A=Vs(Oe(l)),d.u=null,d.R=!0,yo(d,a)}n.Va=function(){this.C!=null&&(this.C=null,Os(this),fi(this),Se(19))};function Fs(a){a.C!=null&&(o.clearTimeout(a.C),a.C=null)}function qo(a,l){var d=null;if(a.g==l){Fs(a),pi(a),a.g=null;var p=2}else if(oi(a.h,l))d=l.G,wo(a.h,l),p=1;else return;if(a.I!=0){if(l.o)if(p==1){d=l.u?l.u.length:0,l=Date.now()-l.F;var w=a.D;p=xs(),Ae(p,new ho(p,d)),Bs(a)}else jo(a);else if(w=l.m,w==3||w==0&&l.X>0||!(p==1&&qh(a,l)||p==2&&fi(a)))switch(d&&d.length>0&&(l=a.h,l.i=l.i.concat(d)),w){case 1:Ot(a,5);break;case 4:Ot(a,10);break;case 3:Ot(a,6);break;default:Ot(a,2)}}}function Ko(a,l){let d=a.Qa+Math.floor(Math.random()*a.Za);return a.isActive()||(d*=2),d*l}function Ot(a,l){if(a.j.info("Error code "+l),l==2){var d=h(a.bb,a),p=a.Ua;const w=!p;p=new it(p||"//www.google.com/images/cleardot.gif"),o.location&&o.location.protocol=="http"||Mn(p,"https"),Vs(p),w?Bh(p.toString(),d):Fh(p.toString(),d)}else Se(2);a.I=0,a.l&&a.l.pa(l),Ho(a),Fo(a)}n.bb=function(a){a?(this.j.info("Successfully pinged google.com"),Se(2)):(this.j.info("Failed to ping google.com"),Se(1))};function Ho(a){if(a.I=0,a.ja=[],a.l){const l=To(a.h);(l.length!=0||a.i.length!=0)&&(P(a.ja,l),P(a.ja,a.i),a.h.i.length=0,S(a.i),a.i.length=0),a.l.oa()}}function Go(a,l,d){var p=d instanceof it?Oe(d):new it(d);if(p.g!="")l&&(p.g=l+"."+p.g),On(p,p.u);else{var w=o.location;p=w.protocol,l=l?l+"."+w.hostname:w.hostname,w=+w.port;const A=new it(null);p&&Mn(A,p),l&&(A.g=l),w&&On(A,w),d&&(A.h=d),p=A}return d=a.G,l=a.wa,d&&l&&te(p,d,l),te(p,"VER",a.ka),qn(a,p),p}function Wo(a,l,d){if(l&&!a.L)throw Error("Can't create secondary domain capable XhrIo object.");return l=a.Aa&&!a.ma?new ie(new ui({ab:d})):new ie(a.ma),l.Fa(a.L),l}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Qo(){}n=Qo.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function Us(){}Us.prototype.g=function(a,l){return new Ce(a,l)};function Ce(a,l){ve.call(this),this.g=new Bo(l),this.l=a,this.h=l&&l.messageUrlParams||null,a=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(a?a["X-WebChannel-Content-Type"]=l.messageContentType:a={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.sa&&(a?a["X-WebChannel-Client-Profile"]=l.sa:a={"X-WebChannel-Client-Profile":l.sa}),this.g.U=a,(a=l&&l.Qb)&&!_(a)&&(this.g.u=a),this.A=l&&l.supportsCrossDomainXhr||!1,this.v=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!_(l)&&(this.g.G=l,a=this.h,a!==null&&l in a&&(a=this.h,l in a&&delete a[l])),this.j=new en(this)}m(Ce,ve),Ce.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},Ce.prototype.close=function(){hi(this.g)},Ce.prototype.o=function(a){var l=this.g;if(typeof a=="string"){var d={};d.__data__=a,a=d}else this.v&&(d={},d.__data__=Zr(a),a=d);l.i.push(new Ch(l.Ya++,a)),l.I==3&&Bs(l)},Ce.prototype.N=function(){this.g.l=null,delete this.j,hi(this.g),delete this.g,Ce.Z.N.call(this)};function Jo(a){ei.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var l=a.__sm__;if(l){e:{for(const d in l){a=d;break e}a=void 0}(this.i=a)&&(a=this.i,l=l!==null&&a in l?l[a]:void 0),this.data=l}else this.data=a}m(Jo,ei);function Yo(){ti.call(this),this.status=1}m(Yo,ti);function en(a){this.g=a}m(en,Qo),en.prototype.ra=function(){Ae(this.g,"a")},en.prototype.qa=function(a){Ae(this.g,new Jo(a))},en.prototype.pa=function(a){Ae(this.g,new Yo)},en.prototype.oa=function(){Ae(this.g,"b")},Us.prototype.createWebChannel=Us.prototype.g,Ce.prototype.send=Ce.prototype.o,Ce.prototype.open=Ce.prototype.m,Ce.prototype.close=Ce.prototype.close,Du=function(){return new Us},xu=function(){return xs()},Cu=Vt,$i={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Ds.NO_ERROR=0,Ds.TIMEOUT=8,Ds.HTTP_ERROR=6,Xs=Ds,fo.COMPLETE="complete",Pu=fo,oo.EventType=Cn,Cn.OPEN="a",Cn.CLOSE="b",Cn.ERROR="c",Cn.MESSAGE="d",ve.prototype.listen=ve.prototype.J,Qn=oo,ie.prototype.listenOnce=ie.prototype.K,ie.prototype.getLastError=ie.prototype.Ha,ie.prototype.getLastErrorCode=ie.prototype.ya,ie.prototype.getStatus=ie.prototype.ca,ie.prototype.getResponseJson=ie.prototype.La,ie.prototype.getResponseText=ie.prototype.la,ie.prototype.send=ie.prototype.ea,ie.prototype.setWithCredentials=ie.prototype.Fa,Ru=ie}).apply(typeof zs<"u"?zs:typeof self<"u"?self:typeof window<"u"?window:{});/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class be{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}be.UNAUTHENTICATED=new be(null),be.GOOGLE_CREDENTIALS=new be("google-credentials-uid"),be.FIRST_PARTY=new be("first-party-uid"),be.MOCK_USER=new be("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Tn="12.12.0";function Jg(n){Tn=n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ht=new ia("@firebase/firestore");function tn(){return Ht.logLevel}function N(n,...e){if(Ht.logLevel<=W.DEBUG){const t=e.map(ga);Ht.debug(`Firestore (${Tn}): ${n}`,...t)}}function et(n,...e){if(Ht.logLevel<=W.ERROR){const t=e.map(ga);Ht.error(`Firestore (${Tn}): ${n}`,...t)}}function Gt(n,...e){if(Ht.logLevel<=W.WARN){const t=e.map(ga);Ht.warn(`Firestore (${Tn}): ${n}`,...t)}}function ga(n){if(typeof n=="string")return n;try{return(function(t){return JSON.stringify(t)})(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function U(n,e,t){let s="Unexpected state";typeof e=="string"?s=e:t=e,Nu(n,s,t)}function Nu(n,e,t){let s=`FIRESTORE (${Tn}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{s+=" CONTEXT: "+JSON.stringify(t)}catch{s+=" CONTEXT: "+t}throw et(s),new Error(s)}function X(n,e,t,s){let r="Unexpected state";typeof t=="string"?r=t:s=t,n||Nu(e,r,s)}function z(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const R={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class L extends nt{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class It{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vu{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class Yg{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t(be.UNAUTHENTICATED)))}shutdown(){}}class Xg{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable((()=>t(this.token.user)))}shutdown(){this.changeListener=null}}class Zg{constructor(e){this.t=e,this.currentUser=be.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){X(this.o===void 0,42304);let s=this.i;const r=u=>this.i!==s?(s=this.i,t(u)):Promise.resolve();let i=new It;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new It,e.enqueueRetryable((()=>r(this.currentUser)))};const o=()=>{const u=i;e.enqueueRetryable((async()=>{await u.promise,await r(this.currentUser)}))},c=u=>{N("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit((u=>c(u))),setTimeout((()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?c(u):(N("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new It)}}),0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((s=>this.i!==e?(N("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):s?(X(typeof s.accessToken=="string",31837,{l:s}),new Vu(s.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return X(e===null||typeof e=="string",2055,{h:e}),new be(e)}}class ey{constructor(e,t,s){this.P=e,this.T=t,this.I=s,this.type="FirstParty",this.user=be.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const e=this.A();return e&&this.R.set("Authorization",e),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class ty{constructor(e,t,s){this.P=e,this.T=t,this.I=s}getToken(){return Promise.resolve(new ey(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable((()=>t(be.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class Pc{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class ny{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,De(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){X(this.o===void 0,3512);const s=i=>{i.error!=null&&N("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.m;return this.m=i.token,N("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable((()=>s(i)))};const r=i=>{N("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((i=>r(i))),setTimeout((()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?r(i):N("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new Pc(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((t=>t?(X(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new Pc(t.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sy(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let s=0;s<n;s++)t[s]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ya{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let s="";for(;s.length<20;){const r=sy(40);for(let i=0;i<r.length;++i)s.length<20&&r[i]<t&&(s+=e.charAt(r[i]%62))}return s}}function Q(n,e){return n<e?-1:n>e?1:0}function ji(n,e){const t=Math.min(n.length,e.length);for(let s=0;s<t;s++){const r=n.charAt(s),i=e.charAt(s);if(r!==i)return wi(r)===wi(i)?Q(r,i):wi(r)?1:-1}return Q(n.length,e.length)}const ry=55296,iy=57343;function wi(n){const e=n.charCodeAt(0);return e>=ry&&e<=iy}function gn(n,e,t){return n.length===e.length&&n.every(((s,r)=>t(s,e[r])))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cc="__name__";class Fe{constructor(e,t,s){t===void 0?t=0:t>e.length&&U(637,{offset:t,range:e.length}),s===void 0?s=e.length-t:s>e.length-t&&U(1746,{length:s,range:e.length-t}),this.segments=e,this.offset=t,this.len=s}get length(){return this.len}isEqual(e){return Fe.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Fe?e.forEach((s=>{t.push(s)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,s=this.limit();t<s;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const s=Math.min(e.length,t.length);for(let r=0;r<s;r++){const i=Fe.compareSegments(e.get(r),t.get(r));if(i!==0)return i}return Q(e.length,t.length)}static compareSegments(e,t){const s=Fe.isNumericId(e),r=Fe.isNumericId(t);return s&&!r?-1:!s&&r?1:s&&r?Fe.extractNumericId(e).compare(Fe.extractNumericId(t)):ji(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return bt.fromString(e.substring(4,e.length-2))}}class se extends Fe{construct(e,t,s){return new se(e,t,s)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const s of e){if(s.indexOf("//")>=0)throw new L(R.INVALID_ARGUMENT,`Invalid segment (${s}). Paths must not contain // in them.`);t.push(...s.split("/").filter((r=>r.length>0)))}return new se(t)}static emptyPath(){return new se([])}}const ay=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ye extends Fe{construct(e,t,s){return new ye(e,t,s)}static isValidIdentifier(e){return ay.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ye.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Cc}static keyField(){return new ye([Cc])}static fromServerFormat(e){const t=[];let s="",r=0;const i=()=>{if(s.length===0)throw new L(R.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(s),s=""};let o=!1;for(;r<e.length;){const c=e[r];if(c==="\\"){if(r+1===e.length)throw new L(R.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[r+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new L(R.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);s+=u,r+=2}else c==="`"?(o=!o,r++):c!=="."||o?(s+=c,r++):(i(),r++)}if(i(),o)throw new L(R.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new ye(t)}static emptyPath(){return new ye([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class O{constructor(e){this.path=e}static fromPath(e){return new O(se.fromString(e))}static fromName(e){return new O(se.fromString(e).popFirst(5))}static empty(){return new O(se.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&se.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return se.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new O(new se(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oy(n,e,t){if(!t)throw new L(R.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function cy(n,e,t,s){if(e===!0&&s===!0)throw new L(R.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function xc(n){if(!O.isDocumentKey(n))throw new L(R.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Lu(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function _a(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=(function(s){return s.constructor?s.constructor.name:null})(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":U(12329,{type:typeof n})}function je(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new L(R.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=_a(n);throw new L(R.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ce(n,e){const t={typeString:n};return e&&(t.value=e),t}function Is(n,e){if(!Lu(n))throw new L(R.INVALID_ARGUMENT,"JSON must be an object");let t;for(const s in e)if(e[s]){const r=e[s].typeString,i="value"in e[s]?{value:e[s].value}:void 0;if(!(s in n)){t=`JSON missing required field: '${s}'`;break}const o=n[s];if(r&&typeof o!==r){t=`JSON field '${s}' must be a ${r}.`;break}if(i!==void 0&&o!==i.value){t=`Expected '${s}' field to equal '${i.value}'`;break}}if(t)throw new L(R.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dc=-62135596800,Nc=1e6;class ne{static now(){return ne.fromMillis(Date.now())}static fromDate(e){return ne.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),s=Math.floor((e-1e3*t)*Nc);return new ne(t,s)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new L(R.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new L(R.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<Dc)throw new L(R.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new L(R.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Nc}_compareTo(e){return this.seconds===e.seconds?Q(this.nanoseconds,e.nanoseconds):Q(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:ne._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Is(e,ne._jsonSchema))return new ne(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-Dc;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}ne._jsonSchemaVersion="firestore/timestamp/1.0",ne._jsonSchema={type:ce("string",ne._jsonSchemaVersion),seconds:ce("number"),nanoseconds:ce("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class j{static fromTimestamp(e){return new j(e)}static min(){return new j(new ne(0,0))}static max(){return new j(new ne(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const as=-1;function ly(n,e){const t=n.toTimestamp().seconds,s=n.toTimestamp().nanoseconds+1,r=j.fromTimestamp(s===1e9?new ne(t+1,0):new ne(t,s));return new Tt(r,O.empty(),e)}function uy(n){return new Tt(n.readTime,n.key,as)}class Tt{constructor(e,t,s){this.readTime=e,this.documentKey=t,this.largestBatchId=s}static min(){return new Tt(j.min(),O.empty(),as)}static max(){return new Tt(j.max(),O.empty(),as)}}function dy(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=O.comparator(n.documentKey,e.documentKey),t!==0?t:Q(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hy="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class fy{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function An(n){if(n.code!==R.FAILED_PRECONDITION||n.message!==hy)throw n;N("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class k{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)}),(t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)}))}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&U(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new k(((s,r)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(s,r)},this.catchCallback=i=>{this.wrapFailure(t,i).next(s,r)}}))}toPromise(){return new Promise(((e,t)=>{this.next(e,t)}))}wrapUserFunction(e){try{const t=e();return t instanceof k?t:k.resolve(t)}catch(t){return k.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction((()=>e(t))):k.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction((()=>e(t))):k.reject(t)}static resolve(e){return new k(((t,s)=>{t(e)}))}static reject(e){return new k(((t,s)=>{s(e)}))}static waitFor(e){return new k(((t,s)=>{let r=0,i=0,o=!1;e.forEach((c=>{++r,c.next((()=>{++i,o&&i===r&&t()}),(u=>s(u)))})),o=!0,i===r&&t()}))}static or(e){let t=k.resolve(!1);for(const s of e)t=t.next((r=>r?k.resolve(r):s()));return t}static forEach(e,t){const s=[];return e.forEach(((r,i)=>{s.push(t.call(this,r,i))})),this.waitFor(s)}static mapArray(e,t){return new k(((s,r)=>{const i=e.length,o=new Array(i);let c=0;for(let u=0;u<i;u++){const h=u;t(e[h]).next((f=>{o[h]=f,++c,c===i&&s(o)}),(f=>r(f)))}}))}static doWhile(e,t){return new k(((s,r)=>{const i=()=>{e()===!0?t().next((()=>{i()}),r):s()};i()}))}}function py(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function Sn(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pr{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=s=>this.ae(s),this.ue=s=>t.writeSequenceNumber(s))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}Pr.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const va=-1;function Cr(n){return n==null}function fr(n){return n===0&&1/n==-1/0}function my(n){return typeof n=="number"&&Number.isInteger(n)&&!fr(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mu="";function gy(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=Vc(e)),e=yy(n.get(t),e);return Vc(e)}function yy(n,e){let t=e;const s=n.length;for(let r=0;r<s;r++){const i=n.charAt(r);switch(i){case"\0":t+="";break;case Mu:t+="";break;default:t+=i}}return t}function Vc(n){return n+Mu+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lc(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function xt(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function Ou(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class re{constructor(e,t){this.comparator=e,this.root=t||ge.EMPTY}insert(e,t){return new re(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,ge.BLACK,null,null))}remove(e){return new re(this.comparator,this.root.remove(e,this.comparator).copy(null,null,ge.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const s=this.comparator(e,t.key);if(s===0)return t.value;s<0?t=t.left:s>0&&(t=t.right)}return null}indexOf(e){let t=0,s=this.root;for(;!s.isEmpty();){const r=this.comparator(e,s.key);if(r===0)return t+s.left.size;r<0?s=s.left:(t+=s.left.size+1,s=s.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((t,s)=>(e(t,s),!1)))}toString(){const e=[];return this.inorderTraversal(((t,s)=>(e.push(`${t}:${s}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new qs(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new qs(this.root,e,this.comparator,!1)}getReverseIterator(){return new qs(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new qs(this.root,e,this.comparator,!0)}}class qs{constructor(e,t,s,r){this.isReverse=r,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?s(e.key,t):1,t&&r&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class ge{constructor(e,t,s,r,i){this.key=e,this.value=t,this.color=s??ge.RED,this.left=r??ge.EMPTY,this.right=i??ge.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,s,r,i){return new ge(e??this.key,t??this.value,s??this.color,r??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,s){let r=this;const i=s(e,r.key);return r=i<0?r.copy(null,null,null,r.left.insert(e,t,s),null):i===0?r.copy(null,t,null,null,null):r.copy(null,null,null,null,r.right.insert(e,t,s)),r.fixUp()}removeMin(){if(this.left.isEmpty())return ge.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let s,r=this;if(t(e,r.key)<0)r.left.isEmpty()||r.left.isRed()||r.left.left.isRed()||(r=r.moveRedLeft()),r=r.copy(null,null,null,r.left.remove(e,t),null);else{if(r.left.isRed()&&(r=r.rotateRight()),r.right.isEmpty()||r.right.isRed()||r.right.left.isRed()||(r=r.moveRedRight()),t(e,r.key)===0){if(r.right.isEmpty())return ge.EMPTY;s=r.right.min(),r=r.copy(s.key,s.value,null,null,r.right.removeMin())}r=r.copy(null,null,null,null,r.right.remove(e,t))}return r.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,ge.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,ge.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw U(43730,{key:this.key,value:this.value});if(this.right.isRed())throw U(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw U(27949);return e+(this.isRed()?0:1)}}ge.EMPTY=null,ge.RED=!0,ge.BLACK=!1;ge.EMPTY=new class{constructor(){this.size=0}get key(){throw U(57766)}get value(){throw U(16141)}get color(){throw U(16727)}get left(){throw U(29726)}get right(){throw U(36894)}copy(e,t,s,r,i){return this}insert(e,t,s){return new ge(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class he{constructor(e){this.comparator=e,this.data=new re(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((t,s)=>(e(t),!1)))}forEachInRange(e,t){const s=this.data.getIteratorFrom(e[0]);for(;s.hasNext();){const r=s.getNext();if(this.comparator(r.key,e[1])>=0)return;t(r.key)}}forEachWhile(e,t){let s;for(s=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();s.hasNext();)if(!e(s.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Mc(this.data.getIterator())}getIteratorFrom(e){return new Mc(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach((s=>{t=t.add(s)})),t}isEqual(e){if(!(e instanceof he)||this.size!==e.size)return!1;const t=this.data.getIterator(),s=e.data.getIterator();for(;t.hasNext();){const r=t.getNext().key,i=s.getNext().key;if(this.comparator(r,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach((t=>{e.push(t)})),e}toString(){const e=[];return this.forEach((t=>e.push(t))),"SortedSet("+e.toString()+")"}copy(e){const t=new he(this.comparator);return t.data=e,t}}class Mc{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xe{constructor(e){this.fields=e,e.sort(ye.comparator)}static empty(){return new xe([])}unionWith(e){let t=new he(ye.comparator);for(const s of this.fields)t=t.add(s);for(const s of e)t=t.add(s);return new xe(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return gn(this.fields,e.fields,((t,s)=>t.isEqual(s)))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bu extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _e{constructor(e){this.binaryString=e}static fromBase64String(e){const t=(function(r){try{return atob(r)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new Bu("Invalid base64 string: "+i):i}})(e);return new _e(t)}static fromUint8Array(e){const t=(function(r){let i="";for(let o=0;o<r.length;++o)i+=String.fromCharCode(r[o]);return i})(e);return new _e(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(t){return btoa(t)})(this.binaryString)}toUint8Array(){return(function(t){const s=new Uint8Array(t.length);for(let r=0;r<t.length;r++)s[r]=t.charCodeAt(r);return s})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return Q(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}_e.EMPTY_BYTE_STRING=new _e("");const _y=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function At(n){if(X(!!n,39018),typeof n=="string"){let e=0;const t=_y.exec(n);if(X(!!t,46558,{timestamp:n}),t[1]){let r=t[1];r=(r+"000000000").substr(0,9),e=Number(r)}const s=new Date(n);return{seconds:Math.floor(s.getTime()/1e3),nanos:e}}return{seconds:ae(n.seconds),nanos:ae(n.nanos)}}function ae(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function St(n){return typeof n=="string"?_e.fromBase64String(n):_e.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fu="server_timestamp",Uu="__type__",$u="__previous_value__",ju="__local_write_time__";function Ea(n){var t,s;return((s=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[Uu])==null?void 0:s.stringValue)===Fu}function xr(n){const e=n.mapValue.fields[$u];return Ea(e)?xr(e):e}function os(n){const e=At(n.mapValue.fields[ju].timestampValue);return new ne(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vy{constructor(e,t,s,r,i,o,c,u,h,f,m){this.databaseId=e,this.appId=t,this.persistenceKey=s,this.host=r,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=c,this.longPollingOptions=u,this.useFetchStreams=h,this.isUsingEmulator=f,this.apiKey=m}}const pr="(default)";class cs{constructor(e,t){this.projectId=e,this.database=t||pr}static empty(){return new cs("","")}get isDefaultDatabase(){return this.database===pr}isEqual(e){return e instanceof cs&&e.projectId===this.projectId&&e.database===this.database}}function Ey(n,e){if(!Object.prototype.hasOwnProperty.apply(n.options,["projectId"]))throw new L(R.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new cs(n.options.projectId,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zu="__type__",by="__max__",Ks={mapValue:{}},qu="__vector__",mr="value";function kt(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Ea(n)?4:wy(n)?9007199254740991:Iy(n)?10:11:U(28295,{value:n})}function Ge(n,e){if(n===e)return!0;const t=kt(n);if(t!==kt(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return os(n).isEqual(os(e));case 3:return(function(r,i){if(typeof r.timestampValue=="string"&&typeof i.timestampValue=="string"&&r.timestampValue.length===i.timestampValue.length)return r.timestampValue===i.timestampValue;const o=At(r.timestampValue),c=At(i.timestampValue);return o.seconds===c.seconds&&o.nanos===c.nanos})(n,e);case 5:return n.stringValue===e.stringValue;case 6:return(function(r,i){return St(r.bytesValue).isEqual(St(i.bytesValue))})(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return(function(r,i){return ae(r.geoPointValue.latitude)===ae(i.geoPointValue.latitude)&&ae(r.geoPointValue.longitude)===ae(i.geoPointValue.longitude)})(n,e);case 2:return(function(r,i){if("integerValue"in r&&"integerValue"in i)return ae(r.integerValue)===ae(i.integerValue);if("doubleValue"in r&&"doubleValue"in i){const o=ae(r.doubleValue),c=ae(i.doubleValue);return o===c?fr(o)===fr(c):isNaN(o)&&isNaN(c)}return!1})(n,e);case 9:return gn(n.arrayValue.values||[],e.arrayValue.values||[],Ge);case 10:case 11:return(function(r,i){const o=r.mapValue.fields||{},c=i.mapValue.fields||{};if(Lc(o)!==Lc(c))return!1;for(const u in o)if(o.hasOwnProperty(u)&&(c[u]===void 0||!Ge(o[u],c[u])))return!1;return!0})(n,e);default:return U(52216,{left:n})}}function ls(n,e){return(n.values||[]).find((t=>Ge(t,e)))!==void 0}function yn(n,e){if(n===e)return 0;const t=kt(n),s=kt(e);if(t!==s)return Q(t,s);switch(t){case 0:case 9007199254740991:return 0;case 1:return Q(n.booleanValue,e.booleanValue);case 2:return(function(i,o){const c=ae(i.integerValue||i.doubleValue),u=ae(o.integerValue||o.doubleValue);return c<u?-1:c>u?1:c===u?0:isNaN(c)?isNaN(u)?0:-1:1})(n,e);case 3:return Oc(n.timestampValue,e.timestampValue);case 4:return Oc(os(n),os(e));case 5:return ji(n.stringValue,e.stringValue);case 6:return(function(i,o){const c=St(i),u=St(o);return c.compareTo(u)})(n.bytesValue,e.bytesValue);case 7:return(function(i,o){const c=i.split("/"),u=o.split("/");for(let h=0;h<c.length&&h<u.length;h++){const f=Q(c[h],u[h]);if(f!==0)return f}return Q(c.length,u.length)})(n.referenceValue,e.referenceValue);case 8:return(function(i,o){const c=Q(ae(i.latitude),ae(o.latitude));return c!==0?c:Q(ae(i.longitude),ae(o.longitude))})(n.geoPointValue,e.geoPointValue);case 9:return Bc(n.arrayValue,e.arrayValue);case 10:return(function(i,o){var E,S,P,D;const c=i.fields||{},u=o.fields||{},h=(E=c[mr])==null?void 0:E.arrayValue,f=(S=u[mr])==null?void 0:S.arrayValue,m=Q(((P=h==null?void 0:h.values)==null?void 0:P.length)||0,((D=f==null?void 0:f.values)==null?void 0:D.length)||0);return m!==0?m:Bc(h,f)})(n.mapValue,e.mapValue);case 11:return(function(i,o){if(i===Ks.mapValue&&o===Ks.mapValue)return 0;if(i===Ks.mapValue)return 1;if(o===Ks.mapValue)return-1;const c=i.fields||{},u=Object.keys(c),h=o.fields||{},f=Object.keys(h);u.sort(),f.sort();for(let m=0;m<u.length&&m<f.length;++m){const E=ji(u[m],f[m]);if(E!==0)return E;const S=yn(c[u[m]],h[f[m]]);if(S!==0)return S}return Q(u.length,f.length)})(n.mapValue,e.mapValue);default:throw U(23264,{he:t})}}function Oc(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return Q(n,e);const t=At(n),s=At(e),r=Q(t.seconds,s.seconds);return r!==0?r:Q(t.nanos,s.nanos)}function Bc(n,e){const t=n.values||[],s=e.values||[];for(let r=0;r<t.length&&r<s.length;++r){const i=yn(t[r],s[r]);if(i)return i}return Q(t.length,s.length)}function _n(n){return zi(n)}function zi(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?(function(t){const s=At(t);return`time(${s.seconds},${s.nanos})`})(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?(function(t){return St(t).toBase64()})(n.bytesValue):"referenceValue"in n?(function(t){return O.fromName(t).toString()})(n.referenceValue):"geoPointValue"in n?(function(t){return`geo(${t.latitude},${t.longitude})`})(n.geoPointValue):"arrayValue"in n?(function(t){let s="[",r=!0;for(const i of t.values||[])r?r=!1:s+=",",s+=zi(i);return s+"]"})(n.arrayValue):"mapValue"in n?(function(t){const s=Object.keys(t.fields||{}).sort();let r="{",i=!0;for(const o of s)i?i=!1:r+=",",r+=`${o}:${zi(t.fields[o])}`;return r+"}"})(n.mapValue):U(61005,{value:n})}function Zs(n){switch(kt(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=xr(n);return e?16+Zs(e):16;case 5:return 2*n.stringValue.length;case 6:return St(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return(function(s){return(s.values||[]).reduce(((r,i)=>r+Zs(i)),0)})(n.arrayValue);case 10:case 11:return(function(s){let r=0;return xt(s.fields,((i,o)=>{r+=i.length+Zs(o)})),r})(n.mapValue);default:throw U(13486,{value:n})}}function qi(n){return!!n&&"integerValue"in n}function ba(n){return!!n&&"arrayValue"in n}function Fc(n){return!!n&&"nullValue"in n}function Uc(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function er(n){return!!n&&"mapValue"in n}function Iy(n){var t,s;return((s=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[zu])==null?void 0:s.stringValue)===qu}function es(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const e={mapValue:{fields:{}}};return xt(n.mapValue.fields,((t,s)=>e.mapValue.fields[t]=es(s))),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=es(n.arrayValue.values[t]);return e}return{...n}}function wy(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===by}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pe{constructor(e){this.value=e}static empty(){return new Pe({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let s=0;s<e.length-1;++s)if(t=(t.mapValue.fields||{})[e.get(s)],!er(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=es(t)}setAll(e){let t=ye.emptyPath(),s={},r=[];e.forEach(((o,c)=>{if(!t.isImmediateParentOf(c)){const u=this.getFieldsMap(t);this.applyChanges(u,s,r),s={},r=[],t=c.popLast()}o?s[c.lastSegment()]=es(o):r.push(c.lastSegment())}));const i=this.getFieldsMap(t);this.applyChanges(i,s,r)}delete(e){const t=this.field(e.popLast());er(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Ge(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let s=0;s<e.length;++s){let r=t.mapValue.fields[e.get(s)];er(r)&&r.mapValue.fields||(r={mapValue:{fields:{}}},t.mapValue.fields[e.get(s)]=r),t=r}return t.mapValue.fields}applyChanges(e,t,s){xt(t,((r,i)=>e[r]=i));for(const r of s)delete e[r]}clone(){return new Pe(es(this.value))}}function Ku(n){const e=[];return xt(n.fields,((t,s)=>{const r=new ye([t]);if(er(s)){const i=Ku(s.mapValue).fields;if(i.length===0)e.push(r);else for(const o of i)e.push(r.child(o))}else e.push(r)})),new xe(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ie{constructor(e,t,s,r,i,o,c){this.key=e,this.documentType=t,this.version=s,this.readTime=r,this.createTime=i,this.data=o,this.documentState=c}static newInvalidDocument(e){return new Ie(e,0,j.min(),j.min(),j.min(),Pe.empty(),0)}static newFoundDocument(e,t,s,r){return new Ie(e,1,t,j.min(),s,r,0)}static newNoDocument(e,t){return new Ie(e,2,t,j.min(),j.min(),Pe.empty(),0)}static newUnknownDocument(e,t){return new Ie(e,3,t,j.min(),j.min(),Pe.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(j.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Pe.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Pe.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=j.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Ie&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Ie(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gr{constructor(e,t){this.position=e,this.inclusive=t}}function $c(n,e,t){let s=0;for(let r=0;r<n.position.length;r++){const i=e[r],o=n.position[r];if(i.field.isKeyField()?s=O.comparator(O.fromName(o.referenceValue),t.key):s=yn(o,t.data.field(i.field)),i.dir==="desc"&&(s*=-1),s!==0)break}return s}function jc(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!Ge(n.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yr{constructor(e,t="asc"){this.field=e,this.dir=t}}function Ty(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hu{}class de extends Hu{constructor(e,t,s){super(),this.field=e,this.op=t,this.value=s}static create(e,t,s){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,s):new Sy(e,t,s):t==="array-contains"?new Py(e,s):t==="in"?new Cy(e,s):t==="not-in"?new xy(e,s):t==="array-contains-any"?new Dy(e,s):new de(e,t,s)}static createKeyFieldInFilter(e,t,s){return t==="in"?new ky(e,s):new Ry(e,s)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(yn(t,this.value)):t!==null&&kt(this.value)===kt(t)&&this.matchesComparison(yn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return U(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class We extends Hu{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new We(e,t)}matches(e){return Gu(this)?this.filters.find((t=>!t.matches(e)))===void 0:this.filters.find((t=>t.matches(e)))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce(((e,t)=>e.concat(t.getFlattenedFilters())),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function Gu(n){return n.op==="and"}function Wu(n){return Ay(n)&&Gu(n)}function Ay(n){for(const e of n.filters)if(e instanceof We)return!1;return!0}function Ki(n){if(n instanceof de)return n.field.canonicalString()+n.op.toString()+_n(n.value);if(Wu(n))return n.filters.map((e=>Ki(e))).join(",");{const e=n.filters.map((t=>Ki(t))).join(",");return`${n.op}(${e})`}}function Qu(n,e){return n instanceof de?(function(s,r){return r instanceof de&&s.op===r.op&&s.field.isEqual(r.field)&&Ge(s.value,r.value)})(n,e):n instanceof We?(function(s,r){return r instanceof We&&s.op===r.op&&s.filters.length===r.filters.length?s.filters.reduce(((i,o,c)=>i&&Qu(o,r.filters[c])),!0):!1})(n,e):void U(19439)}function Ju(n){return n instanceof de?(function(t){return`${t.field.canonicalString()} ${t.op} ${_n(t.value)}`})(n):n instanceof We?(function(t){return t.op.toString()+" {"+t.getFilters().map(Ju).join(" ,")+"}"})(n):"Filter"}class Sy extends de{constructor(e,t,s){super(e,t,s),this.key=O.fromName(s.referenceValue)}matches(e){const t=O.comparator(e.key,this.key);return this.matchesComparison(t)}}class ky extends de{constructor(e,t){super(e,"in",t),this.keys=Yu("in",t)}matches(e){return this.keys.some((t=>t.isEqual(e.key)))}}class Ry extends de{constructor(e,t){super(e,"not-in",t),this.keys=Yu("not-in",t)}matches(e){return!this.keys.some((t=>t.isEqual(e.key)))}}function Yu(n,e){var t;return(((t=e.arrayValue)==null?void 0:t.values)||[]).map((s=>O.fromName(s.referenceValue)))}class Py extends de{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return ba(t)&&ls(t.arrayValue,this.value)}}class Cy extends de{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&ls(this.value.arrayValue,t)}}class xy extends de{constructor(e,t){super(e,"not-in",t)}matches(e){if(ls(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!ls(this.value.arrayValue,t)}}class Dy extends de{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!ba(t)||!t.arrayValue.values)&&t.arrayValue.values.some((s=>ls(this.value.arrayValue,s)))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ny{constructor(e,t=null,s=[],r=[],i=null,o=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=s,this.filters=r,this.limit=i,this.startAt=o,this.endAt=c,this.Te=null}}function zc(n,e=null,t=[],s=[],r=null,i=null,o=null){return new Ny(n,e,t,s,r,i,o)}function Ia(n){const e=z(n);if(e.Te===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((s=>Ki(s))).join(","),t+="|ob:",t+=e.orderBy.map((s=>(function(i){return i.field.canonicalString()+i.dir})(s))).join(","),Cr(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map((s=>_n(s))).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map((s=>_n(s))).join(",")),e.Te=t}return e.Te}function wa(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!Ty(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!Qu(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!jc(n.startAt,e.startAt)&&jc(n.endAt,e.endAt)}function Hi(n){return O.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dr{constructor(e,t=null,s=[],r=[],i=null,o="F",c=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=s,this.filters=r,this.limit=i,this.limitType=o,this.startAt=c,this.endAt=u,this.Ee=null,this.Ie=null,this.Re=null,this.startAt,this.endAt}}function Vy(n,e,t,s,r,i,o,c){return new Dr(n,e,t,s,r,i,o,c)}function Nr(n){return new Dr(n)}function qc(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Ly(n){return O.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function My(n){return n.collectionGroup!==null}function ts(n){const e=z(n);if(e.Ee===null){e.Ee=[];const t=new Set;for(const i of e.explicitOrderBy)e.Ee.push(i),t.add(i.field.canonicalString());const s=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let c=new he(ye.comparator);return o.filters.forEach((u=>{u.getFlattenedFilters().forEach((h=>{h.isInequality()&&(c=c.add(h.field))}))})),c})(e).forEach((i=>{t.has(i.canonicalString())||i.isKeyField()||e.Ee.push(new yr(i,s))})),t.has(ye.keyField().canonicalString())||e.Ee.push(new yr(ye.keyField(),s))}return e.Ee}function ze(n){const e=z(n);return e.Ie||(e.Ie=Oy(e,ts(n))),e.Ie}function Oy(n,e){if(n.limitType==="F")return zc(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map((r=>{const i=r.dir==="desc"?"asc":"desc";return new yr(r.field,i)}));const t=n.endAt?new gr(n.endAt.position,n.endAt.inclusive):null,s=n.startAt?new gr(n.startAt.position,n.startAt.inclusive):null;return zc(n.path,n.collectionGroup,e,n.filters,n.limit,t,s)}}function Gi(n,e,t){return new Dr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function Vr(n,e){return wa(ze(n),ze(e))&&n.limitType===e.limitType}function Xu(n){return`${Ia(ze(n))}|lt:${n.limitType}`}function nn(n){return`Query(target=${(function(t){let s=t.path.canonicalString();return t.collectionGroup!==null&&(s+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(s+=`, filters: [${t.filters.map((r=>Ju(r))).join(", ")}]`),Cr(t.limit)||(s+=", limit: "+t.limit),t.orderBy.length>0&&(s+=`, orderBy: [${t.orderBy.map((r=>(function(o){return`${o.field.canonicalString()} (${o.dir})`})(r))).join(", ")}]`),t.startAt&&(s+=", startAt: ",s+=t.startAt.inclusive?"b:":"a:",s+=t.startAt.position.map((r=>_n(r))).join(",")),t.endAt&&(s+=", endAt: ",s+=t.endAt.inclusive?"a:":"b:",s+=t.endAt.position.map((r=>_n(r))).join(",")),`Target(${s})`})(ze(n))}; limitType=${n.limitType})`}function Lr(n,e){return e.isFoundDocument()&&(function(s,r){const i=r.key.path;return s.collectionGroup!==null?r.key.hasCollectionId(s.collectionGroup)&&s.path.isPrefixOf(i):O.isDocumentKey(s.path)?s.path.isEqual(i):s.path.isImmediateParentOf(i)})(n,e)&&(function(s,r){for(const i of ts(s))if(!i.field.isKeyField()&&r.data.field(i.field)===null)return!1;return!0})(n,e)&&(function(s,r){for(const i of s.filters)if(!i.matches(r))return!1;return!0})(n,e)&&(function(s,r){return!(s.startAt&&!(function(o,c,u){const h=$c(o,c,u);return o.inclusive?h<=0:h<0})(s.startAt,ts(s),r)||s.endAt&&!(function(o,c,u){const h=$c(o,c,u);return o.inclusive?h>=0:h>0})(s.endAt,ts(s),r))})(n,e)}function By(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function Zu(n){return(e,t)=>{let s=!1;for(const r of ts(n)){const i=Fy(r,e,t);if(i!==0)return i;s=s||r.field.isKeyField()}return 0}}function Fy(n,e,t){const s=n.field.isKeyField()?O.comparator(e.key,t.key):(function(i,o,c){const u=o.data.field(i),h=c.data.field(i);return u!==null&&h!==null?yn(u,h):U(42886)})(n.field,e,t);switch(n.dir){case"asc":return s;case"desc":return-1*s;default:return U(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jt{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),s=this.inner[t];if(s!==void 0){for(const[r,i]of s)if(this.equalsFn(r,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const s=this.mapKeyFn(e),r=this.inner[s];if(r===void 0)return this.inner[s]=[[e,t]],void this.innerSize++;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return void(r[i]=[e,t]);r.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),s=this.inner[t];if(s===void 0)return!1;for(let r=0;r<s.length;r++)if(this.equalsFn(s[r][0],e))return s.length===1?delete this.inner[t]:s.splice(r,1),this.innerSize--,!0;return!1}forEach(e){xt(this.inner,((t,s)=>{for(const[r,i]of s)e(r,i)}))}isEmpty(){return Ou(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uy=new re(O.comparator);function tt(){return Uy}const ed=new re(O.comparator);function Jn(...n){let e=ed;for(const t of n)e=e.insert(t.key,t);return e}function td(n){let e=ed;return n.forEach(((t,s)=>e=e.insert(t,s.overlayedDocument))),e}function Ut(){return ns()}function nd(){return ns()}function ns(){return new Jt((n=>n.toString()),((n,e)=>n.isEqual(e)))}const $y=new re(O.comparator),jy=new he(O.comparator);function J(...n){let e=jy;for(const t of n)e=e.add(t);return e}const zy=new he(Q);function qy(){return zy}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ta(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:fr(e)?"-0":e}}function sd(n){return{integerValue:""+n}}function Ky(n,e){return my(e)?sd(e):Ta(n,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mr{constructor(){this._=void 0}}function Hy(n,e,t){return n instanceof _r?(function(r,i){const o={fields:{[Uu]:{stringValue:Fu},[ju]:{timestampValue:{seconds:r.seconds,nanos:r.nanoseconds}}}};return i&&Ea(i)&&(i=xr(i)),i&&(o.fields[$u]=i),{mapValue:o}})(t,e):n instanceof us?id(n,e):n instanceof ds?ad(n,e):(function(r,i){const o=rd(r,i),c=Kc(o)+Kc(r.Ae);return qi(o)&&qi(r.Ae)?sd(c):Ta(r.serializer,c)})(n,e)}function Gy(n,e,t){return n instanceof us?id(n,e):n instanceof ds?ad(n,e):t}function rd(n,e){return n instanceof vr?(function(s){return qi(s)||(function(i){return!!i&&"doubleValue"in i})(s)})(e)?e:{integerValue:0}:null}class _r extends Mr{}class us extends Mr{constructor(e){super(),this.elements=e}}function id(n,e){const t=od(e);for(const s of n.elements)t.some((r=>Ge(r,s)))||t.push(s);return{arrayValue:{values:t}}}class ds extends Mr{constructor(e){super(),this.elements=e}}function ad(n,e){let t=od(e);for(const s of n.elements)t=t.filter((r=>!Ge(r,s)));return{arrayValue:{values:t}}}class vr extends Mr{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function Kc(n){return ae(n.integerValue||n.doubleValue)}function od(n){return ba(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}function Wy(n,e){return n.field.isEqual(e.field)&&(function(s,r){return s instanceof us&&r instanceof us||s instanceof ds&&r instanceof ds?gn(s.elements,r.elements,Ge):s instanceof vr&&r instanceof vr?Ge(s.Ae,r.Ae):s instanceof _r&&r instanceof _r})(n.transform,e.transform)}class Qy{constructor(e,t){this.version=e,this.transformResults=t}}class qe{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new qe}static exists(e){return new qe(void 0,e)}static updateTime(e){return new qe(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function tr(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class Or{}function cd(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new ud(n.key,qe.none()):new ws(n.key,n.data,qe.none());{const t=n.data,s=Pe.empty();let r=new he(ye.comparator);for(let i of e.fields)if(!r.has(i)){let o=t.field(i);o===null&&i.length>1&&(i=i.popLast(),o=t.field(i)),o===null?s.delete(i):s.set(i,o),r=r.add(i)}return new Dt(n.key,s,new xe(r.toArray()),qe.none())}}function Jy(n,e,t){n instanceof ws?(function(r,i,o){const c=r.value.clone(),u=Gc(r.fieldTransforms,i,o.transformResults);c.setAll(u),i.convertToFoundDocument(o.version,c).setHasCommittedMutations()})(n,e,t):n instanceof Dt?(function(r,i,o){if(!tr(r.precondition,i))return void i.convertToUnknownDocument(o.version);const c=Gc(r.fieldTransforms,i,o.transformResults),u=i.data;u.setAll(ld(r)),u.setAll(c),i.convertToFoundDocument(o.version,u).setHasCommittedMutations()})(n,e,t):(function(r,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()})(0,e,t)}function ss(n,e,t,s){return n instanceof ws?(function(i,o,c,u){if(!tr(i.precondition,o))return c;const h=i.value.clone(),f=Wc(i.fieldTransforms,u,o);return h.setAll(f),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),null})(n,e,t,s):n instanceof Dt?(function(i,o,c,u){if(!tr(i.precondition,o))return c;const h=Wc(i.fieldTransforms,u,o),f=o.data;return f.setAll(ld(i)),f.setAll(h),o.convertToFoundDocument(o.version,f).setHasLocalMutations(),c===null?null:c.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map((m=>m.field)))})(n,e,t,s):(function(i,o,c){return tr(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):c})(n,e,t)}function Yy(n,e){let t=null;for(const s of n.fieldTransforms){const r=e.data.field(s.field),i=rd(s.transform,r||null);i!=null&&(t===null&&(t=Pe.empty()),t.set(s.field,i))}return t||null}function Hc(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!(function(s,r){return s===void 0&&r===void 0||!(!s||!r)&&gn(s,r,((i,o)=>Wy(i,o)))})(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class ws extends Or{constructor(e,t,s,r=[]){super(),this.key=e,this.value=t,this.precondition=s,this.fieldTransforms=r,this.type=0}getFieldMask(){return null}}class Dt extends Or{constructor(e,t,s,r,i=[]){super(),this.key=e,this.data=t,this.fieldMask=s,this.precondition=r,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function ld(n){const e=new Map;return n.fieldMask.fields.forEach((t=>{if(!t.isEmpty()){const s=n.data.field(t);e.set(t,s)}})),e}function Gc(n,e,t){const s=new Map;X(n.length===t.length,32656,{Ve:t.length,de:n.length});for(let r=0;r<t.length;r++){const i=n[r],o=i.transform,c=e.data.field(i.field);s.set(i.field,Gy(o,c,t[r]))}return s}function Wc(n,e,t){const s=new Map;for(const r of n){const i=r.transform,o=t.data.field(r.field);s.set(r.field,Hy(i,o,e))}return s}class ud extends Or{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Xy extends Or{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zy{constructor(e,t,s,r){this.batchId=e,this.localWriteTime=t,this.baseMutations=s,this.mutations=r}applyToRemoteDocument(e,t){const s=t.mutationResults;for(let r=0;r<this.mutations.length;r++){const i=this.mutations[r];i.key.isEqual(e.key)&&Jy(i,e,s[r])}}applyToLocalView(e,t){for(const s of this.baseMutations)s.key.isEqual(e.key)&&(t=ss(s,e,t,this.localWriteTime));for(const s of this.mutations)s.key.isEqual(e.key)&&(t=ss(s,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const s=nd();return this.mutations.forEach((r=>{const i=e.get(r.key),o=i.overlayedDocument;let c=this.applyToLocalView(o,i.mutatedFields);c=t.has(r.key)?null:c;const u=cd(o,c);u!==null&&s.set(r.key,u),o.isValidDocument()||o.convertToNoDocument(j.min())})),s}keys(){return this.mutations.reduce(((e,t)=>e.add(t.key)),J())}isEqual(e){return this.batchId===e.batchId&&gn(this.mutations,e.mutations,((t,s)=>Hc(t,s)))&&gn(this.baseMutations,e.baseMutations,((t,s)=>Hc(t,s)))}}class Aa{constructor(e,t,s,r){this.batch=e,this.commitVersion=t,this.mutationResults=s,this.docVersions=r}static from(e,t,s){X(e.mutations.length===s.length,58842,{me:e.mutations.length,fe:s.length});let r=(function(){return $y})();const i=e.mutations;for(let o=0;o<i.length;o++)r=r.insert(i[o].key,s[o].version);return new Aa(e,t,s,r)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e_{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class t_{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var oe,Y;function n_(n){switch(n){case R.OK:return U(64938);case R.CANCELLED:case R.UNKNOWN:case R.DEADLINE_EXCEEDED:case R.RESOURCE_EXHAUSTED:case R.INTERNAL:case R.UNAVAILABLE:case R.UNAUTHENTICATED:return!1;case R.INVALID_ARGUMENT:case R.NOT_FOUND:case R.ALREADY_EXISTS:case R.PERMISSION_DENIED:case R.FAILED_PRECONDITION:case R.ABORTED:case R.OUT_OF_RANGE:case R.UNIMPLEMENTED:case R.DATA_LOSS:return!0;default:return U(15467,{code:n})}}function dd(n){if(n===void 0)return et("GRPC error has no .code"),R.UNKNOWN;switch(n){case oe.OK:return R.OK;case oe.CANCELLED:return R.CANCELLED;case oe.UNKNOWN:return R.UNKNOWN;case oe.DEADLINE_EXCEEDED:return R.DEADLINE_EXCEEDED;case oe.RESOURCE_EXHAUSTED:return R.RESOURCE_EXHAUSTED;case oe.INTERNAL:return R.INTERNAL;case oe.UNAVAILABLE:return R.UNAVAILABLE;case oe.UNAUTHENTICATED:return R.UNAUTHENTICATED;case oe.INVALID_ARGUMENT:return R.INVALID_ARGUMENT;case oe.NOT_FOUND:return R.NOT_FOUND;case oe.ALREADY_EXISTS:return R.ALREADY_EXISTS;case oe.PERMISSION_DENIED:return R.PERMISSION_DENIED;case oe.FAILED_PRECONDITION:return R.FAILED_PRECONDITION;case oe.ABORTED:return R.ABORTED;case oe.OUT_OF_RANGE:return R.OUT_OF_RANGE;case oe.UNIMPLEMENTED:return R.UNIMPLEMENTED;case oe.DATA_LOSS:return R.DATA_LOSS;default:return U(39323,{code:n})}}(Y=oe||(oe={}))[Y.OK=0]="OK",Y[Y.CANCELLED=1]="CANCELLED",Y[Y.UNKNOWN=2]="UNKNOWN",Y[Y.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Y[Y.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Y[Y.NOT_FOUND=5]="NOT_FOUND",Y[Y.ALREADY_EXISTS=6]="ALREADY_EXISTS",Y[Y.PERMISSION_DENIED=7]="PERMISSION_DENIED",Y[Y.UNAUTHENTICATED=16]="UNAUTHENTICATED",Y[Y.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Y[Y.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Y[Y.ABORTED=10]="ABORTED",Y[Y.OUT_OF_RANGE=11]="OUT_OF_RANGE",Y[Y.UNIMPLEMENTED=12]="UNIMPLEMENTED",Y[Y.INTERNAL=13]="INTERNAL",Y[Y.UNAVAILABLE=14]="UNAVAILABLE",Y[Y.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function s_(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const r_=new bt([4294967295,4294967295],0);function Qc(n){const e=s_().encode(n),t=new ku;return t.update(e),new Uint8Array(t.digest())}function Jc(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),s=e.getUint32(4,!0),r=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new bt([t,s],0),new bt([r,i],0)]}class Sa{constructor(e,t,s){if(this.bitmap=e,this.padding=t,this.hashCount=s,t<0||t>=8)throw new Yn(`Invalid padding: ${t}`);if(s<0)throw new Yn(`Invalid hash count: ${s}`);if(e.length>0&&this.hashCount===0)throw new Yn(`Invalid hash count: ${s}`);if(e.length===0&&t!==0)throw new Yn(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=bt.fromNumber(this.ge)}ye(e,t,s){let r=e.add(t.multiply(bt.fromNumber(s)));return r.compare(r_)===1&&(r=new bt([r.getBits(0),r.getBits(1)],0)),r.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=Qc(e),[s,r]=Jc(t);for(let i=0;i<this.hashCount;i++){const o=this.ye(s,r,i);if(!this.we(o))return!1}return!0}static create(e,t,s){const r=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),o=new Sa(i,r,t);return s.forEach((c=>o.insert(c))),o}insert(e){if(this.ge===0)return;const t=Qc(e),[s,r]=Jc(t);for(let i=0;i<this.hashCount;i++){const o=this.ye(s,r,i);this.Se(o)}}Se(e){const t=Math.floor(e/8),s=e%8;this.bitmap[t]|=1<<s}}class Yn extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Br{constructor(e,t,s,r,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=s,this.documentUpdates=r,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,s){const r=new Map;return r.set(e,Ts.createSynthesizedTargetChangeForCurrentChange(e,t,s)),new Br(j.min(),r,new re(Q),tt(),J())}}class Ts{constructor(e,t,s,r,i){this.resumeToken=e,this.current=t,this.addedDocuments=s,this.modifiedDocuments=r,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,s){return new Ts(s,t,J(),J(),J())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nr{constructor(e,t,s,r){this.be=e,this.removedTargetIds=t,this.key=s,this.De=r}}class hd{constructor(e,t){this.targetId=e,this.Ce=t}}class fd{constructor(e,t,s=_e.EMPTY_BYTE_STRING,r=null){this.state=e,this.targetIds=t,this.resumeToken=s,this.cause=r}}class Yc{constructor(){this.ve=0,this.Fe=Xc(),this.Me=_e.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=J(),t=J(),s=J();return this.Fe.forEach(((r,i)=>{switch(i){case 0:e=e.add(r);break;case 2:t=t.add(r);break;case 1:s=s.add(r);break;default:U(38017,{changeType:i})}})),new Ts(this.Me,this.xe,e,t,s)}qe(){this.Oe=!1,this.Fe=Xc()}Ke(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}Ue(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}$e(){this.ve+=1}We(){this.ve-=1,X(this.ve>=0,3241,{ve:this.ve})}Qe(){this.Oe=!0,this.xe=!0}}class i_{constructor(e){this.Ge=e,this.ze=new Map,this.je=tt(),this.Je=Hs(),this.He=Hs(),this.Ze=new re(Q)}Xe(e){for(const t of e.be)e.De&&e.De.isFoundDocument()?this.Ye(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,(t=>{const s=this.nt(t);switch(e.state){case 0:this.rt(t)&&s.Le(e.resumeToken);break;case 1:s.We(),s.Ne||s.qe(),s.Le(e.resumeToken);break;case 2:s.We(),s.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(s.Qe(),s.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),s.Le(e.resumeToken));break;default:U(56790,{state:e.state})}}))}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach(((s,r)=>{this.rt(r)&&t(r)}))}st(e){const t=e.targetId,s=e.Ce.count,r=this.ot(t);if(r){const i=r.target;if(Hi(i))if(s===0){const o=new O(i.path);this.et(t,o,Ie.newNoDocument(o,j.min()))}else X(s===1,20013,{expectedCount:s});else{const o=this._t(t);if(o!==s){const c=this.ut(e),u=c?this.ct(c,e,o):1;if(u!==0){this.it(t);const h=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(t,h)}}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:s="",padding:r=0},hashCount:i=0}=t;let o,c;try{o=St(s).toUint8Array()}catch(u){if(u instanceof Bu)return Gt("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{c=new Sa(o,r,i)}catch(u){return Gt(u instanceof Yn?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return c.ge===0?null:c}ct(e,t,s){return t.Ce.count===s-this.Pt(e,t.targetId)?0:2}Pt(e,t){const s=this.Ge.getRemoteKeysForTarget(t);let r=0;return s.forEach((i=>{const o=this.Ge.ht(),c=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;e.mightContain(c)||(this.et(t,i,null),r++)})),r}Tt(e){const t=new Map;this.ze.forEach(((i,o)=>{const c=this.ot(o);if(c){if(i.current&&Hi(c.target)){const u=new O(c.target.path);this.Et(u).has(o)||this.It(o,u)||this.et(o,u,Ie.newNoDocument(u,e))}i.Be&&(t.set(o,i.ke()),i.qe())}}));let s=J();this.He.forEach(((i,o)=>{let c=!0;o.forEachWhile((u=>{const h=this.ot(u);return!h||h.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)})),c&&(s=s.add(i))})),this.je.forEach(((i,o)=>o.setReadTime(e)));const r=new Br(e,t,this.Ze,this.je,s);return this.je=tt(),this.Je=Hs(),this.He=Hs(),this.Ze=new re(Q),r}Ye(e,t){if(!this.rt(e))return;const s=this.It(e,t.key)?2:0;this.nt(e).Ke(t.key,s),this.je=this.je.insert(t.key,t),this.Je=this.Je.insert(t.key,this.Et(t.key).add(e)),this.He=this.He.insert(t.key,this.Rt(t.key).add(e))}et(e,t,s){if(!this.rt(e))return;const r=this.nt(e);this.It(e,t)?r.Ke(t,1):r.Ue(t),this.He=this.He.insert(t,this.Rt(t).delete(e)),this.He=this.He.insert(t,this.Rt(t).add(e)),s&&(this.je=this.je.insert(t,s))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}$e(e){this.nt(e).$e()}nt(e){let t=this.ze.get(e);return t||(t=new Yc,this.ze.set(e,t)),t}Rt(e){let t=this.He.get(e);return t||(t=new he(Q),this.He=this.He.insert(e,t)),t}Et(e){let t=this.Je.get(e);return t||(t=new he(Q),this.Je=this.Je.insert(e,t)),t}rt(e){const t=this.ot(e)!==null;return t||N("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new Yc),this.Ge.getRemoteKeysForTarget(e).forEach((t=>{this.et(e,t,null)}))}It(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function Hs(){return new re(O.comparator)}function Xc(){return new re(O.comparator)}const a_={asc:"ASCENDING",desc:"DESCENDING"},o_={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},c_={and:"AND",or:"OR"};class l_{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function Wi(n,e){return n.useProto3Json||Cr(e)?e:{value:e}}function Er(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function pd(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function u_(n,e){return Er(n,e.toTimestamp())}function Ke(n){return X(!!n,49232),j.fromTimestamp((function(t){const s=At(t);return new ne(s.seconds,s.nanos)})(n))}function ka(n,e){return Qi(n,e).canonicalString()}function Qi(n,e){const t=(function(r){return new se(["projects",r.projectId,"databases",r.database])})(n).child("documents");return e===void 0?t:t.child(e)}function md(n){const e=se.fromString(n);return X(Ed(e),10190,{key:e.toString()}),e}function Ji(n,e){return ka(n.databaseId,e.path)}function Ti(n,e){const t=md(e);if(t.get(1)!==n.databaseId.projectId)throw new L(R.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new L(R.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new O(yd(t))}function gd(n,e){return ka(n.databaseId,e)}function d_(n){const e=md(n);return e.length===4?se.emptyPath():yd(e)}function Yi(n){return new se(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function yd(n){return X(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function Zc(n,e,t){return{name:Ji(n,e),fields:t.value.mapValue.fields}}function h_(n,e){let t;if("targetChange"in e){e.targetChange;const s=(function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:U(39313,{state:h})})(e.targetChange.targetChangeType||"NO_CHANGE"),r=e.targetChange.targetIds||[],i=(function(h,f){return h.useProto3Json?(X(f===void 0||typeof f=="string",58123),_e.fromBase64String(f||"")):(X(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),_e.fromUint8Array(f||new Uint8Array))})(n,e.targetChange.resumeToken),o=e.targetChange.cause,c=o&&(function(h){const f=h.code===void 0?R.UNKNOWN:dd(h.code);return new L(f,h.message||"")})(o);t=new fd(s,r,i,c||null)}else if("documentChange"in e){e.documentChange;const s=e.documentChange;s.document,s.document.name,s.document.updateTime;const r=Ti(n,s.document.name),i=Ke(s.document.updateTime),o=s.document.createTime?Ke(s.document.createTime):j.min(),c=new Pe({mapValue:{fields:s.document.fields}}),u=Ie.newFoundDocument(r,i,o,c),h=s.targetIds||[],f=s.removedTargetIds||[];t=new nr(h,f,u.key,u)}else if("documentDelete"in e){e.documentDelete;const s=e.documentDelete;s.document;const r=Ti(n,s.document),i=s.readTime?Ke(s.readTime):j.min(),o=Ie.newNoDocument(r,i),c=s.removedTargetIds||[];t=new nr([],c,o.key,o)}else if("documentRemove"in e){e.documentRemove;const s=e.documentRemove;s.document;const r=Ti(n,s.document),i=s.removedTargetIds||[];t=new nr([],i,r,null)}else{if(!("filter"in e))return U(11601,{Vt:e});{e.filter;const s=e.filter;s.targetId;const{count:r=0,unchangedNames:i}=s,o=new t_(r,i),c=s.targetId;t=new hd(c,o)}}return t}function f_(n,e){let t;if(e instanceof ws)t={update:Zc(n,e.key,e.value)};else if(e instanceof ud)t={delete:Ji(n,e.key)};else if(e instanceof Dt)t={update:Zc(n,e.key,e.data),updateMask:I_(e.fieldMask)};else{if(!(e instanceof Xy))return U(16599,{dt:e.type});t={verify:Ji(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map((s=>(function(i,o){const c=o.transform;if(c instanceof _r)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof us)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof ds)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof vr)return{fieldPath:o.field.canonicalString(),increment:c.Ae};throw U(20930,{transform:o.transform})})(0,s)))),e.precondition.isNone||(t.currentDocument=(function(r,i){return i.updateTime!==void 0?{updateTime:u_(r,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:U(27497)})(n,e.precondition)),t}function p_(n,e){return n&&n.length>0?(X(e!==void 0,14353),n.map((t=>(function(r,i){let o=r.updateTime?Ke(r.updateTime):Ke(i);return o.isEqual(j.min())&&(o=Ke(i)),new Qy(o,r.transformResults||[])})(t,e)))):[]}function m_(n,e){return{documents:[gd(n,e.path)]}}function g_(n,e){const t={structuredQuery:{}},s=e.path;let r;e.collectionGroup!==null?(r=s,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(r=s.popLast(),t.structuredQuery.from=[{collectionId:s.lastSegment()}]),t.parent=gd(n,r);const i=(function(h){if(h.length!==0)return vd(We.create(h,"and"))})(e.filters);i&&(t.structuredQuery.where=i);const o=(function(h){if(h.length!==0)return h.map((f=>(function(E){return{field:sn(E.field),direction:v_(E.dir)}})(f)))})(e.orderBy);o&&(t.structuredQuery.orderBy=o);const c=Wi(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=(function(h){return{before:h.inclusive,values:h.position}})(e.startAt)),e.endAt&&(t.structuredQuery.endAt=(function(h){return{before:!h.inclusive,values:h.position}})(e.endAt)),{ft:t,parent:r}}function y_(n){let e=d_(n.parent);const t=n.structuredQuery,s=t.from?t.from.length:0;let r=null;if(s>0){X(s===1,65062);const f=t.from[0];f.allDescendants?r=f.collectionId:e=e.child(f.collectionId)}let i=[];t.where&&(i=(function(m){const E=_d(m);return E instanceof We&&Wu(E)?E.getFilters():[E]})(t.where));let o=[];t.orderBy&&(o=(function(m){return m.map((E=>(function(P){return new yr(rn(P.field),(function(C){switch(C){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(P.direction))})(E)))})(t.orderBy));let c=null;t.limit&&(c=(function(m){let E;return E=typeof m=="object"?m.value:m,Cr(E)?null:E})(t.limit));let u=null;t.startAt&&(u=(function(m){const E=!!m.before,S=m.values||[];return new gr(S,E)})(t.startAt));let h=null;return t.endAt&&(h=(function(m){const E=!m.before,S=m.values||[];return new gr(S,E)})(t.endAt)),Vy(e,r,o,i,c,"F",u,h)}function __(n,e){const t=(function(r){switch(r){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return U(28987,{purpose:r})}})(e.purpose);return t==null?null:{"goog-listen-tags":t}}function _d(n){return n.unaryFilter!==void 0?(function(t){switch(t.unaryFilter.op){case"IS_NAN":const s=rn(t.unaryFilter.field);return de.create(s,"==",{doubleValue:NaN});case"IS_NULL":const r=rn(t.unaryFilter.field);return de.create(r,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=rn(t.unaryFilter.field);return de.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=rn(t.unaryFilter.field);return de.create(o,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return U(61313);default:return U(60726)}})(n):n.fieldFilter!==void 0?(function(t){return de.create(rn(t.fieldFilter.field),(function(r){switch(r){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return U(58110);default:return U(50506)}})(t.fieldFilter.op),t.fieldFilter.value)})(n):n.compositeFilter!==void 0?(function(t){return We.create(t.compositeFilter.filters.map((s=>_d(s))),(function(r){switch(r){case"AND":return"and";case"OR":return"or";default:return U(1026)}})(t.compositeFilter.op))})(n):U(30097,{filter:n})}function v_(n){return a_[n]}function E_(n){return o_[n]}function b_(n){return c_[n]}function sn(n){return{fieldPath:n.canonicalString()}}function rn(n){return ye.fromServerFormat(n.fieldPath)}function vd(n){return n instanceof de?(function(t){if(t.op==="=="){if(Uc(t.value))return{unaryFilter:{field:sn(t.field),op:"IS_NAN"}};if(Fc(t.value))return{unaryFilter:{field:sn(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Uc(t.value))return{unaryFilter:{field:sn(t.field),op:"IS_NOT_NAN"}};if(Fc(t.value))return{unaryFilter:{field:sn(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:sn(t.field),op:E_(t.op),value:t.value}}})(n):n instanceof We?(function(t){const s=t.getFilters().map((r=>vd(r)));return s.length===1?s[0]:{compositeFilter:{op:b_(t.op),filters:s}}})(n):U(54877,{filter:n})}function I_(n){const e=[];return n.fields.forEach((t=>e.push(t.canonicalString()))),{fieldPaths:e}}function Ed(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}function bd(n){return!!n&&typeof n._toProto=="function"&&n._protoValueType==="ProtoValue"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gt{constructor(e,t,s,r,i=j.min(),o=j.min(),c=_e.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=s,this.sequenceNumber=r,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=c,this.expectedCount=u}withSequenceNumber(e){return new gt(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new gt(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new gt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new gt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class w_{constructor(e){this.yt=e}}function T_(n){const e=y_({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Gi(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class A_{constructor(){this.bn=new S_}addToCollectionParentIndex(e,t){return this.bn.add(t),k.resolve()}getCollectionParents(e,t){return k.resolve(this.bn.getEntries(t))}addFieldIndex(e,t){return k.resolve()}deleteFieldIndex(e,t){return k.resolve()}deleteAllFieldIndexes(e){return k.resolve()}createTargetIndexes(e,t){return k.resolve()}getDocumentsMatchingTarget(e,t){return k.resolve(null)}getIndexType(e,t){return k.resolve(0)}getFieldIndexes(e,t){return k.resolve([])}getNextCollectionGroupToUpdate(e){return k.resolve(null)}getMinOffset(e,t){return k.resolve(Tt.min())}getMinOffsetFromCollectionGroup(e,t){return k.resolve(Tt.min())}updateCollectionGroup(e,t,s){return k.resolve()}updateIndexEntries(e,t){return k.resolve()}}class S_{constructor(){this.index={}}add(e){const t=e.lastSegment(),s=e.popLast(),r=this.index[t]||new he(se.comparator),i=!r.has(s);return this.index[t]=r.add(s),i}has(e){const t=e.lastSegment(),s=e.popLast(),r=this.index[t];return r&&r.has(s)}getEntries(e){return(this.index[e]||new he(se.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const el={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Id=41943040;class Re{static withCacheSize(e){return new Re(e,Re.DEFAULT_COLLECTION_PERCENTILE,Re.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,s){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Re.DEFAULT_COLLECTION_PERCENTILE=10,Re.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Re.DEFAULT=new Re(Id,Re.DEFAULT_COLLECTION_PERCENTILE,Re.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Re.DISABLED=new Re(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vn{constructor(e){this.sr=e}next(){return this.sr+=2,this.sr}static _r(){return new vn(0)}static ar(){return new vn(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tl="LruGarbageCollector",k_=1048576;function nl([n,e],[t,s]){const r=Q(n,t);return r===0?Q(e,s):r}class R_{constructor(e){this.Pr=e,this.buffer=new he(nl),this.Tr=0}Er(){return++this.Tr}Ir(e){const t=[e,this.Er()];if(this.buffer.size<this.Pr)this.buffer=this.buffer.add(t);else{const s=this.buffer.last();nl(t,s)<0&&(this.buffer=this.buffer.delete(s).add(t))}}get maxValue(){return this.buffer.last()[0]}}class P_{constructor(e,t,s){this.garbageCollector=e,this.asyncQueue=t,this.localStore=s,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Ar(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Ar(e){N(tl,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){Sn(t)?N(tl,"Ignoring IndexedDB error during garbage collection: ",t):await An(t)}await this.Ar(3e5)}))}}class C_{constructor(e,t){this.Vr=e,this.params=t}calculateTargetCount(e,t){return this.Vr.dr(e).next((s=>Math.floor(t/100*s)))}nthSequenceNumber(e,t){if(t===0)return k.resolve(Pr.ce);const s=new R_(t);return this.Vr.forEachTarget(e,(r=>s.Ir(r.sequenceNumber))).next((()=>this.Vr.mr(e,(r=>s.Ir(r))))).next((()=>s.maxValue))}removeTargets(e,t,s){return this.Vr.removeTargets(e,t,s)}removeOrphanedDocuments(e,t){return this.Vr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(N("LruGarbageCollector","Garbage collection skipped; disabled"),k.resolve(el)):this.getCacheSize(e).next((s=>s<this.params.cacheSizeCollectionThreshold?(N("LruGarbageCollector",`Garbage collection skipped; Cache size ${s} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),el):this.gr(e,t)))}getCacheSize(e){return this.Vr.getCacheSize(e)}gr(e,t){let s,r,i,o,c,u,h;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next((m=>(m>this.params.maximumSequenceNumbersToCollect?(N("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${m}`),r=this.params.maximumSequenceNumbersToCollect):r=m,o=Date.now(),this.nthSequenceNumber(e,r)))).next((m=>(s=m,c=Date.now(),this.removeTargets(e,s,t)))).next((m=>(i=m,u=Date.now(),this.removeOrphanedDocuments(e,s)))).next((m=>(h=Date.now(),tn()<=W.DEBUG&&N("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-f}ms
	Determined least recently used ${r} in `+(c-o)+`ms
	Removed ${i} targets in `+(u-c)+`ms
	Removed ${m} documents in `+(h-u)+`ms
Total Duration: ${h-f}ms`),k.resolve({didRun:!0,sequenceNumbersCollected:r,targetsRemoved:i,documentsRemoved:m}))))}}function x_(n,e){return new C_(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class D_{constructor(){this.changes=new Jt((e=>e.toString()),((e,t)=>e.isEqual(t))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Ie.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const s=this.changes.get(t);return s!==void 0?k.resolve(s):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class N_{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class V_{constructor(e,t,s,r){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=s,this.indexManager=r}getDocument(e,t){let s=null;return this.documentOverlayCache.getOverlay(e,t).next((r=>(s=r,this.remoteDocumentCache.getEntry(e,t)))).next((r=>(s!==null&&ss(s.mutation,r,xe.empty(),ne.now()),r)))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next((s=>this.getLocalViewOfDocuments(e,s,J()).next((()=>s))))}getLocalViewOfDocuments(e,t,s=J()){const r=Ut();return this.populateOverlays(e,r,t).next((()=>this.computeViews(e,t,r,s).next((i=>{let o=Jn();return i.forEach(((c,u)=>{o=o.insert(c,u.overlayedDocument)})),o}))))}getOverlayedDocuments(e,t){const s=Ut();return this.populateOverlays(e,s,t).next((()=>this.computeViews(e,t,s,J())))}populateOverlays(e,t,s){const r=[];return s.forEach((i=>{t.has(i)||r.push(i)})),this.documentOverlayCache.getOverlays(e,r).next((i=>{i.forEach(((o,c)=>{t.set(o,c)}))}))}computeViews(e,t,s,r){let i=tt();const o=ns(),c=(function(){return ns()})();return t.forEach(((u,h)=>{const f=s.get(h.key);r.has(h.key)&&(f===void 0||f.mutation instanceof Dt)?i=i.insert(h.key,h):f!==void 0?(o.set(h.key,f.mutation.getFieldMask()),ss(f.mutation,h,f.mutation.getFieldMask(),ne.now())):o.set(h.key,xe.empty())})),this.recalculateAndSaveOverlays(e,i).next((u=>(u.forEach(((h,f)=>o.set(h,f))),t.forEach(((h,f)=>c.set(h,new N_(f,o.get(h)??null)))),c)))}recalculateAndSaveOverlays(e,t){const s=ns();let r=new re(((o,c)=>o-c)),i=J();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next((o=>{for(const c of o)c.keys().forEach((u=>{const h=t.get(u);if(h===null)return;let f=s.get(u)||xe.empty();f=c.applyToLocalView(h,f),s.set(u,f);const m=(r.get(c.batchId)||J()).add(u);r=r.insert(c.batchId,m)}))})).next((()=>{const o=[],c=r.getReverseIterator();for(;c.hasNext();){const u=c.getNext(),h=u.key,f=u.value,m=nd();f.forEach((E=>{if(!i.has(E)){const S=cd(t.get(E),s.get(E));S!==null&&m.set(E,S),i=i.add(E)}})),o.push(this.documentOverlayCache.saveOverlays(e,h,m))}return k.waitFor(o)})).next((()=>s))}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next((s=>this.recalculateAndSaveOverlays(e,s)))}getDocumentsMatchingQuery(e,t,s,r){return Ly(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):My(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,s,r):this.getDocumentsMatchingCollectionQuery(e,t,s,r)}getNextDocuments(e,t,s,r){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,s,r).next((i=>{const o=r-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,s.largestBatchId,r-i.size):k.resolve(Ut());let c=as,u=i;return o.next((h=>k.forEach(h,((f,m)=>(c<m.largestBatchId&&(c=m.largestBatchId),i.get(f)?k.resolve():this.remoteDocumentCache.getEntry(e,f).next((E=>{u=u.insert(f,E)}))))).next((()=>this.populateOverlays(e,h,i))).next((()=>this.computeViews(e,u,h,J()))).next((f=>({batchId:c,changes:td(f)})))))}))}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new O(t)).next((s=>{let r=Jn();return s.isFoundDocument()&&(r=r.insert(s.key,s)),r}))}getDocumentsMatchingCollectionGroupQuery(e,t,s,r){const i=t.collectionGroup;let o=Jn();return this.indexManager.getCollectionParents(e,i).next((c=>k.forEach(c,(u=>{const h=(function(m,E){return new Dr(E,null,m.explicitOrderBy.slice(),m.filters.slice(),m.limit,m.limitType,m.startAt,m.endAt)})(t,u.child(i));return this.getDocumentsMatchingCollectionQuery(e,h,s,r).next((f=>{f.forEach(((m,E)=>{o=o.insert(m,E)}))}))})).next((()=>o))))}getDocumentsMatchingCollectionQuery(e,t,s,r){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,s.largestBatchId).next((o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,s,i,r)))).next((o=>{i.forEach(((u,h)=>{const f=h.getKey();o.get(f)===null&&(o=o.insert(f,Ie.newInvalidDocument(f)))}));let c=Jn();return o.forEach(((u,h)=>{const f=i.get(u);f!==void 0&&ss(f.mutation,h,xe.empty(),ne.now()),Lr(t,h)&&(c=c.insert(u,h))})),c}))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L_{constructor(e){this.serializer=e,this.Nr=new Map,this.Br=new Map}getBundleMetadata(e,t){return k.resolve(this.Nr.get(t))}saveBundleMetadata(e,t){return this.Nr.set(t.id,(function(r){return{id:r.id,version:r.version,createTime:Ke(r.createTime)}})(t)),k.resolve()}getNamedQuery(e,t){return k.resolve(this.Br.get(t))}saveNamedQuery(e,t){return this.Br.set(t.name,(function(r){return{name:r.name,query:T_(r.bundledQuery),readTime:Ke(r.readTime)}})(t)),k.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M_{constructor(){this.overlays=new re(O.comparator),this.Lr=new Map}getOverlay(e,t){return k.resolve(this.overlays.get(t))}getOverlays(e,t){const s=Ut();return k.forEach(t,(r=>this.getOverlay(e,r).next((i=>{i!==null&&s.set(r,i)})))).next((()=>s))}saveOverlays(e,t,s){return s.forEach(((r,i)=>{this.St(e,t,i)})),k.resolve()}removeOverlaysForBatchId(e,t,s){const r=this.Lr.get(s);return r!==void 0&&(r.forEach((i=>this.overlays=this.overlays.remove(i))),this.Lr.delete(s)),k.resolve()}getOverlaysForCollection(e,t,s){const r=Ut(),i=t.length+1,o=new O(t.child("")),c=this.overlays.getIteratorFrom(o);for(;c.hasNext();){const u=c.getNext().value,h=u.getKey();if(!t.isPrefixOf(h.path))break;h.path.length===i&&u.largestBatchId>s&&r.set(u.getKey(),u)}return k.resolve(r)}getOverlaysForCollectionGroup(e,t,s,r){let i=new re(((h,f)=>h-f));const o=this.overlays.getIterator();for(;o.hasNext();){const h=o.getNext().value;if(h.getKey().getCollectionGroup()===t&&h.largestBatchId>s){let f=i.get(h.largestBatchId);f===null&&(f=Ut(),i=i.insert(h.largestBatchId,f)),f.set(h.getKey(),h)}}const c=Ut(),u=i.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach(((h,f)=>c.set(h,f))),!(c.size()>=r)););return k.resolve(c)}St(e,t,s){const r=this.overlays.get(s.key);if(r!==null){const o=this.Lr.get(r.largestBatchId).delete(s.key);this.Lr.set(r.largestBatchId,o)}this.overlays=this.overlays.insert(s.key,new e_(t,s));let i=this.Lr.get(t);i===void 0&&(i=J(),this.Lr.set(t,i)),this.Lr.set(t,i.add(s.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class O_{constructor(){this.sessionToken=_e.EMPTY_BYTE_STRING}getSessionToken(e){return k.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,k.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ra{constructor(){this.kr=new he(pe.qr),this.Kr=new he(pe.Ur)}isEmpty(){return this.kr.isEmpty()}addReference(e,t){const s=new pe(e,t);this.kr=this.kr.add(s),this.Kr=this.Kr.add(s)}$r(e,t){e.forEach((s=>this.addReference(s,t)))}removeReference(e,t){this.Wr(new pe(e,t))}Qr(e,t){e.forEach((s=>this.removeReference(s,t)))}Gr(e){const t=new O(new se([])),s=new pe(t,e),r=new pe(t,e+1),i=[];return this.Kr.forEachInRange([s,r],(o=>{this.Wr(o),i.push(o.key)})),i}zr(){this.kr.forEach((e=>this.Wr(e)))}Wr(e){this.kr=this.kr.delete(e),this.Kr=this.Kr.delete(e)}jr(e){const t=new O(new se([])),s=new pe(t,e),r=new pe(t,e+1);let i=J();return this.Kr.forEachInRange([s,r],(o=>{i=i.add(o.key)})),i}containsKey(e){const t=new pe(e,0),s=this.kr.firstAfterOrEqual(t);return s!==null&&e.isEqual(s.key)}}class pe{constructor(e,t){this.key=e,this.Jr=t}static qr(e,t){return O.comparator(e.key,t.key)||Q(e.Jr,t.Jr)}static Ur(e,t){return Q(e.Jr,t.Jr)||O.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class B_{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Yn=1,this.Hr=new he(pe.qr)}checkEmpty(e){return k.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,s,r){const i=this.Yn;this.Yn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new Zy(i,t,s,r);this.mutationQueue.push(o);for(const c of r)this.Hr=this.Hr.add(new pe(c.key,i)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return k.resolve(o)}lookupMutationBatch(e,t){return k.resolve(this.Zr(t))}getNextMutationBatchAfterBatchId(e,t){const s=t+1,r=this.Xr(s),i=r<0?0:r;return k.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return k.resolve(this.mutationQueue.length===0?va:this.Yn-1)}getAllMutationBatches(e){return k.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const s=new pe(t,0),r=new pe(t,Number.POSITIVE_INFINITY),i=[];return this.Hr.forEachInRange([s,r],(o=>{const c=this.Zr(o.Jr);i.push(c)})),k.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let s=new he(Q);return t.forEach((r=>{const i=new pe(r,0),o=new pe(r,Number.POSITIVE_INFINITY);this.Hr.forEachInRange([i,o],(c=>{s=s.add(c.Jr)}))})),k.resolve(this.Yr(s))}getAllMutationBatchesAffectingQuery(e,t){const s=t.path,r=s.length+1;let i=s;O.isDocumentKey(i)||(i=i.child(""));const o=new pe(new O(i),0);let c=new he(Q);return this.Hr.forEachWhile((u=>{const h=u.key.path;return!!s.isPrefixOf(h)&&(h.length===r&&(c=c.add(u.Jr)),!0)}),o),k.resolve(this.Yr(c))}Yr(e){const t=[];return e.forEach((s=>{const r=this.Zr(s);r!==null&&t.push(r)})),t}removeMutationBatch(e,t){X(this.ei(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let s=this.Hr;return k.forEach(t.mutations,(r=>{const i=new pe(r.key,t.batchId);return s=s.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,r.key)})).next((()=>{this.Hr=s}))}nr(e){}containsKey(e,t){const s=new pe(t,0),r=this.Hr.firstAfterOrEqual(s);return k.resolve(t.isEqual(r&&r.key))}performConsistencyCheck(e){return this.mutationQueue.length,k.resolve()}ei(e,t){return this.Xr(e)}Xr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Zr(e){const t=this.Xr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class F_{constructor(e){this.ti=e,this.docs=(function(){return new re(O.comparator)})(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const s=t.key,r=this.docs.get(s),i=r?r.size:0,o=this.ti(t);return this.docs=this.docs.insert(s,{document:t.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,s.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const s=this.docs.get(t);return k.resolve(s?s.document.mutableCopy():Ie.newInvalidDocument(t))}getEntries(e,t){let s=tt();return t.forEach((r=>{const i=this.docs.get(r);s=s.insert(r,i?i.document.mutableCopy():Ie.newInvalidDocument(r))})),k.resolve(s)}getDocumentsMatchingQuery(e,t,s,r){let i=tt();const o=t.path,c=new O(o.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(c);for(;u.hasNext();){const{key:h,value:{document:f}}=u.getNext();if(!o.isPrefixOf(h.path))break;h.path.length>o.length+1||dy(uy(f),s)<=0||(r.has(f.key)||Lr(t,f))&&(i=i.insert(f.key,f.mutableCopy()))}return k.resolve(i)}getAllFromCollectionGroup(e,t,s,r){U(9500)}ni(e,t){return k.forEach(this.docs,(s=>t(s)))}newChangeBuffer(e){return new U_(this)}getSize(e){return k.resolve(this.size)}}class U_ extends D_{constructor(e){super(),this.Mr=e}applyChanges(e){const t=[];return this.changes.forEach(((s,r)=>{r.isValidDocument()?t.push(this.Mr.addEntry(e,r)):this.Mr.removeEntry(s)})),k.waitFor(t)}getFromCache(e,t){return this.Mr.getEntry(e,t)}getAllFromCache(e,t){return this.Mr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $_{constructor(e){this.persistence=e,this.ri=new Jt((t=>Ia(t)),wa),this.lastRemoteSnapshotVersion=j.min(),this.highestTargetId=0,this.ii=0,this.si=new Ra,this.targetCount=0,this.oi=vn._r()}forEachTarget(e,t){return this.ri.forEach(((s,r)=>t(r))),k.resolve()}getLastRemoteSnapshotVersion(e){return k.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return k.resolve(this.ii)}allocateTargetId(e){return this.highestTargetId=this.oi.next(),k.resolve(this.highestTargetId)}setTargetsMetadata(e,t,s){return s&&(this.lastRemoteSnapshotVersion=s),t>this.ii&&(this.ii=t),k.resolve()}lr(e){this.ri.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.oi=new vn(t),this.highestTargetId=t),e.sequenceNumber>this.ii&&(this.ii=e.sequenceNumber)}addTargetData(e,t){return this.lr(t),this.targetCount+=1,k.resolve()}updateTargetData(e,t){return this.lr(t),k.resolve()}removeTargetData(e,t){return this.ri.delete(t.target),this.si.Gr(t.targetId),this.targetCount-=1,k.resolve()}removeTargets(e,t,s){let r=0;const i=[];return this.ri.forEach(((o,c)=>{c.sequenceNumber<=t&&s.get(c.targetId)===null&&(this.ri.delete(o),i.push(this.removeMatchingKeysForTargetId(e,c.targetId)),r++)})),k.waitFor(i).next((()=>r))}getTargetCount(e){return k.resolve(this.targetCount)}getTargetData(e,t){const s=this.ri.get(t)||null;return k.resolve(s)}addMatchingKeys(e,t,s){return this.si.$r(t,s),k.resolve()}removeMatchingKeys(e,t,s){this.si.Qr(t,s);const r=this.persistence.referenceDelegate,i=[];return r&&t.forEach((o=>{i.push(r.markPotentiallyOrphaned(e,o))})),k.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.si.Gr(t),k.resolve()}getMatchingKeysForTargetId(e,t){const s=this.si.jr(t);return k.resolve(s)}containsKey(e,t){return k.resolve(this.si.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wd{constructor(e,t){this._i={},this.overlays={},this.ai=new Pr(0),this.ui=!1,this.ui=!0,this.ci=new O_,this.referenceDelegate=e(this),this.li=new $_(this),this.indexManager=new A_,this.remoteDocumentCache=(function(r){return new F_(r)})((s=>this.referenceDelegate.hi(s))),this.serializer=new w_(t),this.Pi=new L_(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ui=!1,Promise.resolve()}get started(){return this.ui}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new M_,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let s=this._i[e.toKey()];return s||(s=new B_(t,this.referenceDelegate),this._i[e.toKey()]=s),s}getGlobalsCache(){return this.ci}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Pi}runTransaction(e,t,s){N("MemoryPersistence","Starting transaction:",e);const r=new j_(this.ai.next());return this.referenceDelegate.Ti(),s(r).next((i=>this.referenceDelegate.Ei(r).next((()=>i)))).toPromise().then((i=>(r.raiseOnCommittedEvent(),i)))}Ii(e,t){return k.or(Object.values(this._i).map((s=>()=>s.containsKey(e,t))))}}class j_ extends fy{constructor(e){super(),this.currentSequenceNumber=e}}class Pa{constructor(e){this.persistence=e,this.Ri=new Ra,this.Ai=null}static Vi(e){return new Pa(e)}get di(){if(this.Ai)return this.Ai;throw U(60996)}addReference(e,t,s){return this.Ri.addReference(s,t),this.di.delete(s.toString()),k.resolve()}removeReference(e,t,s){return this.Ri.removeReference(s,t),this.di.add(s.toString()),k.resolve()}markPotentiallyOrphaned(e,t){return this.di.add(t.toString()),k.resolve()}removeTarget(e,t){this.Ri.Gr(t.targetId).forEach((r=>this.di.add(r.toString())));const s=this.persistence.getTargetCache();return s.getMatchingKeysForTargetId(e,t.targetId).next((r=>{r.forEach((i=>this.di.add(i.toString())))})).next((()=>s.removeTargetData(e,t)))}Ti(){this.Ai=new Set}Ei(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return k.forEach(this.di,(s=>{const r=O.fromPath(s);return this.mi(e,r).next((i=>{i||t.removeEntry(r,j.min())}))})).next((()=>(this.Ai=null,t.apply(e))))}updateLimboDocument(e,t){return this.mi(e,t).next((s=>{s?this.di.delete(t.toString()):this.di.add(t.toString())}))}hi(e){return 0}mi(e,t){return k.or([()=>k.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ii(e,t)])}}class br{constructor(e,t){this.persistence=e,this.fi=new Jt((s=>gy(s.path)),((s,r)=>s.isEqual(r))),this.garbageCollector=x_(this,t)}static Vi(e,t){return new br(e,t)}Ti(){}Ei(e){return k.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}dr(e){const t=this.pr(e);return this.persistence.getTargetCache().getTargetCount(e).next((s=>t.next((r=>s+r))))}pr(e){let t=0;return this.mr(e,(s=>{t++})).next((()=>t))}mr(e,t){return k.forEach(this.fi,((s,r)=>this.wr(e,s,r).next((i=>i?k.resolve():t(r)))))}removeTargets(e,t,s){return this.persistence.getTargetCache().removeTargets(e,t,s)}removeOrphanedDocuments(e,t){let s=0;const r=this.persistence.getRemoteDocumentCache(),i=r.newChangeBuffer();return r.ni(e,(o=>this.wr(e,o,t).next((c=>{c||(s++,i.removeEntry(o,j.min()))})))).next((()=>i.apply(e))).next((()=>s))}markPotentiallyOrphaned(e,t){return this.fi.set(t,e.currentSequenceNumber),k.resolve()}removeTarget(e,t){const s=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,s)}addReference(e,t,s){return this.fi.set(s,e.currentSequenceNumber),k.resolve()}removeReference(e,t,s){return this.fi.set(s,e.currentSequenceNumber),k.resolve()}updateLimboDocument(e,t){return this.fi.set(t,e.currentSequenceNumber),k.resolve()}hi(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Zs(e.data.value)),t}wr(e,t,s){return k.or([()=>this.persistence.Ii(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const r=this.fi.get(t);return k.resolve(r!==void 0&&r>s)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ca{constructor(e,t,s,r){this.targetId=e,this.fromCache=t,this.Ts=s,this.Es=r}static Is(e,t){let s=J(),r=J();for(const i of t.docChanges)switch(i.type){case 0:s=s.add(i.doc.key);break;case 1:r=r.add(i.doc.key)}return new Ca(e,t.fromCache,s,r)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class z_{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class q_{constructor(){this.Rs=!1,this.As=!1,this.Vs=100,this.ds=(function(){return ff()?8:py(Te())>0?6:4})()}initialize(e,t){this.fs=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,s,r){const i={result:null};return this.gs(e,t).next((o=>{i.result=o})).next((()=>{if(!i.result)return this.ps(e,t,r,s).next((o=>{i.result=o}))})).next((()=>{if(i.result)return;const o=new z_;return this.ys(e,t,o).next((c=>{if(i.result=c,this.As)return this.ws(e,t,o,c.size)}))})).next((()=>i.result))}ws(e,t,s,r){return s.documentReadCount<this.Vs?(tn()<=W.DEBUG&&N("QueryEngine","SDK will not create cache indexes for query:",nn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),k.resolve()):(tn()<=W.DEBUG&&N("QueryEngine","Query:",nn(t),"scans",s.documentReadCount,"local documents and returns",r,"documents as results."),s.documentReadCount>this.ds*r?(tn()<=W.DEBUG&&N("QueryEngine","The SDK decides to create cache indexes for query:",nn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,ze(t))):k.resolve())}gs(e,t){if(qc(t))return k.resolve(null);let s=ze(t);return this.indexManager.getIndexType(e,s).next((r=>r===0?null:(t.limit!==null&&r===1&&(t=Gi(t,null,"F"),s=ze(t)),this.indexManager.getDocumentsMatchingTarget(e,s).next((i=>{const o=J(...i);return this.fs.getDocuments(e,o).next((c=>this.indexManager.getMinOffset(e,s).next((u=>{const h=this.Ss(t,c);return this.bs(t,h,o,u.readTime)?this.gs(e,Gi(t,null,"F")):this.Ds(e,h,t,u)}))))})))))}ps(e,t,s,r){return qc(t)||r.isEqual(j.min())?k.resolve(null):this.fs.getDocuments(e,s).next((i=>{const o=this.Ss(t,i);return this.bs(t,o,s,r)?k.resolve(null):(tn()<=W.DEBUG&&N("QueryEngine","Re-using previous result from %s to execute query: %s",r.toString(),nn(t)),this.Ds(e,o,t,ly(r,as)).next((c=>c)))}))}Ss(e,t){let s=new he(Zu(e));return t.forEach(((r,i)=>{Lr(e,i)&&(s=s.add(i))})),s}bs(e,t,s,r){if(e.limit===null)return!1;if(s.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(r)>0)}ys(e,t,s){return tn()<=W.DEBUG&&N("QueryEngine","Using full collection scan to execute query:",nn(t)),this.fs.getDocumentsMatchingQuery(e,t,Tt.min(),s)}Ds(e,t,s,r){return this.fs.getDocumentsMatchingQuery(e,s,r).next((i=>(t.forEach((o=>{i=i.insert(o.key,o)})),i)))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xa="LocalStore",K_=3e8;class H_{constructor(e,t,s,r){this.persistence=e,this.Cs=t,this.serializer=r,this.vs=new re(Q),this.Fs=new Jt((i=>Ia(i)),wa),this.Ms=new Map,this.xs=e.getRemoteDocumentCache(),this.li=e.getTargetCache(),this.Pi=e.getBundleCache(),this.Os(s)}Os(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new V_(this.xs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.xs.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(t=>e.collect(t,this.vs)))}}function G_(n,e,t,s){return new H_(n,e,t,s)}async function Td(n,e){const t=z(n);return await t.persistence.runTransaction("Handle user change","readonly",(s=>{let r;return t.mutationQueue.getAllMutationBatches(s).next((i=>(r=i,t.Os(e),t.mutationQueue.getAllMutationBatches(s)))).next((i=>{const o=[],c=[];let u=J();for(const h of r){o.push(h.batchId);for(const f of h.mutations)u=u.add(f.key)}for(const h of i){c.push(h.batchId);for(const f of h.mutations)u=u.add(f.key)}return t.localDocuments.getDocuments(s,u).next((h=>({Ns:h,removedBatchIds:o,addedBatchIds:c})))}))}))}function W_(n,e){const t=z(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",(s=>{const r=e.batch.keys(),i=t.xs.newChangeBuffer({trackRemovals:!0});return(function(c,u,h,f){const m=h.batch,E=m.keys();let S=k.resolve();return E.forEach((P=>{S=S.next((()=>f.getEntry(u,P))).next((D=>{const C=h.docVersions.get(P);X(C!==null,48541),D.version.compareTo(C)<0&&(m.applyToRemoteDocument(D,h),D.isValidDocument()&&(D.setReadTime(h.commitVersion),f.addEntry(D)))}))})),S.next((()=>c.mutationQueue.removeMutationBatch(u,m)))})(t,s,e,i).next((()=>i.apply(s))).next((()=>t.mutationQueue.performConsistencyCheck(s))).next((()=>t.documentOverlayCache.removeOverlaysForBatchId(s,r,e.batch.batchId))).next((()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(s,(function(c){let u=J();for(let h=0;h<c.mutationResults.length;++h)c.mutationResults[h].transformResults.length>0&&(u=u.add(c.batch.mutations[h].key));return u})(e)))).next((()=>t.localDocuments.getDocuments(s,r)))}))}function Ad(n){const e=z(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(t=>e.li.getLastRemoteSnapshotVersion(t)))}function Q_(n,e){const t=z(n),s=e.snapshotVersion;let r=t.vs;return t.persistence.runTransaction("Apply remote event","readwrite-primary",(i=>{const o=t.xs.newChangeBuffer({trackRemovals:!0});r=t.vs;const c=[];e.targetChanges.forEach(((f,m)=>{const E=r.get(m);if(!E)return;c.push(t.li.removeMatchingKeys(i,f.removedDocuments,m).next((()=>t.li.addMatchingKeys(i,f.addedDocuments,m))));let S=E.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(m)!==null?S=S.withResumeToken(_e.EMPTY_BYTE_STRING,j.min()).withLastLimboFreeSnapshotVersion(j.min()):f.resumeToken.approximateByteSize()>0&&(S=S.withResumeToken(f.resumeToken,s)),r=r.insert(m,S),(function(D,C,B){return D.resumeToken.approximateByteSize()===0||C.snapshotVersion.toMicroseconds()-D.snapshotVersion.toMicroseconds()>=K_?!0:B.addedDocuments.size+B.modifiedDocuments.size+B.removedDocuments.size>0})(E,S,f)&&c.push(t.li.updateTargetData(i,S))}));let u=tt(),h=J();if(e.documentUpdates.forEach((f=>{e.resolvedLimboDocuments.has(f)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(i,f))})),c.push(J_(i,o,e.documentUpdates).next((f=>{u=f.Bs,h=f.Ls}))),!s.isEqual(j.min())){const f=t.li.getLastRemoteSnapshotVersion(i).next((m=>t.li.setTargetsMetadata(i,i.currentSequenceNumber,s)));c.push(f)}return k.waitFor(c).next((()=>o.apply(i))).next((()=>t.localDocuments.getLocalViewOfDocuments(i,u,h))).next((()=>u))})).then((i=>(t.vs=r,i)))}function J_(n,e,t){let s=J(),r=J();return t.forEach((i=>s=s.add(i))),e.getEntries(n,s).next((i=>{let o=tt();return t.forEach(((c,u)=>{const h=i.get(c);u.isFoundDocument()!==h.isFoundDocument()&&(r=r.add(c)),u.isNoDocument()&&u.version.isEqual(j.min())?(e.removeEntry(c,u.readTime),o=o.insert(c,u)):!h.isValidDocument()||u.version.compareTo(h.version)>0||u.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(u),o=o.insert(c,u)):N(xa,"Ignoring outdated watch update for ",c,". Current version:",h.version," Watch version:",u.version)})),{Bs:o,Ls:r}}))}function Y_(n,e){const t=z(n);return t.persistence.runTransaction("Get next mutation batch","readonly",(s=>(e===void 0&&(e=va),t.mutationQueue.getNextMutationBatchAfterBatchId(s,e))))}function X_(n,e){const t=z(n);return t.persistence.runTransaction("Allocate target","readwrite",(s=>{let r;return t.li.getTargetData(s,e).next((i=>i?(r=i,k.resolve(r)):t.li.allocateTargetId(s).next((o=>(r=new gt(e,o,"TargetPurposeListen",s.currentSequenceNumber),t.li.addTargetData(s,r).next((()=>r)))))))})).then((s=>{const r=t.vs.get(s.targetId);return(r===null||s.snapshotVersion.compareTo(r.snapshotVersion)>0)&&(t.vs=t.vs.insert(s.targetId,s),t.Fs.set(e,s.targetId)),s}))}async function Xi(n,e,t){const s=z(n),r=s.vs.get(e),i=t?"readwrite":"readwrite-primary";try{t||await s.persistence.runTransaction("Release target",i,(o=>s.persistence.referenceDelegate.removeTarget(o,r)))}catch(o){if(!Sn(o))throw o;N(xa,`Failed to update sequence numbers for target ${e}: ${o}`)}s.vs=s.vs.remove(e),s.Fs.delete(r.target)}function sl(n,e,t){const s=z(n);let r=j.min(),i=J();return s.persistence.runTransaction("Execute query","readwrite",(o=>(function(u,h,f){const m=z(u),E=m.Fs.get(f);return E!==void 0?k.resolve(m.vs.get(E)):m.li.getTargetData(h,f)})(s,o,ze(e)).next((c=>{if(c)return r=c.lastLimboFreeSnapshotVersion,s.li.getMatchingKeysForTargetId(o,c.targetId).next((u=>{i=u}))})).next((()=>s.Cs.getDocumentsMatchingQuery(o,e,t?r:j.min(),t?i:J()))).next((c=>(Z_(s,By(e),c),{documents:c,ks:i})))))}function Z_(n,e,t){let s=n.Ms.get(e)||j.min();t.forEach(((r,i)=>{i.readTime.compareTo(s)>0&&(s=i.readTime)})),n.Ms.set(e,s)}class rl{constructor(){this.activeTargetIds=qy()}Qs(e){this.activeTargetIds=this.activeTargetIds.add(e)}Gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class ev{constructor(){this.vo=new rl,this.Fo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,s){}addLocalQueryTarget(e,t=!0){return t&&this.vo.Qs(e),this.Fo[e]||"not-current"}updateQueryState(e,t,s){this.Fo[e]=t}removeLocalQueryTarget(e){this.vo.Gs(e)}isLocalQueryTarget(e){return this.vo.activeTargetIds.has(e)}clearQueryState(e){delete this.Fo[e]}getAllActiveQueryTargets(){return this.vo.activeTargetIds}isActiveQueryTarget(e){return this.vo.activeTargetIds.has(e)}start(){return this.vo=new rl,Promise.resolve()}handleUserChange(e,t,s){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tv{Mo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const il="ConnectivityMonitor";class al{constructor(){this.xo=()=>this.Oo(),this.No=()=>this.Bo(),this.Lo=[],this.ko()}Mo(e){this.Lo.push(e)}shutdown(){window.removeEventListener("online",this.xo),window.removeEventListener("offline",this.No)}ko(){window.addEventListener("online",this.xo),window.addEventListener("offline",this.No)}Oo(){N(il,"Network connectivity changed: AVAILABLE");for(const e of this.Lo)e(0)}Bo(){N(il,"Network connectivity changed: UNAVAILABLE");for(const e of this.Lo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Gs=null;function Zi(){return Gs===null?Gs=(function(){return 268435456+Math.round(2147483648*Math.random())})():Gs++,"0x"+Gs.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ai="RestConnection",nv={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class sv{get qo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",s=encodeURIComponent(this.databaseId.projectId),r=encodeURIComponent(this.databaseId.database);this.Ko=t+"://"+e.host,this.Uo=`projects/${s}/databases/${r}`,this.$o=this.databaseId.database===pr?`project_id=${s}`:`project_id=${s}&database_id=${r}`}Wo(e,t,s,r,i){const o=Zi(),c=this.Qo(e,t.toUriEncodedString());N(Ai,`Sending RPC '${e}' ${o}:`,c,s);const u={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.$o};this.Go(u,r,i);const{host:h}=new URL(c),f=ys(h);return this.zo(e,c,u,s,f).then((m=>(N(Ai,`Received RPC '${e}' ${o}: `,m),m)),(m=>{throw Gt(Ai,`RPC '${e}' ${o} failed with error: `,m,"url: ",c,"request:",s),m}))}jo(e,t,s,r,i,o){return this.Wo(e,t,s,r,i)}Go(e,t,s){e["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+Tn})(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach(((r,i)=>e[i]=r)),s&&s.headers.forEach(((r,i)=>e[i]=r))}Qo(e,t){const s=nv[e];let r=`${this.Ko}/v1/${t}:${s}`;return this.databaseInfo.apiKey&&(r=`${r}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),r}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rv{constructor(e){this.Jo=e.Jo,this.Ho=e.Ho}Zo(e){this.Xo=e}Yo(e){this.e_=e}t_(e){this.n_=e}onMessage(e){this.r_=e}close(){this.Ho()}send(e){this.Jo(e)}i_(){this.Xo()}s_(){this.e_()}o_(e){this.n_(e)}__(e){this.r_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ee="WebChannelConnection",Kn=(n,e,t)=>{n.listen(e,(s=>{try{t(s)}catch(r){setTimeout((()=>{throw r}),0)}}))};class un extends sv{constructor(e){super(e),this.a_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static u_(){if(!un.c_){const e=xu();Kn(e,Cu.STAT_EVENT,(t=>{t.stat===$i.PROXY?N(Ee,"STAT_EVENT: detected buffering proxy"):t.stat===$i.NOPROXY&&N(Ee,"STAT_EVENT: detected no buffering proxy")})),un.c_=!0}}zo(e,t,s,r,i){const o=Zi();return new Promise(((c,u)=>{const h=new Ru;h.setWithCredentials(!0),h.listenOnce(Pu.COMPLETE,(()=>{try{switch(h.getLastErrorCode()){case Xs.NO_ERROR:const m=h.getResponseJson();N(Ee,`XHR for RPC '${e}' ${o} received:`,JSON.stringify(m)),c(m);break;case Xs.TIMEOUT:N(Ee,`RPC '${e}' ${o} timed out`),u(new L(R.DEADLINE_EXCEEDED,"Request time out"));break;case Xs.HTTP_ERROR:const E=h.getStatus();if(N(Ee,`RPC '${e}' ${o} failed with status:`,E,"response text:",h.getResponseText()),E>0){let S=h.getResponseJson();Array.isArray(S)&&(S=S[0]);const P=S==null?void 0:S.error;if(P&&P.status&&P.message){const D=(function(B){const $=B.toLowerCase().replace(/_/g,"-");return Object.values(R).indexOf($)>=0?$:R.UNKNOWN})(P.status);u(new L(D,P.message))}else u(new L(R.UNKNOWN,"Server responded with status "+h.getStatus()))}else u(new L(R.UNAVAILABLE,"Connection failed."));break;default:U(9055,{l_:e,streamId:o,h_:h.getLastErrorCode(),P_:h.getLastError()})}}finally{N(Ee,`RPC '${e}' ${o} completed.`)}}));const f=JSON.stringify(r);N(Ee,`RPC '${e}' ${o} sending request:`,r),h.send(t,"POST",f,s,15)}))}T_(e,t,s){const r=Zi(),i=[this.Ko,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=this.createWebChannelTransport(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},u=this.longPollingOptions.timeoutSeconds;u!==void 0&&(c.longPollingTimeout=Math.round(1e3*u)),this.useFetchStreams&&(c.useFetchStreams=!0),this.Go(c.initMessageHeaders,t,s),c.encodeInitMessageHeaders=!0;const h=i.join("");N(Ee,`Creating RPC '${e}' stream ${r}: ${h}`,c);const f=o.createWebChannel(h,c);this.E_(f);let m=!1,E=!1;const S=new rv({Jo:P=>{E?N(Ee,`Not sending because RPC '${e}' stream ${r} is closed:`,P):(m||(N(Ee,`Opening RPC '${e}' stream ${r} transport.`),f.open(),m=!0),N(Ee,`RPC '${e}' stream ${r} sending:`,P),f.send(P))},Ho:()=>f.close()});return Kn(f,Qn.EventType.OPEN,(()=>{E||(N(Ee,`RPC '${e}' stream ${r} transport opened.`),S.i_())})),Kn(f,Qn.EventType.CLOSE,(()=>{E||(E=!0,N(Ee,`RPC '${e}' stream ${r} transport closed`),S.o_(),this.I_(f))})),Kn(f,Qn.EventType.ERROR,(P=>{E||(E=!0,Gt(Ee,`RPC '${e}' stream ${r} transport errored. Name:`,P.name,"Message:",P.message),S.o_(new L(R.UNAVAILABLE,"The operation could not be completed")))})),Kn(f,Qn.EventType.MESSAGE,(P=>{var D;if(!E){const C=P.data[0];X(!!C,16349);const B=C,$=(B==null?void 0:B.error)||((D=B[0])==null?void 0:D.error);if($){N(Ee,`RPC '${e}' stream ${r} received error:`,$);const H=$.status;let q=(function(v){const g=oe[v];if(g!==void 0)return dd(g)})(H),G=$.message;H==="NOT_FOUND"&&G.includes("database")&&G.includes("does not exist")&&G.includes(this.databaseId.database)&&Gt(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),q===void 0&&(q=R.INTERNAL,G="Unknown error status: "+H+" with message "+$.message),E=!0,S.o_(new L(q,G)),f.close()}else N(Ee,`RPC '${e}' stream ${r} received:`,C),S.__(C)}})),un.u_(),setTimeout((()=>{S.s_()}),0),S}terminate(){this.a_.forEach((e=>e.close())),this.a_=[]}E_(e){this.a_.push(e)}I_(e){this.a_=this.a_.filter((t=>t===e))}Go(e,t,s){super.Go(e,t,s),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return Du()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function iv(n){return new un(n)}function Si(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fr(n){return new l_(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */un.c_=!1;class Sd{constructor(e,t,s=1e3,r=1.5,i=6e4){this.Ci=e,this.timerId=t,this.R_=s,this.A_=r,this.V_=i,this.d_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.d_=0}g_(){this.d_=this.V_}p_(e){this.cancel();const t=Math.floor(this.d_+this.y_()),s=Math.max(0,Date.now()-this.f_),r=Math.max(0,t-s);r>0&&N("ExponentialBackoff",`Backing off for ${r} ms (base delay: ${this.d_} ms, delay with jitter: ${t} ms, last attempt: ${s} ms ago)`),this.m_=this.Ci.enqueueAfterDelay(this.timerId,r,(()=>(this.f_=Date.now(),e()))),this.d_*=this.A_,this.d_<this.R_&&(this.d_=this.R_),this.d_>this.V_&&(this.d_=this.V_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.d_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ol="PersistentStream";class kd{constructor(e,t,s,r,i,o,c,u){this.Ci=e,this.S_=s,this.b_=r,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=c,this.listener=u,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new Sd(e,t)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Ci.enqueueAfterDelay(this.S_,6e4,(()=>this.k_())))}q_(e){this.K_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}K_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.K_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():t&&t.code===R.RESOURCE_EXHAUSTED?(et(t.toString()),et("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===R.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.W_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.t_(t)}W_(){}auth(){this.state=1;const e=this.Q_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([s,r])=>{this.D_===t&&this.G_(s,r)}),(s=>{e((()=>{const r=new L(R.UNKNOWN,"Fetching auth token failed: "+s.message);return this.z_(r)}))}))}G_(e,t){const s=this.Q_(this.D_);this.stream=this.j_(e,t),this.stream.Zo((()=>{s((()=>this.listener.Zo()))})),this.stream.Yo((()=>{s((()=>(this.state=2,this.v_=this.Ci.enqueueAfterDelay(this.b_,1e4,(()=>(this.O_()&&(this.state=3),Promise.resolve()))),this.listener.Yo())))})),this.stream.t_((r=>{s((()=>this.z_(r)))})),this.stream.onMessage((r=>{s((()=>++this.F_==1?this.J_(r):this.onNext(r)))}))}N_(){this.state=5,this.M_.p_((async()=>{this.state=0,this.start()}))}z_(e){return N(ol,`close with error: ${e}`),this.stream=null,this.close(4,e)}Q_(e){return t=>{this.Ci.enqueueAndForget((()=>this.D_===e?t():(N(ol,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class av extends kd{constructor(e,t,s,r,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,s,r,o),this.serializer=i}j_(e,t){return this.connection.T_("Listen",e,t)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=h_(this.serializer,e),s=(function(i){if(!("targetChange"in i))return j.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?j.min():o.readTime?Ke(o.readTime):j.min()})(e);return this.listener.H_(t,s)}Z_(e){const t={};t.database=Yi(this.serializer),t.addTarget=(function(i,o){let c;const u=o.target;if(c=Hi(u)?{documents:m_(i,u)}:{query:g_(i,u).ft},c.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){c.resumeToken=pd(i,o.resumeToken);const h=Wi(i,o.expectedCount);h!==null&&(c.expectedCount=h)}else if(o.snapshotVersion.compareTo(j.min())>0){c.readTime=Er(i,o.snapshotVersion.toTimestamp());const h=Wi(i,o.expectedCount);h!==null&&(c.expectedCount=h)}return c})(this.serializer,e);const s=__(this.serializer,e);s&&(t.labels=s),this.q_(t)}X_(e){const t={};t.database=Yi(this.serializer),t.removeTarget=e,this.q_(t)}}class ov extends kd{constructor(e,t,s,r,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,s,r,o),this.serializer=i}get Y_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}W_(){this.Y_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}J_(e){return X(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,X(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){X(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const t=p_(e.writeResults,e.commitTime),s=Ke(e.commitTime);return this.listener.na(s,t)}ra(){const e={};e.database=Yi(this.serializer),this.q_(e)}ea(e){const t={streamToken:this.lastStreamToken,writes:e.map((s=>f_(this.serializer,s)))};this.q_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cv{}class lv extends cv{constructor(e,t,s,r){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=s,this.serializer=r,this.ia=!1}sa(){if(this.ia)throw new L(R.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,t,s,r){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([i,o])=>this.connection.Wo(e,Qi(t,s),r,i,o))).catch((i=>{throw i.name==="FirebaseError"?(i.code===R.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new L(R.UNKNOWN,i.toString())}))}jo(e,t,s,r,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([o,c])=>this.connection.jo(e,Qi(t,s),r,o,c,i))).catch((o=>{throw o.name==="FirebaseError"?(o.code===R.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new L(R.UNKNOWN,o.toString())}))}terminate(){this.ia=!0,this.connection.terminate()}}function uv(n,e,t,s){return new lv(n,e,t,s)}class dv{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve()))))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(et(t),this.aa=!1):N("OnlineStateTracker",t)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wt="RemoteStore";class hv{constructor(e,t,s,r,i){this.localStore=e,this.datastore=t,this.asyncQueue=s,this.remoteSyncer={},this.Ta=[],this.Ea=new Map,this.Ia=new Set,this.Ra=[],this.Aa=i,this.Aa.Mo((o=>{s.enqueueAndForget((async()=>{Yt(this)&&(N(Wt,"Restarting streams for network reachability change."),await(async function(u){const h=z(u);h.Ia.add(4),await As(h),h.Va.set("Unknown"),h.Ia.delete(4),await Ur(h)})(this))}))})),this.Va=new dv(s,r)}}async function Ur(n){if(Yt(n))for(const e of n.Ra)await e(!0)}async function As(n){for(const e of n.Ra)await e(!1)}function Rd(n,e){const t=z(n);t.Ea.has(e.targetId)||(t.Ea.set(e.targetId,e),La(t)?Va(t):kn(t).O_()&&Na(t,e))}function Da(n,e){const t=z(n),s=kn(t);t.Ea.delete(e),s.O_()&&Pd(t,e),t.Ea.size===0&&(s.O_()?s.L_():Yt(t)&&t.Va.set("Unknown"))}function Na(n,e){if(n.da.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(j.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}kn(n).Z_(e)}function Pd(n,e){n.da.$e(e),kn(n).X_(e)}function Va(n){n.da=new i_({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),At:e=>n.Ea.get(e)||null,ht:()=>n.datastore.serializer.databaseId}),kn(n).start(),n.Va.ua()}function La(n){return Yt(n)&&!kn(n).x_()&&n.Ea.size>0}function Yt(n){return z(n).Ia.size===0}function Cd(n){n.da=void 0}async function fv(n){n.Va.set("Online")}async function pv(n){n.Ea.forEach(((e,t)=>{Na(n,e)}))}async function mv(n,e){Cd(n),La(n)?(n.Va.ha(e),Va(n)):n.Va.set("Unknown")}async function gv(n,e,t){if(n.Va.set("Online"),e instanceof fd&&e.state===2&&e.cause)try{await(async function(r,i){const o=i.cause;for(const c of i.targetIds)r.Ea.has(c)&&(await r.remoteSyncer.rejectListen(c,o),r.Ea.delete(c),r.da.removeTarget(c))})(n,e)}catch(s){N(Wt,"Failed to remove targets %s: %s ",e.targetIds.join(","),s),await Ir(n,s)}else if(e instanceof nr?n.da.Xe(e):e instanceof hd?n.da.st(e):n.da.tt(e),!t.isEqual(j.min()))try{const s=await Ad(n.localStore);t.compareTo(s)>=0&&await(function(i,o){const c=i.da.Tt(o);return c.targetChanges.forEach(((u,h)=>{if(u.resumeToken.approximateByteSize()>0){const f=i.Ea.get(h);f&&i.Ea.set(h,f.withResumeToken(u.resumeToken,o))}})),c.targetMismatches.forEach(((u,h)=>{const f=i.Ea.get(u);if(!f)return;i.Ea.set(u,f.withResumeToken(_e.EMPTY_BYTE_STRING,f.snapshotVersion)),Pd(i,u);const m=new gt(f.target,u,h,f.sequenceNumber);Na(i,m)})),i.remoteSyncer.applyRemoteEvent(c)})(n,t)}catch(s){N(Wt,"Failed to raise snapshot:",s),await Ir(n,s)}}async function Ir(n,e,t){if(!Sn(e))throw e;n.Ia.add(1),await As(n),n.Va.set("Offline"),t||(t=()=>Ad(n.localStore)),n.asyncQueue.enqueueRetryable((async()=>{N(Wt,"Retrying IndexedDB access"),await t(),n.Ia.delete(1),await Ur(n)}))}function xd(n,e){return e().catch((t=>Ir(n,t,e)))}async function $r(n){const e=z(n),t=Rt(e);let s=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:va;for(;yv(e);)try{const r=await Y_(e.localStore,s);if(r===null){e.Ta.length===0&&t.L_();break}s=r.batchId,_v(e,r)}catch(r){await Ir(e,r)}Dd(e)&&Nd(e)}function yv(n){return Yt(n)&&n.Ta.length<10}function _v(n,e){n.Ta.push(e);const t=Rt(n);t.O_()&&t.Y_&&t.ea(e.mutations)}function Dd(n){return Yt(n)&&!Rt(n).x_()&&n.Ta.length>0}function Nd(n){Rt(n).start()}async function vv(n){Rt(n).ra()}async function Ev(n){const e=Rt(n);for(const t of n.Ta)e.ea(t.mutations)}async function bv(n,e,t){const s=n.Ta.shift(),r=Aa.from(s,e,t);await xd(n,(()=>n.remoteSyncer.applySuccessfulWrite(r))),await $r(n)}async function Iv(n,e){e&&Rt(n).Y_&&await(async function(s,r){if((function(o){return n_(o)&&o!==R.ABORTED})(r.code)){const i=s.Ta.shift();Rt(s).B_(),await xd(s,(()=>s.remoteSyncer.rejectFailedWrite(i.batchId,r))),await $r(s)}})(n,e),Dd(n)&&Nd(n)}async function cl(n,e){const t=z(n);t.asyncQueue.verifyOperationInProgress(),N(Wt,"RemoteStore received new credentials");const s=Yt(t);t.Ia.add(3),await As(t),s&&t.Va.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ia.delete(3),await Ur(t)}async function wv(n,e){const t=z(n);e?(t.Ia.delete(2),await Ur(t)):e||(t.Ia.add(2),await As(t),t.Va.set("Unknown"))}function kn(n){return n.ma||(n.ma=(function(t,s,r){const i=z(t);return i.sa(),new av(s,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,r)})(n.datastore,n.asyncQueue,{Zo:fv.bind(null,n),Yo:pv.bind(null,n),t_:mv.bind(null,n),H_:gv.bind(null,n)}),n.Ra.push((async e=>{e?(n.ma.B_(),La(n)?Va(n):n.Va.set("Unknown")):(await n.ma.stop(),Cd(n))}))),n.ma}function Rt(n){return n.fa||(n.fa=(function(t,s,r){const i=z(t);return i.sa(),new ov(s,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,r)})(n.datastore,n.asyncQueue,{Zo:()=>Promise.resolve(),Yo:vv.bind(null,n),t_:Iv.bind(null,n),ta:Ev.bind(null,n),na:bv.bind(null,n)}),n.Ra.push((async e=>{e?(n.fa.B_(),await $r(n)):(await n.fa.stop(),n.Ta.length>0&&(N(Wt,`Stopping write stream with ${n.Ta.length} pending writes`),n.Ta=[]))}))),n.fa}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ma{constructor(e,t,s,r,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=s,this.op=r,this.removalCallback=i,this.deferred=new It,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((o=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,t,s,r,i){const o=Date.now()+s,c=new Ma(e,t,o,r,i);return c.start(s),c}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new L(R.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Oa(n,e){if(et("AsyncQueue",`${e}: ${n}`),Sn(n))return new L(R.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dn{static emptySet(e){return new dn(e.comparator)}constructor(e){this.comparator=e?(t,s)=>e(t,s)||O.comparator(t.key,s.key):(t,s)=>O.comparator(t.key,s.key),this.keyedMap=Jn(),this.sortedSet=new re(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal(((t,s)=>(e(t),!1)))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof dn)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),s=e.sortedSet.getIterator();for(;t.hasNext();){const r=t.getNext().key,i=s.getNext().key;if(!r.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach((t=>{e.push(t.toString())})),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const s=new dn;return s.comparator=this.comparator,s.keyedMap=e,s.sortedSet=t,s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ll{constructor(){this.ga=new re(O.comparator)}track(e){const t=e.doc.key,s=this.ga.get(t);s?e.type!==0&&s.type===3?this.ga=this.ga.insert(t,e):e.type===3&&s.type!==1?this.ga=this.ga.insert(t,{type:s.type,doc:e.doc}):e.type===2&&s.type===2?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):e.type===2&&s.type===0?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):e.type===1&&s.type===0?this.ga=this.ga.remove(t):e.type===1&&s.type===2?this.ga=this.ga.insert(t,{type:1,doc:s.doc}):e.type===0&&s.type===1?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):U(63341,{Vt:e,pa:s}):this.ga=this.ga.insert(t,e)}ya(){const e=[];return this.ga.inorderTraversal(((t,s)=>{e.push(s)})),e}}class En{constructor(e,t,s,r,i,o,c,u,h){this.query=e,this.docs=t,this.oldDocs=s,this.docChanges=r,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=c,this.excludesMetadataChanges=u,this.hasCachedResults=h}static fromInitialDocuments(e,t,s,r,i){const o=[];return t.forEach((c=>{o.push({type:0,doc:c})})),new En(e,t,dn.emptySet(t),o,s,r,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Vr(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,s=e.docChanges;if(t.length!==s.length)return!1;for(let r=0;r<t.length;r++)if(t[r].type!==s[r].type||!t[r].doc.isEqual(s[r].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tv{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some((e=>e.Da()))}}class Av{constructor(){this.queries=ul(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(t,s){const r=z(t),i=r.queries;r.queries=ul(),i.forEach(((o,c)=>{for(const u of c.Sa)u.onError(s)}))})(this,new L(R.ABORTED,"Firestore shutting down"))}}function ul(){return new Jt((n=>Xu(n)),Vr)}async function Vd(n,e){const t=z(n);let s=3;const r=e.query;let i=t.queries.get(r);i?!i.ba()&&e.Da()&&(s=2):(i=new Tv,s=e.Da()?0:1);try{switch(s){case 0:i.wa=await t.onListen(r,!0);break;case 1:i.wa=await t.onListen(r,!1);break;case 2:await t.onFirstRemoteStoreListen(r)}}catch(o){const c=Oa(o,`Initialization of query '${nn(e.query)}' failed`);return void e.onError(c)}t.queries.set(r,i),i.Sa.push(e),e.va(t.onlineState),i.wa&&e.Fa(i.wa)&&Ba(t)}async function Ld(n,e){const t=z(n),s=e.query;let r=3;const i=t.queries.get(s);if(i){const o=i.Sa.indexOf(e);o>=0&&(i.Sa.splice(o,1),i.Sa.length===0?r=e.Da()?0:1:!i.ba()&&e.Da()&&(r=2))}switch(r){case 0:return t.queries.delete(s),t.onUnlisten(s,!0);case 1:return t.queries.delete(s),t.onUnlisten(s,!1);case 2:return t.onLastRemoteStoreUnlisten(s);default:return}}function Sv(n,e){const t=z(n);let s=!1;for(const r of e){const i=r.query,o=t.queries.get(i);if(o){for(const c of o.Sa)c.Fa(r)&&(s=!0);o.wa=r}}s&&Ba(t)}function kv(n,e,t){const s=z(n),r=s.queries.get(e);if(r)for(const i of r.Sa)i.onError(t);s.queries.delete(e)}function Ba(n){n.Ca.forEach((e=>{e.next()}))}var ea,dl;(dl=ea||(ea={})).Ma="default",dl.Cache="cache";class Md{constructor(e,t,s){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=s||{}}Fa(e){if(!this.options.includeMetadataChanges){const s=[];for(const r of e.docChanges)r.type!==3&&s.push(r);e=new En(e.query,e.docs,e.oldDocs,s,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache||!this.Da())return!0;const s=t!=="Offline";return(!this.options.qa||!s)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}ka(e){e=En.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==ea.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Od{constructor(e){this.key=e}}class Bd{constructor(e){this.key=e}}class Rv{constructor(e,t){this.query=e,this.Za=t,this.Xa=null,this.hasCachedResults=!1,this.current=!1,this.Ya=J(),this.mutatedKeys=J(),this.eu=Zu(e),this.tu=new dn(this.eu)}get nu(){return this.Za}ru(e,t){const s=t?t.iu:new ll,r=t?t.tu:this.tu;let i=t?t.mutatedKeys:this.mutatedKeys,o=r,c=!1;const u=this.query.limitType==="F"&&r.size===this.query.limit?r.last():null,h=this.query.limitType==="L"&&r.size===this.query.limit?r.first():null;if(e.inorderTraversal(((f,m)=>{const E=r.get(f),S=Lr(this.query,m)?m:null,P=!!E&&this.mutatedKeys.has(E.key),D=!!S&&(S.hasLocalMutations||this.mutatedKeys.has(S.key)&&S.hasCommittedMutations);let C=!1;E&&S?E.data.isEqual(S.data)?P!==D&&(s.track({type:3,doc:S}),C=!0):this.su(E,S)||(s.track({type:2,doc:S}),C=!0,(u&&this.eu(S,u)>0||h&&this.eu(S,h)<0)&&(c=!0)):!E&&S?(s.track({type:0,doc:S}),C=!0):E&&!S&&(s.track({type:1,doc:E}),C=!0,(u||h)&&(c=!0)),C&&(S?(o=o.add(S),i=D?i.add(f):i.delete(f)):(o=o.delete(f),i=i.delete(f)))})),this.query.limit!==null)for(;o.size>this.query.limit;){const f=this.query.limitType==="F"?o.last():o.first();o=o.delete(f.key),i=i.delete(f.key),s.track({type:1,doc:f})}return{tu:o,iu:s,bs:c,mutatedKeys:i}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,s,r){const i=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const o=e.iu.ya();o.sort(((f,m)=>(function(S,P){const D=C=>{switch(C){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return U(20277,{Vt:C})}};return D(S)-D(P)})(f.type,m.type)||this.eu(f.doc,m.doc))),this.ou(s),r=r??!1;const c=t&&!r?this._u():[],u=this.Ya.size===0&&this.current&&!r?1:0,h=u!==this.Xa;return this.Xa=u,o.length!==0||h?{snapshot:new En(this.query,e.tu,i,o,e.mutatedKeys,u===0,h,!1,!!s&&s.resumeToken.approximateByteSize()>0),au:c}:{au:c}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new ll,mutatedKeys:this.mutatedKeys,bs:!1},!1)):{au:[]}}uu(e){return!this.Za.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach((t=>this.Za=this.Za.add(t))),e.modifiedDocuments.forEach((t=>{})),e.removedDocuments.forEach((t=>this.Za=this.Za.delete(t))),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Ya;this.Ya=J(),this.tu.forEach((s=>{this.uu(s.key)&&(this.Ya=this.Ya.add(s.key))}));const t=[];return e.forEach((s=>{this.Ya.has(s)||t.push(new Bd(s))})),this.Ya.forEach((s=>{e.has(s)||t.push(new Od(s))})),t}cu(e){this.Za=e.ks,this.Ya=J();const t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return En.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Xa===0,this.hasCachedResults)}}const Fa="SyncEngine";class Pv{constructor(e,t,s){this.query=e,this.targetId=t,this.view=s}}class Cv{constructor(e){this.key=e,this.hu=!1}}class xv{constructor(e,t,s,r,i,o){this.localStore=e,this.remoteStore=t,this.eventManager=s,this.sharedClientState=r,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.Pu={},this.Tu=new Jt((c=>Xu(c)),Vr),this.Eu=new Map,this.Iu=new Set,this.Ru=new re(O.comparator),this.Au=new Map,this.Vu=new Ra,this.du={},this.mu=new Map,this.fu=vn.ar(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function Dv(n,e,t=!0){const s=qd(n);let r;const i=s.Tu.get(e);return i?(s.sharedClientState.addLocalQueryTarget(i.targetId),r=i.view.lu()):r=await Fd(s,e,t,!0),r}async function Nv(n,e){const t=qd(n);await Fd(t,e,!0,!1)}async function Fd(n,e,t,s){const r=await X_(n.localStore,ze(e)),i=r.targetId,o=n.sharedClientState.addLocalQueryTarget(i,t);let c;return s&&(c=await Vv(n,e,i,o==="current",r.resumeToken)),n.isPrimaryClient&&t&&Rd(n.remoteStore,r),c}async function Vv(n,e,t,s,r){n.pu=(m,E,S)=>(async function(D,C,B,$){let H=C.view.ru(B);H.bs&&(H=await sl(D.localStore,C.query,!1).then((({documents:v})=>C.view.ru(v,H))));const q=$&&$.targetChanges.get(C.targetId),G=$&&$.targetMismatches.get(C.targetId)!=null,Z=C.view.applyChanges(H,D.isPrimaryClient,q,G);return fl(D,C.targetId,Z.au),Z.snapshot})(n,m,E,S);const i=await sl(n.localStore,e,!0),o=new Rv(e,i.ks),c=o.ru(i.documents),u=Ts.createSynthesizedTargetChangeForCurrentChange(t,s&&n.onlineState!=="Offline",r),h=o.applyChanges(c,n.isPrimaryClient,u);fl(n,t,h.au);const f=new Pv(e,t,o);return n.Tu.set(e,f),n.Eu.has(t)?n.Eu.get(t).push(e):n.Eu.set(t,[e]),h.snapshot}async function Lv(n,e,t){const s=z(n),r=s.Tu.get(e),i=s.Eu.get(r.targetId);if(i.length>1)return s.Eu.set(r.targetId,i.filter((o=>!Vr(o,e)))),void s.Tu.delete(e);s.isPrimaryClient?(s.sharedClientState.removeLocalQueryTarget(r.targetId),s.sharedClientState.isActiveQueryTarget(r.targetId)||await Xi(s.localStore,r.targetId,!1).then((()=>{s.sharedClientState.clearQueryState(r.targetId),t&&Da(s.remoteStore,r.targetId),ta(s,r.targetId)})).catch(An)):(ta(s,r.targetId),await Xi(s.localStore,r.targetId,!0))}async function Mv(n,e){const t=z(n),s=t.Tu.get(e),r=t.Eu.get(s.targetId);t.isPrimaryClient&&r.length===1&&(t.sharedClientState.removeLocalQueryTarget(s.targetId),Da(t.remoteStore,s.targetId))}async function Ov(n,e,t){const s=qv(n);try{const r=await(function(o,c){const u=z(o),h=ne.now(),f=c.reduce(((S,P)=>S.add(P.key)),J());let m,E;return u.persistence.runTransaction("Locally write mutations","readwrite",(S=>{let P=tt(),D=J();return u.xs.getEntries(S,f).next((C=>{P=C,P.forEach(((B,$)=>{$.isValidDocument()||(D=D.add(B))}))})).next((()=>u.localDocuments.getOverlayedDocuments(S,P))).next((C=>{m=C;const B=[];for(const $ of c){const H=Yy($,m.get($.key).overlayedDocument);H!=null&&B.push(new Dt($.key,H,Ku(H.value.mapValue),qe.exists(!0)))}return u.mutationQueue.addMutationBatch(S,h,B,c)})).next((C=>{E=C;const B=C.applyToLocalDocumentSet(m,D);return u.documentOverlayCache.saveOverlays(S,C.batchId,B)}))})).then((()=>({batchId:E.batchId,changes:td(m)})))})(s.localStore,e);s.sharedClientState.addPendingMutation(r.batchId),(function(o,c,u){let h=o.du[o.currentUser.toKey()];h||(h=new re(Q)),h=h.insert(c,u),o.du[o.currentUser.toKey()]=h})(s,r.batchId,t),await Ss(s,r.changes),await $r(s.remoteStore)}catch(r){const i=Oa(r,"Failed to persist write");t.reject(i)}}async function Ud(n,e){const t=z(n);try{const s=await Q_(t.localStore,e);e.targetChanges.forEach(((r,i)=>{const o=t.Au.get(i);o&&(X(r.addedDocuments.size+r.modifiedDocuments.size+r.removedDocuments.size<=1,22616),r.addedDocuments.size>0?o.hu=!0:r.modifiedDocuments.size>0?X(o.hu,14607):r.removedDocuments.size>0&&(X(o.hu,42227),o.hu=!1))})),await Ss(t,s,e)}catch(s){await An(s)}}function hl(n,e,t){const s=z(n);if(s.isPrimaryClient&&t===0||!s.isPrimaryClient&&t===1){const r=[];s.Tu.forEach(((i,o)=>{const c=o.view.va(e);c.snapshot&&r.push(c.snapshot)})),(function(o,c){const u=z(o);u.onlineState=c;let h=!1;u.queries.forEach(((f,m)=>{for(const E of m.Sa)E.va(c)&&(h=!0)})),h&&Ba(u)})(s.eventManager,e),r.length&&s.Pu.H_(r),s.onlineState=e,s.isPrimaryClient&&s.sharedClientState.setOnlineState(e)}}async function Bv(n,e,t){const s=z(n);s.sharedClientState.updateQueryState(e,"rejected",t);const r=s.Au.get(e),i=r&&r.key;if(i){let o=new re(O.comparator);o=o.insert(i,Ie.newNoDocument(i,j.min()));const c=J().add(i),u=new Br(j.min(),new Map,new re(Q),o,c);await Ud(s,u),s.Ru=s.Ru.remove(i),s.Au.delete(e),Ua(s)}else await Xi(s.localStore,e,!1).then((()=>ta(s,e,t))).catch(An)}async function Fv(n,e){const t=z(n),s=e.batch.batchId;try{const r=await W_(t.localStore,e);jd(t,s,null),$d(t,s),t.sharedClientState.updateMutationState(s,"acknowledged"),await Ss(t,r)}catch(r){await An(r)}}async function Uv(n,e,t){const s=z(n);try{const r=await(function(o,c){const u=z(o);return u.persistence.runTransaction("Reject batch","readwrite-primary",(h=>{let f;return u.mutationQueue.lookupMutationBatch(h,c).next((m=>(X(m!==null,37113),f=m.keys(),u.mutationQueue.removeMutationBatch(h,m)))).next((()=>u.mutationQueue.performConsistencyCheck(h))).next((()=>u.documentOverlayCache.removeOverlaysForBatchId(h,f,c))).next((()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,f))).next((()=>u.localDocuments.getDocuments(h,f)))}))})(s.localStore,e);jd(s,e,t),$d(s,e),s.sharedClientState.updateMutationState(e,"rejected",t),await Ss(s,r)}catch(r){await An(r)}}function $d(n,e){(n.mu.get(e)||[]).forEach((t=>{t.resolve()})),n.mu.delete(e)}function jd(n,e,t){const s=z(n);let r=s.du[s.currentUser.toKey()];if(r){const i=r.get(e);i&&(t?i.reject(t):i.resolve(),r=r.remove(e)),s.du[s.currentUser.toKey()]=r}}function ta(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const s of n.Eu.get(e))n.Tu.delete(s),t&&n.Pu.yu(s,t);n.Eu.delete(e),n.isPrimaryClient&&n.Vu.Gr(e).forEach((s=>{n.Vu.containsKey(s)||zd(n,s)}))}function zd(n,e){n.Iu.delete(e.path.canonicalString());const t=n.Ru.get(e);t!==null&&(Da(n.remoteStore,t),n.Ru=n.Ru.remove(e),n.Au.delete(t),Ua(n))}function fl(n,e,t){for(const s of t)s instanceof Od?(n.Vu.addReference(s.key,e),$v(n,s)):s instanceof Bd?(N(Fa,"Document no longer in limbo: "+s.key),n.Vu.removeReference(s.key,e),n.Vu.containsKey(s.key)||zd(n,s.key)):U(19791,{wu:s})}function $v(n,e){const t=e.key,s=t.path.canonicalString();n.Ru.get(t)||n.Iu.has(s)||(N(Fa,"New document in limbo: "+t),n.Iu.add(s),Ua(n))}function Ua(n){for(;n.Iu.size>0&&n.Ru.size<n.maxConcurrentLimboResolutions;){const e=n.Iu.values().next().value;n.Iu.delete(e);const t=new O(se.fromString(e)),s=n.fu.next();n.Au.set(s,new Cv(t)),n.Ru=n.Ru.insert(t,s),Rd(n.remoteStore,new gt(ze(Nr(t.path)),s,"TargetPurposeLimboResolution",Pr.ce))}}async function Ss(n,e,t){const s=z(n),r=[],i=[],o=[];s.Tu.isEmpty()||(s.Tu.forEach(((c,u)=>{o.push(s.pu(u,e,t).then((h=>{var f;if((h||t)&&s.isPrimaryClient){const m=h?!h.fromCache:(f=t==null?void 0:t.targetChanges.get(u.targetId))==null?void 0:f.current;s.sharedClientState.updateQueryState(u.targetId,m?"current":"not-current")}if(h){r.push(h);const m=Ca.Is(u.targetId,h);i.push(m)}})))})),await Promise.all(o),s.Pu.H_(r),await(async function(u,h){const f=z(u);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",(m=>k.forEach(h,(E=>k.forEach(E.Ts,(S=>f.persistence.referenceDelegate.addReference(m,E.targetId,S))).next((()=>k.forEach(E.Es,(S=>f.persistence.referenceDelegate.removeReference(m,E.targetId,S)))))))))}catch(m){if(!Sn(m))throw m;N(xa,"Failed to update sequence numbers: "+m)}for(const m of h){const E=m.targetId;if(!m.fromCache){const S=f.vs.get(E),P=S.snapshotVersion,D=S.withLastLimboFreeSnapshotVersion(P);f.vs=f.vs.insert(E,D)}}})(s.localStore,i))}async function jv(n,e){const t=z(n);if(!t.currentUser.isEqual(e)){N(Fa,"User change. New user:",e.toKey());const s=await Td(t.localStore,e);t.currentUser=e,(function(i,o){i.mu.forEach((c=>{c.forEach((u=>{u.reject(new L(R.CANCELLED,o))}))})),i.mu.clear()})(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,s.removedBatchIds,s.addedBatchIds),await Ss(t,s.Ns)}}function zv(n,e){const t=z(n),s=t.Au.get(e);if(s&&s.hu)return J().add(s.key);{let r=J();const i=t.Eu.get(e);if(!i)return r;for(const o of i){const c=t.Tu.get(o);r=r.unionWith(c.view.nu)}return r}}function qd(n){const e=z(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=Ud.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=zv.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=Bv.bind(null,e),e.Pu.H_=Sv.bind(null,e.eventManager),e.Pu.yu=kv.bind(null,e.eventManager),e}function qv(n){const e=z(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=Fv.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=Uv.bind(null,e),e}class wr{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Fr(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){return G_(this.persistence,new q_,e.initialUser,this.serializer)}Cu(e){return new wd(Pa.Vi,this.serializer)}Du(e){return new ev}async terminate(){var e,t;(e=this.gcScheduler)==null||e.stop(),(t=this.indexBackfillerScheduler)==null||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}wr.provider={build:()=>new wr};class Kv extends wr{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){X(this.persistence.referenceDelegate instanceof br,46915);const s=this.persistence.referenceDelegate.garbageCollector;return new P_(s,e.asyncQueue,t)}Cu(e){const t=this.cacheSizeBytes!==void 0?Re.withCacheSize(this.cacheSizeBytes):Re.DEFAULT;return new wd((s=>br.Vi(s,t)),this.serializer)}}class na{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=s=>hl(this.syncEngine,s,1),this.remoteStore.remoteSyncer.handleCredentialChange=jv.bind(null,this.syncEngine),await wv(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return(function(){return new Av})()}createDatastore(e){const t=Fr(e.databaseInfo.databaseId),s=iv(e.databaseInfo);return uv(e.authCredentials,e.appCheckCredentials,s,t)}createRemoteStore(e){return(function(s,r,i,o,c){return new hv(s,r,i,o,c)})(this.localStore,this.datastore,e.asyncQueue,(t=>hl(this.syncEngine,t,0)),(function(){return al.v()?new al:new tv})())}createSyncEngine(e,t){return(function(r,i,o,c,u,h,f){const m=new xv(r,i,o,c,u,h);return f&&(m.gu=!0),m})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await(async function(r){const i=z(r);N(Wt,"RemoteStore shutting down."),i.Ia.add(5),await As(i),i.Aa.shutdown(),i.Va.set("Unknown")})(this.remoteStore),(e=this.datastore)==null||e.terminate(),(t=this.eventManager)==null||t.terminate()}}na.provider={build:()=>new na};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kd{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):et("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout((()=>{this.muted||e(t)}),0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pt="FirestoreClient";class Hv{constructor(e,t,s,r,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=s,this._databaseInfo=r,this.user=be.UNAUTHENTICATED,this.clientId=ya.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(s,(async o=>{N(Pt,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o})),this.appCheckCredentials.start(s,(o=>(N(Pt,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new It;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const s=Oa(t,"Failed to shutdown persistence");e.reject(s)}})),e.promise}}async function ki(n,e){n.asyncQueue.verifyOperationInProgress(),N(Pt,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let s=t.initialUser;n.setCredentialChangeListener((async r=>{s.isEqual(r)||(await Td(e.localStore,r),s=r)})),e.persistence.setDatabaseDeletedListener((()=>n.terminate())),n._offlineComponents=e}async function pl(n,e){n.asyncQueue.verifyOperationInProgress();const t=await Gv(n);N(Pt,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener((s=>cl(e.remoteStore,s))),n.setAppCheckTokenChangeListener(((s,r)=>cl(e.remoteStore,r))),n._onlineComponents=e}async function Gv(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){N(Pt,"Using user provided OfflineComponentProvider");try{await ki(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!(function(r){return r.name==="FirebaseError"?r.code===R.FAILED_PRECONDITION||r.code===R.UNIMPLEMENTED:!(typeof DOMException<"u"&&r instanceof DOMException)||r.code===22||r.code===20||r.code===11})(t))throw t;Gt("Error using user provided cache. Falling back to memory cache: "+t),await ki(n,new wr)}}else N(Pt,"Using default OfflineComponentProvider"),await ki(n,new Kv(void 0));return n._offlineComponents}async function Hd(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(N(Pt,"Using user provided OnlineComponentProvider"),await pl(n,n._uninitializedComponentsProvider._online)):(N(Pt,"Using default OnlineComponentProvider"),await pl(n,new na))),n._onlineComponents}function Wv(n){return Hd(n).then((e=>e.syncEngine))}async function sa(n){const e=await Hd(n),t=e.eventManager;return t.onListen=Dv.bind(null,e.syncEngine),t.onUnlisten=Lv.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=Nv.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=Mv.bind(null,e.syncEngine),t}function Qv(n,e,t,s){const r=new Kd(s),i=new Md(e,r,t);return n.asyncQueue.enqueueAndForget((async()=>Vd(await sa(n),i))),()=>{r.Nu(),n.asyncQueue.enqueueAndForget((async()=>Ld(await sa(n),i)))}}function Jv(n,e,t={}){const s=new It;return n.asyncQueue.enqueueAndForget((async()=>(function(i,o,c,u,h){const f=new Kd({next:E=>{f.Nu(),o.enqueueAndForget((()=>Ld(i,m)));const S=E.docs.has(c);!S&&E.fromCache?h.reject(new L(R.UNAVAILABLE,"Failed to get document because the client is offline.")):S&&E.fromCache&&u&&u.source==="server"?h.reject(new L(R.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):h.resolve(E)},error:E=>h.reject(E)}),m=new Md(Nr(c.path),f,{includeMetadataChanges:!0,qa:!0});return Vd(i,m)})(await sa(n),n.asyncQueue,e,t,s))),s.promise}function Yv(n,e){const t=new It;return n.asyncQueue.enqueueAndForget((async()=>Ov(await Wv(n),e,t))),t.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gd(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xv="ComponentProvider",ml=new Map;function Zv(n,e,t,s,r){return new vy(n,e,t,r.host,r.ssl,r.experimentalForceLongPolling,r.experimentalAutoDetectLongPolling,Gd(r.experimentalLongPollingOptions),r.useFetchStreams,r.isUsingEmulator,s)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wd="firestore.googleapis.com",gl=!0;class yl{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new L(R.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Wd,this.ssl=gl}else this.host=e.host,this.ssl=e.ssl??gl;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=Id;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<k_)throw new L(R.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}cy("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Gd(e.experimentalLongPollingOptions??{}),(function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new L(R.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new L(R.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new L(R.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(s,r){return s.timeoutSeconds===r.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class $a{constructor(e,t,s,r){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=s,this._app=r,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new yl({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new L(R.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new L(R.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new yl(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=(function(s){if(!s)return new Yg;switch(s.type){case"firstParty":return new ty(s.sessionIndex||"0",s.iamToken||null,s.authTokenFactory||null);case"provider":return s.client;default:throw new L(R.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(t){const s=ml.get(t);s&&(N(Xv,"Removing Datastore"),ml.delete(t),s.terminate())})(this),Promise.resolve()}}function eE(n,e,t,s={}){var h;n=je(n,$a);const r=ys(e),i=n._getSettings(),o={...i,emulatorOptions:n._getEmulatorOptions()},c=`${e}:${t}`;r&&Ul(`https://${c}`),i.host!==Wd&&i.host!==c&&Gt("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const u={...i,host:c,ssl:r,emulatorOptions:s};if(!jt(u,o)&&(n._setSettings(u),s.mockUserToken)){let f,m;if(typeof s.mockUserToken=="string")f=s.mockUserToken,m=be.MOCK_USER;else{f=af(s.mockUserToken,(h=n._app)==null?void 0:h.options.projectId);const E=s.mockUserToken.sub||s.mockUserToken.user_id;if(!E)throw new L(R.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");m=new be(E)}n._authCredentials=new Xg(new Vu(f,m))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jr{constructor(e,t,s){this.converter=t,this._query=s,this.type="query",this.firestore=e}withConverter(e){return new jr(this.firestore,e,this._query)}}class le{constructor(e,t,s){this.converter=t,this._key=s,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new hs(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new le(this.firestore,e,this._key)}toJSON(){return{type:le._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,s){if(Is(t,le._jsonSchema))return new le(e,s||null,new O(se.fromString(t.referencePath)))}}le._jsonSchemaVersion="firestore/documentReference/1.0",le._jsonSchema={type:ce("string",le._jsonSchemaVersion),referencePath:ce("string")};class hs extends jr{constructor(e,t,s){super(e,t,Nr(s)),this._path=s,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new le(this.firestore,null,new O(e))}withConverter(e){return new hs(this.firestore,e,this._path)}}function Ri(n,e,...t){if(n=me(n),arguments.length===1&&(e=ya.newId()),oy("doc","path",e),n instanceof $a){const s=se.fromString(e,...t);return xc(s),new le(n,null,new O(s))}{if(!(n instanceof le||n instanceof hs))throw new L(R.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const s=n._path.child(se.fromString(e,...t));return xc(s),new le(n.firestore,n instanceof hs?n.converter:null,new O(s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _l="AsyncQueue";class vl{constructor(e=Promise.resolve()){this.Yu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new Sd(this,"async_queue_retry"),this._c=()=>{const s=Si();s&&N(_l,"Visibility state changed to "+s.visibilityState),this.M_.w_()},this.ac=e;const t=Si();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=Si();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise((()=>{}));const t=new It;return this.cc((()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.Yu.push(e),this.lc())))}async lc(){if(this.Yu.length!==0){try{await this.Yu[0](),this.Yu.shift(),this.M_.reset()}catch(e){if(!Sn(e))throw e;N(_l,"Operation failed with retryable error: "+e)}this.Yu.length>0&&this.M_.p_((()=>this.lc()))}}cc(e){const t=this.ac.then((()=>(this.rc=!0,e().catch((s=>{throw this.nc=s,this.rc=!1,et("INTERNAL UNHANDLED ERROR: ",El(s)),s})).then((s=>(this.rc=!1,s))))));return this.ac=t,t}enqueueAfterDelay(e,t,s){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const r=Ma.createAndSchedule(this,e,t,s,(i=>this.hc(i)));return this.tc.push(r),r}uc(){this.nc&&U(47125,{Pc:El(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ec(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ic(e){return this.Tc().then((()=>{this.tc.sort(((t,s)=>t.targetTimeMs-s.targetTimeMs));for(const t of this.tc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Tc()}))}Rc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function El(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}class bn extends $a{constructor(e,t,s,r){super(e,t,s,r),this.type="firestore",this._queue=new vl,this._persistenceKey=(r==null?void 0:r.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new vl(e),this._firestoreClient=void 0,await e}}}function tE(n,e){const t=typeof n=="object"?n:ql(),s=typeof n=="string"?n:pr,r=oa(t,"firestore").getImmediate({identifier:s});if(!r._initialized){const i=sf("firestore");i&&eE(r,...i)}return r}function ja(n){if(n._terminated)throw new L(R.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||nE(n),n._firestoreClient}function nE(n){var s,r,i,o;const e=n._freezeSettings(),t=Zv(n._databaseId,((s=n._app)==null?void 0:s.options.appId)||"",n._persistenceKey,(r=n._app)==null?void 0:r.options.apiKey,e);n._componentsProvider||(i=e.localCache)!=null&&i._offlineComponentProvider&&((o=e.localCache)!=null&&o._onlineComponentProvider)&&(n._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),n._firestoreClient=new Hv(n._authCredentials,n._appCheckCredentials,n._queue,t,n._componentsProvider&&(function(u){const h=u==null?void 0:u._online.build();return{_offline:u==null?void 0:u._offline.build(h),_online:h}})(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ne{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Ne(_e.fromBase64String(e))}catch(t){throw new L(R.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Ne(_e.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Ne._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(Is(e,Ne._jsonSchema))return Ne.fromBase64String(e.bytes)}}Ne._jsonSchemaVersion="firestore/bytes/1.0",Ne._jsonSchema={type:ce("string",Ne._jsonSchemaVersion),bytes:ce("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class za{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new L(R.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ye(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qa{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class He{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new L(R.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new L(R.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return Q(this._lat,e._lat)||Q(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:He._jsonSchemaVersion}}static fromJSON(e){if(Is(e,He._jsonSchema))return new He(e.latitude,e.longitude)}}He._jsonSchemaVersion="firestore/geoPoint/1.0",He._jsonSchema={type:ce("string",He._jsonSchemaVersion),latitude:ce("number"),longitude:ce("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Le{constructor(e){this._values=(e||[]).map((t=>t))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(s,r){if(s.length!==r.length)return!1;for(let i=0;i<s.length;++i)if(s[i]!==r[i])return!1;return!0})(this._values,e._values)}toJSON(){return{type:Le._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Is(e,Le._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every((t=>typeof t=="number")))return new Le(e.vectorValues);throw new L(R.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}Le._jsonSchemaVersion="firestore/vectorValue/1.0",Le._jsonSchema={type:ce("string",Le._jsonSchemaVersion),vectorValues:ce("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sE=/^__.*__$/;class rE{constructor(e,t,s){this.data=e,this.fieldMask=t,this.fieldTransforms=s}toMutation(e,t){return this.fieldMask!==null?new Dt(e,this.data,this.fieldMask,t,this.fieldTransforms):new ws(e,this.data,t,this.fieldTransforms)}}class Qd{constructor(e,t,s){this.data=e,this.fieldMask=t,this.fieldTransforms=s}toMutation(e,t){return new Dt(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function Jd(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw U(40011,{dataSource:n})}}class Ka{constructor(e,t,s,r,i,o){this.settings=e,this.databaseId=t,this.serializer=s,this.ignoreUndefinedProperties=r,i===void 0&&this.Ac(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}i(e){return new Ka({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}dc(e){var r;const t=(r=this.path)==null?void 0:r.child(e),s=this.i({path:t,arrayElement:!1});return s.mc(e),s}fc(e){var r;const t=(r=this.path)==null?void 0:r.child(e),s=this.i({path:t,arrayElement:!1});return s.Ac(),s}gc(e){return this.i({path:void 0,arrayElement:!0})}yc(e){return Tr(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return this.fieldMask.find((t=>e.isPrefixOf(t)))!==void 0||this.fieldTransforms.find((t=>e.isPrefixOf(t.field)))!==void 0}Ac(){if(this.path)for(let e=0;e<this.path.length;e++)this.mc(this.path.get(e))}mc(e){if(e.length===0)throw this.yc("Document fields must not be empty");if(Jd(this.dataSource)&&sE.test(e))throw this.yc('Document fields cannot begin and end with "__"')}}class iE{constructor(e,t,s){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=s||Fr(e)}I(e,t,s,r=!1){return new Ka({dataSource:e,methodName:t,targetDoc:s,path:ye.emptyPath(),arrayElement:!1,hasConverter:r},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Yd(n){const e=n._freezeSettings(),t=Fr(n._databaseId);return new iE(n._databaseId,!!e.ignoreUndefinedProperties,t)}function aE(n,e,t,s,r,i={}){const o=n.I(i.merge||i.mergeFields?2:0,e,t,r);Ha("Data must be an object, but it was:",o,s);const c=Xd(s,o);let u,h;if(i.merge)u=new xe(o.fieldMask),h=o.fieldTransforms;else if(i.mergeFields){const f=[];for(const m of i.mergeFields){const E=fs(e,m,t);if(!o.contains(E))throw new L(R.INVALID_ARGUMENT,`Field '${E}' is specified in your field mask but missing from your input data.`);th(f,E)||f.push(E)}u=new xe(f),h=o.fieldTransforms.filter((m=>u.covers(m.field)))}else u=null,h=o.fieldTransforms;return new rE(new Pe(c),u,h)}class zr extends qa{_toFieldTransform(e){if(e.dataSource!==2)throw e.dataSource===1?e.yc(`${this._methodName}() can only appear at the top level of your update data`):e.yc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof zr}}function oE(n,e,t,s){const r=n.I(1,e,t);Ha("Data must be an object, but it was:",r,s);const i=[],o=Pe.empty();xt(s,((u,h)=>{const f=eh(e,u,t);h=me(h);const m=r.fc(f);if(h instanceof zr)i.push(f);else{const E=qr(h,m);E!=null&&(i.push(f),o.set(f,E))}}));const c=new xe(i);return new Qd(o,c,r.fieldTransforms)}function cE(n,e,t,s,r,i){const o=n.I(1,e,t),c=[fs(e,s,t)],u=[r];if(i.length%2!=0)throw new L(R.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let E=0;E<i.length;E+=2)c.push(fs(e,i[E])),u.push(i[E+1]);const h=[],f=Pe.empty();for(let E=c.length-1;E>=0;--E)if(!th(h,c[E])){const S=c[E];let P=u[E];P=me(P);const D=o.fc(S);if(P instanceof zr)h.push(S);else{const C=qr(P,D);C!=null&&(h.push(S),f.set(S,C))}}const m=new xe(h);return new Qd(f,m,o.fieldTransforms)}function qr(n,e){if(Zd(n=me(n)))return Ha("Unsupported field value:",e,n),Xd(n,e);if(n instanceof qa)return(function(s,r){if(!Jd(r.dataSource))throw r.yc(`${s._methodName}() can only be used with update() and set()`);if(!r.path)throw r.yc(`${s._methodName}() is not currently supported inside arrays`);const i=s._toFieldTransform(r);i&&r.fieldTransforms.push(i)})(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.arrayElement&&e.dataSource!==4)throw e.yc("Nested arrays are not supported");return(function(s,r){const i=[];let o=0;for(const c of s){let u=qr(c,r.gc(o));u==null&&(u={nullValue:"NULL_VALUE"}),i.push(u),o++}return{arrayValue:{values:i}}})(n,e)}return(function(s,r){if((s=me(s))===null)return{nullValue:"NULL_VALUE"};if(typeof s=="number")return Ky(r.serializer,s);if(typeof s=="boolean")return{booleanValue:s};if(typeof s=="string")return{stringValue:s};if(s instanceof Date){const i=ne.fromDate(s);return{timestampValue:Er(r.serializer,i)}}if(s instanceof ne){const i=new ne(s.seconds,1e3*Math.floor(s.nanoseconds/1e3));return{timestampValue:Er(r.serializer,i)}}if(s instanceof He)return{geoPointValue:{latitude:s.latitude,longitude:s.longitude}};if(s instanceof Ne)return{bytesValue:pd(r.serializer,s._byteString)};if(s instanceof le){const i=r.databaseId,o=s.firestore._databaseId;if(!o.isEqual(i))throw r.yc(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:ka(s.firestore._databaseId||r.databaseId,s._key.path)}}if(s instanceof Le)return(function(o,c){const u=o instanceof Le?o.toArray():o;return{mapValue:{fields:{[zu]:{stringValue:qu},[mr]:{arrayValue:{values:u.map((f=>{if(typeof f!="number")throw c.yc("VectorValues must only contain numeric values.");return Ta(c.serializer,f)}))}}}}}})(s,r);if(bd(s))return s._toProto(r.serializer);throw r.yc(`Unsupported field value: ${_a(s)}`)})(n,e)}function Xd(n,e){const t={};return Ou(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):xt(n,((s,r)=>{const i=qr(r,e.dc(s));i!=null&&(t[s]=i)})),{mapValue:{fields:t}}}function Zd(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof ne||n instanceof He||n instanceof Ne||n instanceof le||n instanceof qa||n instanceof Le||bd(n))}function Ha(n,e,t){if(!Zd(t)||!Lu(t)){const s=_a(t);throw s==="an object"?e.yc(n+" a custom object"):e.yc(n+" "+s)}}function fs(n,e,t){if((e=me(e))instanceof za)return e._internalPath;if(typeof e=="string")return eh(n,e);throw Tr("Field path arguments must be of type string or ",n,!1,void 0,t)}const lE=new RegExp("[~\\*/\\[\\]]");function eh(n,e,t){if(e.search(lE)>=0)throw Tr(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new za(...e.split("."))._internalPath}catch{throw Tr(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function Tr(n,e,t,s,r){const i=s&&!s.isEmpty(),o=r!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let u="";return(i||o)&&(u+=" (found",i&&(u+=` in field ${s}`),o&&(u+=` in document ${r}`),u+=")"),new L(R.INVALID_ARGUMENT,c+n+u)}function th(n,e){return n.some((t=>t.isEqual(e)))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uE{convertValue(e,t="none"){switch(kt(e)){case 0:return null;case 1:return e.booleanValue;case 2:return ae(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(St(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw U(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const s={};return xt(e,((r,i)=>{s[r]=this.convertValue(i,t)})),s}convertVectorValue(e){var s,r,i;const t=(i=(r=(s=e.fields)==null?void 0:s[mr].arrayValue)==null?void 0:r.values)==null?void 0:i.map((o=>ae(o.doubleValue)));return new Le(t)}convertGeoPoint(e){return new He(ae(e.latitude),ae(e.longitude))}convertArray(e,t){return(e.values||[]).map((s=>this.convertValue(s,t)))}convertServerTimestamp(e,t){switch(t){case"previous":const s=xr(e);return s==null?null:this.convertValue(s,t);case"estimate":return this.convertTimestamp(os(e));default:return null}}convertTimestamp(e){const t=At(e);return new ne(t.seconds,t.nanos)}convertDocumentKey(e,t){const s=se.fromString(e);X(Ed(s),9688,{name:e});const r=new cs(s.get(1),s.get(3)),i=new O(s.popFirst(5));return r.isEqual(t)||et(`Document ${i} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nh extends uE{constructor(e){super(),this.firestore=e}convertBytes(e){return new Ne(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new le(this.firestore,null,t)}}const bl="@firebase/firestore",Il="4.14.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wl(n){return(function(t,s){if(typeof t!="object"||t===null)return!1;const r=t;for(const i of s)if(i in r&&typeof r[i]=="function")return!0;return!1})(n,["next","error","complete"])}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sh{constructor(e,t,s,r,i){this._firestore=e,this._userDataWriter=t,this._key=s,this._document=r,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new le(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new dE(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){var e;return((e=this._document)==null?void 0:e.data.clone().value.mapValue.fields)??void 0}get(e){if(this._document){const t=this._document.data.field(fs("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class dE extends sh{data(){return super.data()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hE(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new L(R.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}function fE(n,e,t){let s;return s=n?n.toFirestore(e):e,s}class Xn{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class $t extends sh{constructor(e,t,s,r,i,o){super(e,t,s,r,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new sr(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const s=this._document.data.field(fs("DocumentSnapshot.get",e));if(s!==null)return this._userDataWriter.convertValue(s,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new L(R.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=$t._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}$t._jsonSchemaVersion="firestore/documentSnapshot/1.0",$t._jsonSchema={type:ce("string",$t._jsonSchemaVersion),bundleSource:ce("string","DocumentSnapshot"),bundleName:ce("string"),bundle:ce("string")};class sr extends $t{data(e={}){return super.data(e)}}class hn{constructor(e,t,s,r){this._firestore=e,this._userDataWriter=t,this._snapshot=r,this.metadata=new Xn(r.hasPendingWrites,r.fromCache),this.query=s}get docs(){const e=[];return this.forEach((t=>e.push(t))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach((s=>{e.call(t,new sr(this._firestore,this._userDataWriter,s.key,s,new Xn(this._snapshot.mutatedKeys.has(s.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new L(R.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=(function(r,i){if(r._snapshot.oldDocs.isEmpty()){let o=0;return r._snapshot.docChanges.map((c=>{const u=new sr(r._firestore,r._userDataWriter,c.doc.key,c.doc,new Xn(r._snapshot.mutatedKeys.has(c.doc.key),r._snapshot.fromCache),r.query.converter);return c.doc,{type:"added",doc:u,oldIndex:-1,newIndex:o++}}))}{let o=r._snapshot.oldDocs;return r._snapshot.docChanges.filter((c=>i||c.type!==3)).map((c=>{const u=new sr(r._firestore,r._userDataWriter,c.doc.key,c.doc,new Xn(r._snapshot.mutatedKeys.has(c.doc.key),r._snapshot.fromCache),r.query.converter);let h=-1,f=-1;return c.type!==0&&(h=o.indexOf(c.doc.key),o=o.delete(c.doc.key)),c.type!==1&&(o=o.add(c.doc),f=o.indexOf(c.doc.key)),{type:pE(c.type),doc:u,oldIndex:h,newIndex:f}}))}})(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new L(R.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=hn._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=ya.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],s=[],r=[];return this.docs.forEach((i=>{i._document!==null&&(t.push(i._document),s.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),r.push(i.ref.path))})),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function pE(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return U(61501,{type:n})}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */hn._jsonSchemaVersion="firestore/querySnapshot/1.0",hn._jsonSchema={type:ce("string",hn._jsonSchemaVersion),bundleSource:ce("string","QuerySnapshot"),bundleName:ce("string"),bundle:ce("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mE(n){n=je(n,le);const e=je(n.firestore,bn),t=ja(e);return Jv(t,n._key).then((s=>ih(e,n,s)))}function Tl(n,e,t){n=je(n,le);const s=je(n.firestore,bn),r=fE(n.converter,e),i=Yd(s);return rh(s,[aE(i,"setDoc",n._key,r,n.converter!==null,t).toMutation(n._key,qe.none())])}function gE(n,e,t,...s){n=je(n,le);const r=je(n.firestore,bn),i=Yd(r);let o;return o=typeof(e=me(e))=="string"||e instanceof za?cE(i,"updateDoc",n._key,e,t,s):oE(i,"updateDoc",n._key,e),rh(r,[o.toMutation(n._key,qe.exists(!0))])}function yE(n,...e){var h,f,m;n=me(n);let t={includeMetadataChanges:!1,source:"default"},s=0;typeof e[s]!="object"||wl(e[s])||(t=e[s++]);const r={includeMetadataChanges:t.includeMetadataChanges,source:t.source};if(wl(e[s])){const E=e[s];e[s]=(h=E.next)==null?void 0:h.bind(E),e[s+1]=(f=E.error)==null?void 0:f.bind(E),e[s+2]=(m=E.complete)==null?void 0:m.bind(E)}let i,o,c;if(n instanceof le)o=je(n.firestore,bn),c=Nr(n._key.path),i={next:E=>{e[s]&&e[s](ih(o,n,E))},error:e[s+1],complete:e[s+2]};else{const E=je(n,jr);o=je(E.firestore,bn),c=E._query;const S=new nh(o);i={next:P=>{e[s]&&e[s](new hn(o,S,E,P))},error:e[s+1],complete:e[s+2]},hE(n._query)}const u=ja(o);return Qv(u,c,r,i)}function rh(n,e){const t=ja(n);return Yv(t,e)}function ih(n,e,t){const s=t.docs.get(e._key),r=new nh(n);return new $t(n,r,e._key,s,new Xn(t.hasPendingWrites,t.fromCache),e.converter)}(function(e,t=!0){Jg(In),pn(new zt("firestore",((s,{instanceIdentifier:r,options:i})=>{const o=s.getProvider("app").getImmediate(),c=new bn(new Zg(s.getProvider("auth-internal")),new ny(o,s.getProvider("app-check-internal")),Ey(o,r),o);return i={useFetchStreams:t,...i},c._setSettings(i),c}),"PUBLIC").setMultipleInstances(!0)),Et(bl,Il,e),Et(bl,Il,"esm2020")})();const _E={apiKey:"AIzaSyCD3Li_PtOi1n-76fiVxFM5AllwmwAhO-U",authDomain:"adamfamilybudget.firebaseapp.com",projectId:"adamfamilybudget",storageBucket:"adamfamilybudget.firebasestorage.app",messagingSenderId:"271655292794",appId:"1:271655292794:web:610b8e17eb1e04af17d0c3",measurementId:"G-W9P07ZCHT0"},ah=zl(_E),ps=Wg(ah),Pi=tE(ah),Al="cipta_finansial_data",Hn={family:null,accounts:[],transactions:[],settings:{togetherMode:!1,allowanceBudget:15e5,transportBudget:6e5,anakBudget:8e5,userName:"Papa",spouseName:"Mama",geminiApiKey:""},budgetRules:{needs:["Rumah Tangga","Transportasi","Pendidikan Anak","Kesehatan","Cicilan"],wants:["Hiburan","Pakaian & Fashion","Makanan & Minuman"],savings:["Investasi","Sosial & Ibadah"]},assets:{emas:{bsi_gram:0,tring_gram:0,price_per_gram:165e4},kpr:{total:0,paid:0,monthly:0,bank:"",remaining_months:0},arisan:[],custom:[]},categories:[]};class vE{constructor(){this._listeners=[],this._state={...Hn},this._unsubscribe=null,this._userId=null,this._localData=this._loadLocal()}_loadLocal(){try{const e=localStorage.getItem(Al);return e?JSON.parse(e):null}catch{return null}}async sync(e){if(!e){this._state={...Hn},this._userId=null,this._unsubscribe&&this._unsubscribe(),this._notify();return}this._userId=e.uid;const t=Ri(Pi,"families",e.uid);return this._unsubscribe=yE(t,s=>{s.exists()?(this._state={...Hn,...s.data()},this._notify()):this._handleFirstTimeUser(t)}),Promise.resolve()}async _handleFirstTimeUser(e){if(!(await mE(e)).exists()){const s=this._localData||Hn;await Tl(e,s),localStorage.removeItem(Al)}}_notify(){this._listeners.forEach(e=>e(this._state))}subscribe(e){return this._listeners.push(e),()=>{this._listeners=this._listeners.filter(t=>t!==e)}}getState(){return this._state}async _updateCloud(e){if(!this._userId){console.error("Cloud Sync Error: No User ID"),rr(()=>Promise.resolve().then(()=>Sl),void 0).then(s=>s.showToast("⚠️ Hubungkan ke Cloud dulu!","error"));return}const t=Ri(Pi,"families",this._userId);try{await gE(t,e)}catch(s){console.error("Firestore Update Failed:",s),rr(()=>Promise.resolve().then(()=>Sl),void 0).then(r=>r.showToast(`❌ Gagal Simpan: ${s.code||"Permission Denied"}`,"error"))}}async updateSettings(e){const t={...this._state.settings,...e};await this._updateCloud({settings:t})}async toggleTogetherMode(){const e=!this._state.settings.togetherMode;return await this._updateCloud({"settings.togetherMode":e}),e}async addAccount(e){const s=this._state.accounts.reduce((i,o)=>Math.max(i,o.id||0),0)+1,r=[...this._state.accounts,{id:s,...e}];return await this._updateCloud({accounts:r}),s}async updateAccount(e,t){const s=this._state.accounts.map(r=>r.id===e?{...r,...t}:r);await this._updateCloud({accounts:s})}async deleteAccount(e){const t=this._state.accounts.filter(s=>s.id!==e);await this._updateCloud({accounts:t})}getAccounts(){return this._state.accounts}async addTransaction(e){const t=crypto.randomUUID?crypto.randomUUID():Date.now().toString(36),r=[{id:t,created_at:new Date().toISOString(),...e},...this._state.transactions],i=[...this._state.accounts],o=(c,u)=>{const h=i.find(f=>f.id===c);h&&(h.balance=(h.balance||0)+u)};return e.type==="income"?o(e.account_id,e.amount):e.type==="expense"?o(e.account_id,-e.amount):e.type==="transfer"&&(o(e.account_id,-e.amount),e.to_account_id&&o(e.to_account_id,e.amount)),await this._updateCloud({transactions:r,accounts:i}),t}async deleteTransaction(e){const t=this._state.transactions.find(o=>o.id===e);if(!t)return;const s=this._state.transactions.filter(o=>o.id!==e),r=[...this._state.accounts],i=(o,c)=>{const u=r.find(h=>h.id===o);u&&(u.balance=(u.balance||0)+c)};t.type==="income"?i(t.account_id,-t.amount):t.type==="expense"?i(t.account_id,t.amount):t.type==="transfer"&&(i(t.account_id,t.amount),t.to_account_id&&i(t.to_account_id,-t.amount)),await this._updateCloud({transactions:s,accounts:r})}getTransactions(e={}){let t=[...this._state.transactions];if(e.type&&(t=t.filter(s=>s.type===e.type)),e.paid_by&&(t=t.filter(s=>s.paid_by===e.paid_by)),e.for_whom&&(t=t.filter(s=>s.for_whom===e.for_whom)),e.account_id&&(t=t.filter(s=>s.account_id===e.account_id)),e.parent_category&&(t=t.filter(s=>s.parent_category===e.parent_category)),e.month!==void 0&&(t=t.filter(s=>{const r=new Date(s.created_at);return r.getMonth()===e.month&&r.getFullYear()===(e.year||new Date().getFullYear())})),e.search){const s=e.search.toLowerCase();t=t.filter(r=>(r.description||"").toLowerCase().includes(s)||(r.parent_category||"").toLowerCase().includes(s))}return t}getTransactionsByMonth(e,t){return this._state.transactions.filter(s=>{const r=new Date(s.created_at);return r.getFullYear()===e&&r.getMonth()===t})}async updateEmas(e){const t={...this._state.assets.emas,...e};await this._updateCloud({"assets.emas":t})}async updateKPR(e){const t={...this._state.assets.kpr,...e};await this._updateCloud({"assets.kpr":t})}async addArisan(e){const t=Date.now(),s=[...this._state.assets.arisan,{id:t,...e}];return await this._updateCloud({"assets.arisan":s}),t}async updateArisan(e,t){const s=this._state.assets.arisan.map(r=>r.id===e?{...r,...t}:r);await this._updateCloud({"assets.arisan":s})}async deleteArisan(e){const t=this._state.assets.arisan.filter(s=>s.id!==e);await this._updateCloud({"assets.arisan":t})}async addCustomAsset(e){const t=Date.now().toString(36),s=[...this._state.assets.custom,{id:t,...e}];return await this._updateCloud({"assets.custom":s}),t}async updateCustomAsset(e,t){const s=this._state.assets.custom.map(r=>r.id===e?{...r,...t}:r);await this._updateCloud({"assets.custom":s})}async deleteCustomAsset(e){const t=this._state.assets.custom.filter(s=>s.id!==e);await this._updateCloud({"assets.custom":t})}getAssets(){return this._state.assets}getTotalBalance(){return this._state.accounts.reduce((e,t)=>e+(t.balance||0),0)}getMonthlyExpenses(e,t){return this.getTransactionsByMonth(e,t).filter(s=>s.type==="expense").reduce((s,r)=>s+r.amount,0)}getMonthlyIncome(e,t){return this.getTransactionsByMonth(e,t).filter(s=>s.type==="income").reduce((s,r)=>s+r.amount,0)}getAllowanceSpent(){const e=new Date,t=this._state.settings.userName;return this.getTransactionsByMonth(e.getFullYear(),e.getMonth()).filter(s=>s.type==="expense"&&s.paid_by===t).reduce((s,r)=>s+r.amount,0)}getDanaPusatBalance(){const e=this._state.settings.spouseName;return this._state.accounts.filter(t=>t.owner_name===e||t.owner_name==="Bersama").reduce((t,s)=>t+(s.balance||0),0)}getNetWorth(){const e=this.getTotalBalance(),t=this._state.assets.emas,s=(t.bsi_gram+t.tring_gram)*t.price_per_gram,r=this._state.assets.kpr.paid;return e+s+r}getCategorySpending(e,t){const s=this.getTransactionsByMonth(e,t).filter(i=>i.type==="expense"),r={};return s.forEach(i=>{const o=i.parent_category||"Lainnya";r[o]=(r[o]||0)+i.amount}),Object.entries(r).map(([i,o])=>({name:i,amount:o})).sort((i,o)=>o.amount-i.amount)}getBudgetPerformance(){const e=new Date,t=this.getTransactionsByMonth(e.getFullYear(),e.getMonth()).filter(u=>u.type==="expense"),s=this._state.budgetRules;let r=0,i=0,o=0;t.forEach(u=>{const h=u.parent_category,f=u.sub_category||"";s.needs.includes(h)?r+=u.amount:s.savings.includes(h)?o+=u.amount:s.wants.includes(h)&&h==="Makanan & Minuman"&&["Makan di Luar","Cemilan","Kopi & Minuman"].includes(f)?i+=u.amount:r+=u.amount});const c=r+i+o;return{needs:r,wants:i,savings:o,total:c}}async payAssetMonthly(e,t,s){const r=this._state;let i=0,o="",c="Cicilan";if(e==="kpr")i=r.assets.kpr.monthly,o=`Cicilan KPR ${r.assets.kpr.bank} (Bulan ini)`,await this.updateKPR({paid:r.assets.kpr.paid+i,remaining_months:r.assets.kpr.remaining_months-1});else if(e==="arisan"){const u=r.assets.arisan.find(h=>h.id===t);u&&(i=u.monthly_amount,o=`Iuran Arisan ${u.name}`,c="Sosial & Ibadah",await this.updateArisan(t,{current_round:u.current_round+1}))}else if(e==="custom"){const u=r.assets.custom.find(h=>h.id===t);u&&(i=u.monthly_amount||0,o=`Cicilan ${u.name}`,await this.updateCustomAsset(t,{paid:(u.paid||0)+i}))}i>0&&await this.addTransaction({account_id:s,amount:i,type:"expense",description:o,parent_category:c,paid_by:r.settings.userName,for_whom:"Bersama"})}async reset(){this._userId&&await Tl(Ri(Pi,"families",this._userId),Hn)}}const V=new vE;function EE(){const n=V.getState(),e=n.settings.togetherMode;return`
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
          ${(n.settings.userName||"U").charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  `}function bE(){const n=document.getElementById("together-toggle");n&&n.addEventListener("click",async()=>{const s=!n.classList.contains("active");n.classList.toggle("active",s);const r=n.querySelector(".together-toggle-icon"),i=n.querySelector(".together-toggle-label");r.textContent=s?"favorite":"favorite_border",i.textContent=s?"Together!":"Together",await V.toggleTogetherMode()});const e=document.getElementById("profile-avatar");e&&e.addEventListener("click",()=>{const s=V.getState().settings.userName||"Papa",r=s==="Papa"?"Mama":"Papa",i=prompt(`Pilih aksi untuk ${s}:
1. Ganti User ke ${r}
2. Keluar (Logout)

Ketik angka (1/2):`,"1");i==="1"?(V.updateSettings({userName:r}),window.dispatchEvent(new Event("data-updated"))):i==="2"&&window.dispatchEvent(new Event("logout"))})}const IE=[{path:"/",icon:"dashboard",label:"Beranda"},{path:"/transactions",icon:"receipt_long",label:"Transaksi"},{path:"/accounts",icon:"account_balance_wallet",label:"Rekening"},{path:"/assets",icon:"diamond",label:"Aset"},{path:"/insights",icon:"auto_awesome",label:"AI Insight"},{path:"/settings",icon:"settings",label:"Set"}];function wE(){const n=wt.getCurrentPath();return`
    <nav class="bottom-nav" id="bottom-nav">
      ${IE.map(e=>`
        <a class="nav-item ${n===e.path?"active":""}"
           href="#${e.path}"
           id="nav-${e.path.replace("/","")||"home"}"
           aria-label="${e.label}">
          <span class="material-icons-round">${e.icon}</span>
          <span>${e.label}</span>
        </a>
      `).join("")}
    </nav>
  `}function TE(n){document.querySelectorAll(".nav-item").forEach(e=>{const t=e.getAttribute("href");e.classList.toggle("active",t===`#${n}`)})}function AE(){return`
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
  `}function SE(){var r,i,o,c;const n=document.getElementById("fab-main"),e=document.getElementById("fab-actions");let t=!1;n&&n.addEventListener("click",()=>{t=!t,n.classList.toggle("open",t),e.classList.toggle("open",t)}),document.addEventListener("click",u=>{t&&!u.target.closest("#fab-container")&&(t=!1,n==null||n.classList.remove("open"),e==null||e.classList.remove("open"))}),(r=document.getElementById("fab-expense"))==null||r.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("open-transaction-modal",{detail:{type:"expense"}})),s()}),(i=document.getElementById("fab-income"))==null||i.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("open-transaction-modal",{detail:{type:"income"}})),s()}),(o=document.getElementById("fab-transfer"))==null||o.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("open-transaction-modal",{detail:{type:"transfer"}})),s()}),(c=document.getElementById("fab-scan"))==null||c.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("open-scan-modal")),s()});function s(){t=!1,n==null||n.classList.remove("open"),e==null||e.classList.remove("open")}}const Kr=[{name:"Makanan & Minuman",icon:"restaurant",subs:["Makan Harian","Makan di Luar","Cemilan","Kopi & Minuman","Groceries"]},{name:"Transportasi",icon:"directions_car",subs:["Bensin LDM","Bensin Harian","Parkir","Tol","Servis Kendaraan","Ojol / Grab"]},{name:"Rumah Tangga",icon:"home",subs:["Listrik","Air PDAM","Internet","Gas LPG","Perabot","Kebersihan"]},{name:"Pendidikan Anak",icon:"school",subs:["SPP","Buku & Alat Tulis","Les/Kursus","Seragam","Uang Jajan"]},{name:"Kesehatan",icon:"local_hospital",subs:["Obat","Dokter","Vitamin","BPJS Tambahan"]},{name:"Pakaian & Fashion",icon:"checkroom",subs:["Pakaian","Sepatu","Aksesoris"]},{name:"Hiburan",icon:"celebration",subs:["Jalan-jalan","Quality Time","Film","Langganan Digital","Hobi"]},{name:"Sosial & Ibadah",icon:"volunteer_activism",subs:["Sedekah","Zakat","Sumbangan","Hajatan","Arisan"]},{name:"Investasi",icon:"trending_up",subs:["Emas BSI","Emas Tring","Tabungan","Deposito"]},{name:"Cicilan",icon:"account_balance",subs:["KPR","Kredit Motor","Pinjaman"]},{name:"Gaji & Pendapatan",icon:"payments",subs:["Gaji Pokok","Tunjangan Kinerja","TPP","Penghasilan Lain","Arisan Masuk"]},{name:"Lainnya",icon:"more_horiz",subs:["Tak Terduga","Donasi","Lain-lain"]}];function kE(n){const e=Kr.find(t=>t.name===n);return e?e.icon:"receipt_long"}function RE(n){const e=Kr.find(t=>t.name===n);return e?e.subs:[]}function M(n,e=!1){return e&&Math.abs(n)>=1e6?"Rp "+(n/1e6).toFixed(1).replace(".0","")+" jt":e&&Math.abs(n)>=1e3?"Rp "+(n/1e3).toFixed(0)+" rb":new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",minimumFractionDigits:0,maximumFractionDigits:0}).format(n)}function oh(n,e="long"){const t=new Date(n),s=["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"],r=["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"],i=["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];if(e==="short")return`${t.getDate()} ${s[t.getMonth()]}`;if(e==="long")return`${i[t.getDay()]}, ${t.getDate()} ${r[t.getMonth()]} ${t.getFullYear()}`;if(e==="time")return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`;if(e==="relative"){const c=new Date-t,u=Math.floor(c/6e4);if(u<1)return"Baru saja";if(u<60)return`${u} menit lalu`;const h=Math.floor(u/60);if(h<24)return`${h} jam lalu`;const f=Math.floor(h/24);return f===1?"Kemarin":f<7?`${f} hari lalu`:`${t.getDate()} ${s[t.getMonth()]}`}if(e==="group"){const o=new Date,c=new Date(o);return c.setDate(c.getDate()-1),t.toDateString()===o.toDateString()?"Hari Ini":t.toDateString()===c.toDateString()?"Kemarin":`${i[t.getDay()]}, ${t.getDate()} ${s[t.getMonth()]}`}return t.toLocaleDateString("id-ID")}function Rn(){return["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"][new Date().getMonth()]}function ch(n){const e={};return n.forEach(t=>{const s=oh(t.created_at,"group");e[s]||(e[s]=[]),e[s].push(t)}),e}function PE(n,e,t=800){const s=parseInt(n.textContent.replace(/\D/g,"")||"0"),r=performance.now();function i(o){const c=o-r,u=Math.min(c/t,1),h=1-Math.pow(1-u,3),f=Math.round(s+(e-s)*h);n.textContent=M(f),u<1&&requestAnimationFrame(i)}requestAnimationFrame(i)}function we(n,e="info"){let t=document.querySelector(".toast-container");t||(t=document.createElement("div"),t.className="toast-container",document.body.appendChild(t));const s=document.createElement("div");s.className=`toast toast-${e}`,s.textContent=n,t.appendChild(s),setTimeout(()=>s.remove(),3e3)}function CE(n,e={},t=[]){const s=document.createElement(n);return Object.entries(e).forEach(([r,i])=>{r==="className"?s.className=i:r==="innerHTML"?s.innerHTML=i:r==="textContent"?s.textContent=i:r.startsWith("on")?s.addEventListener(r.slice(2).toLowerCase(),i):s.setAttribute(r,i)}),t.forEach(r=>{typeof r=="string"?s.appendChild(document.createTextNode(r)):r&&s.appendChild(r)}),s}function lh(n,e=300){let t;return(...s)=>{clearTimeout(t),t=setTimeout(()=>n(...s),e)}}function fn(n,e){return e?Math.min(Math.round(n/e*100),100):0}const Sl=Object.freeze(Object.defineProperty({__proto__:null,animateCounter:PE,createElement:CE,debounce:lh,formatDate:oh,formatRupiah:M,getCurrentMonthName:Rn,groupByDate:ch,percentage:fn,showToast:we},Symbol.toStringTag,{value:"Module"}));function xE(){const n=V.getAccounts(),e=V.getState();return`
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
                ${n.map(t=>`<option value="${t.id}">${t.bank_name}</option>`).join("")}
              </select>
            </div>
            <div class="form-group" id="tx-to-account-group" style="display: none;">
              <label class="form-label">Ke Rekening</label>
              <select class="form-select" id="tx-to-account">
                ${n.map(t=>`<option value="${t.id}">${t.bank_name}</option>`).join("")}
              </select>
            </div>
          </div>

          <!-- Category -->
          <div class="form-row" id="tx-category-row">
            <div class="form-group">
              <label class="form-label">Kategori</label>
              <select class="form-select" id="tx-category">
                <option value="">Pilih Kategori</option>
                ${Kr.map(t=>`<option value="${t.name}">${t.name}</option>`).join("")}
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
  `}function DE(){var t;const n=document.getElementById("tx-modal-backdrop");document.getElementById("tx-modal-sheet");const e=document.getElementById("tx-form");window.addEventListener("open-transaction-modal",s=>{var r;NE(((r=s.detail)==null?void 0:r.type)||"expense")}),n==null||n.addEventListener("click",kl),document.querySelectorAll("#tx-type-chips .chip").forEach(s=>{s.addEventListener("click",()=>{document.querySelectorAll("#tx-type-chips .chip").forEach(c=>c.classList.remove("selected")),s.classList.add("selected");const r=s.dataset.type,i=document.getElementById("tx-to-account-group"),o=document.getElementById("tx-category-row");i&&(i.style.display=r==="transfer"?"":"none"),o&&(o.style.display=r==="transfer"?"none":"")})}),document.querySelectorAll("#tx-paid-by-chips .chip").forEach(s=>{s.addEventListener("click",()=>{document.querySelectorAll("#tx-paid-by-chips .chip").forEach(r=>r.classList.remove("selected")),s.classList.add("selected")})}),document.querySelectorAll("#tx-for-whom-chips .chip").forEach(s=>{s.addEventListener("click",()=>{document.querySelectorAll("#tx-for-whom-chips .chip").forEach(r=>r.classList.remove("selected")),s.classList.add("selected")})}),(t=document.getElementById("tx-category"))==null||t.addEventListener("change",s=>{const r=RE(s.target.value),i=document.getElementById("tx-subcategory");i&&(i.innerHTML='<option value="">Pilih Sub-Kategori</option>'+r.map(o=>`<option value="${o}">${o}</option>`).join(""))}),e==null||e.addEventListener("submit",s=>{var C,B,$,H,q,G,Z,v,g,y;s.preventDefault();const r=((C=document.querySelector("#tx-type-chips .chip.selected"))==null?void 0:C.dataset.type)||"expense",i=parseFloat(((B=document.getElementById("tx-amount"))==null?void 0:B.value)||0),o=(($=document.getElementById("tx-description"))==null?void 0:$.value)||"",c=parseInt((H=document.getElementById("tx-account"))==null?void 0:H.value),u=r==="transfer"?parseInt((q=document.getElementById("tx-to-account"))==null?void 0:q.value):null,h=((G=document.getElementById("tx-category"))==null?void 0:G.value)||"",f=((Z=document.getElementById("tx-subcategory"))==null?void 0:Z.value)||"",m=((v=document.querySelector("#tx-paid-by-chips .chip.selected"))==null?void 0:v.dataset.value)||"Suami",E=((g=document.querySelector("#tx-for-whom-chips .chip.selected"))==null?void 0:g.dataset.value)||"Bersama",S=(y=document.getElementById("tx-date"))==null?void 0:y.value,P=S?new Date(S).toISOString():new Date().toISOString(),D=V.getState();if(!i||i<=0){we("Masukkan nominal yang valid","error");return}V.addTransaction({account_id:c,to_account_id:u,amount:i,type:r,description:o,parent_category:r==="transfer"?"Transfer":h,sub_category:r==="transfer"?"Pindah Buku":f,paid_by:m,for_whom:E,is_together:D.settings.togetherMode,created_at:P}),we("✅ Transaksi berhasil disimpan!"),kl(),window.dispatchEvent(new CustomEvent("data-updated"))})}function NE(n="expense"){var u;const e=document.getElementById("tx-modal-backdrop"),t=document.getElementById("tx-modal-sheet"),s=document.getElementById("tx-modal-title");(u=document.getElementById("tx-form"))==null||u.reset(),document.getElementById("tx-date").value=new Date().toISOString().slice(0,16),document.querySelectorAll("#tx-type-chips .chip").forEach(h=>{h.classList.toggle("selected",h.dataset.type===n)});const r=document.getElementById("tx-to-account-group"),i=document.getElementById("tx-category-row");r&&(r.style.display=n==="transfer"?"":"none"),i&&(i.style.display=n==="transfer"?"none":""),V.getState().settings.togetherMode&&(document.querySelectorAll("#tx-paid-by-chips .chip").forEach(h=>{h.classList.toggle("selected",h.dataset.value==="Istri")}),document.querySelectorAll("#tx-for-whom-chips .chip").forEach(h=>{h.classList.toggle("selected",h.dataset.value==="Bersama")}));const c={expense:"Tambah Pengeluaran",income:"Tambah Pemasukan",transfer:"Transfer Antar Rekening"};s&&(s.textContent=c[n]||"Tambah Transaksi"),e==null||e.classList.add("open"),t==null||t.classList.add("open")}function kl(){var n,e;(n=document.getElementById("tx-modal-backdrop"))==null||n.classList.remove("open"),(e=document.getElementById("tx-modal-sheet"))==null||e.classList.remove("open")}function VE(){return`
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
  `}let yt=[];function LE(){var S,P,D;const n=document.getElementById("scan-modal-backdrop"),e=document.getElementById("scan-modal-sheet"),t=document.getElementById("scan-upload-area"),s=document.getElementById("scan-file-input"),r=document.getElementById("tab-text"),i=document.getElementById("tab-scan"),o=document.getElementById("panel-text"),c=document.getElementById("panel-scan"),u=document.getElementById("ai-key-config"),h=document.getElementById("ai-main-app"),f=document.getElementById("btn-save-key"),m=document.getElementById("ai-key-input");function E(){V.getState().settings.geminiApiKey?(u.style.display="none",h.style.display="block"):(u.style.display="block",h.style.display="none")}f==null||f.addEventListener("click",async()=>{const C=m.value.trim();if(!C){we("API Key tidak boleh kosong","error");return}f.disabled=!0,f.innerHTML='<div class="spinner" style="width: 20px; height: 20px; border-width: 2px; margin: 0 auto;"></div>',await V.updateSettings({geminiApiKey:C}),we("✅ API Key Berhasil Disimpan"),E(),f.disabled=!1,f.innerHTML="Simpan Kunci"}),(S=document.getElementById("btn-force-config"))==null||S.addEventListener("click",()=>{u.style.display="block",h.style.display="none",m.value=V.getState().settings.geminiApiKey||"",m.focus()}),r==null||r.addEventListener("click",()=>{o.style.display="block",c.style.display="none",r.style.background="var(--primary-container)",r.style.color="var(--primary)",r.style.borderColor="var(--primary)",i.style.background="transparent",i.style.color="var(--on-surface-variant)",i.style.borderColor="transparent"}),i==null||i.addEventListener("click",()=>{o.style.display="none",c.style.display="block",i.style.background="var(--primary-container)",i.style.color="var(--primary)",i.style.borderColor="var(--primary)",r.style.background="transparent",r.style.color="var(--on-surface-variant)",r.style.borderColor="transparent"}),window.addEventListener("open-scan-modal",()=>{n==null||n.classList.add("open"),e==null||e.classList.add("open"),E(),Rl()}),n==null||n.addEventListener("click",()=>{n==null||n.classList.remove("open"),e==null||e.classList.remove("open")}),(P=document.getElementById("btn-analyze-text"))==null||P.addEventListener("click",async()=>{var B,$;const C=($=(B=document.getElementById("ai-text-input"))==null?void 0:B.value)==null?void 0:$.trim();if(!C){we("Silakan ceritakan pengeluaran Anda dulu","error");return}Pl();try{await xl(C,null,null)}catch(H){Cl(H)}}),t==null||t.addEventListener("click",()=>s==null?void 0:s.click()),s==null||s.addEventListener("change",async C=>{var H;const B=(H=C.target.files)==null?void 0:H[0];if(!B)return;Pl();const $=new FileReader;$.onload=async q=>{let G=q.target.result;try{G=await ME(G)}catch(Z){console.warn("Compression failed, using original",Z)}document.getElementById("scan-preview-img").src=G,document.getElementById("scan-preview").style.display="block";try{await xl(null,G.split(",")[1],"image/jpeg")}catch(Z){Cl(Z)}},$.readAsDataURL(B)}),(D=document.getElementById("scan-save-btn"))==null||D.addEventListener("click",()=>{if(!yt||yt.length===0)return;const C=V.getAccounts(),B=V.getState(),$=B.settings.togetherMode;let H=0;yt.forEach(q=>{var v;let G=(v=C.find(g=>g.bank_name.toLowerCase().includes("tunai")))==null?void 0:v.id;if(q.account_guess){const g=q.account_guess.toLowerCase(),y=C.find(I=>I.bank_name.toLowerCase().includes(g));y&&(G=y.id)}!G&&C.length>0&&(G=C[0].id);let Z=null;if(q.type==="transfer"&&q.to_account_guess){const g=q.to_account_guess.toLowerCase(),y=C.find(I=>I.bank_name.toLowerCase().includes(g));y&&(Z=y.id)}V.addTransaction({account_id:G,to_account_id:Z,amount:q.amount||0,type:q.type||"expense",description:q.description||"Transaksi AI",parent_category:q.category||"Lainnya",sub_category:q.sub_category||"",paid_by:$?B.settings.spouseName:B.settings.userName,for_whom:$?"Bersama":B.settings.userName,is_together:$,created_at:q.date?new Date(q.date).toISOString():new Date().toISOString()}),H++}),we(`✅ ${H} transaksi dari AI berhasil disimpan!`),n==null||n.classList.remove("open"),e==null||e.classList.remove("open"),window.dispatchEvent(new CustomEvent("data-updated")),Rl()})}function Rl(){document.getElementById("scan-preview").style.display="none",document.getElementById("scan-result").style.display="none",document.getElementById("scan-loading").style.display="none",document.getElementById("scan-parsed-data").style.display="none",document.getElementById("scan-save-btn").style.display="none",document.getElementById("ai-text-input").value="",document.getElementById("scan-file-input").value="",yt=[]}function Pl(){document.getElementById("scan-loading").style.display="block",document.getElementById("scan-result").style.display="none";const n=document.getElementById("ai-key-config");n&&(n.style.display="none");const e=document.getElementById("ai-main-app");e&&(e.style.display="block")}function Cl(n){console.error("AI Error:",n),document.getElementById("scan-loading").style.display="none",document.getElementById("scan-result").style.display="block";let e="❌ Maaf, Gagal memproses AI. Silakan coba deksripsi yang lebih jelas.";n.message&&(n.message.includes("403")||n.message.includes("leaked")||n.message.includes("Forbidden"))&&(e=`
      <b>❌ Akses Ditolak (API Key Bermasalah)</b><br/>
      Kunci AI Anda saat ini sudah tidak aktif atau dianggap bocor oleh Google.<br/><br/>
      <button class="btn btn-primary" onclick="document.getElementById('btn-force-config').click()" style="padding: 8px 16px; font-size: 12px; height: auto;">
        Klik di sini untuk Memasukkan Key Baru
      </button>
    `,V.updateSettings({geminiApiKey:""})),document.getElementById("scan-ai-text").innerHTML=e,document.getElementById("scan-parsed-data").style.display="none",document.getElementById("scan-save-btn").style.display="none"}async function xl(n,e,t){var P,D,C,B,$,H;const r=V.getState().settings.geminiApiKey;if(!r)throw new Error("API Key Missing");const i=`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${r}`,o=Kr.map(q=>q.name).join(", "),c=V.getAccounts();let f=[{text:`Anda adalah Asisten Keuangan Keluarga 'Adam Family'. Tugas Anda mengekstrak transaksi dari cerita informal (bahasa gaul/sehari-hari) atau gambar struk.

KONTEKS REKENING YANG TERSEDIA:
${c.map(q=>`- ID ${q.id}: ${q.bank_name} (${q.owner_name})`).join(`
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

INPUT: "${n||"Analisis gambar struk lampiran"}"`}];e&&f.push({inlineData:{mimeType:t||"image/jpeg",data:e}});const m=await fetch(i,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{parts:f}],generationConfig:{temperature:.1,maxOutputTokens:2048}})});if(!m.ok){const G=((P=(await m.json().catch(()=>({}))).error)==null?void 0:P.message)||m.statusText;throw m.status===403?new Error("403 Forbidden: API Key Problem"):m.status===404?new Error("404 Not Found: Model name error"):m.status===503?new Error("503 Service Busy: Server Google penuh, coba lagi sesaat lagi."):new Error(`HTTP Error ${m.status}: ${G}`)}const S=((H=($=(B=(C=(D=(await m.json()).candidates)==null?void 0:D[0])==null?void 0:C.content)==null?void 0:B.parts)==null?void 0:$[0])==null?void 0:H.text)||"";document.getElementById("scan-loading").style.display="none",document.getElementById("scan-result").style.display="block";try{const q=S.match(/\[[\s\S]*\]/)||S.match(/\{[\s\S]*\}/);if(!q)throw new Error("AI memberikan respon teks saja, bukan data transaksi.");let G=JSON.parse(q[0]);if(Array.isArray(G)||(G=[G]),yt=G,yt.length===0)throw new Error("Data transaksi kosong.");document.getElementById("scan-ai-text").innerHTML=`
      <strong>✨ AI Selesai Menganalisis!</strong><br/>
      Saya menemukan ${yt.length} transaksi dari cerita Anda.
    `;const Z=document.getElementById("scan-parsed-data");Z.style.display="block",Z.innerHTML=yt.map(v=>{const g=c.find(I=>I.id==v.account_id)||{bank_name:"Unknown"},y=v.to_account_id?c.find(I=>I.id==v.to_account_id):null;return`
        <div style="background: var(--surface-container); border-radius: var(--radius-md); padding: 12px; margin-top: 12px; border: 1px solid var(--outline-variant);">
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="font-weight: 600; color: var(--on-surface-variant);">${v.type==="income"?"💰 Pemasukan":v.type==="transfer"?"🔁 Transfer":"💸 Pengeluaran"}</span>
            <span style="font-weight: 800; color: ${v.type==="income"?"var(--success)":v.type==="transfer"?"var(--primary)":"var(--error)"};">${M(v.amount||0)}</span>
          </div>
          <div style="font-size: 13px; color: var(--on-surface-variant);">
            <p>📝 <strong>${v.description||"-"}</strong></p>
            <p>📂 ${v.category||"-"} ${v.sub_category?"→ "+v.sub_category:""}</p>
            <p>💳 Rekening: <strong>${g.bank_name} ${y?"➡️ "+y.bank_name:""}</strong></p>
          </div>
        </div>
      `}).join(""),document.getElementById("scan-save-btn").style.display="flex"}catch(q){throw console.error(q,S),new Error("Gagal membaca data: "+q.message)}}function ME(n,e=1200){return new Promise((t,s)=>{const r=new Image;r.src=n,r.onload=()=>{const i=document.createElement("canvas");let o=r.width,c=r.height;o>e&&(c=Math.round(c*e/o),o=e),i.width=o,i.height=c,i.getContext("2d").drawImage(r,0,0,o,c),t(i.toDataURL("image/jpeg",.8))},r.onerror=s})}function OE(){const n=V.getState(),e=new Date,t=n.settings.allowanceBudget||15e5,s=V.getAllowanceSpent(),r=Math.max(0,t-s),i=fn(s,t),o=V.getDanaPusatBalance(),c=V.getMonthlyExpenses(e.getFullYear(),e.getMonth()),u=V.getMonthlyIncome(e.getFullYear(),e.getMonth());return`
    <div class="bento-grid stagger-children">
      <!-- Pegangan Papa -->
      <div class="card card-gradient" id="card-allowance">
        <div class="card-title">💰 Pegangan ${n.settings.userName||"Papa"}</div>
        <div class="card-value">${M(r)}</div>
        <div class="card-subtitle">Terpakai ${M(s)} dari ${M(t)}</div>
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
        <div class="card-value">${M(o)}</div>
        <div class="card-subtitle">Dikelola oleh ${n.settings.spouseName||"Mama"}</div>
      </div>

      <!-- Total Saldo -->
      <div class="card" id="card-total-balance">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
          <span class="material-icons-round" style="color: var(--primary); font-size: 20px;">account_balance</span>
          <div class="card-title" style="margin-bottom: 0;">Total Saldo</div>
        </div>
        <div class="card-value" style="font-size: 1.5rem; color: var(--primary);">${M(V.getTotalBalance())}</div>
        <div class="card-subtitle" style="color: var(--on-surface-variant);">${n.accounts.length} rekening aktif</div>
      </div>

      <!-- Arus Kas Bulan Ini -->
      <div class="card" id="card-cash-flow">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
          <span class="material-icons-round" style="color: var(--success); font-size: 20px;">swap_vert</span>
          <div class="card-title" style="margin-bottom: 0;">Arus Kas ${Rn()}</div>
        </div>
        <div style="display: flex; gap: 12px; margin-top: 8px;">
          <div>
            <div style="font-size: 11px; color: var(--success); font-weight: 600;">▲ Masuk</div>
            <div style="font-size: 14px; font-weight: 700; color: var(--success);">${M(u,!0)}</div>
          </div>
          <div>
            <div style="font-size: 11px; color: var(--error); font-weight: 600;">▼ Keluar</div>
            <div style="font-size: 14px; font-weight: 700; color: var(--error);">${M(c,!0)}</div>
          </div>
        </div>
      </div>
    </div>
  `}function BE(n){const e=n.toLowerCase();return e.includes("bri")?"bri":e.includes("jago")?"jago":e.includes("bsi")?"bsi":"default"}function FE(n){const e=n.toLowerCase();return e.includes("bri")?"BRI":e.includes("jago")?"JGO":e.includes("bsi")?"BSI":n.slice(0,3).toUpperCase()}function UE(){return`
    <div class="section-header">
      <h2 class="section-title">Rekening Bank</h2>
      <span class="section-action" id="btn-manage-accounts">Kelola</span>
    </div>
    <div class="bank-slider" id="bank-slider">
      ${V.getAccounts().map(e=>{const t=BE(e.bank_name);return`
          <div class="bank-card ${t}" data-account-id="${e.id}">
            <div class="bank-card-icon ${t}">${FE(e.bank_name)}</div>
            <div class="bank-card-name">${e.bank_name}</div>
            <div class="bank-card-owner">${e.owner_name}</div>
            <div class="bank-card-balance">${M(e.balance)}</div>
          </div>
        `}).join("")}
      <div class="bank-card-add" id="btn-add-account">
        <span class="material-icons-round">add</span>
        <span>Tambah</span>
      </div>
    </div>
  `}function $E(){const n=document.getElementById("btn-add-account");n&&n.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("open-account-modal"))});const e=document.getElementById("btn-manage-accounts");e&&e.addEventListener("click",()=>{rr(async()=>{const{default:t}=await Promise.resolve().then(()=>Hh);return{default:t}},void 0).then(({default:t})=>t.navigate("/accounts"))})}function jE(){const n=V.getState(),e=new Date,t=V.getTransactionsByMonth(e.getFullYear(),e.getMonth()),s=n.assets.kpr,r=fn(s.paid,s.total),i=n.settings.transportBudget||6e5,o=t.filter(m=>m.type==="expense"&&m.parent_category==="Transportasi").reduce((m,E)=>m+E.amount,0),c=fn(o,i),u=n.settings.anakBudget||8e5,h=t.filter(m=>m.type==="expense"&&m.for_whom==="Anak").reduce((m,E)=>m+E.amount,0),f=fn(h,u);return`
    <div class="section-header">
      <h2 class="section-title">Analisis Budget</h2>
    </div>
    <div style="display: flex; flex-direction: column; gap: 12px;" class="stagger-children">
      <!-- KPR Progress -->
      <div class="analysis-card">
        <div class="analysis-card-header">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="material-icons-round" style="color: var(--primary); font-size: 20px;">home</span>
            <span class="analysis-card-label">Progres KPR ${s.bank||"BTN"}</span>
          </div>
          <span class="analysis-card-value" style="color: var(--primary);">${r}%</span>
        </div>
        <div class="progress-bar">
          <div class="progress-bar-fill blue" style="width: ${r}%;"></div>
        </div>
        <div class="analysis-card-detail">
          <span>Lunas: ${M(s.paid,!0)}</span>
          <span>Total: ${M(s.total,!0)}</span>
        </div>
      </div>

      <!-- Bensin / Transportasi -->
      <div class="analysis-card">
        <div class="analysis-card-header">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="material-icons-round" style="color: ${c>80?"var(--error)":"var(--tertiary)"}; font-size: 20px;">local_gas_station</span>
            <span class="analysis-card-label">Budget Transportasi</span>
          </div>
          <span class="analysis-card-value" style="color: ${c>80?"var(--error)":"var(--tertiary)"};">${c}%</span>
        </div>
        <div class="progress-bar">
          <div class="progress-bar-fill ${c>80?"red":"gold"}" style="width: ${c}%;"></div>
        </div>
        <div class="analysis-card-detail">
          <span>Terpakai: ${M(o,!0)}</span>
          <span>Budget: ${M(i,!0)}</span>
        </div>
      </div>

      <!-- Keperluan Anak -->
      <div class="analysis-card">
        <div class="analysis-card-header">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="material-icons-round" style="color: var(--success); font-size: 20px;">child_care</span>
            <span class="analysis-card-label">Keperluan Anak</span>
          </div>
          <span class="analysis-card-value" style="color: var(--success);">${f}%</span>
        </div>
        <div class="progress-bar">
          <div class="progress-bar-fill green" style="width: ${f}%;"></div>
        </div>
        <div class="analysis-card-detail">
          <span>Terpakai: ${M(h,!0)}</span>
          <span>Budget: ${M(u,!0)}</span>
        </div>
      </div>
    </div>
  `}function Ga(n=10,e={}){let t=V.getTransactions(e);const s=t.length;if(n&&(t=t.slice(0,n)),t.length===0)return`
      <div class="empty-state">
        <span class="material-icons-round">receipt_long</span>
        <h3>Belum Ada Transaksi</h3>
        <p>Mulai catat pengeluaran dan pemasukan Anda</p>
      </div>
    `;const r=ch(t);let i="";return Object.entries(r).forEach(([o,c])=>{i+=`<div class="transaction-group-header">${o}</div>`,c.forEach(u=>{const h=kE(u.parent_category),f=u.type,m=u.type==="expense"?"-":u.type==="income"?"+":"↔",E=V.getAccountById(u.account_id),S=E?E.bank_name:"";i+=`
        <div class="transaction-item" data-tx-id="${u.id}">
          <div class="transaction-icon ${f}">
            <span class="material-icons-round">${h}</span>
          </div>
          <div class="transaction-info">
            <div class="transaction-desc">${u.description}</div>
            <div class="transaction-meta">
              <span class="badge badge-${(u.paid_by||"").toLowerCase()}">${u.paid_by||"-"}</span>
              ${u.is_together?'<span class="badge badge-together">💕</span>':""}
              <span>${u.sub_category||u.parent_category||""}</span>
            </div>
          </div>
          <div class="transaction-amount">
            <div class="transaction-amount-value ${f}">${m} ${M(u.amount)}</div>
            <div class="transaction-amount-account">${S}</div>
          </div>
        </div>
      `})}),n&&s>n&&(i+=`
      <div style="text-align: center; padding: 16px 0;">
        <a href="#/transactions" class="section-action">Lihat Semua (${s} transaksi) →</a>
      </div>
    `),i}function Wa(){document.querySelectorAll(".transaction-item").forEach(n=>{n.addEventListener("click",()=>{const e=n.dataset.txId;window.dispatchEvent(new CustomEvent("view-transaction",{detail:{id:e}}))})})}function zE(){const n=V.getState();return`
    <div class="page-container animate-fade-in" id="dashboard-page">
      <!-- Greeting -->
      <div style="margin-bottom: 20px;">
        <h1 style="font-size: 1.5rem; font-weight: 800; color: var(--on-surface); letter-spacing: -0.5px;">
          ${KE()}, ${n.settings.userName||"User"} 👋
        </h1>
        <p style="font-size: var(--fs-body); color: var(--on-surface-variant); margin-top: 4px;">
          Berikut ringkasan keuangan keluarga bulan ${Rn()}
        </p>
      </div>

      <!-- Summary Cards -->
      ${OE()}

      <!-- Bank Slider -->
      ${UE()}

      <!-- Analysis -->
      ${jE()}

      <!-- Recent Transactions -->
      <div class="section-header">
        <h2 class="section-title">Transaksi Terbaru</h2>
        <a href="#/transactions" class="section-action">Lihat Semua</a>
      </div>
      <div id="recent-transactions">
        ${Ga(8)}
      </div>
    </div>
  `}function qE(){$E(),Wa()}function KE(){const n=new Date().getHours();return n<11?"Selamat Pagi":n<15?"Selamat Siang":n<18?"Selamat Sore":"Selamat Malam"}let dt={};function HE(){const n=new Date,e=V.getMonthlyExpenses(n.getFullYear(),n.getMonth()),t=V.getMonthlyIncome(n.getFullYear(),n.getMonth()),s=t-e;return`
    <div class="page-container animate-fade-in" id="transactions-page">
      <h1 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 4px;">Transaksi</h1>
      <p style="color: var(--on-surface-variant); font-size: var(--fs-body); margin-bottom: 16px;">
        Riwayat keuangan bulan ${Rn()}
      </p>

      <!-- Monthly Summary Bar -->
      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; margin-bottom: 20px;">
        <div style="background: var(--success-container); border-radius: var(--radius-md); padding: 12px; text-align: center;">
          <div style="font-size: 11px; font-weight: 600; color: var(--success);">Pemasukan</div>
          <div style="font-size: 14px; font-weight: 800; color: var(--success); margin-top: 4px;">${M(t,!0)}</div>
        </div>
        <div style="background: var(--error-container); border-radius: var(--radius-md); padding: 12px; text-align: center;">
          <div style="font-size: 11px; font-weight: 600; color: var(--error);">Pengeluaran</div>
          <div style="font-size: 14px; font-weight: 800; color: var(--error); margin-top: 4px;">${M(e,!0)}</div>
        </div>
        <div style="background: var(--primary-container); border-radius: var(--radius-md); padding: 12px; text-align: center;">
          <div style="font-size: 11px; font-weight: 600; color: var(--primary);">Selisih</div>
          <div style="font-size: 14px; font-weight: 800; color: ${s>=0?"var(--success)":"var(--error)"}; margin-top: 4px;">${M(s,!0)}</div>
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
        ${Ga(null,dt)}
      </div>
    </div>
  `}function GE(){Wa(),document.querySelectorAll("#tx-filters .chip").forEach(e=>{e.addEventListener("click",()=>{document.querySelectorAll("#tx-filters .chip").forEach(s=>s.classList.remove("selected")),e.classList.add("selected");const t=e.dataset.filter;t==="all"?delete dt.type:dt.type=t,Ci()})}),document.querySelectorAll("#tx-paid-filter .chip").forEach(e=>{e.addEventListener("click",()=>{document.querySelectorAll("#tx-paid-filter .chip").forEach(s=>s.classList.remove("selected")),e.classList.add("selected");const t=e.dataset.paid;t==="all"?delete dt.paid_by:dt.paid_by=t,Ci()})});const n=document.getElementById("tx-search");n&&n.addEventListener("input",lh(e=>{const t=e.target.value.trim();t?dt.search=t:delete dt.search,Ci()},300)),WE()}function Ci(){const n=document.getElementById("filtered-transactions");n&&(n.innerHTML=Ga(null,dt),Wa())}async function WE(){const n=document.getElementById("category-chart");if(n)try{const e=await rr(()=>import("./auto-eE5P6S0m.js"),[]),t=e.default||e.Chart,s=new Date,r=V.getCategorySpending(s.getFullYear(),s.getMonth());if(r.length===0){n.parentElement.innerHTML=`
        <div style="text-align: center; padding: 20px; color: var(--outline);">
          <span class="material-icons-round" style="font-size: 32px;">pie_chart</span>
          <p style="margin-top: 8px;">Belum ada data pengeluaran bulan ini</p>
        </div>
      `;return}const i=["#30609d","#9a6a1a","#1b6d2f","#ba1a1a","#7b1fa2","#00695c","#e65100","#283593","#4e342e","#546e7a","#ad1457","#00838f"];new t(n,{type:"doughnut",data:{labels:r.map(o=>o.name),datasets:[{data:r.map(o=>o.amount),backgroundColor:i.slice(0,r.length),borderWidth:2,borderColor:"#fff",hoverOffset:6}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"65%",plugins:{legend:{position:"bottom",labels:{padding:12,usePointStyle:!0,pointStyleWidth:8,font:{family:"'Plus Jakarta Sans'",size:11,weight:"600"}}},tooltip:{callbacks:{label:o=>{const c=o.dataset.data.reduce((h,f)=>h+f,0),u=Math.round(o.parsed/c*100);return` ${o.label}: ${M(o.parsed)} (${u}%)`}},titleFont:{family:"'Plus Jakarta Sans'"},bodyFont:{family:"'Plus Jakarta Sans'"}}}}})}catch(e){console.warn("Chart.js not loaded:",e)}}function QE(){const n=V.getAccounts(),e=V.getTotalBalance();return`
    <div class="page-container animate-fade-in" id="accounts-page">
      <h1 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 4px;">Rekening Bank</h1>
      <p style="color: var(--on-surface-variant); font-size: var(--fs-body); margin-bottom: 20px;">
        Kelola seluruh rekening keluarga
      </p>

      <!-- Total Balance -->
      <div class="net-worth-card" style="margin-bottom: 20px;">
        <div class="net-worth-label">Total Seluruh Saldo</div>
        <div class="net-worth-value">${M(e)}</div>
        <div style="font-size: 13px; opacity: 0.7;">${n.length} rekening terdaftar</div>
      </div>

      <!-- Account Cards -->
      <div style="display: flex; flex-direction: column; gap: 12px;" class="stagger-children" id="account-list">
        ${n.map(t=>JE(t)).join("")}
      </div>

      <!-- Add Account Button -->
      <button class="btn btn-secondary btn-block" style="margin-top: 20px;" id="btn-add-new-account">
        <span class="material-icons-round">add</span>
        Tambah Rekening Baru
      </button>

      <!-- Account Add/Edit Modal -->
      ${YE()}
    </div>
  `}function JE(n){const e=uh(n.bank_name);return`
    <div class="card" style="display: flex; align-items: center; gap: 16px; cursor: pointer;" data-acc-id="${n.id}">
      <div class="bank-card-icon ${e}" style="flex-shrink: 0;">${ZE(n.bank_name)}</div>
      <div style="flex: 1; min-width: 0;">
        <div style="font-weight: 700; font-size: var(--fs-body);">${n.bank_name}</div>
        <div style="font-size: var(--fs-caption); color: var(--on-surface-variant);">
          ${n.owner_name} ${n.is_allowance_account?"• Pegangan":""}
        </div>
      </div>
      <div style="text-align: right; margin-right: 8px;">
        <div style="font-weight: 800; font-size: var(--fs-body); color: var(--primary);">${M(n.balance)}</div>
      </div>
      <div style="display: flex; gap: 4px;">
        <button class="btn-edit-account" data-acc-id="${n.id}" style="color: var(--primary); padding: 8px; border-radius: 50%; background: none; border: none; cursor: pointer;" title="Edit">
          <span class="material-icons-round" style="font-size: 18px;">edit</span>
        </button>
        <button class="btn-delete-account" data-acc-id="${n.id}" style="color: var(--error); padding: 8px; border-radius: 50%; background: none; border: none; cursor: pointer;" title="Hapus">
          <span class="material-icons-round" style="font-size: 18px;">delete_outline</span>
        </button>
      </div>
    </div>
  `}function YE(){return`
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
  `}function XE(){var t;const n=document.getElementById("btn-add-new-account"),e=document.getElementById("acc-modal-backdrop");document.getElementById("acc-modal-sheet"),n==null||n.addEventListener("click",()=>{document.getElementById("acc-modal-title").innerText="Tambah Rekening",document.getElementById("acc-id").value="",xi()}),document.querySelectorAll(".btn-edit-account").forEach(s=>{s.addEventListener("click",r=>{r.stopPropagation();const i=parseInt(s.dataset.accId),o=V.getAccountById(i);o&&(document.getElementById("acc-modal-title").innerText="Edit Rekening",document.getElementById("acc-id").value=o.id,document.getElementById("acc-bank-name").value=o.bank_name,document.getElementById("acc-balance").value=o.balance,document.getElementById("acc-is-allowance").checked=o.is_allowance_account,document.querySelectorAll("#acc-owner-chips .chip").forEach(c=>{c.classList.toggle("selected",c.dataset.value===o.owner_name)}),xi())})}),window.addEventListener("open-account-modal",()=>{document.getElementById("acc-modal-title").innerText="Tambah Rekening",document.getElementById("acc-id").value="",xi()}),e==null||e.addEventListener("click",()=>Dl()),document.querySelectorAll("#acc-owner-chips .chip").forEach(s=>{s.addEventListener("click",()=>{document.querySelectorAll("#acc-owner-chips .chip").forEach(r=>r.classList.remove("selected")),s.classList.add("selected")})}),(t=document.getElementById("acc-form"))==null||t.addEventListener("submit",s=>{var f,m,E,S,P;s.preventDefault();const r=document.getElementById("acc-id").value,i=(m=(f=document.getElementById("acc-bank-name"))==null?void 0:f.value)==null?void 0:m.trim(),o=((E=document.querySelector("#acc-owner-chips .chip.selected"))==null?void 0:E.dataset.value)||"Erwin",c=parseFloat(((S=document.getElementById("acc-balance"))==null?void 0:S.value)||0),u=((P=document.getElementById("acc-is-allowance"))==null?void 0:P.checked)||!1;if(!i){we("Masukkan nama bank","error");return}const h={bank_name:i,owner_name:o,balance:c,is_allowance_account:u,css_class:uh(i).replace("bank-card-icon ","")};r?(V.updateAccount(parseInt(r),h),we("✅ Rekening berhasil diperbarui!")):(V.addAccount(h),we("✅ Rekening berhasil ditambahkan!")),Dl(),window.dispatchEvent(new CustomEvent("data-updated"))}),document.querySelectorAll(".btn-delete-account").forEach(s=>{s.addEventListener("click",r=>{r.stopPropagation();const i=parseInt(s.dataset.accId);confirm("Hapus rekening ini?")&&(V.deleteAccount(i),we("Rekening dihapus"),window.dispatchEvent(new CustomEvent("data-updated")))})})}function xi(){var n,e,t;(n=document.getElementById("acc-form"))==null||n.reset(),(e=document.getElementById("acc-modal-backdrop"))==null||e.classList.add("open"),(t=document.getElementById("acc-modal-sheet"))==null||t.classList.add("open")}function Dl(){var n,e;(n=document.getElementById("acc-modal-backdrop"))==null||n.classList.remove("open"),(e=document.getElementById("acc-modal-sheet"))==null||e.classList.remove("open")}function uh(n){const e=n.toLowerCase();return e.includes("bri")?"bri":e.includes("jago")?"jago":e.includes("bsi")?"bsi":e.includes("tunai")||e.includes("cash")?"tunai":"default"}function ZE(n){const e=n.toLowerCase();return e.includes("bri")?"BRI":e.includes("jago")?"JGO":e.includes("bsi")?"BSI":e.includes("tunai")||e.includes("cash")?"CSH":n.slice(0,3).toUpperCase()}function eb(){const e=V.getState().assets,t=V.getNetWorth(),s=V.getTotalBalance(),r=e.emas,i=r.bsi_gram+r.tring_gram,o=i*r.price_per_gram,c=e.kpr,u=fn(c.paid,c.total);c.total-c.paid;const h=e.arisan||[],f=e.custom||[];return`
    <div class="page-container animate-fade-in" id="assets-page" style="padding-bottom: 100px;">
      <h1 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 4px;">Aset & Kekayaan</h1>
      <p style="color: var(--on-surface-variant); font-size: var(--fs-body); margin-bottom: 20px;">
        Pantau kekayaan bersih keluarga secara real-time
      </p>

      <!-- Net Worth Card -->
      <div class="net-worth-card" style="margin-bottom: 24px;">
        <div class="net-worth-label">Kekayaan Bersih (Net Worth)</div>
        <div class="net-worth-value">${M(t)}</div>
        <div class="net-worth-change up">
          <span class="material-icons-round" style="font-size: 14px;">trending_up</span>
          <span>Termasuk aset emas & ekuitas KPR</span>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; margin-top: 16px; position: relative; z-index: 1;">
          <div style="text-align: center;">
            <div style="font-size: 11px; opacity: 0.6;">💰 Bank</div>
            <div style="font-size: 13px; font-weight: 700;">${M(s,!0)}</div>
          </div>
          <div style="text-align: center;">
            <div style="font-size: 11px; opacity: 0.6;">🪙 Emas</div>
            <div style="font-size: 13px; font-weight: 700;">${M(o,!0)}</div>
          </div>
          <div style="text-align: center;">
            <div style="font-size: 11px; opacity: 0.6;">🏠 KPR Equity</div>
            <div style="font-size: 13px; font-weight: 700;">${M(c.paid,!0)}</div>
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
            <div style="font-size: 1.1rem; font-weight: 800; color: var(--tertiary); margin-top: 4px;">${r.bsi_gram}g</div>
            <div style="font-size: 12px; color: var(--on-tertiary-container); opacity: 0.8;">${M(r.bsi_gram*r.price_per_gram,!0)}</div>
          </div>
          <div style="background: var(--tertiary-container); border-radius: var(--radius-md); padding: 12px;">
            <div style="font-size: 11px; font-weight: 600; color: var(--on-tertiary-container);">Tring</div>
            <div style="font-size: 1.1rem; font-weight: 800; color: var(--tertiary); margin-top: 4px;">${r.tring_gram}g</div>
            <div style="font-size: 12px; color: var(--on-tertiary-container); opacity: 0.8;">${M(r.tring_gram*r.price_per_gram,!0)}</div>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 12px; border-top: 1px solid var(--outline-variant);">
          <div>
            <div style="font-size: 12px; color: var(--on-surface-variant);">Total Emas</div>
            <div style="font-size: 1.25rem; font-weight: 800; color: var(--tertiary);">${i}g</div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 12px; color: var(--on-surface-variant);">Nilai Pasar</div>
            <div style="font-size: 1.25rem; font-weight: 800; color: var(--tertiary);">${M(o)}</div>
          </div>
        </div>
      </div>

      <!-- KPR Section -->
      <div class="asset-card" id="asset-kpr">
        <div class="asset-card-header" style="justify-content: space-between;">
          <div style="display: flex; gap: 12px; align-items: center;">
            <div class="asset-card-icon kpr"><span class="material-icons-round">home</span></div>
            <div>
              <div class="asset-card-title">KPR ${c.bank||"BTN"}</div>
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
                stroke-dashoffset="${2*Math.PI*50*(1-u/100)}"
                stroke-linecap="round" />
            </svg>
            <div style="position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center;">
              <div style="font-size: 1.5rem; font-weight: 800; color: var(--primary);">${u}%</div>
            </div>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px;">
          <div style="background: var(--surface-container); border-radius: var(--radius-md); padding: 12px;">
            <div style="font-size: 11px; color: var(--on-surface-variant);">Sudah Bayar</div>
            <div style="font-size: 14px; font-weight: 800; color: var(--success);">${M(c.paid,!0)}</div>
          </div>
          <div style="background: var(--surface-container); border-radius: var(--radius-md); padding: 12px;">
            <div style="font-size: 11px; color: var(--on-surface-variant);">Iuran/Bulan</div>
            <div style="font-size: 14px; font-weight: 800; color: var(--on-surface);">${M(c.monthly,!0)}</div>
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
              <div class="asset-card-subtitle">${h.length} kelompok aktif</div>
            </div>
          </div>
          <button class="btn btn-secondary" style="padding: 8px; border-radius: 50%; width: 36px; height: 36px;" id="btn-add-arisan">
            <span class="material-icons-round" style="font-size: 18px;">add</span>
          </button>
        </div>

        ${h.map(m=>`
          <div style="background: var(--surface-container); border-radius: var(--radius-md); padding: 12px; margin-bottom: 8px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <div style="font-weight: 700;">${m.name}</div>
              <div style="display: flex; gap: 4px;">
                <button class="btn-edit-arisan" data-id="${m.id}" style="padding: 4px; background: none; border: none; color: var(--primary);"><span class="material-icons-round" style="font-size: 18px;">edit</span></button>
                <button class="btn-delete-arisan" data-id="${m.id}" style="padding: 4px; background: none; border: none; color: var(--error);"><span class="material-icons-round" style="font-size: 18px;">delete</span></button>
              </div>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 8px;">
               <span>Iuran: <b>${M(m.monthly_amount,!0)}</b></span>
               <span>Putaran: <b>${m.current_round}/${m.total_members}</b></span>
            </div>
            <button class="btn btn-block btn-pay-monthly" data-type="arisan" data-id="${m.id}" style="font-size: 12px; padding: 6px; border: 1px dashed var(--primary); color: var(--primary); background: none;">
              Bayar Iuran
            </button>
          </div>
        `).join("")}
      </div>

      <!-- Custom Assets Section -->
      ${f.length>0?`
        <div class="section-header" style="margin-top: 24px;">
          <h2 class="section-title">Aset Lain & Cicilan</h2>
        </div>
        ${f.map(m=>`
          <div class="asset-card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
               <div style="font-weight: 800;">${m.name}</div>
               <button class="btn-delete-custom" data-id="${m.id}" style="color: var(--error); background: none; border: none;"><span class="material-icons-round">delete</span></button>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px;">
              <div style="background: var(--surface-container); padding: 10px; border-radius: var(--radius-sm);">
                <div style="font-size: 10px; opacity: 0.6;">Nilai/Plafon</div>
                <div style="font-weight: 700;">${M(m.total_value||m.total_loan,!0)}</div>
              </div>
              <div style="background: var(--surface-container); padding: 10px; border-radius: var(--radius-sm);">
                <div style="font-size: 10px; opacity: 0.6;">Terbayar</div>
                <div style="font-weight: 700;">${M(m.paid||0,!0)}</div>
              </div>
            </div>
            <button class="btn btn-block btn-pay-monthly" data-type="custom" data-id="${m.id}" style="font-size: 12px; padding: 8px; background: var(--tertiary-container); color: var(--on-tertiary-container);">
              Bayar Cicilan (${M(m.monthly_amount||0,!0)})
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
              <input type="number" step="0.01" class="form-input" id="emas-bsi" value="${r.bsi_gram}" />
            </div>
            <div class="form-group">
              <label class="form-label">Emas Tring/Fisik (gram)</label>
              <input type="number" step="0.01" class="form-input" id="emas-tring" value="${r.tring_gram}" />
            </div>
            <div class="form-group">
              <label class="form-label">Harga Emas Saat Ini (Rp/gram)</label>
              <input type="number" class="form-input" id="emas-price" value="${r.price_per_gram}" />
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
              <input type="text" class="form-input" id="kpr-bank" value="${c.bank}" />
            </div>
            <div class="form-group">
              <label class="form-label">Total Harga Rumah / Plafon</label>
              <input type="number" class="form-input" id="kpr-total" value="${c.total}" />
            </div>
            <div class="form-group">
              <label class="form-label">Sudah Terbayar</label>
              <input type="number" class="form-input" id="kpr-paid" value="${c.paid}" />
            </div>
            <div class="form-group">
              <label class="form-label">Cicilan per Bulan</label>
              <input type="number" class="form-input" id="kpr-monthly" value="${c.monthly}" />
            </div>
            <div class="form-group">
              <label class="form-label">Sisa Tenor (Bulan)</label>
              <input type="number" class="form-input" id="kpr-months" value="${c.remaining_months}" />
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
  `}function tb(){var t,s,r,i,o,c,u,h;const n=document.getElementById("asset-modal-backdrop"),e=()=>{n==null||n.classList.remove("open"),document.querySelectorAll(".modal-sheet").forEach(f=>f.classList.remove("open"))};n==null||n.addEventListener("click",e),(t=document.getElementById("btn-show-add-asset"))==null||t.addEventListener("click",()=>{var f;n.classList.add("open"),(f=document.getElementById("gen-asset-sheet"))==null||f.classList.add("open")}),(s=document.getElementById("btn-edit-emas-trigger"))==null||s.addEventListener("click",()=>{var f;n.classList.add("open"),(f=document.getElementById("modal-edit-emas"))==null||f.classList.add("open")}),(r=document.getElementById("btn-edit-kpr-trigger"))==null||r.addEventListener("click",()=>{var f;n.classList.add("open"),(f=document.getElementById("modal-edit-kpr"))==null||f.classList.add("open")}),(i=document.getElementById("btn-add-arisan"))==null||i.addEventListener("click",()=>{var f;document.getElementById("form-arisan").reset(),document.getElementById("arisan-id").value="",n.classList.add("open"),(f=document.getElementById("modal-edit-arisan"))==null||f.classList.add("open")}),document.querySelectorAll(".btn-pay-monthly").forEach(f=>{f.addEventListener("click",()=>{var D;const m=f.dataset.type,E=f.dataset.id||"";document.getElementById("pending-pay-type").value=m,document.getElementById("pending-pay-id").value=E;const S=V.getAccounts(),P=document.getElementById("acc-picker-list");P.innerHTML=S.map(C=>`
        <div class="card acc-pick-item" data-acc-id="${C.id}" style="display: flex; justify-content: space-between; align-items: center; padding: 12px; cursor: pointer;">
          <div>
            <div style="font-weight: 700;">${C.bank_name}</div>
            <div style="font-size: 11px; opacity: 0.6;">${C.owner_name}</div>
          </div>
          <div style="font-weight: 800; color: var(--primary);">${M(C.balance,!0)}</div>
        </div>
      `).join(""),document.querySelectorAll(".acc-pick-item").forEach(C=>{C.onclick=()=>{const B=parseInt(C.dataset.accId),$=document.getElementById("pending-pay-type").value,H=document.getElementById("pending-pay-id").value;V.payAssetMonthly($,H,B),we("✅ Pembayaran berhasil dicatat!","success"),e(),window.dispatchEvent(new CustomEvent("data-updated"))}}),n.classList.add("open"),(D=document.getElementById("pick-acc-sheet"))==null||D.classList.add("open")})}),(o=document.getElementById("form-emas"))==null||o.addEventListener("submit",f=>{f.preventDefault(),V.updateEmas({bsi_gram:parseFloat(document.getElementById("emas-bsi").value||0),tring_gram:parseFloat(document.getElementById("emas-tring").value||0),price_per_gram:parseInt(document.getElementById("emas-price").value||0)}),window.dispatchEvent(new CustomEvent("data-updated")),e()}),(c=document.getElementById("form-kpr"))==null||c.addEventListener("submit",f=>{f.preventDefault(),V.updateKPR({bank:document.getElementById("kpr-bank").value,total:parseInt(document.getElementById("kpr-total").value||0),paid:parseInt(document.getElementById("kpr-paid").value||0),monthly:parseInt(document.getElementById("kpr-monthly").value||0),remaining_months:parseInt(document.getElementById("kpr-months").value||0)}),window.dispatchEvent(new CustomEvent("data-updated")),e()}),(u=document.getElementById("form-add-gen-asset"))==null||u.addEventListener("submit",f=>{f.preventDefault(),V.addCustomAsset({name:document.getElementById("gen-asset-name").value,total_value:parseInt(document.getElementById("gen-asset-total").value),monthly_amount:parseInt(document.getElementById("gen-asset-monthly").value||0),paid:0}),window.dispatchEvent(new CustomEvent("data-updated")),e()}),document.querySelectorAll(".btn-edit-arisan").forEach(f=>{f.addEventListener("click",()=>{const m=f.dataset.id,E=V.getAssets().arisan.find(S=>S.id===m);E&&(document.getElementById("arisan-id").value=E.id,document.getElementById("arisan-name").value=E.name,document.getElementById("arisan-amount").value=E.monthly_amount,document.getElementById("arisan-members").value=E.total_members,document.getElementById("arisan-turn").value=E.my_turn,document.getElementById("arisan-round").value=E.current_round,n.classList.add("open"),document.getElementById("modal-edit-arisan").classList.add("open"))})}),document.querySelectorAll(".btn-delete-arisan").forEach(f=>{f.addEventListener("click",()=>{confirm("Hapus arisan ini?")&&(V.deleteArisan(f.dataset.id),window.dispatchEvent(new CustomEvent("data-updated")))})}),(h=document.getElementById("form-arisan"))==null||h.addEventListener("submit",f=>{f.preventDefault();const m=document.getElementById("arisan-id").value,E={name:document.getElementById("arisan-name").value,monthly_amount:parseInt(document.getElementById("arisan-amount").value),total_members:parseInt(document.getElementById("arisan-members").value),my_turn:parseInt(document.getElementById("arisan-turn").value),current_round:parseInt(document.getElementById("arisan-round").value),is_active:!0};m?V.updateArisan(m,E):V.addArisan(E),window.dispatchEvent(new CustomEvent("data-updated")),e()}),document.querySelectorAll(".btn-delete-custom").forEach(f=>{f.addEventListener("click",()=>{confirm("Hapus aset kustom ini?")&&(V.deleteCustomAsset(f.dataset.id),window.dispatchEvent(new CustomEvent("data-updated")))})})}function nb(){V.getState();const n=new Date,e=sb();return`
    <div class="page-container animate-fade-in" id="insights-page">
      <h1 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 4px;">
        <span class="material-icons-round" style="vertical-align: middle; color: var(--primary); font-size: 28px;">auto_awesome</span>
        AI Insight
      </h1>
      <p style="color: var(--on-surface-variant); font-size: var(--fs-body); margin-bottom: 20px;">
        Analisis keuangan cerdas untuk ${Rn()} ${n.getFullYear()}
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
      
      ${rb()}

      <div class="section-header" style="margin-top: 24px;">
        <h2 class="section-title">Pola Pengeluaran</h2>
      </div>

      ${ib()}

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
  `}function sb(){const n=new Date,e=V.getState(),s=V.getTransactionsByMonth(n.getFullYear(),n.getMonth()).filter(P=>P.type==="expense"),r=s.reduce((P,D)=>P+D.amount,0),i=e.settings.allowanceBudget||15e5,o=V.getAllowanceSpent(),c=[],u=Math.round(o/i*100);u>=80?c.push({title:"Budget Alert",icon:"warning",color:"#e53935",message:`Pegangan ${e.settings.userName} sudah mencapai ${u}% budget. Sisa ${M(i-o)} untuk bulan ini.`,detail:`Budget: ${M(i)} | Terpakai: ${M(o)}`}):u>=50&&c.push({title:"Pemantauan Budget",icon:"info",color:"#fb8c00",message:`${e.settings.userName}, pegangan sudah terpakai ${u}%. Masih ada ${M(i-o)} untuk sisa bulan ini.`,detail:null});const h=s.filter(P=>P.parent_category==="Transportasi").reduce((P,D)=>P+D.amount,0);h>0&&c.push({title:"Transportasi",icon:"directions_car",color:"#9a6a1a",message:`Total pengeluaran transportasi bulan ini: ${M(h)}. ${h>5e5?"Cukup tinggi, pertimbangkan efisiensi perjalanan LDM.":"Masih terkendali, pertahankan!"}`,detail:null});const f=5e5,m=s.filter(P=>P.sub_category==="Groceries"||P.parent_category==="Makanan & Minuman").reduce((P,D)=>P+D.amount,0);m<f&&m>0&&c.push({title:"Apresiasi! 🎉",icon:"celebration",color:"#43a047",message:`${e.settings.spouseName}, bulan ini pengeluaran makanan & groceries ${M(m,!0)}. Hemat ${M(f-m,!0)} yang bisa dialokasikan ke investasi emas!`,detail:null});const E=s.filter(P=>P.is_together);if(E.length>0){const P=E.reduce((D,C)=>D+C.amount,0);c.push({title:"Quality Time 💕",icon:"favorite",color:"#e91e63",message:`Bulan ini ada ${E.length} transaksi saat Together Mode aktif, total ${M(P)}. Waktu berkualitas bersama keluarga itu priceless!`,detail:null})}const S=s.filter(P=>P.for_whom==="Anak").reduce((P,D)=>P+D.amount,0);return S>0&&c.push({title:"Keperluan Anak",icon:"child_care",color:"#1565c0",message:`Total pengeluaran untuk anak bulan ini: ${M(S)}. Investasi terbaik adalah pendidikan anak.`,detail:null}),c.push({title:"Ringkasan Bulanan",icon:"summarize",color:"#30609d",message:`Total pengeluaran ${Rn()}: ${M(r)} dari ${s.length} transaksi. Saya terus memantau dan akan memberikan insight yang lebih akurat seiring bertambahnya data.`,detail:null}),c}function rb(){const n=V.getBudgetPerformance(),e=n.total||1,t=Math.round(n.needs/e*100),s=Math.round(n.wants/e*100),r=Math.round(n.savings/e*100);return`
    <div class="card" style="padding: 20px;">
      <div style="font-size: 13px; color: var(--on-surface-variant); margin-bottom: 20px; text-align: center;">
        Target Ideal: <b style="color: var(--primary);">50%</b> Pokok | <b style="color: var(--tertiary);">30%</b> Keinginan | <b style="color: var(--success);">20%</b> Investasi
      </div>

      <div style="height: 32px; width: 100%; display: flex; border-radius: 16px; overflow: hidden; background: var(--surface-container); margin-bottom: 24px; box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);">
        <div style="width: ${t}%; background: var(--primary); transition: width 1s ease;"></div>
        <div style="width: ${s}%; background: var(--tertiary); transition: width 1s ease;"></div>
        <div style="width: ${r}%; background: var(--success); transition: width 1s ease;"></div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px;">
        <div style="text-align: center;">
          <div style="font-size: 20px; font-weight: 800; color: var(--primary);">${t}%</div>
          <div style="font-size: 11px; font-weight: 700; color: var(--on-surface-variant);">KEBUTUHAN</div>
          <div style="font-size: 10px; color: var(--outline); margin-top: 2px;">${M(n.needs,!0)}</div>
        </div>
        <div style="text-align: center; border-left: 1px solid var(--outline-variant); border-right: 1px solid var(--outline-variant);">
          <div style="font-size: 20px; font-weight: 800; color: var(--tertiary);">${s}%</div>
          <div style="font-size: 11px; font-weight: 700; color: var(--on-surface-variant);">KEINGINAN</div>
          <div style="font-size: 10px; color: var(--outline); margin-top: 2px;">${M(n.wants,!0)}</div>
        </div>
        <div style="text-align: center;">
          <div style="font-size: 20px; font-weight: 800; color: var(--success);">${r}%</div>
          <div style="font-size: 11px; font-weight: 700; color: var(--on-surface-variant);">INVESTASI</div>
          <div style="font-size: 10px; color: var(--outline); margin-top: 2px;">${M(n.savings,!0)}</div>
        </div>
      </div>

      ${s>30?`
        <div style="margin-top: 20px; padding: 12px; background: #fffcf0; border: 1px solid #ffe082; border-radius: var(--radius-md); display: flex; gap: 12px; align-items: flex-start;">
          <span class="material-icons-round" style="color: #f57c00; font-size: 20px;">priority_high</span>
          <div style="font-size: 12px; color: #5d4037; line-height: 1.5;">
            <b>Waspada!</b> Alokasi keinginan Anda (<b>${s}%</b>) sudah melebihi batas ideal 30%. Coba cek jajan di luar atau belanja impulsif bulan ini.
          </div>
        </div>
      `:""}
    </div>
  `}function ib(){var s;const n=new Date,e=V.getCategorySpending(n.getFullYear(),n.getMonth());if(e.length===0)return'<div style="text-align: center; padding: 20px; color: var(--outline);">Belum ada data</div>';const t=((s=e[0])==null?void 0:s.amount)||1;return`
    <div class="card">
      ${e.map((r,i)=>{const o=Math.round(r.amount/t*100),c=["#30609d","#9a6a1a","#1b6d2f","#ba1a1a","#7b1fa2","#00695c","#e65100","#283593"],u=c[i%c.length];return`
          <div style="margin-bottom: 12px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
              <span style="font-size: 13px; font-weight: 600; color: var(--on-surface);">${r.name}</span>
              <span style="font-size: 13px; font-weight: 700; color: ${u};">${M(r.amount,!0)}</span>
            </div>
            <div style="width: 100%; height: 6px; background: var(--surface-container); border-radius: 3px; overflow: hidden;">
              <div style="width: ${o}%; height: 100%; background: ${u}; border-radius: 3px; transition: width 0.8s ease;"></div>
            </div>
          </div>
        `}).join("")}
    </div>
  `}function ab(){}function ob(){const e=V.getState().settings;return`
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
  `}function cb(){const n=document.getElementById("settings-form");n&&n.addEventListener("submit",e=>{e.preventDefault();const t={userName:document.getElementById("set-user-name").value.trim(),spouseName:document.getElementById("set-spouse-name").value.trim(),allowanceBudget:parseInt(document.getElementById("set-allowance").value||0),transportBudget:parseInt(document.getElementById("set-transport").value||0),anakBudget:parseInt(document.getElementById("set-anak").value||0),geminiApiKey:document.getElementById("set-ai-key").value.trim()};V.updateSettings(t),we("✅ Pengaturan berhasil disimpan!"),setTimeout(()=>{window.dispatchEvent(new CustomEvent("data-updated"))},500)})}function lb(){return`
    <div class="page-container animate-fade-in" style="display: flex; align-items: center; justify-content: center; min-height: 80vh;">
      <div class="card" style="width: 100%; max-width: 400px; padding: 32px; text-align: center;">
        <div style="margin-bottom: 32px;">
          <div style="background: var(--primary); color: white; width: 64px; height: 64px; border-radius: 20px; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; box-shadow: 0 8px 16px rgba(var(--primary-rgb), 0.3);">
            <span class="material-icons-round" style="font-size: 32px;">cloud_sync</span>
          </div>
          <h1 style="font-size: 1.5rem; font-weight: 800; color: var(--on-surface);">Aktivasi Cloud Sync</h1>
          <p style="color: var(--on-surface-variant); font-size: 14px; margin-top: 8px;">
            Menghubungkan HP Papa & Mama ke database keluarga terpusat.
          </p>
        </div>

        <form id="login-form">
          <div class="form-group" style="text-align: left;">
            <label class="form-label">Email Keluarga</label>
            <input type="email" class="form-input" id="login-email" value="erwinwimpy@gmail.com" readonly style="background: var(--surface-container); color: var(--on-surface-variant);" />
          </div>
          <div class="form-group" style="text-align: left; margin-bottom: 24px;">
            <label class="form-label">PIN / Password Keluarga</label>
            <input type="password" class="form-input" id="login-password" value="adam123" readonly style="background: var(--surface-container); color: var(--on-surface-variant);" />
          </div>

          <button type="submit" class="btn btn-primary btn-block" style="padding: 18px; font-weight: 700;" id="btn-login-submit">
            Hubungkan ke Brankas Cloud
          </button>
        </form>

        <div style="margin-top: 24px; padding: 12px; background: #e3f2fd; border-radius: 12px; border: 1px dashed #2196f3;">
           <p style="font-size: 11px; color: #1565c0; line-height: 1.5; margin: 0;">
             <span class="material-icons-round" style="font-size: 14px; vertical-align: middle;">verified</span> 
             Gunakan tombol di atas pada HP Papa dan HP Mama untuk mensinkronkan data secara real-time.
           </p>
        </div>
      </div>
    </div>
  `}function dh(){var e;const n=document.getElementById("btn-login-submit");(e=document.getElementById("login-form"))==null||e.addEventListener("submit",async t=>{t.preventDefault();const s="erwinwimpy@gmail.com",r="adam123";try{n.disabled=!0,n.innerHTML='<div class="spinner" style="width: 20px; height: 20px; border-width: 2px; margin: 0 auto;"></div>';try{await xm(ps,s,r),we("✅ Berhasil Terhubung ke Cloud!")}catch(i){if(i.code==="auth/user-not-found"||i.code==="auth/invalid-credential")try{const o=await Cm(ps,s,r);await Nm(o.user,{displayName:"Keluarga Adam"}),we("✨ Brankas Cloud Berhasil Diaktifkan!")}catch(o){throw o}else throw i}}catch(i){console.error(i);let o=`Gagal: ${i.code||"Unknown Error"}`;i.code==="auth/operation-not-allowed"?o="⚠️ Error: Email/Password belum diaktifkan di Firebase Console!":i.code==="auth/invalid-api-key"?o="⚠️ Error: API Key Firebase tidak valid!":i.code==="auth/network-request-failed"&&(o="⚠️ Error: Koneksi internet bermasalah."),we(o,"error"),n.disabled=!1,n.innerText="Hubungkan ke Brankas Cloud"}})}const ra=document.getElementById("app"),Nl={"/":{render:zE,init:qE},"/transactions":{render:HE,init:GE},"/accounts":{render:QE,init:XE},"/assets":{render:eb,init:tb},"/insights":{render:nb,init:ab},"/settings":{render:ob,init:cb},"/login":{render:lb,init:dh}};let hh=!1;Mm(ps,async n=>{const e=window.location.hash.slice(1)||"/";n?(V.sync(n),e==="/login"?wt.navigate("/"):Qa(e)):(V.sync(null),wt.navigate("/login")),hh=!0});function Qa(n){const e=Nl[n]||Nl["/"];if(n==="/login"){ra.innerHTML=e.render(),dh();return}ra.innerHTML=`
    ${EE()}
    ${wE()}
    ${e.render()}
    ${AE()}
    ${xE()}
    ${VE()}
  `,bE(),SE(),DE(),LE(),e.init(),TE(n),window.scrollTo({top:0,behavior:"instant"})}window.addEventListener("DOMContentLoaded",()=>{hh||(ra.innerHTML='<div style="display:flex;align-items:center;justify-content:center;height:80vh;"><div class="spinner-container"><div class="spinner"></div></div></div>'),window.addEventListener("logout",async()=>{confirm("Keluar dari akun keluarga?")&&await Om(ps)}),wt.start()});window.addEventListener("popstate",()=>{const n=ps.currentUser,e=window.location.hash.slice(1)||"/";!n&&e!=="/login"?wt.navigate("/login"):Qa(e)});window.addEventListener("data-updated",()=>{const n=wt.getCurrentPath();Qa(n)});function ub(){}document.addEventListener("DOMContentLoaded",ub);
