// ============================================
// CIPTA Finansial — Login Page
// ============================================

import { auth } from '../data/firebase.js';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { showToast } from '../utils/helpers.js';

export function renderLoginPage() {
  return `
    <div class="page-container animate-fade-in" style="display: flex; align-items: center; justify-content: center; min-height: 80vh;">
      <div class="card" style="width: 100%; max-width: 400px; padding: 32px; text-align: center;">
        <div style="margin-bottom: 32px;">
          <div style="background: var(--primary); color: white; width: 64px; height: 64px; border-radius: 20px; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; box-shadow: 0 8px 16px rgba(var(--primary-rgb), 0.3);">
            <span class="material-icons-round" style="font-size: 32px;">cloud_sync</span>
          </div>
          <h1 style="font-size: 1.5rem; font-weight: 800; color: var(--on-surface);">Aktivasi Cloud Sync</h1>
          <p style="color: var(--on-surface-variant); font-size: 14px; margin-top: 8px;">
            Menghubungkan HP Papa & Mama ke database keluarga terpusat.
          </p>
        </div>

        <form id="login-form">
          <div class="form-group" style="text-align: left;">
            <label class="form-label">Email Keluarga</label>
            <input type="email" class="form-input" id="login-email" value="erwinwimpy@gmail.com" readonly style="background: var(--surface-container); color: var(--on-surface-variant);" />
          </div>
          <div class="form-group" style="text-align: left; margin-bottom: 24px;">
            <label class="form-label">PIN / Password Keluarga</label>
            <input type="password" class="form-input" id="login-password" value="adam123" readonly style="background: var(--surface-container); color: var(--on-surface-variant);" />
          </div>

          <button type="submit" class="btn btn-primary btn-block" style="padding: 18px; font-weight: 700;" id="btn-login-submit">
            Hubungkan ke Brankas Cloud
          </button>
        </form>

        <div style="margin-top: 24px; padding: 12px; background: #e3f2fd; border-radius: 12px; border: 1px dashed #2196f3;">
           <p style="font-size: 11px; color: #1565c0; line-height: 1.5; margin: 0;">
             <span class="material-icons-round" style="font-size: 14px; vertical-align: middle;">verified</span> 
             Gunakan tombol di atas pada HP Papa dan HP Mama untuk mensinkronkan data secara real-time.
           </p>
        </div>
      </div>
    </div>
  `;
}

export function initLoginPageEvents() {
  const btnSubmit = document.getElementById('btn-login-submit');

  document.getElementById('login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = "erwinwimpy@gmail.com";
    const password = "adam123";

    try {
      btnSubmit.disabled = true;
      btnSubmit.innerHTML = '<div class="spinner" style="width: 20px; height: 20px; border-width: 2px; margin: 0 auto;"></div>';

      // First trial: Try Login
      try {
        await signInWithEmailAndPassword(auth, email, password);
        showToast('✅ Berhasil Terhubung ke Cloud!');
      } catch (err) {
        // If not found, try register (one-click activation)
        if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
          try {
            const userCred = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCred.user, { displayName: 'Keluarga Adam' });
            showToast('✨ Brankas Cloud Berhasil Diaktifkan!');
          } catch (regErr) {
            // Re-throw if it's already someone else's email or other error
            throw regErr;
          }
        } else {
          throw err;
        }
      }
    } catch (error) {
      console.error(error);
      let msg = `Gagal: ${error.code || 'Unknown Error'}`;
      if (error.code === 'auth/operation-not-allowed') {
        msg = '⚠️ Error: Email/Password belum diaktifkan di Firebase Console!';
      } else if (error.code === 'auth/invalid-api-key') {
        msg = '⚠️ Error: API Key Firebase tidak valid!';
      } else if (error.code === 'auth/network-request-failed') {
        msg = '⚠️ Error: Koneksi internet bermasalah.';
      }
      
      showToast(msg, 'error');
      btnSubmit.disabled = false;
      btnSubmit.innerText = 'Hubungkan ke Brankas Cloud';
    }
  });
}

