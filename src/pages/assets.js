// ============================================
// CIPTA Finansial — Assets Page
// ============================================

import store from '../data/store.js';
import { formatRupiah, percentage } from '../utils/helpers.js';

export function renderAssetsPage() {
  const assets = store.getAssets();
  const netWorth = store.getNetWorth();
  const totalBalance = store.getTotalBalance();

  // Emas calculations
  const emas = assets.emas;
  const totalGram = emas.bsi_gram + emas.tring_gram;
  const totalEmasValue = totalGram * emas.price_per_gram;

  // KPR
  const kpr = assets.kpr;
  const kprPercent = percentage(kpr.paid, kpr.total);
  const kprRemaining = kpr.total - kpr.paid;

  // Arisan
  const arisanList = assets.arisan || [];

  return `
    <div class="page-container animate-fade-in" id="assets-page">
      <h1 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 4px;">Aset & Kekayaan</h1>
      <p style="color: var(--on-surface-variant); font-size: var(--fs-body); margin-bottom: 20px;">
        Pantau kekayaan bersih keluarga secara real-time
      </p>

      <!-- Net Worth Card -->
      <div class="net-worth-card" style="margin-bottom: 24px;">
        <div class="net-worth-label">Kekayaan Bersih (Net Worth)</div>
        <div class="net-worth-value">${formatRupiah(netWorth)}</div>
        <div class="net-worth-change up">
          <span class="material-icons-round" style="font-size: 14px;">trending_up</span>
          <span>Termasuk aset emas & ekuitas KPR</span>
        </div>

        <!-- Breakdown mini -->
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; margin-top: 16px; position: relative; z-index: 1;">
          <div style="text-align: center;">
            <div style="font-size: 11px; opacity: 0.6;">💰 Bank</div>
            <div style="font-size: 13px; font-weight: 700;">${formatRupiah(totalBalance, true)}</div>
          </div>
          <div style="text-align: center;">
            <div style="font-size: 11px; opacity: 0.6;">🪙 Emas</div>
            <div style="font-size: 13px; font-weight: 700;">${formatRupiah(totalEmasValue, true)}</div>
          </div>
          <div style="text-align: center;">
            <div style="font-size: 11px; opacity: 0.6;">🏠 KPR Equity</div>
            <div style="font-size: 13px; font-weight: 700;">${formatRupiah(kpr.paid, true)}</div>
          </div>
        </div>
      </div>

      <!-- Emas Section -->
      <div class="asset-card" id="asset-emas">
        <div class="asset-card-header" style="justify-content: space-between;">
          <div style="display: flex; gap: 12px; align-items: center;">
            <div class="asset-card-icon emas">
              <span class="material-icons-round">diamond</span>
            </div>
            <div>
              <div class="asset-card-title">Investasi Emas</div>
              <div class="asset-card-subtitle">BSI Gold & Tring</div>
            </div>
          </div>
          <button class="btn btn-secondary" style="padding: 8px; border-radius: 50%; width: 40px; height: 40px;" onclick="window.dispatchEvent(new CustomEvent('edit-emas'))">
            <span class="material-icons-round" style="font-size: 20px;">edit</span>
          </button>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
          <div style="background: var(--tertiary-container); border-radius: var(--radius-md); padding: 12px;">
            <div style="font-size: 11px; font-weight: 600; color: var(--on-tertiary-container);">BSI Gold</div>
            <div style="font-size: 1.1rem; font-weight: 800; color: var(--tertiary); margin-top: 4px;">${emas.bsi_gram}g</div>
            <div style="font-size: 12px; color: var(--on-tertiary-container); opacity: 0.8;">${formatRupiah(emas.bsi_gram * emas.price_per_gram, true)}</div>
          </div>
          <div style="background: var(--tertiary-container); border-radius: var(--radius-md); padding: 12px;">
            <div style="font-size: 11px; font-weight: 600; color: var(--on-tertiary-container);">Tring</div>
            <div style="font-size: 1.1rem; font-weight: 800; color: var(--tertiary); margin-top: 4px;">${emas.tring_gram}g</div>
            <div style="font-size: 12px; color: var(--on-tertiary-container); opacity: 0.8;">${formatRupiah(emas.tring_gram * emas.price_per_gram, true)}</div>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 12px; border-top: 1px solid var(--outline-variant);">
          <div>
            <div style="font-size: 12px; color: var(--on-surface-variant);">Total Emas</div>
            <div style="font-size: 1.25rem; font-weight: 800; color: var(--tertiary);">${totalGram}g</div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 12px; color: var(--on-surface-variant);">Nilai Pasar</div>
            <div style="font-size: 1.25rem; font-weight: 800; color: var(--tertiary);">${formatRupiah(totalEmasValue)}</div>
          </div>
        </div>

        <div style="margin-top: 12px; padding: 8px 12px; background: var(--surface-container); border-radius: var(--radius-sm); display: flex; align-items: center; gap: 8px;">
          <span class="material-icons-round" style="font-size: 16px; color: var(--outline);">info</span>
          <span style="font-size: 11px; color: var(--on-surface-variant);">Harga emas: ${formatRupiah(emas.price_per_gram)}/gram (update manual)</span>
        </div>
      </div>

      <!-- KPR Section -->
      <div class="asset-card" id="asset-kpr">
        <div class="asset-card-header" style="justify-content: space-between;">
          <div style="display: flex; gap: 12px; align-items: center;">
            <div class="asset-card-icon kpr">
              <span class="material-icons-round">home</span>
            </div>
            <div>
              <div class="asset-card-title">KPR ${kpr.bank || 'BTN'}</div>
              <div class="asset-card-subtitle">Kredit Pemilikan Rumah</div>
            </div>
          </div>
          <button class="btn btn-secondary" style="padding: 8px; border-radius: 50%; width: 40px; height: 40px;" onclick="window.dispatchEvent(new CustomEvent('edit-kpr'))">
            <span class="material-icons-round" style="font-size: 20px;">edit</span>
          </button>
        </div>

        <!-- Big Progress -->
        <div style="text-align: center; margin-bottom: 16px;">
          <div style="position: relative; width: 140px; height: 140px; margin: 0 auto;">
            <svg width="140" height="140" viewBox="0 0 140 140" style="transform: rotate(-90deg);">
              <circle cx="70" cy="70" r="60" fill="none" stroke="var(--outline-variant)" stroke-width="10" opacity="0.3" />
              <circle cx="70" cy="70" r="60" fill="none" stroke="var(--primary)" stroke-width="10"
                stroke-dasharray="${2 * Math.PI * 60}"
                stroke-dashoffset="${2 * Math.PI * 60 * (1 - kprPercent / 100)}"
                stroke-linecap="round"
                style="transition: stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1);" />
            </svg>
            <div style="position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center;">
              <div style="font-size: 1.75rem; font-weight: 800; color: var(--primary);">${kprPercent}%</div>
              <div style="font-size: 11px; color: var(--on-surface-variant); font-weight: 600;">Lunas</div>
            </div>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          <div style="background: var(--surface-container); border-radius: var(--radius-md); padding: 12px;">
            <div style="font-size: 11px; color: var(--on-surface-variant); font-weight: 600;">Sudah Bayar</div>
            <div style="font-size: 14px; font-weight: 800; color: var(--success); margin-top: 4px;">${formatRupiah(kpr.paid, true)}</div>
          </div>
          <div style="background: var(--surface-container); border-radius: var(--radius-md); padding: 12px;">
            <div style="font-size: 11px; color: var(--on-surface-variant); font-weight: 600;">Sisa Hutang</div>
            <div style="font-size: 14px; font-weight: 800; color: var(--error); margin-top: 4px;">${formatRupiah(kprRemaining, true)}</div>
          </div>
        </div>
      </div>

      <!-- Arisan Section -->
      <div class="asset-card" id="asset-arisan">
        <div class="asset-card-header" style="justify-content: space-between;">
          <div style="display: flex; gap: 12px; align-items: center;">
            <div class="asset-card-icon arisan">
              <span class="material-icons-round">groups</span>
            </div>
            <div>
              <div class="asset-card-title">Arisan</div>
              <div class="asset-card-subtitle">${arisanList.length} kelompok arisan aktif</div>
            </div>
          </div>
          <button class="btn btn-secondary" style="padding: 8px; border-radius: 50%; width: 40px; height: 40px;" id="btn-add-arisan">
            <span class="material-icons-round" style="font-size: 20px;">add</span>
          </button>
        </div>

        ${arisanList.length === 0 ? `
          <div style="text-align: center; padding: 20px; color: var(--outline);">
            Belum ada data arisan
          </div>
        ` : arisanList.map(arisan => `
          <div style="background: var(--surface-container); border-radius: var(--radius-md); padding: 12px; margin-bottom: 8px; position: relative;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <div style="font-weight: 700; font-size: var(--fs-body);">${arisan.name}</div>
              <div style="display: flex; gap: 4px; align-items: center;">
                <button class="btn-edit-arisan" data-id="${arisan.id}" style="padding: 4px; background: none; border: none; color: var(--primary);"><span class="material-icons-round" style="font-size: 18px;">edit</span></button>
                <button class="btn-delete-arisan" data-id="${arisan.id}" style="padding: 4px; background: none; border: none; color: var(--error);"><span class="material-icons-round" style="font-size: 18px;">delete</span></button>
              </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; font-size: 12px;">
              <div>
                <div style="color: var(--on-surface-variant);">Iuran</div>
                <div style="font-weight: 700;">${formatRupiah(arisan.monthly_amount, true)}</div>
              </div>
              <div>
                <div style="color: var(--on-surface-variant);">Giliran Saya</div>
                <div style="font-weight: 700;">Ke-${arisan.my_turn}</div>
              </div>
              <div>
                <div style="color: var(--on-surface-variant);">Putaran</div>
                <div style="font-weight: 700;">${arisan.current_round}/${arisan.total_members}</div>
              </div>
            </div>
            <div style="margin-top: 8px;">
              <div class="progress-bar" style="height: 4px;">
                <div class="progress-bar-fill blue" style="width: ${percentage(arisan.current_round, arisan.total_members)}%;"></div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Modals for Assets -->
      <div class="modal-backdrop" id="asset-modal-backdrop"></div>
      
      <!-- Modal Emas -->
      <div class="modal-sheet" id="modal-edit-emas">
        <div class="modal-handle"></div>
        <div class="modal-content">
          <h2 class="modal-title">Edit Investasi Emas</h2>
          <form id="form-emas">
            <div class="form-group">
              <label class="form-label">Tabungan Emas BSI (gram)</label>
              <input type="number" step="0.01" class="form-input" id="emas-bsi" value="${emas.bsi_gram}" />
            </div>
            <div class="form-group">
              <label class="form-label">Emas Tring/Fisik (gram)</label>
              <input type="number" step="0.01" class="form-input" id="emas-tring" value="${emas.tring_gram}" />
            </div>
            <div class="form-group">
              <label class="form-label">Harga Emas Saat Ini (Rp/gram)</label>
              <input type="number" class="form-input" id="emas-price" value="${emas.price_per_gram}" />
            </div>
            <button type="submit" class="btn btn-primary btn-block">Simpan Perubahan</button>
          </form>
        </div>
      </div>

      <!-- Modal KPR -->
      <div class="modal-sheet" id="modal-edit-kpr">
        <div class="modal-handle"></div>
        <div class="modal-content">
          <h2 class="modal-title">Update Status KPR</h2>
          <form id="form-kpr">
            <div class="form-group">
              <label class="form-label">Nama Bank</label>
              <input type="text" class="form-input" id="kpr-bank" value="${kpr.bank}" />
            </div>
            <div class="form-group">
              <label class="form-label">Total Harga Rumah/Hutang Awal</label>
              <input type="number" class="form-input" id="kpr-total" value="${kpr.total}" />
            </div>
            <div class="form-group">
              <label class="form-label">Total yang Sudah Dibayar</label>
              <input type="number" class="form-input" id="kpr-paid" value="${kpr.paid}" />
            </div>
            <div class="form-group">
              <label class="form-label">Cicilan per bulan</label>
              <input type="number" class="form-input" id="kpr-monthly" value="${kpr.monthly}" />
            </div>
            <div class="form-group">
              <label class="form-label">Sisa Tenor (Bulan)</label>
              <input type="number" class="form-input" id="kpr-months" value="${kpr.remaining_months}" />
            </div>
            <button type="submit" class="btn btn-primary btn-block">Simpan Perubahan</button>
          </form>
        </div>
      </div>

      <!-- Modal Arisan -->
      <div class="modal-sheet" id="modal-edit-arisan">
        <div class="modal-handle"></div>
        <div class="modal-content">
          <h2 class="modal-title" id="arisan-modal-title">Tambah Kelompok Arisan</h2>
          <form id="form-arisan">
            <input type="hidden" id="arisan-id" />
            <div class="form-group">
              <label class="form-label">Nama Kelompok Arisan</label>
              <input type="text" class="form-input" id="arisan-name" required />
            </div>
            <div class="form-group">
              <label class="form-label">Iuran Bulanan (Rp)</label>
              <input type="number" class="form-input" id="arisan-amount" required />
            </div>
            <div class="form-group">
              <label class="form-label">Total Anggota</label>
              <input type="number" class="form-input" id="arisan-members" required />
            </div>
            <div class="form-group">
              <label class="form-label">Urutan Kocokan Saya</label>
              <input type="number" class="form-input" id="arisan-turn" required />
            </div>
            <div class="form-group">
              <label class="form-label">Putaran Saat Ini</label>
              <input type="number" class="form-input" id="arisan-round" value="1" />
            </div>
            <button type="submit" class="btn btn-primary btn-block">Simpan Data Arisan</button>
          </form>
        </div>
      </div>
    </div>
  `;
}

export function initAssetsPageEvents() {
  const backdrop = document.getElementById('asset-modal-backdrop');
  
  const closeAllAssetModals = () => {
    backdrop?.classList.remove('open');
    document.querySelectorAll('.modal-sheet').forEach(m => m.classList.remove('open'));
  };

  backdrop?.addEventListener('click', closeAllAssetModals);

  // Emas Edit
  window.addEventListener('edit-emas', () => {
    backdrop?.classList.add('open');
    document.getElementById('modal-edit-emas')?.classList.add('open');
  });

  document.getElementById('form-emas')?.addEventListener('submit', (e) => {
    e.preventDefault();
    store.updateEmas({
      bsi_gram: parseFloat(document.getElementById('emas-bsi').value || 0),
      tring_gram: parseFloat(document.getElementById('emas-tring').value || 0),
      price_per_gram: parseInt(document.getElementById('emas-price').value || 0)
    });
    window.dispatchEvent(new CustomEvent('data-updated'));
    closeAllAssetModals();
  });

  // KPR Edit
  window.addEventListener('edit-kpr', () => {
    backdrop?.classList.add('open');
    document.getElementById('modal-edit-kpr')?.classList.add('open');
  });

  document.getElementById('form-kpr')?.addEventListener('submit', (e) => {
    e.preventDefault();
    store.updateKPR({
        bank: document.getElementById('kpr-bank').value,
        total: parseInt(document.getElementById('kpr-total').value || 0),
        paid: parseInt(document.getElementById('kpr-paid').value || 0),
        monthly: parseInt(document.getElementById('kpr-monthly').value || 0),
        remaining_months: parseInt(document.getElementById('kpr-months').value || 0)
    });
    window.dispatchEvent(new CustomEvent('data-updated'));
    closeAllAssetModals();
  });

  // Arisan Logic
  document.getElementById('btn-add-arisan')?.addEventListener('click', () => {
    document.getElementById('arisan-modal-title').innerText = 'Tambah Kelompok Arisan';
    document.getElementById('arisan-id').value = '';
    document.getElementById('form-arisan').reset();
    backdrop?.classList.add('open');
    document.getElementById('modal-edit-arisan')?.classList.add('open');
  });

  document.querySelectorAll('.btn-edit-arisan').forEach(btn => {
    btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const arisan = store.getAssets().arisan.find(a => a.id === id);
        if (arisan) {
            document.getElementById('arisan-modal-title').innerText = 'Edit Arisan';
            document.getElementById('arisan-id').value = arisan.id;
            document.getElementById('arisan-name').value = arisan.name;
            document.getElementById('arisan-amount').value = arisan.monthly_amount;
            document.getElementById('arisan-members').value = arisan.total_members;
            document.getElementById('arisan-turn').value = arisan.my_turn;
            document.getElementById('arisan-round').value = arisan.current_round;
            backdrop?.classList.add('open');
            document.getElementById('modal-edit-arisan')?.classList.add('open');
        }
    });
  });

  document.querySelectorAll('.btn-delete-arisan').forEach(btn => {
    btn.addEventListener('click', () => {
        if(confirm('Hapus data arisan ini?')) {
            store.deleteArisan(btn.dataset.id);
            window.dispatchEvent(new CustomEvent('data-updated'));
        }
    });
  });

  document.getElementById('form-arisan')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('arisan-id').value;
    const data = {
        name: document.getElementById('arisan-name').value,
        monthly_amount: parseInt(document.getElementById('arisan-amount').value),
        total_members: parseInt(document.getElementById('arisan-members').value),
        my_turn: parseInt(document.getElementById('arisan-turn').value),
        current_round: parseInt(document.getElementById('arisan-round').value),
        is_active: true
    };

    if (id) {
        store.updateArisan(id, data);
    } else {
        store.addArisan(data);
    }

    window.dispatchEvent(new CustomEvent('data-updated'));
    closeAllAssetModals();
  });
}

