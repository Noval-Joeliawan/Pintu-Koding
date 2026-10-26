// src/js/lessons/css/kit.js — Pembuat slide/lesson ringkas untuk Jalur CSS (Level 13–22)
//
// Hanya konstruktor kecil yang menghasilkan objek slide dengan bentuk SAMA seperti data.js
// (material, example, multiple-choice, fill-code, drag-drop, fix-code, challenge, mini-project, review),
// jadi LessonEngine / Exercises tidak perlu tahu apa-apa soal berkas ini.
//
// Konvensi latihan CSS: kode murid adalah dokumen HTML yang berisi <style>. Validator memeriksa
// NILAI AKHIR properti (cascade + inheritance) lewat rule `css: [...]` / `css.is(...)` — lihat
// src/js/editor/css-checker.js dan src/js/editor/validator.js.
window.CSSLessonKit = (function () {
  'use strict';

  /** Rangka dokumen HTML untuk kode awal latihan. `css` dan `body` ditulis apa adanya. */
  function page(opts) {
    opts = opts || {};
    const head = opts.head ? opts.head.replace(/^/gm, '  ') + '\n' : '';
    const css = opts.css != null ? opts.css : '/* Tulis CSS kamu di sini */';
    const lines = [
      '<!DOCTYPE html>',
      '<html lang="id">',
      '<head>',
      '  <meta charset="UTF-8">',
      '  <title>' + (opts.title || 'Latihan CSS') + '</title>',
      head.replace(/\n$/, '') || null,
      '  <style>',
      css.replace(/^/gm, '    '),
      '  </style>',
      '</head>',
      '<body>',
      (opts.body || '').replace(/^/gm, '  '),
      '</body>',
      '</html>'
    ].filter(l => l !== null);
    return lines.join('\n');
  }

  const kit = {
    page,

    mat: (title, icon, content, code) => {
      const s = { type: 'material', title, icon, content };
      if (code) s.code = code;
      return s;
    },
    ex: (title, code, content) => {
      const s = { type: 'example', title, code };
      if (content) s.content = content;
      return s;
    },
    rev: (title, points) => ({ type: 'review', title, points }),

    mc: (question, options, answer, explanation) =>
      ({ type: 'multiple-choice', question, options, answer, explanation }),

    fill: (instruction, before, answer, after, explanation) =>
      ({ type: 'fill-code', instruction, before, blank: answer, after, answer, explanation }),

    drag: (instruction, answer, explanation) => {
      const s = { type: 'drag-drop', instruction, tokens: answer.slice().reverse(), answer };
      if (explanation) s.explanation = explanation;
      return s;
    },

    fix: (instruction, brokenCode, fixHint, rules, explanation) =>
      ({ type: 'fix-code', instruction, brokenCode, fixHint, rules, explanation }),

    chal: (instruction, starterCode, rules, explanation) =>
      ({ type: 'challenge', instruction, starterCode, rules, explanation }),

    free: (instruction, starterCode) =>
      ({ type: 'code-editor', instruction, starterCode }),

    chk: (id, label, checkStr) => ({ id, label, checkStr }),

    mini: (title, instruction, starterCode, checkItems) =>
      ({ type: 'mini-project', title, instruction, starterCode, checkItems }),

    lesson: (id, title, slides) =>
      ({ id, title, xpReward: 10, isProject: false, slides }),

    project: (id, title, slides, xp) =>
      ({ id, title, xpReward: xp || 30, isProject: true, slides }),

    /** Level jalur CSS. `trackLevel` = nomor di dalam jalur (1–10); `id` = nomor global (13–22). */
    level: (id, trackLevel, icon, title, description, lessons, extra) =>
      Object.assign({ id, track: 'css', trackLevel, icon, title, description, lessons }, extra || {}),

    register(level) {
      if (window.LessonData && window.LessonData.addLevel) window.LessonData.addLevel(level);
    }
  };

  return kit;
})();
