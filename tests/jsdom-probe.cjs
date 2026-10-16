// html-parser check
const { JSDOM } = require("jsdom");
const html = `<!DOCTYPE html>
<html>
<head>
  <title>Website</title>
  <style>p { color: red; }</style>
</head>
<body>
  <h1>Hi</h1>
  <!-- comment -->
  <img src="x.png" alt="">
  <script>function foo() { return 42; }<\/script>
</body>
</html>`;
const d = new JSDOM(html).window.document;
console.log("title in head:", !!d.querySelector("head title"));
console.log("h1 in body:", !!d.querySelector("body h1"));
console.log("img:", !!d.querySelector("img"));
console.log("style in head:", !!d.querySelector("head style"));
console.log("script in body:", !!d.querySelector("body script"));
