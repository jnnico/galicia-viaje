const fs = require("fs");

new Function(fs.readFileSync("routes.js", "utf8"));
const routesSource = fs.readFileSync("routes.js", "utf8");
if (!routesSource.includes('var origin = "O Freixo, Outes, A Coruña"')) {
  throw new Error("routes.js: expected O Freixo as route origin");
}
if ((routesSource.match(/\n\s+es: /g) || []).length !== 8 || !routesSource.includes("Parque Municipal do Carballiño")) {
  throw new Error("routes.js: expected 8 routes including Festa do Pulpo");
}

for (const file of ["index.html", "index-fr.html"]) {
  const html = fs.readFileSync(file, "utf8");
  const scripts = [...html.matchAll(/<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/g)];
  for (const script of scripts) new Function(script[1]);

  const days = (html.match(/class="day-plan"/g) || []).length;
  if (days !== 8) throw new Error(`${file}: expected 8 itinerary days, found ${days}`);
  if (!html.includes('<script src="routes.js"></script>')) {
    throw new Error(`${file}: routes.js is not loaded`);
  }
  if (!html.includes("O Freixo") || html.includes("Pedrafigueira")) {
    throw new Error(`${file}: accommodation base is not updated`);
  }
  if (!html.includes("O Carballiño") || !html.includes("8-9")) {
    throw new Error(`${file}: Festa do Pulpo day is not included`);
  }
  console.log(`${file}: OK`);
}
