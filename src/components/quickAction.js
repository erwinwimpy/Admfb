// ============================================
// CIPTA Finansial — Quick Action FAB
// ============================================

export function renderQuickAction() {
  return `
    <div class="fab-container" id="fab-container">
      <div class="fab-actions" id="fab-actions">
        <button class="fab-action" id="fab-scan">
          <span class="material-icons-round">photo_camera</span>
          <span>Scan Struk</span>
        </button>
        <button class="fab-action" id="fab-transfer">
          <span class="material-icons-round">swap_horiz</span>
          <span>Transfer</span>
        </button>
        <button class="fab-action" id="fab-income">
          <span class="material-icons-round">arrow_downward</span>
          <span>Pemasukan</span>
        </button>
        <button class="fab-action" id="fab-expense">
          <span class="material-icons-round">arrow_upward</span>
          <span>Pengeluaran</span>
        </button>
      </div>
      <button class="fab-main" id="fab-main" aria-label="Tambah Transaksi">
        <span class="material-icons-round">add</span>
      </button>
    </div>
  `;
}

export function initQuickActionEvents() {
  const fabMain = document.getElementById('fab-main');
  const fabActions = document.getElementById('fab-actions');
  let isOpen = false;

  if (fabMain) {
    fabMain.addEventListener('click', () => {
      isOpen = !isOpen;
      fabMain.classList.toggle('open', isOpen);
      fabActions.classList.toggle('open', isOpen);
    });
  }

  // Close on clicking outside
  document.addEventListener('click', (e) => {
    if (isOpen && !e.target.closest('#fab-container')) {
      isOpen = false;
      fabMain?.classList.remove('open');
      fabActions?.classList.remove('open');
    }
  });

  // Action buttons
  document.getElementById('fab-expense')?.addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('open-transaction-modal', { detail: { type: 'expense' } }));
    closeFab();
  });

  document.getElementById('fab-income')?.addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('open-transaction-modal', { detail: { type: 'income' } }));
    closeFab();
  });

  document.getElementById('fab-transfer')?.addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('open-transaction-modal', { detail: { type: 'transfer' } }));
    closeFab();
  });

  document.getElementById('fab-scan')?.addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('open-scan-modal'));
    closeFab();
  });

  function closeFab() {
    isOpen = false;
    fabMain?.classList.remove('open');
    fabActions?.classList.remove('open');
  }
}
