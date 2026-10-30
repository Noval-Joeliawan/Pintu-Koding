// js/exercises.js — All Exercise Types
window.Exercises = {
  currentSlide: null,
  currentAnswer: null,
  _isChecking: false,
  _hintAttempt: 0,

  _escapeHtml(str) {
    return (str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  },

  /**
   * Author text (questions, instructions, hints, checklist labels) is HTML-escaped so that
   * code mentions like "<textarea>" or "<h1>" are shown as text instead of being parsed as
   * real elements (an unclosed <textarea> used to swallow the whole exercise, including its
   * answer options). Intentional formatting is kept: only PAIRED <strong>…</strong> and
   * <em>…</em> are rendered as markup.
   */
  richText(value) {
    return this._escapeHtml(value == null ? "" : String(value)).replace(
      /&lt;(strong|em)&gt;([^<>]*?)&lt;\/\1&gt;/g,
      "<$1>$2</$1>",
    );
  },

  /** Jalur CSS menulis HTML + <style>, jalur JS menulis kode JavaScript murni. */
  _langBadge() {
    const level =
      window.LessonData && window.LessonEngine
        ? window.LessonData.getLevel(window.LessonEngine.levelId)
        : null;
    const track = level ? window.LessonData.getTrackId(level) : "html";
    if (track === "css") return "HTML + CSS";
    if (track === "js") return "JavaScript";
    return "HTML";
  },

  /** true bila lesson yang sedang dibuka termasuk jalur JavaScript. */
  _isJSTrack() {
    return !!(
      window.LessonData &&
      window.LessonEngine &&
      window.LessonData.getTrackId(window.LessonEngine.levelId) === "js"
    );
  },

  /** Kode murid jalur JS: { js, html } — html hanya ada pada latihan DOM (tab index.html). */
  _getJSFiles() {
    const htmlEl = document.getElementById("chal-editor-html");
    return {
      js: Editor.getCode("chal-editor"),
      html: htmlEl ? Editor.getCode("chal-editor-html") : null,
    };
  },

  /** Hapus komentar JS (memakai JSCheck agar aman terhadap string). */
  _stripJSComments(code) {
    if (window.JSCheck && window.JSCheck.stripComments) {
      return window.JSCheck.stripComments(code).trim();
    }
    return String(code || "")
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\/\/[^\n]*/g, "")
      .trim();
  },

  /* ================= PANEL EDITOR JAVASCRIPT (dengan tab berkas) ================= */

  _renderJSEditorPanel(slide, minHeight) {
    const starter = slide.starterCode || "";
    const isObj = starter && typeof starter === "object";
    const jsCode = isObj ? starter.js || "" : String(starter || "");
    const htmlCode = isObj ? starter.html || "" : "";
    const htmlTab = isObj
      ? '\n            <button type="button" class="editor-file-tab" data-editor-tab="html" role="tab" aria-selected="false">index.html</button>'
      : "";
    const htmlPane = isObj
      ? `
        <div class="code-editor-wrapper" data-pane="html" style="display:none">
          <div class="line-numbers" id="chal-html-line-numbers">1</div>
          <textarea id="chal-editor-html" class="code-editor-textarea" spellcheck="false" autocorrect="off" style="min-height:${minHeight}">${this._escapeHtml(htmlCode)}</textarea>
        </div>`
      : "";
    return `
          <div class="editor-panel">
            <div class="editor-toolbar">
              <div class="editor-file-tabs" role="tablist" aria-label="Pilih berkas editor">
                <button type="button" class="editor-file-tab is-active" data-editor-tab="js" role="tab" aria-selected="true">script.js</button>${htmlTab}
              </div>
              <div class="editor-actions">
                <button class="btn btn-primary btn-sm" onclick="Editor.runJS('chal-editor', 'chal-preview')">▶ Run</button>
              </div>
            </div>
            <div class="code-editor-wrapper" data-pane="js">
              <div class="line-numbers" id="chal-line-numbers">1</div>
              <textarea id="chal-editor" class="code-editor-textarea" spellcheck="false" autocorrect="off" style="min-height:${minHeight}">${this._escapeHtml(jsCode)}</textarea>
            </div>${htmlPane}
          </div>`;
  },

  _renderJSPreviewPanel(minHeight) {
    return `
          <div class="preview-panel">
            <div class="editor-toolbar">
              <span class="editor-lang-badge">Preview · Konsol</span>
            </div>
            <iframe id="chal-preview" class="preview-iframe" sandbox="allow-scripts allow-modals"${minHeight ? ` style="min-height:${minHeight}"` : ""}></iframe>
          </div>`;
  },

  _buildJSHints(res) {
    const msgs = res.errors
      .slice(0, 3)
      .map((e) => `❌ ${this._escapeHtml(e)}`)
      .join("<br>");
    const hints = res.hints || [];
    const hint = hints[Math.min(this._hintAttempt - 1, hints.length - 1)];
    const hintMsg = hint
      ? `<br><br>💡 <em>Hint:</em> ${this._escapeHtml(hint)}`
      : "";
    return msgs + hintMsg;
  },

  /** Pemeriksa bersama untuk challenge & fix-code jalur JS (statis + eksekusi sandbox). */
  async _checkJSCode(jsCode, htmlCode) {
    const rules = this.currentSlide.rules || {};
    const res = await window.Validator.validateCodeJSAsync(jsCode, rules, {
      html: htmlCode || "",
    });
    this._lastResult = res;
    if (res.success) {
      return {
        correct: true,
        explanation: this.currentSlide.explanation
          ? `✓ ${this.currentSlide.explanation}`
          : "✓ Berhasil! Kode JavaScript kamu sudah benar.",
      };
    }
    this._hintAttempt++;
    return {
      correct: false,
      explanation: this._buildJSHints(res),
      _rich: true,
    };
  },

  render(slide, container) {
    this.currentSlide = slide;
    this.currentAnswer = null;
    this._hintAttempt = 0;

    let html = "";
    switch (slide.type) {
      case "multiple-choice":
        html = this._renderMC(slide);
        break;
      case "fill-code":
        html = this._renderFill(slide);
        break;
      case "drag-drop":
        html = this._renderDrag(slide);
        break;
      case "fix-code":
        html = this._renderFix(slide);
        break;
      case "challenge":
        html = this._renderChallenge(slide);
        break;
      case "mini-project":
        html = this._renderProject(slide);
        break;
      case "code-editor":
        html = this._renderCodeEditor(slide);
        break;
      default:
        html = "<p>Tipe slide tidak dikenali.</p>";
    }

    container.innerHTML = html;
    this._attachListeners(slide, container);
  },

  _renderMC(slide) {
    const opts = slide.options
      .map(
        (opt, i) => `
      <button class="mc-option" data-index="${i}" style="width:100%;text-align:left;padding:0.85rem 1.1rem;margin-bottom:0.5rem;border-radius:var(--pk-radius-sm);border:2px solid var(--pk-border);background:var(--pk-white);cursor:pointer;transition:var(--transition);display:flex;align-items:center;gap:0.75rem;font-size:0.95rem">
        <span style="font-weight:700;color:var(--pk-blue);min-width:1.5rem">${i + 1}.</span>
        <span>${this._escapeHtml(opt)}</span>
      </button>
    `,
      )
      .join("");

    return `
      <div class="exercise-mc">
        <div class="exercise-question">${this.richText(slide.question)}</div>
        <div class="mc-options">${opts}</div>
        <div id="exercise-feedback"></div>
      </div>
    `;
  },

  _renderFill(slide) {
    return `
      <div class="exercise-fill">
        <div class="exercise-question">${this.richText(slide.instruction)}</div>
        <div class="fill-code-wrapper">
          <code>${this._escapeHtml(slide.before || "")}</code><input type="text" id="fill-input" class="fill-input" autocomplete="off" spellcheck="false" placeholder="..."/><code>${this._escapeHtml(slide.after || "")}</code>
        </div>
        <div id="exercise-feedback"></div>
      </div>
    `;
  },

  _renderDrag(slide) {
    // Shuffle tokens
    const shuffled = [...slide.answer].sort(() => Math.random() - 0.5);
    const tokens = shuffled
      .map(
        (t, i) => `
      <div class="drag-token" draggable="true" data-val="${this._escapeHtml(t)}" data-idx="${i}">
        <span class="drag-handle">⠿</span>
        ${this._escapeHtml(t)}
        <button class="drag-mobile-btn drag-up" title="Naik">↑</button>
        <button class="drag-mobile-btn drag-down" title="Turun">↓</button>
      </div>
    `,
      )
      .join("");

    return `
      <div class="exercise-drag">
        <div class="exercise-question">${this.richText(slide.instruction)}</div>
        <div class="drag-zone" id="drop-zone">${tokens}</div>
        <p style="font-size:0.8rem;color:var(--pk-text-light);margin-top:0.5rem">💡 Drag & drop atau gunakan tombol ↑↓ untuk menyusun kode.</p>
        <div id="exercise-feedback"></div>
      </div>
    `;
  },

  _renderFix(slide) {
    const code = slide.brokenCode || slide.code || "";
    return `
      <div class="exercise-fix">
        <div class="exercise-question">${this.richText(slide.instruction)}</div>
        ${slide.fixHint ? `<div class="exercise-hint">💡 Petunjuk: ${this.richText(slide.fixHint)}</div>` : ""}
        <div class="code-editor-wrapper" style="margin-bottom:1rem">
          <div class="line-numbers" id="fix-line-numbers">1</div>
          <textarea id="fix-editor" class="code-editor-textarea" spellcheck="false" autocorrect="off" style="min-height:120px">${this._escapeHtml(code)}</textarea>
        </div>
        <div id="exercise-feedback"></div>
      </div>
    `;
  },

  _renderChallenge(slide) {
    // Jalur JavaScript: editor bertab script.js (+ index.html untuk latihan DOM)
    if (this._isJSTrack()) {
      return `
      <div class="exercise-challenge">
        <div class="exercise-question">${this.richText(slide.instruction)}</div>
        <div class="challenge-layout">
          ${this._renderJSEditorPanel(slide, "180px")}
          ${this._renderJSPreviewPanel()}
        </div>
        <div id="exercise-feedback"></div>
      </div>
    `;
    }
    const code = slide.starterCode || slide.code || "";
    return `
      <div class="exercise-challenge">
        <div class="exercise-question">${this.richText(slide.instruction)}</div>
        <div class="challenge-layout">
          <div class="editor-panel">
            <div class="editor-toolbar">
              <span class="editor-lang-badge">${this._langBadge()}</span>
              <div class="editor-actions">
                <button class="btn btn-primary btn-sm" onclick="Editor.runCurrent('chal-editor', 'chal-preview')">▶ Run</button>
              </div>
            </div>
            <div class="code-editor-wrapper">
              <div class="line-numbers" id="chal-line-numbers">1</div>
              <textarea id="chal-editor" class="code-editor-textarea" spellcheck="false" autocorrect="off" style="min-height:180px">${this._escapeHtml(code)}</textarea>
            </div>
          </div>
          <div class="preview-panel">
            <div class="editor-toolbar">
              <span class="editor-lang-badge">Preview</span>
            </div>
            <iframe id="chal-preview" class="preview-iframe" sandbox="allow-scripts allow-modals"></iframe>
          </div>
        </div>
        <div id="exercise-feedback"></div>
      </div>
    `;
  },

  _renderProject(slide) {
    const checks = (slide.checkItems || [])
      .map(
        (item) => `
      <div class="checklist-item" id="check-${item.id}">
        <span class="check-icon">○</span>
        <span>${this.richText(item.label)}</span>
      </div>
    `,
      )
      .join("");

    // Jalur JavaScript: editor bertab + preview (konsol) + checklist
    if (this._isJSTrack()) {
      return `
      <div class="exercise-project">
        <div class="exercise-question">${this.richText(slide.instruction || slide.title)}</div>
        <div class="project-layout">
          ${this._renderJSEditorPanel(slide, "200px")}
          <div style="display:flex;flex-direction:column;gap:1rem">
            ${this._renderJSPreviewPanel("180px")}
            ${checks ? `<div class="project-checklist"><h4 style="margin-bottom:0.5rem;font-size:0.9rem">Checklist:</h4>${checks}</div>` : ""}
          </div>
        </div>
        <div id="exercise-feedback"></div>
      </div>
    `;
    }
    const code = slide.starterCode || "";

    return `
      <div class="exercise-project">
        <div class="exercise-question">${this.richText(slide.instruction || slide.title)}</div>
        <div class="project-layout">
          <div class="editor-panel">
            <div class="editor-toolbar">
              <span class="editor-lang-badge">${this._langBadge()}</span>
              <div class="editor-actions">
                <button class="btn btn-primary btn-sm" onclick="Editor.runCurrent('chal-editor', 'chal-preview')">▶ Run</button>
              </div>
            </div>
            <div class="code-editor-wrapper">
              <div class="line-numbers" id="chal-line-numbers">1</div>
              <textarea id="chal-editor" class="code-editor-textarea" spellcheck="false" autocorrect="off" style="min-height:200px">${this._escapeHtml(code)}</textarea>
            </div>
          </div>
          <div style="display:flex;flex-direction:column;gap:1rem">
            <div class="preview-panel">
              <div class="editor-toolbar">
                <span class="editor-lang-badge">Preview</span>
              </div>
              <iframe id="chal-preview" class="preview-iframe" sandbox="allow-scripts allow-modals" style="min-height:180px"></iframe>
            </div>
            ${checks ? `<div class="project-checklist"><h4 style="margin-bottom:0.5rem;font-size:0.9rem">Checklist:</h4>${checks}</div>` : ""}
          </div>
        </div>
        <div id="exercise-feedback"></div>
      </div>
    `;
  },

  _renderCodeEditor(slide) {
    // Free code editor, no mandatory validation
    if (this._isJSTrack()) {
      return `
      <div class="exercise-code-editor">
        <div class="exercise-question">${this.richText(slide.instruction || "Tulis kode JavaScript kamu di bawah:")}</div>
        <div class="challenge-layout">
          ${this._renderJSEditorPanel(slide, "180px")}
          ${this._renderJSPreviewPanel()}
        </div>
        <div id="exercise-feedback"></div>
      </div>
    `;
    }
    const code = slide.starterCode || slide.code || "";
    return `
      <div class="exercise-code-editor">
        <div class="exercise-question">${this.richText(slide.instruction || "Tulis kode HTML kamu di bawah:")}</div>
        <div class="challenge-layout">
          <div class="editor-panel">
            <div class="editor-toolbar">
              <span class="editor-lang-badge">${this._langBadge()}</span>
              <div class="editor-actions">
                <button class="btn btn-primary btn-sm" onclick="Editor.runCurrent('chal-editor', 'chal-preview')">▶ Run</button>
              </div>
            </div>
            <div class="code-editor-wrapper">
              <div class="line-numbers" id="chal-line-numbers">1</div>
              <textarea id="chal-editor" class="code-editor-textarea" spellcheck="false" autocorrect="off" style="min-height:180px">${this._escapeHtml(code)}</textarea>
            </div>
          </div>
          <div class="preview-panel">
            <div class="editor-toolbar">
              <span class="editor-lang-badge">Preview</span>
            </div>
            <iframe id="chal-preview" class="preview-iframe" sandbox="allow-scripts allow-modals"></iframe>
          </div>
        </div>
        <div id="exercise-feedback"></div>
      </div>
    `;
  },

  _attachListeners(slide, container) {
    switch (slide.type) {
      case "multiple-choice":
        container.querySelectorAll(".mc-option").forEach((opt) => {
          opt.addEventListener("click", () => {
            container.querySelectorAll(".mc-option").forEach((o) => {
              o.style.background = "var(--pk-white)";
              o.style.borderColor = "var(--pk-border)";
              o.classList.remove("mc-selected");
            });
            opt.style.background = "var(--pk-blue-light)";
            opt.style.borderColor = "var(--pk-blue)";
            opt.classList.add("mc-selected");
            this.currentAnswer = parseInt(opt.getAttribute("data-index"));
          });
        });
        break;

      case "fill-code": {
        const inp = container.querySelector("#fill-input");
        if (inp) {
          inp.addEventListener("input", () => {
            this.currentAnswer = inp.value;
          });
          inp.focus();
        }
        break;
      }

      case "drag-drop":
        this._initDragDrop(container);
        break;

      case "fix-code": {
        const ta = container.querySelector("#fix-editor");
        if (ta) {
          Editor.enhance("fix-editor", {
            mode: this._isJSTrack() ? "javascript" : "htmlmixed",
          });
          // Fallback (no CodeMirror): manual line numbers + tab
          if (!Editor._cmById["fix-editor"]) {
            Editor.updateLineNumbers("fix-editor", "fix-line-numbers");
            ta.addEventListener("input", () =>
              Editor.updateLineNumbers("fix-editor", "fix-line-numbers"),
            );
            ta.addEventListener("keydown", (e) => {
              if (e.key === "Tab") {
                e.preventDefault();
                const s = ta.selectionStart;
                ta.value =
                  ta.value.substring(0, s) +
                  "  " +
                  ta.value.substring(ta.selectionEnd);
                ta.selectionStart = ta.selectionEnd = s + 2;
                Editor.updateLineNumbers("fix-editor", "fix-line-numbers");
              }
            });
          }
        }
        break;
      }

      case "challenge":
      case "mini-project":
      case "code-editor": {
        // Jalur JavaScript: editor bertab script.js / index.html, auto-run via sandbox
        if (this._isJSTrack()) {
          const taJS = container.querySelector("#chal-editor");
          if (taJS) {
            const cmJS = Editor.enhance("chal-editor", {
              mode: "javascript",
              onRun: () => Editor.runJS("chal-editor", "chal-preview"),
            });
            if (!cmJS) {
              Editor.updateLineNumbers("chal-editor", "chal-line-numbers");
              taJS.addEventListener("input", () =>
                Editor.updateLineNumbers("chal-editor", "chal-line-numbers"),
              );
              taJS.addEventListener("keydown", (e) => {
                if (e.key === "Tab") {
                  e.preventDefault();
                  const s = taJS.selectionStart;
                  taJS.value =
                    taJS.value.substring(0, s) +
                    "  " +
                    taJS.value.substring(taJS.selectionEnd);
                  taJS.selectionStart = taJS.selectionEnd = s + 2;
                  Editor.updateLineNumbers("chal-editor", "chal-line-numbers");
                }
              });
            }
            const taHTML = container.querySelector("#chal-editor-html");
            if (taHTML) {
              const cmHTML = Editor.enhance("chal-editor-html", {
                mode: "htmlmixed",
              });
              if (!cmHTML) {
                Editor.updateLineNumbers(
                  "chal-editor-html",
                  "chal-html-line-numbers",
                );
                taHTML.addEventListener("input", () =>
                  Editor.updateLineNumbers(
                    "chal-editor-html",
                    "chal-html-line-numbers",
                  ),
                );
              }
              container.querySelectorAll(".editor-file-tab").forEach((tab) => {
                tab.addEventListener("click", () => {
                  container
                    .querySelectorAll(".editor-file-tab")
                    .forEach((t) => {
                      const active = t === tab;
                      t.classList.toggle("is-active", active);
                      t.setAttribute(
                        "aria-selected",
                        active ? "true" : "false",
                      );
                    });
                  const target = tab.dataset.editorTab;
                  container
                    .querySelectorAll(".code-editor-wrapper[data-pane]")
                    .forEach((pane) => {
                      pane.style.display =
                        pane.dataset.pane === target ? "" : "none";
                    });
                  const cmActive =
                    target === "js"
                      ? Editor._cmById["chal-editor"]
                      : Editor._cmById["chal-editor-html"];
                  if (cmActive && cmActive.refresh)
                    requestAnimationFrame(() => cmActive.refresh());
                });
              });
            }
            // Auto-run kode awal agar konsol langsung terlihat
            if (slide.starterCode) {
              setTimeout(
                () => Editor.runJS("chal-editor", "chal-preview"),
                120,
              );
            }
          }
          break;
        }
        const ta = container.querySelector("#chal-editor");
        if (ta) {
          const cm = Editor.enhance("chal-editor", {
            onRun: () =>
              Editor.runPreview(Editor.getCode("chal-editor"), "chal-preview"),
          });
          // Fallback (no CodeMirror): keep manual line numbers + tab handling
          if (!cm) {
            Editor.updateLineNumbers("chal-editor", "chal-line-numbers");
            ta.addEventListener("input", () =>
              Editor.updateLineNumbers("chal-editor", "chal-line-numbers"),
            );
            ta.addEventListener("keydown", (e) => {
              if (e.key === "Tab") {
                e.preventDefault();
                const s = ta.selectionStart;
                ta.value =
                  ta.value.substring(0, s) +
                  "  " +
                  ta.value.substring(ta.selectionEnd);
                ta.selectionStart = ta.selectionEnd = s + 2;
                Editor.updateLineNumbers("chal-editor", "chal-line-numbers");
              }
            });
          }
          // Auto-run starter code (raw code stays identical in preview)
          if (slide.starterCode || slide.code) {
            setTimeout(
              () =>
                Editor.runPreview(
                  Editor.getCode("chal-editor"),
                  "chal-preview",
                ),
              100,
            );
          }
        }
        break;
      }
    }
  },

  _initDragDrop(container) {
    const zone = container.querySelector("#drop-zone");
    if (!zone) return;

    // Update answer from current order
    const updateAnswer = () => {
      this.currentAnswer = Array.from(zone.querySelectorAll(".drag-token")).map(
        (t) => t.getAttribute("data-val"),
      );
    };

    // Mouse drag & drop
    let dragged = null;
    container.querySelectorAll(".drag-token").forEach((token) => {
      token.addEventListener("dragstart", (e) => {
        dragged = token;
        token.classList.add("dragging");
        token.style.opacity = "0.5";
        e.dataTransfer.effectAllowed = "move";
      });
      token.addEventListener("dragend", () => {
        token.classList.remove("dragging");
        token.style.opacity = "";
        dragged = null;
      });
    });

    zone.addEventListener("dragover", (e) => {
      e.preventDefault();
      const afterEl = this._getDragAfterEl(zone, e.clientY);
      if (dragged) {
        if (afterEl == null) {
          zone.appendChild(dragged);
        } else {
          zone.insertBefore(dragged, afterEl);
        }
      }
      updateAnswer();
    });

    // Mobile up/down buttons.
    // Bound to the zone (re-created on every render) — binding to the long-lived lesson
    // container leaked one stale listener per drag-drop slide, which threw
    // "insertBefore ... not a child of this node" on the next ↑/↓ click.
    zone.addEventListener("click", (e) => {
      const btn = e.target.closest(".drag-mobile-btn");
      if (!btn) return;
      const token = btn.closest(".drag-token");
      if (!token) return;

      if (btn.classList.contains("drag-up")) {
        const prev = token.previousElementSibling;
        if (prev) zone.insertBefore(token, prev);
      } else if (btn.classList.contains("drag-down")) {
        const next = token.nextElementSibling;
        if (next) zone.insertBefore(next, token);
      }
      updateAnswer();
    });

    // Initialize answer with current order
    updateAnswer();
  },

  _getDragAfterEl(container, y) {
    const els = [...container.querySelectorAll(".drag-token:not(.dragging)")];
    return els.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset, el: child };
        }
        return closest;
      },
      { offset: Number.NEGATIVE_INFINITY },
    ).el;
  },

  check() {
    if (this._isChecking) return null;
    this._isChecking = true;

    let result = { correct: false, explanation: "Jawaban salah. Coba lagi!" };

    try {
      switch (this.currentSlide.type) {
        case "multiple-choice":
          result = this._checkMC();
          break;
        case "fill-code":
          result = this._checkFill();
          break;
        case "drag-drop":
          result = this._checkDrag();
          break;
        case "fix-code":
          result = this._checkFix();
          break;
        case "challenge":
          result = this._checkChallenge();
          break;
        case "mini-project":
          result = this._checkProject();
          break;
        case "code-editor":
          result = { correct: true, explanation: "👍 Latihan selesai!" };
          break;
      }
    } catch (err) {
      console.error("Check error:", err);
      result = {
        correct: false,
        explanation: "Terjadi kesalahan saat memeriksa.",
      };
    }

    // Jalur JavaScript mengembalikan Promise (validasi menunggu eksekusi sandbox).
    if (result && typeof result.then === "function") {
      return Promise.resolve(result).then(
        (res) => {
          setTimeout(() => {
            this._isChecking = false;
          }, 600);
          return res;
        },
        (err) => {
          console.error("Check error:", err);
          setTimeout(() => {
            this._isChecking = false;
          }, 600);
          return {
            correct: false,
            explanation: "Terjadi kesalahan saat memeriksa.",
          };
        },
      );
    }

    setTimeout(() => {
      this._isChecking = false;
    }, 600);
    return result;
  },

  _checkMC() {
    if (this.currentAnswer === null || this.currentAnswer === undefined) {
      return {
        correct: false,
        explanation: "⚠️ Pilih salah satu jawaban terlebih dahulu.",
      };
    }
    const correct = this.currentAnswer === this.currentSlide.answer;
    const exp =
      this.currentSlide.explanation ||
      (correct ? "✓ Tepat sekali!" : "✗ Belum tepat, coba lagi!");
    return { correct, explanation: correct ? `✓ ${exp}` : `✗ ${exp}` };
  },

  _checkFill() {
    const inp = document.getElementById("fill-input");
    const val = inp ? inp.value.trim() : this.currentAnswer || "";
    if (!val)
      return {
        correct: false,
        explanation: "⚠️ Isi bagian yang kosong terlebih dahulu.",
      };
    const correct =
      val.toLowerCase() ===
      String(this.currentSlide.answer).trim().toLowerCase();
    const exp = this.currentSlide.explanation || "";
    return {
      correct,
      explanation: correct ? `✓ Benar! ${exp}` : `✗ Belum tepat. ${exp}`,
    };
  },

  _checkDrag() {
    if (!this.currentAnswer || this.currentAnswer.length === 0) {
      // Try reading from DOM
      const zone = document.getElementById("drop-zone");
      if (zone) {
        this.currentAnswer = Array.from(
          zone.querySelectorAll(".drag-token"),
        ).map((t) => t.getAttribute("data-val"));
      }
    }
    if (
      !this.currentAnswer ||
      this.currentAnswer.length !== this.currentSlide.answer.length
    ) {
      return {
        correct: false,
        explanation: "⚠️ Pastikan semua token sudah tersusun.",
      };
    }
    const correct =
      JSON.stringify(this.currentAnswer) ===
      JSON.stringify(this.currentSlide.answer);
    return {
      correct,
      explanation: correct
        ? "✓ Urutan kode benar!"
        : "✗ Urutannya belum tepat. Coba lagi!",
    };
  },

  _checkFix() {
    const code = Editor.getCode("fix-editor").trim();
    if (!code)
      return {
        correct: false,
        explanation: "⚠️ Tulis kode yang sudah diperbaiki.",
      };

    // Jalur JavaScript: rule js/output/dom → pemeriksa JS (statis + eksekusi sandbox)
    const r = this.currentSlide.rules || {};
    if (
      this._isJSTrack() &&
      this.currentSlide.rules &&
      (r.js || r.output || r.dom)
    ) {
      return this._checkJSCode(code, null);
    }

    // Use the reusable validator when strict rules are defined on the slide
    if (this.currentSlide.rules && window.Validator) {
      const res = window.Validator.validateCode(code, this.currentSlide.rules);
      if (res.success) {
        return {
          correct: true,
          explanation: `✓ Berhasil! ${this.currentSlide.explanation || "Kode sudah benar."}`,
        };
      }
      return { correct: false, explanation: res.errors.join(" ") };
    }

    const doc = this._parseHTML(code);

    if (this.currentSlide.checkTag) {
      const el = doc.querySelector(this.currentSlide.checkTag);
      if (el)
        return {
          correct: true,
          explanation: `✓ Berhasil! Tag <${this.currentSlide.checkTag}> sudah benar.`,
        };
      return {
        correct: false,
        explanation: `✗ Tag <${this.currentSlide.checkTag}> belum benar. Periksa tag pembuka dan penutupnya.`,
      };
    }
    return { correct: true, explanation: "✓ Kode terlihat benar!" };
  },

  _checkChallenge() {
    // Jalur JavaScript: kode JS murni (atau dokumen DOM) diperiksa via js-checker + sandbox
    if (this._isJSTrack()) {
      const files = this._getJSFiles();
      const js = (files.js || "").trim();
      if (!js || !this._stripJSComments(js)) {
        return {
          correct: false,
          explanation: "⚠️ Tulis kode JavaScript terlebih dahulu.",
        };
      }
      return this._checkJSCode(files.js, files.html);
    }

    const code = Editor.getCode("chal-editor").trim();
    if (!code)
      return { correct: false, explanation: "⚠️ Tulis kode terlebih dahulu." };

    // Strip only comments so placeholder hints in starter code don't count as content
    const stripped = code.replace(/<!--[\s\S]*?-->/g, "");
    if (
      !stripped.replace(/<[^>]*>/g, "").trim() &&
      !stripped.match(/<(?!!--)[a-zA-Z]/)
    ) {
      return { correct: false, explanation: "⚠️ Tulis kode terlebih dahulu." };
    }

    let result;
    if (this.currentSlide.rules && window.Validator) {
      result = window.Validator.validateCode(stripped, this.currentSlide.rules);
      result.correct = result.success;
    } else {
      // Legacy fallback (backwards compatible)
      const doc = this._parseHTML(stripped);
      result = { correct: true, errors: [], passed: [], hints: [] };
      if (this.currentSlide.requiredTags) {
        for (const tag of this.currentSlide.requiredTags) {
          if (!doc.querySelector(tag)) {
            result.correct = false;
            result.errors.push(
              `Tag <${tag}> belum ada. Tambahkan ke kode kamu.`,
            );
          } else {
            result.passed.push(`Element <${tag}> sudah dibuat.`);
          }
        }
      }
      if (this.currentSlide.requiredText) {
        const bodyText = doc.body ? doc.body.textContent : doc.textContent;
        if (!bodyText.includes(this.currentSlide.requiredText)) {
          result.correct = false;
          result.errors.push(
            `Teks "${this.currentSlide.requiredText}" belum ada.`,
          );
        } else {
          result.passed.push(
            `Teks "${this.currentSlide.requiredText}" sudah ada.`,
          );
        }
      }
    }

    if (!result.correct) {
      this._hintAttempt++;
    }
    this._lastResult = result;

    if (result.correct) {
      return {
        correct: true,
        explanation: this.currentSlide.explanation
          ? `✓ ${this.currentSlide.explanation}`
          : "✓ Berhasil! Kode kamu sudah benar.",
      };
    }

    // Build rich failure explanation: errors + progressive hint
    // Validator messages quote tags literally (e.g. "Tag <h1> belum ditemukan"), so each one
    // is escaped before the <br>/<em> layout markup is added.
    const msgs = result.errors
      .slice(0, 3)
      .map((e) => `❌ ${this._escapeHtml(e)}`)
      .join("<br>");
    const hints = result.hints || [];
    const hint = hints[Math.min(this._hintAttempt - 1, hints.length - 1)];
    const hintMsg = hint
      ? `<br><br>💡 <em>Hint:</em> ${this._escapeHtml(hint)}`
      : "";
    return { correct: false, explanation: msgs + hintMsg, _rich: true };
  },

  _checkProject() {
    // Jalur JavaScript: checklist dievaluasi terhadap hasil DOM PASCA-EKSEKUSI di sandbox
    if (this._isJSTrack()) {
      return this._checkProjectJS();
    }

    const code = Editor.getCode("chal-editor").trim();
    if (!code)
      return {
        correct: false,
        explanation: "⚠️ Tulis kode project kamu terlebih dahulu.",
      };

    const stripped = code.replace(/<!--[\s\S]*?-->/g, "");
    const doc = this._parseHTML(stripped);

    const checkItems = this.currentSlide.checkItems || [];
    // Helper CSS (cascade + inheritance) untuk checkStr di Jalur CSS: css.is('h1','color','red'), dst.
    const cssHelper = window.CSSCheck ? window.CSSCheck.create(doc) : null;
    let allPassed = true;
    let failedLabels = [];

    for (const item of checkItems) {
      let passed = false;
      try {
        if (item.checkStr) {
          const fn = new Function("doc", "css", `return (${item.checkStr});`);
          passed = fn(doc, cssHelper);
        } else if (item.selector) {
          passed = !!doc.querySelector(item.selector);
        }
      } catch (e) {
        passed = false;
      }

      const checkEl = document.getElementById(`check-${item.id}`);
      if (checkEl) {
        const icon = checkEl.querySelector(".check-icon");
        if (icon) icon.textContent = passed ? "✅" : "○";
        checkEl.style.color = passed ? "var(--pk-success)" : "";
      }

      if (!passed) {
        allPassed = false;
        failedLabels.push(item.label);
      }
    }

    if (allPassed) {
      return {
        correct: true,
        explanation: "🎉 Project berhasil! Semua checklist terpenuhi.",
      };
    }
    const shown = failedLabels
      .slice(0, 3)
      .map((l) => `❌ ${this._escapeHtml(l)}`)
      .join("<br>");
    const more =
      failedLabels.length > 3
        ? `<br>❌ …dan ${failedLabels.length - 3} lainnya`
        : "";
    return {
      correct: false,
      explanation: `Belum lengkap:<br>${shown}${more}`,
      _rich: true,
    };
  },

  /** Mini-project Jalur JS: rule statis (opsional) + checklist DOM pasca-eksekusi sandbox. */
  async _checkProjectJS() {
    const files = this._getJSFiles();
    const js = (files.js || "").trim();
    if (!js)
      return {
        correct: false,
        explanation: "⚠️ Tulis kode project kamu terlebih dahulu.",
      };

    const slide = this.currentSlide;
    const checkItems = slide.checkItems || [];
    const checks = checkItems.map((it) => it.checkStr || "false");

    // Rule statis opsional (slide.rules.js) — struktur kode, deklarasi, dsb.
    if (slide.rules && Array.isArray(slide.rules.js) && window.JSCheck) {
      const staticRes = window.JSCheck.checkStatic(files.js, slide.rules.js);
      if (staticRes.errors.length) {
        this._hintAttempt++;
        return {
          correct: false,
          explanation: this._buildJSHints(staticRes),
          _rich: true,
        };
      }
    }

    let run;
    try {
      run = await window.Sandbox.runForValidation(files.js, {
        html: files.html || "",
        checks,
      });
    } catch (err) {
      console.error("Check error:", err);
      return {
        correct: false,
        explanation: "Terjadi kesalahan saat memeriksa.",
      };
    }

    if (run.status === "error") {
      return {
        correct: false,
        explanation: `❌ Kode kamu menghasilkan error: ${this._escapeHtml(run.error || "tidak diketahui")}`,
      };
    }

    const failedLabels = [];
    checkItems.forEach((item, i) => {
      const passed = run.checkResults && run.checkResults[i] === true;
      const checkEl = document.getElementById(`check-${item.id}`);
      if (checkEl) {
        const icon = checkEl.querySelector(".check-icon");
        if (icon) icon.textContent = passed ? "✅" : "○";
        checkEl.style.color = passed ? "var(--pk-success)" : "";
      }
      if (!passed) failedLabels.push(item.label);
    });

    if (failedLabels.length === 0) {
      return {
        correct: true,
        explanation: "🎉 Project berhasil! Semua checklist terpenuhi.",
      };
    }
    const shown = failedLabels
      .slice(0, 3)
      .map((l) => `❌ ${this._escapeHtml(l)}`)
      .join("<br>");
    const more =
      failedLabels.length > 3
        ? `<br>❌ …dan ${failedLabels.length - 3} lainnya`
        : "";
    return {
      correct: false,
      explanation: `Belum lengkap:<br>${shown}${more}`,
      _rich: true,
    };
  },

  _parseHTML(code) {
    const parser = new DOMParser();
    return parser.parseFromString(code, "text/html");
  },

  showFeedback(container, correct, explanation, isRich) {
    let fb = container.querySelector("#exercise-feedback");
    if (!fb) {
      fb = document.createElement("div");
      fb.id = "exercise-feedback";
      container.appendChild(fb);
    }

    const bg = correct ? "var(--pk-success-light)" : "var(--pk-error-light)";
    const border = correct ? "var(--pk-success)" : "var(--pk-error)";
    const color = correct ? "var(--pk-success)" : "var(--pk-error)";

    // Rich explanations are built from trusted templates (validator messages + slide
    // definitions); they may contain <br> / <em> markers for multi-line feedback.
    const body = isRich ? explanation : this._escapeHtml(explanation);

    fb.innerHTML = `
      <div style="background:${bg};border:2px solid ${border};color:${color};padding:1rem;border-radius:var(--pk-radius);margin-top:1rem;display:flex;align-items:flex-start;gap:0.75rem;font-weight:500">
        <span style="font-size:1.3rem;flex-shrink:0">${correct ? "🎉" : "💡"}</span>
        <span>${body}</span>
      </div>
    `;
    fb.scrollIntoView({ behavior: "smooth", block: "nearest" });
  },
};
