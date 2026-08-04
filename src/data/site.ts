/**
 * Konfigurasi terpusat: identitas usaha, kontak, sosial media.
 * Satu sumber kebenaran — semua komponen ambil dari sini, bukan hardcode
 * berulang di banyak file (lihat playbook §6, checklist migrasi domain).
 *
 * Sumber data: data-ardelia-bibit.md — jangan ubah tanpa konfirmasi ulang
 * dari Zen/owner (Pak Yarohim).
 */

export const site = {
  name: 'Ardelia Bibit',
  owner: 'Yarohim',
  tagline:
    'Nursery bibit tanaman di Kemiri, Purworejo — bibit buah, kayu keras, palem hias, sampai rempah dapur.',

  // Ganti ke domain sendiri saat migrasi — cukup satu tempat ini.
  url: 'https://ardeliabibit.vercel.app',

  contact: {
    whatsappNumber: '6282221085354',
    whatsappDisplay: '0822-2108-5354',
    get whatsappLink() {
      return `https://wa.me/${this.whatsappNumber}`;
    },
    address: {
      street: 'Dusun Ngemplak RT.01/RW.02, Desa Samping',
      district: 'Kec. Kemiri',
      locality: 'Kemiri',
      regency: 'Kabupaten Purworejo',
      province: 'Jawa Tengah',
      postalCode: '54262',
      full: 'Dusun Ngemplak RT.01/RW.02, Desa Samping, Kec. Kemiri, Kabupaten Purworejo, Jawa Tengah 54262',
    },
    // Titik GPS presisi nursery — dipakai untuk peta custom (bukan hasil
    // pencarian teks) supaya tidak menampilkan pin bisnis lain di sekitar.
    coordinates: {
      lat: -7.6634876,
      lng: 109.8774283,
    },
    googleMapsUrl: 'https://maps.app.goo.gl/u9B7z3J6TEJudp5v7',
  },

  social: {
    youtube: 'https://www.youtube.com/@ardeliabibit',
    facebook: 'https://www.facebook.com/ardelia.bibit',
    tiktok: 'https://www.tiktok.com/@ardeliabibit',
  },
} as const;

/**
 * Bikin link wa.me dengan pesan prefilled per produk/konteks.
 * Dipakai di tombol WA per kartu produk (playbook §5 — wajib ada di tiap kartu).
 */
export function waLink(message: string): string {
  return `https://wa.me/${site.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
