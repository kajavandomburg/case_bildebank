// Bildebanken – klikkbar prototype

/* ---------- Tema (lys/mørk) ---------- */
function initTheme() {
  const root = document.documentElement;
  try {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") root.setAttribute("data-theme", "dark");
    else if (saved === "light") root.removeAttribute("data-theme");
  } catch (e) {}

  const toggle = document.getElementById("theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      const isDark = root.getAttribute("data-theme") === "dark";
      const next = isDark ? "light" : "dark";
      if (next === "dark") root.setAttribute("data-theme", "dark");
      else root.removeAttribute("data-theme");
      try {
        localStorage.setItem("theme", next);
      } catch (e) {}
    });
  }
}

/* ---------- Felles ---------- */
function showToast(message) {
  const toast = document.getElementById("toast");
  const msg = document.getElementById("toast-msg");
  if (!toast || !msg) return;
  msg.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast._t);
  showToast._t = window.setTimeout(() => toast.classList.remove("is-visible"), 2400);
}

/* Eksempelbilder fra Assets-mappa (sport) */
const IMG_SPORT = "Assets/K83Y1iTxWpqkzrPEq3XOigUQHZ1o1wRWf2-6cj6-jMvg.jpg";
const IMG_BYTTE = "Assets/S_xQ2-fKXm7ZBEZiygPLWwCHRGTZ45WtkVRdGZebVhog.jpg";
const IMG_HONNOR = "Assets/uyJFT4tphscPjWjQ4SQFUwJggmx7m6mbeu-QmoRpV_HQ.jpg";
const IMG_SKUFFELSE = "Assets/OgDsJdfyOEidN4aXea4UDQzJHEwaq0BT_aq4b2o0wAfQ.webp";
const IMG_DUELL = "Assets/SqI3eWffbv-B5EZB90pBHwbue_VhmAuhO8dUwfsVZfnQ.webp";

const TAGS_SPORT = "Sport,Fotball,Landslaget,Nyheter";

/* Statuser – ikon, etikett og fargeklasse for tydelig markering */
const ICON_CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>';
const ICON_WARN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>';
const ICON_LOCK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>';
const ICON_CLOCK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></svg>';

const STATUS = {
  godkjent: { label: "Godkjent for bruk", cls: "s-godkjent", icon: ICON_CHECK },
  begrenset: { label: "Begrenset bruk", cls: "s-begrenset", icon: ICON_WARN },
  ikke: { label: "Ikke klarert", cls: "s-ikke", icon: ICON_LOCK },
  tids: { label: "Tidsbegrenset", cls: "s-tids", icon: ICON_CLOCK },
};

/* Kort begrunnelse som vises under Restriksjoner på detaljsiden */
const REASONS = {
  begrenset: "Kan kun brukes redaksjonelt. Ikke til kommersiell bruk, forsider eller annonser.",
  ikke: "Rettighetene er ikke avklart med byrå/fotograf ennå. Må klareres før publisering.",
  tids: "Klarert for bruk til og med 30.06.2026. Rettighetene må fornyes etter denne datoen.",
};

/* Bildedata for oversikten – sportbilder med tittel, tags og status
   som matcher motivet. */
const IMAGES = [
  {
    title: "Kaptein takker landslagssjefen_foto-solberg_140426",
    source: "NTB", img: IMG_BYTTE, tags: "Sport,Fotball,Landslaget,Nyheter", status: "godkjent",
    photographer: "Ola Solberg", agency: "NTB", credit: "Foto: Ola Solberg / NTB",
    caption: "Kapteinen takker landslagssjefen etter avsluttet landskamp på Ullevaal.",
    persons: "Erling Braut Haaland, landslagssjef",
    consent: true, ai: false,
    alt: "Fotballspiller i rød drakt hilser en mann i dress på sidelinjen etter kamp.",
  },
  {
    title: "Spiss feirer med honnør_foto-pedersen_160426",
    source: "NTB", img: IMG_HONNOR, tags: "Sport,Fotball,Landslaget,Jubel", status: "godkjent",
    photographer: "Kari Pedersen", agency: "NTB", credit: "Foto: Kari Pedersen / NTB",
    caption: "Spissen gjør honnør mot publikum etter å ha satt inn 2–0-målet.",
    persons: "Landslagsspiller (ikke navngitt i bildetekst)",
    consent: null, ai: false,
    alt: "Fotballspiller med hendene over hodet feirer foran fullsatt tribune.",
  },
  {
    title: "Duell om ballen i landskamp_foto-haugen_150426",
    source: "NTB", img: IMG_DUELL, tags: "Sport,Fotball,Dueller,Nyheter", status: "tids",
    photographer: "Per Haugen", agency: "NTB", credit: "Foto: Per Haugen / NTB",
    caption: "To spillere i intens duell om ballen midt på banen under VM-kvalifisering.",
    persons: "To landslagsspillere",
    consent: true, ai: false,
    alt: "To fotballspillere i rød og hvit drakt kjemper om ballen i en tett duell.",
  },
  {
    title: "Skuffelse etter tap_foto-kone_130426",
    source: "Adobe Stock", img: IMG_SKUFFELSE, tags: "Sport,Fotball,Skuffelse", status: "begrenset",
    photographer: "Navn Navnesen", agency: "Adobe Stock", credit: "Foto: Navn Navnesen / Adobe Stock",
    price: "Fra 3500,-",
    caption: "Spiller viser tydelig skuffelse etter tap i sluttminuttene.",
    persons: "Fotballspiller (ikke identifisert)",
    consent: false, ai: true,
    alt: "",
  },
  {
    title: "Norge jubler etter scoring_foto-haaland_090426",
    source: "NTB", img: IMG_SPORT, tags: TAGS_SPORT, status: "godkjent",
    photographer: "Lars Haaland", agency: "NTB", credit: "Foto: Lars Haaland / NTB",
    caption: "Landslaget jubler samlet etter Haalands scoring i første omgang.",
    persons: "Erling Braut Haaland, landslagsspillere",
    consent: true, ai: false,
    alt: "Norges landslag i røde drakter feirer mål med armene i været på fotballbane.",
  },
  {
    title: "Landslaget feirer seier_foto-aaberg_120426",
    source: "NTB", img: IMG_HONNOR, tags: TAGS_SPORT, status: "godkjent",
    photographer: "Ingrid Åberg", agency: "NTB", credit: "Foto: Ingrid Åberg / NTB",
    caption: "Hele laget samles for å feire seieren etter sluttfløyta.",
    persons: "Landslagsspillere",
    consent: true, ai: false,
    alt: "Fotballspillere i røde drakter klemmer og feirer sammen midt på banen.",
  },
  {
    title: "Kaptein takker publikum_foto-holm_080426",
    source: "NRK", img: IMG_BYTTE, tags: TAGS_SPORT, status: "godkjent",
    photographer: "Erik Holm", agency: "NRK", credit: "Foto: Erik Holm / NRK",
    caption: "Kapteinen takker publikum med applaus etter kampen.",
    persons: "Landslagskaptein",
    consent: true, ai: false,
    alt: "Fotballspiller i rød drakt klapper mot tribunen etter kamp.",
  },
  {
    title: "Treningsøkt på Ullevaal_foto-bergen_050426",
    source: "NRK", img: IMG_SPORT, tags: "Sport,Fotball,Landslaget,Trening", status: "godkjent",
    photographer: "Silje Bergen", agency: "NRK", credit: "Foto: Silje Bergen / NRK",
    caption: "Landslaget gjennomfører treningsøkt på Ullevaal dagen før kamp.",
    persons: "Landslagsspillere",
    consent: true, ai: false,
    alt: "Fotballspillere i røde drakter trener på en grønn bane foran tribuner.",
  },
  {
    title: "Oppvarming før landskamp_foto-moen_060426",
    source: "NRK", img: IMG_DUELL, tags: "Sport,Fotball,Landslaget,Kamp", status: "godkjent",
    photographer: "Thomas Moen", agency: "NRK", credit: "Foto: Thomas Moen / NRK",
    caption: "Spillerne varmer opp på banen kort tid før avspark.",
    persons: "Landslagsspillere",
    consent: true, ai: false,
    alt: "To fotballspillere i røde drakter jogger og varmer opp på fotballbane.",
  },
  {
    title: "Jubel i spillertunnelen_foto-iversen_070426",
    source: "NRK", img: IMG_HONNOR, tags: "Sport,Fotball,Landslaget,Jubel", status: "godkjent",
    photographer: "Hanna Iversen", agency: "NRK", credit: "Foto: Hanna Iversen / NRK",
    caption: "Spillerne feirer i tunnelen etter å ha sikret avansement.",
    persons: "Landslagsspillere",
    consent: true, ai: false,
    alt: "Fotballspillere feirer med hendene i været inne i en mørk spillertunnel.",
  },
  {
    title: "TV-oppgjør i pausen_foto-lund_040426",
    source: "NRK", img: IMG_BYTTE, tags: "Sport,Fotball,Landslaget,Intervju", status: "tids",
    photographer: "Anders Lund", agency: "NRK", credit: "Foto: Anders Lund / NRK",
    caption: "Kampopplegg og intervju i pausen under direktesending fra landskamp.",
    persons: "Landslagsspiller, NRK-journalist",
    consent: true, ai: false,
    alt: "Fotballspiller snakker med journalist foran kamera på sidelinjen.",
  },
  {
    title: "Jubelscener på banen_foto-lie_090426",
    source: "NTB", img: IMG_SPORT, tags: TAGS_SPORT, status: "godkjent",
    photographer: "Marte Lie", agency: "NTB", credit: "Foto: Marte Lie / NTB",
    caption: "Jubelscener på banen da Norge sikret seg avansement.",
    persons: "Landslagsspillere",
    consent: true, ai: false,
    alt: "Flere fotballspillere løper og feirer sammen på grønn bane.",
  },
  {
    title: "Spillerne feirer (uklarert)_foto-strand_110426",
    source: "Adobe Stock", img: IMG_SPORT, tags: TAGS_SPORT, status: "begrenset",
    photographer: "Navn Navnesen", agency: "Adobe Stock", credit: "Foto: Navn Navnesen / Adobe Stock",
    price: "Fra 3500,-",
    caption: "Spillerne feirer etter scoring, men rettighetene er ikke avklart.",
    persons: "Fotballspillere (ukjent antall)",
    consent: null, ai: false,
    alt: "",
  },
  {
    title: "Landslagsspillerne i duell_foto-stock_100426",
    source: "Adobe Stock", img: IMG_DUELL, tags: "Sport,Fotball,Dueller", status: "begrenset",
    photographer: "Navn Navnesen", agency: "Adobe Stock", credit: "Foto: Navn Navnesen / Adobe Stock",
    price: "Fra 3500,-",
    caption: "To landslagsspillere i tett duell om ballen under kamp.",
    persons: "To landslagsspillere",
    consent: null, ai: false,
    alt: "",
  },
  {
    title: "Spillerne foran tribunen_foto-ruud_120426",
    source: "NTB", img: IMG_DUELL, tags: TAGS_SPORT, status: "godkjent",
    photographer: "Jon Ruud", agency: "NTB", credit: "Foto: Jon Ruud / NTB",
    caption: "Spillerne står foran tribunen og hilser supporterne etter kampen.",
    persons: "Landslagsspillere, publikum i bakgrunnen",
    consent: true, ai: false,
    alt: "Fotballspillere i røde drakter står på banen med publikum på tribunen bak.",
  },
];

const SOURCE_FILTERS = {
  nrk: (i) => i.source === "NRK",
  ntb: (i) => i.source === "NTB",
  stock: (i) => i.source === "Adobe Stock",
  uploads: (i) => i.source === "Opplasting",
};

const EMPTY_MESSAGES = {
  uploads: "Du har ikke lastet opp bilder ennå.",
  nrk: "Ingen NRK-bilder å vise med valgt filter.",
  ntb: "Ingen NTB-bilder å vise med valgt filter.",
  stock: "Ingen stock-bilder å vise med valgt filter.",
};

function isStockSource(source) {
  return source === "Adobe Stock";
}

function getActiveSource() {
  const active = document.querySelector("#source-tabs .tab.is-active");
  return active && active.dataset.source ? active.dataset.source : "nrk";
}

function getScope() {
  const active = document.querySelector("#rights-toggle .is-active");
  return active && active.dataset.rights ? active.dataset.rights : "alle";
}

function renderGrid() {
  const grid = document.getElementById("image-grid");
  if (!grid) return;

  const scope = getScope();
  const sourceKey = getActiveSource();
  const sourceFilter = SOURCE_FILTERS[sourceKey] || SOURCE_FILTERS.nrk;

  let items = IMAGES.filter(sourceFilter);
  if (scope === "godkjente") items = items.filter((i) => i.status === "godkjent");

  const info = document.getElementById("source-info");
  const empty = document.getElementById("empty-state");
  const emptyMsg = document.getElementById("empty-msg");
  const emptyCta = document.getElementById("empty-cta");

  if (info) info.hidden = sourceKey !== "stock";
  if (empty) empty.hidden = items.length > 0;
  if (emptyMsg) emptyMsg.textContent = EMPTY_MESSAGES[sourceKey] || "Ingen bilder å vise.";
  if (emptyCta) emptyCta.style.display = sourceKey === "uploads" ? "" : "none";
  grid.style.display = items.length > 0 ? "" : "none";

  grid.innerHTML = items
    .map((item) => {
      const st = STATUS[item.status] || STATUS.godkjent;
      const url =
        "detaljer.html?title=" +
        encodeURIComponent(item.title) +
        "&img=" +
        encodeURIComponent(item.img) +
        "&source=" +
        encodeURIComponent(item.source) +
        "&tags=" +
        encodeURIComponent(item.tags) +
        "&status=" +
        encodeURIComponent(item.status);
      const footer = item.price
        ? `<p class="card-price">${item.price}</p>`
        : `<p class="card-date">Lastet opp: 21. juni 2026</p>`;
      return `
      <a class="card ${st.cls}" href="${url}">
        <div class="card-thumb">
          <img src="${item.img}" alt="${item.title}" loading="lazy" />
        </div>
        <div class="card-body">
          <span class="status-tag ${st.cls}">${st.icon}<span>${st.label}</span></span>
          <p class="card-title">${item.title}</p>
          <div class="card-specs">
            <span>3500x2800px</span><span class="sep">·</span><span>PNG</span><span class="sep">·</span><span>12,5 MB</span>
          </div>
          ${footer}
        </div>
      </a>`;
    })
    .join("");
}

/* ---------- Oversikt: filter og faner ---------- */
function initOverview() {
  // Skjul/vis filter. "Skjul" ligger i sidefeltet, "Vis" ligger utenfor
  // så den fortsatt er tilgjengelig når sidefeltet er borte.
  const layout = document.getElementById("content-layout");
  const hideBtn = document.getElementById("toggle-filter");
  const showBtn = document.getElementById("show-filter");
  if (layout) {
    hideBtn?.addEventListener("click", () => layout.classList.add("filter-hidden"));
    showBtn?.addEventListener("click", () => layout.classList.remove("filter-hidden"));
  }

  // Rettigheter-toggle (segmentert) – filtrerer gridet på status
  const rights = document.getElementById("rights-toggle");
  if (rights) {
    rights.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => {
        rights.querySelector(".is-active")?.classList.remove("is-active");
        btn.classList.add("is-active");
        renderGrid();
      });
    });
  }

  // Kildefaner – filtrerer gridet på kilde (inne i bildebanken, ikke ekstern redirect)
  const tabs = document.getElementById("source-tabs");
  if (tabs && !document.body.hasAttribute("data-stock-modal-page")) {
    tabs.querySelectorAll(".tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.querySelector(".is-active")?.classList.remove("is-active");
        tab.classList.add("is-active");
        renderGrid();
      });
    });
  }

  // Kategori-utvidelse
  document.querySelectorAll(".cat-parent").forEach((parent) => {
    parent.addEventListener("click", () => {
      const sub = parent.parentElement.querySelector(".cat-sub");
      parent.classList.toggle("is-open");
      if (sub) sub.style.display = parent.classList.contains("is-open") ? "" : "none";
    });
  });

  // Valg av underkategori (visuell markering)
  document.querySelectorAll(".cat-sub li").forEach((li) => {
    li.addEventListener("click", () => {
      const wasSelected = li.classList.contains("is-selected");
      document
        .querySelectorAll(".cat-sub li.is-selected")
        .forEach((x) => x.classList.remove("is-selected"));
      if (!wasSelected) li.classList.add("is-selected");
    });
  });
}

/* ---------- Detaljvisning ---------- */
function initDetail() {
  const image = document.getElementById("detail-image");
  if (!image) return;

  const params = new URLSearchParams(window.location.search);
  const title = params.get("title");
  const img = params.get("img");
  const source = params.get("source");
  const tags = params.get("tags");
  const status = params.get("status");

  if (title) document.getElementById("detail-title").textContent = title;
  if (source) document.getElementById("detail-source").textContent = source.toUpperCase();

  const st = STATUS[status] || STATUS.godkjent;
  const pill = document.getElementById("detail-status");
  if (pill) {
    pill.className = "status-pill " + st.cls;
    pill.innerHTML = '<span class="dot"></span> ' + st.label;
  }
  // "Godkjent av" gir bare mening når bildet faktisk er godkjent
  const approver = document.getElementById("detail-approver-row");
  if (approver) approver.style.display = status && status !== "godkjent" ? "none" : "";

  // Begrunnelse for begrenset / ikke klarert / tidsbegrenset
  const reasonEl = document.getElementById("detail-reason");
  if (reasonEl) {
    let reason = REASONS[status];
    if (isStockSource(source)) {
      reason =
        "Bildet er ikke kjøpt ennå. Be om tillatelse – etter godkjenning legges det inn i bildebanken med full rettighetsinfo.";
    }
    if (reason) {
      reasonEl.textContent = reason;
      reasonEl.className = "meta-note " + (isStockSource(source) ? "s-begrenset" : st.cls);
      reasonEl.style.display = "";
    } else {
      reasonEl.style.display = "none";
    }
  }

  const photo = document.getElementById("detail-photo");
  if (img && photo) {
    photo.src = img;
    photo.alt = title || "";
  }

  if (tags) {
    const list = document.getElementById("detail-tags");
    if (list) {
      list.innerHTML = tags
        .split(",")
        .map((t) => `<span class="tag">${t}</span>`)
        .join("");
    }
  }

  const item = IMAGES.find((i) => i.title === title);
  if (item) {
    const setText = (id, value) => {
      const el = document.getElementById(id);
      if (el) el.textContent = value;
    };

    setText("detail-photographer", item.photographer || "–");
    setText("detail-agency", item.agency || source || "–");
    setText("detail-credit", item.credit || "–");
    setText("detail-caption", item.caption || "–");
    setText("detail-persons", item.persons || "–");

    const consentEl = document.getElementById("detail-consent");
    if (consentEl) {
      if (item.consent === true) {
        consentEl.innerHTML = '<span class="meta-badge is-ok">Innhentet</span>';
      } else if (item.consent === false) {
        consentEl.innerHTML = '<span class="meta-badge is-warn">Ikke innhentet</span>';
      } else {
        consentEl.innerHTML = '<span class="meta-badge is-neutral">Ukjent</span>';
      }
    }

    const aiEl = document.getElementById("detail-ai");
    if (aiEl) {
      if (item.ai) {
        aiEl.innerHTML =
          '<span class="meta-badge is-warn">Ja – krever merking ved publisering</span>';
      } else {
        aiEl.innerHTML = '<span class="meta-badge is-ok">Nei</span>';
      }
    }

    const altEl = document.getElementById("detail-alt");
    if (altEl) {
      if (item.alt) {
        altEl.textContent = item.alt;
        altEl.classList.remove("is-missing");
      } else {
        altEl.textContent = "Ikke fylt ut – kreves før publisering";
        altEl.classList.add("is-missing");
      }
    }

    const priceRow = document.getElementById("detail-price-row");
    const priceEl = document.getElementById("detail-price");
    if (priceRow && priceEl) {
      if (item.price) {
        priceRow.style.display = "";
        priceEl.textContent = item.price;
      } else {
        priceRow.style.display = "none";
      }
    }

    const history = document.getElementById("detail-history-section");
    if (history) history.style.display = isStockSource(item.source) ? "none" : "";
  }

  renderActions(status, source);

  document.getElementById("see-cases")?.addEventListener("click", () => {
    showToast("Viser de 3 sakene bildet er brukt i");
  });
}

/* Handlingsknapp(er) tilpasset status og kilde:
   - Adobe Stock: "Be om tillatelse" (primær), "Sett inn" deaktivert
   - godkjent: "Sett inn" (primær)
   - tids:     "Sett inn" + påminnelse om utløpsdato
   - begrenset:"Sett inn" + advarsel, bekreftes i to steg
   - ikke:     "Sett inn" deaktivert + primær CTA "Be om klarering" */
function renderActions(status, source) {
  const wrap = document.getElementById("detail-actions");
  if (!wrap) return;

  if (isStockSource(source)) {
    wrap.innerHTML =
      '<button type="button" class="btn btn-primary" id="request-stock-btn">Be om tillatelse</button>' +
      '<button type="button" class="btn btn-secondary" id="insert-btn" disabled>Sett inn</button>' +
      '<a href="https://stock.adobe.com" target="_blank" rel="noopener noreferrer" class="stock-external-link">Åpne original i Adobe Stock ↗</a>' +
      '<p class="action-hint">Du må be om tillatelse til å kjøpe bildet før det kan settes inn i en sak.</p>';
  } else if (status === "ikke") {
    wrap.innerHTML =
      '<button type="button" class="btn btn-primary" id="request-btn">Be om klarering</button>' +
      '<button type="button" class="btn btn-secondary" id="insert-btn" disabled>Sett inn</button>' +
      '<p class="action-hint">Bildet må klareres før det kan settes inn i en sak.</p>';
  } else if (status === "begrenset") {
    wrap.innerHTML =
      '<button type="button" class="btn btn-primary" id="insert-btn">Sett inn</button>' +
      '<p class="action-hint">Kun redaksjonell bruk – ikke til forsider, annonser eller kommersiell bruk.</p>';
  } else if (status === "tids") {
    wrap.innerHTML =
      '<button type="button" class="btn btn-primary" id="insert-btn">Sett inn</button>' +
      '<p class="action-hint">Klarert til og med 30.06.2026 – sjekk dato før publisering.</p>';
  } else {
    wrap.innerHTML = '<button type="button" class="btn btn-primary" id="insert-btn">Sett inn</button>';
  }

  const insert = document.getElementById("insert-btn");
  if (insert && !insert.disabled) {
    if (status === "begrenset") {
      // To-stegs bekreftelse for å kvittere ut bruksvilkårene
      let armed = false;
      insert.addEventListener("click", () => {
        if (!armed) {
          armed = true;
          insert.classList.remove("btn-primary");
          insert.classList.add("btn-warning");
          insert.textContent = "Bekreft – jeg følger vilkårene";
          showToast("Bildet har begrenset bruk. Klikk én gang til for å bekrefte.");
          return;
        }
        showToast("Bildet er satt inn – husk at det kun kan brukes redaksjonelt");
      });
    } else if (status === "tids") {
      insert.addEventListener("click", () =>
        showToast("Bildet er satt inn – gyldig til og med 30.06.2026")
      );
    } else {
      insert.addEventListener("click", () => showToast("Bildet er satt inn i saken"));
    }
  }

  document.getElementById("request-btn")?.addEventListener("click", () => {
    showToast("Forespørsel om klarering er sendt til rettighetsansvarlig");
  });

  document.getElementById("request-stock-btn")?.addEventListener("click", () => {
    showToast("Forespørsel om kjøp er sendt til rettighetsansvarlig");
  });
}

/* ---------- Stegvis opplasting ---------- */
function initWizard() {
  const form = document.getElementById("wizard-form");
  if (!form) return;

  const steps = Array.from(form.querySelectorAll(".wizard-step"));
  const items = Array.from(document.querySelectorAll("#stepper .step-item"));
  const total = steps.length;
  let current = 1;
  let deferred = false;

  function show(n) {
    current = Math.min(Math.max(n, 1), total);
    steps.forEach((s) => s.classList.toggle("is-active", Number(s.dataset.step) === current));
    items.forEach((it) => {
      const sn = Number(it.dataset.step);
      it.classList.toggle("is-active", sn === current);
      it.classList.toggle("is-done", sn < current);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Begrunnelse vises bare når statusen faktisk innebærer en begrensning
  const status = document.getElementById("status-select");
  const reasonField = document.getElementById("reason-field");
  if (status && reasonField) {
    const sync = () => {
      reasonField.style.display = status.value && status.value !== "Godkjent for bruk" ? "" : "none";
    };
    status.addEventListener("change", sync);
    sync();
  }

  function validateStep1() {
    if (status && !status.value) {
      showToast("Velg en rettighetsstatus før du går videre");
      status.focus();
      return false;
    }
    const credit = document.getElementById("credit-input");
    if (credit && !credit.value.trim()) {
      showToast("Fyll inn kreditering før du går videre");
      credit.focus();
      return false;
    }
    return true;
  }

  form.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;
    const action = btn.dataset.action;

    if (action === "next") {
      if (current === 1 && !validateStep1()) return;
      show(current + 1);
    } else if (action === "back") {
      show(current - 1);
    } else if (action === "skip") {
      deferred = true;
      showToast("Hoppet over – du kan fylle ut dette senere");
      show(current + 1);
    } else if (action === "save") {
      const alt = document.getElementById("alt-input");
      const incomplete = deferred || (alt && !alt.value.trim());
      showToast(
        incomplete
          ? "Lagret i bildebanken. Bildet er markert som ufullstendig – fyll ut resten senere."
          : "Bildet er lagret i bildebanken"
      );
      window.setTimeout(() => {
        window.location.href = "index.html";
      }, 1800);
    }
  });

  form.addEventListener("submit", (e) => e.preventDefault());
  show(1);
}

/* ---------- Opplasting (Flyt 2) ---------- */
function initUpload() {
  // Drag & drop -> simulerer opplasting og går til stegvis metadataskjema
  const dropzone = document.getElementById("dropzone");
  if (dropzone) {
    const goToFilled = () => {
      window.location.href = "last-opp-steg.html";
    };
    dropzone.addEventListener("click", goToFilled);
    dropzone.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        goToFilled();
      }
    });
    ["dragenter", "dragover"].forEach((ev) =>
      dropzone.addEventListener(ev, (e) => {
        e.preventDefault();
        dropzone.classList.add("is-dragover");
      })
    );
    ["dragleave", "drop"].forEach((ev) =>
      dropzone.addEventListener(ev, (e) => {
        e.preventDefault();
        dropzone.classList.remove("is-dragover");
      })
    );
    dropzone.addEventListener("drop", goToFilled);
  }

  // Skjema "Gå videre"
  const form = document.getElementById("upload-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // På det tomme skjemaet: man må laste opp bilde først
      if (!document.getElementById("status-select")) {
        showToast("Last opp et bilde for å fortsette");
        return;
      }

      const status = document.getElementById("status-select");
      if (status && !status.value) {
        showToast("Velg en status for bildet før du går videre");
        status.focus();
        return;
      }

      showToast("Bildet er lagret i bildebanken");
      window.setTimeout(() => {
        window.location.href = "index.html";
      }, 1600);
    });
  }
}

/* ---------- Adobe Stock modal (forenklet variant-side) ---------- */
function initStockModalPage() {
  const page = document.body.hasAttribute("data-stock-modal-page");
  const modal = document.getElementById("stock-modal");
  if (!page || !modal) return;

  const stockItems = IMAGES.filter((i) => i.source === "Adobe Stock");
  const grid = document.getElementById("stock-modal-grid");
  const empty = document.getElementById("stock-modal-empty");
  const search = document.getElementById("stock-modal-search");
  const chips = document.getElementById("stock-modal-chips");
  const selection = document.getElementById("stock-modal-selection");
  const requestBtn = document.getElementById("stock-modal-request");
  const tabs = document.getElementById("source-tabs");

  let query = "";
  let chip = "alle";
  let selected = null;
  let lastTab = tabs?.querySelector(".tab.is-active");

  function buildDetailUrl(item) {
    return (
      "detaljer.html?title=" +
      encodeURIComponent(item.title) +
      "&img=" +
      encodeURIComponent(item.img) +
      "&source=" +
      encodeURIComponent(item.source) +
      "&tags=" +
      encodeURIComponent(item.tags) +
      "&status=" +
      encodeURIComponent(item.status)
    );
  }

  function filteredItems() {
    return stockItems.filter((item) => {
      const q = query.trim().toLowerCase();
      const matchQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.tags.toLowerCase().includes(q);
      const tags = item.tags.toLowerCase();
      const matchChip =
        chip === "alle" ||
        (chip === "sport" && tags.includes("sport")) ||
        (chip === "fotball" && tags.includes("fotball"));
      return matchQuery && matchChip;
    });
  }

  function renderSelection() {
    if (!selection || !requestBtn) return;
    if (!selected) {
      selection.innerHTML = '<p class="stock-modal-selection-empty">Velg et bilde for å fortsette</p>';
      requestBtn.disabled = true;
      return;
    }
    selection.innerHTML =
      '<div class="stock-modal-selection-preview">' +
      '<img src="' + selected.img + '" alt="" />' +
      '<div class="stock-modal-selection-meta">' +
      "<strong>" + selected.title + "</strong>" +
      "<span>" + (selected.price || "Fra 3500,-") + " · Begrenset bruk</span>" +
      "</div></div>";
    requestBtn.disabled = false;
  }

  function renderModalGrid() {
    if (!grid || !empty) return;
    const items = filteredItems();
    empty.hidden = items.length > 0;
    grid.style.display = items.length > 0 ? "" : "none";

    if (selected && !items.find((i) => i.title === selected.title)) {
      selected = null;
      renderSelection();
    }

    grid.innerHTML = items
      .map((item) => {
        const isSel = selected && selected.title === item.title;
        return (
          '<button type="button" class="stock-pick' +
          (isSel ? " is-selected" : "") +
          '" data-title="' +
          encodeURIComponent(item.title) +
          '">' +
          '<div class="stock-pick-thumb"><img src="' +
          item.img +
          '" alt="" loading="lazy" /></div>' +
          '<div class="stock-pick-body">' +
          '<p class="stock-pick-title">' +
          item.title +
          "</p>" +
          '<p class="stock-pick-price">' +
          (item.price || "Fra 3500,-") +
          "</p>" +
          "</div></button>"
        );
      })
      .join("");

    grid.querySelectorAll(".stock-pick").forEach((btn) => {
      btn.addEventListener("click", () => {
        const title = decodeURIComponent(btn.dataset.title);
        selected = stockItems.find((i) => i.title === title) || null;
        grid.querySelectorAll(".stock-pick.is-selected").forEach((x) => x.classList.remove("is-selected"));
        btn.classList.add("is-selected");
        renderSelection();
      });
    });
  }

  function openModal() {
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    search?.focus();
    renderModalGrid();
  }

  function closeModal(restoreTab) {
    modal.hidden = true;
    document.body.style.overflow = "";
    selected = null;
    renderSelection();
    if (restoreTab && lastTab && tabs) {
      tabs.querySelectorAll(".tab").forEach((t) => t.classList.remove("is-active"));
      lastTab.classList.add("is-active");
      renderGrid();
    }
  }

  search?.addEventListener("input", () => {
    query = search.value;
    renderModalGrid();
  });

  chips?.querySelectorAll(".chip").forEach((c) => {
    c.addEventListener("click", () => {
      chips.querySelector(".is-active")?.classList.remove("is-active");
      c.classList.add("is-active");
      chip = c.dataset.chip || "alle";
      renderModalGrid();
    });
  });

  document.getElementById("stock-modal-close")?.addEventListener("click", () => closeModal(true));
  document.getElementById("stock-modal-cancel")?.addEventListener("click", () => closeModal(true));

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal(true);
  });

  document.addEventListener("keydown", (e) => {
    if (!modal.hidden && e.key === "Escape") closeModal(true);
  });

  requestBtn?.addEventListener("click", () => {
    if (!selected) return;
    const item = selected;
    closeModal(false);
    showToast("Forespørsel om kjøp er sendt til rettighetsansvarlig");
    window.setTimeout(() => {
      window.location.href = buildDetailUrl(item);
    }, 900);
  });

  if (tabs) {
    tabs.querySelectorAll(".tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        if (tab.dataset.opensModal !== undefined || tab.dataset.source === "stock") {
          lastTab = tabs.querySelector(".tab.is-active:not([data-source='stock'])") || lastTab;
          if (!lastTab || lastTab.dataset.source === "stock") {
            lastTab = tabs.querySelector('[data-source="nrk"]');
          }
          tabs.querySelectorAll(".tab").forEach((t) => t.classList.remove("is-active"));
          tab.classList.add("is-active");
          openModal();
          return;
        }
        lastTab = tab;
        closeModal(false);
        tabs.querySelector(".is-active")?.classList.remove("is-active");
        tab.classList.add("is-active");
        renderGrid();
      });
    });
  }

  renderSelection();
  renderModalGrid();
}

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  renderGrid();
  initOverview();
  initStockModalPage();
  initDetail();
  initWizard();
  initUpload();
});
