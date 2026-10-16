// src/js/editor/sandbox.js — Sandboxed Code Execution Module
(function () {
  'use strict';

  const DEFAULT_TIMEOUT_MS = 3000; // FR-1.3: Timeout maksimal 3.000 ms

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
      if (typeof window === 'undefined' || typeof document === 'undefined') {
        return Promise.resolve();
      }

      if (this._initPromise) return this._initPromise;

      window.removeEventListener('message', this._onMessage);
      window.addEventListener('message', this._onMessage);

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

      const iframe = document.createElement('iframe');
      iframe.id = 'pk-sandbox-runner';
      iframe.title = 'Pintu Koding Code Execution Sandbox';
      iframe.style.display = 'none';
      // FR-1.1: sandbox="allow-scripts" TANPA allow-same-origin (isolasi total dari localStorage & parent DOM)
      iframe.setAttribute('sandbox', 'allow-scripts');

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
        if (e.data && e.data.type === 'PK_SANDBOX_READY') {
          window.removeEventListener('message', readyHandler);
          if (onReady) onReady();
        }
      };
      window.addEventListener('message', readyHandler);

      // Fallback in case message is missed
      setTimeout(() => {
        window.removeEventListener('message', readyHandler);
        if (onReady) onReady();
      }, 300);
    }

    _handleMessage(event) {
      const data = event.data;
      if (!data || data.type !== 'PK_EXEC_RESULT' || !data.id) return;

      const pending = this._pendingRequests.get(data.id);
      if (pending) {
        this._pendingRequests.delete(data.id);
        clearTimeout(pending.timer);
        pending.resolve({
          status: data.status,
          output: data.output || '',
          executionTime: Number(data.executionTime) || 0
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

      const id = 'exec_' + (++this._seq) + '_' + Date.now();

      return new Promise((resolve) => {
        const timer = setTimeout(() => {
          this._pendingRequests.delete(id);
          // Kill stalled iframe to abort infinite loop
          this._setupIframe(() => {
            this._ready = true;
          });

          // FR-1.3 & FR-1.4: Standar error jika timeout terlampaui
          resolve({
            status: 'error',
            output: `Waktu eksekusi habis (Timeout > ${timeoutMs}ms). Periksa kemungkinan loop tak terbatas!`,
            executionTime: timeoutMs
          });
        }, timeoutMs);

        this._pendingRequests.set(id, { resolve, timer, startTime: Date.now() });

        try {
          if (this._iframe && this._iframe.contentWindow) {
            this._iframe.contentWindow.postMessage({
              type: 'PK_EXEC',
              id: id,
              code: code
            }, '*');
          } else {
            clearTimeout(timer);
            this._pendingRequests.delete(id);
            resolve({
              status: 'error',
              output: 'Sandbox iframe tidak tersedia.',
              executionTime: 0
            });
          }
        } catch (err) {
          clearTimeout(timer);
          this._pendingRequests.delete(id);
          resolve({
            status: 'error',
            output: 'Gagal mengirim kode ke sandbox: ' + err.message,
            executionTime: 0
          });
        }
      });
    }

    destroy() {
      window.removeEventListener('message', this._onMessage);
      if (this._iframe && this._iframe.parentNode) {
        this._iframe.parentNode.removeChild(this._iframe);
      }
      this._iframe = null;
      this._pendingRequests.clear();
      this._ready = false;
      this._initPromise = null;
    }
  }

  const Sandbox = new CodeSandbox();

  if (typeof window !== 'undefined') {
    window.Sandbox = Sandbox;
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Sandbox;
  }
})();
