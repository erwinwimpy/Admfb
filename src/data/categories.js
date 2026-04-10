// ============================================
// CIPTA Finansial — Category Hierarchy
// ============================================

export const CATEGORIES = [
  {
    name: 'Makanan & Minuman',
    icon: 'restaurant',
    subs: ['Makan Harian', 'Makan di Luar', 'Cemilan', 'Kopi & Minuman', 'Groceries']
  },
  {
    name: 'Transportasi',
    icon: 'directions_car',
    subs: ['Bensin LDM', 'Bensin Harian', 'Parkir', 'Tol', 'Servis Kendaraan', 'Ojol / Grab']
  },
  {
    name: 'Rumah Tangga',
    icon: 'home',
    subs: ['Listrik', 'Air PDAM', 'Internet', 'Gas LPG', 'Perabot', 'Kebersihan']
  },
  {
    name: 'Pendidikan Anak',
    icon: 'school',
    subs: ['SPP', 'Buku & Alat Tulis', 'Les/Kursus', 'Seragam', 'Uang Jajan']
  },
  {
    name: 'Kesehatan',
    icon: 'local_hospital',
    subs: ['Obat', 'Dokter', 'Vitamin', 'BPJS Tambahan']
  },
  {
    name: 'Pakaian & Fashion',
    icon: 'checkroom',
    subs: ['Pakaian', 'Sepatu', 'Aksesoris']
  },
  {
    name: 'Hiburan',
    icon: 'celebration',
    subs: ['Jalan-jalan', 'Quality Time', 'Film', 'Langganan Digital', 'Hobi']
  },
  {
    name: 'Sosial & Ibadah',
    icon: 'volunteer_activism',
    subs: ['Sedekah', 'Zakat', 'Sumbangan', 'Hajatan', 'Arisan']
  },
  {
    name: 'Investasi',
    icon: 'trending_up',
    subs: ['Emas BSI', 'Emas Tring', 'Tabungan', 'Deposito']
  },
  {
    name: 'Cicilan',
    icon: 'account_balance',
    subs: ['KPR', 'Kredit Motor', 'Pinjaman']
  },
  {
    name: 'Gaji & Pendapatan',
    icon: 'payments',
    subs: ['Gaji Pokok', 'Tunjangan Kinerja', 'TPP', 'Penghasilan Lain', 'Arisan Masuk']
  },
  {
    name: 'Lainnya',
    icon: 'more_horiz',
    subs: ['Tak Terduga', 'Donasi', 'Lain-lain']
  }
];

export function getCategoryIcon(parentCategory) {
  const cat = CATEGORIES.find(c => c.name === parentCategory);
  return cat ? cat.icon : 'receipt_long';
}

export function getSubCategories(parentCategory) {
  const cat = CATEGORIES.find(c => c.name === parentCategory);
  return cat ? cat.subs : [];
}

export default CATEGORIES;
