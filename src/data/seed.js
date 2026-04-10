// ============================================
// CIPTA Finansial — Sample / Seed Data (FINAL)
// ============================================

import store from './store.js';

const SEED_VERSION = 5; // Increment to force reset

export function seedData() {
  // Force re-seed for finalization
  const storedVersion = localStorage.getItem('cipta_seed_version');
  if (storedVersion && parseInt(storedVersion) >= SEED_VERSION) return;

  // Clear all previous test data
  store.reset();

  // Family
  store.setFamily({
    id: 'family-001',
    family_name: 'Adam Family',
    papa: 'Erwin',
    mama: 'Nihad',
    anak: 'Adam',
    created_at: new Date().toISOString()
  });

  // Settings
  store.updateSettings({
    userName: 'Erwin',
    spouseName: 'Nihad',
    allowanceBudget: 1500000
  });

  // Accounts Init (Fresh Start)
  store.addAccount({
    bank_name: 'BRI',
    owner_name: 'Erwin',
    balance: 0,
    is_allowance_account: false,
    css_class: 'bri'
  });

  store.addAccount({
    bank_name: 'Bank Jago',
    owner_name: 'Bersama',
    balance: 0,
    is_allowance_account: true,
    css_class: 'jago'
  });

  store.addAccount({
    bank_name: 'BSI',
    owner_name: 'Nihad',
    balance: 0,
    is_allowance_account: false,
    css_class: 'bsi'
  });

  store.addAccount({
    bank_name: 'Dompet Tunai Erwin',
    owner_name: 'Erwin',
    balance: 0,
    is_allowance_account: true,
    css_class: 'tunai'
  });

  store.addAccount({
    bank_name: 'Dompet Tunai Nihad',
    owner_name: 'Nihad',
    balance: 0,
    is_allowance_account: true,
    css_class: 'tunai'
  });

  // Assets (Fresh Start)
  store.updateEmas({
    bsi_gram: 0,
    tring_gram: 0,
    price_per_gram: 1650000
  });

  store.updateKPR({
    total: 0,
    paid: 0,
    monthly: 0,
    bank: '-',
    remaining_months: 0
  });

  // Save version
  localStorage.setItem('cipta_seed_version', SEED_VERSION.toString());
  console.log('Final Application Seeded Successfully.');
}

export default seedData;
