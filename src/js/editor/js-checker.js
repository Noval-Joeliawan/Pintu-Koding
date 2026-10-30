// src/js/editor/js-checker.js — Pemeriksa kode JavaScript untuk validasi latihan (Jalur JS)
//
// Padanan src/js/editor/css-checker.js. Validator HTML/CSS membaca struktur DOM; untuk
// JavaScript kita perlu menjawab pertanyaan seperti: "apakah variabel sisa dideklarasikan
// dengan let?", "apakah fungsi sapa dipanggil?", "apakah perulangan for dipakai?". Berkas
// ini melakukan ANALISIS STATIS (tanpa menjalankan kode) lewat rule deklaratif:
//
//   JSCheck.checkStatic(code, rules) → { errors: [], passed: [], hints: [] }
//
// Rule yang didukung (semua punya msg/hint opsional berbahasa Indonesia):
//   { syntaxOk: true }                 kode bisa dikompilasi (new Function) tanpa SyntaxError
//   { contains: 'x' | /re/ }           kode (tanpa komentar) memuat substring / pola
//   { notContains: 'x' | /re/ }        kode TIDAK boleh memuat pola
//   { consoleLog: 'Halo' }             ada console.log dengan literal yang hasilnya persis 'Halo'
//   { consoleLogContains: 'Halo' }     ada console.log literal yang memuat 'Halo'
//   { declares: 'sisa', decl: ['let'] } variabel dideklarasikan dengan let/const/var
//   { func: 'sapa', params: {min,max} } fungsi didefinisikan (function atau panah) + jumlah parameter
//   { calls: 'sapa', withArgs: [5] }   fungsi dipanggil (opsional: dengan argumen literal tertentu)
//   { uses: 'for' | ['for','%'] }      detector sintaks bernama (lihat USES di bawah)
//
// Eksekusi nyata (output konsol & DOM pasca-jalan) ditangani lewat Validator.validateCodeJSAsync
// + Sandbox.runForValidation — bukan di sini, supaya modul ini tetap murni & sinkron.
(function () {
  "use strict";

  // ---------------------------------------------------------------- scanner

  /** Hapus komentar satu baris (garis miring ganda) dan komentar blok dari kode JS tanpa merusak string. */
  function stripComments(code) {
    var src = String(code == null ? "" : code);
    var out = "";
    var i = 0;
    var n = src.length;
    var mode = "code"; // code | sq | dq | tpl | line | block
    var tplDepth = 0;
    while (i < n) {
      var c = src[i];
      var next = i + 1 < n ? src[i + 1] : "";
      if (mode === "line") {
        if (c === "\n") {
          mode = "code";
          out += c;
        }
        i++;
        continue;
      }
      if (mode === "block") {
        if (c === "*" && next === "/") {
          mode = "code";
          out += "  ";
          i += 2;
          continue;
        }
        out += c === "\n" ? "\n" : " ";
        i++;
        continue;
      }
      if (mode === "code") {
        if (c === "/" && next === "/") {
          mode = "line";
          i += 2;
          continue;
        }
        if (c === "/" && next === "*") {
          mode = "block";
          i += 2;
          continue;
        }
        if (c === "'") {
          mode = "sq";
          out += c;
          i++;
          continue;
        }
        if (c === '"') {
          mode = "dq";
          out += c;
          i++;
          continue;
        }
        if (c === "`") {
          mode = "tpl";
          out += c;
          i++;
          continue;
        }
        out += c;
        i++;
        continue;
      }
      // di dalam string
      if (c === "\\") {
        out += c + next;
        i += 2;
        continue;
      }
      if (mode === "sq" && c === "'") {
        mode = "code";
      } else if (mode === "dq" && c === '"') {
        mode = "code";
      } else if (mode === "tpl" && c === "`") {
        mode = "code";
      }
      out += c;
      i++;
    }
    return out;
  }

  /** true bila kode bisa dikompilasi (mendeteksi kurung/kutip yang tidak berpasangan). */
  function syntaxOk(code) {
    try {
      // eslint-disable-next-line no-new-func
      new Function(String(code == null ? "" : code));
      return true;
    } catch (e) {
      return false;
    }
  }

  /** Ambil teks argumen dari setiap pemanggilan `callee(` (balanced paren). */
  function extractCallArgs(code, callee) {
    var re = new RegExp(
      "(^|[^\\w$.])" +
        callee.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") +
        "\\s*\\(",
      "g",
    );
    var out = [];
    var m;
    while ((m = re.exec(code))) {
      var open = m.index + m[0].length - 1;
      var depth = 0;
      var quote = null;
      var end = -1;
      for (var i = open; i < code.length; i++) {
        var c = code[i];
        if (quote) {
          if (c === "\\") {
            i++;
            continue;
          }
          if (c === quote) quote = null;
          continue;
        }
        if (c === '"' || c === "'" || c === "`") {
          quote = c;
          continue;
        }
        if (c === "(") depth++;
        else if (c === ")") {
          depth--;
          if (depth === 0) {
            end = i;
            break;
          }
        }
      }
      if (end === -1) continue;
      var args = code.slice(open + 1, end);
      // Abaikan definisi fungsi: `function nama(`
      var before = code.slice(Math.max(0, m.index - 20), m.index + 1);
      if (/\bfunction\s*$/.test(before)) {
        re.lastIndex = end + 1;
        continue;
      }
      out.push(args);
      re.lastIndex = end + 1;
    }
    return out;
  }

  /** Pisahkan argumen tingkat atas (abaikan koma di dalam kurung/string). */
  function splitArgs(text) {
    var parts = [];
    var depth = 0;
    var quote = null;
    var cur = "";
    for (var i = 0; i < text.length; i++) {
      var c = text[i];
      if (quote) {
        cur += c;
        if (c === "\\") {
          cur += text[i + 1] || "";
          i++;
          continue;
        }
        if (c === quote) quote = null;
        continue;
      }
      if (c === '"' || c === "'" || c === "`") {
        quote = c;
        cur += c;
        continue;
      }
      if (c === "(" || c === "[" || c === "{") depth++;
      if (c === ")" || c === "]" || c === "}") depth = Math.max(0, depth - 1);
      if (c === "," && depth === 0) {
        parts.push(cur);
        cur = "";
        continue;
      }
      cur += c;
    }
    parts.push(cur);
    return parts
      .map(function (p) {
        return p.trim();
      })
      .filter(function (p) {
        return p.length > 0;
      });
  }

  function unescapeString(s) {
    return s
      .replace(/\\n/g, "\n")
      .replace(/\\t/g, "\t")
      .replace(/\\r/g, "\r")
      .replace(/\\'/g, "'")
      .replace(/\\"/g, '"')
      .replace(/\\`/g, "`")
      .replace(/\\\\/g, "\\");
  }

  /** Evaluasi argumen literal sederhana (string, angka, boolean, null/undefined, gabungan +). Null bila bukan literal. */
  function evalLiteral(expr) {
    var s = String(expr || "").trim();
    if (!s) return null;
    if (/^(?:true|false|null|undefined)$/.test(s))
      return s === "null" ? "null" : s === "undefined" ? "undefined" : s;

    // gabungan literal dengan + (periksa lebih dulu: "a" + " " + "b" juga diawali kutip)
    var plusParts = splitTopPlus(s);
    if (plusParts.length > 1) {
      var acc = "";
      for (var j = 0; j < plusParts.length; j++) {
        var part = evalLiteral(plusParts[j]);
        if (part === null) return null;
        acc += part;
      }
      return acc;
    }

    if (/^['"]/.test(s)) {
      var q = s[0];
      var end = -1;
      for (var i = 1; i < s.length; i++) {
        if (s[i] === "\\") {
          i++;
          continue;
        }
        if (s[i] === q) {
          end = i;
          break;
        }
      }
      if (end === s.length - 1) return unescapeString(s.slice(1, end));
      return null;
    }
    if (/^`[^`]*$/.test(s)) {
      var inner = s.slice(1, s.length - 1);
      if (/\$\{/.test(inner)) return null; // template dengan ekspresi: tidak bisa dipastikan statis
      return unescapeString(inner);
    }
    if (/^\d+(?:\.\d+)?$/.test(s)) return String(Number(s));
    return null;
  }

  function splitTopPlus(s) {
    var parts = [];
    var depth = 0;
    var quote = null;
    var cur = "";
    for (var i = 0; i < s.length; i++) {
      var c = s[i];
      if (quote) {
        cur += c;
        if (c === "\\") {
          cur += s[i + 1] || "";
          i++;
          continue;
        }
        if (c === quote) quote = null;
        continue;
      }
      if (c === '"' || c === "'" || c === "`") {
        quote = c;
        cur += c;
        continue;
      }
      if (c === "(" || c === "[") depth++;
      if (c === ")" || c === "]") depth = Math.max(0, depth - 1);
      if (c === "+" && depth === 0) {
        parts.push(cur);
        cur = "";
        continue;
      }
      cur += c;
    }
    parts.push(cur);
    return parts;
  }

  /** Kumpulkan teks hasil setiap console.log literal dalam kode. */
  function parseConsoleLogs(code) {
    var src = stripComments(code);
    return extractCallArgs(src, "console.log")
      .map(function (argsText) {
        var parts = splitArgs(argsText);
        var values = [];
        for (var i = 0; i < parts.length; i++) {
          var v = evalLiteral(parts[i]);
          if (v === null) return null; // ada argumen non-literal → tidak bisa dipastikan
          values.push(v);
        }
        return values.join(" ");
      })
      .filter(function (v) {
        return v !== null;
      });
  }

  // ---------------------------------------------------------------- detectors

  /** Detektor sintaks bernama untuk rule `uses`. RegExp atau fungsi(code). */
  var USES = {
    for: /\bfor\s*\(/,
    while: /\bwhile\s*\(/,
    if: /\bif\s*\(/,
    else: /\belse\b/,
    "else-if": /\belse\s+if\s*\(/,
    switch: /\bswitch\s*\(/,
    case: /\bcase\s+[^:]+:/,
    break: /\bbreak\s*;/,
    default: /\bdefault\s*:/,
    "template-literal": /`/,
    modulo: /%/,
    "===": /===/,
    "!==": /!==/,
    ">=": />=/,
    "<=": /<=/,
    "&&": /&&/,
    "||": /\|\|/,
    // '!' tunggal: buang dulu !== dan != supaya tidak salah hitung
    not: function (code) {
      return /!/.test(String(code).replace(/!==/g, "").replace(/!=/g, ""));
    },
    return: /\breturn\b/,
    push: /\.push\s*\(/,
    length: /\.length\b/,
    "array-literal": /=\s*\[/,
    "index-access": function (code) {
      var src = String(code).replace(/=\s*\[[^\]]*\]/g, "");
      return /\w\s*\[/.test(src);
    },
    getElementById: /\.getElementById\s*\(/,
    querySelector: /\.querySelector\s*\(/,
    textContent: /\.textContent\b/,
    innerHTML: /\.innerHTML\b/,
    value: /\.value\b/,
    style: /\.style\s*\./,
    addEventListener: /\.addEventListener\s*\(/,
    "addEventListener-click": /\.addEventListener\s*\(\s*(['"])click\1/,
    function: /\bfunction\b/,
    arrow: /=>/,
    typeof: /\btypeof\b/,
    "console-log": /console\s*\.\s*log\s*\(/,
    "for-nested": function (code) {
      var m = String(code).match(/\bfor\s*\(/g);
      return !!m && m.length >= 2;
    },
  };

  // ---------------------------------------------------------------- helpers

  function countParams(paramsText) {
    var t = String(paramsText || "").trim();
    if (!t) return 0;
    return splitArgs(t).length;
  }

  /** Cari definisi fungsi `name` (function declaration atau panah). return {found, params} */
  function findFunction(code, name) {
    var esc = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    var reDecl = new RegExp("\\bfunction\\s+" + esc + "\\s*\\(([^)]*)\\)");
    var m = reDecl.exec(code);
    if (m) return { found: true, params: countParams(m[1]) };
    var reArrowParen = new RegExp(
      "\\b(?:let|const|var)\\s+" + esc + "\\s*=\\s*\\(([^)]*)\\)\\s*=>",
    );
    m = reArrowParen.exec(code);
    if (m) return { found: true, params: countParams(m[1]) };
    var reArrowSingle = new RegExp(
      "\\b(?:let|const|var)\\s+" + esc + "\\s*=\\s*([A-Za-z_$][\\w$]*)\\s*=>",
    );
    m = reArrowSingle.exec(code);
    if (m) return { found: true, params: 1 };
    var reFnExpr = new RegExp(
      "\\b(?:let|const|var)\\s+" + esc + "\\s*=\\s*function\\s*\\(([^)]*)\\)",
    );
    m = reFnExpr.exec(code);
    if (m) return { found: true, params: countParams(m[1]) };
    return { found: false, params: 0 };
  }

  /** Ada pemanggilan `name(` (bukan definisi) — opsional dengan argumen literal tertentu? */
  function findCall(code, name, withArgs) {
    var argsList = extractCallArgs(code, name);
    if (argsList.length === 0) return false;
    if (!withArgs) return true;
    for (var i = 0; i < argsList.length; i++) {
      var parts = splitArgs(argsList[i]);
      if (parts.length !== withArgs.length) continue;
      var allMatch = true;
      for (var j = 0; j < parts.length; j++) {
        if (evalLiteral(parts[j]) !== String(withArgs[j])) {
          allMatch = false;
          break;
        }
      }
      if (allMatch) return true;
    }
    return false;
  }

  function testContains(code, needle) {
    if (needle instanceof RegExp) return needle.test(code);
    return String(code).indexOf(String(needle)) !== -1;
  }

  // ---------------------------------------------------------------- checker

  /**
   * Jalankan rule statis terhadap kode murid.
   * @returns {{errors: string[], passed: string[], hints: string[]}}
   */
  function checkStatic(code, rules) {
    var errors = [];
    var passed = [];
    var hints = [];
    var src = String(code == null ? "" : code);
    var clean = stripComments(src);

    (rules || []).forEach(function (rule, idx) {
      if (!rule) return;

      // ---- syntaxOk
      if (rule.syntaxOk) {
        if (syntaxOk(src)) {
          passed.push("Sintaks kode sudah benar.");
        } else {
          var why = "";
          try {
            new Function(src);
          } catch (e) {
            why = e && e.message ? " (detail: " + e.message + ")" : "";
          }
          errors.push(
            rule.msg ||
              "Kode belum bisa dibaca browser — ada kesalahan penulisan" +
                why +
                ".",
          );
          hints.push(
            rule.hint ||
              "Periksa tanda kutip, kurung ( ), dan kurung kurawal { } agar berpasangan. Jangan lupa titik koma di akhir perintah.",
          );
        }
        return;
      }

      // ---- contains / notContains / rawContains
      if (rule.contains !== undefined) {
        if (testContains(clean, rule.contains)) {
          passed.push("Kode sudah memuat pola yang diminta.");
        } else {
          errors.push(
            rule.msg || "Pola kode yang diminta instruksi belum ditemukan.",
          );
          if (rule.hint) hints.push(rule.hint);
        }
        return;
      }
      if (rule.rawContains !== undefined) {
        // Dicari pada kode ASLI (termasuk komentar) — dipakai mis. untuk memastikan murid menulis komentar.
        if (testContains(src, rule.rawContains)) {
          passed.push("Kode sudah memuat pola yang diminta.");
        } else {
          errors.push(
            rule.msg || "Pola kode yang diminta instruksi belum ditemukan.",
          );
          if (rule.hint) hints.push(rule.hint);
        }
        return;
      }
      if (rule.notContains !== undefined) {
        if (!testContains(clean, rule.notContains)) {
          passed.push("Kode bebas dari pola yang dilarang.");
        } else {
          errors.push(rule.msg || "Ada bagian kode yang seharusnya tidak ada.");
          if (rule.hint) hints.push(rule.hint);
        }
        return;
      }

      // ---- consoleLog / consoleLogContains
      if (rule.consoleLog !== undefined) {
        var logs = parseConsoleLogs(src);
        var exact = logs.some(function (t) {
          return t === rule.consoleLog;
        });
        if (exact) {
          passed.push("console.log() sudah menampilkan output yang benar.");
        } else {
          errors.push(
            rule.msg ||
              'Belum ada console.log() yang menampilkan persis "' +
                rule.consoleLog +
                '".',
          );
          hints.push(
            rule.hint ||
              "Periksa tulisan di dalam tanda kutip — harus persis sama (huruf besar/kecil dihitung).",
          );
        }
        return;
      }
      if (rule.consoleLogContains !== undefined) {
        var logs2 = parseConsoleLogs(src);
        var has = logs2.some(function (t) {
          return t.indexOf(rule.consoleLogContains) !== -1;
        });
        if (has) {
          passed.push("console.log() sudah menampilkan tulisan yang diminta.");
        } else {
          errors.push(
            rule.msg ||
              'Belum ada console.log() yang menampilkan "' +
                rule.consoleLogContains +
                '".',
          );
          hints.push(rule.hint || "Cek kembali isi string pada console.log().");
        }
        return;
      }

      // ---- declares
      if (rule.declares) {
        var decls =
          rule.decl && rule.decl.length ? rule.decl : ["let", "const", "var"];
        var reDecl = new RegExp(
          "\\b(?:" +
            decls.join("|") +
            ")\\s+" +
            String(rule.declares).replace(/[.*+?^${}()|[\]\\]/g, "\\$&") +
            "\\b",
        );
        if (reDecl.test(clean)) {
          passed.push('Variabel "' + rule.declares + '" sudah dibuat.');
        } else {
          errors.push(
            rule.msg ||
              'Variabel "' + rule.declares + '" belum dideklarasikan.',
          );
          hints.push(
            rule.hint ||
              "Buat variabelnya dulu, contoh: " +
                (decls[0] === "const" ? "const" : "let") +
                " " +
                rule.declares +
                " = ...;",
          );
        }
        return;
      }

      // ---- func
      if (rule.func) {
        var fn = findFunction(clean, rule.func);
        var okFn = fn.found;
        if (okFn && rule.params) {
          if (rule.params.min !== undefined && fn.params < rule.params.min)
            okFn = false;
          if (rule.params.max !== undefined && fn.params > rule.params.max)
            okFn = false;
        }
        if (okFn) {
          passed.push('Fungsi "' + rule.func + '" sudah didefinisikan.');
        } else {
          errors.push(
            rule.msg ||
              'Fungsi "' + rule.func + '" belum didefinisikan dengan benar.',
          );
          hints.push(
            rule.hint ||
              "Tulis fungsinya: function " +
                rule.func +
                "(" +
                (rule.params && rule.params.min ? "a, b" : "") +
                ") { ... }",
          );
        }
        return;
      }

      // ---- calls
      if (rule.calls) {
        if (findCall(clean, rule.calls, rule.withArgs)) {
          passed.push('Fungsi "' + rule.calls + '" sudah dipanggil.');
        } else {
          errors.push(
            rule.msg || 'Fungsi "' + rule.calls + '" belum dipanggil.',
          );
          hints.push(
            rule.hint ||
              "Panggil fungsinya di bawah definisi: " + rule.calls + "();",
          );
        }
        return;
      }

      // ---- uses
      if (rule.uses) {
        var names = Array.isArray(rule.uses) ? rule.uses : [rule.uses];
        for (var i = 0; i < names.length; i++) {
          var det = USES[names[i]];
          if (!det) continue; // detektor tak dikenal: abaikan, jangan menghukum murid
          var ok = typeof det === "function" ? det(clean) : det.test(clean);
          if (!ok) {
            errors.push(
              rule.msg || "Kode belum menggunakan: " + names[i] + ".",
            );
            if (rule.hint) hints.push(rule.hint);
            return;
          }
        }
        passed.push(
          "Sintaks yang diminta (" + names.join(", ") + ") sudah dipakai.",
        );
        return;
      }
    });

    return { errors: errors, passed: passed, hints: hints };
  }

  var JSCheck = {
    stripComments: stripComments,
    syntaxOk: syntaxOk,
    parseConsoleLogs: parseConsoleLogs,
    checkStatic: checkStatic,
  };

  if (typeof window !== "undefined") {
    window.JSCheck = JSCheck;
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = JSCheck;
  }
})();
