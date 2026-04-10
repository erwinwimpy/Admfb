const GEMINI_API_KEY = 'AIzaSyDqFQw69x7-Bboft5GRDQvc9T5ZrDQ7Szo';
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

const categoryNames = "Transportasi, Makanan & Minuman, Rumah Tangga";
const rawText = "saya membeli bakso 1 mangkok untuk saya sendiri dengan harga 15000";

const prompt = `Secara mendalam analisis teks/cerita berikut terkait pencatatan pengeluaran. Ekstrak rincian keuangan ke dalam format array JSON Object valid ([ { ... }, { ... } ]) TANPA block markdown.
Informasi Input Teks: "${rawText}"

Setiap item JSON merepresentasikan SATU transaksi. Harus memiliki kunci berikut:
- "type": "expense" atau "income"
- "amount": angka total transaksi ini (tanpa koma/huruf)
- "description": deskripsi/nama item pengeluaran ini
- "merchant": nama toko (jika ada)
- "date": estimasi tanggal format YYYY-MM-DD
- "category": wajib persis salah satu dari [${categoryNames}]
- "sub_category": tebakan sub kategori
- "account_guess": tebak pembayar menggunakan apa. Kembalikan salah satu keyword ini: 'jago', 'bsi', 'bri', 'tunai'. Jika tidak bisa menerka, berikan 'tunai'.

Pastikan merespon hanya dengan RAW JSON Array saja.`;

let parts = [{ text: prompt }];

fetch(GEMINI_ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    contents: [{ parts }],
    generationConfig: { temperature: 0.1, maxOutputTokens: 2048 }
  })
}).then(async r => {
  console.log('Status', r.status);
  const data = await r.json();
  console.log(JSON.stringify(data, null, 2));
}).catch(console.error);
