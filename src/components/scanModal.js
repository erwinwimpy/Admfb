// ============================================
// CIPTA Finansial — AI Assistant Modal (Gemini Vision & Text)
// ============================================

import store from '../data/store.js';
import CATEGORIES from '../data/categories.js';
import { showToast, formatRupiah } from '../utils/helpers.js';

export function renderScanModal() {
  return `
    <div class="modal-backdrop" id="scan-modal-backdrop"></div>
    <div class="modal-sheet" id="scan-modal-sheet">
      <div class="modal-handle"></div>
      <div class="modal-content">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <h2 class="modal-title" style="margin-bottom: 0;">🤖 Adam Family AI</h2>
          <button id="btn-force-config" class="btn btn-secondary" style="padding: 4px 8px; font-size: 11px;">
            <span class="material-icons-round" style="font-size: 14px; vertical-align: middle;">settings</span> Ganti Key
          </button>
        </div>

        <!-- API Key Setup (Hanya tampil jika kosong) -->
        <div id="ai-key-config" style="display: none; background: var(--error-container); padding: 12px; border-radius: var(--radius-md); margin-bottom: 16px;">
           <p style="font-size: 13px; color: var(--error); margin-bottom: 8px;"><b>⚠️ API Key AI Terputus</b><br/>Karena alasan keamanan dari pihak penyedia (Google), kunci bawaan telah dicabut. Untuk menggunakan fitur ini, Anda perlu membuat API Key gratis dari Google AI Studio dan memasukkannya di bawah ini.</p>
           <input type="text" id="ai-key-input" class="form-input" placeholder="Paste API Key Gemini Anda di sini..." />
           <p style="font-size: 11px; color: var(--error); margin-top: 4px;">Dapatkan gratis di: <a href="https://aistudio.google.com/app/apikey" target="_blank" style="text-decoration: underline; font-weight: bold;">aistudio.google.com</a></p>
           <button class="btn btn-primary" id="btn-save-key" style="margin-top: 8px;">Simpan Kunci di Memori HP</button>
        </div>

        <div id="ai-main-app">
          <div class="ai-tabs" style="display: flex; gap: 8px; margin-bottom: 16px;">
            <button id="tab-text" class="btn btn-secondary" style="flex:1; border-color: var(--primary); color: var(--primary); background: var(--primary-container);">📝 Cerita Bebas</button>
            <button id="tab-scan" class="btn btn-secondary" style="flex:1;">📷 Scan Foto</button>
          </div>

          <!-- Panel Text -->
          <div id="panel-text">
            <label class="form-label">Ceritakan pengeluaran Anda (Bisa Voice-to-Text):</label>
            <textarea class="form-input" id="ai-text-input" rows="4" placeholder="Contoh: Hari ini isi bensin 150rb pakai Jago, lalu makan padang 35rb..." style="resize: vertical;"></textarea>
            <button class="btn btn-primary btn-block" id="btn-analyze-text" style="margin-top: 12px;">
              <span class="material-icons-round">auto_awesome</span> Minta AI Mengkategorikan
            </button>
          </div>

          <!-- Panel Scan (Image) -->
          <div id="panel-scan" style="display: none;">
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
              <input type="file" id="scan-file-input" accept="image/*" style="display: none;" />
            </div>

            <!-- Preview -->
            <div id="scan-preview" style="display: none; margin-bottom: 16px; background: var(--surface-container-high); padding: 8px; border-radius: var(--radius-md); border: 1px solid var(--outline-variant);">
              <img id="scan-preview-img" style="width: 100%; border-radius: 4px; height: auto; object-fit: contain;" />
            </div>
          </div>
        </div> <!-- End of AI App -->

        <!-- AI Result -->
        <div id="scan-result" style="display: none; margin-top: 16px;">
          <div class="ai-bubble" style="background: var(--primary-container); border-radius: var(--radius-lg) var(--radius-lg) var(--radius-lg) 0px; padding: 12px; margin-bottom: 16px;">
            <div class="ai-bubble-header" style="display: flex; align-items: center; gap: 6px; margin-bottom: 8px; color: var(--primary); font-weight: 700;">
              <span class="material-icons-round" style="font-size: 18px;">auto_awesome</span>
              <span>Adam Family AI</span>
            </div>
            <div class="ai-bubble-text" id="scan-ai-text" style="font-size: 14px; line-height: 1.5;">Menganalisis...</div>
          </div>

          <div id="scan-parsed-data" style="display: none; max-height: 250px; overflow-y: auto; padding-right: 4px;"></div>

          <button class="btn btn-primary btn-block" id="scan-save-btn" style="display: none; margin-top: 16px;">
            <span class="material-icons-round">save</span>
            Simpan Semua Transaksi
          </button>
        </div>

        <!-- Loading -->
        <div id="scan-loading" style="display: none; text-align: center; padding: 20px;">
          <div style="width: 40px; height: 40px; border: 3px solid var(--outline-variant); border-top-color: var(--primary); border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto;"></div>
          <p style="color: var(--on-surface-variant); margin-top: 12px; font-weight: 600;">AI sedang memahami maksud Anda...</p>
        </div>

        <style>
          @keyframes spin { to { transform: rotate(360deg); } }
        </style>
      </div>
    </div>
  `;
}

let parsedDataArray = [];

export function initScanModalEvents() {
  const backdrop = document.getElementById('scan-modal-backdrop');
  const sheet = document.getElementById('scan-modal-sheet');
  const uploadArea = document.getElementById('scan-upload-area');
  const fileInput = document.getElementById('scan-file-input');
  
  const tabText = document.getElementById('tab-text');
  const tabScan = document.getElementById('tab-scan');
  const panelText = document.getElementById('panel-text');
  const panelScan = document.getElementById('panel-scan');

  // Key Registration elements
  const configBox = document.getElementById('ai-key-config');
  const mainApp = document.getElementById('ai-main-app');
  const btnSaveKey = document.getElementById('btn-save-key');
  const inputKey = document.getElementById('ai-key-input');

  function checkKeySetup() {
    const key = store.getState().settings.geminiApiKey;
    if (!key) {
      configBox.style.display = 'block';
      mainApp.style.display = 'none';
    } else {
      configBox.style.display = 'none';
      mainApp.style.display = 'block';
    }
  }

  btnSaveKey?.addEventListener('click', () => {
    const v = inputKey.value.trim();
    if (!v) {
      showToast('API Key tidak boleh kosong', 'error');
      return;
    }
    store.updateSettings({ geminiApiKey: v });
    showToast('API Key Berhasil Disimpan');
    checkKeySetup();
  });

  document.getElementById('btn-force-config')?.addEventListener('click', () => {
    configBox.style.display = 'block';
    mainApp.style.display = 'none';
    inputKey.value = store.getState().settings.geminiApiKey || '';
    inputKey.focus();
  });

  // Tabs logic
  tabText?.addEventListener('click', () => {
    panelText.style.display = 'block';
    panelScan.style.display = 'none';
    tabText.style.background = 'var(--primary-container)';
    tabText.style.color = 'var(--primary)';
    tabText.style.borderColor = 'var(--primary)';
    tabScan.style.background = 'transparent';
    tabScan.style.color = 'var(--on-surface-variant)';
    tabScan.style.borderColor = 'transparent';
  });

  tabScan?.addEventListener('click', () => {
    panelText.style.display = 'none';
    panelScan.style.display = 'block';
    tabScan.style.background = 'var(--primary-container)';
    tabScan.style.color = 'var(--primary)';
    tabScan.style.borderColor = 'var(--primary)';
    tabText.style.background = 'transparent';
    tabText.style.color = 'var(--on-surface-variant)';
    tabText.style.borderColor = 'transparent';
  });

  window.addEventListener('open-scan-modal', () => {
    backdrop?.classList.add('open');
    sheet?.classList.add('open');
    checkKeySetup();
    resetAIUI();
  });

  backdrop?.addEventListener('click', () => {
    backdrop?.classList.remove('open');
    sheet?.classList.remove('open');
  });

  // Text Analytics trigger
  document.getElementById('btn-analyze-text')?.addEventListener('click', async () => {
    const textVal = document.getElementById('ai-text-input')?.value?.trim();
    if (!textVal) {
      showToast('Silakan ceritakan pengeluaran Anda dulu', 'error');
      return;
    }
    prepareLoading();
    try {
      await analyzeWithAI(textVal, null, null);
    } catch (err) {
      handleAIError(err);
    }
  });

  // Image Upload trigger
  uploadArea?.addEventListener('click', () => fileInput?.click());
  fileInput?.addEventListener('change', async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    prepareLoading();
    const reader = new FileReader();
    reader.onload = async (ev) => {
      let imageData = ev.target.result;
      
      // Compress image before sending to AI (Mobile reliability)
      try {
        imageData = await compressImage(imageData);
      } catch (cErr) {
        console.warn('Compression failed, using original', cErr);
      }

      document.getElementById('scan-preview-img').src = imageData;
      document.getElementById('scan-preview').style.display = 'block';
      
      try {
        await analyzeWithAI(null, imageData.split(',')[1], 'image/jpeg');
      } catch (err) {
        handleAIError(err);
      }
    };
    reader.readAsDataURL(file);
  });

  document.getElementById('scan-save-btn')?.addEventListener('click', () => {
    if (!parsedDataArray || parsedDataArray.length === 0) return;

    const accounts = store.getAccounts();
    const state = store.getState();
    const isTogether = state.settings.togetherMode;

    let totalSaved = 0;

    parsedDataArray.forEach(tx => {
      let matchedAccountId = accounts.find(a => a.bank_name.toLowerCase().includes('tunai'))?.id; // default tunai
      if (tx.account_guess) {
         const guess = tx.account_guess.toLowerCase();
         const found = accounts.find(a => a.bank_name.toLowerCase().includes(guess));
         if (found) matchedAccountId = found.id;
      }
      
      if (!matchedAccountId && accounts.length > 0) matchedAccountId = accounts[0].id;

      let toMatchedAccountId = null;
      if (tx.type === 'transfer' && tx.to_account_guess) {
         const tGuess = tx.to_account_guess.toLowerCase();
         const tFound = accounts.find(a => a.bank_name.toLowerCase().includes(tGuess));
         if (tFound) toMatchedAccountId = tFound.id;
      }

      store.addTransaction({
        account_id: matchedAccountId,
        to_account_id: toMatchedAccountId,
        amount: tx.amount || 0,
        type: tx.type || 'expense',
        description: tx.description || 'Transaksi AI',
        parent_category: tx.category || 'Lainnya',
        sub_category: tx.sub_category || '',
        paid_by: isTogether ? state.settings.spouseName : state.settings.userName,
        for_whom: isTogether ? 'Bersama' : state.settings.userName,
        is_together: isTogether,
        created_at: tx.date ? new Date(tx.date).toISOString() : new Date().toISOString()
      });
      totalSaved++;
    });

    showToast(`✅ ${totalSaved} transaksi dari AI berhasil disimpan!`);
    backdrop?.classList.remove('open');
    sheet?.classList.remove('open');
    window.dispatchEvent(new CustomEvent('data-updated'));
    resetAIUI();
  });
}

function resetAIUI() {
  document.getElementById('scan-preview').style.display = 'none';
  document.getElementById('scan-result').style.display = 'none';
  document.getElementById('scan-loading').style.display = 'none';
  document.getElementById('scan-parsed-data').style.display = 'none';
  document.getElementById('scan-save-btn').style.display = 'none';
  document.getElementById('ai-text-input').value = '';
  document.getElementById('scan-file-input').value = '';
  parsedDataArray = [];
}

function prepareLoading() {
  document.getElementById('scan-loading').style.display = 'block';
  document.getElementById('scan-result').style.display = 'none';
  // Jika config box error sebelumnya masih tampil
  const configBox = document.getElementById('ai-key-config');
  if(configBox) configBox.style.display = 'none';
  const mainApp = document.getElementById('ai-main-app');
  if(mainApp) mainApp.style.display = 'block';
}

function handleAIError(err) {
  console.error('AI Error:', err);
  document.getElementById('scan-loading').style.display = 'none';
  document.getElementById('scan-result').style.display = 'block';
  let errMsg = '❌ Maaf, Gagal memproses AI. Silakan coba deksripsi yang lebih jelas.';
  if (err.message && (err.message.includes('403') || err.message.includes('leaked') || err.message.includes('Forbidden'))) {
    errMsg = `
      <b>❌ Akses Ditolak (API Key Bermasalah)</b><br/>
      Kunci AI Anda saat ini sudah tidak aktif atau dianggap bocor oleh Google.<br/><br/>
      <button class="btn btn-primary" onclick="document.getElementById('btn-force-config').click()" style="padding: 8px 16px; font-size: 12px; height: auto;">
        Klik di sini untuk Memasukkan Key Baru
      </button>
    `;
    store.updateSettings({ geminiApiKey: '' }); 
  }
  document.getElementById('scan-ai-text').innerHTML = errMsg;
  document.getElementById('scan-parsed-data').style.display = 'none';
  document.getElementById('scan-save-btn').style.display = 'none';
}

async function analyzeWithAI(rawText, base64Data, mimeType) {
  const state = store.getState();
  const GEMINI_API_KEY = state.settings.geminiApiKey;
  if (!GEMINI_API_KEY) throw new Error("API Key Missing");

  const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;
  
  const categoryNames = CATEGORIES.map(c => c.name).join(', ');
  const accounts = store.getAccounts();
  const accountListStr = accounts.map(a => `- ID ${a.id}: ${a.bank_name} (${a.owner_name})`).join('\n');

  const prompt = `Anda adalah Asisten Keuangan Keluarga 'Adam Family'. Tugas Anda mengekstrak transaksi dari cerita informal (bahasa gaul/sehari-hari) atau gambar struk.

KONTEKS REKENING YANG TERSEDIA:
${accountListStr}

ATURAN EKSTRAKSI:
1. Sangat Pahami bahasa Indonesia informal/gaul (cth: jeti/jt=juta, rb/k=ribu, duit/dana/saldu, sisaan, pake, dikasih, gajian, pelicin, jajan, narik atm, dll).
2. Lakukan perhitungan matematika jika ada kata 'sisanya' atau 'remainder'. 
   Contoh: "Gaji 5jt, sedekah 1jt, sisanya tabung" -> Transaksi 1: 5jt (Income), Transaksi 2: 1jt (Expense), Transaksi 3: 4jt (Transfer/Save).
3. Sangat sensitif terhadap arah mutasi uang (Pemasukan vs Pengeluaran).
4. Hasil harus berupa JSON ARRAY valid ([ {...} ]) SAJA tanpa markdown.

STRUKTUR JSON ITEM:
- "type": "expense", "income", atau "transfer"
- "amount": angka integer murni (tanpa titik/huruf). Pahami "4jt" = 4000000, "150rb" = 150000, "50k" = 50000.
- "description": nama item/kegiatan.
- "category": Jika expense pilih dari [${categoryNames}]. Jika income: "Gaji/Pendapatan". Jika transfer: "Mutasi".
- "account_id": Pilih ID Rekening SUMBER (Darimana uangnya). Jika tidak disebutkan, gunakan Rekening 'Tunai' atau ID yang paling logis.
- "to_account_id": (Hanya jika type="transfer") ID Rekening TUJUAN (Ke mana uangnya).

INPUT: "${rawText || 'Analisis gambar struk lampiran'}"`;

  let parts = [{ text: prompt }];

  if (base64Data) {
    parts.push({
      inlineData: {
        mimeType: mimeType || 'image/jpeg',
        data: base64Data
      }
    });
  }

  const response = await fetch(GEMINI_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts }],
      generationConfig: { temperature: 0.1, maxOutputTokens: 2048 }
    })
  });

  if (!response.ok) {
     const errorData = await response.json().catch(() => ({}));
     const msg = errorData.error?.message || response.statusText;
     if (response.status === 403) throw new Error("403 Forbidden: API Key Problem");
     if (response.status === 404) throw new Error("404 Not Found: Model name error");
     if (response.status === 503) throw new Error("503 Service Busy: Server Google penuh, coba lagi sesaat lagi.");
     throw new Error(`HTTP Error ${response.status}: ${msg}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

  document.getElementById('scan-loading').style.display = 'none';
  document.getElementById('scan-result').style.display = 'block';

  try {
    const jsonMatch = text.match(/\[[\s\S]*\]/) || text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("AI memberikan respon teks saja, bukan data transaksi.");

    let parsed = JSON.parse(jsonMatch[0]);
    if (!Array.isArray(parsed)) parsed = [parsed];
    parsedDataArray = parsed;

    if (parsedDataArray.length === 0) {
      throw new Error("Data transaksi kosong.");
    }

    document.getElementById('scan-ai-text').innerHTML = `
      <strong>✨ AI Selesai Menganalisis!</strong><br/>
      Saya menemukan ${parsedDataArray.length} transaksi dari cerita Anda.
    `;

    // Show mapped boxes
    const parsedDiv = document.getElementById('scan-parsed-data');
    parsedDiv.style.display = 'block';
    
    parsedDiv.innerHTML = parsedDataArray.map(tx => {
      const sourceAcc = accounts.find(a => a.id == tx.account_id) || { bank_name: 'Unknown' };
      const destAcc = tx.to_account_id ? accounts.find(a => a.id == tx.to_account_id) : null;
      
      return `
        <div style="background: var(--surface-container); border-radius: var(--radius-md); padding: 12px; margin-top: 12px; border: 1px solid var(--outline-variant);">
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="font-weight: 600; color: var(--on-surface-variant);">${tx.type === 'income' ? '💰 Pemasukan' : tx.type === 'transfer' ? '🔁 Transfer' : '💸 Pengeluaran'}</span>
            <span style="font-weight: 800; color: ${tx.type === 'income' ? 'var(--success)' : tx.type === 'transfer' ? 'var(--primary)' : 'var(--error)'};">${formatRupiah(tx.amount || 0)}</span>
          </div>
          <div style="font-size: 13px; color: var(--on-surface-variant);">
            <p>📝 <strong>${tx.description || '-'}</strong></p>
            <p>📂 ${tx.category || '-'} ${tx.sub_category ? '→ ' + tx.sub_category : ''}</p>
            <p>💳 Rekening: <strong>${sourceAcc.bank_name} ${destAcc ? '➡️ ' + destAcc.bank_name : ''}</strong></p>
          </div>
        </div>
      `;
    }).join('');

    document.getElementById('scan-save-btn').style.display = 'flex';
  } catch (parseErr) {
    console.error(parseErr, text);
    throw new Error("Gagal membaca data: " + parseErr.message);
  }
}

/**
 * Compresses and resizes image for better mobile performance and API reliability
 */
function compressImage(base64Str, maxWidth = 1200) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = base64Str;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      
      // Return as JPEG with 0.8 quality
      resolve(canvas.toDataURL('image/jpeg', 0.8));
    };
    img.onerror = reject;
  });
}
