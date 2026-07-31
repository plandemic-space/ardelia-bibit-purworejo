/** Estimasi waktu baca dari teks markdown mentah, dibulatkan minimal 1 menit. */
export function estimasiWaktuBaca(markdown: string): number {
  const jumlahKata = markdown
    .replace(/```[\s\S]*?```/g, '') // buang code block
    .replace(/[#>*_\-`\[\]()!]/g, '') // buang syntax markdown umum
    .split(/\s+/)
    .filter(Boolean).length;

  const KATA_PER_MENIT = 200;
  return Math.max(1, Math.round(jumlahKata / KATA_PER_MENIT));
}
