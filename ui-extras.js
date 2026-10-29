// Day sub-tabs, clickable equations, topic colours, light/dark switch and quiz scores on the day tabs.
(function () {
  const el = id => document.getElementById(id);
  const store = {
    get(k, d) { try { const v = JSON.parse(localStorage.getItem("m5." + k)); return v == null ? d : v; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem("m5." + k, JSON.stringify(v)); } catch (e) { } }
  };

  /* ---------- 1. Sub-tabs inside a day: Summary / Key terms / Quiz ---------- */
  const subs = [...document.querySelectorAll(".subtabs button")];
  function setSub(s, scroll) {
    document.body.dataset.sub = s;
    subs.forEach(b => b.setAttribute("aria-selected", b.dataset.sub === s));
    if (scroll) el("subtabs").scrollIntoView({ block: "start" });
  }
  subs.forEach(b => b.addEventListener("click", () => setSub(b.dataset.sub, true)));
  function subFromHash() {
    const h = location.hash.slice(1);
    if (h === "quiz") setSub("quiz", true); else if (h === "reading") setSub("summary", true);
  }
  window.addEventListener("hashchange", subFromHash);
  setSub("summary"); subFromHash();

  /* ---------- 2. Equation sheet: each equation links to where it is practised ---------- */
  const go = (hash, fn) => () => { location.hash = hash; requestAnimationFrame(fn); };
  const drill = t => go("#drills", () => { el("dr-type").value = t; el("dr-type").dispatchEvent(new Event("change")); });
  const tool = t => go("#tools", () => el(t).click());
  const bohr = go("#bohr", () => { });
  const LINKS = [
    [/^c = λν/, "Drill: frequency from wavelength", drill("freq")],
    [/^E = hν/, "Drill: photon energy", drill("energy")],
    [/^En/, "See it on the Bohr model", bohr],
    [/^ΔE/, "See it on the Bohr model", bohr],
    [/^1\/λ/, "Drill: hydrogen lines", drill("hline")],
    [/^KE/, "Drill: photoelectric effect", drill("pe")],
    [/^λ = h\/mv/, "Drill: de Broglie", drill("debroglie")],
    [/^A = εbc/, "Drill: Beer–Lambert", drill("beer")],
    [/^A = −log/, "Beer–Lambert calculator", tool("tt-ph")],
    [/^M1V1/, "Drill: dilution", drill("dilution")],
    [/^Zeff/, "Compare elements in the trends tool", tool("tt-pt")],
    [/^F ∝/, "Compare elements in the trends tool", tool("tt-pt")],
    [/^NA/, "Drill: energy per mole", drill("mole")]
  ];
  document.querySelectorAll(".eqlist > div").forEach(d => {
    const t = d.querySelector("dt").textContent.trim(), hit = LINKS.find(l => l[0].test(t));
    if (!hit) return;
    const b = document.createElement("button");
    b.type = "button"; b.className = "eq-go"; b.textContent = hit[1] + " →"; b.addEventListener("click", hit[2]);
    d.querySelector("dd").appendChild(b);
  });

  /* ---------- 3. Topic colours ---------- */
  const TOPIC = {
    light: ["Light and photons", ["d1026", "d1027", "d1102"], /light|photon|photoelectric|beer|frequency|wavelength from|energy per mole|dilution|work function/i],
    atom: ["The Bohr atom", ["d1028", "d1029"], /bohr|hydrogen|broglie|wave nature|uncertainty/i],
    electrons: ["Electrons in atoms", ["d1030", "dqn", "d1106"], /quantum|configuration|magnetism|photoelectron|pes/i],
    trends: ["Periodic trends", ["d1103", "d1105"], /radius|ionization|nuclear charge|affinity|electronegativ|trend|periodic/i]
  };
  const topicOfDay = id => Object.keys(TOPIC).find(k => TOPIC[k][1].includes(id));
  const topicOfText = s => Object.keys(TOPIC).find(k => TOPIC[k][2].test(s));
  function paint() {
    document.querySelectorAll("#tabs a").forEach(a => { const t = topicOfDay(a.dataset.id); if (t) a.dataset.topic = t; });
    document.querySelectorAll(".qs .topic, #dr-topic").forEach(s => {
      const li = s.closest("li[data-qid]"), id = li && li.dataset.qid.split(":")[0];
      const t = id && id !== "px" ? topicOfDay(id) : topicOfText(s.textContent);
      if (t) s.dataset.topic = t; else delete s.dataset.topic;
    });
    const day = document.body.dataset.page === "days" && document.querySelector("#tabs a[aria-current=true]");
    const dt = day && topicOfDay(day.dataset.id);
    el("panel").dataset.topic = dt || "";
  }
  el("topic-key").innerHTML = Object.entries(TOPIC).map(([k, v]) => `<span data-topic="${k}">${v[0]}</span>`).join("");
  new MutationObserver(paint).observe(document.body, { subtree: true, childList: true, characterData: true });
  paint();

  /* ---------- 4. Light and dark switch ---------- */
  const root = document.documentElement, btn = el("theme-btn");
  const sysDark = () => matchMedia("(prefers-color-scheme: dark)").matches;
  function applyTheme(t) {
    if (t) root.dataset.theme = t; else delete root.dataset.theme;
    const dark = t ? t === "dark" : sysDark();
    btn.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
    btn.dataset.mode = dark ? "dark" : "light";
  }
  btn.addEventListener("click", () => { const t = btn.dataset.mode === "dark" ? "light" : "dark"; store.set("theme", t); applyTheme(t); });
  applyTheme(store.get("theme", null));

  /* ---------- 5. Best quiz score on each day tab ---------- */
  function scoreTabs() {
    const best = store.get("best", {});
    document.querySelectorAll("#tabs a").forEach(a => {
      let s = a.querySelector(".sc");
      if (!s) { s = document.createElement("span"); s.className = "sc"; a.appendChild(s); }
      const b = best[a.dataset.id];
      s.textContent = b ? `Quiz ${b[0]}/${b[1]}` : "Quiz not done";
      s.classList.toggle("full", !!b && b[0] === b[1]);
    });
  }
  document.addEventListener("click", e => {
    if (!e.target.closest("#qs .opt")) return;
    const items = [...document.querySelectorAll("#qs > li")];
    if (items.some(li => li.dataset.picked == null)) return;
    const right = items.filter(li => li.dataset.picked === li.dataset.a).length;
    const id = document.querySelector("#tabs a[aria-current=true]").dataset.id, best = store.get("best", {});
    if (!best[id] || right > best[id][0]) { best[id] = [right, items.length]; store.set("best", best); scoreTabs(); }
  });
  scoreTabs();
})();
