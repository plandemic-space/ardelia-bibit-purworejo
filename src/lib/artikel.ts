import { getCollection, type CollectionEntry } from 'astro:content';

/**
 * Ambil semua artikel yang SUDAH tayang (publishDate <= sekarang), diurutkan
 * terbaru dulu. Artikel dengan publishDate di masa depan tetap boleh ada di
 * repo/GitHub (misal draf yang belum final) tapi otomatis gak digenerate jadi
 * halaman & gak muncul di daftar mana pun sampai tanggalnya lewat.
 *
 * Dipakai di index.astro (daftar artikel), [slug].astro (getStaticPaths +
 * artikel terkait/navigasi), dan ArtikelTerbaru.astro (preview homepage) —
 * satu sumber biar ketiganya gak bisa beda hasil.
 *
 * Catatan: karena situs statis cuma re-build pas ada push baru, artikel
 * tayang di build/deploy pertama SETELAH publishDate lewat — bukan persis
 * jam 00:00 di tanggal itu.
 */
export async function getArtikelTerbit(): Promise<CollectionEntry<'artikel'>[]> {
  const semuaArtikel = await getCollection('artikel');
  const sekarang = new Date();

  return semuaArtikel
    .filter((entry) => entry.data.publishDate <= sekarang)
    .sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());
}
