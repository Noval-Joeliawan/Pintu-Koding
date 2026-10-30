// js/editor.js — Code Editor & Preview
window.Editor = {
  instances: {},
  _cmById: {},

  create(config) {
    const {
      editorId,
      previewId,
      lineNumbersId,
      defaultCode = "",
      autoRun = false,
    } = config;
    const editor = document.getElementById(editorId);
    if (!editor) return null;

    if (defaultCode && !editor.value) editor.value = defaultCode;

    // Line numbers
    if (lineNumbersId) {
      this.updateLineNumbers(editorId, lineNumbersId);
      editor.addEventListener("input", () =>
        this.updateLineNumbers(editorId, lineNumbersId),
      );
      editor.addEventListener("scroll", () => {
        const ln = document.getElementById(lineNumbersId);
        if (ln) ln.scrollTop = editor.scrollTop;
      });
    }

    // Tab key
    editor.addEventListener("keydown", (e) => {
      if (e.key === "Tab") {
        e.preventDefault();
        const start = editor.selectionStart;
        const end = editor.selectionEnd;
        editor.value =
          editor.value.substring(0, start) + "  " + editor.value.substring(end);
        editor.selectionStart = editor.selectionEnd = start + 2;
        if (lineNumbersId) this.updateLineNumbers(editorId, lineNumbersId);
      }
    });

    const instance = {
      run: () => {
        if (previewId) Editor.runPreview(editor.value, previewId);
      },
      reset: () => {
        editor.value = defaultCode;
        if (lineNumbersId) Editor.updateLineNumbers(editorId, lineNumbersId);
        if (previewId && autoRun) Editor.runPreview(editor.value, previewId);
      },
      getCode: () => editor.value,
      setCode: (code) => {
        editor.value = code;
        if (lineNumbersId) Editor.updateLineNumbers(editorId, lineNumbersId);
      },
    };

    this.instances[editorId] = instance;

    if (autoRun && previewId && defaultCode) {
      this.runPreview(defaultCode, previewId);
    }

    return instance;
  },

  updateLineNumbers(editorId, lineNumbersId) {
    const editor = document.getElementById(editorId);
    const ln = document.getElementById(lineNumbersId);
    if (!editor || !ln) return;

    const lines = editor.value.split("\n").length;
    const nums = [];
    for (let i = 1; i <= Math.max(lines, 1); i++) {
      nums.push(i);
    }
    ln.textContent = nums.join("\n");
    ln.scrollTop = editor.scrollTop;
  },

  /** Run raw editor code into preview (works for CM-enhanced or plain textareas). */
  runCurrent(textareaId, iframeId) {
    this.runPreview(this.getCode(textareaId), iframeId);
  },

  /**
   * Upgrade a plain <textarea> into a CodeMirror editor in-place.
   * Falls back silently to the existing textarea if CodeMirror is not loaded.
   * Raw code is still readable via Editor.getCode(textareaId).
   */
  enhance(textareaId, opts) {
    opts = opts || {};
    const ta = document.getElementById(textareaId);
    if (!ta) return null;

    // Already enhanced? Recreate if the previous instance was removed from the DOM
    // (lesson slides re-render their editors on every slide change).
    const prev = this._cmById[textareaId];
    if (prev) {
      if (prev.getWrapperElement && prev.getWrapperElement().isConnected)
        return prev;
      this._cmById[textareaId] = null;
    }

    // CodeMirror not (fully) loaded yet or blocked/offline → keep plain textarea behavior
    if (typeof window.CodeMirror === "undefined" || !window.PKCodeMirrorReady)
      return null;

    const value = ta.value;
    // Hide the old manual line-number gutter — CM renders its own
    const wrap = ta.closest(".code-editor-wrapper");
    if (wrap) {
      wrap
        .querySelectorAll(".line-numbers")
        .forEach((el) => (el.style.display = "none"));
    }

    // Mode mengikuti jenis berkas: 'javascript' untuk tab script.js (Jalur JS)
    const cmMode = opts.mode || "htmlmixed";
    const cm = window.CodeMirror.fromTextArea(ta, {
      mode: cmMode,
      theme: "pk",
      lineNumbers: true,
      indentUnit: 2,
      tabSize: 2,
      smartIndent: true,
      indentWithTabs: false,
      autoCloseTags: true,
      matchBrackets: true,
      matchTags: { bothTags: true },
      lineWrapping: false,
      inputStyle: "textarea",
      extraKeys: {
        "Shift-Enter": () => {
          if (opts.onRun) opts.onRun();
        },
        "Ctrl-Enter": () => {
          if (opts.onRun) opts.onRun();
        },
        Tab: (cm) => {
          if (cm.somethingSelected()) {
            cm.indentSelection("add");
          } else {
            cm.replaceSelection("  ", "end");
          }
        },
        "Shift-Tab": (cm) => cm.indentSelection("subtract"),
      },
    });

    if (value) cm.setValue(value);
    cm.setSize("100%", "100%");
    cm.refresh();

    this._cmById[textareaId] = cm;
    return cm;
  },

  /** Single source of truth for editor content (CM or plain textarea). */
  getCode(textareaId) {
    const cm = this._cmById[textareaId];
    if (cm) return cm.getValue();
    const el = document.getElementById(textareaId);
    return el ? el.value : "";
  },

  setCode(textareaId, code) {
    const cm = this._cmById[textareaId];
    if (cm) {
      cm.setValue(code);
      cm.refresh();
      return;
    }
    const el = document.getElementById(textareaId);
    if (el) el.value = code;
  },

  runPreview(code, iframeId) {
    const iframe = document.getElementById(iframeId);
    if (!iframe) return;

    // Use srcdoc for security (iframe sandbox without allow-same-origin)
    if (!iframe.getAttribute("sandbox")) {
      iframe.setAttribute("sandbox", "allow-scripts allow-modals");
    }
    const safeCode = code || "";
    iframe.srcdoc = safeCode;
  },

  /**
   * Jalur JavaScript: rakit dokumen HTML + script.js lalu jalankan di preview.
   * Output console.log/warn/error tampil di panel konsol DI DALAM preview
   * (disiapkan Sandbox.buildRunnableDoc), error runtime ikut ditampilkan
   * tanpa membuat aplikasi utama crash.
   */
  runJS(textareaId, iframeId) {
    const js = this.getCode(textareaId);
    const htmlTA = document.getElementById(textareaId + "-html");
    const html = htmlTA ? this.getCode(textareaId + "-html") : "";
    let doc;
    if (window.Sandbox && window.Sandbox.buildRunnableDoc) {
      doc = window.Sandbox.buildRunnableDoc(html, js, {}).doc;
    } else {
      // Fallback tanpa sandbox (tidak akan terjadi — sandbox selalu dimuat lebih dulu)
      doc =
        "<!DOCTYPE html><html><body>" +
        html +
        "<scr" +
        "ipt>" +
        js +
        "</scr" +
        "ipt></body></html>";
    }
    this._consoleLines = [];
    this.runPreview(doc, iframeId);
  },

  /** Baris konsol terakhir yang diterima dari preview (fitur pengiriman pesan ke parent). */
  getLastConsole() {
    return (this._consoleLines || []).slice();
  },

  /** Pasang jembatan pesan PK_CONSOLE dari iframe preview ke aplikasi utama. */
  _initConsoleBridge() {
    if (this._consoleBridge) return;
    this._consoleBridge = true;
    this._consoleLines = [];
    window.addEventListener("message", (e) => {
      const d = e.data;
      if (!d || d.type !== "PK_CONSOLE") return;
      if (!Array.isArray(this._consoleLines)) this._consoleLines = [];
      this._consoleLines.push({ level: d.level || "log", text: d.text || "" });
      if (this._consoleLines.length > 300) this._consoleLines.shift();
    });
  },

  /**
   * FR-1.2: Execute code via isolated Sandbox using structured postMessage
   */
  async executeCode(code, options) {
    if (window.Sandbox && typeof window.Sandbox.execute === "function") {
      return await window.Sandbox.execute(code, options);
    }
    return {
      status: "error",
      output: "Sandbox runner tidak tersedia.",
      executionTime: 0,
    };
  },

  /**
   * FR-2.2: Mengunci tombol eksekusi saat nyawa habis
   */
  lockExecution(locked = true) {
    const runButtons = document.querySelectorAll(
      "#btn-playground-run, #btn-check-answer",
    );
    runButtons.forEach((btn) => {
      if (btn) {
        btn.disabled = locked;
        if (locked) {
          btn.classList.add("disabled");
          btn.setAttribute("data-locked-reason", "HEARTS_EMPTY");
        } else {
          btn.classList.remove("disabled");
          btn.removeAttribute("data-locked-reason");
        }
      }
    });
  },

  unlockExecution() {
    this.lockExecution(false);
  },

  initListeners() {
    if (
      typeof window !== "undefined" &&
      typeof window.addEventListener === "function"
    ) {
      this._initConsoleBridge();
    }
    if (window.Events) {
      window.Events.on(window.Events.HEARTS_EMPTY, () => {
        this.lockExecution(true);
      });
      window.Events.on(window.Events.HEART_REFILLED, (data) => {
        if (data && data.hearts > 0) {
          this.unlockExecution();
        }
      });
      window.Events.on(window.Events.STATE_CHANGED, (data) => {
        if (data && data.key === "hearts") {
          if (data.value > 0) {
            this.unlockExecution();
          } else {
            this.lockExecution(true);
          }
        }
      });
    }
  },
};

// Initialize listeners if in browser
if (
  typeof window !== "undefined" &&
  typeof window.addEventListener === "function"
) {
  window.addEventListener("DOMContentLoaded", () => {
    if (window.Editor && window.Editor.initListeners) {
      window.Editor.initListeners();
    }
  });
}
