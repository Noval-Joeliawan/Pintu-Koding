// tests/js-suite.mjs — Pengujian Jalur JavaScript (Level 23–32)
//
// Menjalankan:   NODE_PATH=/path/ke/node_modules node tests/js-suite.mjs
// (butuh `jsdom`, sama seperti tests/css-suite.mjs; tidak ada package.json di repo ini)
//
// Yang diperiksa:
//  1. Struktur data  : 10 level × 5 lesson (id 23–32), jalur HTML & CSS tidak berubah,
//                      tipe slide valid, rules JS lengkap, kunci jawaban masuk akal.
//  2. Pemeriksa JS   : js-checker.js (statis) + Sandbox.buildRunnableDoc + validator async.
//  3. Setiap latihan : jawaban acuan (tests/js-solutions.mjs) HARUS lolos validasi
//                      (termasuk EKSEKUSI NYATA lewat jsdom), dan kode awal / kode rusak
//                      HARUS gagal — jadi tidak ada latihan yang "selalu benar".
import assert from "node:assert";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { solutions } from "./js-solutions.mjs";

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

let JSDOM;
try {
  ({ JSDOM } = require("jsdom"));
} catch (e) {
  console.error(
    "jsdom tidak ditemukan. Jalankan dengan NODE_PATH yang menunjuk ke node_modules berisi jsdom.",
  );
  process.exit(1);
}

// --- muat modul browser ke lingkungan Node ---------------------------------
globalThis.window = globalThis;
const Validator = require(path.join(root, "src/js/editor/validator.js"));
const JSCheck = require(path.join(root, "src/js/editor/js-checker.js"));
const Sandbox = require(path.join(root, "src/js/editor/sandbox.js"));
require(path.join(root, "src/js/lessons/data.js"));
require(path.join(root, "src/js/lessons/css/kit.js"));
[
  "level-13-14",
  "level-15-16",
  "level-17-18",
  "level-19-20",
  "level-21-22",
].forEach((f) => {
  try {
    require(path.join(root, `src/js/lessons/css/${f}.js`));
  } catch (e) {
    if (e.code !== "MODULE_NOT_FOUND") throw e;
  }
});
require(path.join(root, "src/js/lessons/js/kit.js"));
[
  "level-23-24",
  "level-25-26",
  "level-27-28",
  "level-29-30",
  "level-31-32",
].forEach((f) => {
  require(path.join(root, `src/js/lessons/js/${f}.js`));
});
const LessonData = globalThis.LessonData;

let total = 0,
  passed = 0;
const failures = [];
function test(name, fn) {
  total++;
  try {
    fn();
    passed++;
  } catch (err) {
    failures.push(`${name}\n         ${err.message}`);
    console.error(`  [FAIL] ${name}\n         ${err.message}`);
    return;
  }
  if (process.env.VERBOSE) console.log(`  [PASS] ${name}`);
}
const asyncTests = [];
function atest(name, fn) {
  total++;
  asyncTests.push([name, fn]);
}
async function runAsyncTests() {
  for (const [name, fn] of asyncTests) {
    try {
      await fn();
      passed++;
    } catch (err) {
      failures.push(`${name}\n         ${err.message}`);
      console.error(`  [FAIL] ${name}\n         ${err.message}`);
    }
    if (process.env.VERBOSE && !failures.some((f) => f.startsWith(name)))
      console.log(`  [PASS] ${name}`);
  }
}

// ------------------------------------------------- runner eksekusi di jsdom
// Meniru bridge Sandbox (console capture + pemeriksaan DOM pasca-eksekusi).
const fmtValue = (a) => {
  if (a === null) return "null";
  if (a === undefined) return "undefined";
  if (typeof a === "string") return a;
  if (typeof a === "number" || typeof a === "boolean") return String(a);
  if (Array.isArray(a)) {
    try {
      return "[" + a.map(fmtValue).join(", ") + "]";
    } catch (e) {
      return String(a);
    }
  }
  if (typeof a === "object") {
    try {
      return JSON.stringify(a);
    } catch (e) {
      return String(a);
    }
  }
  return String(a);
};

function makeNodeRunner() {
  return async function runner(jsCode, opts) {
    opts = opts || {};
    const checks = opts.checks || [];
    const dom = new JSDOM(
      '<!DOCTYPE html><html lang="id"><head><meta charset="UTF-8"></head><body>' +
        (opts.html || "") +
        "</body></html>",
      { runScripts: "outside-only", pretendToBeVisual: true },
    );
    const w = dom.window;
    const logs = [];
    ["log", "info", "warn", "error"].forEach((m) => {
      w.console[m] = (...args) => {
        logs.push({ type: m, text: args.map(fmtValue).join(" ") });
      };
    });
    let error = null;
    try {
      w.eval(String(jsCode == null ? "" : jsCode));
    } catch (e) {
      error = e && e.message ? e.message : String(e);
    }

    const helper = {
      logs,
      error,
      ok: () => !error,
      output: () => logs.map((l) => l.text).join("\n"),
      logCount: () => logs.length,
      click: (sel) => {
        const el = w.document.querySelector(sel);
        if (el && el.click) el.click();
        return !!el;
      },
      setValue: (sel, val) => {
        const el = w.document.querySelector(sel);
        if (el) el.value = val;
        return !!el;
      },
    };
    const checkResults = checks.map((c) => {
      try {
        return !!new Function("doc", "css", "js", "return (" + c + ");")(
          w.document,
          null,
          helper,
        );
      } catch (e) {
        return false;
      }
    });
    dom.window.close();
    return {
      status: error ? "error" : "success",
      logs,
      error: error || "",
      checkResults,
    };
  };
}
const nodeRunner = makeNodeRunner();

function resolveSolution(slide, spec) {
  const starter = slide.starterCode ?? slide.brokenCode ?? "";
  const isObj = starter && typeof starter === "object";
  if (isObj) {
    assert.ok(
      spec && typeof spec === "object" && spec.js !== undefined,
      "latihan DOM butuh spec { js } di js-solutions.mjs",
    );
    return { js: spec.js, html: starter.html || "" };
  }
  const code = typeof spec === "string" ? spec : spec && spec.js;
  assert.ok(
    typeof code === "string",
    "jawaban acuan harus string (atau { js } untuk latihan DOM)",
  );
  return { js: code, html: "" };
}

/** Meniru Exercises (challenge/fix) & _checkProjectJS untuk Jalur JS. */
async function runSlide(slide, code, html) {
  if (slide.type === "challenge" || slide.type === "fix-code") {
    const r = await Validator.validateCodeJSAsync(code, slide.rules || {}, {
      html: html || "",
      runner: nodeRunner,
    });
    return { ok: r.success, why: r.errors.join(" | ") };
  }
  if (slide.type === "mini-project") {
    const failed = [];
    let staticErrors = [];
    if (slide.rules && Array.isArray(slide.rules.js)) {
      const sr = JSCheck.checkStatic(code, slide.rules.js);
      staticErrors = sr.errors;
    }
    const checks = (slide.checkItems || []).map((i) => i.checkStr || "false");
    const run = await nodeRunner(code, { html: html || "", checks });
    (slide.checkItems || []).forEach((item, i) => {
      const ok =
        run.status === "success" &&
        run.checkResults[i] === true &&
        staticErrors.length === 0;
      if (!ok) failed.push(item.id);
    });
    if (run.status !== "error" && staticErrors.length) failed.unshift("static");
    return {
      ok: failed.length === 0,
      why:
        (run.status !== "success" ? ["error: " + run.error] : [])
          .concat(staticErrors)
          .join(" | ") || "gagal: " + failed.join(", "),
    };
  }
  throw new Error("tipe tidak didukung: " + slide.type);
}

console.log("\n=============================================");
console.log(" PINTU KODING — JALUR JAVASCRIPT (Level 23–32)");
console.log("=============================================\n");

// ---------------------------------------------------------------- 1. struktur
console.log("--- 1. Struktur data ---");
const jsLevels = LessonData.getLevelsByTrack("js");
const VALID_TYPES = [
  "material",
  "example",
  "review",
  "multiple-choice",
  "fill-code",
  "drag-drop",
  "fix-code",
  "challenge",
  "mini-project",
  "code-editor",
];

test("Tiga jalur terdaftar: html, css, js", () => {
  assert.deepStrictEqual(
    LessonData.tracks.map((t) => t.id),
    ["html", "css", "js"],
  );
  assert.strictEqual(LessonData.getTrackIcon("js"), "⚡");
});

test("Jalur JavaScript terdaftar: 10 level dengan id 23–32", () => {
  assert.strictEqual(jsLevels.length, 10, `ada ${jsLevels.length} level JS`);
  assert.deepStrictEqual(
    jsLevels.map((l) => l.id),
    [23, 24, 25, 26, 27, 28, 29, 30, 31, 32],
  );
  assert.deepStrictEqual(
    jsLevels.map((l) => l.trackLevel),
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  );
  assert.ok(jsLevels.every((l) => l.track === "js"));
});

test("Jalur HTML tidak berubah: 12 level, 60 lesson", () => {
  const html = LessonData.getLevelsByTrack("html");
  assert.strictEqual(html.length, 12);
  assert.strictEqual(
    html.reduce((n, l) => n + l.lessons.length, 0),
    60,
  );
});

test("Jalur CSS tidak berubah: 10 level, 50 lesson", () => {
  const css = LessonData.getLevelsByTrack("css");
  assert.strictEqual(css.length, 10);
  assert.strictEqual(
    css.reduce((n, l) => n + l.lessons.length, 0),
    50,
  );
});

test('Label level: "Level 3" (HTML), "CSS Level 3" (CSS), "JS Level 3" (JS)', () => {
  assert.strictEqual(LessonData.getLevelLabel(3), "Level 3");
  assert.strictEqual(LessonData.getLevelLabel(15), "CSS Level 3");
  assert.strictEqual(LessonData.getLevelLabel(25), "JS Level 3");
  assert.strictEqual(LessonData.getLevelLabel(32), "JS Level 10");
});

test("Final Project terdeteksi di Level 12, 22, dan 32 (lesson 5) saja", () => {
  assert.ok(LessonData.isFinalProject(12, 5));
  assert.ok(LessonData.isFinalProject(22, 5));
  assert.ok(LessonData.isFinalProject(32, 5));
  assert.ok(!LessonData.isFinalProject(31, 5));
  assert.ok(!LessonData.isFinalProject(32, 4));
});

test("Urutan global level tetap 1..32 tanpa duplikat", () => {
  const ids = LessonData.levels.map((l) => l.id);
  assert.deepStrictEqual(
    ids,
    Array.from({ length: 32 }, (_, i) => i + 1),
  );
});

jsLevels.forEach((level) => {
  test(`${LessonData.getLevelLabel(level)} "${level.title}": 5 lesson, lesson 5 = project`, () => {
    assert.strictEqual(level.lessons.length, 5);
    assert.deepStrictEqual(
      level.lessons.map((l) => l.id),
      [1, 2, 3, 4, 5],
    );
    assert.ok(level.lessons[4].isProject, "lesson 5 harus project");
    assert.ok(level.lessons.slice(0, 4).every((l) => !l.isProject));
    assert.ok(level.description && level.icon);
    if (level.id === 32)
      assert.ok(level.finalProject, "level 32 harus finalProject");
    assert.strictEqual(level.lessons[4].xpReward, level.id === 32 ? 100 : 30);
  });

  level.lessons.forEach((lesson) => {
    test(`Slide ${level.id}-${lesson.id} "${lesson.title}" valid`, () => {
      assert.ok(lesson.slides.length >= 2, "minimal 2 slide");
      assert.ok(
        ["material", "review"].includes(lesson.slides[0].type) ||
          lesson.slides[0].type === "example",
        "slide pertama = materi",
      );
      const last = lesson.slides[lesson.slides.length - 1];
      if (!lesson.isProject)
        assert.strictEqual(last.type, "review", "lesson biasa diakhiri review");
      lesson.slides.forEach((s, i) => {
        const at = `slide ${i + 1} (${s.type})`;
        assert.ok(VALID_TYPES.includes(s.type), `${at}: tipe tidak dikenal`);
        if (s.type === "multiple-choice") {
          assert.ok(
            s.options.length >= 3 && s.options.length <= 4,
            `${at}: 3–4 pilihan`,
          );
          assert.ok(
            Number.isInteger(s.answer) &&
              s.answer >= 0 &&
              s.answer < s.options.length,
            `${at}: answer di luar jangkauan`,
          );
          assert.strictEqual(
            new Set(s.options).size,
            s.options.length,
            `${at}: pilihan duplikat`,
          );
          assert.ok(s.explanation, `${at}: butuh explanation`);
        }
        if (s.type === "fill-code") {
          assert.ok(s.answer && s.blank === s.answer, `${at}: answer/blank`);
          assert.ok(
            s.instruction && s.explanation,
            `${at}: instruction/explanation`,
          );
        }
        if (s.type === "drag-drop") {
          assert.deepStrictEqual(
            [...s.tokens].sort(),
            [...s.answer].sort(),
            `${at}: tokens harus sama dengan answer`,
          );
          assert.strictEqual(
            new Set(s.answer).size,
            s.answer.length,
            `${at}: token duplikat`,
          );
          assert.ok(s.answer.length >= 3, `${at}: minimal 3 token`);
        }
        if (["fix-code", "challenge"].includes(s.type)) {
          assert.ok(
            s.rules && Object.keys(s.rules).length,
            `${at}: butuh rules`,
          );
          assert.ok(
            s.rules.js && s.rules.js.length,
            `${at}: butuh rule js (statis)`,
          );
          assert.ok(s.instruction, `${at}: instruction`);
        }
        if (s.type === "mini-project") {
          assert.ok(s.checkItems.length >= 4, `${at}: minimal 4 checklist`);
          assert.strictEqual(
            new Set(s.checkItems.map((c) => c.id)).size,
            s.checkItems.length,
            `${at}: id checklist duplikat`,
          );
        }
        if (s.type === "review")
          assert.ok(s.points && s.points.length >= 3, `${at}: minimal 3 poin`);
      });
    });
  });
});

test("Level 32 (DOM): challenge/mini memakai starterCode objek {html, js} + rule dom", () => {
  const l32 = LessonData.getLevel(32);
  l32.lessons.forEach((lesson) => {
    lesson.slides.forEach((s) => {
      if (["challenge", "mini-project"].includes(s.type)) {
        assert.ok(
          s.starterCode &&
            typeof s.starterCode === "object" &&
            "html" in s.starterCode &&
            "js" in s.starterCode,
          `${l32.id}-${lesson.id}: starterCode harus {html, js}`,
        );
        assert.ok(
          s.starterCode.html.trim(),
          `${l32.id}-${lesson.id}: html starter tidak boleh kosong`,
        );
      }
    });
  });
  const domRules = l32.lessons
    .flatMap((l) => l.slides)
    .filter((s) => s.type === "challenge" || s.type === "mini-project");
  assert.ok(
    domRules.every((s) =>
      s.type === "mini-project"
        ? s.checkItems.length > 0
        : s.rules.dom && s.rules.dom.length,
    ),
    "latihan DOM harus punya pemeriksaan pasca-eksekusi",
  );
});

test("Level 23–31: kode awal challenge adalah JS murni (string, bukan dokumen HTML)", () => {
  jsLevels
    .filter((l) => l.id < 32)
    .forEach((level) => {
      level.lessons.forEach((lesson) => {
        lesson.slides.forEach((s) => {
          if (s.type === "challenge" || s.type === "fix-code") {
            const starter = s.starterCode ?? s.brokenCode;
            assert.ok(
              typeof starter === "string",
              `${level.id}-${lesson.id}: starter harus string`,
            );
            assert.ok(
              !/<!doctype html/i.test(starter),
              `${level.id}-${lesson.id}: jangan pakai dokumen HTML di jalur JS murni`,
            );
          }
        });
      });
    });
});

// -------------------------------------------------------- 2. pemeriksa JS
console.log(
  "\n--- 2. Pemeriksa JavaScript (js-checker.js + sandbox + validator) ---",
);

test("syntaxOk: mendeteksi kurung/kutip yang tidak berpasangan", () => {
  assert.ok(JSCheck.syntaxOk("const a = 1;\nconsole.log(a);"));
  assert.ok(!JSCheck.syntaxOk('console.log("Halo"'));
  assert.ok(!JSCheck.syntaxOk("if (x > 1) { console.log(x);"));
  assert.ok(!JSCheck.syntaxOk("const sisa = 10 mod 3;"));
});

test("stripComments: komentar dihapus, isi string tetap utuh", () => {
  const c = JSCheck.stripComments(
    '// ini komentar\nconst s = "// bukan komentar";\n/* blok\n  komentar */ console.log(1);',
  );
  assert.ok(!c.includes("ini komentar"), "komentar baris dihapus");
  assert.ok(!c.includes("blok"), "komentar blok dihapus");
  assert.ok(c.includes('"// bukan komentar"'), "string tidak ikut terhapus");
});

test("parseConsoleLogs: literal string, angka, boolean, dan gabungan +", () => {
  const logs = JSCheck.parseConsoleLogs(
    'console.log("Halo");\nconsole.log(7);\nconsole.log(true);\nconsole.log("a" + " " + "b");\nconsole.log(nama);',
  );
  assert.ok(logs.includes("Halo"));
  assert.ok(logs.includes("7"));
  assert.ok(logs.includes("true"));
  assert.ok(logs.includes("a b"));
  assert.strictEqual(
    logs.length,
    4,
    "argumen non-literal (nama) tidak dihitung",
  );
});

test("rule declares: let/const/var terdeteksi, nama serupa tidak false-positive", () => {
  const r = JSCheck.checkStatic("let sisa = 5;\nconst sisaBaru = 6;", [
    { declares: "sisa", decl: ["let"] },
    { declares: "sisaBaru" },
  ]);
  assert.strictEqual(r.errors.length, 0, JSON.stringify(r.errors));
  const r2 = JSCheck.checkStatic("let sisau = 5;", [{ declares: "sisa" }]);
  assert.strictEqual(r2.errors.length, 1, "sisa ≠ sisau");
});

test("rule func & calls: definisi, parameter, dan pemanggilan terbaca", () => {
  const code =
    "function kali(a, b) {\n  return a * b;\n}\nconst hasil = kali(4, 5);";
  const r = JSCheck.checkStatic(code, [
    { func: "kali", params: { min: 2 } },
    { calls: "kali", withArgs: [4, 5] },
  ]);
  assert.strictEqual(r.errors.length, 0, JSON.stringify(r.errors));
  const r2 = JSCheck.checkStatic("function kali() { return 1; }", [
    { func: "kali", params: { min: 2 } },
  ]);
  assert.strictEqual(r2.errors.length, 1, "parameter kurang dari minimal");
  const r3 = JSCheck.checkStatic("function sapa() { return 1; }", [
    { calls: "sapa" },
  ]);
  assert.strictEqual(
    r3.errors.length,
    1,
    "fungsi yang tidak pernah dipanggil terdeteksi",
  );
});

test("rule uses: detector for, while, &&, ||, !, template-literal, push, length, addEventListener-click", () => {
  const ok = JSCheck.checkStatic(
    "for (let i = 0; i < 3; i++) { if (i && true) {} }",
    [{ uses: ["for", "if", "&&"] }],
  );
  assert.strictEqual(ok.errors.length, 0, JSON.stringify(ok.errors));
  assert.strictEqual(
    JSCheck.checkStatic("let x = 1 !== 2;", [{ uses: "not" }]).errors.length,
    1,
    "!== bukan operator NOT",
  );
  assert.strictEqual(
    JSCheck.checkStatic("let y = !true;", [{ uses: "not" }]).errors.length,
    0,
  );
  assert.strictEqual(
    JSCheck.checkStatic("const s = `Hai ${nama}`;", [
      { uses: "template-literal" },
    ]).errors.length,
    0,
  );
  assert.strictEqual(
    JSCheck.checkStatic("arr.push(1); let n = arr.length;", [
      { uses: ["push", "length"] },
    ]).errors.length,
    0,
  );
  assert.strictEqual(
    JSCheck.checkStatic('btn.addEventListener("click", f);', [
      { uses: "addEventListener-click" },
    ]).errors.length,
    0,
  );
  assert.strictEqual(
    JSCheck.checkStatic('btn.addEventListener("submit", f);', [
      { uses: "addEventListener-click" },
    ]).errors.length,
    1,
  );
  assert.strictEqual(
    JSCheck.checkStatic("const a = [1, 2];\nlet b = a[0];", [
      { uses: "array-literal" },
      { uses: "index-access" },
    ]).errors.length,
    0,
  );
  assert.strictEqual(
    JSCheck.checkStatic("for (let i=0;i<2;i++){ for (let j=0;j<2;j++){} }", [
      { uses: "for-nested" },
    ]).errors.length,
    0,
  );
});

test("rule consoleLog statis: kecocokan persis & mengandung", () => {
  const r = JSCheck.checkStatic('console.log("Halo Dunia");', [
    { consoleLog: "Halo Dunia" },
    { consoleLogContains: "Dunia" },
  ]);
  assert.strictEqual(r.errors.length, 0, JSON.stringify(r.errors));
  const r2 = JSCheck.checkStatic('console.log("Halo Dunia");', [
    { consoleLog: "halo dunia" },
  ]);
  assert.strictEqual(r2.errors.length, 1, "harus persis (case-sensitive)");
});

test("rule notContains & contains dengan RegExp", () => {
  const r = JSCheck.checkStatic("let nilai = 5;", [
    { notContains: /const\s+nilai/ },
    { contains: /let\s+nilai/ },
  ]);
  assert.strictEqual(r.errors.length, 0, JSON.stringify(r.errors));
  const r2 = JSCheck.checkStatic("const nilai = 5;", [
    { notContains: /const\s+nilai/ },
  ]);
  assert.strictEqual(r2.errors.length, 1);
});

test("Sandbox.buildRunnableDoc: capture, finalize, dan script murid tersusun benar", () => {
  const built = Sandbox.buildRunnableDoc(
    '<h1 id="a">Halo</h1>',
    'console.log("x");',
    { checks: ['doc.querySelector("#a") !== null'] },
  );
  assert.ok(built.runId.startsWith("doc_"), "runId dibuat");
  assert.ok(
    built.doc.includes('<h1 id="a">Halo</h1>'),
    "html siswa ada di body",
  );
  assert.ok(built.doc.includes("__pkLogs"), "skrip capture konsol tersisip");
  assert.ok(built.doc.includes("PK_DOC_RESULT"), "skrip finalize tersisip");
  assert.ok(built.doc.includes('console.log("x");'), "kode murid tersisip");
  assert.ok(
    built.doc.indexOf("__pkLogs") < built.doc.indexOf('console.log("x");'),
    "capture berjalan SEBELUM kode murid",
  );
  assert.ok(
    built.doc.lastIndexOf('console.log("x");') <
      built.doc.indexOf("PK_DOC_RESULT"),
    "finalize berjalan SETELAH kode murid",
  );
});

test('Sandbox.buildRunnableDoc: "</script>" dalam kode murid dinetralkan', () => {
  const built = Sandbox.buildRunnableDoc(
    "",
    'const s = "</scr" + "ipt aman";',
    {},
  );
  assert.ok(
    !/<\/script>\s*const s/.test(built.doc.replace(/<\/scr\s*\+\s*ipt>/g, "")),
    "tidak memecah tag script",
  );
});

await atest(
  "validateCodeJSAsync: output equals/contains/logCount lewat eksekusi nyata",
  async () => {
    const r = await Validator.validateCodeJSAsync(
      "for (let i = 1; i <= 3; i++) { console.log(i); }",
      { js: [{ uses: "for" }], output: { equals: "1\n2\n3" } },
      { runner: nodeRunner },
    );
    assert.strictEqual(r.success, true, r.errors.join(" | "));
    const r2 = await Validator.validateCodeJSAsync(
      'console.log("abc");',
      { output: { contains: "xyz" } },
      { runner: nodeRunner },
    );
    assert.strictEqual(r2.success, false);
    const r3 = await Validator.validateCodeJSAsync(
      "console.log(1);\nconsole.log(2);",
      { output: { logCount: { min: 2 } } },
      { runner: nodeRunner },
    );
    assert.strictEqual(r3.success, true, r3.errors.join(" | "));
  },
);

await atest(
  "validateCodeJSAsync: error runtime dilaporkan dengan pesan jelas",
  async () => {
    const r = await Validator.validateCodeJSAsync(
      'const buah = ["a"];\nbuah.length();',
      { js: [{ syntaxOk: true }], output: { contains: "3" } },
      { runner: nodeRunner },
    );
    assert.strictEqual(r.success, false);
    assert.ok(r.errors[0].includes("error"), "menyebut error: " + r.errors[0]);
  },
);

await atest(
  "validateCodeJSAsync: rule dom mengevaluasi DOM pasca-eksekusi (termasuk klik)",
  async () => {
    const html = '<p id="hitung">0</p><button id="tombol">+</button>';
    const js =
      'const hitung = document.getElementById("hitung");\nconst tombol = document.getElementById("tombol");\nlet angka = 0;\ntombol.addEventListener("click", function () { angka++; hitung.textContent = angka; });';
    const r = await Validator.validateCodeJSAsync(
      js,
      {
        js: [{ uses: "addEventListener-click" }],
        dom: [
          'js.click("#tombol") && js.click("#tombol") && doc.querySelector("#hitung").textContent === "2"',
        ],
      },
      { html, runner: nodeRunner },
    );
    assert.strictEqual(r.success, true, r.errors.join(" | "));
  },
);

// ---------------------------------------------------------- 3. latihan
console.log("\n--- 3. Latihan: jawaban acuan lolos, kode awal gagal ---");
const exerciseKeys = new Set();
const atestKeys = [];
jsLevels.forEach((level) => {
  level.lessons.forEach((lesson) => {
    lesson.slides.forEach((slide, idx) => {
      if (!["challenge", "fix-code", "mini-project"].includes(slide.type))
        return;
      const key = `${level.id}-${lesson.id}-${idx}`;
      exerciseKeys.add(key);
      atestKeys.push([key, slide, lesson]);
    });
  });
});

for (const [key, slide, lesson] of atestKeys) {
  const label = `${key} [${slide.type}] ${lesson.title}`;
  const spec = solutions[key];

  atest(`${label}: ada jawaban acuan`, () => {
    assert.ok(
      spec !== undefined,
      "tambahkan jawaban acuan di tests/js-solutions.mjs",
    );
  });
  if (spec === undefined) continue;

  atest(`${label}: jawaban acuan LOLOS`, async () => {
    const sol = resolveSolution(slide, spec);
    const r = await runSlide(slide, sol.js, sol.html);
    assert.ok(r.ok, r.why);
  });
  atest(`${label}: kode awal GAGAL`, async () => {
    const starter = slide.starterCode ?? slide.brokenCode ?? "";
    const isObj = starter && typeof starter === "object";
    const r = await runSlide(
      slide,
      isObj ? starter.js : starter,
      isObj ? starter.html : "",
    );
    assert.ok(!r.ok, "kode awal sudah lolos — latihan tidak menantang");
  });
}

atest("Tidak ada jawaban acuan yatim (kunci tanpa latihan)", () => {
  const orphans = Object.keys(solutions).filter((k) => !exerciseKeys.has(k));
  assert.deepStrictEqual(
    orphans,
    [],
    "kunci tanpa latihan: " + orphans.join(", "),
  );
});
await runAsyncTests();

console.log("\n=============================================");
console.log(` HASIL: ${passed}/${total} pengujian lolos`);
console.log("=============================================\n");
if (passed !== total) process.exit(1);
