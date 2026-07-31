/**
 * Struktur navigasi utama (mega menu) — sinkron dengan taksonomi produk
 * di src/data/produk.json (42 varietas, 6 grup — daftar katalog revisi
 * terbaru dari owner, menggantikan daftar 48 varietas sebelumnya).
 *
 * Catatan: label "Cari Berdasarkan Kebutuhan" memetakan grup produk ke
 * skenario kebutuhan pengunjung (pekarangan, kebun buah, dst) — pola ini
 * dipertahankan dari mockup v4, isi teksnya tetap orisinal Ardelia Bibit.
 */

export type MegaCategory = {
  label: string;
  description: string;
  href: string;
  slug: string;
  icon: 'fruit' | 'flower' | 'tree' | 'root' | 'coffee-cup' | 'grass';
};

export type MegaNeed = {
  label: string;
  description: string;
  href: string;
  highlight?: boolean;
};

export const kategoriBibit: MegaCategory[] = [
  {
    label: 'Bibit Buah',
    description: 'Durian, alpukat, kelengkeng, mangga & lainnya',
    href: '/katalog#bibit-buah',
    slug: 'bibit-buah',
    icon: 'fruit',
  },
  {
    label: 'Tanaman Hias & Landscape',
    description: 'Palem, pucuk merah, tanaman taman',
    href: '/katalog#tanaman-hias',
    slug: 'tanaman-hias',
    icon: 'flower',
  },
  {
    label: 'Pohon Kayu & Kehutanan',
    description: 'Jati, mahoni, sengon, jabon, balsa',
    href: '/katalog#pohon-kayu',
    slug: 'pohon-kayu',
    icon: 'tree',
  },
  {
    label: 'Rempah & Tanaman Obat',
    description: 'Pala, cengkeh, lada perdu, jeruk purut & lainnya',
    href: '/katalog#rempah',
    slug: 'rempah',
    icon: 'root',
  },
  {
    label: 'Tanaman Perkebunan',
    description: 'Petai',
    href: '/katalog#perkebunan',
    slug: 'perkebunan',
    icon: 'tree',
  },
  {
    label: 'Pakan Ternak',
    description: 'Indigofera dan kaliandra',
    href: '/katalog#pakan-ternak',
    slug: 'pakan-ternak',
    icon: 'grass',
  },
];

export const kebutuhan: MegaNeed[] = [
  {
    label: 'Pekarangan',
    description: 'Biar halaman rumah lebih hijau dan teduh',
    href: '/katalog?kebutuhan=pekarangan',
  },
  {
    label: 'Kebun Buah',
    description: 'Mulai menanam buah dari bibit yang tepat',
    href: '/katalog?kebutuhan=kebun-buah',
  },
  {
    label: 'Landscape',
    description: 'Tanaman hias untuk mempercantik lahan',
    href: '/katalog?kebutuhan=landscape',
  },
  {
    label: 'Penghijauan',
    description: 'Kayu keras untuk lahan gundul & kritis',
    href: '/katalog?kebutuhan=penghijauan',
  },
  {
    label: 'Perkebunan',
    description: 'Petai untuk lahan produktif',
    href: '/katalog?kebutuhan=perkebunan',
  },
  {
    label: 'Pakan Ternak',
    description: 'Hijauan pakan untuk ternak Anda',
    href: '/katalog?kebutuhan=pakan-ternak',
  },
  {
    label: 'Belum tahu mau tanam apa?',
    description: 'Konsultasi Bibit →',
    href: '/kontak',
    highlight: true,
  },
];

export const tentangKami = [
  { label: 'Cerita Ardelia Bibit', href: '/tentang' },
  { label: 'Lokasi Nursery', href: '/kontak' },
  { label: 'Pertanyaan Umum', href: '/cara-beli#faq' },
];

/** Menu navbar (desktop & drawer mobile) — sesuai daftar menu Sprint 1 */
export const navUtama = [
  { label: 'Beranda', href: '/' },
  { label: 'Katalog', href: '/katalog' },
  { label: 'Cara Beli', href: '/cara-beli' },
  { label: 'Tentang Kami', href: '/tentang' },
  { label: 'Artikel', href: '/artikel' },
  { label: 'Dokumentasi', href: '/dokumentasi' },
  { label: 'Kontak', href: '/kontak' },
];
