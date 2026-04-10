// ============================================
// CIPTA Finansial — Analysis Cards
// ============================================

import store from '../data/store.js';
import { formatRupiah, percentage } from '../utils/helpers.js';

export function renderAnalysisCards() {
  const state = store.getState();
  const now = new Date();
  const txs = store.getTransactionsByMonth(now.getFullYear(), now.getMonth());

  // KPR Progress
  const kpr = state.assets.kpr;
  const kprPercent = percentage(kpr.paid, kpr.total);

  // Transportasi Budget
  const bensinBudget = state.settings.transportBudget || 600000;
  const bensinSpent = txs
    .filter(t => t.type === 'expense' && t.parent_category === 'Transportasi')
    .reduce((s, t) => s + t.amount, 0);
  const bensinPercent = percentage(bensinSpent, bensinBudget);

  // Keperluan Anak Budget
  const anakBudget = state.settings.anakBudget || 800000;
  const anakSpent = txs
    .filter(t => t.type === 'expense' && t.for_whom === 'Anak')
    .reduce((s, t) => s + t.amount, 0);
  const anakPercent = percentage(anakSpent, anakBudget);

  return `
    <div class="section-header">
      <h2 class="section-title">Analisis Budget</h2>
    </div>
    <div style="display: flex; flex-direction: column; gap: 12px;" class="stagger-children">
      <!-- KPR Progress -->
      <div class="analysis-card">
        <div class="analysis-card-header">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="material-icons-round" style="color: var(--primary); font-size: 20px;">home</span>
            <span class="analysis-card-label">Progres KPR ${kpr.bank || 'BTN'}</span>
          </div>
          <span class="analysis-card-value" style="color: var(--primary);">${kprPercent}%</span>
        </div>
        <div class="progress-bar">
          <div class="progress-bar-fill blue" style="width: ${kprPercent}%;"></div>
        </div>
        <div class="analysis-card-detail">
          <span>Lunas: ${formatRupiah(kpr.paid, true)}</span>
          <span>Total: ${formatRupiah(kpr.total, true)}</span>
        </div>
      </div>

      <!-- Bensin / Transportasi -->
      <div class="analysis-card">
        <div class="analysis-card-header">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="material-icons-round" style="color: ${bensinPercent > 80 ? 'var(--error)' : 'var(--tertiary)'}; font-size: 20px;">local_gas_station</span>
            <span class="analysis-card-label">Budget Transportasi</span>
          </div>
          <span class="analysis-card-value" style="color: ${bensinPercent > 80 ? 'var(--error)' : 'var(--tertiary)'};">${bensinPercent}%</span>
        </div>
        <div class="progress-bar">
          <div class="progress-bar-fill ${bensinPercent > 80 ? 'red' : 'gold'}" style="width: ${bensinPercent}%;"></div>
        </div>
        <div class="analysis-card-detail">
          <span>Terpakai: ${formatRupiah(bensinSpent, true)}</span>
          <span>Budget: ${formatRupiah(bensinBudget, true)}</span>
        </div>
      </div>

      <!-- Keperluan Anak -->
      <div class="analysis-card">
        <div class="analysis-card-header">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="material-icons-round" style="color: var(--success); font-size: 20px;">child_care</span>
            <span class="analysis-card-label">Keperluan Anak</span>
          </div>
          <span class="analysis-card-value" style="color: var(--success);">${anakPercent}%</span>
        </div>
        <div class="progress-bar">
          <div class="progress-bar-fill green" style="width: ${anakPercent}%;"></div>
        </div>
        <div class="analysis-card-detail">
          <span>Terpakai: ${formatRupiah(anakSpent, true)}</span>
          <span>Budget: ${formatRupiah(anakBudget, true)}</span>
        </div>
      </div>
    </div>
  `;
}
