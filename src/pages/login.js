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
      <div class="card" style="width: 100%; max-width: 400px; padding: 32px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <div style="background: var(--primary); color: white; width: 64px; height: 64px; border-radius: 20px; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; box-shadow: 0 8px 16px rgba(var(--primary-rgb), 0.3);">
            <span class="material-icons-round" style="font-size: 32px;">account_balance_wallet</span>
          </div>
          <h1 style="font-size: 1.5rem; font-weight: 800; color: var(--on-surface);">Adam Family</h1>
          <p style="color: var(--on-surface-variant); font-size: 14px;">Aplikasi Keuangan Masa Depan</p>
        </div>

        <!-- Tabs -->
        <div class="chip-group" style="margin-bottom: 24px;">
           <button class="chip selected" id="tab-login" style="flex: 1; justify-content: center;">Masuk</button>
           <button class="chip" id="tab-register" style="flex: 1; justify-content: center;">Daftar Baru</button>
        </div>

        <form id="login-form">
          <div class="form-group">
            <label class="form-label">Email Keluarga</label>
            <input type="email" class="form-input" id="login-email" placeholder="keluarga@adam.com" required />
          </div>
          <div class="form-group">
            <label class="form-label">Password</label>
            <input type="password" class="form-input" id="login-password" placeholder="••••••••" required />
          </div>
          <button type="submit" class="btn btn-primary btn-block" style="padding: 16px; font-weight: 700; margin-top: 12px;" id="btn-login-submit">
            Masuk ke Dashboard
          </button>
        </form>

        <p id="login-footer" style="text-align: center; font-size: 12px; color: var(--on-surface-variant); margin-top: 24px;">
          Gunakan satu akun untuk Papa & Mama
        </p>
      </div>
    </div>
  `;
}

export function initLoginPageEvents() {
  let mode = 'login';
  const tabLogin = document.getElementById('tab-login');
  const tabReg = document.getElementById('tab-register');
  const btnSubmit = document.getElementById('btn-login-submit');
  const footer = document.getElementById('login-footer');

  tabLogin?.addEventListener('click', () => {
    mode = 'login';
    tabLogin.classList.add('selected');
    tabReg.classList.remove('selected');
    btnSubmit.innerText = 'Masuk ke Dashboard';
    footer.innerText = 'Gunakan satu akun untuk Papa & Mama';
  });

  tabReg?.addEventListener('click', () => {
    mode = 'register';
    tabReg.classList.add('selected');
    tabLogin.classList.remove('selected');
    btnSubmit.innerText = 'Buat Akun Keluarga';
    footer.innerText = 'Data lokal akan otomatis dipindahkan ke Cloud';
  });

  document.getElementById('login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;

    try {
      btnSubmit.disabled = true;
      btnSubmit.innerText = 'Memproses...';

      if (mode === 'login') {
        await signInWithEmailAndPassword(auth, email, password);
        showToast('✅ Berhasil Masuk!');
      } else {
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCred.user, { displayName: 'Adam Family' });
        showToast('✅ Akun Berhasil Dibuat!');
      }
      
      // The auth observer in app.js will handle redirect
    } catch (error) {
      console.error(error);
      let msg = 'Gagal memproses data';
      if (error.code === 'auth/wrong-password') msg = 'Password salah';
      if (error.code === 'auth/user-not-found') msg = 'Email tidak terdaftar';
      if (error.code === 'auth/email-already-in-use') msg = 'Email sudah digunakan';
      showToast('❌ ' + msg, 'error');
      btnSubmit.disabled = false;
      btnSubmit.innerText = mode === 'login' ? 'Masuk ke Dashboard' : 'Buat Akun Keluarga';
    }
  });
}
