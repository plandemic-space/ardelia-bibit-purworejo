import { defineCollection, z } from 'astro:content';
import { file, glob } from 'astro/loaders';

/**
 * Grup produk — HARUS sinkron dengan slug anchor di src/data/nav.ts
 * (kategoriBibit) dan id section filter di halaman /katalog.
 */
const grupProduk = [
  'bibit-buah',
  'tanaman-hias',
  'pohon-kayu',
  'rempah',
  'perkebunan',
  'pakan-ternak',
] as const;

const produk = defineCollection({
  loader: file('src/data/produk.json'),
  schema: z.object({
    nama: z.string(),
    grup: z.enum(grupProduk),
    /** DEPRECATED sejak item 0.5 (4 Agu 2026) — ukuran fisik bibit fluktuatif
     * ikut stok/musim, sama seperti harga, jadi tidak lagi ditampilkan statis
     * di kartu produk (diganti CTA universal "Ukuran & harga menyesuaikan
     * stok" di ProdukCard.astro). Field dipertahankan di schema untuk
     * kompatibilitas, tapi sengaja tidak diisi & tidak dipakai UI manapun. */
    ukuran: z.string().optional(),
    /** Deskripsi singkat 1 kalimat per varietas — karakteristik varietas
     * (rasa/tekstur/kegunaan), BUKAN ukuran/harga (lihat catatan `ukuran`
     * di atas kenapa itu sengaja tidak ditampilkan). Terisi untuk semua 59
     * produk sejak item 0.5 (4 Agu 2026). */
    deskripsi: z.string().optional(),
    /** True kalau varietas ini belum dikonfirmasi ulang ketersediaannya ke owner */
    perluKonfirmasi: z.boolean().optional().default(false),
    /** Path foto asli di public/images/produk/ — kosong berarti belum ada foto */
    foto: z.string().optional(),
    /** Emoji placeholder yang representatif kalau foto belum ada */
    placeholderEmoji: z.string().optional(),
    /** True kalau foto asli sudah tersedia di public/images/produk */
    fotoTersedia: z.boolean().optional().default(false),
  }),
});

/** Koleksi artikel — file .md ada di src/content/artikel/ */
const artikel = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/artikel' }),
  schema: z.object({
    title: z.string(),
    /** Versi judul lebih pendek khusus untuk <title> tag & og:title, supaya tidak terpotong di hasil pencarian Google (~60 karakter termasuk suffix "| Ardelia Bibit"). Kalau kosong, fallback ke `title`. */
    seoTitle: z.string().max(48).optional(),
    description: z.string(),
    publishDate: z.date(),
    coverImage: z.string().optional(),
    /** Untuk internal link ke katalog di akhir artikel (checklist playbook §10) */
    relatedCategorySlug: z.enum(grupProduk).optional(),
    relatedCategoryLabel: z.string().optional(),
    /** Item 1.1 (E-E-A-T) — true kalau artikel ini pantas ditandai sebagai
     * ditulis berdasarkan pengalaman langsung Pak Yarohim mengelola nursery
     * (tips/panduan praktis), dipakai untuk pilih schema author Person vs
     * Organization di [slug].astro. Default false = tetap author Organization
     * (dipakai untuk artikel jenis berita/tren/studi kasus dari sumber luar,
     * bukan pengalaman pribadi pemilik). Lihat IMPLEMENTATION_LOG.md Item 1.1
     * untuk daftar & alasan klasifikasi tiap artikel. */
    writtenByOwner: z.boolean().optional().default(false),
  }),
});

export const collections = { produk, artikel };
export { grupProduk };
