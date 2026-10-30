// js/validator.js — Reusable HTML Code Validator for PintuKoding
// Usage: validateCode(code, rules) → { success, errors, passed, hints }
//
// Supported rules:
//   requiredTags:      ['h1','p','img']
//   forbiddenTags:     ['b']                       // e.g. challenge asks <strong>, <b> not allowed
//   minCounts:         { h2:2, p:3, img:3 }
//   requiredAttributes:{ img:['src','alt'], a:['href'] }   // EVERY element of tag must have attrs
//   nonEmptyAttributes:{ img:['alt'] }             // attribute must exist AND not be empty
//   attributes:        { img:{width:'200',height:'150'} }  // at least ONE element with exact value(s)
//                                                  // value true = attribute must exist (boolean)
//                                                  // value ['a','b'] = any of the values
//   attributeContains: { button:{onclick:'alert'} } // at least one element whose attr contains substr
//   requiredText:      'Halo PintuKoding'          // text anywhere in document
//   textInside:        { strong:'PintuKoding' }    // at least one element of tag containing text
//   selectors:         ['header nav','ul li ul']   // DOM structure paths that must exist
//   requiredChildren:  { header:['nav'], section:['article'] } // direct parent-child
//   labelFor:          ['email','pesan']           // <label for="x"> + <input id="x"> pairs
//   nonEmptyText:      { li:true }                 // every element must contain text
//   requiredValues:    { input:{type:['text','email','password']} } // each value must exist
//   wellFormed:        true | ['p','strong']       // RAW source: every listed tag (or all) must be closed and
//                                                  // properly nested. DOMParser silently "repairs" broken
//                                                  // markup, so this must inspect the text the user typed.
//   rawMatch:          [{pattern, flags, message}] // RAW source must match the regex (e.g. quoted attributes)
//   css:               [{sel:'h1', prop:'color', value:'blue', msg, hint}]  // JALUR CSS: nilai akhir (cascade +
//                                                  // inheritance) property pada element pertama yang cocok `sel`.
//                                                  // value: string | [any-of] | /re/ | {re}; tanpa value = "sudah diatur".
//                                                  // opsi: all:true (semua element cocok), min/max (angka pertama),
//                                                  //       literal:true (aturan harus ditulis persis untuk selector tsb,
//                                                  //       cocok untuk :hover / ::before), not:true (nilai TIDAK boleh cocok),
//                                                  //       missingMsg (pesan bila element `sel` tidak ada di HTML)
//   cssMedia:          [{pattern:'max-width', prop:'flex-direction', value:'column', msg}]
//                                                  // harus ada @media dengan kondisi cocok (+ deklarasi di dalamnya)

(function () {
  "use strict";

  function parseHTML(code) {
    if (typeof DOMParser !== "undefined") {
      return new DOMParser().parseFromString(code, "text/html");
    }
    // Node (testing) fallback via jsdom
    try {
      const { JSDOM } = require("jsdom");
      return new JSDOM(code).window.document;
    } catch (e) {
      throw new Error("Tidak ada HTML parser tersedia.");
    }
  }

  function getCSSCheck() {
    if (typeof window !== "undefined" && window.CSSCheck)
      return window.CSSCheck;
    try {
      return require("./css-checker.js");
    } catch (e) {
      return null;
    }
  }

  function getJSCheck() {
    if (typeof window !== "undefined" && window.JSCheck) return window.JSCheck;
    try {
      return require("./js-checker.js");
    } catch (e) {
      return null;
    }
  }

  function normalizeOutputText(s) {
    return String(s == null ? "" : s)
      .replace(/\r\n/g, "\n")
      .trim();
  }

  /**
   * Runner bawaan (browser): eksekusi via Sandbox terisolasi (iframe + postMessage).
   * Di lingkungan Node (pengujian), options.runner dipakai sebagai pengganti.
   */
  function defaultJSRunner(jsCode, opts) {
    if (
      typeof window !== "undefined" &&
      window.Sandbox &&
      typeof window.Sandbox.runForValidation === "function"
    ) {
      return window.Sandbox.runForValidation(jsCode, opts);
    }
    return Promise.resolve({
      status: "error",
      logs: [],
      error: "Sandbox eksekusi JavaScript tidak tersedia.",
      checkResults: [],
    });
  }

  /**
   * Validasi kode JavaScript murid (Jalur JS). Padanan async dari validateCode.
   *
   * @param {string} code   kode JavaScript murid
   * @param {object} rules  { js: [rule statis], output: {...}, dom: [checkStr|{check,msg,hint}] }
   * @param {object} options { html: potongan body untuk level DOM, runner: fn(jsCode, {html, checks}) }
   * @returns {Promise<{success, errors:[], passed:[], hints:[]}>}
   */
  async function validateCodeJSAsync(code, rules, options) {
    rules = rules || {};
    options = options || {};
    const errors = [];
    const passed = [];
    const hints = [];

    // ---------- rule statis (analisis tanpa eksekusi) ----------
    const JC = getJSCheck();
    if (JC && Array.isArray(rules.js)) {
      const res = JC.checkStatic(code, rules.js);
      res.passed.forEach((p) => passed.push(p));
      res.errors.forEach((e) => errors.push(e));
      res.hints.forEach((h) => hints.push(h));
    }

    // ---------- rule eksekusi (output konsol & DOM) ----------
    const needsRun =
      !!rules.output || (Array.isArray(rules.dom) && rules.dom.length > 0);
    if (needsRun) {
      const runner = options.runner || defaultJSRunner;
      const checks = (rules.dom || []).map((c) =>
        typeof c === "string" ? c : c.check || "false",
      );
      let run;
      try {
        run = await runner(code, { html: options.html || "", checks });
      } catch (e) {
        run = {
          status: "error",
          logs: [],
          error: (e && e.message) || String(e),
          checkResults: [],
        };
      }

      if (run.status === "error") {
        errors.push(
          "Kode kamu menghasilkan error saat dijalankan: " +
            (run.error || "tidak diketahui"),
        );
        hints.push(
          "Baca pesan errornya dengan tenang — biasanya ada tanda kutip, kurung, atau ejaan yang kurang tepat.",
        );
      } else {
        const logsText = normalizeOutputText(
          (run.logs || []).map((l) => l.text).join("\n"),
        );

        // ----- output: { equals | contains | containsAll | logCount } -----
        const out = rules.output || {};
        if (out.equals !== undefined) {
          const expected = normalizeOutputText(out.equals);
          if (logsText === expected) {
            passed.push("Output konsol sudah persis seperti yang diminta.");
          } else {
            errors.push(
              out.msg ||
                'Output konsol belum persis. Diharapkan: "' +
                  expected.replace(/\n/g, " ⏎ ") +
                  '" — hasil kodemu: "' +
                  (logsText || "(kosong)").replace(/\n/g, " ⏎ ") +
                  '".',
            );
            hints.push(
              out.hint ||
                "Periksa urutan dan isi tiap baris console.log — termasuk spasi dan huruf besar/kecil.",
            );
          }
        }
        if (out.contains !== undefined) {
          const needles = Array.isArray(out.contains)
            ? out.contains
            : [out.contains];
          needles.forEach((needle) => {
            if (logsText.indexOf(String(needle)) !== -1) {
              passed.push('Output konsol memuat "' + needle + '".');
            } else {
              errors.push(
                out.msg ||
                  'Output konsol belum memuat "' +
                    needle +
                    '". Hasil kodemu: "' +
                    (logsText || "(kosong)") +
                    '".',
              );
              hints.push(out.hint || "Cek kembali isi console.log() kamu.");
            }
          });
        }
        if (Array.isArray(out.containsAll)) {
          out.containsAll.forEach((needle) => {
            if (logsText.indexOf(String(needle)) !== -1) {
              passed.push('Output konsol memuat "' + needle + '".');
            } else {
              errors.push('Output konsol belum memuat "' + needle + '".');
              hints.push(
                "Pastikan semua baris yang diminta instruksi dicetak.",
              );
            }
          });
        }
        if (out.logCount) {
          const n = (run.logs || []).length;
          const min = out.logCount.min;
          const max = out.logCount.max;
          if (
            (min === undefined || n >= min) &&
            (max === undefined || n <= max)
          ) {
            passed.push("Jumlah baris output sudah sesuai (" + n + " baris).");
          } else {
            errors.push(
              out.msg ||
                "Jumlah baris output belum sesuai: ada " +
                  n +
                  (min !== undefined ? ", minimal " + min : "") +
                  (max !== undefined ? ", maksimal " + max : "") +
                  ".",
            );
            hints.push(
              out.hint || "Tambahkan/kurangi console.log() sesuai instruksi.",
            );
          }
        }

        // ----- dom: [checkStr] — dievaluasi di dalam sandbox pasca-eksekusi -----
        (rules.dom || []).forEach((item, i) => {
          const ok = run.checkResults && run.checkResults[i] === true;
          const conf = typeof item === "string" ? {} : item;
          if (ok) {
            passed.push(conf.passed || "Pemeriksaan DOM terpenuhi.");
          } else {
            errors.push(
              conf.msg ||
                "Hasil akhir halaman belum sesuai yang diminta instruksi.",
            );
            if (conf.hint) hints.push(conf.hint);
          }
        });
      }
    }

    // dedupe errors & hints (pola sama seperti validateCode)
    const seen = new Set();
    const uniqErrors = errors.filter((e) => {
      if (seen.has(e)) return false;
      seen.add(e);
      return true;
    });
    const seenH = new Set();
    const uniqHints = hints.filter((h) => {
      if (seenH.has(h)) return false;
      seenH.add(h);
      return true;
    });

    return {
      success: uniqErrors.length === 0,
      errors: uniqErrors,
      passed: passed,
      hints: uniqHints.slice(0, 3),
    };
  }

  function tagName(el) {
    return el.tagName.toLowerCase();
  }

  function attrEmpty(el, attr) {
    return (
      !el.hasAttribute(attr) || String(el.getAttribute(attr)).trim() === ""
    );
  }

  var VOID_TAGS = [
    "area",
    "base",
    "br",
    "col",
    "embed",
    "hr",
    "img",
    "input",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr",
  ];

  /** Inspect the raw text (not the repaired DOM) for unclosed / mis-nested tags. */
  function findTagProblems(code, only) {
    var src = String(code || "")
      .replace(/<!--[\s\S]*?-->/g, "")
      .replace(/<!doctype[^>]*>/gi, "");
    var re = /<(\/?)([a-zA-Z][a-zA-Z0-9-]*)((?:"[^"]*"|'[^']*'|[^'">])*)>/g;
    var stack = [];
    var problems = [];
    var m;
    while ((m = re.exec(src))) {
      var closing = m[1] === "/";
      var name = m[2].toLowerCase();
      if (VOID_TAGS.indexOf(name) !== -1) continue;
      if (only && only.indexOf(name) === -1) continue;
      if (!closing && /\/\s*$/.test(m[3])) continue; // self-closing syntax
      if (!closing) {
        stack.push(name);
      } else if (stack.length && stack[stack.length - 1] === name) {
        stack.pop();
      } else if (stack.indexOf(name) !== -1) {
        var top = stack[stack.length - 1];
        problems.push(
          "Urutan penutupan salah: </" +
            name +
            "> muncul sebelum </" +
            top +
            "> ditutup. Tutup tag yang dibuka paling akhir terlebih dahulu.",
        );
        while (stack.length && stack[stack.length - 1] !== name) stack.pop();
        stack.pop();
      } else {
        problems.push(
          "Tag penutup </" + name + "> tidak punya tag pembuka <" + name + ">.",
        );
      }
    }
    stack.forEach(function (name) {
      problems.push(
        "Tag <" +
          name +
          "> belum ditutup dengan </" +
          name +
          ">. Ingat tanda / pada tag penutup.",
      );
    });
    return problems;
  }

  function fmtAttr(attr, val) {
    return attr + '="' + val + '"';
  }

  /**
   * Validate student HTML code against a rules object.
   * Returns { success, errors:[], passed:[], hints:[] }
   */
  function validateCode(code, rules) {
    rules = rules || {};
    const errors = [];
    const passed = [];
    const hints = [];
    const doc = parseHTML(code);
    const root = doc.body || doc.documentElement;

    // ---------- requiredTags ----------
    (rules.requiredTags || []).forEach((tag) => {
      if (doc.querySelector(tag)) {
        passed.push("Element <" + tag + "> sudah dibuat.");
      } else {
        errors.push(
          "Tag <" +
            tag +
            "> belum ditemukan. Tambahkan <" +
            tag +
            ">...</" +
            tag +
            "> ke kode kamu.",
        );
        hints.push(
          "Gunakan tag <" +
            tag +
            ">. Format dasarnya: <" +
            tag +
            ">...</" +
            tag +
            ">.",
        );
      }
    });

    // ---------- forbiddenTags ----------
    (rules.forbiddenTags || []).forEach((tag) => {
      if (doc.querySelector(tag)) {
        errors.push(
          "Challenge ini meminta tag yang benar — jangan gunakan <" +
            tag +
            ">.",
        );
        hints.push("Periksa kembali tag yang diminta oleh instruksi.");
      }
    });

    // ---------- minCounts ----------
    Object.keys(rules.minCounts || {}).forEach((tag) => {
      const min = rules.minCounts[tag];
      const count = doc.querySelectorAll(tag).length;
      if (count >= min) {
        passed.push("Jumlah <" + tag + "> sudah cukup (" + count + " buah).");
      } else {
        errors.push(
          "Kamu butuh minimal " +
            min +
            " <" +
            tag +
            ">, tetapi hanya ada " +
            count +
            ".",
        );
        hints.push(
          "Tambahkan lebih banyak element <" + tag + ">...</" + tag + ">.",
        );
      }
    });

    // ---------- requiredAttributes (every element must have) ----------
    Object.keys(rules.requiredAttributes || {}).forEach((tag) => {
      const attrs = rules.requiredAttributes[tag];
      const els = Array.from(doc.querySelectorAll(tag));
      if (els.length === 0) return; // missing tag already reported by requiredTags
      const offenders = els.filter((el) =>
        attrs.some((a) => !el.hasAttribute(a)),
      );
      if (offenders.length === 0) {
        passed.push(
          "Semua <" +
            tag +
            "> sudah memiliki attribute: " +
            attrs.map((a) => a).join(", ") +
            ".",
        );
      } else {
        const missing = attrs.filter((a) =>
          offenders.some((el) => !el.hasAttribute(a)),
        );
        errors.push(
          "<" +
            tag +
            "> sudah ada, tetapi " +
            offenders.length +
            " dari " +
            els.length +
            " belum memiliki attribute: " +
            missing.map((a) => a).join(", ") +
            ".",
        );
        hints.push(
          "Tulis attribute di dalam tag pembuka, contoh: <" +
            tag +
            " " +
            missing[0] +
            '="...">...</' +
            tag +
            ">.",
        );
      }
    });

    // ---------- nonEmptyAttributes (every element) ----------
    Object.keys(rules.nonEmptyAttributes || {}).forEach((tag) => {
      const attrs = rules.nonEmptyAttributes[tag];
      const els = Array.from(doc.querySelectorAll(tag));
      els.forEach((el) => {
        attrs.forEach((a) => {
          if (attrEmpty(el, a)) {
            const label = tagName(el);
            errors.push(
              label === tag
                ? "<" +
                    tag +
                    "> sudah ada, tetapi attribute " +
                    a +
                    " masih kosong atau belum diisi."
                : "Ada <" + label + "> yang attribute " + a + " masih kosong.",
            );
            hints.push(
              "Attribute " +
                a +
                " tidak boleh kosong. Contoh: <" +
                tag +
                " " +
                a +
                '="deskripsi singkat">.',
            );
          }
        });
      });
      if (
        els.length > 0 &&
        !els.some((el) => attrs.some((a) => attrEmpty(el, a)))
      ) {
        passed.push(
          "Attribute " + attrs.join(", ") + " pada <" + tag + "> sudah terisi.",
        );
      }
    });

    // ---------- attributes (at least one element with exact value) ----------
    Object.keys(rules.attributes || {}).forEach((tag) => {
      const attrMap = rules.attributes[tag];
      Object.keys(attrMap).forEach((attr) => {
        const expected = attrMap[attr];
        const els = Array.from(doc.querySelectorAll(tag));
        if (els.length === 0) return;
        let ok;
        if (expected === true) {
          ok = els.some((el) => el.hasAttribute(attr));
        } else if (Array.isArray(expected)) {
          ok = els.some((el) =>
            expected.includes(String(el.getAttribute(attr) || "").trim()),
          );
        } else {
          ok = els.some(
            (el) =>
              String(el.getAttribute(attr) || "").trim() ===
              String(expected).trim(),
          );
        }
        if (ok) {
          passed.push(
            expected === true
              ? "Ada <" + tag + "> dengan attribute " + attr + "."
              : "<" +
                  tag +
                  "> dengan " +
                  fmtAttr(attr, expected) +
                  " sudah benar.",
          );
        } else {
          errors.push(
            expected === true
              ? "Kamu sudah membuat <" +
                  tag +
                  ">, tetapi belum ada yang memiliki attribute " +
                  attr +
                  "."
              : "Kamu sudah membuat <" +
                  tag +
                  ">, tetapi tidak ada yang memiliki " +
                  fmtAttr(attr, expected) +
                  ".",
          );
          hints.push(
            "Periksa attribute " +
              attr +
              " pada <" +
              tag +
              ">. Contoh: <" +
              tag +
              " " +
              attr +
              '="' +
              (expected === true ? "..." : expected) +
              '">...</' +
              tag +
              ">.",
          );
        }
      });
    });

    // ---------- attributeContains (at least one) ----------
    Object.keys(rules.attributeContains || {}).forEach((tag) => {
      const attrMap = rules.attributeContains[tag];
      Object.keys(attrMap).forEach((attr) => {
        const needle = attrMap[attr];
        const els = Array.from(doc.querySelectorAll(tag));
        if (els.length === 0) return;
        const ok = els.some(
          (el) => String(el.getAttribute(attr) || "").indexOf(needle) !== -1,
        );
        if (ok) {
          passed.push(
            "<" +
              tag +
              "> dengan " +
              attr +
              ' berisi "' +
              needle +
              '" sudah ada.',
          );
        } else {
          errors.push(
            "Kamu sudah membuat <" +
              tag +
              ">, tetapi attribute " +
              attr +
              ' belum berisi "' +
              needle +
              '".',
          );
          hints.push(
            "Contoh: <" +
              tag +
              " " +
              attr +
              '="' +
              needle +
              '...">...</' +
              tag +
              ">.",
          );
        }
      });
    });

    // ---------- requiredText ----------
    if (rules.requiredText) {
      const text = (root.textContent || "").replace(/\s+/g, " ");
      if (text.indexOf(rules.requiredText) !== -1) {
        passed.push('Teks "' + rules.requiredText + '" sudah ada.');
      } else {
        errors.push(
          'Teks "' + rules.requiredText + '" belum ditemukan di halaman.',
        );
        hints.push(
          'Pastikan teks "' +
            rules.requiredText +
            '" ditulis di antara tag pembuka dan penutup.',
        );
      }
    }

    // ---------- textInside ----------
    Object.keys(rules.textInside || {}).forEach((tag) => {
      const text = rules.textInside[tag];
      const els = Array.from(doc.querySelectorAll(tag));
      if (els.length === 0) return;
      const ok = els.some((el) => (el.textContent || "").indexOf(text) !== -1);
      if (ok) {
        passed.push("Ada <" + tag + '> yang berisi teks "' + text + '".');
      } else {
        errors.push(
          "Kamu sudah membuat <" +
            tag +
            '>, tetapi tidak ada yang berisi teks "' +
            text +
            '".',
        );
        hints.push(
          "Tulis teksnya di antara tag: <" +
            tag +
            ">" +
            text +
            "</" +
            tag +
            ">.",
        );
      }
    });

    // ---------- selectors (DOM structure) ----------
    (rules.selectors || []).forEach((sel) => {
      if (doc.querySelector(sel)) {
        passed.push('Struktur "' + sel.replace(/,/g, ", ") + '" sudah benar.');
      } else {
        errors.push(
          'Struktur "' + sel.replace(/,/g, ", ") + '" belum ditemukan.',
        );
        hints.push(
          'Periksa susunan tag — "' +
            sel +
            '" harus benar-benar bersarang (nested), bukan berdiri sendiri.',
        );
      }
    });

    // ---------- requiredChildren (direct parent-child) ----------
    Object.keys(rules.requiredChildren || {}).forEach((parent) => {
      const children = rules.requiredChildren[parent];
      const parents = Array.from(doc.querySelectorAll(parent));
      if (parents.length === 0) return;
      const ok = parents.some((p) =>
        children.every((c) =>
          Array.from(p.children).some((ch) => tagName(ch) === c),
        ),
      );
      if (ok) {
        passed.push(
          "<" +
            parent +
            "> sudah berisi " +
            children.map((c) => "<" + c + ">").join(" dan ") +
            " di dalamnya.",
        );
      } else {
        errors.push(
          "<" +
            parent +
            "> sudah ada, tetapi " +
            children.map((c) => "<" + c + ">").join(" dan ") +
            " harus berada DI DALAM <" +
            parent +
            "> (bukan di luar).",
        );
        hints.push(
          "Letakkan " +
            children.map((c) => "<" + c + ">...</" + c + ">").join(" dan ") +
            " di antara <" +
            parent +
            "> dan </" +
            parent +
            ">.",
        );
      }
    });

    // ---------- labelFor (label ↔ input relationship) ----------
    (rules.labelFor || []).forEach((id) => {
      const label = doc.querySelector('label[for="' + id + '"]');
      const input = doc.querySelector("#" + id);
      if (label && input) {
        passed.push(
          'Label for="' +
            id +
            '" sudah terhubung dengan element id="' +
            id +
            '".',
        );
      } else if (label && !input) {
        errors.push(
          'Label for="' +
            id +
            '" sudah ada, tetapi tidak ada element dengan id="' +
            id +
            '".',
        );
        hints.push('Tambahkan id="' + id + '" pada input yang dilabeli.');
      } else if (!label && input) {
        errors.push(
          'Element dengan id="' +
            id +
            '" sudah ada, tetapi label for="' +
            id +
            '" belum ada.',
        );
        hints.push(
          'Tambahkan <label for="' +
            id +
            '">...</label> dan hubungkan dengan id input.',
        );
      } else {
        errors.push(
          'Label dan element dengan id="' + id + '" belum ditemukan.',
        );
        hints.push(
          'Buat <label for="' +
            id +
            '">...</label> dan <input id="' +
            id +
            '">.',
        );
      }
    });

    // ---------- nonEmptyText (every element of tag must contain text) ----------
    Object.keys(rules.nonEmptyText || {}).forEach((tag) => {
      const els = Array.from(doc.querySelectorAll(tag));
      els.forEach((el) => {
        if (!(el.textContent || "").trim()) {
          errors.push(
            "<" +
              tag +
              "> sudah ada, tetapi masih kosong — isi dengan teks di antara tag pembuka dan penutup.",
          );
          hints.push("Contoh: <" + tag + ">teks kamu</" + tag + ">.");
        }
      });
      if (els.length > 0 && els.every((el) => (el.textContent || "").trim())) {
        passed.push("Semua <" + tag + "> sudah memiliki isi teks.");
      }
    });

    // ---------- requiredValues (different values of same attribute across elements) ----------
    // e.g. { input: { type: ["text", "email", "password"] } } → each listed type must exist at least once
    Object.keys(rules.requiredValues || {}).forEach((tag) => {
      const attrMap = rules.requiredValues[tag];
      Object.keys(attrMap).forEach((attr) => {
        const values = attrMap[attr];
        const els = Array.from(doc.querySelectorAll(tag));
        if (els.length === 0) return;
        values.forEach((val) => {
          const ok = els.some(
            (el) =>
              String(el.getAttribute(attr) || "").trim() === String(val).trim(),
          );
          if (ok) {
            passed.push(
              "<" + tag + "> dengan " + fmtAttr(attr, val) + " sudah ada.",
            );
          } else {
            errors.push(
              "Kamu butuh <" +
                tag +
                "> dengan " +
                fmtAttr(attr, val) +
                ", tetapi tidak ditemukan.",
            );
            hints.push(
              "Periksa attribute " + attr + ' — butuh nilai "' + val + '".',
            );
          }
        });
      });
    });

    // ---------- linkedLabels (auto-discover: every label[for] must have matching id) ----------
    if (rules.linkedLabels) {
      const labels = Array.from(doc.querySelectorAll("label[for]"));
      if (labels.length === 0) {
        errors.push("Belum ada <label> yang terhubung dengan input.");
        hints.push(
          'Gunakan <label for="nama-field"> dan id="nama-field" pada inputnya.',
        );
      } else {
        labels.forEach((lb) => {
          const id = lb.getAttribute("for");
          if (!doc.querySelector("#" + id)) {
            errors.push(
              'Label for="' +
                id +
                '" tidak terhubung — tidak ada element dengan id="' +
                id +
                '".',
            );
          }
        });
        if (!errors.some((e) => e.indexOf("tidak terhubung") !== -1)) {
          passed.push(
            "Semua label sudah terhubung dengan input masing-masing.",
          );
        }
      }
    }

    // ---------- wellFormed (raw source: closed + properly nested tags) ----------
    if (rules.wellFormed) {
      var only = Array.isArray(rules.wellFormed)
        ? rules.wellFormed.map(function (t) {
            return String(t).toLowerCase();
          })
        : null;
      var problems = findTagProblems(code, only);
      if (problems.length === 0) {
        passed.push("Semua tag sudah ditutup dengan benar.");
      } else {
        problems.forEach(function (msg) {
          errors.push(msg);
        });
        hints.push(
          "Setiap tag pembuka <x> butuh tag penutup </x> (perhatikan tanda /).",
        );
      }
    }

    // ---------- rawMatch (raw source must match a pattern) ----------
    (rules.rawMatch || []).forEach(function (rule) {
      var re;
      try {
        re = new RegExp(rule.pattern, rule.flags || "");
      } catch (e) {
        return;
      }
      if (re.test(String(code || ""))) {
        passed.push(rule.passed || "Penulisan kode sudah sesuai.");
      } else {
        errors.push(rule.message || "Penulisan kode belum sesuai.");
        if (rule.hint) hints.push(rule.hint);
      }
    });

    // ---------- css (Jalur CSS: nilai akhir sebuah properti) ----------
    if (
      (rules.css && rules.css.length) ||
      (rules.cssMedia && rules.cssMedia.length)
    ) {
      var CC = getCSSCheck();
      var cssApi = CC ? CC.create(doc) : null;
      if (!cssApi) {
        errors.push("Pemeriksa CSS tidak tersedia.");
      } else {
        (rules.css || []).forEach(function (item) {
          var label = item.sel + " { " + item.prop + " }";
          var ok;
          var els;
          try {
            els = doc.querySelectorAll(item.sel);
          } catch (e) {
            els = [];
          }
          // literal: selector seperti ".tombol:hover" tidak cocok dengan element manapun saat tidak
          // di-hover, jadi cukup periksa teks aturannya (element-nya dicek lewat rule `selectors`).
          if (els.length === 0 && !item.literal) {
            errors.push(
              item.missingMsg ||
                item.msg ||
                'Element "' + item.sel + '" tidak ditemukan di HTML kamu.',
            );
            if (item.hint) hints.push(item.hint);
            return;
          }
          if (item.literal) {
            ok = cssApi.has(item.sel, item.prop, item.value);
          } else if (item.min !== undefined || item.max !== undefined) {
            var n = cssApi.num(item.sel, item.prop);
            ok =
              n !== null &&
              (item.min === undefined || n >= item.min) &&
              (item.max === undefined || n <= item.max);
          } else if (item.all) {
            ok = cssApi.all(item.sel, item.prop, item.value);
          } else {
            ok = cssApi.is(item.sel, item.prop, item.value);
          }
          if (item.not) ok = !ok; // not:true → nilai/properti ini justru TIDAK boleh cocok
          if (ok) {
            passed.push(item.ok || "CSS " + label + " sudah benar.");
          } else {
            errors.push(
              item.msg ||
                (item.value !== undefined
                  ? 'Properti "' +
                    item.prop +
                    '" pada "' +
                    item.sel +
                    '" belum bernilai seperti yang diminta.'
                  : 'Properti "' +
                    item.prop +
                    '" pada "' +
                    item.sel +
                    '" belum diatur.'),
            );
            if (item.hint) hints.push(item.hint);
          }
        });
        (rules.cssMedia || []).forEach(function (item) {
          // pattern: kondisi @media yang dicari; prop/value (opsional): deklarasi yang harus ada di dalam @media
          var ok =
            cssApi.hasMedia(item.pattern || /./) &&
            (!item.prop || cssApi.mediaHas(item.prop, item.value));
          if (ok) {
            passed.push(item.ok || "Media query sudah ditulis.");
          } else {
            errors.push(
              item.msg || "Media query (@media) belum ditulis dengan benar.",
            );
            if (item.hint) hints.push(item.hint);
          }
        });
      }
    }

    // dedupe errors (same message can fire multiple times)
    const seen = new Set();
    const uniqErrors = errors.filter((e) => {
      if (seen.has(e)) return false;
      seen.add(e);
      return true;
    });

    const seenH = new Set();
    const uniqHints = hints.filter((h) => {
      if (seenH.has(h)) return false;
      seenH.add(h);
      return true;
    });

    return {
      success: uniqErrors.length === 0,
      errors: uniqErrors,
      passed: passed,
      hints: uniqHints.slice(0, 3),
    };
  }

  // Export for browser and Node (testing)
  const api = { validateCode, parseHTML, validateCodeJSAsync, getJSCheck };
  if (typeof window !== "undefined") {
    window.Validator = api;
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
})();
