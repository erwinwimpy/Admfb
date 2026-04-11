// ============================================
// CIPTA Finansial — Data Store (Cloud Sync)
// ============================================

// Removed Firebase imports for MySQL Migration
import { showToast } from '../utils/helpers.js';

const LOCAL_STORAGE_KEY = 'cipta_finansial_data';

const defaultState = {
  family: null,
  accounts: [],
  transactions: [],
  settings: {
    togetherMode: false,
    allowanceBudget: 1500000,
    transportBudget: 600000,
    anakBudget: 800000,
    userName: 'Papa',
    spouseName: 'Mama',
    geminiApiKey: 'AIzaSyDFayE9DTMo4hai7W3KdU__aUFT7pA5XPw'
  },
  budgetRules: {
    needs: ['Rumah Tangga', 'Transportasi', 'Pendidikan Anak', 'Kesehatan', 'Cicilan'],
    wants: ['Hiburan', 'Pakaian & Fashion', 'Makanan & Minuman'],
    savings: ['Investasi', 'Sosial & Ibadah']
  },
  assets: {
    emas: { bsi_gram: 0, tring_gram: 0, price_per_gram: 1650000 },
    kpr: { total: 0, paid: 0, monthly: 0, bank: '', remaining_months: 0 },
    arisan: [],
    custom: []
  },
  categories: []
};

class Store {
  constructor() {
    this._listeners = [];
    this._state = { ...defaultState };
    this._unsubscribe = null;
    this._userId = null;
    
    // Check initial local data for migration
    this._localData = this._loadLocal();
  }

  _loadLocal() {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  }

  async sync() {
    // PHP/MySQL Sync Logic
    const isLoggedIn = localStorage.getItem('family_is_logged_in') === 'true';
    if (!isLoggedIn) {
      this._state = { ...defaultState };
      this._notify();
      return;
    }

    // Load from LocalStorage for Demo (GitHub)
    // In Production: This would fetch from api/sync.php
    const local = this._loadLocal();
    if (local) {
      this._state = { ...defaultState, ...local };
      
      // Override userName from Login identity
      const identity = localStorage.getItem('family_user_name');
      if (identity) this._state.settings.userName = identity;
      
      this._notify();
    }
    
    return Promise.resolve();
  }

  _notify() {
    this._listeners.forEach(fn => fn(this._state));
  }

  subscribe(fn) {
    this._listeners.push(fn);
    return () => {
      this._listeners = this._listeners.filter(l => l !== fn);
    };
  }

  getState() {
    return this._state;
  }

  // --- Data Persistence ---
  async _persist(updates) {
    this._state = { ...this._state, ...updates };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this._state));
    this._notify();

    // Call PHP API if not in Demo Mode
    // await fetch('api/sync.php?action=update', { ... });
  }

  // --- Settings ---
  async updateSettings(updates) {
    const newSettings = { ...this._state.settings, ...updates };
    await this._updateCloud({ settings: newSettings });
  }

  async toggleTogetherMode() {
    const newMode = !this._state.settings.togetherMode;
    await this._updateCloud({ 'settings.togetherMode': newMode });
    return newMode;
  }

  // --- Accounts ---
  async addAccount(account) {
    const maxId = this._state.accounts.reduce((max, a) => Math.max(max, a.id || 0), 0);
    const id = maxId + 1;
    const newAccounts = [...this._state.accounts, { id, ...account }];
    await this._updateCloud({ accounts: newAccounts });
    return id;
  }

  async updateAccount(id, updates) {
    const newAccounts = this._state.accounts.map(a => a.id === id ? { ...a, ...updates } : a);
    await this._updateCloud({ accounts: newAccounts });
  }

  async deleteAccount(id) {
    const newAccounts = this._state.accounts.filter(a => a.id !== id);
    await this._updateCloud({ accounts: newAccounts });
  }

  getAccounts() {
    return this._state.accounts;
  }

  // --- Transactions ---
  async addTransaction(tx) {
    const id = crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36);
    const newTx = { id, created_at: new Date().toISOString(), ...tx };
    
    // We update the local state optimistically or wait for snapshot? 
    // Best to update cloud and let snapshot update UI.
    const newTransactions = [newTx, ...this._state.transactions];
    const newAccounts = [...this._state.accounts];

    // Update account balances logic (same as before)
    const updateBal = (accId, delta) => {
       const acc = newAccounts.find(a => a.id === accId);
       if (acc) acc.balance = (acc.balance || 0) + delta;
    };

    if (tx.type === 'income') updateBal(tx.account_id, tx.amount);
    else if (tx.type === 'expense') updateBal(tx.account_id, -tx.amount);
    else if (tx.type === 'transfer') {
      updateBal(tx.account_id, -tx.amount);
      if (tx.to_account_id) updateBal(tx.to_account_id, tx.amount);
    }

    this._persist({ 
      transactions: newTransactions,
      accounts: newAccounts
    });
    return id;
  }

  async deleteTransaction(id) {
    const tx = this._state.transactions.find(t => t.id === id);
    if (!tx) return;

    const newTransactions = this._state.transactions.filter(t => t.id !== id);
    const newAccounts = [...this._state.accounts];
    const updateBal = (accId, delta) => {
       const acc = newAccounts.find(a => a.id === accId);
       if (acc) acc.balance = (acc.balance || 0) + delta;
    };

    if (tx.type === 'income') updateBal(tx.account_id, -tx.amount);
    else if (tx.type === 'expense') updateBal(tx.account_id, tx.amount);
    else if (tx.type === 'transfer') {
      updateBal(tx.account_id, tx.amount);
      if (tx.to_account_id) updateBal(tx.to_account_id, -tx.amount);
    }

    this._persist({ 
      transactions: newTransactions,
      accounts: newAccounts
    });
  }

  getTransactions(filters = {}) {
    let txs = [...this._state.transactions];
    if (filters.type) txs = txs.filter(t => t.type === filters.type);
    if (filters.paid_by) txs = txs.filter(t => t.paid_by === filters.paid_by);
    if (filters.for_whom) txs = txs.filter(t => t.for_whom === filters.for_whom);
    if (filters.account_id) txs = txs.filter(t => t.account_id === filters.account_id);
    if (filters.parent_category) txs = txs.filter(t => t.parent_category === filters.parent_category);
    if (filters.month !== undefined) {
      txs = txs.filter(t => {
        const d = new Date(t.created_at);
        return d.getMonth() === filters.month && d.getFullYear() === (filters.year || new Date().getFullYear());
      });
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      txs = txs.filter(t =>
        (t.description || '').toLowerCase().includes(q) ||
        (t.parent_category || '').toLowerCase().includes(q)
      );
    }
    return txs;
  }

  getTransactionsByMonth(year, month) {
    return this._state.transactions.filter(t => {
      const d = new Date(t.created_at);
      return d.getFullYear() === year && d.getMonth() === month;
    });
  }

  // --- Assets ---
  async updateEmas(updates) {
    const newEmas = { ...this._state.assets.emas, ...updates };
    await this._updateCloud({ 'assets.emas': newEmas });
  }

  async updateKPR(updates) {
    const newKPR = { ...this._state.assets.kpr, ...updates };
    await this._updateCloud({ 'assets.kpr': newKPR });
  }

  async addArisan(arisan) {
    const id = Date.now();
    const newArisan = [...this._state.assets.arisan, { id, ...arisan }];
    await this._updateCloud({ 'assets.arisan': newArisan });
    return id;
  }

  async updateArisan(id, data) {
    const newList = this._state.assets.arisan.map(a => a.id === id ? { ...a, ...data } : a);
    await this._updateCloud({ 'assets.arisan': newList });
  }

  async deleteArisan(id) {
    const newList = this._state.assets.arisan.filter(a => a.id !== id);
    await this._updateCloud({ 'assets.arisan': newList });
  }

  async addCustomAsset(asset) {
    const id = Date.now().toString(36);
    const newList = [...this._state.assets.custom, { id, ...asset }];
    await this._updateCloud({ 'assets.custom': newList });
    return id;
  }

  async updateCustomAsset(id, updates) {
    const newList = this._state.assets.custom.map(a => a.id === id ? { ...a, ...updates } : a);
    await this._updateCloud({ 'assets.custom': newList });
  }

  async deleteCustomAsset(id) {
    const newList = this._state.assets.custom.filter(a => a.id !== id);
    await this._updateCloud({ 'assets.custom': newList });
  }

  getAssets() {
    return this._state.assets;
  }

  // --- Computed ---
  getTotalBalance() {
    return this._state.accounts.reduce((sum, acc) => sum + (acc.balance || 0), 0);
  }

  getMonthlyExpenses(year, month) {
    return this.getTransactionsByMonth(year, month)
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
  }

  getMonthlyIncome(year, month) {
    return this.getTransactionsByMonth(year, month)
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
  }

  getAllowanceSpent() {
    const now = new Date();
    const userName = this._state.settings.userName;
    return this.getTransactionsByMonth(now.getFullYear(), now.getMonth())
      .filter(t => t.type === 'expense' && t.paid_by === userName)
      .reduce((sum, t) => sum + t.amount, 0);
  }

  getDanaPusatBalance() {
    const spouse = this._state.settings.spouseName;
    return this._state.accounts
      .filter(a => a.owner_name === spouse || a.owner_name === 'Bersama')
      .reduce((sum, a) => sum + (a.balance || 0), 0);
  }

  getNetWorth() {
    const totalBank = this.getTotalBalance();
    const emas = this._state.assets.emas;
    const totalEmas = (emas.bsi_gram + emas.tring_gram) * emas.price_per_gram;
    const kprEquity = this._state.assets.kpr.paid;
    return totalBank + totalEmas + kprEquity;
  }

  getCategorySpending(year, month) {
    const txs = this.getTransactionsByMonth(year, month).filter(t => t.type === 'expense');
    const map = {};
    txs.forEach(t => {
      const cat = t.parent_category || 'Lainnya';
      map[cat] = (map[cat] || 0) + t.amount;
    });
    return Object.entries(map).map(([name, amount]) => ({ name, amount })).sort((a, b) => b.amount - a.amount);
  }

  getBudgetPerformance() {
    const now = new Date();
    const txs = this.getTransactionsByMonth(now.getFullYear(), now.getMonth()).filter(t => t.type === 'expense');
    const rules = this._state.budgetRules;
    let needs = 0, wants = 0, savings = 0;
    txs.forEach(t => {
      const cat = t.parent_category;
      const sub = t.sub_category || '';
      if (rules.needs.includes(cat)) { needs += t.amount; }
      else if (rules.savings.includes(cat)) { savings += t.amount; }
      else if (rules.wants.includes(cat)) {
        if (cat === 'Makanan & Minuman' && ['Makan di Luar', 'Cemilan', 'Kopi & Minuman'].includes(sub)) wants += t.amount;
        else needs += t.amount;
      } else needs += t.amount;
    });
    const total = needs + wants + savings;
    return { needs, wants, savings, total };
  }

  async payAssetMonthly(type, id, accountId) {
    const state = this._state;
    let amount = 0, desc = "", cat = "Cicilan";

    if (type === 'kpr') {
      amount = state.assets.kpr.monthly;
      desc = `Cicilan KPR ${state.assets.kpr.bank} (Bulan ini)`;
      await this.updateKPR({ paid: state.assets.kpr.paid + amount, remaining_months: state.assets.kpr.remaining_months - 1 });
    } else if (type === 'arisan') {
      const arisan = state.assets.arisan.find(a => a.id === id);
      if (arisan) {
        amount = arisan.monthly_amount;
        desc = `Iuran Arisan ${arisan.name}`;
        cat = "Sosial & Ibadah";
        await this.updateArisan(id, { current_round: arisan.current_round + 1 });
      }
    } else if (type === 'custom') {
      const asset = state.assets.custom.find(a => a.id === id);
      if (asset) {
        amount = asset.monthly_amount || 0;
        desc = `Cicilan ${asset.name}`;
        await this.updateCustomAsset(id, { paid: (asset.paid || 0) + amount });
      }
    }

    if (amount > 0) {
      await this.addTransaction({
        account_id: accountId,
        amount,
        type: 'expense',
        description: desc,
        parent_category: cat,
        paid_by: state.settings.userName,
        for_whom: 'Bersama'
      });
    }
  }

  async reset() {
    if (this._userId) {
      await setDoc(doc(db, 'families', this._userId), defaultState);
    }
  }
}

export const store = new Store();
export default store;
