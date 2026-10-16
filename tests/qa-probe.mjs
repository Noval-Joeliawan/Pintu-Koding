export default async function run(page, ui) {
  await page.evaluate(() => {
    localStorage.setItem('pk_onboarding_done', 'true');
    localStorage.setItem('pk_username', 'Tester');
    App._startApp();
  });
  await page.waitForTimeout(1500);
  await page.evaluate(() => { Navigation.goto('playground'); });
  await page.waitForTimeout(800);
  return await page.evaluate(() => ({
    cm: typeof CodeMirror,
    data: typeof LessonData,
    app: typeof App,
    cmInst: !!Editor._cmById['playground-editor'],
    tagTokens: document.querySelectorAll('#view-playground .cm-tag').length,
    lineNumbers: document.querySelectorAll('#view-playground .CodeMirror-linenumber').length
  }));
}
