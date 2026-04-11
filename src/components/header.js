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
      const currentMode = toggle.classList.contains('active');
      const newMode = !currentMode;
      
      // Optimistic UI Update
      toggle.classList.toggle('active', newMode);
      const icon = toggle.querySelector('.together-toggle-icon');
      const label = toggle.querySelector('.together-toggle-label');
      icon.textContent = newMode ? 'favorite' : 'favorite_border';
      label.textContent = newMode ? 'Together!' : 'Together';
      
      // Background Sync
      await store.toggleTogetherMode();
    });
  }

  const avatar = document.getElementById('profile-avatar');
  if (avatar) {
    avatar.addEventListener('click', () => {
      const state = store.getState();
      const currentUser = state.settings.userName || 'Papa';
      const targetUser = currentUser === 'Papa' ? 'Mama' : 'Papa';
      
      const action = prompt(`Menu Akun (${currentUser}):\n1. Pengaturan Aplikasi\n2. Ganti User ke ${targetUser}\n3. Keluar (Logout)\n\nKetik angka (1/2/3):`, "1");
      
      if (action === "1") {
        window.location.hash = "/settings";
      } else if (action === "2") {
        store.updateSettings({ userName: targetUser });
        window.dispatchEvent(new Event('data-updated'));
      } else if (action === "3") {
        window.dispatchEvent(new Event('logout'));
      }
    });
  }
}
