// ============================================
// CIPTA Finansial — AI Scan Modal (Gemini Vision)
// ============================================

import store from '../data/store.js';
import CATEGORIES from '../data/categories.js';
import { showToast, formatRupiah } from '../utils/helpers.js';

const GEMINI_API_KEY = 'AIzaSyDqFQw69x7-Bboft5GRDQvc9T5ZrDQ7Szo';
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

export function renderScanModal() {
  return `
    <div class="modal-backdrop" id="scan-modal-backdrop"></div>
    <div class="modal-sheet" id="scan-modal-sheet">
      <div class="modal-handle"></div>
      <div class="modal-content">
        <h2 class="modal-title">📷 Scan Struk / Slip Gaji</h2>

        <div id="scan-upload-area" style="
          border: 2px dashed var(--outline-variant);
          border-radius: var(--radius-lg);
          padding: 40px 20px;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s;
          margin-bottom: 16px;
        ">
          <span class="material-icons-round" style="font-size: 48px; color: var(--outline);">add_a_photo</span>
          <p style="color: var(--on-surface-variant); margin-top: 8px; font-weight: 600;">Tap untuk ambil foto atau pilih gambar</p>
          <p style="color: var(--outline); font-size: 12px; margin-top: 4px;">Struk belanja, slip gaji, atau nota</p>
          <input type="file" id="scan-file-input" accept="image/*" capture="environment" style="display: none;" />
        </div>

        <!-- Preview -->
        <div id="scan-preview" style="display: none; margin-bottom: 16px; background: var(--surface-container-high); padding: 8px; border-radius: var(--radius-md); border: 1px solid var(--outline-variant);">
          <img id="scan-preview-img" style="width: 100%; border-radius: 4px; height: auto; object-fit: contain;" />
        </div>

        <!-- AI Result -->
        <div id="scan-result" style="display: none;">
          <div class="ai-bubble">
            <div class="ai-bubble-header">
              <div class="ai-bubble-avatar"><span class="material-icons-round" style="font-size: 16px;">auto_awesome</span></div>
              <span class="ai-bubble-name">Adam Family AI</span>
            </div>
            <div class="ai-bubble-text" id="scan-ai-text">Menganalisis gambar...</div>
          </div>

          <div id="scan-parsed-data" style="display: none;"></div>

          <button class="btn btn-primary btn-block" id="scan-save-btn" style="display: none; margin-top: 12px;">
            <span class="material-icons-round">save</span>
            Simpan Transaksi dari Scan
          </button>
        </div>

        <!-- Loading -->
        <div id="scan-loading" style="display: none; text-align: center; padding: 20px;">
          <div style="width: 40px; height: 40px; border: 3px solid var(--outline-variant); border-top-color: var(--primary); border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto;"></div>
          <p style="color: var(--on-surface-variant); margin-top: 12px; font-weight: 600;">Adam Family AI sedang membaca struk...</p>
        </div>

        <style>
          @keyframes spin { to { transform: rotate(360deg); } }
        </style>
      </div>
    </div>
  `;
}

let parsedData = null;

export function initScanModalEvents() {
  const backdrop = document.getElementById('scan-modal-backdrop');
  const sheet = document.getElementById('scan-modal-sheet');
  const uploadArea = document.getElementById('scan-upload-area');
  const fileInput = document.getElementById('scan-file-input');

  window.addEventListener('open-scan-modal', () => {
    backdrop?.classList.add('open');
    sheet?.classList.add('open');
    // Reset
    document.getElementById('scan-preview').style.display = 'none';
    document.getElementById('scan-result').style.display = 'none';
    document.getElementById('scan-loading').style.display = 'none';
    document.getElementById('scan-parsed-data').style.display = 'none';
    document.getElementById('scan-save-btn').style.display = 'none';
    parsedData = null;
  });

  backdrop?.addEventListener('click', () => {
    backdrop?.classList.remove('open');
    sheet?.classList.remove('open');
  });

  uploadArea?.addEventListener('click', () => fileInput?.click());

  fileInput?.addEventListener('change', async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const base64 = ev.target.result;
      document.getElementById('scan-preview-img').src = base64;
      document.getElementById('scan-preview').style.display = 'block';
      document.getElementById('scan-loading').style.display = 'block';
      document.getElementById('scan-result').style.display = 'none';

      try {
        await analyzeImage(base64.split(',')[1], file.type);
      } catch (err) {
        console.error('AI Error:', err);
        document.getElementById('scan-loading').style.display = 'none';
        document.getElementById('scan-result').style.display = 'block';
        document.getElementById('scan-ai-text').textContent = '❌ Gagal menganalisis gambar. Silakan coba lagi atau input manual.';
      }
    };
    reader.readAsDataURL(file);
  });

  document.getElementById('scan-save-btn')?.addEventListener('click', () => {
    if (!parsedData) return;

    const accounts = store.getAccounts();
    const defaultAccount = accounts[0]?.id;

    store.addTransaction({
      account_id: defaultAccount,
      amount: parsedData.amount || 0,
      type: parsedData.type || 'expense',
      description: parsedData.description || 'Transaksi dari Scan',
      parent_category: parsedData.category || 'Lainnya',
      sub_category: parsedData.sub_category || '',
      paid_by: store.getState().settings.togetherMode ? 'Istri' : 'Suami',
      for_whom: store.getState().settings.togetherMode ? 'Bersama' : 'Suami',
      is_together: store.getState().settings.togetherMode,
      created_at: parsedData.date ? new Date(parsedData.date).toISOString() : new Date().toISOString()
    });

    showToast('✅ Transaksi dari scan berhasil disimpan!');
    backdrop?.classList.remove('open');
    sheet?.classList.remove('open');
    window.dispatchEvent(new CustomEvent('data-updated'));
  });
}

async function analyzeImage(base64Data, mimeType) {
  const categoryNames = CATEGORIES.map(c => c.name).join(', ');

  const prompt = `Analisis gambar struk/nota/slip gaji berikut. Ekstrak informasi keuangan dan kembalikan dalam format JSON SAJA (tanpa markdown):
{
  "type": "expense" atau "income",
  "amount": angka total (tanpa titik/koma pemisah ribuan),
  "description": deskripsi singkat transaksi,
  "merchant": nama toko/merchant jika ada,
  "date": tanggal transaksi format YYYY-MM-DD jika terlihat,
  "category": salah satu dari [${categoryNames}],
  "sub_category": sub kategori yang sesuai,
  "items": [{"name": "nama item", "price": harga}] jika ada rincian,
  "summary": ringkasan dalam bahasa Indonesia (1-2 kalimat)
}

Jika ini slip gaji PNS, ekstrak: Gaji Pokok, Tunjangan, Potongan, dan Total Take Home Pay. Set type ke "income" dan amount ke take home pay.`;

  const response = await fetch(GEMINI_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        parts: [
          { text: prompt },
          {
            inline_data: {
              mime_type: mimeType || 'image/jpeg',
              data: base64Data
            }
          }
        ]
      }],
      generationConfig: {
        temperature: 0.1,
        maxOutputTokens: 1024
      }
    })
  });

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

  document.getElementById('scan-loading').style.display = 'none';
  document.getElementById('scan-result').style.display = 'block';

  try {
    // Try to extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      parsedData = JSON.parse(jsonMatch[0]);
      document.getElementById('scan-ai-text').innerHTML = `
        <strong>✅ Berhasil!</strong><br/>
        ${parsedData.summary || 'Data berhasil diekstrak dari gambar.'}
      `;

      // Show parsed data
      const parsedDiv = document.getElementById('scan-parsed-data');
      parsedDiv.style.display = 'block';
      parsedDiv.innerHTML = `
        <div style="background: var(--surface-container); border-radius: var(--radius-md); padding: 12px; margin-top: 12px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="font-weight: 600; color: var(--on-surface-variant);">${parsedData.type === 'income' ? '💰 Pemasukan' : '💸 Pengeluaran'}</span>
            <span style="font-weight: 800; color: ${parsedData.type === 'income' ? 'var(--success)' : 'var(--error)'};">${formatRupiah(parsedData.amount || 0)}</span>
          </div>
          <div style="font-size: 13px; color: var(--on-surface-variant);">
            <p>📝 ${parsedData.description || '-'}</p>
            ${parsedData.merchant ? `<p>🏪 ${parsedData.merchant}</p>` : ''}
            <p>📂 ${parsedData.category || '-'} → ${parsedData.sub_category || '-'}</p>
            ${parsedData.date ? `<p>📅 ${parsedData.date}</p>` : ''}
          </div>
          ${parsedData.items?.length ? `
            <div style="margin-top: 8px; border-top: 1px solid var(--outline-variant); padding-top: 8px;">
              <p style="font-weight: 600; font-size: 12px; margin-bottom: 4px;">Rincian:</p>
              ${parsedData.items.map(item => `
                <div style="display: flex; justify-content: space-between; font-size: 12px; color: var(--on-surface-variant); padding: 2px 0;">
                  <span>${item.name}</span>
                  <span>${formatRupiah(item.price)}</span>
                </div>
              `).join('')}
            </div>
          ` : ''}
        </div>
      `;

      document.getElementById('scan-save-btn').style.display = 'flex';
    } else {
      document.getElementById('scan-ai-text').textContent = text || 'Tidak dapat mengekstrak data dari gambar ini.';
    }
  } catch (parseErr) {
    document.getElementById('scan-ai-text').textContent = text || 'Gagal memproses respons AI.';
  }
}
