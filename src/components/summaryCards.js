// ============================================
// CIPTA Finansial — Summary Cards
// ============================================

import store from '../data/store.js';
import { formatRupiah, percentage, getCurrentMonthName } from '../utils/helpers.js';

export function renderSummaryCards() {
  const state = store.getState();
  const now = new Date();
  const allowanceBudget = state.settings.allowanceBudget || 1500000;
  const allowanceSpent = store.getAllowanceSpent();
  const allowanceRemaining = Math.max(0, allowanceBudget - allowanceSpent);
  const allowancePercent = percentage(allowanceSpent, allowanceBudget);

  const danaPusat = store.getDanaPusatBalance();
  const monthlyExpense = store.getMonthlyExpenses(now.getFullYear(), now.getMonth());
  const monthlyIncome = store.getMonthlyIncome(now.getFullYear(), now.getMonth());

  return `
    <div class="bento-grid stagger-children">
      <!-- Pegangan Suami -->
      <div class="card card-gradient" id="card-allowance">
        <div class="card-title">💰 Pegangan ${state.settings.userName || 'Suami'}</div>
        <div class="card-value">${formatRupiah(allowanceRemaining)}</div>
        <div class="card-subtitle">Terpakai ${formatRupiah(allowanceSpent)} dari ${formatRupiah(allowanceBudget)}</div>
        <div style="margin-top: 12px;">
          <div class="progress-bar" style="height: 6px; background: rgba(255,255,255,0.2);">
            <div class="progress-bar-fill ${allowancePercent > 80 ? 'red' : 'blue'}"
                 style="width: ${allowancePercent}%; background: ${allowancePercent > 80 ? 'linear-gradient(90deg, #ffab91, #ff5722)' : 'rgba(255,255,255,0.8)'};"></div>
          </div>
        </div>
      </div>

      <!-- Dana Pusat -->
      <div class="card card-gradient-gold" id="card-dana-pusat">
        <div class="card-title">🏦 Dana Pusat</div>
        <div class="card-value">${formatRupiah(danaPusat)}</div>
        <div class="card-subtitle">Dikelola oleh ${state.settings.spouseName || 'Istri'}</div>
      </div>

      <!-- Total Saldo -->
      <div class="card" id="card-total-balance">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
          <span class="material-icons-round" style="color: var(--primary); font-size: 20px;">account_balance</span>
          <div class="card-title" style="margin-bottom: 0;">Total Saldo</div>
        </div>
        <div class="card-value" style="font-size: 1.5rem; color: var(--primary);">${formatRupiah(store.getTotalBalance())}</div>
        <div class="card-subtitle" style="color: var(--on-surface-variant);">${state.accounts.length} rekening aktif</div>
      </div>

      <!-- Arus Kas Bulan Ini -->
      <div class="card" id="card-cash-flow">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
          <span class="material-icons-round" style="color: var(--success); font-size: 20px;">swap_vert</span>
          <div class="card-title" style="margin-bottom: 0;">Arus Kas ${getCurrentMonthName()}</div>
        </div>
        <div style="display: flex; gap: 12px; margin-top: 8px;">
          <div>
            <div style="font-size: 11px; color: var(--success); font-weight: 600;">▲ Masuk</div>
            <div style="font-size: 14px; font-weight: 700; color: var(--success);">${formatRupiah(monthlyIncome, true)}</div>
          </div>
          <div>
            <div style="font-size: 11px; color: var(--error); font-weight: 600;">▼ Keluar</div>
            <div style="font-size: 14px; font-weight: 700; color: var(--error);">${formatRupiah(monthlyExpense, true)}</div>
          </div>
        </div>
      </div>
    </div>
  `;
}
