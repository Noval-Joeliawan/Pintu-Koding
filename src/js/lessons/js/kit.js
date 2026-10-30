// src/js/lessons/js/kit.js — Pembuat slide/lesson ringkas untuk Jalur JavaScript (Level 23–32)
//
// Meniru src/js/lessons/css/kit.js: hanya konstruktor kecil yang menghasilkan objek slide
// dengan bentuk SAMA seperti data.js, jadi LessonEngine / Exercises tidak perlu tahu apa-apa
// soal berkas ini.
//
// Konvensi latihan JavaScript:
//  - Kode murid untuk level 23–31 adalah KODE JS MURNI (bukan dokumen HTML).
//  - Untuk level DOM (Level 32), starterCode berupa objek { html, js } — tab editor JS + HTML.
//  - Validasi memakai rule `js: [...]` (analisis statis via js-checker.js), `rules.output`
//    (hasil console.log setelah eksekusi), dan `rules.dom` (pemeriksaan DOM pasca-eksekusi)
//    lewat Validator.validateCodeJSAsync() — lihat src/js/editor/js-checker.js dan
//    src/js/editor/validator.js.
window.JSLessonKit = (function () {
  "use strict";

  const kit = {
    /** Objek dokumen DOM: html = potongan isi <body>, js = kode script murid. */
    doc: (html, js) => ({ html: html || "", js: js || "" }),

    mat: (title, icon, content, code) => {
      const s = { type: "material", title, icon, content };
      if (code) s.code = code;
      return s;
    },
    ex: (title, code, content) => {
      const s = { type: "example", title, code };
      if (content) s.content = content;
      return s;
    },
    rev: (title, points) => ({ type: "review", title, points }),

    mc: (question, options, answer, explanation) => ({
      type: "multiple-choice",
      question,
      options,
      answer,
      explanation,
    }),

    fill: (instruction, before, answer, after, explanation) => ({
      type: "fill-code",
      instruction,
      before,
      blank: answer,
      after,
      answer,
      explanation,
    }),

    drag: (instruction, answer, explanation) => {
      const s = {
        type: "drag-drop",
        instruction,
        tokens: answer.slice().reverse(),
        answer,
      };
      if (explanation) s.explanation = explanation;
      return s;
    },

    fix: (instruction, brokenCode, fixHint, rules, explanation) => ({
      type: "fix-code",
      instruction,
      brokenCode,
      fixHint,
      rules,
      explanation,
    }),

    chal: (instruction, starterCode, rules, explanation) => ({
      type: "challenge",
      instruction,
      starterCode,
      rules,
      explanation,
    }),

    free: (instruction, starterCode) => ({
      type: "code-editor",
      instruction,
      starterCode,
    }),

    chk: (id, label, checkStr) => ({ id, label, checkStr }),

    mini: (title, instruction, starterCode, checkItems, rules) => {
      const s = {
        type: "mini-project",
        title,
        instruction,
        starterCode,
        checkItems,
      };
      if (rules) s.rules = rules;
      return s;
    },

    lesson: (id, title, slides) => ({
      id,
      title,
      xpReward: 10,
      isProject: false,
      slides,
    }),

    project: (id, title, slides, xp) => ({
      id,
      title,
      xpReward: xp || 30,
      isProject: true,
      slides,
    }),

    /** Level jalur JavaScript. `trackLevel` = nomor di dalam jalur (1–10); `id` = nomor global (23–32). */
    level: (id, trackLevel, icon, title, description, lessons, extra) =>
      Object.assign(
        { id, track: "js", trackLevel, icon, title, description, lessons },
        extra || {},
      ),

    register(level) {
      if (window.LessonData && window.LessonData.addLevel)
        window.LessonData.addLevel(level);
    },
  };

  return kit;
})();
