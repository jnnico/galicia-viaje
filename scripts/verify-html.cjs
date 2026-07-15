const fs = require("fs");

new Function(fs.readFileSync("routes.js", "utf8"));
const routesSource = fs.readFileSync("routes.js", "utf8");

if (!routesSource.includes('var origin = "O Freixo, Outes, A Coruña"')) {
  throw new Error("routes.js: expected O Freixo as the local route origin");
}
if ((routesSource.match(/\n {6}es: /g) || []).length !== 9) {
  throw new Error("routes.js: expected 9 dated routes from August 1 to 9");
}
if (!routesSource.includes("Aveiro, Portugal") || !routesSource.includes("Parque Municipal do Carballiño")) {
  throw new Error("routes.js: outbound and optional return stops are missing");
}
if (routesSource.indexOf("Domingo 2: Aveiro") > routesSource.indexOf("Lunes 3: Muros")) {
  throw new Error("routes.js: arrival through Catoira must precede the Monday plan");
}

for (const file of ["index.html", "index-fr.html"]) {
  const html = fs.readFileSync(file, "utf8");
  const scripts = [...html.matchAll(/<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/g)];
  for (const script of scripts) new Function(script[1]);

  const days = (html.match(/class="day-plan"/g) || []).length;
  if (days !== 9) throw new Error(`${file}: expected 9 itinerary stages, found ${days}`);
  if (!html.includes('<script src="routes.js"></script>')) {
    throw new Error(`${file}: routes.js is not loaded`);
  }
  if (!html.includes("O Freixo") || !html.includes("Aveiro") || html.includes("Pedrafigueira")) {
    throw new Error(`${file}: accommodation or outbound route is not updated`);
  }
  if (!html.includes("Mercado das Rutas do Mar") || !html.includes("O Carballiño")) {
    throw new Error(`${file}: Muxía market or optional Festa do Pulpo is missing`);
  }
  const dateRange = file === "index.html" ? "domingo 2 al domingo 9" : "dimanche 2 au dimanche 9";
  if (!html.includes(dateRange)) {
    throw new Error(`${file}: expected Galicia stay from August 2 to 9`);
  }
  console.log(`${file}: OK`);
}
