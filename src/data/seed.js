// ============================================
// CIPTA Finansial — Sample / Seed Data
// ============================================

import store from './store.js';

const SEED_VERSION = 4;

export function seedData() {
  // Force re-seed if version changed
  const storedVersion = localStorage.getItem('cipta_seed_version');
  if (storedVersion && parseInt(storedVersion) >= SEED_VERSION && store.getState().accounts.length > 0) return;

  // Clear old data and re-seed
  store.reset();

  // Family
  store.setFamily({
    id: 'family-001',
    family_name: 'Keluarga Erwin',
    created_at: new Date().toISOString()
  });

  // Settings
  store.updateSettings({
    userName: 'Pak Erwin',
    spouseName: 'Bunda',
    allowanceBudget: 1500000
  });

  // Accounts
  const briId = store.addAccount({
    bank_name: 'BRI',
    owner_name: 'Suami',
    balance: 8500000,
    is_allowance_account: false,
    css_class: 'bri'
  });

  const jagoId = store.addAccount({
    bank_name: 'Bank Jago',
    owner_name: 'Bersama',
    balance: 3200000,
    is_allowance_account: true,
    css_class: 'jago'
  });

  const bsiId = store.addAccount({
    bank_name: 'BSI',
    owner_name: 'Istri',
    balance: 12000000,
    is_allowance_account: false,
    css_class: 'bsi'
  });

  // Assets
  store.updateEmas({
    bsi_gram: 15.5,
    tring_gram: 3.2,
    price_per_gram: 1650000
  });

  store.updateKPR({
    total: 250000000,
    paid: 87500000,
    monthly: 2100000,
    bank: 'BTN',
    remaining_months: 96
  });

  store.addArisan({
    name: 'Arisan Kantor Dinas',
    monthly_amount: 200000,
    total_members: 15,
    my_turn: 8,
    current_round: 3,
    is_active: true
  });

  store.addArisan({
    name: 'Arisan Ibu PKK',
    monthly_amount: 150000,
    total_members: 20,
    my_turn: 14,
    current_round: 5,
    is_active: true
  });

  // --- Sample Transactions ---
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth();

  const sampleTransactions = [
    // Pendapatan
    {
      account_id: briId,
      amount: 7200000,
      type: 'income',
      description: 'Gaji Pokok + Tunjangan April',
      parent_category: 'Gaji & Pendapatan',
      sub_category: 'Gaji Pokok',
      paid_by: 'Suami',
      for_whom: 'Bersama',
      created_at: new Date(y, m, 1, 8, 0).toISOString()
    },
    {
      account_id: briId,
      amount: 3500000,
      type: 'income',
      description: 'TPP Bulan April',
      parent_category: 'Gaji & Pendapatan',
      sub_category: 'TPP',
      paid_by: 'Suami',
      for_whom: 'Bersama',
      created_at: new Date(y, m, 5, 10, 0).toISOString()
    },
    // Transfer ke Istri (Dana Pusat)
    {
      account_id: briId,
      amount: 6500000,
      type: 'transfer',
      description: 'Transfer Dana Pusat ke BSI Istri',
      parent_category: 'Transfer',
      sub_category: 'Pindah Buku',
      paid_by: 'Suami',
      for_whom: 'Bersama',
      to_account_id: bsiId,
      created_at: new Date(y, m, 1, 9, 0).toISOString()
    },
    // Transfer pegangan ke Jago
    {
      account_id: briId,
      amount: 1500000,
      type: 'transfer',
      description: 'Pegangan Suami ke Jago',
      parent_category: 'Transfer',
      sub_category: 'Pindah Buku',
      paid_by: 'Suami',
      for_whom: 'Suami',
      to_account_id: jagoId,
      created_at: new Date(y, m, 1, 9, 30).toISOString()
    },
    // Pengeluaran Suami
    {
      account_id: jagoId,
      amount: 150000,
      type: 'expense',
      description: 'Bensin Raize Perjalanan LDM',
      parent_category: 'Transportasi',
      sub_category: 'Bensin LDM',
      paid_by: 'Suami',
      for_whom: 'Suami',
      created_at: new Date(y, m, 2, 7, 30).toISOString()
    },
    {
      account_id: jagoId,
      amount: 35000,
      type: 'expense',
      description: 'Tol Barru - Makassar',
      parent_category: 'Transportasi',
      sub_category: 'Tol',
      paid_by: 'Suami',
      for_whom: 'Suami',
      created_at: new Date(y, m, 2, 8, 0).toISOString()
    },
    {
      account_id: jagoId,
      amount: 25000,
      type: 'expense',
      description: 'Makan Siang Warung Pak Baso',
      parent_category: 'Makanan & Minuman',
      sub_category: 'Makan Harian',
      paid_by: 'Suami',
      for_whom: 'Suami',
      created_at: new Date(y, m, 3, 12, 0).toISOString()
    },
    {
      account_id: jagoId,
      amount: 15000,
      type: 'expense',
      description: 'Kopi Kenangan',
      parent_category: 'Makanan & Minuman',
      sub_category: 'Kopi & Minuman',
      paid_by: 'Suami',
      for_whom: 'Suami',
      created_at: new Date(y, m, 3, 15, 0).toISOString()
    },
    {
      account_id: jagoId,
      amount: 150000,
      type: 'expense',
      description: 'Bensin Raize Harian',
      parent_category: 'Transportasi',
      sub_category: 'Bensin Harian',
      paid_by: 'Suami',
      for_whom: 'Suami',
      created_at: new Date(y, m, 5, 7, 0).toISOString()
    },
    {
      account_id: jagoId,
      amount: 200000,
      type: 'expense',
      description: 'Arisan Kantor Bulan Ini',
      parent_category: 'Sosial & Ibadah',
      sub_category: 'Arisan',
      paid_by: 'Suami',
      for_whom: 'Suami',
      created_at: new Date(y, m, 6, 10, 0).toISOString()
    },
    // Pengeluaran Istri (Dana Pusat)
    {
      account_id: bsiId,
      amount: 350000,
      type: 'expense',
      description: 'Belanja Bulanan Indomaret',
      parent_category: 'Makanan & Minuman',
      sub_category: 'Groceries',
      paid_by: 'Istri',
      for_whom: 'Bersama',
      created_at: new Date(y, m, 2, 10, 0).toISOString()
    },
    {
      account_id: bsiId,
      amount: 500000,
      type: 'expense',
      description: 'SPP TK Aisyah Bulan April',
      parent_category: 'Pendidikan Anak',
      sub_category: 'SPP',
      paid_by: 'Istri',
      for_whom: 'Anak',
      created_at: new Date(y, m, 3, 9, 0).toISOString()
    },
    {
      account_id: bsiId,
      amount: 180000,
      type: 'expense',
      description: 'Listrik Rumah B',
      parent_category: 'Rumah Tangga',
      sub_category: 'Listrik',
      paid_by: 'Istri',
      for_whom: 'Bersama',
      created_at: new Date(y, m, 4, 11, 0).toISOString()
    },
    {
      account_id: bsiId,
      amount: 2100000,
      type: 'expense',
      description: 'Cicilan KPR BTN April',
      parent_category: 'Cicilan',
      sub_category: 'KPR',
      paid_by: 'Istri',
      for_whom: 'Bersama',
      created_at: new Date(y, m, 5, 8, 0).toISOString()
    },
    {
      account_id: bsiId,
      amount: 150000,
      type: 'expense',
      description: 'Arisan Ibu PKK',
      parent_category: 'Sosial & Ibadah',
      sub_category: 'Arisan',
      paid_by: 'Istri',
      for_whom: 'Istri',
      created_at: new Date(y, m, 6, 14, 0).toISOString()
    },
    {
      account_id: bsiId,
      amount: 85000,
      type: 'expense',
      description: 'Vitamin & Susu Anak',
      parent_category: 'Kesehatan',
      sub_category: 'Vitamin',
      paid_by: 'Istri',
      for_whom: 'Anak',
      created_at: new Date(y, m, 7, 10, 0).toISOString()
    },
    // Together Mode transaction
    {
      account_id: jagoId,
      amount: 250000,
      type: 'expense',
      description: 'Makan Keluarga di Restoran',
      parent_category: 'Hiburan',
      sub_category: 'Quality Time',
      paid_by: 'Suami',
      for_whom: 'Bersama',
      is_together: true,
      created_at: new Date(y, m, 7, 19, 0).toISOString()
    },
    {
      account_id: jagoId,
      amount: 45000,
      type: 'expense',
      description: 'Es Krim untuk Anak',
      parent_category: 'Makanan & Minuman',
      sub_category: 'Cemilan',
      paid_by: 'Suami',
      for_whom: 'Anak',
      is_together: true,
      created_at: new Date(y, m, 7, 20, 0).toISOString()
    },
    // Investasi Emas
    {
      account_id: bsiId,
      amount: 825000,
      type: 'expense',
      description: 'Beli Emas BSI 0.5 gram',
      parent_category: 'Investasi',
      sub_category: 'Emas BSI',
      paid_by: 'Istri',
      for_whom: 'Bersama',
      created_at: new Date(y, m, 8, 9, 0).toISOString()
    }
  ];

  // Add transactions without triggering balance updates (we set balances manually above)
  // We need to directly push to avoid double-counting with initial balances
  const state = store.getState();
  sampleTransactions.forEach(tx => {
    const id = crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).substr(2);
    state.transactions.push({ id, ...tx });
  });

  // Sort by date desc
  state.transactions.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  // Save
  localStorage.setItem('cipta_finansial_data', JSON.stringify(state));
  localStorage.setItem('cipta_seed_version', SEED_VERSION.toString());
}

export default seedData;
