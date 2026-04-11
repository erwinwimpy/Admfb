// ============================================
// CIPTA Finansial — Transaction Modal
// ============================================

import store from '../data/store.js';
import CATEGORIES, { getSubCategories } from '../data/categories.js';
import { showToast } from '../utils/helpers.js';

let isOpen = false;

export function renderTransactionModal() {
  const accounts = store.getAccounts();
  const state = store.getState();

  return `
    <div class="modal-backdrop" id="tx-modal-backdrop"></div>
    <div class="modal-sheet" id="tx-modal-sheet">
      <div class="modal-handle"></div>
      <div class="modal-content">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--sp-lg);">
          <h2 class="modal-title" id="tx-modal-title" style="margin-bottom: 0;">Tambah Transaksi</h2>
          <button type="button" id="tx-modal-close" class="btn-icon">
            <span class="material-icons-round">close</span>
          </button>
        </div>

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
                ${accounts.map(a => `<option value="${a.id}">${a.bank_name}</option>`).join('')}
              </select>
            </div>
            <div class="form-group" id="tx-to-account-group" style="display: none;">
              <label class="form-label">Ke Rekening</label>
              <select class="form-select" id="tx-to-account">
                ${accounts.map(a => `<option value="${a.id}">${a.bank_name}</option>`).join('')}
              </select>
            </div>
          </div>

          <!-- Category -->
          <div class="form-row" id="tx-category-row">
            <div class="form-group">
              <label class="form-label">Kategori</label>
              <select class="form-select" id="tx-category">
                <option value="">Pilih Kategori</option>
                ${CATEGORIES.map(c => `<option value="${c.name}">${c.name}</option>`).join('')}
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
                <button type="button" class="chip ${state.settings.togetherMode ? '' : 'selected'}" data-value="Erwin">Papa</button>
                <button type="button" class="chip ${state.settings.togetherMode ? 'selected' : ''}" data-value="Nihad">Mama</button>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Untuk Siapa</label>
              <div class="chip-group" id="tx-for-whom-chips">
                <button type="button" class="chip" data-value="Erwin">Papa</button>
                <button type="button" class="chip" data-value="Nihad">Mama</button>
                <button type="button" class="chip" data-value="Anak">Anak</button>
                <button type="button" class="chip ${state.settings.togetherMode ? 'selected' : ''}" data-value="Bersama">Bersama</button>
              </div>
            </div>
          </div>

          <!-- Date -->
          <div class="form-group">
            <label class="form-label">Tanggal</label>
            <input type="datetime-local" class="form-input" id="tx-date" value="${new Date().toISOString().slice(0, 16)}" />
          </div>

          <!-- Submit -->
          <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 12px; margin-top: 24px;">
            <button type="button" class="btn btn-secondary" id="tx-cancel">Batal</button>
            <button type="submit" class="btn btn-primary" id="tx-submit">
              <span class="material-icons-round">save</span>
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}

export function initTransactionModalEvents() {
  const backdrop = document.getElementById('tx-modal-backdrop');
  const sheet = document.getElementById('tx-modal-sheet');
  const form = document.getElementById('tx-form');

  // Open modal events
  window.addEventListener('open-transaction-modal', (e) => {
    openModal(e.detail?.type || 'expense');
  });

  // Close events
  backdrop?.addEventListener('click', closeModal);
  document.getElementById('tx-modal-close')?.addEventListener('click', closeModal);
  document.getElementById('tx-cancel')?.addEventListener('click', closeModal);

  // Type chips
  document.querySelectorAll('#tx-type-chips .chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('#tx-type-chips .chip').forEach(c => c.classList.remove('selected'));
      chip.classList.add('selected');
      const type = chip.dataset.type;
      const toAccountGroup = document.getElementById('tx-to-account-group');
      const categoryRow = document.getElementById('tx-category-row');
      if (toAccountGroup) toAccountGroup.style.display = type === 'transfer' ? '' : 'none';
      if (categoryRow) categoryRow.style.display = type === 'transfer' ? 'none' : '';
    });
  });

  // Paid by chips
  document.querySelectorAll('#tx-paid-by-chips .chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('#tx-paid-by-chips .chip').forEach(c => c.classList.remove('selected'));
      chip.classList.add('selected');
    });
  });

  // For whom chips
  document.querySelectorAll('#tx-for-whom-chips .chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('#tx-for-whom-chips .chip').forEach(c => c.classList.remove('selected'));
      chip.classList.add('selected');
    });
  });

  // Category change -> update subcategories
  document.getElementById('tx-category')?.addEventListener('change', (e) => {
    const subs = getSubCategories(e.target.value);
    const subSelect = document.getElementById('tx-subcategory');
    if (subSelect) {
      subSelect.innerHTML = `<option value="">Pilih Sub-Kategori</option>` +
        subs.map(s => `<option value="${s}">${s}</option>`).join('');
    }
  });

  // Form submit
  form?.addEventListener('submit', (e) => {
    e.preventDefault();

    const type = document.querySelector('#tx-type-chips .chip.selected')?.dataset.type || 'expense';
    const amount = parseFloat(document.getElementById('tx-amount')?.value || 0);
    const description = document.getElementById('tx-description')?.value || '';
    const accountId = parseInt(document.getElementById('tx-account')?.value);
    const toAccountId = type === 'transfer' ? parseInt(document.getElementById('tx-to-account')?.value) : null;
    const parentCategory = document.getElementById('tx-category')?.value || '';
    const subCategory = document.getElementById('tx-subcategory')?.value || '';
    const paidBy = document.querySelector('#tx-paid-by-chips .chip.selected')?.dataset.value || 'Suami';
    const forWhom = document.querySelector('#tx-for-whom-chips .chip.selected')?.dataset.value || 'Bersama';
    const dateVal = document.getElementById('tx-date')?.value;
    const createdAt = dateVal ? new Date(dateVal).toISOString() : new Date().toISOString();
    const state = store.getState();

    if (!amount || amount <= 0) {
      showToast('Masukkan nominal yang valid', 'error');
      return;
    }

    store.addTransaction({
      account_id: accountId,
      to_account_id: toAccountId,
      amount,
      type,
      description,
      parent_category: type === 'transfer' ? 'Transfer' : parentCategory,
      sub_category: type === 'transfer' ? 'Pindah Buku' : subCategory,
      paid_by: paidBy,
      for_whom: forWhom,
      is_together: state.settings.togetherMode,
      created_at: createdAt
    });

    showToast('✅ Transaksi berhasil disimpan!');
    closeModal();
    window.dispatchEvent(new CustomEvent('data-updated'));
  });
}

function openModal(type = 'expense') {
  const backdrop = document.getElementById('tx-modal-backdrop');
  const sheet = document.getElementById('tx-modal-sheet');
  const title = document.getElementById('tx-modal-title');

  // Reset form
  document.getElementById('tx-form')?.reset();
  document.getElementById('tx-date').value = new Date().toISOString().slice(0, 16);

  // Set type
  document.querySelectorAll('#tx-type-chips .chip').forEach(c => {
    c.classList.toggle('selected', c.dataset.type === type);
  });

  const toAccountGroup = document.getElementById('tx-to-account-group');
  const categoryRow = document.getElementById('tx-category-row');
  if (toAccountGroup) toAccountGroup.style.display = type === 'transfer' ? '' : 'none';
  if (categoryRow) categoryRow.style.display = type === 'transfer' ? 'none' : '';

  // Together mode defaults
  const state = store.getState();
  if (state.settings.togetherMode) {
    document.querySelectorAll('#tx-paid-by-chips .chip').forEach(c => {
      c.classList.toggle('selected', c.dataset.value === 'Istri');
    });
    document.querySelectorAll('#tx-for-whom-chips .chip').forEach(c => {
      c.classList.toggle('selected', c.dataset.value === 'Bersama');
    });
  }

  const titles = { expense: 'Tambah Pengeluaran', income: 'Tambah Pemasukan', transfer: 'Transfer Antar Rekening' };
  if (title) title.textContent = titles[type] || 'Tambah Transaksi';

  backdrop?.classList.add('open');
  sheet?.classList.add('open');
  isOpen = true;
}

function closeModal() {
  document.getElementById('tx-modal-backdrop')?.classList.remove('open');
  document.getElementById('tx-modal-sheet')?.classList.remove('open');
  isOpen = false;
}

export { openModal, closeModal };
