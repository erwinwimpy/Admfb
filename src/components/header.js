// ============================================
// CIPTA Finansial — Header Component
// ============================================

import store from '../data/store.js';

export function renderHeader() {
  const state = store.getState();
  const isTogetherMode = state.settings.togetherMode;

  return `
    <header class="app-header" id="app-header">
      <div class="header-logo">
        <img src="${import.meta.env.BASE_URL}logo.png" alt="Adam Family Budget Logo" class="header-logo-image" style="height: 36px; width: auto; object-fit: contain; margin-right: 8px;">
        <div class="header-logo-text" style="font-size: 18px; line-height: 1.2;">Adam Family<br><span style="font-size: 12px; color: var(--primary);">BUDGET</span></div>
      </div>
      <div class="header-actions">
        <button class="together-toggle ${isTogetherMode ? 'active' : ''}" id="together-toggle" aria-label="Together Mode">
          <span class="material-icons-round together-toggle-icon">${isTogetherMode ? 'favorite' : 'favorite_border'}</span>
          <span class="together-toggle-label">${isTogetherMode ? 'Together!' : 'Together'}</span>
        </button>
        <div class="profile-avatar" id="profile-avatar">
          ${(state.settings.userName || 'U').charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  `;
}

export function initHeaderEvents() {
  const toggle = document.getElementById('together-toggle');
  if (toggle) {
    toggle.addEventListener('click', async () => {
      const active = await store.toggleTogetherMode();
      // Update UI will be handled by data-updated event, but we can reflect immediately too
      toggle.classList.toggle('active', active);
      const icon = toggle.querySelector('.together-toggle-icon');
      const label = toggle.querySelector('.together-toggle-label');
      icon.textContent = active ? 'favorite' : 'favorite_border';
      label.textContent = active ? 'Together!' : 'Together';

      import('../utils/helpers.js').then(({ showToast }) => {
        showToast(active ? '💕 Together Mode Aktif!' : 'Together Mode Nonaktif', 'info');
      });
    });
  }

  const avatar = document.getElementById('profile-avatar');
  if (avatar) {
    avatar.addEventListener('click', () => {
      const state = store.getState();
      const currentUser = state.settings.userName || 'Papa';
      const targetUser = currentUser === 'Papa' ? 'Mama' : 'Papa';
      
      const action = prompt(`Pilih aksi untuk ${currentUser}:\n1. Ganti User ke ${targetUser}\n2. Keluar (Logout)\n\nKetik angka (1/2):`, "1");
      
      if (action === "1") {
        store.updateSettings({ userName: targetUser });
        window.dispatchEvent(new Event('data-updated'));
      } else if (action === "2") {
        window.dispatchEvent(new Event('logout'));
      }
    });
  }
}
