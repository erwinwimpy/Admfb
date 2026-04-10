// ============================================
// CIPTA Finansial — Settings Page
// ============================================

import store from '../data/store.js';
import { showToast } from '../utils/helpers.js';

export function renderSettingsPage() {
  const state = store.getState();
  const settings = state.settings;

  return `
    <div class="page-container animate-fade-in" id="settings-page">
      <h1 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 4px;">Pengaturan</h1>
      <p style="color: var(--on-surface-variant); font-size: var(--fs-body); margin-bottom: 24px;">
        Sesuaikan budget dan profil keluarga Anda
      </p>

      <form id="settings-form">
        <!-- Personal Info -->
        <div class="card" style="margin-bottom: 20px;">
          <h3 style="margin-bottom: 16px; font-size: 16px; display: flex; align-items: center; gap: 8px;">
            <span class="material-icons-round" style="color: var(--primary);">person</span>
            Profil Keluarga
          </h3>
          <div class="form-group">
            <label class="form-label">Nama Papa</label>
            <input type="text" class="form-input" id="set-user-name" value="${settings.userName}" required />
          </div>
          <div class="form-group">
            <label class="form-label">Nama Mama</label>
            <input type="text" class="form-input" id="set-spouse-name" value="${settings.spouseName}" required />
          </div>
        </div>

        <!-- Budget Targets -->
        <div class="card" style="margin-bottom: 20px;">
          <h3 style="margin-bottom: 16px; font-size: 16px; display: flex; align-items: center; gap: 8px;">
            <span class="material-icons-round" style="color: var(--tertiary);">track_changes</span>
            Target Budget Bulanan
          </h3>
          
          <div class="form-group">
            <label class="form-label">Budget Uang Harian Papa (Allowance)</label>
            <div style="position: relative;">
               <span style="position: absolute; left: 12px; top: 12px; color: var(--outline);">Rp</span>
               <input type="number" class="form-input" id="set-allowance" value="${settings.allowanceBudget}" style="padding-left: 40px;" />
            </div>
            <p style="font-size: 11px; color: var(--on-surface-variant); margin-top: 4px;">Digunakan untuk analisis "Pegangan Papa" di dashboard.</p>
          </div>

          <div class="form-group">
            <label class="form-label">Budget Transportasi (Bensin LDM dll)</label>
            <div style="position: relative;">
               <span style="position: absolute; left: 12px; top: 12px; color: var(--outline);">Rp</span>
               <input type="number" class="form-input" id="set-transport" value="${settings.transportBudget}" style="padding-left: 40px;" />
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Budget Keperluan Anak</label>
            <div style="position: relative;">
               <span style="position: absolute; left: 12px; top: 12px; color: var(--outline);">Rp</span>
               <input type="number" class="form-input" id="set-anak" value="${settings.anakBudget}" style="padding-left: 40px;" />
            </div>
          </div>
        </div>

        <!-- AI Config -->
        <div class="card" style="margin-bottom: 24px;">
           <h3 style="margin-bottom: 16px; font-size: 16px; display: flex; align-items: center; gap: 8px;">
            <span class="material-icons-round" style="color: #7b1fa2;">psychology</span>
            Konfigurasi AI (Gemini)
          </h3>
          <div class="form-group">
            <label class="form-label">Gemini API Key</label>
            <input type="password" class="form-input" id="set-ai-key" value="${settings.geminiApiKey}" placeholder="Masukkan API Key Anda..." />
            <p style="font-size: 11px; color: var(--on-surface-variant); margin-top: 4px;">Key ini disimpan secara lokal di perangkat Anda.</p>
          </div>
        </div>

        <button type="submit" class="btn btn-primary btn-block" style="padding: 16px; font-weight: 700;">
          <span class="material-icons-round">save</span>
          Simpan Perubahan
        </button>
        
        <div style="height: 100px;"></div>
      </form>
    </div>
  `;
}

export function initSettingsPageEvents() {
  const form = document.getElementById('settings-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const updates = {
        userName: document.getElementById('set-user-name').value.trim(),
        spouseName: document.getElementById('set-spouse-name').value.trim(),
        allowanceBudget: parseInt(document.getElementById('set-allowance').value || 0),
        transportBudget: parseInt(document.getElementById('set-transport').value || 0),
        anakBudget: parseInt(document.getElementById('set-anak').value || 0),
        geminiApiKey: document.getElementById('set-ai-key').value.trim()
      };

      store.updateSettings(updates);
      showToast('✅ Pengaturan berhasil disimpan!');
      
      // Refresh after delay
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('data-updated'));
      }, 500);
    });
  }
}
