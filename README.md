# README — Instruksi Kerja untuk AI (Project Ardelia Bibit)

File ini BUKAN dokumentasi project untuk developer lain. Ini catatan aturan kerja
khusus buat AI (Claude/tim AI mana pun) yang diajak kerja bareng owner di project ini.
Baca file ini duluan sebelum ngerjain apa pun kalau owner upload file project.

Dokumen lain yang wajib dicek juga (jangan diulang isinya di sini):
- `backlog-ardelia-bibit.md` → status kerjaan, apa yang sudah selesai, apa yang masih
  terbuka, keputusan owner soal kebijakan (harga/stok, ritme publish, dll)
- `bahan-mentah-artikel-prioritas.md` → riset mentah per judul artikel yang lagi
  diproses

---

## 1. Stack & Struktur Project

- Astro (file `.astro`), content collection buat artikel ada di `src/content/artikel/`
  dengan schema di `src/content.config.ts`
- Data produk statis di `src/data/` (`produk.json` dkk)
- Halaman artikel dinamis di `src/pages/artikel/[slug].astro`
- Situs statis, tanpa CMS/backend — semua konten diedit langsung di file `.md`/`.astro`
  lalu di-deploy ulang oleh owner

## 2. Format Upload Project dari Owner

Owner **normalnya cuma upload 1 zip** project terbaru (nama umum:
`ardelia-bibit-purworejo-main.zip`), BUKAN sepasang lama-vs-baru. Project ini sudah
100+ file, jadi owner gak upload manual satu-satu ke GitHub — makanya kiriman balik
dari AI juga harus dibatasi cuma file yang berubah, biar owner bisa upload/replace
manual tanpa harus mengganti semua 100+ file.

Zip dua-versi (`-lama` + `-baru`) itu KEKECUALIAN, cuma kejadian sekali waktu owner
sengaja bikin 2 versi manual gara-gara sesi sebelumnya kebalikin semua file dan bikin
bingung mana yang harus diupload ulang. Jangan dianggap itu format normal — anggap
default-nya selalu 1 zip.

## 3. Aturan Wajib: Kirim Balik Cuma File yang Berubah

**Ini aturan paling penting di file ini.** Karena biasanya cuma ada 1 zip project (gak
ada versi "sebelum" buat di-diff), cara paling reliable buat tau file mana yang berubah
BUKAN dengan membandingkan dua zip — tapi dengan **AI mencatat sendiri file mana yang
dia sentuh** selama sesi kerja itu berlangsung.

Alurnya, setiap kali dapat 1 zip project dan diminta ngerjain sesuatu:

1. **Extract** zip yang diupload ke folder kerja.
2. Sebelum mulai edit apa pun, catat (mental note / to-do list internal) task apa yang
   bakal dikerjain dan file mana yang kemungkinan bakal disentuh.
3. Selama ngerjain (nulis artikel baru, edit kode via `str_replace`/`create_file`, dll),
   **track persis daftar path file yang benar-benar dibuat/diedit** lewat tool calls itu
   sendiri — jangan mengandalkan ingatan/tebakan di akhir sesi, catat real-time tiap
   kali habis nyentuh sebuah file.
4. Di akhir, sebelum bikin zip balikan: **cocokkan lagi daftar itu ke task yang diminta
   owner** — pastikan gak ada file yang kesenggol gak sengaja (misal iseng liat/buka
   file lain buat referensi tapi gak ada perubahan isi) ikut kebawa ke zip.
5. Buat zip HANYA berisi file-file di daftar itu — bukan seluruh project, dan jangan
   nebak-nebak/diff manual kalau gak ada file pembanding.
6. Zip itu **wajib mempertahankan struktur folder lengkap** persis seperti di repo asli
   (contoh: `ardelia-bibit-purworejo-main/src/content/artikel/nama-file.md`), BUKAN
   file lepas tanpa folder. Ini biar owner tinggal extract-and-replace langsung ke
   folder project lokalnya tanpa mikir taruh di mana, terus tinggal `git add`/push
   yang berubah aja tanpa harus upload ulang 100+ file ke GitHub.
7. Sebelum present file ke owner, **list isi zip** (`unzip -l`) dan sebutkan satu-satu
   nama file yang berubah di chat — biar owner bisa langsung cross-check tanpa buka
   zip dulu.

**Kalau owner memang kasih 2 zip sekaligus** (situasi khusus kayak di atas) — baru boleh
pakai `diff -rq` buat bandingin langsung, itu lebih akurat daripada tracking manual kalau
kebetulan ada pembandingnya. Tapi jangan mengasumsikan bakal selalu ada 2 zip.

Tujuan aturan ini: owner gak perlu bolak-balik jelasin "cuma kirim yang beda ya, folder
lengkap ya" di setiap sesi baru, dan gak perlu lagi bikin manual zip lama-vs-baru sendiri
buat bandingin — itu semua udah jadi default behavior AI.

## 4. Hal Lain yang Perlu Diingat Tiap Sesi

- Jangan hapus atau timpa file lain di luar yang memang diminta/diubah.
- Kalau nemu file yang kelihatan gak konsisten atau basi pas lagi kerja (bukan bagian
  dari task yang diminta), sebutin ke owner sebagai catatan — jangan diam-diam
  dibenerin sendiri di luar scope, kecuali memang diminta audit menyeluruh.
- Standar konten artikel baru & aturan SEO teknis ada lengkap di `backlog-ardelia-bibit.md`
  bagian B2 — selalu cek itu sebelum nulis artikel baru, jangan andalan ingatan sesi
  sebelumnya karena tiap sesi mulai tanpa histori.

---

*File ini boleh diupdate kapan pun ada aturan kerja baru yang disepakati owner —
tinggal minta AI revisi bagian yang relevan, gak perlu bikin ulang dari nol.*
