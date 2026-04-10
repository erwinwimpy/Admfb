// ============================================
// CIPTA Finansial — Bottom Navigation
// ============================================

import router from '../router.js';

const NAV_ITEMS = [
  { path: '/', icon: 'dashboard', label: 'Beranda' },
  { path: '/transactions', icon: 'receipt_long', label: 'Transaksi' },
  { path: '/accounts', icon: 'account_balance_wallet', label: 'Rekening' },
  { path: '/assets', icon: 'diamond', label: 'Aset' },
  { path: '/insights', icon: 'auto_awesome', label: 'AI Insight' },
  { path: '/settings', icon: 'settings', label: 'Set' }
];

export function renderBottomNav() {
  const currentPath = router.getCurrentPath();

  return `
    <nav class="bottom-nav" id="bottom-nav">
      ${NAV_ITEMS.map(item => `
        <a class="nav-item ${currentPath === item.path ? 'active' : ''}"
           href="#${item.path}"
           id="nav-${item.path.replace('/', '') || 'home'}"
           aria-label="${item.label}">
          <span class="material-icons-round">${item.icon}</span>
          <span>${item.label}</span>
        </a>
      `).join('')}
    </nav>
  `;
}

export function updateActiveNav(path) {
  document.querySelectorAll('.nav-item').forEach(item => {
    const href = item.getAttribute('href');
    item.classList.toggle('active', href === `#${path}`);
  });
}
