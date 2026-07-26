// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Ganti saat migrasi ke domain sendiri (lihat juga src/data/site.ts)
  site: 'https://ardeliabibit.vercel.app',
  integrations: [sitemap()],
});
