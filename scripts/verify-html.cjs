const fs = require("fs");

new Function(fs.readFileSync("routes.js", "utf8"));
const routesSource = fs.readFileSync("routes.js", "utf8");
if (!routesSource.includes('var origin = "O Freixo, Outes, A Coruña"')) {
  throw new Error("routes.js: expected O Freixo as route origin");
}

for (const file of ["index.html", "index-fr.html"]) {
  const html = fs.readFileSync(file, "utf8");
  const scripts = [...html.matchAll(/<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/g)];
  for (const script of scripts) new Function(script[1]);

  const days = (html.match(/class="day-plan"/g) || []).length;
  if (days !== 7) throw new Error(`${file}: expected 7 itinerary days, found ${days}`);
  if (!html.includes('<script src="routes.js"></script>')) {
    throw new Error(`${file}: routes.js is not loaded`);
  }
  if (!html.includes("O Freixo") || html.includes("Pedrafigueira")) {
    throw new Error(`${file}: accommodation base is not updated`);
  }
  console.log(`${file}: OK`);
}
