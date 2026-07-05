(function () {
  var origin = "Pedrafigueira, Carnota, A Coruña";
  var pageUrl = "https://jnnico.github.io/galicia-viaje/#plan-dias";
  var isFrench = document.documentElement.lang === "fr";
  var routes = [
    {
      es: "Carnota, hórreo, Lira y Caldebarcos",
      fr: "Carnota, grenier, Lira et Caldebarcos",
      waypoints: ["Hórreo de Carnota, A Coruña", "Lira, Carnota, A Coruña", "Caldebarcos, Carnota, A Coruña"],
      destination: origin
    },
    {
      es: "Ézaro, Corcubión y Muxía",
      fr: "Ézaro, Corcubión et Muxía",
      waypoints: ["Fervenza do Ézaro, Dumbría", "Miradoiro de Ézaro, Dumbría", "Corcubión, A Coruña"],
      destination: "Santuario da Virxe da Barca, Muxía"
    },
    {
      es: "Louro y Muros",
      fr: "Louro et Muros",
      waypoints: ["Praia de Louro, Muros", "Porto de Muros, A Coruña"],
      destination: origin
    },
    {
      es: "Vimianzo, Dombate, Camariñas y Cabo Vilán",
      fr: "Vimianzo, Dombate, Camariñas et Cabo Vilán",
      waypoints: ["Castelo de Vimianzo", "Dolmen de Dombate, Cabana de Bergantiños", "Camariñas, A Coruña"],
      destination: "Faro de Cabo Vilán, Camariñas"
    },
    {
      es: "Puerto de Portonovo para visitar Ons",
      fr: "Port de Portonovo pour visiter Ons",
      waypoints: ["Porto de Portonovo, Sanxenxo"],
      destination: origin
    },
    {
      es: "Noia, A Pobra y A Curota",
      fr: "Noia, A Pobra et A Curota",
      waypoints: ["Noia, A Coruña", "A Pobra do Caramiñal", "Miradoiro da Curota, A Pobra do Caramiñal"],
      destination: origin
    },
    {
      es: "Romería Vikinga de Catoira",
      fr: "Fête viking de Catoira",
      waypoints: ["Torres de Oeste, Catoira"],
      destination: origin
    }
  ];

  var dayPlans = document.querySelectorAll("#plan-dias .day-plan");
  dayPlans.forEach(function (dayPlan, index) {
    var route = routes[index];
    if (!route) return;
    var mapsUrl = buildMapsUrl(route);
    var title = isFrench ? route.fr : route.es;
    var dayName = (isFrench ? "Jour " : "Día ") + (index + 1);
    var shareText = dayName + " - " + title
      + "\n\n" + (isFrench ? "Itinéraire Google Maps : " : "Ruta en Google Maps: ")
      + mapsUrl
      + "\n\n" + (isFrench ? "Programme complet : " : "Plan completo: ")
      + pageUrl;

    var actions = document.createElement("div");
    actions.className = "route-actions";
    actions.innerHTML =
      '<a class="route-btn maps" target="_blank" rel="noopener noreferrer">'
      + (isFrench ? "Ouvrir dans Google Maps" : "Abrir en Google Maps")
      + '</a><a class="route-btn whatsapp" target="_blank" rel="noopener noreferrer">'
      + (isFrench ? "Partager sur WhatsApp" : "Compartir por WhatsApp")
      + "</a>";
    actions.querySelector(".maps").href = mapsUrl;
    actions.querySelector(".whatsapp").href = "https://wa.me/?text=" + encodeURIComponent(shareText);
    dayPlan.querySelector("div:last-child").appendChild(actions);
  });

  var itinerary = document.getElementById("plan-dias");
  var intro = itinerary && itinerary.querySelector(":scope > .small");
  if (intro) {
    var fullShare = document.createElement("div");
    var fullText = isFrench
      ? "Programme familial de 7 jours en Galice depuis Pedrafigueira :\n" + pageUrl
      : "Plan familiar de 7 días en Galicia desde Pedrafigueira:\n" + pageUrl;
    fullShare.className = "share-all";
    fullShare.innerHTML = '<a class="route-btn whatsapp" target="_blank" rel="noopener noreferrer">'
      + (isFrench ? "Partager le programme complet" : "Compartir el plan completo")
      + "</a>";
    fullShare.querySelector("a").href = "https://wa.me/?text=" + encodeURIComponent(fullText);
    intro.insertAdjacentElement("afterend", fullShare);
  }

  function buildMapsUrl(route) {
    var params = new URLSearchParams({
      api: "1",
      origin: origin,
      destination: route.destination,
      travelmode: "driving"
    });
    if (route.waypoints.length) params.set("waypoints", route.waypoints.join("|"));
    return "https://www.google.com/maps/dir/?" + params.toString();
  }
})();
