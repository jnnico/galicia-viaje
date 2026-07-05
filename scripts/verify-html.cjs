const fs = require("fs");

for (const file of ["index.html", "index-fr.html"]) {
  const html = fs.readFileSync(file, "utf8");
  const scripts = [...html.matchAll(/<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/g)];
  for (const script of scripts) new Function(script[1]);

  const days = (html.match(/class="day-plan"/g) || []).length;
  if (days !== 7) throw new Error(`${file}: expected 7 itinerary days, found ${days}`);
  console.log(`${file}: OK`);
}
