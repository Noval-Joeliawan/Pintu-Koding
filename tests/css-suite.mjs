// tests/css-suite.mjs — Pengujian Jalur CSS (Level 13–22)
//
// Menjalankan:   NODE_PATH=/path/ke/node_modules node tests/css-suite.mjs
// (butuh `jsdom`, sama seperti tests/jsdom-probe.cjs; tidak ada package.json di repo ini)
//
// Yang diperiksa:
//  1. Struktur data  : 10 level × 5 lesson, id berurutan, tipe slide valid, kunci jawaban masuk akal.
//  2. Pemeriksa CSS  : cascade, specificity, inheritance, @media, warna.
//  3. Setiap latihan : jawaban acuan (tests/css-solutions.mjs) HARUS lolos, dan kode awal / kode rusak
//                      HARUS gagal — jadi tidak ada latihan yang "selalu benar" atau "mustahil".
import assert from 'node:assert';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { solutions } from './css-solutions.mjs';

// jsdom mencetak "Could not parse CSS stylesheet" untuk CSS yang sengaja dirusak pada latihan fix-code.
const _consoleError = console.error;
console.error = (...args) => { if (String(args[0]).includes('Could not parse CSS')) return; _consoleError(...args); };

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

let JSDOM;
try {
  ({ JSDOM } = require('jsdom'));
} catch (e) {
  console.error('jsdom tidak ditemukan. Jalankan dengan NODE_PATH yang menunjuk ke node_modules berisi jsdom.');
  process.exit(1);
}

// --- muat modul browser ke lingkungan Node ---------------------------------
globalThis.window = globalThis;
const Validator = require(path.join(root, 'src/js/editor/validator.js'));
const CSSCheck = require(path.join(root, 'src/js/editor/css-checker.js'));
require(path.join(root, 'src/js/lessons/data.js'));
require(path.join(root, 'src/js/lessons/css/kit.js'));
['level-13-14', 'level-15-16', 'level-17-18', 'level-19-20', 'level-21-22'].forEach((f) => {
  try { require(path.join(root, `src/js/lessons/css/${f}.js`)); }
  catch (e) { if (e.code !== 'MODULE_NOT_FOUND') throw e; }
});
const LessonData = globalThis.LessonData;

let total = 0, passed = 0;
const failures = [];
function test(name, fn) {
  total++;
  try { fn(); passed++; }
  catch (err) { failures.push(`${name}\n         ${err.message}`); console.error(`  [FAIL] ${name}\n         ${err.message}`); return; }
  if (process.env.VERBOSE) console.log(`  [PASS] ${name}`);
}

// --- meniru pemeriksaan di Exercises (exercises.js) ------------------------
const parse = (code) => new (new JSDOM('').window.DOMParser)().parseFromString(code, 'text/html');
const stripHtmlComments = (code) => code.replace(/<!--[\s\S]*?-->/g, '');

function runSlide(slide, code) {
  if (slide.type === 'challenge') {
    const r = Validator.validateCode(stripHtmlComments(code), slide.rules || {});
    return { ok: r.success, why: r.errors.join(' | ') };
  }
  if (slide.type === 'fix-code') {
    const r = Validator.validateCode(code, slide.rules || {});
    return { ok: r.success, why: r.errors.join(' | ') };
  }
  if (slide.type === 'mini-project') {
    const doc = parse(stripHtmlComments(code));
    const css = CSSCheck.create(doc);
    const failed = [];
    for (const item of slide.checkItems) {
      let ok = false;
      try { ok = !!new Function('doc', 'css', `return (${item.checkStr});`)(doc, css); } catch (e) { ok = false; }
      if (!ok) failed.push(item.id);
    }
    return { ok: failed.length === 0, why: 'gagal: ' + failed.join(', ') };
  }
  throw new Error('tipe tidak didukung: ' + slide.type);
}

function resolveSolution(slide, spec) {
  const starter = slide.starterCode ?? slide.brokenCode ?? '';
  if (typeof spec === 'string') return spec;
  if (spec.code) return spec.code;
  let code = starter;
  if (spec.css !== undefined) code = code.replace(/(<style>)[\s\S]*?(<\/style>)/, (_, a, b) => `${a}\n${spec.css}\n  ${b}`);
  (spec.replace || []).forEach(([from, to]) => {
    assert.ok(code.includes(from), `teks "${from}" tidak ada di kode awal`);
    code = code.replace(from, to);
  });
  if (spec.append) code += spec.append;
  return code;
}

console.log('\n=============================================');
console.log(' PINTU KODING — JALUR CSS (Level 13–22)');
console.log('=============================================\n');

// ---------------------------------------------------------------- 1. struktur
console.log('--- 1. Struktur data ---');
const cssLevels = LessonData.getLevelsByTrack('css');
const VALID_TYPES = ['material', 'example', 'review', 'multiple-choice', 'fill-code', 'drag-drop', 'fix-code', 'challenge', 'mini-project', 'code-editor'];

test('Jalur CSS terdaftar: 10 level dengan id 13–22', () => {
  assert.strictEqual(cssLevels.length, 10, `ada ${cssLevels.length} level CSS`);
  assert.deepStrictEqual(cssLevels.map((l) => l.id), [13, 14, 15, 16, 17, 18, 19, 20, 21, 22]);
  assert.deepStrictEqual(cssLevels.map((l) => l.trackLevel), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});

test('Jalur HTML tidak berubah: 12 level, 60 lesson', () => {
  const html = LessonData.getLevelsByTrack('html');
  assert.strictEqual(html.length, 12);
  assert.strictEqual(html.reduce((n, l) => n + l.lessons.length, 0), 60);
});

test('Label level: "Level 3" (HTML) dan "CSS Level 3" (CSS)', () => {
  assert.strictEqual(LessonData.getLevelLabel(3), 'Level 3');
  assert.strictEqual(LessonData.getLevelLabel(15), 'CSS Level 3');
});

test('Final Project terdeteksi di Level 12 dan Level 22 (lesson 5) saja', () => {
  assert.ok(LessonData.isFinalProject(12, 5));
  assert.ok(LessonData.isFinalProject(22, 5));
  assert.ok(!LessonData.isFinalProject(21, 5));
  assert.ok(!LessonData.isFinalProject(22, 4));
});

cssLevels.forEach((level) => {
  test(`${LessonData.getLevelLabel(level)} "${level.title}": 5 lesson, lesson 5 = project`, () => {
    assert.strictEqual(level.lessons.length, 5);
    assert.deepStrictEqual(level.lessons.map((l) => l.id), [1, 2, 3, 4, 5]);
    assert.ok(level.lessons[4].isProject, 'lesson 5 harus project');
    assert.ok(level.lessons.slice(0, 4).every((l) => !l.isProject));
    assert.ok(level.description && level.icon);
    if (level.id === 22) assert.ok(level.finalProject, 'level 22 harus finalProject');
    assert.strictEqual(level.lessons[4].xpReward, level.id === 22 ? 100 : 30);
  });

  level.lessons.forEach((lesson) => {
    test(`Slide ${level.id}-${lesson.id} "${lesson.title}" valid`, () => {
      assert.ok(lesson.slides.length >= 2, 'minimal 2 slide');
      assert.ok(['material', 'review'].includes(lesson.slides[0].type) || lesson.slides[0].type === 'example', 'slide pertama = materi');
      const last = lesson.slides[lesson.slides.length - 1];
      if (!lesson.isProject) assert.strictEqual(last.type, 'review', 'lesson biasa diakhiri review');
      lesson.slides.forEach((s, i) => {
        const at = `slide ${i + 1} (${s.type})`;
        assert.ok(VALID_TYPES.includes(s.type), `${at}: tipe tidak dikenal`);
        if (s.type === 'multiple-choice') {
          assert.ok(s.options.length >= 3 && s.options.length <= 4, `${at}: 3–4 pilihan`);
          assert.ok(Number.isInteger(s.answer) && s.answer >= 0 && s.answer < s.options.length, `${at}: answer di luar jangkauan`);
          assert.strictEqual(new Set(s.options).size, s.options.length, `${at}: pilihan duplikat`);
          assert.ok(s.explanation, `${at}: butuh explanation`);
        }
        if (s.type === 'fill-code') {
          assert.ok(s.answer && s.blank === s.answer, `${at}: answer/blank`);
          assert.ok(s.instruction && s.explanation, `${at}: instruction/explanation`);
        }
        if (s.type === 'drag-drop') {
          assert.deepStrictEqual([...s.tokens].sort(), [...s.answer].sort(), `${at}: tokens harus sama dengan answer`);
          assert.strictEqual(new Set(s.answer).size, s.answer.length, `${at}: token duplikat`);
          assert.ok(s.answer.length >= 3, `${at}: minimal 3 token`);
        }
        if (['fix-code', 'challenge'].includes(s.type)) {
          assert.ok(s.rules && Object.keys(s.rules).length, `${at}: butuh rules`);
          assert.ok(s.instruction, `${at}: instruction`);
        }
        if (s.type === 'mini-project') {
          assert.ok(s.checkItems.length >= 4, `${at}: minimal 4 checklist`);
          assert.strictEqual(new Set(s.checkItems.map((c) => c.id)).size, s.checkItems.length, `${at}: id checklist duplikat`);
        }
        if (s.type === 'review') assert.ok(s.points && s.points.length >= 3, `${at}: minimal 3 poin`);
      });
    });
  });
});

// -------------------------------------------------------- 2. pemeriksa CSS
console.log('\n--- 2. Pemeriksa CSS (css-checker.js) ---');
const mkDoc = (css, body) => parse(`<!DOCTYPE html><html><head><style>${css}</style></head><body>${body}</body></html>`);

test('cascade: specificity (id > class > tag) dan urutan penulisan', () => {
  const css = CSSCheck.create(mkDoc('h1{color:red} .a{color:blue} #b{color:green} p{color:red} p{color:blue}', '<h1 class="a" id="b">x</h1><p>y</p>'));
  assert.ok(css.colorIs('h1', 'color', 'green'));
  assert.ok(css.colorIs('p', 'color', 'blue'));
});
test('cascade: !important dan inline style menang', () => {
  const css = CSSCheck.create(mkDoc('#b{color:green} h1{color:red !important}', '<h1 id="b" style="color:blue">x</h1>'));
  assert.ok(css.colorIs('h1', 'color', 'red'));
});
test('inheritance: color/font diwariskan, margin tidak', () => {
  const css = CSSCheck.create(mkDoc('body{color:#333;font-family:Arial;margin:0}', '<div><p>x</p></div>'));
  assert.strictEqual(css.value('p', 'color'), '#333');
  assert.strictEqual(css.value('p', 'font-family'), 'Arial');
  assert.strictEqual(css.value('p', 'margin-top'), null);
});
test('shorthand: margin/padding/border/background diurai ke longhand', () => {
  const css = CSSCheck.create(mkDoc('.k{margin:0 auto;padding:8px 16px;border:2px solid red;background:#eee}', '<div class="k"></div>'));
  assert.strictEqual(css.value('.k', 'margin-left'), 'auto');
  assert.strictEqual(css.value('.k', 'margin-top'), '0');
  assert.strictEqual(css.value('.k', 'padding-left'), '16px');
  assert.strictEqual(css.value('.k', 'border-style'), 'solid');
  assert.ok(css.colorIs('.k', 'border-color', '#ff0000'));
  assert.ok(css.colorIs('.k', 'background-color', '#eeeeee'));
});
test('warna: nama, hex 3/6, rgb, hsl dianggap setara', () => {
  assert.ok(CSSCheck.colorEquals('red', '#f00'));
  assert.ok(CSSCheck.colorEquals('rgb(255, 0, 0)', '#ff0000'));
  assert.ok(CSSCheck.colorEquals('hsl(0, 100%, 50%)', 'red'));
  assert.ok(!CSSCheck.colorEquals('red', 'blue'));
});
test('aturan keadaan (:hover) tidak ikut nilai dasar, tapi terbaca lewat has/hasSelector', () => {
  const css = CSSCheck.create(mkDoc('a{color:blue} a:hover{color:orange}', '<a href="#">x</a>'));
  assert.ok(css.colorIs('a', 'color', 'blue'));
  assert.ok(css.has('a:hover', 'color', 'orange'));
  assert.ok(css.hasSelector(':hover'));
});
test('@media: kondisi dan isi terbaca, tidak mengubah nilai dasar', () => {
  const css = CSSCheck.create(mkDoc('h1{font-size:32px} @media (max-width: 600px){ h1{font-size:20px} .x{display:none} }', '<h1>x</h1>'));
  assert.strictEqual(css.value('h1', 'font-size'), '32px');
  assert.ok(css.hasMedia(/max-width/));
  assert.ok(css.mediaHas('font-size', '20px'));
  assert.ok(!css.mediaHas('font-size', '99px'));
});
test('blok tidak ditutup & deklarasi tanpa titik koma ditangani tanpa error', () => {
  const css = CSSCheck.create(mkDoc('p{color:red\nfont-size:20px', '<p>x</p>'));
  assert.ok(!css.is('p', 'color', 'red'), 'deklarasi menyatu → bukan merah');
  const css2 = CSSCheck.create(mkDoc('h2{color:purple;', '<h2>x</h2>'));
  assert.ok(css2.colorIs('h2', 'color', 'purple'));
});
test('komentar CSS diabaikan', () => {
  const css = CSSCheck.create(mkDoc('/* h1{color:red} */ h1{color:blue}', '<h1>x</h1>'));
  assert.ok(css.colorIs('h1', 'color', 'blue'));
});
test('num(): angka pertama dari nilai', () => {
  const css = CSSCheck.create(mkDoc('.k{padding:12px 4px;width:50%}', '<div class="k"></div>'));
  assert.strictEqual(css.num('.k', 'padding-top'), 12);
  assert.strictEqual(css.num('.k', 'width'), 50);
});

// ---------------------------------------------------------- 3. latihan
console.log('\n--- 3. Latihan: jawaban acuan lolos, kode awal gagal ---');
const exerciseKeys = new Set();
cssLevels.forEach((level) => {
  level.lessons.forEach((lesson) => {
    lesson.slides.forEach((slide, idx) => {
      if (!['challenge', 'fix-code', 'mini-project'].includes(slide.type)) return;
      const key = `${level.id}-${lesson.id}-${idx}`;
      exerciseKeys.add(key);
      const label = `${key} [${slide.type}] ${lesson.title}`;
      const spec = solutions[key];

      test(`${label}: ada jawaban acuan`, () => { assert.ok(spec !== undefined, 'tambahkan jawaban acuan di tests/css-solutions.mjs'); });
      if (spec === undefined) return;

      test(`${label}: jawaban acuan LOLOS`, () => {
        const code = resolveSolution(slide, spec);
        const r = runSlide(slide, code);
        assert.ok(r.ok, r.why);
      });
      test(`${label}: kode awal GAGAL`, () => {
        const starter = slide.starterCode ?? slide.brokenCode ?? '';
        const r = runSlide(slide, starter);
        assert.ok(!r.ok, 'kode awal sudah lolos — latihan tidak menantang');
      });
    });
  });
});
test('Tidak ada jawaban acuan yatim (kunci tanpa latihan)', () => {
  const orphans = Object.keys(solutions).filter((k) => !exerciseKeys.has(k));
  assert.deepStrictEqual(orphans, [], 'kunci tanpa latihan: ' + orphans.join(', '));
});

console.log('\n=============================================');
console.log(` HASIL: ${passed}/${total} pengujian lolos`);
console.log('=============================================\n');
if (passed !== total) process.exit(1);
