// tests/css-solutions.mjs — Jawaban acuan untuk setiap latihan Jalur CSS.
//
// Kunci: "<levelId>-<lessonId>-<indeks slide mulai 0>".
// Nilai:
//   string                        → kode lengkap
//   { css: '...' }                → ganti isi <style> pada kode awal
//   { replace: [[dari, ke], …] }  → ganti teks pada kode awal (setelah css bila ada)
//   { code: '...' }               → kode lengkap
// Jawaban acuan harus LOLOS validator; kode awal/rusak harus GAGAL (diperiksa tests/css-suite.mjs).

// ---- CSS bertahap untuk Final Project (Level 22) ----
const S1 = `* { box-sizing: border-box; }
body { font-family: Arial, Helvetica, sans-serif; color: #1e293b; background-color: #f8fafc; margin: 0; }
h1 { text-align: center; color: #2563eb; }
p { line-height: 1.6; }`;
const S2 = S1 + `
.navbar { display: flex; justify-content: space-between; align-items: center; padding: 12px 24px; background-color: #1e293b; }
.logo { color: white; font-weight: bold; }
.menu { display: flex; gap: 20px; list-style: none; margin: 0; padding: 0; }
.menu a { color: #e2e8f0; text-decoration: none; }
main { max-width: 900px; margin: 0 auto; padding: 24px; }
.keahlian { display: flex; flex-wrap: wrap; gap: 16px; }
.kartu { flex: 1 1 180px; padding: 16px; background-color: white; border: 1px solid #cbd5e1; border-radius: 12px; }`;
const S3 = S2 + `
.menu a:hover { color: white; }
.kartu { box-shadow: 0 2px 8px rgba(0,0,0,0.08); transition: transform 0.2s, box-shadow 0.2s; }
.kartu:hover { transform: translateY(-4px); box-shadow: 0 8px 20px rgba(0,0,0,0.15); }
.tombol { display: inline-block; padding: 10px 20px; background-color: #2563eb; color: white; border-radius: 8px; text-decoration: none; cursor: pointer; transition: background-color 0.3s; }
.tombol:hover { background-color: #1d4ed8; }
@media (max-width: 600px) {
  .navbar { flex-direction: column; gap: 8px; }
}`;

export const solutions = {
  // ===== Level 13 — CSS Level 1: Mengenal CSS =====
  '13-2-7': '<h1 style="color: red;">Halo CSS</h1>',
  '13-2-8': { css: 'p {\n  color: blue;\n}' },
  '13-3-6': { replace: [['color blue;', 'color: blue;']] },
  '13-3-7': { css: 'p {\n  color: green;\n  font-size: 20px;\n}' },
  '13-4-3': { replace: [['color: red\n', 'color: red;\n']] },
  '13-4-4': { replace: [['colour', 'color']] },
  '13-4-5': { replace: [['color: purple;\n', 'color: purple;\n  }\n']] },
  '13-4-6': { css: '/* judul berwarna merah */\nh1 {\n  color: red;\n}' },
  '13-5-1': { css: 'h1 { color: darkblue; }\np { color: #333333; }\nbody { background-color: #fff8e1; }' },

  // ===== Level 14 — CSS Level 2: Selector =====
  '14-1-5': { css: 'h1, h2 {\n  color: blue;\n}' },
  '14-2-4': { replace: [['  penting {', '  .penting {']] },
  '14-2-5': {
    css: '.sorot {\n  background-color: yellow;\n}',
    replace: [
      ['<p>Paragraf pertama.</p>', '<p class="sorot">Paragraf pertama.</p>'],
      ['<p>Paragraf kedua.</p>', '<p class="sorot">Paragraf kedua.</p>']
    ]
  },
  '14-3-5': { replace: [['.utama {', '#utama {']] },
  '14-3-6': {
    css: '#spesial {\n  color: purple;\n  font-weight: bold;\n}',
    replace: [['<p>Paragraf yang akan dibuat spesial.</p>', '<p id="spesial">Paragraf yang akan dibuat spesial.</p>']]
  },
  '14-4-5': { css: 'nav a {\n  color: orange;\n}' },
  '14-5-1': {
    css: '.kartu { background-color: #e0f2fe; color: #0f172a; }\n.kartu h2 { color: #0369a1; }\n.kartu a { color: #be123c; }\n#promo { background-color: #fde68a; }'
  },

  // ===== Level 15 — CSS Level 3: Warna & Teks =====
  '15-1-5': { css: '.satu { color: red; }\n.dua { color: #1e90ff; }\n.tiga { color: rgb(34, 139, 34); }' },
  '15-2-5': { css: 'body { background-color: lightblue; }\n.banner { background: linear-gradient(to right, #ff7e5f, #feb47b); }' },
  '15-3-4': { replace: [['font-size: 20;', 'font-size: 20px;']] },
  '15-3-5': { css: 'h1 { font-family: Arial, sans-serif; font-size: 36px; font-weight: bold; }\np { font-size: 18px; font-style: italic; }' },
  '15-4-5': { css: 'h1 { text-align: center; text-transform: uppercase; }\np { line-height: 1.6; }\na { text-decoration: none; }' },
  '15-5-1': {
    css: 'body { font-family: Arial, sans-serif; background-color: #fffaf0; }\nh1 { text-align: center; color: #b45309; }\nh2 { color: #0f766e; }\np { color: #374151; line-height: 1.7; }\na { text-decoration: none; }'
  },

  // ===== Level 16 — CSS Level 4: Box Model =====
  '16-2-5': { css: '.kotak { padding: 20px; margin: 16px; background-color: #e0f2fe; }' },
  '16-3-5': { css: '.foto { width: 100px; height: 100px; border: 3px solid tomato; border-radius: 50%; }' },
  '16-4-4': { replace: [['width: 300;', 'width: 300px;']] },
  '16-4-5': { css: '.kartu { width: 300px; padding: 20px; box-sizing: border-box; margin: 0 auto; }' },
  '16-5-1': {
    css: '.kartu { width: 320px; margin: 0 auto; padding: 24px; border: 2px solid #94a3b8; border-radius: 16px; box-sizing: border-box; text-align: center; }\n.foto { width: 96px; height: 96px; border-radius: 50%; background-color: #fde68a; font-size: 48px; line-height: 96px; margin: 0 auto 12px; }'
  },

  // ===== Level 17 — CSS Level 5: Display & Posisi =====
  '17-1-5': { css: '.menu a { display: inline-block; padding: 8px 16px; }\n.rahasia { display: none; }' },
  '17-2-5': { css: '.kartu { position: relative; }\n.badge { position: absolute; top: 0; right: 0; }' },
  '17-3-5': { css: 'header { position: sticky; top: 0; background-color: white; }' },
  '17-3-6': { css: '.ke-atas { position: fixed; bottom: 20px; right: 20px; }' },
  '17-4-5': { css: '.daftar { height: 120px; overflow: auto; }\n.atas { position: relative; z-index: 10; }' },
  '17-5-1': {
    css: '.topbar { position: sticky; top: 0; z-index: 10; background-color: #1e293b; }\n.topbar a { display: inline-block; padding: 10px 16px; color: white; }\n.produk { position: relative; border: 1px solid #cbd5e1; padding: 16px; }\n.diskon { position: absolute; top: 8px; right: 8px; background-color: tomato; color: white; }'
  },

  // ===== Level 18 — CSS Level 6: Flexbox Dasar =====
  '18-1-5': { replace: [['flexbox', 'flex']] },
  '18-1-6': { css: '.baris { display: flex; }\n.tumpuk { display: flex; flex-direction: column; }' },
  '18-2-5': { css: '.navbar { display: flex; justify-content: space-between; }' },
  '18-3-5': { css: '.kotak { display: flex; height: 200px; justify-content: center; align-items: center; }' },
  '18-4-5': { css: '.galeri { display: flex; gap: 16px; justify-content: center; }' },
  '18-5-1': {
    css: '.navbar { display: flex; justify-content: space-between; align-items: center; padding: 12px 24px; background-color: #1e293b; }\n.logo { color: white; font-weight: bold; }\n.menu { display: flex; gap: 20px; list-style: none; margin: 0; padding: 0; }\n.menu a { color: #e2e8f0; text-decoration: none; }'
  },

  // ===== Level 19 — CSS Level 7: Flexbox Lanjutan =====
  '19-1-5': { css: '.kartu { width: 200px; height: 80px; background-color: #bfdbfe; }\n.galeri { display: flex; flex-wrap: wrap; gap: 16px; }' },
  '19-2-5': { css: '.layout { display: flex; }\n.sidebar { width: 200px; }\n.konten { flex: 1; }' },
  '19-3-5': { css: '.kotak { display: flex; height: 200px; align-items: flex-start; gap: 8px; }\n.kotak div { width: 60px; height: 60px; background-color: #fde68a; }\n.b { align-self: flex-end; }\n.c { order: -1; }' },
  '19-4-5': { css: 'body { display: flex; flex-direction: column; min-height: 100vh; margin: 0; }\nmain { flex: 1; display: flex; }' },
  '19-5-1': {
    css: '.galeri { display: flex; flex-wrap: wrap; gap: 16px; justify-content: center; }\n.kartu { flex: 1 1 200px; padding: 16px; border: 1px solid #cbd5e1; border-radius: 12px; }'
  },

  // ===== Level 20 — CSS Level 8: Interaksi Visual =====
  '20-1-5': { css: '.tombol { background-color: royalblue; color: white; }\n.tombol:hover { background-color: navy; }' },
  '20-2-5': { css: 'input { border: 2px solid #94a3b8; padding: 8px; }\ninput:focus { border-color: royalblue; }\n.tombol { cursor: pointer; }' },
  '20-3-5': { css: '.tombol { background-color: royalblue; color: white; padding: 10px 20px; border: none; transition: background-color 0.3s; }\n.tombol:hover { background-color: navy; }' },
  '20-4-5': { css: '.kartu { width: 220px; padding: 20px; border-radius: 12px; background-color: white; box-shadow: 0 4px 12px rgba(0,0,0,0.15); transition: transform 0.2s; }\n.kartu:hover { transform: translateY(-4px); }' },
  '20-5-1': {
    css: '.kartu { box-shadow: 0 4px 12px rgba(0,0,0,0.15); transition: transform 0.2s, box-shadow 0.2s; }\n.kartu:hover { transform: translateY(-4px); }\n.tombol { cursor: pointer; background-color: royalblue; color: white; border: none; padding: 10px 20px; transition: background-color 0.3s; }\n.tombol:hover { background-color: navy; }\n.tombol:active { transform: scale(0.96); }'
  },

  // ===== Level 21 — CSS Level 9: Responsive =====
  '21-1-5': { replace: [['<title>', '<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>']] },
  '21-2-5': { replace: [['width: 800px;', 'max-width: 100%;\n    height: auto;']] },
  '21-2-6': { css: '.wadah { width: 90%; max-width: 800px; margin: 0 auto; }\nh1 { font-size: 2rem; }' },
  '21-3-6': { css: 'h1 { font-size: 40px; }\n@media (max-width: 600px) {\n  h1 { font-size: 24px; }\n}' },
  '21-4-5': { css: '.baris { display: flex; gap: 16px; }\n@media (max-width: 700px) {\n  .baris { flex-direction: column; }\n}' },
  '21-5-1': {
    replace: [['<title>', '<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>']],
    css: '.wadah { width: 90%; max-width: 800px; margin: 0 auto; }\n.fitur { display: flex; gap: 16px; }\nimg { max-width: 100%; height: auto; }\n@media (max-width: 700px) {\n  .fitur { flex-direction: column; }\n  h1 { font-size: 24px; }\n}'
  },

  // ===== Level 22 — CSS Level 10: Final Project =====
  '22-5-1': { css: S1 },
  '22-5-2': { css: S2 },
  '22-5-3': { css: S3 },
  '22-5-4': {
    replace: [['<title>', '<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>'], ['[Nama Kamu]', 'Budi Santoso'], ['[Nama Kamu]', 'Budi Santoso'], ['[Nama Kamu]', 'Budi Santoso']],
    css: S3 + '\n.foto { width: 96px; height: 96px; border-radius: 50%; }\nfooter { text-align: center; }'
  }
};
