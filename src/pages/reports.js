// ============================================
// CIPTA Finansial — Reports Page
// ============================================

import store from '../data/store.js';
import { formatRupiah, getCurrentMonthName, showToast } from '../utils/helpers.js';
import { exportToExcel, exportToPDF } from '../utils/exporter.js';

let currentRange = 1; // months

export function renderReportsPage() {
  const state = store.getState();
  const summary = calculateSummary(currentRange);

  return `
    <div class="page-container animate-fade-in" id="reports-page">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
        <h1 style="font-size: 1.5rem; font-weight: 800;">Laporan</h1>
        <div class="header-logo" style="margin-right:0;">
           <span class="material-icons-round" style="color: var(--primary);">assessment</span>
        </div>
      </div>
      <p style="color: var(--on-surface-variant); font-size: var(--fs-body); margin-bottom: 16px;">
        Analisis perbandingan & cetak rekap keuangan
      </p>

      <!-- Range Selector -->
      <div class="card" style="padding: 12px; margin-bottom: 16px; background: var(--surface-container-low);">
        <label class="form-label" style="font-size: 12px;">Rentang Waktu Rekapan:</label>
        <div class="chip-group" id="report-range-chips">
          <button class="chip ${currentRange === 1 ? 'selected' : ''}" data-range="1">1 Bulan</button>
          <button class="chip ${currentRange === 3 ? 'selected' : ''}" data-range="3">3 Bulan</button>
          <button class="chip ${currentRange === 6 ? 'selected' : ''}" data-range="6">6 Bulan</button>
          <button class="chip ${currentRange === 12 ? 'selected' : ''}" data-range="12">1 Tahun</button>
        </div>
      </div>

      <!-- Export Buttons -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px;">
        <button class="btn btn-secondary" id="btn-export-excel" style="background: white; border-color: #2e7d32; color: #2e7d32;">
          <span class="material-icons-round">table_view</span> Excel
        </button>
        <button class="btn btn-secondary" id="btn-export-pdf" style="background: white; border-color: #c62828; color: #c62828;">
          <span class="material-icons-round">picture_as_pdf</span> PDF
        </button>
      </div>

      <!-- PDF Canvas (Hidden or targeted for snapshot) -->
      <div id="report-snapshot-area" style="padding: 16px; background: #f8fafc; border-radius: var(--radius-lg); margin-bottom: 20px; border: 1px solid var(--outline-variant);">
        <div style="text-align: center; margin-bottom: 20px; border-bottom: 2px solid var(--primary); padding-bottom: 12px;">
           <h2 style="margin: 0; color: var(--primary);">Adam Family Budget</h2>
           <p style="margin: 4px 0 0; font-size: 14px; color: var(--on-surface-variant);">Laporan Rekapitulasi Keuangan — ${currentRange} Bulan Terakhir</p>
        </div>

        <!-- Summary Cards -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
          <div class="card" style="padding: 12px; border-left: 4px solid var(--success);">
            <div style="font-size: 11px; font-weight: 700; color: var(--on-surface-variant);">TOTAL MASUK</div>
            <div style="font-size: 16px; font-weight: 800; color: var(--success); margin-top: 4px;">${formatRupiah(summary.totalIncome)}</div>
          </div>
          <div class="card" style="padding: 12px; border-left: 4px solid var(--error);">
            <div style="font-size: 11px; font-weight: 700; color: var(--on-surface-variant);">TOTAL KELUAR</div>
            <div style="font-size: 16px; font-weight: 800; color: var(--error); margin-top: 4px;">${formatRupiah(summary.totalExpense)}</div>
          </div>
        </div>

        <!-- Comparison Chart -->
        <div class="card" style="margin-bottom: 16px;">
          <div style="font-weight: 700; font-size: 13px; margin-bottom: 12px; color: var(--on-surface-variant);">📊 Tren Arus Kas (${currentRange} Bln)</div>
          <div style="height: 200px; position: relative;">
            <canvas id="comp-chart"></canvas>
          </div>
        </div>

        <!-- Category Breakdown -->
        <div class="card">
          <div style="font-weight: 700; font-size: 13px; margin-bottom: 12px; color: var(--on-surface-variant);">📂 Alokasi Pengeluaran</div>
          <div style="height: 200px; position: relative;">
            <canvas id="report-cat-chart"></canvas>
          </div>
        </div>
        
        <div style="margin-top: 20px; font-size: 10px; color: var(--outline); text-align: right;">
          Dicetak otomatis oleh Adam Family AI pada ${new Date().toLocaleString('id-ID')}
        </div>
      </div>
    </div>
  `;
}

export function initReportsPageEvents() {
  // Range Chips
  document.querySelectorAll('#report-range-chips .chip').forEach(chip => {
    chip.addEventListener('click', () => {
      currentRange = parseInt(chip.dataset.range);
      const container = document.getElementById('main-content');
      if (container) {
        container.innerHTML = renderReportsPage();
        initReportsPageEvents();
      }
    });
  });

  // Export Excel
  document.getElementById('btn-export-excel')?.addEventListener('click', () => {
    const txs = getRangeTransactions(currentRange);
    exportToExcel(txs, `Adam_Family_Rekap_${currentRange}Bulan.xlsx`);
    showToast('✅ Berhasil mengekspor Excel');
  });

  // Export PDF
  document.getElementById('btn-export-pdf')?.addEventListener('click', async () => {
    const btn = document.getElementById('btn-export-pdf');
    const originalContent = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<span class="material-icons-round rotate">sync</span> Processing...';
    
    try {
      const area = document.getElementById('report-snapshot-area');
      await exportToPDF(area, `Adam_Family_Laporan_${currentRange}Bulan.pdf`);
      showToast('✅ Berhasil mengekspor PDF');
    } catch (err) {
      console.error(err);
      showToast('❌ Gagal mengekspor PDF', 'error');
    } finally {
      btn.disabled = false;
      btn.innerHTML = originalContent;
    }
  });

  // Draw Charts
  drawCharts();
}

function calculateSummary(months) {
  const txs = getRangeTransactions(months);
  const totalIncome = txs.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const totalExpense = txs.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  return { totalIncome, totalExpense };
}

function getRangeTransactions(months) {
  const allTxs = store.getTransactions();
  const now = new Date();
  const cutoff = new Date();
  cutoff.setMonth(now.getMonth() - (months - 1));
  cutoff.setDate(1);
  cutoff.setHours(0,0,0,0);

  return allTxs.filter(t => new Date(t.created_at) >= cutoff);
}

async function drawCharts() {
  const compCanvas = document.getElementById('comp-chart');
  const catCanvas = document.getElementById('report-cat-chart');
  if (!compCanvas || !catCanvas) return;

  try {
    const chartModule = await import('chart.js/auto');
    const Chart = chartModule.default || chartModule.Chart;

    const txs = getRangeTransactions(currentRange);

    // 1. Comparison Chart (Month by Month)
    const monthlyData = {};
    for (let i = 0; i < currentRange; i++) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const key = `${d.getFullYear()}-${d.getMonth() + 1}`;
      const label = d.toLocaleDateString('id-ID', { month: 'short' });
      monthlyData[key] = { label, income: 0, expense: 0 };
    }

    txs.forEach(t => {
      const d = new Date(t.created_at);
      const key = `${d.getFullYear()}-${d.getMonth() + 1}`;
      if (monthlyData[key]) {
        if (t.type === 'income') monthlyData[key].income += t.amount;
        if (t.type === 'expense') monthlyData[key].expense += t.amount;
      }
    });

    const sortedKeys = Object.keys(monthlyData).sort(); // chronological
    
    new Chart(compCanvas, {
      type: 'bar',
      data: {
        labels: sortedKeys.map(k => monthlyData[k].label),
        datasets: [
          {
            label: 'Masuk',
            data: sortedKeys.map(k => monthlyData[k].income),
            backgroundColor: '#43a047',
            borderRadius: 4
          },
          {
            label: 'Keluar',
            data: sortedKeys.map(k => monthlyData[k].expense),
            backgroundColor: '#e53935',
            borderRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top', labels: { boxWidth: 10, font: { size: 10 } } }
        },
        scales: {
          y: { 
            beginAtZero: true, 
            ticks: { 
              font: { size: 9 },
              callback: (v) => v >= 1000000 ? (v/1000000).toFixed(1) + 'jt' : v
            }
          },
          x: { ticks: { font: { size: 9 } } }
        }
      }
    });

    // 2. Category Breakdown
    const catTotal = {};
    txs.filter(t => t.type === 'expense').forEach(t => {
      catTotal[t.parent_category] = (catTotal[t.parent_category] || 0) + t.amount;
    });

    const categories = Object.keys(catTotal).sort((a,b) => catTotal[b] - catTotal[a]);
    const colors = ['#30609d', '#9a6a1a', '#1b6d2f', '#ba1a1a', '#7b1fa2', '#00695c', '#e65100'];

    new Chart(catCanvas, {
      type: 'doughnut',
      data: {
        labels: categories.slice(0, 7),
        datasets: [{
          data: categories.slice(0, 7).map(c => catTotal[c]),
          backgroundColor: colors,
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
          legend: { 
            position: 'right', 
            labels: { 
              boxWidth: 8, 
              padding: 10,
              font: { size: 10, weight: '600' } 
            } 
          }
        }
      }
    });

  } catch (err) {
    console.error('Chart error:', err);
  }
}
