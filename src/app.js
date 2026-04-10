// ============================================
// CIPTA Finansial — App Entry
// ============================================

import router from './router.js';
import store from './data/store.js';
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

const app = document.getElementById('app');

// Page renderers map
const pages = {
  '/': { render: renderDashboard, init: initDashboardEvents },
  '/transactions': { render: renderTransactionsPage, init: initTransactionsPageEvents },
  '/accounts': { render: renderAccountsPage, init: initAccountsPageEvents },
  '/assets': { render: renderAssetsPage, init: initAssetsPageEvents },
  '/insights': { render: renderInsightsPage, init: initInsightsPageEvents },
  '/settings': { render: renderSettingsPage, init: initSettingsPageEvents }
};

function renderPage(path) {
  const page = pages[path] || pages['/'];

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

// Setup routes
Object.keys(pages).forEach(path => {
  router.addRoute(path, renderPage);
});

// Listen for data changes to refresh current page
window.addEventListener('data-updated', () => {
  const currentPath = router.getCurrentPath();
  renderPage(currentPath);
});

export function initApp() {
  // Seed sample data
  seedData();

  // Start router
  router.start();
}
