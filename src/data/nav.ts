/**
 * Struktur navigasi utama (mega menu) — sinkron dengan taksonomi produk
 * di data-ardelia-bibit.md (48 varietas, 6 grup — termasuk Solobium dan
 * Durian Super Tembaga yang ditambahkan dari foto susulan, lihat
 * CATATAN-UNTUK-OWNER.md).
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
  icon: string;
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
    icon: '🍈',
  },
  {
    label: 'Tanaman Hias & Landscape',
    description: 'Palem, pucuk merah, tanaman taman',
    href: '/katalog#tanaman-hias',
    slug: 'tanaman-hias',
    icon: '🌺',
  },
  {
    label: 'Pohon Kayu & Kehutanan',
    description: 'Jati, mahoni, sengon, jabon, balsa',
    href: '/katalog#pohon-kayu',
    slug: 'pohon-kayu',
    icon: '🌳',
  },
  {
    label: 'Rempah & Tanaman Obat',
    description: 'Jahe, kunyit, kencur, temulawak',
    href: '/katalog#rempah',
    slug: 'rempah',
    icon: '🫚',
  },
  {
    label: 'Tanaman Perkebunan',
    description: 'Kopi, kakao, lada perdu',
    href: '/katalog#perkebunan',
    slug: 'perkebunan',
    icon: '☕',
  },
  {
    label: 'Pakan Ternak',
    description: 'Indigofera dan kaliandra',
    href: '/katalog#pakan-ternak',
    slug: 'pakan-ternak',
    icon: '🐄',
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
    description: 'Kopi dan kakao untuk lahan produktif',
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

/** Menu flat untuk drawer mobile (tanpa mega menu, cukup accordion sederhana) */
export const navUtama = [
  { label: 'Katalog Bibit', href: '/katalog' },
  { label: 'Cari Berdasarkan Kebutuhan', href: '/katalog' },
  { label: 'Cara Beli', href: '/cara-beli' },
  { label: 'Artikel', href: '/artikel' },
  { label: 'Tentang Kami', href: '/tentang' },
  { label: 'Kontak', href: '/kontak' },
];
