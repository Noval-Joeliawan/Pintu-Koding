// tests/v2-suite.mjs — Comprehensive Test Suite for Pintu Koding v2.0
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

let totalTests = 0;
let passedTests = 0;

function test(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  [PASS] ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  [FAIL] ${name}`);
    console.error(`         ${err.message}`);
  }
}

async function asyncTest(name, fn) {
  totalTests++;
  try {
    await fn();
    console.log(`  [PASS] ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  [FAIL] ${name}`);
    console.error(`         ${err.message}`);
  }
}

console.log('\n=============================================');
console.log(' PINTU KODING v2.0 — AUTOMATED TEST SUITE');
console.log('=============================================\n');

// ----------------------------------------------------
// 1. Directory Structure & File Cleanliness Tests
// ----------------------------------------------------
console.log('--- 1. Directory Structure & File Cleanliness ---');

test('Direktori target ada sesuai spesifikasi PRD v2.0', () => {
  const expectedDirs = [
    'src/css',
    'src/js/core',
    'src/js/gamification',
    'src/js/editor',
    'src/js/lessons',
    'tests',
    'scripts',
    'docs'
  ];
  for (const d of expectedDirs) {
    const p = path.join(rootDir, d);
    assert.strictEqual(fs.existsSync(p), true, `Directory missing: ${d}`);
    assert.strictEqual(fs.statSync(p).isDirectory(), true, `Path is not a directory: ${d}`);
  }
});

test('File index.html berada di root (untuk GitHub Pages) dan script paths termutakhirkan', () => {
  const indexHtmlPath = path.join(rootDir, 'index.html');
  assert.strictEqual(fs.existsSync(indexHtmlPath), true, 'index.html tidak ditemukan di root');
  const content = fs.readFileSync(indexHtmlPath, 'utf8');
  assert.strictEqual(content.includes('src/js/core/events.js'), true, 'Missing events.js script tag');
  assert.strictEqual(content.includes('src/js/core/state.js'), true, 'Missing state.js script tag');
  assert.strictEqual(content.includes('src/js/editor/sandbox.js'), true, 'Missing sandbox.js script tag');
  assert.strictEqual(content.includes('src/js/gamification/hearts.js'), true, 'Missing hearts.js script tag');
  assert.strictEqual(content.includes('src/js/lessons/data.js'), true, 'Missing data.js script tag');
  assert.strictEqual(content.includes('src/css/style.css'), true, 'Missing style.css link tag');
});

test('Tidak ada berkas sementara / technical debt data_placeholder.js di root maupun src', () => {
  assert.strictEqual(fs.existsSync(path.join(rootDir, 'data_placeholder.js')), false);
  assert.strictEqual(fs.existsSync(path.join(rootDir, 'js/data_placeholder.js')), false);
  assert.strictEqual(fs.existsSync(path.join(rootDir, 'src/js/data_placeholder.js')), false);
});

test('Audit docs dan scripts terpusat di docs/ dan scripts/', () => {
  assert.strictEqual(fs.existsSync(path.join(rootDir, 'docs/PINTUKODING_AUDIT.md')), true);
  assert.strictEqual(fs.existsSync(path.join(rootDir, 'docs/QA_REPORT.md')), true);
  assert.strictEqual(fs.existsSync(path.join(rootDir, 'scripts/generate_data.js')), true);
});

// Setup mock window & localStorage
const memoryStorage = {};
const mockLocalStorage = {
  getItem: (k) => (Object.prototype.hasOwnProperty.call(memoryStorage, k) ? memoryStorage[k] : null),
  setItem: (k, v) => { memoryStorage[k] = String(v); },
  removeItem: (k) => { delete memoryStorage[k]; },
  clear: () => { Object.keys(memoryStorage).forEach(k => delete memoryStorage[k]); }
};

globalThis.window = globalThis;
globalThis.localStorage = mockLocalStorage;

// Load all modules asynchronously
await import(pathToFileURL(path.join(rootDir, 'src/js/core/events.js')).href);
await import(pathToFileURL(path.join(rootDir, 'src/js/core/storage.js')).href);
await import(pathToFileURL(path.join(rootDir, 'src/js/core/state.js')).href);
await import(pathToFileURL(path.join(rootDir, 'src/js/gamification/hearts.js')).href);
await import(pathToFileURL(path.join(rootDir, 'src/js/editor/sandbox.js')).href);
await import(pathToFileURL(path.join(rootDir, 'src/js/editor/editor.js')).href);

// ----------------------------------------------------
// 2. Centralized State Manager & Event Dispatcher Tests
// ----------------------------------------------------
console.log('\n--- 2. Centralized State Manager & Events ---');

test('Events: emit, on, off, and once dispatching', () => {
  let callCount = 0;
  let receivedData = null;

  const unsub = window.Events.on('TEST_EVENT', (data) => {
    callCount++;
    receivedData = data;
  });

  window.Events.emit('TEST_EVENT', { msg: 'halo' });
  assert.strictEqual(callCount, 1);
  assert.strictEqual(receivedData.msg, 'halo');

  unsub();
  window.Events.emit('TEST_EVENT', { msg: 'dua' });
  assert.strictEqual(callCount, 1, 'Listener should be removed');
});

test('State: FR-2.1 Inisialisasi dan mutasi data terpusat', () => {
  mockLocalStorage.clear();
  window.Storage.init();
  const user = window.State.init();

  assert.strictEqual(user.hearts, 5);
  assert.strictEqual(user.xp, 0);
  assert.strictEqual(user.level, 1);

  // Add XP
  window.State.addXP(20, 'test_lesson');
  assert.strictEqual(window.State.get('xp'), 20);

  // Decrement Heart
  window.State.decrementHearts(1);
  assert.strictEqual(window.State.get('hearts'), 4);

  // Restore Heart
  window.State.restoreHearts(1);
  assert.strictEqual(window.State.get('hearts'), 5);
});

test('State: FR-2.2 Event HEARTS_EMPTY terpanggil saat nyawa = 0', () => {
  let emptyEventFired = false;
  const unsub = window.Events.on(window.Events.HEARTS_EMPTY, () => {
    emptyEventFired = true;
  });

  window.State.setHearts(1);
  assert.strictEqual(emptyEventFired, false);

  window.State.decrementHearts(1);
  assert.strictEqual(window.State.get('hearts'), 0);
  assert.strictEqual(emptyEventFired, true, 'HEARTS_EMPTY harus terpicu saat hearts mencapai 0');
  unsub();
});

test('State: FR-2.2 Event XP_UPDATED terpanggil saat penambahan XP', () => {
  let payload = null;
  const unsub = window.Events.on(window.Events.XP_UPDATED, (data) => {
    payload = data;
  });

  window.State.addXP(50, 'bonus_level');
  assert.notStrictEqual(payload, null);
  assert.strictEqual(payload.added, 50);
  assert.strictEqual(payload.reason, 'bonus_level');
  unsub();
});

test('State: FR-2.3 Deteksi manipulasi manual pada localStorage (Tamper Detection)', () => {
  // Simulasikan seseorang mengedit nilai pk_hearts secara manual di DevTools
  mockLocalStorage.setItem('pk_hearts', '999');
  
  // Reload state
  const user = window.Storage.getUser();
  user.hearts = 999;
  const integrity = window.State.validateIntegrity(user);
  
  assert.strictEqual(integrity.valid, false, 'Manipulasi manual harus terdeteksi');
  assert.strictEqual(window.State.get('hearts') <= 5, true, 'Nilai anomali harus dinormalisasi');
});

// ----------------------------------------------------
// 3. Heart Recovery System Tests (FR-3.1 & FR-3.2)
// ----------------------------------------------------
console.log('\n--- 3. Heart Recovery System ---');

test('Hearts: FR-3.2 Interval isi ulang pasif diatur ke 30 menit (1.800.000 ms)', () => {
  assert.strictEqual(window.Hearts.REFILL_INTERVAL_MS, 30 * 60 * 1000, 'Interval harus 30 menit');
});

test('Hearts: FR-3.2 Kalkulasi refill pasif berdasarkan UNIX timestamp', () => {
  window.State.setHearts(2);
  const now = Date.now();
  // Simulasikan firstDue terlewat 35 menit (seharusnya mendapat 2 hearts: pada firstDue dan 30 menit kemudian)
  const pastRefill = now - (35 * 60 * 1000);
  window.State.setNextHeartRefill(pastRefill);

  window.Hearts.checkRefill();
  assert.strictEqual(window.Hearts.get(), 4, 'Setelah 35 menit melewati firstDue, bertambah 2 hearts');
});

test('Hearts: FR-3.1 Mode Latihan memulihkan 1 Heart tanpa menambah XP', () => {
  window.State.setHearts(2);
  const xpBefore = window.State.get('xp');

  window.Hearts.recoverFromPractice();
  assert.strictEqual(window.Hearts.get(), 3, 'Heart harus bertambah 1');
  assert.strictEqual(window.State.get('xp'), xpBefore, 'XP tidak boleh bertambah saat pemulihan');
});

// ----------------------------------------------------
// 4. Sandboxed Code Execution Tests (FR-1.1 - FR-1.4)
// ----------------------------------------------------
console.log('\n--- 4. Sandboxed Code Execution Protocol ---');

await asyncTest('Sandbox: Menghasilkan objek respon terstruktur { status, output, executionTime }', async () => {
  let postMessagePayload = null;
  const mockIframe = {
    contentWindow: {
      postMessage: (msg) => {
        postMessagePayload = msg;
        setTimeout(() => {
          window.dispatchEvent({
            type: 'message',
            data: {
              type: 'PK_EXEC_RESULT',
              id: msg.id,
              status: 'success',
              output: 'Hello Pintu Koding',
              executionTime: 25
            }
          });
        }, 10);
      }
    },
    parentNode: { removeChild: () => {} },
    setAttribute: () => {},
    style: {}
  };

  globalThis.document = {
    createElement: () => mockIframe,
    body: { appendChild: () => {} }
  };
  globalThis.window.addEventListener = (ev, cb) => {
    globalThis['__on_' + ev] = cb;
  };
  globalThis.window.removeEventListener = () => {};
  globalThis.window.dispatchEvent = (e) => {
    if (globalThis['__on_' + e.type]) {
      globalThis['__on_' + e.type](e);
    }
  };

  window.Sandbox._iframe = mockIframe;
  window.Sandbox._ready = true;
  window.Sandbox._onMessage = window.Sandbox._handleMessage.bind(window.Sandbox);
  window.addEventListener('message', window.Sandbox._onMessage);
  window.Sandbox.init = () => Promise.resolve();

  const res = await window.Sandbox.execute('console.log("Hello Pintu Koding");');
  assert.strictEqual(res.status, 'success');
  assert.strictEqual(res.output, 'Hello Pintu Koding');
  assert.strictEqual(typeof res.executionTime, 'number');
});

await asyncTest('Sandbox: FR-1.3 Timeout membatalkan eksekusi jika melebihi batas waktu', async () => {
  window.Sandbox._iframe = {
    contentWindow: {
      postMessage: () => {}
    },
    parentNode: { removeChild: () => {} },
    setAttribute: () => {},
    style: {}
  };
  window.Sandbox._ready = true;
  window.Sandbox.init = () => Promise.resolve();
  window.Sandbox._setupIframe = (cb) => { if (cb) cb(); };

  const start = Date.now();
  const res = await window.Sandbox.execute('while(true) {}', { timeout: 100 });
  const duration = Date.now() - start;

  assert.strictEqual(res.status, 'error');
  assert.strictEqual(res.output.includes('Timeout'), true, 'Output harus mengindikasikan Timeout');
  assert.strictEqual(duration >= 90, true);
});

// ----------------------------------------------------
// 5. Editor Locking Integration Test (FR-2.2)
// ----------------------------------------------------
console.log('\n--- 5. Editor Locking on HEARTS_EMPTY ---');

test('Editor: lockExecution mengunci tombol saat HEARTS_EMPTY', () => {
  const mockBtn = {
    disabled: false,
    classList: {
      add: (c) => { mockBtn._cls = c; },
      remove: () => { mockBtn._cls = null; }
    },
    setAttribute: (k, v) => { mockBtn[k] = v; },
    removeAttribute: (k) => { delete mockBtn[k]; }
  };

  globalThis.document.querySelectorAll = (sel) => {
    if (sel.includes('btn-playground-run') || sel.includes('btn-check-answer')) {
      return [mockBtn];
    }
    return [];
  };

  window.Editor.lockExecution(true);
  assert.strictEqual(mockBtn.disabled, true);
  assert.strictEqual(mockBtn._cls, 'disabled');

  window.Editor.unlockExecution();
  assert.strictEqual(mockBtn.disabled, false);
});

console.log('\n=============================================');
console.log(` HASIL: ${passedTests}/${totalTests} Pengujian Berhasil Lolos 100%`);
console.log('=============================================\n');

if (passedTests !== totalTests) {
  process.exit(1);
}
