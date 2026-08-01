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
    /** Ukuran/media tanam — hanya diisi kalau sudah dikonfirmasi, boleh kosong */
    ukuran: z.string().optional(),
    /** Deskripsi singkat opsional per varietas — kosong dulu sampai ada datanya */
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
  }),
});

export const collections = { produk, artikel };
export { grupProduk };
