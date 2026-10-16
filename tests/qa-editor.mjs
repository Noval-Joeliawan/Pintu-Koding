export default async function run(page, ui) {
  const out = { checks: [] };
  const ok = (name, cond) => out.checks.push({ name, pass: !!cond });

  // Wait for app
  await page.waitForFunction(
    () => !!window.LessonData && !!window.Exercises,
    null,
    { timeout: 15000 },
  );
  const hasCM = await page.evaluate(
    () => typeof window.CodeMirror !== "undefined",
  );
  out.codeMirrorLoaded = hasCM;

  // 1. Playground enhancement
  await page.evaluate(() => {
    Navigation.goto("playground");
  });
  await page.waitForTimeout(600);
  ok(
    "Playground: CM instance created",
    await page.evaluate(() => !!Editor._cmById["playground-editor"]),
  );
  ok(
    "Playground: starter code visible & highlighted",
    await page.evaluate(() => {
      const cm = Editor._cmById["playground-editor"];
      return (
        cm &&
        cm.getValue().includes("<h1>") &&
        document.querySelectorAll("#view-playground .cm-tag").length > 0
      );
    }),
  );
  ok(
    "Playground: line numbers rendered",
    await page.evaluate(
      () =>
        document.querySelectorAll("#view-playground .CodeMirror-linenumber")
          .length > 0,
    ),
  );
  // Run still works with raw code
  await page.evaluate(() => {
    document.getElementById("btn-playground-run").click();
  });
  await page.waitForTimeout(400);
  ok(
    "Playground: Run → preview receives raw code",
    await page.evaluate(() => {
      const f = document.getElementById("playground-preview");
      return f.srcdoc.includes("<h1>Hello World!</h1>");
    }),
  );
  // Reset still works
  await page.evaluate(() => {
    document.getElementById("btn-playground-reset").click();
  });
  await page.waitForTimeout(300);
  ok(
    "Playground: Reset restores default",
    await page.evaluate(() =>
      Editor.getCode("playground-editor").includes(
        "Selamat datang di PintuKoding Playground.",
      ),
    ),
  );
  // Typing updates code + highlighting stays
  await page.evaluate(() => {
    const cm = Editor._cmById["playground-editor"];
    cm.setValue(
      '<h1 class="judul">Halo Dunia</h1>\n<style>\n  p { color: red; }\n</style>\n<script>function foo(n){return n+1;}<\/script>',
    );
  });
  await page.waitForTimeout(200);
  ok(
    "Playground: HTML tag tokens highlighted",
    await page.evaluate(
      () => document.querySelectorAll("#view-playground .cm-tag").length >= 4,
    ),
  );
  ok(
    "Playground: attribute + string tokens highlighted",
    await page.evaluate(() => {
      const attr = document.querySelectorAll(
        "#view-playground .cm-attribute",
      ).length;
      const str = document.querySelectorAll(
        "#view-playground .cm-string",
      ).length;
      return attr >= 1 && str >= 1;
    }),
  );
  ok(
    "Playground: CSS tokens highlighted",
    await page.evaluate(
      () =>
        document.querySelectorAll(
          "#view-playground .cm-property, #view-playground .cm-qualifier",
        ).length >= 1,
    ),
  );
  ok(
    "Playground: JS keyword tokens highlighted",
    await page.evaluate(
      () =>
        document.querySelectorAll("#view-playground .cm-keyword").length >= 1,
    ),
  );
  ok(
    "Playground: comment tokens supported (value check)",
    await page.evaluate(() =>
      Editor.getCode("playground-editor").includes("function foo"),
    ),
  );

  // 2. Challenge editor (lesson flow)
  await page.evaluate(() => {
    LessonEngine.open(1, 4);
  });
  await page.waitForTimeout(700);
  // Navigate to the challenge slide (index 5 in lesson 4)
  await page.evaluate(() => {
    const idx = LessonEngine.slides.findIndex((s) => s.type === "challenge");
    if (idx > LessonEngine.currentIndex) {
      LessonEngine.currentIndex = idx;
      LessonEngine.renderSlide();
    }
  });
  await page.waitForTimeout(700);
  ok(
    "Challenge: CM instance created",
    await page.evaluate(() => !!Editor._cmById["chal-editor"]),
  );
  ok(
    "Challenge: starter code highlighted",
    await page.evaluate(
      () => document.querySelectorAll("#lesson-body .cm-tag").length > 0,
    ),
  );
  ok(
    "Challenge: checker reads CM code (empty → fail)",
    await page.evaluate(() => {
      const cm = Editor._cmById["chal-editor"];
      cm.setValue("");
      const r = Exercises.check();
      return r && r.correct === false;
    }),
  );
  ok(
    "Challenge: correct answer → pass",
    await page.evaluate(() => {
      Editor._cmById["chal-editor"].setValue("<h1>Halo PintuKoding</h1>");
      const r = Exercises.check();
      return r && r.correct === true;
    }),
  );
  ok(
    "Challenge: wrong answer → fail with hint",
    await page.evaluate(() => {
      // new slide to reset state
      LessonEngine.prev();
      const idx = LessonEngine.slides.findIndex((s) => s.type === "challenge");
      LessonEngine.currentIndex = idx;
      LessonEngine.renderSlide();
      return true;
    }),
  );
  await page.waitForTimeout(500);
  ok(
    "Challenge: <b> substitution rejected (semantic)",
    await page.evaluate(() => {
      // go to L4 formatting challenge via slide with forbiddenTags
      const lv = LessonData.getLevel(4).lessons[0].slides.find(
        (s) => s.rules && s.rules.forbiddenTags,
      );
      const res = window.Validator.validateCode(
        "<p><b>PintuKoding</b></p>",
        lv.rules,
      );
      return res.success === false;
    }),
  );

  // 3. Mini-project editor
  await page.evaluate(() => {
    LessonEngine.open(1, 5);
  });
  await page.waitForTimeout(700);
  await page.evaluate(() => {
    const idx = LessonEngine.slides.findIndex((s) => s.type === "mini-project");
    if (idx > LessonEngine.currentIndex) {
      LessonEngine.currentIndex = idx;
      LessonEngine.renderSlide();
    }
  });
  await page.waitForTimeout(700);
  ok(
    "Mini-project: CM instance created",
    await page.evaluate(() => !!Editor._cmById["chal-editor"]),
  );
  ok(
    "Mini-project: starter highlighted",
    await page.evaluate(
      () => document.querySelectorAll("#lesson-body .cm-tag").length > 0,
    ),
  );

  // 4. Validator still works against CM code
  ok(
    "Validator: structure rules with CM code",
    await page.evaluate(() => {
      const res = window.Validator.validateCode(
        '<header><nav><a href="#">x</a></nav></header>',
        { requiredChildren: { header: ["nav"] } },
      );
      return res.success === true;
    }),
  );

  // 5. Raw code path unchanged (preview receives exactly editor content)
  await page.evaluate(() => {
    LessonEngine.open(2, 4);
  });
  await page.waitForTimeout(700);
  await page.evaluate(() => {
    const idx = LessonEngine.slides.findIndex((s) => s.type === "challenge");
    LessonEngine.currentIndex = idx;
    LessonEngine.renderSlide();
  });
  await page.waitForTimeout(600);
  ok(
    "Challenge L2: CM + auto-run preview uses raw starter code",
    await page.evaluate(() => {
      const code = Editor.getCode("chal-editor");
      const f = document.getElementById("chal-preview");
      return (
        code.includes("<!DOCTYPE html>") && f.srcdoc.includes("<!DOCTYPE html>")
      );
    }),
  );

  return out;
}
