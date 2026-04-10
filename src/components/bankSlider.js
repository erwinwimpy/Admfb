// ============================================
// CIPTA Finansial — Bank Slider
// ============================================

import store from '../data/store.js';
import { formatRupiah } from '../utils/helpers.js';

function getBankIcon(bankName) {
  const name = bankName.toLowerCase();
  if (name.includes('bri')) return 'bri';
  if (name.includes('jago')) return 'jago';
  if (name.includes('bsi')) return 'bsi';
  return 'default';
}

function getBankShort(bankName) {
  const name = bankName.toLowerCase();
  if (name.includes('bri')) return 'BRI';
  if (name.includes('jago')) return 'JGO';
  if (name.includes('bsi')) return 'BSI';
  return bankName.slice(0, 3).toUpperCase();
}

export function renderBankSlider() {
  const accounts = store.getAccounts();

  return `
    <div class="section-header">
      <h2 class="section-title">Rekening Bank</h2>
      <span class="section-action" id="btn-manage-accounts">Kelola</span>
    </div>
    <div class="bank-slider" id="bank-slider">
      ${accounts.map(acc => {
        const cls = getBankIcon(acc.bank_name);
        return `
          <div class="bank-card ${cls}" data-account-id="${acc.id}">
            <div class="bank-card-icon ${cls}">${getBankShort(acc.bank_name)}</div>
            <div class="bank-card-name">${acc.bank_name}</div>
            <div class="bank-card-owner">${acc.owner_name}</div>
            <div class="bank-card-balance">${formatRupiah(acc.balance)}</div>
          </div>
        `;
      }).join('')}
      <div class="bank-card-add" id="btn-add-account">
        <span class="material-icons-round">add</span>
        <span>Tambah</span>
      </div>
    </div>
  `;
}

export function initBankSliderEvents() {
  const addBtn = document.getElementById('btn-add-account');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent('open-account-modal'));
    });
  }

  const manageBtn = document.getElementById('btn-manage-accounts');
  if (manageBtn) {
    manageBtn.addEventListener('click', () => {
      import('../router.js').then(({ default: router }) => router.navigate('/accounts'));
    });
  }
}
