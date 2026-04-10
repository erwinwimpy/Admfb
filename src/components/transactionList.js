// ============================================
// CIPTA Finansial — Transaction List
// ============================================

import store from '../data/store.js';
import { formatRupiah, formatDate, groupByDate } from '../utils/helpers.js';
import { getCategoryIcon } from '../data/categories.js';

export function renderTransactionList(limit = 10, filters = {}) {
  let txs = store.getTransactions(filters);
  const total = txs.length;

  if (limit) txs = txs.slice(0, limit);

  if (txs.length === 0) {
    return `
      <div class="empty-state">
        <span class="material-icons-round">receipt_long</span>
        <h3>Belum Ada Transaksi</h3>
        <p>Mulai catat pengeluaran dan pemasukan Anda</p>
      </div>
    `;
  }

  const groups = groupByDate(txs);
  let html = '';

  Object.entries(groups).forEach(([date, items]) => {
    html += `<div class="transaction-group-header">${date}</div>`;
    items.forEach(tx => {
      const icon = getCategoryIcon(tx.parent_category);
      const typeClass = tx.type;
      const prefix = tx.type === 'expense' ? '-' : tx.type === 'income' ? '+' : '↔';
      const account = store.getAccountById(tx.account_id);
      const accountName = account ? account.bank_name : '';

      html += `
        <div class="transaction-item" data-tx-id="${tx.id}">
          <div class="transaction-icon ${typeClass}">
            <span class="material-icons-round">${icon}</span>
          </div>
          <div class="transaction-info">
            <div class="transaction-desc">${tx.description}</div>
            <div class="transaction-meta">
              <span class="badge badge-${(tx.paid_by || '').toLowerCase()}">${tx.paid_by || '-'}</span>
              ${tx.is_together ? '<span class="badge badge-together">💕</span>' : ''}
              <span>${tx.sub_category || tx.parent_category || ''}</span>
            </div>
          </div>
          <div class="transaction-amount">
            <div class="transaction-amount-value ${typeClass}">${prefix} ${formatRupiah(tx.amount)}</div>
            <div class="transaction-amount-account">${accountName}</div>
          </div>
        </div>
      `;
    });
  });

  if (limit && total > limit) {
    html += `
      <div style="text-align: center; padding: 16px 0;">
        <a href="#/transactions" class="section-action">Lihat Semua (${total} transaksi) →</a>
      </div>
    `;
  }

  return html;
}

export function initTransactionListEvents() {
  document.querySelectorAll('.transaction-item').forEach(item => {
    item.addEventListener('click', () => {
      const txId = item.dataset.txId;
      window.dispatchEvent(new CustomEvent('view-transaction', { detail: { id: txId } }));
    });
  });
}
