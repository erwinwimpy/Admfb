// ============================================
// CIPTA Finansial — Dashboard Page
// ============================================

import { renderSummaryCards } from '../components/summaryCards.js';
import { renderBankSlider, initBankSliderEvents } from '../components/bankSlider.js';
import { renderAnalysisCards } from '../components/analysisCards.js';
import { renderTransactionList, initTransactionListEvents } from '../components/transactionList.js';
import { getCurrentMonthName } from '../utils/helpers.js';
import store from '../data/store.js';

export function renderDashboard() {
  const state = store.getState();
  const greeting = getGreeting();

  return `
    <div class="page-container animate-fade-in" id="dashboard-page">
      <!-- Greeting -->
      <div style="margin-bottom: 20px;">
        <h1 style="font-size: 1.5rem; font-weight: 800; color: var(--on-surface); letter-spacing: -0.5px;">
          ${greeting}, ${state.settings.userName || 'User'} 👋
        </h1>
        <p style="font-size: var(--fs-body); color: var(--on-surface-variant); margin-top: 4px;">
          Berikut ringkasan keuangan keluarga bulan ${getCurrentMonthName()}
        </p>
      </div>

      <!-- Summary Cards -->
      ${renderSummaryCards()}

      <!-- Bank Slider -->
      ${renderBankSlider()}

      <!-- Analysis -->
      ${renderAnalysisCards()}

      <!-- Recent Transactions -->
      <div class="section-header">
        <h2 class="section-title">Transaksi Terbaru</h2>
        <a href="#/transactions" class="section-action">Lihat Semua</a>
      </div>
      <div id="recent-transactions">
        ${renderTransactionList(8)}
      </div>
    </div>
  `;
}

export function initDashboardEvents() {
  initBankSliderEvents();
  initTransactionListEvents();
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 11) return 'Selamat Pagi';
  if (hour < 15) return 'Selamat Siang';
  if (hour < 18) return 'Selamat Sore';
  return 'Selamat Malam';
}
