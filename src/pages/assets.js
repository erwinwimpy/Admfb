// ============================================
// CIPTA Finansial — Assets Page
// ============================================

import store from '../data/store.js';
import { formatRupiah, percentage, showToast } from '../utils/helpers.js';

export function renderAssetsPage() {
  const state = store.getState();
  const assets = state.assets;
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
  
  // Custom Assets
  const customAssets = assets.custom || [];

  return `
    <div class="page-container animate-fade-in" id="assets-page" style="padding-bottom: 100px;">
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

      <!-- Quick Action: Tambah Aset -->
      <button class="btn btn-secondary btn-block" style="margin-bottom: 24px; border: 2px dashed var(--outline-variant); background: none;" id="btn-show-add-asset">
        <span class="material-icons-round">add_business</span>
        Tambah Aset / Cicilan Baru
      </button>

      <!-- Emas Section -->
      <div class="asset-card" id="asset-emas">
        <div class="asset-card-header" style="justify-content: space-between;">
          <div style="display: flex; gap: 12px; align-items: center;">
            <div class="asset-card-icon emas"><span class="material-icons-round">diamond</span></div>
            <div>
              <div class="asset-card-title">Investasi Emas</div>
              <div class="asset-card-subtitle">BSI Gold & Tring</div>
            </div>
          </div>
          <button class="btn btn-secondary" style="padding: 8px; border-radius: 50%; width: 36px; height: 36px;" id="btn-edit-emas-trigger">
            <span class="material-icons-round" style="font-size: 18px;">edit</span>
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
      </div>

      <!-- KPR Section -->
      <div class="asset-card" id="asset-kpr">
        <div class="asset-card-header" style="justify-content: space-between;">
          <div style="display: flex; gap: 12px; align-items: center;">
            <div class="asset-card-icon kpr"><span class="material-icons-round">home</span></div>
            <div>
              <div class="asset-card-title">KPR ${kpr.bank || 'BTN'}</div>
              <div class="asset-card-subtitle">Kredit Pemilikan Rumah</div>
            </div>
          </div>
          <button class="btn btn-secondary" style="padding: 8px; border-radius: 50%; width: 36px; height: 36px;" id="btn-edit-kpr-trigger">
            <span class="material-icons-round" style="font-size: 18px;">edit</span>
          </button>
        </div>

        <div style="text-align: center; margin-bottom: 16px;">
          <div style="position: relative; width: 120px; height: 120px; margin: 0 auto;">
            <svg width="120" height="120" viewBox="0 0 120 120" style="transform: rotate(-90deg);">
              <circle cx="60" cy="60" r="50" fill="none" stroke="var(--outline-variant)" stroke-width="8" opacity="0.3" />
              <circle cx="60" cy="60" r="50" fill="none" stroke="var(--primary)" stroke-width="8"
                stroke-dasharray="${2 * Math.PI * 50}"
                stroke-dashoffset="${2 * Math.PI * 50 * (1 - kprPercent / 100)}"
                stroke-linecap="round" />
            </svg>
            <div style="position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center;">
              <div style="font-size: 1.5rem; font-weight: 800; color: var(--primary);">${kprPercent}%</div>
            </div>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px;">
          <div style="background: var(--surface-container); border-radius: var(--radius-md); padding: 12px;">
            <div style="font-size: 11px; color: var(--on-surface-variant);">Sudah Bayar</div>
            <div style="font-size: 14px; font-weight: 800; color: var(--success);">${formatRupiah(kpr.paid, true)}</div>
          </div>
          <div style="background: var(--surface-container); border-radius: var(--radius-md); padding: 12px;">
            <div style="font-size: 11px; color: var(--on-surface-variant);">Iuran/Bulan</div>
            <div style="font-size: 14px; font-weight: 800; color: var(--on-surface);">${formatRupiah(kpr.monthly, true)}</div>
          </div>
        </div>
        
        <button class="btn btn-primary btn-block btn-pay-monthly" data-type="kpr" style="background: var(--primary-container); color: var(--on-primary-container);">
          <span class="material-icons-round">check_circle</span>
          Bayar Cicilan Bulan Ini
        </button>
      </div>

      <!-- Arisan Section -->
      <div class="asset-card" id="asset-arisan">
        <div class="asset-card-header" style="justify-content: space-between;">
          <div style="display: flex; gap: 12px; align-items: center;">
            <div class="asset-card-icon arisan"><span class="material-icons-round">groups</span></div>
            <div>
              <div class="asset-card-title">Arisan</div>
              <div class="asset-card-subtitle">${arisanList.length} kelompok aktif</div>
            </div>
          </div>
          <button class="btn btn-secondary" style="padding: 8px; border-radius: 50%; width: 36px; height: 36px;" id="btn-add-arisan">
            <span class="material-icons-round" style="font-size: 18px;">add</span>
          </button>
        </div>

        ${arisanList.map(arisan => `
          <div style="background: var(--surface-container); border-radius: var(--radius-md); padding: 12px; margin-bottom: 8px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <div style="font-weight: 700;">${arisan.name}</div>
              <div style="display: flex; gap: 4px;">
                <button class="btn-edit-arisan" data-id="${arisan.id}" style="padding: 4px; background: none; border: none; color: var(--primary);"><span class="material-icons-round" style="font-size: 18px;">edit</span></button>
                <button class="btn-delete-arisan" data-id="${arisan.id}" style="padding: 4px; background: none; border: none; color: var(--error);"><span class="material-icons-round" style="font-size: 18px;">delete</span></button>
              </div>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 8px;">
               <span>Iuran: <b>${formatRupiah(arisan.monthly_amount, true)}</b></span>
               <span>Putaran: <b>${arisan.current_round}/${arisan.total_members}</b></span>
            </div>
            <button class="btn btn-block btn-pay-monthly" data-type="arisan" data-id="${arisan.id}" style="font-size: 12px; padding: 6px; border: 1px dashed var(--primary); color: var(--primary); background: none;">
              Bayar Iuran
            </button>
          </div>
        `).join('')}
      </div>

      <!-- Custom Assets Section -->
      ${customAssets.length > 0 ? `
        <div class="section-header" style="margin-top: 24px;">
          <h2 class="section-title">Aset Lain & Cicilan</h2>
        </div>
        ${customAssets.map(asset => `
          <div class="asset-card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
               <div style="font-weight: 800;">${asset.name}</div>
               <button class="btn-delete-custom" data-id="${asset.id}" style="color: var(--error); background: none; border: none;"><span class="material-icons-round">delete</span></button>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px;">
              <div style="background: var(--surface-container); padding: 10px; border-radius: var(--radius-sm);">
                <div style="font-size: 10px; opacity: 0.6;">Nilai/Plafon</div>
                <div style="font-weight: 700;">${formatRupiah(asset.total_value || asset.total_loan, true)}</div>
              </div>
              <div style="background: var(--surface-container); padding: 10px; border-radius: var(--radius-sm);">
                <div style="font-size: 10px; opacity: 0.6;">Terbayar</div>
                <div style="font-weight: 700;">${formatRupiah(asset.paid || 0, true)}</div>
              </div>
            </div>
            <button class="btn btn-block btn-pay-monthly" data-type="custom" data-id="${asset.id}" style="font-size: 12px; padding: 8px; background: var(--tertiary-container); color: var(--on-tertiary-container);">
              Bayar Cicilan (${formatRupiah(asset.monthly_amount || 0, true)})
            </button>
          </div>
        `).join('')}
      ` : ''}

      <!-- Modals Layer -->
      <div class="modal-backdrop" id="asset-modal-backdrop"></div>
      
      <!-- Account Picker for Monthly Payment -->
      <div class="modal-sheet" id="pick-acc-sheet">
        <div class="modal-handle"></div>
        <div class="modal-content">
           <h2 class="modal-title">Pilih Rekening Pembayar</h2>
           <p style="font-size: 13px; color: var(--on-surface-variant); margin-bottom: 16px;">
             Uang akan dipotong dari saldo rekening yang dipilih.
           </p>
           <div id="acc-picker-list" style="display: flex; flex-direction: column; gap: 8px;"></div>
           <input type="hidden" id="pending-pay-type" />
           <input type="hidden" id="pending-pay-id" />
        </div>
      </div>

      <!-- Add General Asset Modal -->
      <div class="modal-sheet" id="gen-asset-sheet">
         <div class="modal-handle"></div>
         <div class="modal-content">
            <h2 class="modal-title">Tambah Aset / Cicilan</h2>
            <form id="form-add-gen-asset">
               <div class="form-group">
                 <label class="form-label">Nama Aset (Misal: Tanah, Laptop)</label>
                 <input type="text" class="form-input" id="gen-asset-name" required />
               </div>
               <div class="form-group">
                 <label class="form-label">Nilai Total / Plafon Hutang</label>
                 <input type="number" class="form-input" id="gen-asset-total" required />
               </div>
               <div class="form-group">
                 <label class="form-label">Cicilan per Bulan (Opsional)</label>
                 <input type="number" class="form-input" id="gen-asset-monthly" placeholder="Kosongkan jika bukan cicilan" />
               </div>
               <button type="submit" class="btn btn-primary btn-block">Tambahkan Aset</button>
            </form>
         </div>
      </div>

      <!-- Edit Emas Modal -->
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

      <!-- Edit KPR Modal -->
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
              <label class="form-label">Total Harga Rumah / Plafon</label>
              <input type="number" class="form-input" id="kpr-total" value="${kpr.total}" />
            </div>
            <div class="form-group">
              <label class="form-label">Sudah Terbayar</label>
              <input type="number" class="form-input" id="kpr-paid" value="${kpr.paid}" />
            </div>
            <div class="form-group">
              <label class="form-label">Cicilan per Bulan</label>
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
          <h2 class="modal-title" id="arisan-modal-title">Arisan</h2>
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
              <label class="form-label">Urutan Saya</label>
              <input type="number" class="form-input" id="arisan-turn" required />
            </div>
            <div class="form-group">
              <label class="form-label">Putaran Saat Ini</label>
              <input type="number" class="form-input" id="arisan-round" value="1" />
            </div>
            <button type="submit" class="btn btn-primary btn-block">Simpan Arisan</button>
          </form>
        </div>
      </div>
    </div>
  `;
}

export function initAssetsPageEvents() {
  const backdrop = document.getElementById('asset-modal-backdrop');
  
  const closeAll = () => {
    backdrop?.classList.remove('open');
    document.querySelectorAll('.modal-sheet').forEach(m => m.classList.remove('open'));
  };

  backdrop?.addEventListener('click', closeAll);

  // Open modals
  document.getElementById('btn-show-add-asset')?.addEventListener('click', () => {
    backdrop.classList.add('open');
    document.getElementById('gen-asset-sheet')?.classList.add('open');
  });

  document.getElementById('btn-edit-emas-trigger')?.addEventListener('click', () => {
    backdrop.classList.add('open');
    document.getElementById('modal-edit-emas')?.classList.add('open');
  });

  document.getElementById('btn-edit-kpr-trigger')?.addEventListener('click', () => {
    backdrop.classList.add('open');
    document.getElementById('modal-edit-kpr')?.classList.add('open');
  });

  document.getElementById('btn-add-arisan')?.addEventListener('click', () => {
    document.getElementById('form-arisan').reset();
    document.getElementById('arisan-id').value = '';
    backdrop.classList.add('open');
    document.getElementById('modal-edit-arisan')?.classList.add('open');
  });

  // Monthly Pay Flow
  document.querySelectorAll('.btn-pay-monthly').forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.dataset.type;
      const id = btn.dataset.id || '';
      
      document.getElementById('pending-pay-type').value = type;
      document.getElementById('pending-pay-id').value = id;
      
      const accounts = store.getAccounts();
      const list = document.getElementById('acc-picker-list');
      list.innerHTML = accounts.map(acc => `
        <div class="card acc-pick-item" data-acc-id="${acc.id}" style="display: flex; justify-content: space-between; align-items: center; padding: 12px; cursor: pointer;">
          <div>
            <div style="font-weight: 700;">${acc.bank_name}</div>
            <div style="font-size: 11px; opacity: 0.6;">${acc.owner_name}</div>
          </div>
          <div style="font-weight: 800; color: var(--primary);">${formatRupiah(acc.balance, true)}</div>
        </div>
      `).join('');

      document.querySelectorAll('.acc-pick-item').forEach(item => {
        item.onclick = () => {
          const accId = parseInt(item.dataset.accId);
          const payType = document.getElementById('pending-pay-type').value;
          const payId = document.getElementById('pending-pay-id').value;
          store.payAssetMonthly(payType, payId, accId);
          showToast('✅ Pembayaran berhasil dicatat!', 'success');
          closeAll();
          window.dispatchEvent(new CustomEvent('data-updated'));
        };
      });

      backdrop.classList.add('open');
      document.getElementById('pick-acc-sheet')?.classList.add('open');
    });
  });

  // Form Submissions
  document.getElementById('form-emas')?.addEventListener('submit', (e) => {
    e.preventDefault();
    store.updateEmas({
      bsi_gram: parseFloat(document.getElementById('emas-bsi').value || 0),
      tring_gram: parseFloat(document.getElementById('emas-tring').value || 0),
      price_per_gram: parseInt(document.getElementById('emas-price').value || 0)
    });
    window.dispatchEvent(new CustomEvent('data-updated'));
    closeAll();
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
    closeAll();
  });

  document.getElementById('form-add-gen-asset')?.addEventListener('submit', (e) => {
    e.preventDefault();
    store.addCustomAsset({
      name: document.getElementById('gen-asset-name').value,
      total_value: parseInt(document.getElementById('gen-asset-total').value),
      monthly_amount: parseInt(document.getElementById('gen-asset-monthly').value || 0),
      paid: 0
    });
    window.dispatchEvent(new CustomEvent('data-updated'));
    closeAll();
  });

  document.querySelectorAll('.btn-edit-arisan').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const arisan = store.getAssets().arisan.find(a => a.id === id);
      if (arisan) {
        document.getElementById('arisan-id').value = arisan.id;
        document.getElementById('arisan-name').value = arisan.name;
        document.getElementById('arisan-amount').value = arisan.monthly_amount;
        document.getElementById('arisan-members').value = arisan.total_members;
        document.getElementById('arisan-turn').value = arisan.my_turn;
        document.getElementById('arisan-round').value = arisan.current_round;
        backdrop.classList.add('open');
        document.getElementById('modal-edit-arisan').classList.add('open');
      }
    });
  });

  document.querySelectorAll('.btn-delete-arisan').forEach(btn => {
    btn.addEventListener('click', () => {
      if(confirm('Hapus arisan ini?')) {
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
    if (id) store.updateArisan(id, data);
    else store.addArisan(data);
    window.dispatchEvent(new CustomEvent('data-updated'));
    closeAll();
  });

  document.querySelectorAll('.btn-delete-custom').forEach(btn => {
    btn.addEventListener('click', () => {
      if(confirm('Hapus aset kustom ini?')) {
        store.deleteCustomAsset(btn.dataset.id);
        window.dispatchEvent(new CustomEvent('data-updated'));
      }
    });
  });
}
