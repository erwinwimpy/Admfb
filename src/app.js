// ============================================
// CIPTA Finansial — App Entry
// ============================================

import router from './router.js';
import { seedData } from './data/seed.js';
import { renderHeader, initHeaderEvents } from './components/header.js';
import { renderBottomNav, updateActiveNav } from './components/bottomNav.js';
import { renderQuickAction, initQuickActionEvents } from './components/quickAction.js';
import { renderTransactionModal, initTransactionModalEvents } from './components/transactionModal.js';
import { renderScanModal, initScanModalEvents } from './components/scanModal.js';

import { renderDashboard, initDashboardEvents } from './pages/dashboard.js';
import { renderTransactionsPage, initTransactionsPageEvents } from './pages/transactions.js';
import { renderAccountsPage, initAccountsPageEvents } from './pages/accounts.js';
import { renderAssetsPage, initAssetsPageEvents } from './pages/assets.js';
import { renderInsightsPage, initInsightsPageEvents } from './pages/insights.js';
import { renderSettingsPage, initSettingsPageEvents } from './pages/settings.js';
import { renderLoginPage, initLoginPageEvents } from './pages/login.js';
import { auth } from './data/firebase.js';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import store from './data/store.js';

const app = document.getElementById('app');

// Page renderers map
const pages = {
  '/': { render: renderDashboard, init: initDashboardEvents },
  '/transactions': { render: renderTransactionsPage, init: initTransactionsPageEvents },
  '/accounts': { render: renderAccountsPage, init: initAccountsPageEvents },
  '/assets': { render: renderAssetsPage, init: initAssetsPageEvents },
  '/insights': { render: renderInsightsPage, init: initInsightsPageEvents },
  '/settings': { render: renderSettingsPage, init: initSettingsPageEvents },
  '/login': { render: renderLoginPage, init: initLoginPageEvents }
};

// --- Auth Guard & Synchronization ---
let isAuthInit = false;

onAuthStateChanged(auth, async (user) => {
  const currentPath = window.location.hash.slice(1) || '/';
  
  if (user) {
    // Authenticated
    store.sync(user); // Don't await, let UI update when snapshot arrives
    if (currentPath === '/login') {
      router.navigate('/');
    } else {
      renderPage(currentPath);
    }
  } else {
    // Not Authenticated
    store.sync(null);
    router.navigate('/login');
  }
  isAuthInit = true;
});

function renderPage(path) {
  const page = pages[path] || pages['/'];

  if (path === '/login') {
    app.innerHTML = page.render();
    initLoginPageEvents();
    return;
  }

  app.innerHTML = `
    ${renderHeader()}
    ${renderBottomNav()}
    ${page.render()}
    ${renderQuickAction()}
    ${renderTransactionModal()}
    ${renderScanModal()}
  `;

  // Init events
  initHeaderEvents();
  initQuickActionEvents();
  initTransactionModalEvents();
  initScanModalEvents();
  page.init();

  // Update active nav
  updateActiveNav(path);

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'instant' });
}

// App Entry Init
window.addEventListener('DOMContentLoaded', () => {
  if (!isAuthInit) {
    app.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:80vh;"><div class="spinner-container"><div class="spinner"></div></div></div>';
  }
  
  // Custom logout event
  window.addEventListener('logout', async () => {
    if (confirm('Keluar dari akun keluarga?')) {
      await signOut(auth);
    }
  });

  router.start();
});

window.addEventListener('popstate', () => {
  const user = auth.currentUser;
  const path = window.location.hash.slice(1) || '/';
  if (!user && path !== '/login') {
    router.navigate('/login');
  } else {
    renderPage(path);
  }
});

window.addEventListener('data-updated', () => {
  const currentPath = router.getCurrentPath();
  renderPage(currentPath);
});

export function initApp() {
  // Start router handled by DOMContentLoaded
}
