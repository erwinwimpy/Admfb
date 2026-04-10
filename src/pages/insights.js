// ============================================
// CIPTA Finansial — AI Insights Page
// ============================================

import store from '../data/store.js';
import { formatRupiah, getCurrentMonthName } from '../utils/helpers.js';

export function renderInsightsPage() {
  const state = store.getState();
  const now = new Date();
  const insights = generateInsights();

  return `
    <div class="page-container animate-fade-in" id="insights-page">
      <h1 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 4px;">
        <span class="material-icons-round" style="vertical-align: middle; color: var(--primary); font-size: 28px;">auto_awesome</span>
        AI Insight
      </h1>
      <p style="color: var(--on-surface-variant); font-size: var(--fs-body); margin-bottom: 20px;">
        Analisis keuangan cerdas untuk ${getCurrentMonthName()} ${now.getFullYear()}
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
        ${insights.map(insight => `
          <div class="ai-bubble" style="border-left: 3px solid ${insight.color};">
            <div class="ai-bubble-header">
              <div class="ai-bubble-avatar" style="background: ${insight.color};">
                <span class="material-icons-round" style="font-size: 14px;">${insight.icon}</span>
              </div>
              <span class="ai-bubble-name">${insight.title}</span>
            </div>
            <div class="ai-bubble-text">${insight.message}</div>
            ${insight.detail ? `
              <div style="margin-top: 8px; padding: 8px 12px; background: rgba(0,0,0,0.04); border-radius: var(--radius-sm); font-size: 12px; color: var(--on-surface-variant);">
                ${insight.detail}
              </div>
            ` : ''}
          </div>
        `).join('')}
      </div>

      <!-- Spending Patterns -->
      <div class="section-header" style="margin-top: 24px;">
        <h2 class="section-title">Snapshot 50 / 30 / 20</h2>
      </div>
      
      ${renderBudgetRuleChart()}

      <div class="section-header" style="margin-top: 24px;">
        <h2 class="section-title">Pola Pengeluaran</h2>
      </div>

      ${renderSpendingPatterns()}

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
  `;
}

function generateInsights() {
  const now = new Date();
  const state = store.getState();
  const monthTxs = store.getTransactionsByMonth(now.getFullYear(), now.getMonth());
  const expenses = monthTxs.filter(t => t.type === 'expense');
  const totalExpense = expenses.reduce((s, t) => s + t.amount, 0);
  const allowanceBudget = state.settings.allowanceBudget || 1500000;
  const allowanceSpent = store.getAllowanceSpent();

  const insights = [];

  // Budget Alert for Pegangan
  const allowancePercent = Math.round((allowanceSpent / allowanceBudget) * 100);
  if (allowancePercent >= 80) {
    insights.push({
      title: 'Budget Alert',
      icon: 'warning',
      color: '#e53935',
      message: `Pegangan ${state.settings.userName} sudah mencapai ${allowancePercent}% budget. Sisa ${formatRupiah(allowanceBudget - allowanceSpent)} untuk bulan ini.`,
      detail: `Budget: ${formatRupiah(allowanceBudget)} | Terpakai: ${formatRupiah(allowanceSpent)}`
    });
  } else if (allowancePercent >= 50) {
    insights.push({
      title: 'Pemantauan Budget',
      icon: 'info',
      color: '#fb8c00',
      message: `${state.settings.userName}, pegangan sudah terpakai ${allowancePercent}%. Masih ada ${formatRupiah(allowanceBudget - allowanceSpent)} untuk sisa bulan ini.`,
      detail: null
    });
  }

  // Transport spending
  const bensinSpent = expenses
    .filter(t => t.parent_category === 'Transportasi')
    .reduce((s, t) => s + t.amount, 0);
  if (bensinSpent > 0) {
    insights.push({
      title: 'Transportasi',
      icon: 'directions_car',
      color: '#9a6a1a',
      message: `Total pengeluaran transportasi bulan ini: ${formatRupiah(bensinSpent)}. ${bensinSpent > 500000 ? 'Cukup tinggi, pertimbangkan efisiensi perjalanan LDM.' : 'Masih terkendali, pertahankan!'}`,
      detail: null
    });
  }

  // Appreciation for saving
  const groceriesBudget = 500000;
  const groceriesSpent = expenses
    .filter(t => t.sub_category === 'Groceries' || t.parent_category === 'Makanan & Minuman')
    .reduce((s, t) => s + t.amount, 0);
  if (groceriesSpent < groceriesBudget && groceriesSpent > 0) {
    insights.push({
      title: 'Apresiasi! 🎉',
      icon: 'celebration',
      color: '#43a047',
      message: `${state.settings.spouseName}, bulan ini pengeluaran makanan & groceries ${formatRupiah(groceriesSpent, true)}. Hemat ${formatRupiah(groceriesBudget - groceriesSpent, true)} yang bisa dialokasikan ke investasi emas!`,
      detail: null
    });
  }

  // Together Mode stats
  const togetherTxs = expenses.filter(t => t.is_together);
  if (togetherTxs.length > 0) {
    const togetherTotal = togetherTxs.reduce((s, t) => s + t.amount, 0);
    insights.push({
      title: 'Quality Time 💕',
      icon: 'favorite',
      color: '#e91e63',
      message: `Bulan ini ada ${togetherTxs.length} transaksi saat Together Mode aktif, total ${formatRupiah(togetherTotal)}. Waktu berkualitas bersama keluarga itu priceless!`,
      detail: null
    });
  }

  // Child expenses
  const anakSpent = expenses.filter(t => t.for_whom === 'Anak').reduce((s, t) => s + t.amount, 0);
  if (anakSpent > 0) {
    insights.push({
      title: 'Keperluan Anak',
      icon: 'child_care',
      color: '#1565c0',
      message: `Total pengeluaran untuk anak bulan ini: ${formatRupiah(anakSpent)}. Investasi terbaik adalah pendidikan anak.`,
      detail: null
    });
  }

  // General summary
  insights.push({
    title: 'Ringkasan Bulanan',
    icon: 'summarize',
    color: '#30609d',
    message: `Total pengeluaran ${getCurrentMonthName()}: ${formatRupiah(totalExpense)} dari ${expenses.length} transaksi. Saya terus memantau dan akan memberikan insight yang lebih akurat seiring bertambahnya data.`,
    detail: null
  });

  return insights;
}

function renderBudgetRuleChart() {
  const perf = store.getBudgetPerformance();
  const total = perf.total || 1;
  const pNeeds = Math.round((perf.needs / total) * 100);
  const pWants = Math.round((perf.wants / total) * 100);
  const pSavings = Math.round((perf.savings / total) * 100);

  return `
    <div class="card" style="padding: 20px;">
      <div style="font-size: 13px; color: var(--on-surface-variant); margin-bottom: 20px; text-align: center;">
        Target Ideal: <b style="color: var(--primary);">50%</b> Pokok | <b style="color: var(--tertiary);">30%</b> Keinginan | <b style="color: var(--success);">20%</b> Investasi
      </div>

      <div style="height: 32px; width: 100%; display: flex; border-radius: 16px; overflow: hidden; background: var(--surface-container); margin-bottom: 24px; box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);">
        <div style="width: ${pNeeds}%; background: var(--primary); transition: width 1s ease;"></div>
        <div style="width: ${pWants}%; background: var(--tertiary); transition: width 1s ease;"></div>
        <div style="width: ${pSavings}%; background: var(--success); transition: width 1s ease;"></div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px;">
        <div style="text-align: center;">
          <div style="font-size: 20px; font-weight: 800; color: var(--primary);">${pNeeds}%</div>
          <div style="font-size: 11px; font-weight: 700; color: var(--on-surface-variant);">KEBUTUHAN</div>
          <div style="font-size: 10px; color: var(--outline); margin-top: 2px;">${formatRupiah(perf.needs, true)}</div>
        </div>
        <div style="text-align: center; border-left: 1px solid var(--outline-variant); border-right: 1px solid var(--outline-variant);">
          <div style="font-size: 20px; font-weight: 800; color: var(--tertiary);">${pWants}%</div>
          <div style="font-size: 11px; font-weight: 700; color: var(--on-surface-variant);">KEINGINAN</div>
          <div style="font-size: 10px; color: var(--outline); margin-top: 2px;">${formatRupiah(perf.wants, true)}</div>
        </div>
        <div style="text-align: center;">
          <div style="font-size: 20px; font-weight: 800; color: var(--success);">${pSavings}%</div>
          <div style="font-size: 11px; font-weight: 700; color: var(--on-surface-variant);">INVESTASI</div>
          <div style="font-size: 10px; color: var(--outline); margin-top: 2px;">${formatRupiah(perf.savings, true)}</div>
        </div>
      </div>

      ${pWants > 30 ? `
        <div style="margin-top: 20px; padding: 12px; background: #fffcf0; border: 1px solid #ffe082; border-radius: var(--radius-md); display: flex; gap: 12px; align-items: flex-start;">
          <span class="material-icons-round" style="color: #f57c00; font-size: 20px;">priority_high</span>
          <div style="font-size: 12px; color: #5d4037; line-height: 1.5;">
            <b>Waspada!</b> Alokasi keinginan Anda (<b>${pWants}%</b>) sudah melebihi batas ideal 30%. Coba cek jajan di luar atau belanja impulsif bulan ini.
          </div>
        </div>
      ` : ''}
    </div>
  `;
}

function renderSpendingPatterns() {
  const now = new Date();
  const categorySpending = store.getCategorySpending(now.getFullYear(), now.getMonth());

  if (categorySpending.length === 0) {
    return `<div style="text-align: center; padding: 20px; color: var(--outline);">Belum ada data</div>`;
  }

  const maxAmount = categorySpending[0]?.amount || 1;

  return `
    <div class="card">
      ${categorySpending.map((cat, i) => {
        const barWidth = Math.round((cat.amount / maxAmount) * 100);
        const colors = ['#30609d', '#9a6a1a', '#1b6d2f', '#ba1a1a', '#7b1fa2', '#00695c', '#e65100', '#283593'];
        const color = colors[i % colors.length];
        return `
          <div style="margin-bottom: 12px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
              <span style="font-size: 13px; font-weight: 600; color: var(--on-surface);">${cat.name}</span>
              <span style="font-size: 13px; font-weight: 700; color: ${color};">${formatRupiah(cat.amount, true)}</span>
            </div>
            <div style="width: 100%; height: 6px; background: var(--surface-container); border-radius: 3px; overflow: hidden;">
              <div style="width: ${barWidth}%; height: 100%; background: ${color}; border-radius: 3px; transition: width 0.8s ease;"></div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

export function initInsightsPageEvents() {
  // Future: interactive AI chat
}
