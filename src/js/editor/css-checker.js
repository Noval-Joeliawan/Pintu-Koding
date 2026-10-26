// src/js/editor/css-checker.js — CSS inspection helpers for lesson validation (Jalur CSS)
//
// Validator HTML hanya melihat struktur DOM. Untuk pelajaran CSS kita perlu tahu:
// "apakah <h1> akhirnya berwarna biru?" — apa pun cara muridnya menulis (selector tag, class,
// id, atau inline style). Berkas ini mem-parsing CSS murid, lalu menghitung nilai akhir sebuah
// properti dengan aturan cascade sederhana: !important → specificity → urutan penulisan, plus
// inheritance untuk properti yang diwariskan (color, font-*, text-align, dst).
//
// Tidak butuh layout engine, jadi bisa jalan di DOMParser (browser) maupun jsdom (Node/test).
//
// Usage:
//   const css = CSSCheck.create(doc);        // doc = hasil DOMParser dari kode murid
//   css.value('h1', 'color')                 // "blue" | null
//   css.is('h1', 'color', 'blue')            // true/false (warna dibandingkan secara semantik)
//   css.has('h1', 'color')                   // ada aturan "h1 { color: ... }" ditulis literal?
//   css.hasAny('display', 'flex')            // ada deklarasi display:flex di mana saja?
//   css.num('.kotak', 'padding-top')         // 16  (angka pertama dari nilainya) | null
//   css.hasMedia(/max-width/)                // ada @media dengan kondisi tsb?

(function () {
  "use strict";

  // ---------------------------------------------------------------- constants

  var INHERITED = {
    color: 1, "font-family": 1, "font-size": 1, "font-weight": 1, "font-style": 1,
    "line-height": 1, "text-align": 1, "letter-spacing": 1, "text-transform": 1,
    "list-style": 1, "list-style-type": 1, cursor: 1, visibility: 1, "white-space": 1,
    "word-spacing": 1, "text-indent": 1
  };

  // Aturan yang bergantung pada keadaan (hover, fokus, pseudo-element) tidak ikut "nilai dasar".
  var DYNAMIC = /:(hover|focus|focus-within|focus-visible|active|visited|target)\b|::?(before|after|first-line|first-letter|placeholder|selection|marker|backdrop)\b/i;

  var NAMED_COLORS = {
    black: "#000000", white: "#ffffff", red: "#ff0000", green: "#008000", blue: "#0000ff",
    yellow: "#ffff00", orange: "#ffa500", purple: "#800080", pink: "#ffc0cb", gray: "#808080",
    grey: "#808080", brown: "#a52a2a", cyan: "#00ffff", magenta: "#ff00ff", lime: "#00ff00",
    navy: "#000080", teal: "#008080", maroon: "#800000", olive: "#808000", silver: "#c0c0c0",
    aqua: "#00ffff", fuchsia: "#ff00ff", gold: "#ffd700", coral: "#ff7f50", tomato: "#ff6347",
    crimson: "#dc143c", salmon: "#fa8072", indigo: "#4b0082", violet: "#ee82ee", skyblue: "#87ceeb",
    lightblue: "#add8e6", lightgray: "#d3d3d3", lightgrey: "#d3d3d3", darkgray: "#a9a9a9",
    darkgrey: "#a9a9a9", darkblue: "#00008b", darkgreen: "#006400", darkred: "#8b0000",
    steelblue: "#4682b4", royalblue: "#4169e1", orangered: "#ff4500", hotpink: "#ff69b4",
    transparent: "rgba(0,0,0,0)"
  };

  // ------------------------------------------------------------------ parsing

  function stripComments(text) {
    return String(text == null ? "" : text).replace(/\/\*[\s\S]*?\*\//g, "");
  }

  /** Cari indeks karakter `ch` pertama pada depth 0 (abaikan string & tanda kurung). -1 jika tidak ada. */
  function indexOfTop(text, chars, from) {
    var depth = 0, quote = null;
    for (var i = from || 0; i < text.length; i++) {
      var c = text[i];
      if (quote) {
        if (c === "\\") i++;
        else if (c === quote) quote = null;
        continue;
      }
      if (c === '"' || c === "'") { quote = c; continue; }
      if (c === "(") depth++;
      else if (c === ")") depth = Math.max(0, depth - 1);
      else if (depth === 0 && chars.indexOf(c) !== -1) return i;
    }
    return -1;
  }

  /** Cari kurung kurawal penutup yang cocok untuk "{" di indeks `open`. */
  function matchBrace(text, open) {
    var depth = 0, quote = null;
    for (var i = open; i < text.length; i++) {
      var c = text[i];
      if (quote) {
        if (c === "\\") i++;
        else if (c === quote) quote = null;
        continue;
      }
      if (c === '"' || c === "'") { quote = c; continue; }
      if (c === "{") depth++;
      else if (c === "}") {
        depth--;
        if (depth === 0) return i;
      }
    }
    return text.length; // blok tidak ditutup: anggap sampai akhir (murid masih mengetik)
  }

  function splitTop(text, sep) {
    var parts = [], start = 0, idx;
    while ((idx = indexOfTop(text, sep, start)) !== -1) {
      parts.push(text.slice(start, idx));
      start = idx + 1;
    }
    parts.push(text.slice(start));
    return parts;
  }

  function splitSpaces(value) {
    var out = [], depth = 0, cur = "";
    for (var i = 0; i < value.length; i++) {
      var c = value[i];
      if (c === "(") depth++;
      if (c === ")") depth = Math.max(0, depth - 1);
      if (/\s/.test(c) && depth === 0) {
        if (cur) out.push(cur);
        cur = "";
      } else {
        cur += c;
      }
    }
    if (cur) out.push(cur);
    return out;
  }

  var counter = 0;

  function parseDeclarations(body) {
    // buang blok bersarang (CSS nesting) — tidak diajarkan di jalur dasar
    var clean = body, guard = 0;
    while (clean.indexOf("{") !== -1 && guard++ < 50) {
      var o = clean.indexOf("{");
      var e = matchBrace(clean, o);
      var semi = clean.lastIndexOf(";", o);
      clean = clean.slice(0, semi + 1) + clean.slice(e + 1);
    }
    var decls = [];
    splitTop(clean, ";").forEach(function (chunk) {
      var colon = chunk.indexOf(":");
      if (colon === -1) return;
      var prop = chunk.slice(0, colon).trim().toLowerCase();
      var value = chunk.slice(colon + 1).trim();
      if (!prop || !value || /\s/.test(prop)) return;
      var important = /!\s*important\s*$/i.test(value);
      if (important) value = value.replace(/!\s*important\s*$/i, "").trim();
      pushExpanded(decls, prop, value, important);
    });
    return decls;
  }

  function isColorToken(tok) {
    return toRGBA(tok) !== null;
  }

  function pushExpanded(list, prop, value, important) {
    function add(p, v) { list.push({ prop: p, value: v, important: important, order: ++counter }); }
    add(prop, value);
    var tokens = splitSpaces(value);

    if (prop === "margin" || prop === "padding") {
      if (tokens.length >= 1 && tokens.length <= 4) {
        var t = tokens[0], r = tokens[1] || t, b = tokens[2] || t, l = tokens[3] || r;
        add(prop + "-top", t); add(prop + "-right", r); add(prop + "-bottom", b); add(prop + "-left", l);
      }
    } else if (prop === "border") {
      tokens.forEach(function (tok) {
        if (/^(\d*\.?\d+)(px|em|rem)?$|^(thin|medium|thick)$/i.test(tok)) add("border-width", tok);
        else if (/^(none|hidden|solid|dashed|dotted|double|groove|ridge|inset|outset)$/i.test(tok)) add("border-style", tok);
        else if (isColorToken(tok)) add("border-color", tok);
      });
    } else if (prop === "background") {
      if (!/url\(|gradient\(/i.test(value)) {
        tokens.forEach(function (tok) { if (isColorToken(tok)) add("background-color", tok); });
      } else {
        add("background-image", value);
      }
    }
  }

  var ORDER_RULE = 0;

  function parseBlock(text, ctx, result) {
    var pos = 0;
    while (pos < text.length) {
      var open = indexOfTop(text, "{;", pos);
      if (open === -1) break;
      if (text[open] === ";") { pos = open + 1; continue; } // @import / @charset / sisa titik koma

      var prelude = text.slice(pos, open).trim();
      var close = matchBrace(text, open);
      var body = text.slice(open + 1, close);
      pos = close + 1;
      if (!prelude) continue;

      if (prelude[0] === "@") {
        var m = /^@([a-z-]+)\s*(.*)$/i.exec(prelude);
        var name = (m ? m[1] : "").toLowerCase();
        var rest = m ? m[2].trim() : "";
        if (name === "media") {
          result.media.push(rest);
          parseBlock(body, (ctx ? ctx + " and " : "") + "@media " + rest, result);
        } else if (name === "supports" || name === "layer" || name === "container") {
          parseBlock(body, (ctx ? ctx + " and " : "") + "@" + name + " " + rest, result);
        }
        // @keyframes / @font-face / lainnya: tidak masuk cascade dasar
        continue;
      }

      var selectors = splitTop(prelude, ",").map(function (s) {
        return s.replace(/\s+/g, " ").trim();
      }).filter(Boolean);
      result.rules.push({
        selectors: selectors,
        decls: parseDeclarations(body),
        ctx: ctx,
        order: ++ORDER_RULE
      });
    }
  }

  function parse(css) {
    var result = { rules: [], media: [] };
    parseBlock(stripComments(css), null, result);
    return result;
  }

  // ------------------------------------------------------------------- colors

  function clamp(n, lo, hi) { return Math.min(hi, Math.max(lo, n)); }

  function hslToRgb(h, s, l) {
    h = ((h % 360) + 360) % 360 / 360; s = clamp(s, 0, 1); l = clamp(l, 0, 1);
    if (s === 0) { var v = Math.round(l * 255); return [v, v, v]; }
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s, p = 2 * l - q;
    function hue(t) {
      if (t < 0) t += 1; if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    }
    return [hue(h + 1 / 3), hue(h), hue(h - 1 / 3)].map(function (x) { return Math.round(x * 255); });
  }

  /** "red" | "#f00" | "rgb(255 0 0 / 50%)" | "hsl(0,100%,50%)" → "r,g,b,a" atau null. */
  function toRGBA(str) {
    if (str == null) return null;
    var s = String(str).trim().toLowerCase();
    if (!s) return null;
    if (NAMED_COLORS[s]) {
      if (NAMED_COLORS[s].charAt(0) !== "#") return "0,0,0,0";
      s = NAMED_COLORS[s];
    }
    var m;
    if ((m = /^#([0-9a-f]{3,8})$/.exec(s))) {
      var h = m[1];
      if (h.length === 3 || h.length === 4) h = h.split("").map(function (c) { return c + c; }).join("");
      if (h.length !== 6 && h.length !== 8) return null;
      var a = h.length === 8 ? Math.round(parseInt(h.slice(6, 8), 16) / 255 * 100) / 100 : 1;
      return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16), a].join(",");
    }
    if ((m = /^rgba?\(\s*([^)]+)\)$/.exec(s))) {
      var p = m[1].split(/[\s,\/]+/).filter(Boolean);
      if (p.length < 3) return null;
      var rgb = p.slice(0, 3).map(function (x) {
        return x.indexOf("%") !== -1 ? Math.round(parseFloat(x) * 2.55) : Math.round(parseFloat(x));
      });
      var al = p[3] !== undefined ? (p[3].indexOf("%") !== -1 ? parseFloat(p[3]) / 100 : parseFloat(p[3])) : 1;
      if (rgb.some(isNaN) || isNaN(al)) return null;
      return rgb.concat([al]).join(",");
    }
    if ((m = /^hsla?\(\s*([^)]+)\)$/.exec(s))) {
      var q = m[1].split(/[\s,\/]+/).filter(Boolean);
      if (q.length < 3) return null;
      var rgb2 = hslToRgb(parseFloat(q[0]), parseFloat(q[1]) / 100, parseFloat(q[2]) / 100);
      var al2 = q[3] !== undefined ? (q[3].indexOf("%") !== -1 ? parseFloat(q[3]) / 100 : parseFloat(q[3])) : 1;
      if (rgb2.some(isNaN) || isNaN(al2)) return null;
      return rgb2.concat([al2]).join(",");
    }
    return null;
  }

  function colorEquals(a, b) {
    var x = toRGBA(a), y = toRGBA(b);
    return x !== null && y !== null && x === y;
  }

  // ----------------------------------------------------------- value matching

  function normalizeValue(v) {
    return String(v == null ? "" : v)
      .toLowerCase()
      .replace(/!\s*important/g, "")
      .replace(/\s+/g, " ")
      .replace(/\s*,\s*/g, ",")
      .replace(/(^|[^\d.])\.(\d)/g, "$10.$2")
      .replace(/(^|[\s(,])0(px|em|rem|%|pt)\b/g, "$10")
      .replace(/["']/g, "")
      .trim();
  }

  /** Cocokkan nilai aktual dengan spesifikasi (string, RegExp, {re,flags}, array, function). */
  function valueMatches(actual, spec) {
    if (actual == null) return false;
    if (spec === undefined || spec === null) return true;
    if (Array.isArray(spec)) return spec.some(function (s) { return valueMatches(actual, s); });
    if (typeof spec === "function") return !!spec(actual);
    if (spec instanceof RegExp) return spec.test(actual);
    if (typeof spec === "object" && spec.re) {
      try { return new RegExp(spec.re, spec.flags || "i").test(actual); } catch (e) { return false; }
    }
    var a = normalizeValue(actual), b = normalizeValue(spec);
    if (a === b) return true;
    return colorEquals(actual, spec);
  }

  // ----------------------------------------------------------- selector logic

  function specificity(sel) {
    var s = String(sel).replace(/"[^"]*"|'[^']*'/g, '""');
    var a = 0, b = 0, c = 0;
    s = s.replace(/:where\([^)]*\)/g, "");
    s = s.replace(/:(not|is|has)\(([^)]*)\)/g, " $2 ");
    s = s.replace(/\[[^\]]*\]/g, function () { b++; return ""; });
    s = s.replace(/#[\w-]+/g, function () { a++; return ""; });
    s = s.replace(/\.[\w-]+/g, function () { b++; return ""; });
    s = s.replace(/::[\w-]+(\([^)]*\))?/g, function () { c++; return ""; });
    s = s.replace(/:[\w-]+(\([^)]*\))?/g, function () { b++; return ""; });
    s = s.replace(/(^|[\s>+~(,])([a-zA-Z][\w-]*)/g, function (m, p) { c++; return p; });
    return a * 10000 + b * 100 + c;
  }

  function safeMatches(el, sel) {
    try { return el.matches(sel); } catch (e) { return false; }
  }

  function parseInline(el) {
    var attr = el.getAttribute && el.getAttribute("style");
    return attr ? parseDeclarations(attr) : [];
  }

  /** Nilai hasil cascade untuk satu element + properti (tanpa inheritance). */
  function cascadeValue(el, prop, parsed) {
    var best = null;
    function consider(d, spec) {
      var key = [d.important ? 1 : 0, spec, d.order];
      if (!best || cmp(key, best.key) > 0) best = { key: key, value: d.value };
    }
    function cmp(x, y) {
      for (var i = 0; i < x.length; i++) if (x[i] !== y[i]) return x[i] - y[i];
      return 0;
    }
    parsed.rules.forEach(function (rule) {
      if (rule.ctx) return; // @media dll hanya dihitung lewat hasMedia / has
      rule.selectors.forEach(function (sel) {
        if (DYNAMIC.test(sel) || !safeMatches(el, sel)) return;
        var spec = specificity(sel);
        rule.decls.forEach(function (d) { if (d.prop === prop) consider(d, spec); });
      });
    });
    parseInline(el).forEach(function (d) { if (d.prop === prop) consider(d, 1000000); });
    return best ? best.value : null;
  }

  function computedValue(el, prop, parsed) {
    var node = el, hops = 0;
    while (node && node.nodeType === 1 && hops++ < 50) {
      var v = cascadeValue(node, prop, parsed);
      if (v !== null && !/^inherit$/i.test(v)) return v;
      if (v === null && !INHERITED[prop] && !/^inherit$/i.test(String(v))) return null;
      node = node.parentElement;
    }
    return null;
  }

  // ------------------------------------------------------------------ factory

  function collectStyles(doc) {
    if (!doc || !doc.querySelectorAll) return "";
    return Array.prototype.map.call(doc.querySelectorAll("style"), function (s) { return s.textContent; }).join("\n");
  }

  function create(doc, cssText) {
    var text = cssText != null ? cssText : collectStyles(doc);
    var parsed = parse(text);

    function elementsOf(target) {
      if (!target) return [];
      if (typeof target === "string") {
        try { return Array.prototype.slice.call(doc.querySelectorAll(target)); } catch (e) { return []; }
      }
      return [target];
    }

    function normSel(s) { return String(s).replace(/\s+/g, " ").replace(/\s*([>+~])\s*/g, " $1 ").replace(/\s+/g, " ").trim().toLowerCase(); }

    var api = {
      parsed: parsed,
      text: text,

      /** Jumlah aturan CSS (di luar @media) yang punya setidaknya satu deklarasi. */
      ruleCount: function () {
        return parsed.rules.filter(function (r) { return r.decls.length; }).length;
      },

      /** Nilai akhir (cascade + inheritance) pada element pertama yang cocok. null jika tidak ada. */
      value: function (target, prop) {
        var el = elementsOf(target)[0];
        return el ? computedValue(el, String(prop).toLowerCase(), parsed) : null;
      },

      /** Apakah nilai akhir cocok? (spec boleh string / array / RegExp / {re}). */
      is: function (target, prop, spec) {
        return valueMatches(api.value(target, prop), spec);
      },

      /** Seperti is(), tapi SEMUA element yang cocok harus lolos (dan minimal satu element ada). */
      all: function (target, prop, spec) {
        var els = elementsOf(target);
        if (!els.length) return false;
        return els.every(function (el) {
          return valueMatches(computedValue(el, String(prop).toLowerCase(), parsed), spec);
        });
      },

      /** Bandingkan warna secara semantik (red = #f00 = rgb(255,0,0)). */
      colorIs: function (target, prop, color) {
        return colorEquals(api.value(target, prop), color);
      },

      /** Angka pertama dari nilai akhir (16 untuk "16px"), atau null. */
      num: function (target, prop) {
        var v = api.value(target, prop);
        var m = v === null ? null : /-?\d*\.?\d+/.exec(v);
        return m ? parseFloat(m[0]) : null;
      },

      /** Ada aturan yang SELECTOR-nya persis `selector` (salah satu dari daftar koma) dan mendeklarasikan `prop`? */
      has: function (selector, prop, spec) {
        var want = normSel(selector), p = String(prop).toLowerCase();
        return parsed.rules.some(function (rule) {
          if (rule.ctx) return false;
          return rule.selectors.some(function (s) { return normSel(s) === want; }) &&
            rule.decls.some(function (d) { return d.prop === p && valueMatches(d.value, spec); });
        });
      },

      /** Ada deklarasi `prop` (dan nilai cocok) di aturan mana pun, termasuk di dalam @media? */
      hasAny: function (prop, spec) {
        var p = String(prop).toLowerCase();
        return parsed.rules.some(function (rule) {
          return rule.decls.some(function (d) { return d.prop === p && valueMatches(d.value, spec); });
        }) || elementsOf("[style]").some(function (el) {
          return parseInline(el).some(function (d) { return d.prop === p && valueMatches(d.value, spec); });
        });
      },

      /** Ada aturan yang selector-nya MENGANDUNG pola (RegExp / string)? Berguna untuk :hover, ::before, dst. */
      hasSelector: function (pattern) {
        var re = pattern instanceof RegExp ? pattern : new RegExp(String(pattern).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
        return parsed.rules.some(function (rule) {
          return rule.selectors.some(function (s) { return re.test(s); });
        });
      },

      /** Daftar kondisi @media yang ditulis murid. */
      media: function () { return parsed.media.slice(); },

      hasMedia: function (pattern) {
        var re = pattern instanceof RegExp ? pattern : new RegExp(String(pattern), "i");
        return parsed.media.some(function (m) { return re.test(m); });
      },

      /** Apakah ada deklarasi `prop` di dalam @media? */
      mediaHas: function (prop, spec) {
        var p = String(prop).toLowerCase();
        return parsed.rules.some(function (rule) {
          return !!rule.ctx && rule.decls.some(function (d) { return d.prop === p && valueMatches(d.value, spec); });
        });
      }
    };
    return api;
  }

  // ---------------------------------------------------------------- exports

  var exported = {
    create: create,
    parse: parse,
    valueMatches: valueMatches,
    colorEquals: colorEquals,
    toRGBA: toRGBA,
    specificity: specificity,
    normalizeValue: normalizeValue
  };
  if (typeof window !== "undefined") window.CSSCheck = exported;
  if (typeof module !== "undefined" && module.exports) module.exports = exported;
})();
