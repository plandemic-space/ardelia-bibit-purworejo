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

## 0. WAJIB Paling Awal: Cek 3 Sumber, Jangan Cuma Percaya Backlog

Sebelum mulai kerjain apa pun di sesi baru — bahkan sebelum lanjut baca Section 1-5 —
cross-check dulu 3 sumber ini, karena status "✅ Selesai/Live" di
`backlog-ardelia-bibit.md` cuma nyatet apa yang PERNAH dikerjakan di suatu sesi, bukan
jaminan itu udah bener-bener tampil di internet. Tiga sumber ini bisa beda satu sama
lain di titik waktu tertentu, jangan diasumsikan otomatis sinkron:

1. **`backlog-ardelia-bibit.md`** — klaim status (apa yang "sudah selesai").
2. **Isi zip project** (`ardelia-bibit-purworejo-main.zip`) — kondisi file LOKAL owner,
   kadang lebih baru dari backlog (misal owner nulis/publish artikel sendiri tanpa
   sempat update backlog-nya).
3. **Website live** (`https://ardeliabibit.vercel.app/`) — kondisi yang BENERAN dilihat
   pengunjung/Google, hasil dari commit yang sudah di-push + Vercel selesai deploy. Bisa
   ketinggalan dari zip kalau owner belum sempat push/deploy.

**Cara cepat cross-check** (pakai `web_fetch`, bukan tebak-tebakan):
- Fetch `https://ardeliabibit.vercel.app/` → cek badge jumlah varietas ("47+ Varietas"
  dll), cocokkan ke jumlah entri `src/data/produk.json` di zip.
- Fetch `https://ardeliabibit.vercel.app/artikel` → cek daftar judul yang BENERAN tampil
  di sana, cocokkan ke daftar file `src/content/artikel/*.md` di zip DAN ke status
  "✅ Live" di backlog Section B1. Perhatikan juga `publishDate` tiap artikel di
  frontmatter — kalau tanggalnya masih di masa depan, wajar belum muncul di live site
  meski filenya sudah lengkap di zip (bukan berarti "belum dikerjakan").

**Kalau ketemu selisih** (artikel/produk ada di zip/backlog tapi gak muncul di live
site, atau sebaliknya file yang backlog bilang "belum dikerjakan" ternyata isinya sudah
lengkap di zip) — **jangan diam-diam nerusin kerjaan baru seolah semua udah sinkron**.
Laporkan dulu selisihnya ke owner di chat sebelum lanjut, biar owner yang konfirmasi
apa itu emang belum di-push, belum kelar deploy Vercel, atau backlog-nya yang perlu
diupdate. Ini beda sama aturan "jangan bongkar file di luar scope" di Section 4 — ini
soal ngasih tau dulu, bukan bikin owner harus jelasin ulang situasinya tiap sesi baru.

**Awas: `web_fetch` bisa kena cache basi dan bikin kesimpulan salah.** Pernah kejadian
(1 Agu 2026) `web_fetch` ke `/artikel` nunjukkan versi lama (8 artikel) padahal
screenshot browser owner sendiri saat itu juga jelas nunjukkan 9 artikel + 59 varietas
sudah live — situsnya sudah update, cuma hasil fetch-nya yang basi kena cache (CDN atau
cache internal tool). Kalau hasil `web_fetch` bilang "belum update" tapi owner bilang
"punya saya sudah update" — **percaya owner / screenshot langsung dari browser mereka**,
bukan ngotot ke hasil fetch. Kalau perlu re-verifikasi, coba fetch ulang sekali lagi
(kadang cache-nya keburu refresh), tapi jangan jadiin 1 hasil fetch yang mencurigakan
sebagai dasar buat bilang ke owner "situsnya belum update" tanpa kasih catatan bahwa itu
bisa jadi cuma cache.

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
8. **Kalau ada file yang harusnya DIHAPUS** (bukan diubah) — zip perubahan gak bisa
   merepresentasikan "hapus file ini", karena zip cuma nambah/nimpa isi folder pas
   di-extract, gak pernah ngosongin/ngapus apa pun. Jadi kalau nemu file yang emang
   sebaiknya dihapus (foto lama gak kepake, dll), **jangan cuma dibiarkan/didiemin** —
   sebut eksplisit di chat path lengkapnya dan bilang owner perlu hapus manual sendiri.
   Ketemu pas beres-beres 2 Agu 2026: `hero-artikel.webp` sempat dicatat "aman dihapus"
   di komentar kode dari sesi sebelumnya, tapi gak pernah beneran disebut ke owner
   secara eksplisit buat dihapus — jadi nyangkut gak kehapus-hapus sampai beberapa
   sesi kemudian.

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

## 5. Cara Owner Push Perubahan ke GitHub (GitHub Desktop)

Mulai 1 Agustus 2026, owner pakai **GitHub Desktop** (bukan upload manual satu-satu
lewat browser) buat naikin perubahan ke GitHub — soalnya upload manual lewat web
kena limit ~100 file sekali drag, sementara zip perubahan dari AI kadang lebih dari itu.

Repo lokal ada di `Documents\GitHub\ardelia-bibit-purworejo` di laptop owner, sudah
di-clone dari `plandemic-space/ardelia-bibit-purworejo`.

**Alur tiap owner dapat zip perubahan dari AI:**
1. Buka GitHub Desktop, pastikan repo aktifnya `ardelia-bibit-purworejo` (bukan repo
   lain — owner punya beberapa repo di organisasi yang sama, termasuk satu yang
   namanya mirip: `khanza-bibit-purworejo`, jangan ketuker).
2. Klik **"Fetch origin"** dulu (kadang berubah jadi "Pull origin" kalau ada
   perubahan remote) — supaya folder lokal sinkron sebelum ditimpa.
3. Extract zip perubahan dari AI, copy-paste isinya ke folder repo lokal (pilih
   "Replace files" kalau ditanya).
4. Balik ke GitHub Desktop — daftar file yang berubah otomatis muncul di tab
   "Changes". Isi kolom Summary singkat, klik **"Commit to main"**, lalu
   **"Push origin"**.

**Implikasi buat AI:** karena alur ini pakai Git (bukan upload manual web), aturan
"kirim balik cuma file yang berubah" di Section 3 di atas **masih tetap berlaku
dan makin penting** — commit yang isinya jelas cuma file yang relevan itu jauh lebih
gampang di-review owner di GitHub Desktop dibanding commit yang isinya nyangkut file
gak jelas kenapa berubah.

---

*File ini boleh diupdate kapan pun ada aturan kerja baru yang disepakati owner —
tinggal minta AI revisi bagian yang relevan, gak perlu bikin ulang dari nol.*
