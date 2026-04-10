// ============================================
// CIPTA Finansial — Accounts Page
// ============================================

import store from '../data/store.js';
import { formatRupiah, showToast } from '../utils/helpers.js';

export function renderAccountsPage() {
  const accounts = store.getAccounts();
  const totalBalance = store.getTotalBalance();

  return `
    <div class="page-container animate-fade-in" id="accounts-page">
      <h1 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 4px;">Rekening Bank</h1>
      <p style="color: var(--on-surface-variant); font-size: var(--fs-body); margin-bottom: 20px;">
        Kelola seluruh rekening keluarga
      </p>

      <!-- Total Balance -->
      <div class="net-worth-card" style="margin-bottom: 20px;">
        <div class="net-worth-label">Total Seluruh Saldo</div>
        <div class="net-worth-value">${formatRupiah(totalBalance)}</div>
        <div style="font-size: 13px; opacity: 0.7;">${accounts.length} rekening terdaftar</div>
      </div>

      <!-- Account Cards -->
      <div style="display: flex; flex-direction: column; gap: 12px;" class="stagger-children" id="account-list">
        ${accounts.map(acc => renderAccountCard(acc)).join('')}
      </div>

      <!-- Add Account Button -->
      <button class="btn btn-secondary btn-block" style="margin-top: 20px;" id="btn-add-new-account">
        <span class="material-icons-round">add</span>
        Tambah Rekening Baru
      </button>

      <!-- Account Add/Edit Modal -->
      ${renderAccountModal()}
    </div>
  `;
}

function renderAccountCard(acc) {
  const cls = getBankClass(acc.bank_name);
  return `
    <div class="card" style="display: flex; align-items: center; gap: 16px; cursor: pointer;" data-acc-id="${acc.id}">
      <div class="bank-card-icon ${cls}" style="flex-shrink: 0;">${getBankShort(acc.bank_name)}</div>
      <div style="flex: 1; min-width: 0;">
        <div style="font-weight: 700; font-size: var(--fs-body);">${acc.bank_name}</div>
        <div style="font-size: var(--fs-caption); color: var(--on-surface-variant);">
          ${acc.owner_name} ${acc.is_allowance_account ? '• Pegangan' : ''}
        </div>
      </div>
      <div style="text-align: right; margin-right: 8px;">
        <div style="font-weight: 800; font-size: var(--fs-body); color: var(--primary);">${formatRupiah(acc.balance)}</div>
      </div>
      <div style="display: flex; gap: 4px;">
        <button class="btn-edit-account" data-acc-id="${acc.id}" style="color: var(--primary); padding: 8px; border-radius: 50%; background: none; border: none; cursor: pointer;" title="Edit">
          <span class="material-icons-round" style="font-size: 18px;">edit</span>
        </button>
        <button class="btn-delete-account" data-acc-id="${acc.id}" style="color: var(--error); padding: 8px; border-radius: 50%; background: none; border: none; cursor: pointer;" title="Hapus">
          <span class="material-icons-round" style="font-size: 18px;">delete_outline</span>
        </button>
      </div>
    </div>
  `;
}

function renderAccountModal() {
  return `
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
  `;
}

export function initAccountsPageEvents() {
  const addBtn = document.getElementById('btn-add-new-account');
  const backdrop = document.getElementById('acc-modal-backdrop');
  const sheet = document.getElementById('acc-modal-sheet');

  // Open modal (Add)
  addBtn?.addEventListener('click', () => {
    document.getElementById('acc-modal-title').innerText = 'Tambah Rekening';
    document.getElementById('acc-id').value = '';
    openAccountModal();
  });

  // Open modal (Edit)
  document.querySelectorAll('.btn-edit-account').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.accId);
      const acc = store.getAccountById(id);
      if (acc) {
        document.getElementById('acc-modal-title').innerText = 'Edit Rekening';
        document.getElementById('acc-id').value = acc.id;
        document.getElementById('acc-bank-name').value = acc.bank_name;
        document.getElementById('acc-balance').value = acc.balance;
        document.getElementById('acc-is-allowance').checked = acc.is_allowance_account;
        
        // Select chip
        document.querySelectorAll('#acc-owner-chips .chip').forEach(c => {
          c.classList.toggle('selected', c.dataset.value === acc.owner_name);
        });
        
        openAccountModal();
      }
    });
  });

  // Also listen for global event from bank slider
  window.addEventListener('open-account-modal', () => {
    document.getElementById('acc-modal-title').innerText = 'Tambah Rekening';
    document.getElementById('acc-id').value = '';
    openAccountModal();
  });

  // Close modal
  backdrop?.addEventListener('click', () => closeAccountModal());

  // Owner chips
  document.querySelectorAll('#acc-owner-chips .chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('#acc-owner-chips .chip').forEach(c => c.classList.remove('selected'));
      chip.classList.add('selected');
    });
  });

  // Submit (Add or Update)
  document.getElementById('acc-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('acc-id').value;
    const bankName = document.getElementById('acc-bank-name')?.value?.trim();
    const owner = document.querySelector('#acc-owner-chips .chip.selected')?.dataset.value || 'Erwin';
    const balance = parseFloat(document.getElementById('acc-balance')?.value || 0);
    const isAllowance = document.getElementById('acc-is-allowance')?.checked || false;

    if (!bankName) {
      showToast('Masukkan nama bank', 'error');
      return;
    }

    const updates = {
      bank_name: bankName,
      owner_name: owner,
      balance,
      is_allowance_account: isAllowance,
      css_class: getBankClass(bankName).replace('bank-card-icon ', '')
    };

    if (id) {
      store.updateAccount(parseInt(id), updates);
      showToast('✅ Rekening berhasil diperbarui!');
    } else {
      store.addAccount(updates);
      showToast('✅ Rekening berhasil ditambahkan!');
    }

    closeAccountModal();
    window.dispatchEvent(new CustomEvent('data-updated'));
  });

  // Delete account
  document.querySelectorAll('.btn-delete-account').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.accId);
      if (confirm('Hapus rekening ini?')) {
        store.deleteAccount(id);
        showToast('Rekening dihapus');
        window.dispatchEvent(new CustomEvent('data-updated'));
      }
    });
  });
}

function openAccountModal() {
  document.getElementById('acc-form')?.reset();
  document.getElementById('acc-modal-backdrop')?.classList.add('open');
  document.getElementById('acc-modal-sheet')?.classList.add('open');
}

function closeAccountModal() {
  document.getElementById('acc-modal-backdrop')?.classList.remove('open');
  document.getElementById('acc-modal-sheet')?.classList.remove('open');
}

function getBankClass(bankName) {
  const n = bankName.toLowerCase();
  if (n.includes('bri')) return 'bri';
  if (n.includes('jago')) return 'jago';
  if (n.includes('bsi')) return 'bsi';
  if (n.includes('tunai') || n.includes('cash')) return 'tunai';
  return 'default';
}

function getBankShort(bankName) {
  const n = bankName.toLowerCase();
  if (n.includes('bri')) return 'BRI';
  if (n.includes('jago')) return 'JGO';
  if (n.includes('bsi')) return 'BSI';
  if (n.includes('tunai') || n.includes('cash')) return 'CSH';
  return bankName.slice(0, 3).toUpperCase();
}
