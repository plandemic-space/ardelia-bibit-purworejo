/**
 * Struktur navigasi utama (mega menu) — sinkron dengan taksonomi produk
 * di src/data/produk.json (59 varietas, 6 grup — 5 varietas baru
 * ditambahkan 1 Agustus 2026 lanjutan: Gayam, Jengkol, Rambutan,
 * Jenitri, Kayu Manis).
 */

export type MegaCategory = {
  label: string;
  description: string;
  href: string;
  slug: string;
  icon: 'fruit' | 'flower' | 'tree' | 'root' | 'coffee-cup' | 'grass';
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
    description: 'Petai, aren, kakao, kopi arabika',
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
