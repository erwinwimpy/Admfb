// ============================================
// CIPTA Finansial — Data Store (localStorage)
// ============================================

const STORAGE_KEY = 'cipta_finansial_data';

const defaultState = {
  family: null,
  accounts: [],
  transactions: [],
  assets: {
    emas: { bsi_gram: 0, tring_gram: 0, price_per_gram: 1650000 },
    kpr: { total: 0, paid: 0, monthly: 0, bank: '', remaining_months: 0 },
    arisan: []
  },
  settings: {
    togetherMode: false,
    allowanceBudget: 1500000,
    userName: 'Erwin',
    spouseName: 'Bunda',
    geminiApiKey: ''
  },
  categories: []
};

class Store {
  constructor() {
    this._listeners = [];
    this._state = this._load();
  }

  _load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        return { ...defaultState, ...parsed };
      }
    } catch (e) {
      console.warn('Failed to load state', e);
    }
    return { ...defaultState };
  }

  _save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this._state));
    } catch (e) {
      console.warn('Failed to save state', e);
    }
    this._notify();
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

  // --- Family ---
  setFamily(family) {
    this._state.family = family;
    this._save();
  }

  // --- Settings ---
  updateSettings(updates) {
    this._state.settings = { ...this._state.settings, ...updates };
    this._save();
  }

  toggleTogetherMode() {
    this._state.settings.togetherMode = !this._state.settings.togetherMode;
    this._save();
    return this._state.settings.togetherMode;
  }

  // --- Accounts ---
  addAccount(account) {
    const maxId = this._state.accounts.reduce((max, a) => Math.max(max, a.id || 0), 0);
    const id = maxId + 1;
    this._state.accounts.push({ id, ...account });
    this._save();
    return id;
  }

  updateAccount(id, updates) {
    const idx = this._state.accounts.findIndex(a => a.id === id);
    if (idx !== -1) {
      this._state.accounts[idx] = { ...this._state.accounts[idx], ...updates };
      this._save();
    }
  }

  deleteAccount(id) {
    this._state.accounts = this._state.accounts.filter(a => a.id !== id);
    this._save();
  }

  getAccounts() {
    return this._state.accounts;
  }

  getAccountById(id) {
    return this._state.accounts.find(a => a.id === id);
  }

  // --- Transactions ---
  addTransaction(tx) {
    const id = crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).substr(2);
    const newTx = { id, created_at: new Date().toISOString(), ...tx };
    this._state.transactions.unshift(newTx);

    // Update account balances
    if (tx.type === 'income') {
      this._updateAccountBalance(tx.account_id, tx.amount);
    } else if (tx.type === 'expense') {
      this._updateAccountBalance(tx.account_id, -tx.amount);
    } else if (tx.type === 'transfer') {
      this._updateAccountBalance(tx.account_id, -tx.amount);
      if (tx.to_account_id) {
        this._updateAccountBalance(tx.to_account_id, tx.amount);
      }
    }

    this._save();
    return id;
  }

  _updateAccountBalance(accountId, delta) {
    const acc = this._state.accounts.find(a => a.id === accountId);
    if (acc) {
      acc.balance = (acc.balance || 0) + delta;
    }
  }

  deleteTransaction(id) {
    const tx = this._state.transactions.find(t => t.id === id);
    if (tx) {
      // Reverse balance changes
      if (tx.type === 'income') {
        this._updateAccountBalance(tx.account_id, -tx.amount);
      } else if (tx.type === 'expense') {
        this._updateAccountBalance(tx.account_id, tx.amount);
      } else if (tx.type === 'transfer') {
        this._updateAccountBalance(tx.account_id, tx.amount);
        if (tx.to_account_id) {
          this._updateAccountBalance(tx.to_account_id, -tx.amount);
        }
      }
      this._state.transactions = this._state.transactions.filter(t => t.id !== id);
      this._save();
    }
  }

  getTransactions(filters = {}) {
    let txs = [...this._state.transactions];

    if (filters.type) txs = txs.filter(t => t.type === filters.type);
    if (filters.paid_by) txs = txs.filter(t => t.paid_by === filters.paid_by);
    if (filters.for_whom) txs = txs.filter(t => t.for_whom === filters.for_whom);
    if (filters.account_id) txs = txs.filter(t => t.account_id === filters.account_id);
    if (filters.parent_category) txs = txs.filter(t => t.parent_category === filters.parent_category);
    if (filters.month) {
      txs = txs.filter(t => {
        const d = new Date(t.created_at);
        return d.getMonth() === filters.month && d.getFullYear() === (filters.year || new Date().getFullYear());
      });
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      txs = txs.filter(t =>
        (t.description || '').toLowerCase().includes(q) ||
        (t.parent_category || '').toLowerCase().includes(q) ||
        (t.sub_category || '').toLowerCase().includes(q)
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
  updateAssets(updates) {
    this._state.assets = { ...this._state.assets, ...updates };
    this._save();
  }

  updateEmas(updates) {
    this._state.assets.emas = { ...this._state.assets.emas, ...updates };
    this._save();
  }

  updateKPR(updates) {
    this._state.assets.kpr = { ...this._state.assets.kpr, ...updates };
    this._save();
  }

  addArisan(arisan) {
    const id = Date.now();
    this._state.assets.arisan.push({ id, ...arisan });
    this._save();
    return id;
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
    return this.getTransactionsByMonth(now.getFullYear(), now.getMonth())
      .filter(t => t.type === 'expense' && t.paid_by === 'Suami')
      .reduce((sum, t) => sum + t.amount, 0);
  }

  getDanaPusatBalance() {
    return this._state.accounts
      .filter(a => a.owner_name === 'Istri' || a.owner_name === 'Bersama')
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

  // --- Reset ---
  reset() {
    this._state = JSON.parse(JSON.stringify(defaultState));
    localStorage.removeItem(STORAGE_KEY);
    this._notify();
  }
}

export const store = new Store();
export default store;
