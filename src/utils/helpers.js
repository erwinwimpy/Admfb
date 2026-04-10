// ============================================
// CIPTA Finansial — Utility Helpers
// ============================================

/**
 * Format number as Indonesian Rupiah
 */
export function formatRupiah(amount, compact = false) {
  if (compact && Math.abs(amount) >= 1000000) {
    return 'Rp ' + (amount / 1000000).toFixed(1).replace('.0', '') + ' jt';
  }
  if (compact && Math.abs(amount) >= 1000) {
    return 'Rp ' + (amount / 1000).toFixed(0) + ' rb';
  }
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Format date in Indonesian
 */
export function formatDate(dateStr, format = 'long') {
  const d = new Date(dateStr);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  const monthsFull = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

  if (format === 'short') {
    return `${d.getDate()} ${months[d.getMonth()]}`;
  }
  if (format === 'long') {
    return `${days[d.getDay()]}, ${d.getDate()} ${monthsFull[d.getMonth()]} ${d.getFullYear()}`;
  }
  if (format === 'time') {
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  }
  if (format === 'relative') {
    const now = new Date();
    const diff = now - d;
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return 'Baru saja';
    if (minutes < 60) return `${minutes} menit lalu`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} jam lalu`;
    const daysDiff = Math.floor(hours / 24);
    if (daysDiff === 1) return 'Kemarin';
    if (daysDiff < 7) return `${daysDiff} hari lalu`;
    return `${d.getDate()} ${months[d.getMonth()]}`;
  }
  if (format === 'group') {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (d.toDateString() === today.toDateString()) return 'Hari Ini';
    if (d.toDateString() === yesterday.toDateString()) return 'Kemarin';
    return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]}`;
  }
  return d.toLocaleDateString('id-ID');
}

/**
 * Get current month name
 */
export function getCurrentMonthName() {
  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  return months[new Date().getMonth()];
}

/**
 * Group transactions by date
 */
export function groupByDate(transactions) {
  const groups = {};
  transactions.forEach(tx => {
    const key = formatDate(tx.created_at, 'group');
    if (!groups[key]) groups[key] = [];
    groups[key].push(tx);
  });
  return groups;
}

/**
 * Animate counter
 */
export function animateCounter(element, target, duration = 800) {
  const start = parseInt(element.textContent.replace(/\D/g, '') || '0');
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(start + (target - start) * eased);
    element.textContent = formatRupiah(current);
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

/**
 * Show toast notification
 */
export function showToast(message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => toast.remove(), 3000);
}

/**
 * Create element helper
 */
export function createElement(tag, attrs = {}, children = []) {
  const el = document.createElement(tag);
  Object.entries(attrs).forEach(([key, val]) => {
    if (key === 'className') el.className = val;
    else if (key === 'innerHTML') el.innerHTML = val;
    else if (key === 'textContent') el.textContent = val;
    else if (key.startsWith('on')) el.addEventListener(key.slice(2).toLowerCase(), val);
    else el.setAttribute(key, val);
  });
  children.forEach(child => {
    if (typeof child === 'string') el.appendChild(document.createTextNode(child));
    else if (child) el.appendChild(child);
  });
  return el;
}

/**
 * Debounce
 */
export function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Percentage calculator
 */
export function percentage(value, total) {
  if (!total) return 0;
  return Math.min(Math.round((value / total) * 100), 100);
}
