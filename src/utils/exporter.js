// ============================================
// CIPTA Finansial — Export Utility (Excel & PDF)
// ============================================

import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { formatRupiah } from './helpers.js';

/**
 * Export transactions to Excel
 * @param {Array} transactions 
 * @param {String} fileName 
 */
export function exportToExcel(transactions, fileName = 'Rekap_Adam_Family.xlsx') {
  const data = transactions.map(t => ({
    'Tanggal': new Date(t.created_at).toLocaleDateString('id-ID'),
    'Jenis': t.type === 'expense' ? 'Pengeluaran' : (t.type === 'income' ? 'Pemasukan' : 'Transfer'),
    'Kategori': t.parent_category,
    'Sub-Kategori': t.sub_category,
    'Deskripsi': t.description,
    'Nominal': t.amount,
    'Dibayar Oleh': t.paid_by,
    'Untuk': t.for_whom,
    'Bersama?': t.is_together ? 'Ya' : 'Tidak'
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Transaksi');
  
  // Auto-width columns
  const wscols = [
    { wch: 12 }, { wch: 12 }, { wch: 15 }, { wch: 15 }, 
    { wch: 25 }, { wch: 15 }, { wch: 12 }, { wch: 12 }, { wch: 10 }
  ];
  worksheet['!cols'] = wscols;

  XLSX.writeFile(workbook, fileName);
}

/**
 * Generate PDF from a target HTML element
 * @param {HTMLElement} element 
 * @param {String} fileName 
 */
export async function exportToPDF(element, fileName = 'Laporan_Adam_Family.pdf') {
  const canvas = await html2canvas(element, {
    scale: 2, // Higher resolution
    useCORS: true,
    logging: false,
    backgroundColor: '#f8fafc'
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');
  
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  
  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  pdf.save(fileName);
}
