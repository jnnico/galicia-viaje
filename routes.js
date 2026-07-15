(function () {
  var origin = "O Freixo, Outes, A Coruña";
  var pageUrl = "https://jnnico.github.io/galicia-viaje/#plan-dias";
  var isFrench = document.documentElement.lang === "fr";
  var routes = [
    {
      es: "Sábado 1: Don Benito a Aveiro",
      fr: "Samedi 1er : Don Benito vers Aveiro",
      origin: "Don Benito, Badajoz",
      waypoints: [],
      destination: "Aveiro, Portugal"
    },
    {
      es: "Domingo 2: Aveiro, Catoira y O Freixo",
      fr: "Dimanche 2 : Aveiro, Catoira et O Freixo",
      origin: "Aveiro, Portugal",
      waypoints: ["Catoira, Pontevedra"],
      destination: origin,
      alternatives: [{
        es: "Ruta directa Aveiro → O Freixo",
        fr: "Trajet direct Aveiro → O Freixo",
        origin: "Aveiro, Portugal",
        waypoints: [],
        destination: origin
      }]
    },
    {
      es: "Lunes 3: Muros, Louro, Lariño, Lira y Carnota",
      fr: "Lundi 3 : Muros, Louro, Lariño, Lira et Carnota",
      waypoints: ["Porto de Muros, A Coruña", "Praia de Louro, Muros", "Faro de Lariño, Carnota"],
      destination: "Hórreo de Carnota, A Coruña"
    },
    {
      es: "Martes 4: Ézaro, Cee y Corcubión",
      fr: "Mardi 4 : Ézaro, Cee et Corcubión",
      waypoints: ["Fervenza do Ézaro, Dumbría", "Miradoiro de Ézaro, Dumbría", "Cee, A Coruña"],
      destination: "Corcubión, A Coruña"
    },
    {
      es: "Miércoles 5: Vimianzo, Dombate, Cereixo, Camariñas y Cabo Vilán",
      fr: "Mercredi 5 : Vimianzo, Dombate, Cereixo, Camariñas et Cabo Vilán",
      waypoints: ["Castelo de Vimianzo", "Dolmen de Dombate, Cabana de Bergantiños", "Porto de Cereixo, Vimianzo"],
      destination: "Faro de Cabo Vilán, Camariñas"
    },
    {
      es: "Jueves 6: puerto de Portonovo para visitar Ons",
      fr: "Jeudi 6 : port de Portonovo pour visiter Ons",
      waypoints: ["Porto de Portonovo, Sanxenxo"],
      destination: origin
    },
    {
      es: "Viernes 7: A Pobra, A Curota, Rianxo y Hórreo do Araño",
      fr: "Vendredi 7 : A Pobra, A Curota, Rianxo et grenier d'O Araño",
      waypoints: ["A Pobra do Caramiñal", "Miradoiro da Curota, A Pobra do Caramiñal", "Hórreo do Araño, Rianxo"],
      destination: origin
    },
    {
      es: "Sábado 8: Muxía, costa de A Buitra y Faro Touriñán",
      fr: "Samedi 8 : Muxía, côte d'A Buitra et phare de Touriñán",
      waypoints: ["Muxía, A Coruña", "Santuario da Virxe da Barca, Muxía", "Praia de Lourido, Muxía", "Praia de Moreira, Muxía", "Faro de Cabo Touriñán, Muxía"],
      destination: origin,
      alternatives: [{
        es: "Tramo costero Muxía → Touriñán",
        fr: "Tronçon côtier Muxía → Touriñán",
        origin: "Muxía, A Coruña",
        waypoints: ["Praia de Lourido, Muxía", "Praia de Moreira, Muxía"],
        destination: "Faro de Cabo Touriñán, Muxía"
      }]
    },
    {
      es: "Domingo 9: regreso a Don Benito, O Carballiño opcional",
      fr: "Dimanche 9 : retour à Don Benito, O Carballiño en option",
      waypoints: [],
      destination: "Don Benito, Badajoz",
      alternatives: [{
        es: "Ruta por la Festa do Pulpo de O Carballiño",
        fr: "Trajet par la Festa do Pulpo d'O Carballiño",
        waypoints: ["Parque Municipal do Carballiño, Ourense"],
        destination: "Don Benito, Badajoz"
      }]
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
    (route.alternatives || []).forEach(function (alternative) {
      var alternativeUrl = buildMapsUrl(alternative);
      var alternativeLabel = isFrench ? alternative.fr : alternative.es;
      var alternativeLink = document.createElement("a");
      alternativeLink.className = "route-btn maps";
      alternativeLink.target = "_blank";
      alternativeLink.rel = "noopener noreferrer";
      alternativeLink.href = alternativeUrl;
      alternativeLink.textContent = alternativeLabel;
      alternativeLink.title = alternativeLabel;
      actions.insertBefore(alternativeLink, actions.querySelector(".whatsapp"));
      shareText += "\n\n" + alternativeLabel + ": " + alternativeUrl;
    });
    actions.querySelector(".whatsapp").href = "https://wa.me/?text=" + encodeURIComponent(shareText);
    dayPlan.querySelector("div:last-child").appendChild(actions);
  });

  var itinerary = document.getElementById("plan-dias");
  var intro = itinerary && itinerary.querySelector(":scope > .small");
  if (intro) {
    var fullShare = document.createElement("div");
    var fullText = isFrench
      ? "Voyage familial du 1er au 9 août, avec séjour en Galice du 2 au 9 :\n" + pageUrl
      : "Viaje familiar del 1 al 9 de agosto, con estancia en Galicia del 2 al 9:\n" + pageUrl;
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
      origin: route.origin || origin,
      destination: route.destination,
      travelmode: "driving"
    });
    if (route.waypoints.length) params.set("waypoints", route.waypoints.join("|"));
    return "https://www.google.com/maps/dir/?" + params.toString();
  }
})();
