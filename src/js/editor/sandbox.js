// src/js/editor/sandbox.js — Sandboxed Code Execution Module
(function () {
  "use strict";

  const DEFAULT_TIMEOUT_MS = 3000; // FR-1.3: Timeout maksimal 3.000 ms
  const DOC_TIMEOUT_MS = 5000; // Batas eksekusi dokumen JS (validasi jalur JavaScript)

  // ------------------------------------------------------------------
  // Bridge dokumen JS (Jalur JavaScript).
  // Skrip 1 (console capture): menangkap console.log/info/warn/error + error
  //   runtime (window onerror), menampilkannya ke panel konsol DI DALAM
  //   preview, dan meneruskan tiap baris ke parent via postMessage
  //   ({ type: 'PK_CONSOLE' }) sehingga aplikasi utama tidak crash.
  // Skrip 3 (finalize): berjalan SETELAH kode murid selesai, mengevaluasi
  //   pemeriksaan DOM (checkStr) terhadap hasil akhir halaman, lalu
  //   melaporkan hasil lengkap ke parent via { type: 'PK_DOC_RESULT' }.
  // ------------------------------------------------------------------
  const CONSOLE_CAPTURE_SRC =
    "<scr" +
    "ipt>" +
    "(function () {" +
    "  window.__pkLogs = [];" +
    "  window.__pkError = null;" +
    "  function fmt(a) {" +
    '    if (a === null) return "null";' +
    '    if (a === undefined) return "undefined";' +
    '    if (typeof a === "string") return a;' +
    '    if (typeof a === "number" || typeof a === "boolean") return String(a);' +
    '    if (Array.isArray(a)) { try { return "[" + a.map(fmt).join(", ") + "]"; } catch (e) { return String(a); } }' +
    '    if (typeof a === "object") { try { return JSON.stringify(a); } catch (e) { return String(a); } }' +
    "    return String(a);" +
    "  }" +
    "  function panel() {" +
    '    var p = document.getElementById("pk-console-panel");' +
    "    if (!p) {" +
    '      p = document.createElement("div");' +
    '      p.id = "pk-console-panel";' +
    '      p.setAttribute("style", "position:fixed;left:0;right:0;bottom:0;max-height:45%;overflow:auto;background:#0f172a;color:#e2e8f0;font:12px/1.7 ui-monospace,Consolas,monospace;padding:8px 12px 10px;border-top:3px solid #f59e0b;z-index:2147483000;margin:0;");' +
    '      var head = document.createElement("div");' +
    '      head.setAttribute("style", "font-weight:700;color:#f59e0b;letter-spacing:.06em;font-size:10px;margin-bottom:2px;");' +
    '      head.textContent = "CONSOLE";' +
    "      p.appendChild(head);" +
    "      (document.body || document.documentElement).appendChild(p);" +
    "    }" +
    "    return p;" +
    "  }" +
    "  function render(type, text) {" +
    "    try {" +
    '      var line = document.createElement("div");' +
    '      line.setAttribute("style", "padding:2px 0;border-bottom:1px solid rgba(255,255,255,.07);white-space:pre-wrap;word-break:break-word;" + (type === "error" ? "color:#fda4af;" : type === "warn" ? "color:#fcd34d;" : type === "info" ? "color:#93c5fd;" : ""));' +
    '      line.textContent = (type === "error" ? "[error] " : type === "warn" ? "[warn] " : type === "info" ? "[info] " : "") + text;' +
    "      panel().appendChild(line);" +
    "    } catch (e) { }" +
    "  }" +
    "  function emit(type, args) {" +
    '    var text = Array.prototype.map.call(args, fmt).join(" ");' +
    "    window.__pkLogs.push({ type: type, text: text });" +
    "    render(type, text);" +
    '    try { window.parent.postMessage({ type: "PK_CONSOLE", level: type, text: text }, "*"); } catch (e) { }' +
    "  }" +
    '  ["log", "info", "warn", "error"].forEach(function (m) {' +
    "    var orig = console[m] ? console[m].bind(console) : function () { };" +
    "    console[m] = function () { emit(m, arguments); orig.apply(null, arguments); };" +
    "  });" +
    '  window.addEventListener("error", function (e) {' +
    '    var msg = e && e.message ? e.message : "Terjadi error di kode kamu";' +
    '    if (e && e.lineno) msg += " (baris " + e.lineno + ")";' +
    "    window.__pkError = msg;" +
    '    emit("error", [msg]);' +
    "  });" +
    "})();" +
    "</scr" +
    "ipt>";

  function buildFinalizeSrc(checks, runId) {
    return (
      "<scr" +
      "ipt>" +
      "(function () {" +
      "  var checks = " +
      JSON.stringify(checks || []) +
      ";" +
      "  var runId = " +
      JSON.stringify(runId) +
      ";" +
      "  var helper = {" +
      "    logs: window.__pkLogs || []," +
      "    error: window.__pkError || null," +
      "    ok: function () { return !window.__pkError; }," +
      '    output: function () { return (window.__pkLogs || []).map(function (l) { return l.text; }).join("\\n"); },' +
      "    logCount: function () { return (window.__pkLogs || []).length; }," +
      "    click: function (sel) { var el = document.querySelector(sel); if (el && el.click) el.click(); return !!el; }," +
      "    setValue: function (sel, val) { var el = document.querySelector(sel); if (el) el.value = val; return !!el; }" +
      "  };" +
      "  var results = [];" +
      "  for (var i = 0; i < checks.length; i++) {" +
      "    try {" +
      '      var fn = new Function("doc", "css", "js", "return (" + checks[i] + ");");' +
      "      results.push(!!fn(document, null, helper));" +
      "    } catch (e) { results.push(false); }" +
      "  }" +
      '  try { window.parent.postMessage({ type: "PK_DOC_RESULT", runId: runId, result: { runId: runId, status: window.__pkError ? "error" : "success", logs: window.__pkLogs || [], error: window.__pkError, checkResults: results } }, "*"); } catch (e) { }' +
      "})();" +
      "</scr" +
      "ipt>"
    );
  }

  /** Cegah kode murid memecah tag <script> penampung. */
  function escapeScriptClose(text) {
    return String(text == null ? "" : text).replace(
      /<\/script/gi,
      "<\\/script",
    );
  }

  class CodeSandbox {
    constructor() {
      this._iframe = null;
      this._pendingRequests = new Map();
      this._seq = 0;
      this._ready = false;
      this._initPromise = null;
      this._onMessage = this._handleMessage.bind(this);
    }

    init() {
      if (typeof window === "undefined" || typeof document === "undefined") {
        return Promise.resolve();
      }

      if (this._initPromise) return this._initPromise;

      window.removeEventListener("message", this._onMessage);
      window.addEventListener("message", this._onMessage);

      this._initPromise = new Promise((resolve) => {
        this._setupIframe(() => {
          this._ready = true;
          resolve();
        });
      });

      return this._initPromise;
    }

    _setupIframe(onReady) {
      if (this._iframe && this._iframe.parentNode) {
        this._iframe.parentNode.removeChild(this._iframe);
      }

      const iframe = document.createElement("iframe");
      iframe.id = "pk-sandbox-runner";
      iframe.title = "Pintu Koding Code Execution Sandbox";
      iframe.style.display = "none";
      // FR-1.1: sandbox="allow-scripts" TANPA allow-same-origin (isolasi total dari localStorage & parent DOM)
      iframe.setAttribute("sandbox", "allow-scripts");

      const harnessHtml = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body>
<script>
(function() {
  var logs = [];
  function formatArg(a) {
    if (a === null) return 'null';
    if (a === undefined) return 'undefined';
    if (typeof a === 'object') {
      try { return JSON.stringify(a); } catch(e) { return String(a); }
    }
    return String(a);
  }
  function capture(type, args) {
    var out = Array.prototype.slice.call(args).map(formatArg).join(' ');
    logs.push(out);
  }
  console.log = function() { capture('log', arguments); };
  console.info = function() { capture('info', arguments); };
  console.warn = function() { capture('warn', arguments); };
  console.error = function() { capture('error', arguments); };

  window.addEventListener('message', function(e) {
    var data = e.data;
    if (!data || data.type !== 'PK_EXEC') return;

    var id = data.id;
    var code = data.code || '';
    logs = [];
    var t0 = performance.now();
    var status = 'success';
    var errorMsg = '';
    var resultVal = undefined;

    try {
      // Check if code contains HTML markup
      var isHtml = /<[a-z][\\s\\S]*>/i.test(code);
      if (isHtml) {
        document.body.innerHTML = code;
        // Execute embedded scripts inside HTML
        var scripts = document.body.querySelectorAll('script');
        scripts.forEach(function(oldScript) {
          var newScript = document.createElement('script');
          Array.prototype.forEach.call(oldScript.attributes, function(attr) {
            newScript.setAttribute(attr.name, attr.value);
          });
          newScript.textContent = oldScript.textContent;
          document.body.appendChild(newScript);
        });
      } else {
        resultVal = new Function(code)();
      }
    } catch (err) {
      status = 'error';
      errorMsg = err && err.message ? err.message : String(err);
      logs.push('Error: ' + errorMsg);
    }

    var executionTime = Math.round(performance.now() - t0);
    var output = logs.join('\\n');
    if (!output && resultVal !== undefined) {
      output = formatArg(resultVal);
    }

    // FR-1.4: Objek respon standar { status, output, executionTime }
    var response = {
      type: 'PK_EXEC_RESULT',
      id: id,
      status: status,
      output: output,
      executionTime: executionTime
    };

    if (e.source && e.source.postMessage) {
      e.source.postMessage(response, '*');
    }
  });

  // Notify parent runner is ready
  window.parent.postMessage({ type: 'PK_SANDBOX_READY' }, '*');
})();
<\/script>
</body>
</html>`;

      iframe.srcdoc = harnessHtml;
      document.body.appendChild(iframe);
      this._iframe = iframe;

      const readyHandler = (e) => {
        if (e.data && e.data.type === "PK_SANDBOX_READY") {
          window.removeEventListener("message", readyHandler);
          if (onReady) onReady();
        }
      };
      window.addEventListener("message", readyHandler);

      // Fallback in case message is missed
      setTimeout(() => {
        window.removeEventListener("message", readyHandler);
        if (onReady) onReady();
      }, 300);
    }

    _handleMessage(event) {
      const data = event.data;
      if (!data || data.type !== "PK_EXEC_RESULT" || !data.id) return;

      const pending = this._pendingRequests.get(data.id);
      if (pending) {
        this._pendingRequests.delete(data.id);
        clearTimeout(pending.timer);
        pending.resolve({
          status: data.status,
          output: data.output || "",
          executionTime: Number(data.executionTime) || 0,
        });
      }
    }

    /**
     * FR-1.1 - FR-1.4: Execute code inside sandboxed environment
     * @param {string} code
     * @param {Object} options
     * @returns {Promise<{status: 'success'|'error', output: string, executionTime: number}>}
     */
    async execute(code, options = {}) {
      const timeoutMs = options.timeout || DEFAULT_TIMEOUT_MS;
      await this.init();

      const id = "exec_" + ++this._seq + "_" + Date.now();

      return new Promise((resolve) => {
        const timer = setTimeout(() => {
          this._pendingRequests.delete(id);
          // Kill stalled iframe to abort infinite loop
          this._setupIframe(() => {
            this._ready = true;
          });

          // FR-1.3 & FR-1.4: Standar error jika timeout terlampaui
          resolve({
            status: "error",
            output: `Waktu eksekusi habis (Timeout > ${timeoutMs}ms). Periksa kemungkinan loop tak terbatas!`,
            executionTime: timeoutMs,
          });
        }, timeoutMs);

        this._pendingRequests.set(id, {
          resolve,
          timer,
          startTime: Date.now(),
        });

        try {
          if (this._iframe && this._iframe.contentWindow) {
            this._iframe.contentWindow.postMessage(
              {
                type: "PK_EXEC",
                id: id,
                code: code,
              },
              "*",
            );
          } else {
            clearTimeout(timer);
            this._pendingRequests.delete(id);
            resolve({
              status: "error",
              output: "Sandbox iframe tidak tersedia.",
              executionTime: 0,
            });
          }
        } catch (err) {
          clearTimeout(timer);
          this._pendingRequests.delete(id);
          resolve({
            status: "error",
            output: "Gagal mengirim kode ke sandbox: " + err.message,
            executionTime: 0,
          });
        }
      });
    }

    destroy() {
      window.removeEventListener("message", this._onMessage);
      if (this._iframe && this._iframe.parentNode) {
        this._iframe.parentNode.removeChild(this._iframe);
      }
      this._iframe = null;
      this._pendingRequests.clear();
      this._ready = false;
      this._initPromise = null;
    }

    /**
     * Jalur JavaScript: rakit dokumen HTML lengkap yang siap dieksekusi.
     * @param {string} html  potongan isi <body> ATAU dokumen HTML lengkap (kosong = halaman polos)
     * @param {string} jsCode kode JavaScript murid
     * @param {object} opts  { checks: [checkStr...] } — pemeriksaan DOM pasca-eksekusi
     * @returns {{doc: string, runId: string}}
     */
    buildRunnableDoc(html, jsCode, opts) {
      opts = opts || {};
      this._docSeq = (this._docSeq || 0) + 1;
      const runId = "doc_" + this._docSeq + "_" + Date.now();
      const capture = CONSOLE_CAPTURE_SRC;
      const finalize = buildFinalizeSrc(opts.checks || [], runId);
      const scriptTag =
        "<scr" +
        "ipt>\n" +
        escapeScriptClose(jsCode || "") +
        "\n</scr" +
        "ipt>";
      let src = String(html || "");

      if (/<!doctype\s+html|<html[\s>]/i.test(src)) {
        // Dokumen lengkap: sisipkan capture setelah <head> (atau <html>), script murid sebelum </body>.
        if (/<head[^>]*>/i.test(src)) {
          src = src.replace(/<head[^>]*>/i, (m) => m + capture);
        } else {
          src = src.replace(/<html[^>]*>/i, (m) => m + capture);
        }
        if (/<\/body>/i.test(src)) {
          src = src.replace(/<\/body>/i, scriptTag + finalize + "</body>");
        } else {
          src += scriptTag + finalize;
        }
        return { doc: src, runId };
      }

      // Potongan isi body (konvensi latihan Jalur JS): bungkus jadi dokumen lengkap.
      const doc =
        '<!DOCTYPE html>\n<html lang="id">\n<head>\n<meta charset="UTF-8">\n' +
        capture +
        "\n</head>\n<body>\n" +
        src +
        "\n" +
        scriptTag +
        "\n" +
        finalize +
        "\n</body>\n</html>";
      return { doc, runId };
    }

    /**
     * Jalur JavaScript: jalankan dokumen di iframe sandbox tersembunyi lalu kumpulkan
     * hasilnya (log konsol, error, dan hasil pemeriksaan DOM).
     * @param {string} docHtml dokumen lengkap dari buildRunnableDoc
     * @param {string} expectedRunId runId yang diharapkan (penyaring pesan lintas eksekusi)
     * @returns {Promise<{status:'success'|'error', logs:[{type,text}], error:string, checkResults:boolean[]}>}
     */
    runDocument(docHtml, expectedRunId, timeoutMs) {
      if (typeof document === "undefined" || !document.body) {
        return Promise.resolve({
          status: "error",
          logs: [],
          error: "Lingkungan eksekusi tidak tersedia.",
          checkResults: [],
        });
      }
      const limit = timeoutMs || DOC_TIMEOUT_MS;
      return new Promise((resolve) => {
        const iframe = document.createElement("iframe");
        iframe.setAttribute("sandbox", "allow-scripts");
        iframe.style.display = "none";
        iframe.style.width = "0";
        iframe.style.height = "0";
        let settled = false;
        let timer = null;

        const cleanup = () => {
          window.removeEventListener("message", onMsg);
          clearTimeout(timer);
          if (iframe.parentNode) iframe.parentNode.removeChild(iframe);
        };
        const onMsg = (e) => {
          const d = e.data;
          if (!d || d.type !== "PK_DOC_RESULT" || !d.result) return;
          if (expectedRunId && d.result.runId !== expectedRunId) return;
          if (settled) return;
          settled = true;
          cleanup();
          resolve({
            status: d.result.status === "success" ? "success" : "error",
            logs: d.result.logs || [],
            error: d.result.error || "",
            checkResults: d.result.checkResults || [],
          });
        };
        window.addEventListener("message", onMsg);
        timer = setTimeout(() => {
          if (settled) return;
          settled = true;
          cleanup();
          resolve({
            status: "error",
            logs: [],
            error:
              "Waktu eksekusi habis (Timeout > " +
              limit +
              "ms). Periksa kemungkinan loop tak terbatas!",
            checkResults: [],
          });
        }, limit);

        document.body.appendChild(iframe);
        iframe.srcdoc = docHtml;
      });
    }

    /**
     * Jalur JavaScript: validasi kode murid dengan eksekusi nyata (output konsol + DOM).
     * @param {string} jsCode kode JavaScript murid
     * @param {object} options { html: potongan body (opsional), checks: [checkStr...] }
     */
    runForValidation(jsCode, options) {
      options = options || {};
      const built = this.buildRunnableDoc(options.html || "", jsCode, {
        checks: options.checks || [],
      });
      return this.runDocument(built.doc, built.runId);
    }
  }

  const Sandbox = new CodeSandbox();

  if (typeof window !== "undefined") {
    window.Sandbox = Sandbox;
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = Sandbox;
  }
})();
