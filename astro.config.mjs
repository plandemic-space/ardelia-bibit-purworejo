// @ts-check
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Ambil publishDate tiap artikel langsung dari frontmatter file .md, biar
// lastmod di sitemap akurat tanpa perlu maintain daftar tanggal terpisah
// (single source of truth = frontmatter, sama seperti getArtikelTerbit()
// di src/lib/artikel.ts). Dibaca sinkron via fs karena file ini jalan di
// Node saat build, bukan di context Astro content collections.
const artikelDir = fileURLToPath(new URL('./src/content/artikel/', import.meta.url));

function getArtikelLastmodMap() {
  const map = {};
  for (const file of readdirSync(artikelDir)) {
    if (!file.endsWith('.md')) continue;
    const slug = file.replace(/\.md$/, '');
    const raw = readFileSync(new URL(file, `file://${artikelDir}`), 'utf-8');
    const match = raw.match(/publishDate:\s*"?(\d{4}-\d{2}-\d{2})"?/);
    if (match) map[slug] = match[1];
  }
  return map;
}

const artikelLastmod = getArtikelLastmodMap();

// https://astro.build/config
export default defineConfig({
  // Ganti saat migrasi ke domain sendiri (lihat juga src/data/site.ts)
  site: 'https://ardeliabibit.vercel.app',
  integrations: [
    sitemap({
      // Halaman error tidak boleh masuk sitemap — sebelumnya ikut
      // terdaftar otomatis karena Astro build tetap generate 404.html.
      filter: (page) => !page.includes('/404'),
      changefreq: 'monthly',
      priority: 0.6,
      serialize(item) {
        const path = new URL(item.url).pathname.replace(/\/$/, '') || '/';

        if (path === '/') {
          item.priority = 1.0;
          item.changefreq = 'weekly';
        } else if (path === '/katalog') {
          // Halaman paling sering berubah (59 produk, stok/foto diupdate
          // berkala) & paling penting secara konversi.
          item.priority = 0.9;
          item.changefreq = 'weekly';
        } else if (path === '/artikel') {
          item.priority = 0.8;
          item.changefreq = 'weekly';
        } else if (path.startsWith('/artikel/')) {
          const slug = path.replace('/artikel/', '');
          item.priority = 0.7;
          item.changefreq = 'monthly';
          if (artikelLastmod[slug]) {
            item.lastmod = new Date(artikelLastmod[slug]).toISOString();
          }
        } else if (path === '/cara-beli' || path === '/kontak' || path === '/tentang') {
          item.priority = 0.7;
        } else if (path === '/dokumentasi') {
          item.priority = 0.5;
        }

        return item;
      },
    }),
  ],
});
