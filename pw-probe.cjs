const { chromium } = require(process.env.PW_PATH);
(async () => {
  const b = await chromium.launch({ headless: true, channel: "chromium" });
  const p = await b.newPage();
  p.on("pageerror", e => console.log("[pageerror]", e.message));
  p.on("console", m => console.log("[console]", m.type(), m.text()));
  await p.goto("file:///C:/Users/Rafi%20AF/Downloads/pintukoding/pintukoding/js/data.js", { waitUntil: "load" });
  await p.waitForTimeout(1000);
  const state = await p.evaluate(() => ({
    data: typeof window.LessonData,
    body: document.body.textContent.slice(0, 150)
  }));
  console.log("STATE", JSON.stringify(state));
  await b.close();
})();
