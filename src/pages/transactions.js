// ============================================
// CIPTA Finansial — Transactions Page
// ============================================

import store from '../data/store.js';
import { renderTransactionList, initTransactionListEvents } from '../components/transactionList.js';
import { formatRupiah, getCurrentMonthName, debounce } from '../utils/helpers.js';

let currentFilters = {};

export function renderTransactionsPage() {
  const now = new Date();
  const monthlyExpense = store.getMonthlyExpenses(now.getFullYear(), now.getMonth());
  const monthlyIncome = store.getMonthlyIncome(now.getFullYear(), now.getMonth());
  const balance = monthlyIncome - monthlyExpense;

  return `
    <div class="page-container animate-fade-in" id="transactions-page">
      <h1 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 4px;">Transaksi</h1>
      <p style="color: var(--on-surface-variant); font-size: var(--fs-body); margin-bottom: 16px;">
        Riwayat keuangan bulan ${getCurrentMonthName()}
      </p>

      <!-- Monthly Summary Bar -->
      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; margin-bottom: 20px;">
        <div style="background: var(--success-container); border-radius: var(--radius-md); padding: 12px; text-align: center;">
          <div style="font-size: 11px; font-weight: 600; color: var(--success);">Pemasukan</div>
          <div style="font-size: 14px; font-weight: 800; color: var(--success); margin-top: 4px;">${formatRupiah(monthlyIncome, true)}</div>
        </div>
        <div style="background: var(--error-container); border-radius: var(--radius-md); padding: 12px; text-align: center;">
          <div style="font-size: 11px; font-weight: 600; color: var(--error);">Pengeluaran</div>
          <div style="font-size: 14px; font-weight: 800; color: var(--error); margin-top: 4px;">${formatRupiah(monthlyExpense, true)}</div>
        </div>
        <div style="background: var(--primary-container); border-radius: var(--radius-md); padding: 12px; text-align: center;">
          <div style="font-size: 11px; font-weight: 600; color: var(--primary);">Selisih</div>
          <div style="font-size: 14px; font-weight: 800; color: ${balance >= 0 ? 'var(--success)' : 'var(--error)'}; margin-top: 4px;">${formatRupiah(balance, true)}</div>
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
        ${renderTransactionList(null, currentFilters)}
      </div>
    </div>
  `;
}

export function initTransactionsPageEvents() {
  initTransactionListEvents();

  // Type filter
  document.querySelectorAll('#tx-filters .chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('#tx-filters .chip').forEach(c => c.classList.remove('selected'));
      chip.classList.add('selected');
      const filter = chip.dataset.filter;
      if (filter === 'all') {
        delete currentFilters.type;
      } else {
        currentFilters.type = filter;
      }
      refreshList();
    });
  });

  // Paid by filter
  document.querySelectorAll('#tx-paid-filter .chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('#tx-paid-filter .chip').forEach(c => c.classList.remove('selected'));
      chip.classList.add('selected');
      const paid = chip.dataset.paid;
      if (paid === 'all') {
        delete currentFilters.paid_by;
      } else {
        currentFilters.paid_by = paid;
      }
      refreshList();
    });
  });

  // Search
  const searchInput = document.getElementById('tx-search');
  if (searchInput) {
    searchInput.addEventListener('input', debounce((e) => {
      const q = e.target.value.trim();
      if (q) {
        currentFilters.search = q;
      } else {
        delete currentFilters.search;
      }
      refreshList();
    }, 300));
  }

  // Draw chart
  drawCategoryChart();
}

function refreshList() {
  const container = document.getElementById('filtered-transactions');
  if (container) {
    container.innerHTML = renderTransactionList(null, currentFilters);
    initTransactionListEvents();
  }
}

async function drawCategoryChart() {
  const canvas = document.getElementById('category-chart');
  if (!canvas) return;

  try {
    const chartModule = await import('chart.js/auto');
    const Chart = chartModule.default || chartModule.Chart;

    const now = new Date();
    const spending = store.getCategorySpending(now.getFullYear(), now.getMonth());

    if (spending.length === 0) {
      canvas.parentElement.innerHTML = `
        <div style="text-align: center; padding: 20px; color: var(--outline);">
          <span class="material-icons-round" style="font-size: 32px;">pie_chart</span>
          <p style="margin-top: 8px;">Belum ada data pengeluaran bulan ini</p>
        </div>
      `;
      return;
    }

    const colors = [
      '#30609d', '#9a6a1a', '#1b6d2f', '#ba1a1a', '#7b1fa2',
      '#00695c', '#e65100', '#283593', '#4e342e', '#546e7a',
      '#ad1457', '#00838f'
    ];

    new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: spending.map(s => s.name),
        datasets: [{
          data: spending.map(s => s.amount),
          backgroundColor: colors.slice(0, spending.length),
          borderWidth: 2,
          borderColor: '#fff',
          hoverOffset: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '65%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 12,
              usePointStyle: true,
              pointStyleWidth: 8,
              font: { family: "'Plus Jakarta Sans'", size: 11, weight: '600' }
            }
          },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
                const pct = Math.round((ctx.parsed / total) * 100);
                return ` ${ctx.label}: ${formatRupiah(ctx.parsed)} (${pct}%)`;
              }
            },
            titleFont: { family: "'Plus Jakarta Sans'" },
            bodyFont: { family: "'Plus Jakarta Sans'" }
          }
        }
      }
    });
  } catch (err) {
    console.warn('Chart.js not loaded:', err);
  }
}

export default renderTransactionsPage;
