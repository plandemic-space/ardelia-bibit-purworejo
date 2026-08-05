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
    /** Item 1.4 (SEO/AI SEO) — diisi HANYA untuk artikel yang kontennya
     * memang berupa urutan langkah nyata untuk 1 prosedur (bukan sekadar
     * artikel ber-H2). Dipetakan manual (bukan auto-generate dari H2 markdown)
     * karena tidak semua H2 di artikel adalah "langkah" — sebagian cuma info
     * pendukung (tanda-tanda, hal yang dihindari, cross-link) yang sengaja
     * TIDAK dimasukkan supaya schema HowTo akurat merepresentasikan isi
     * artikel, bukan filler mecha struktur data. Kalau kosong/tidak diisi,
     * artikel tetap pakai schema Article saja seperti sebelumnya (HowTo
     * cuma tambahan, bukan pengganti). Lihat IMPLEMENTATION_LOG.md Item 1.4
     * untuk daftar artikel & alasan step mana yang dipilih/dikecualikan. */
    howToSteps: z
      .array(
        z.object({
          name: z.string(),
          text: z.string(),
        }),
      )
      .optional(),
    /** Ad-hoc (5 Agu 2026) — link manual ke artikel lain ("Baca juga") yang
     * dipilih sendiri per-artikel, BEDA dari "Artikel Terkait" otomatis di
     * atas (yang cuma match by kategori). Isi array slug (id) artikel
     * tujuan. Dirender kondisional di [slug].astro — HANYA slug yang
     * sudah lolos getArtikelTerbit() (sudah live) yang muncul, supaya
     * kalau ada slug tujuan yang masih di-hold (publishDate belum lewat,
     * jadwal terbit misal via kalender editorial), link-nya otomatis
     * "senyap" dulu (bukan 404) dan otomatis muncul sendiri begitu
     * artikel tujuannya lewat tanggal terbit & di-build ulang — tidak
     * perlu ada yang inget-inget nambah manual lagi. Lihat kasus asal:
     * cara-memilih-bibit-sehat-sebelum-beli.md → tabulampot (masih hold). */
    relatedManual: z.array(z.string()).optional(),
  }),
});

export const collections = { produk, artikel };
export { grupProduk };
