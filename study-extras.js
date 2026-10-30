// Calculation drills, missed-question review, practice-test timer, progress checkmarks, printing and search.
(function () {
  const el = id => document.getElementById(id);
  const store = {
    get(k) { try { return JSON.parse(localStorage.getItem("m5." + k)) || []; } catch (e) { return []; } },
    set(k, v) { try { localStorage.setItem("m5." + k, JSON.stringify(v)); } catch (e) { } }
  };
  // One-time cleanup after the 10/29 regroup: quiz positions changed in these folders.
  try {
    if (localStorage.getItem("m5.v") !== "2") {
      const moved = ["dqn", "d1030", "d1103", "d1105"];
      store.set("missed", store.get("missed").filter(id => !moved.includes(id.split(":")[0])));
      const best = JSON.parse(localStorage.getItem("m5.best") || "{}"); moved.forEach(id => delete best[id]);
      localStorage.setItem("m5.best", JSON.stringify(best)); localStorage.setItem("m5.v", "2");
    }
  } catch (e) { }
  const textOf = html => { const d = document.createElement("div"); d.innerHTML = html; return d.textContent.replace(/\s+/g, " ").trim(); };
  const H = 6.626e-34, C = 2.998e8, NA = 6.022e23, R = 1.097e7, RH = 2.178e-18;

  /* ---------- Number helpers ---------- */
  function num(raw) {
    let s = String(raw).trim().replace(/[\s,]/g, "").replace(/[−–]/g, "-").replace(/⁻/g, "-")
      .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/g, c => "⁰¹²³⁴⁵⁶⁷⁸⁹".indexOf(c));
    s = s.replace(/(?:[x×*]|·)10\^?/i, "e");
    return /^[-+]?(\d+\.?\d*|\.\d+)(e[-+]?\d+)?$/i.test(s) ? parseFloat(s) : NaN;
  }
  function sci(x, sf = 3) {
    if (x === 0) return "0";
    const e = Math.floor(Math.log10(Math.abs(x)));
    if (e >= -2 && e < sf) return x.toPrecision(sf);
    let m = x / Math.pow(10, e), ee = e;
    if (Math.abs(+m.toFixed(sf - 1)) >= 10) { m /= 10; ee++; }
    return `${m.toFixed(sf - 1)} × 10<sup>${String(ee).replace("-", "−")}</sup>`;
  }
  const r3 = x => +x.toPrecision(3);
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const between = (a, b) => a + Math.random() * (b - a);
  const int = (a, b) => Math.floor(between(a, b + 1));

  /* ---------- 1. Calculation drills ---------- */
  const GEN = {
    freq: ["Frequency from wavelength", () => {
      const nm = int(380, 720), nu = C / (nm * 1e-9);
      return { q: `What is the frequency of light with a wavelength of ${nm} nm?`, ans: nu, unit: "Hz (s<sup>−1</sup>)",
        steps: [`Convert to meters: ${nm} nm = ${sci(nm * 1e-9)} m`, `ν = c/λ = (2.998 × 10<sup>8</sup> m/s)/(${sci(nm * 1e-9)} m)`, `ν = <b>${sci(nu)} Hz</b>`] };
    }],
    energy: ["Photon energy from wavelength", () => {
      const nm = int(150, 800), E = H * C / (nm * 1e-9);
      return { q: `What is the energy of one photon of ${nm} nm light?`, ans: E, unit: "J",
        steps: [`λ = ${nm} nm = ${sci(nm * 1e-9)} m`, `E = hc/λ = (6.626 × 10<sup>−34</sup> J·s)(2.998 × 10<sup>8</sup> m/s)/(${sci(nm * 1e-9)} m)`, `E = <b>${sci(E)} J</b>`] };
    }],
    mole: ["Energy per mole of photons", () => {
      const nm = int(200, 750), E = H * C / (nm * 1e-9), kj = E * NA / 1000;
      return { q: `What is the energy of one mole of ${nm} nm photons, in kJ/mol?`, ans: kj, unit: "kJ/mol",
        steps: [`One photon: E = hc/λ = ${sci(E)} J`, `Per mole: × 6.022 × 10<sup>23</sup> mol<sup>−1</sup> = ${sci(E * NA)} J/mol`, `÷ 1000 = <b>${sci(kj)} kJ/mol</b>`] };
    }],
    lambda: ["Wavelength from photon energy", () => {
      const E = r3(between(2.6, 9.9)) * 1e-19, nm = H * C / E * 1e9;
      return { q: `A photon has an energy of ${sci(E)} J. What is its wavelength in nanometers?`, ans: nm, unit: "nm",
        steps: [`λ = hc/E = (6.626 × 10<sup>−34</sup>)(2.998 × 10<sup>8</sup>)/(${sci(E)})`, `λ = ${sci(nm * 1e-9)} m`, `× 10<sup>9</sup> nm/m = <b>${sci(nm)} nm</b>`] };
    }],
    hline: ["Hydrogen emission line", () => {
      const lo = pick([1, 2, 2, 3]), hi = lo + int(1, 4), inv = R * (1 / (lo * lo) - 1 / (hi * hi)), nm = 1e9 / inv;
      const region = nm < 380 ? "ultraviolet" : nm > 750 ? "infrared" : "visible";
      return { q: `An electron in hydrogen falls from n = ${hi} to n = ${lo}. What is the wavelength of the emitted light, in nm?`, ans: nm, unit: "nm",
        steps: [`1/λ = R(1/n<sub>low</sub><sup>2</sup> − 1/n<sub>high</sub><sup>2</sup>) = 1.097 × 10<sup>7</sup> m<sup>−1</sup> × (1/${lo * lo} − 1/${hi * hi})`, `1/λ = ${sci(inv)} m<sup>−1</sup>, so λ = ${sci(1 / inv)} m`, `λ = <b>${sci(nm)} nm</b>, which is ${region}`] };
    }],
    bohr: ["Bohr energy level", () => {
      const [sp, Z] = pick([["H", 1], ["He<sup>+</sup>", 2], ["Li<sup>2+</sup>", 3]]), n = int(1, 5), E = -RH * Z * Z / (n * n);
      return { q: `What is the energy of the electron in the n = ${n} level of ${sp}?`, ans: E, unit: "J", sign: true,
        steps: [`${sp} has one electron, so the Bohr equation works. Z = ${Z}`, `E<sub>n</sub> = −2.178 × 10<sup>−18</sup> J × (${Z}<sup>2</sup>/${n}<sup>2</sup>) = −2.178 × 10<sup>−18</sup> × ${(Z * Z / (n * n)).toPrecision(3)}`, `E<sub>${n}</sub> = <b>${sci(E)} J</b> (negative: the electron is bound)`] };
    }],
    pe: ["Photoelectric kinetic energy", () => {
      const nm = int(150, 320), E = H * C / (nm * 1e-9), phi = r3(E * between(0.45, 0.88) / 1e-19) * 1e-19, KE = E - phi;
      return { q: `Light of ${nm} nm hits a metal with a work function of ${sci(phi)} J. What is the kinetic energy of each ejected electron?`, ans: KE, unit: "J",
        steps: [`E<sub>photon</sub> = hc/λ = ${sci(E)} J`, `KE = E<sub>photon</sub> − Φ = ${sci(E)} − ${sci(phi)}`, `KE = <b>${sci(KE)} J</b>`] };
    }],
    phi: ["Work function from kinetic energy", () => {
      const nm = int(150, 320), E = H * C / (nm * 1e-9), KE = r3(E * between(0.1, 0.5) / 1e-19) * 1e-19, phi = E - KE;
      return { q: `Light of ${nm} nm ejects electrons with a kinetic energy of ${sci(KE)} J. What is the metal’s work function?`, ans: phi, unit: "J",
        steps: [`E<sub>photon</sub> = hc/λ = ${sci(E)} J`, `Φ = E<sub>photon</sub> − KE = ${sci(E)} − ${sci(KE)}`, `Φ = <b>${sci(phi)} J</b>`] };
    }],
    debroglie: ["de Broglie wavelength", () => {
      const [what, m, v] = pick([
        ["an electron (m = 9.109 × 10<sup>−31</sup> kg)", 9.109e-31, r3(between(1, 9.9)) * Math.pow(10, int(5, 6))],
        ["a proton (m = 1.673 × 10<sup>−27</sup> kg)", 1.673e-27, r3(between(1, 9.9)) * Math.pow(10, int(3, 5))],
        ["a 145 g baseball", 0.145, int(20, 45)]]);
      const lam = H / (m * v);
      return { q: `What is the de Broglie wavelength of ${what} moving at ${sci(v)} m/s?`, ans: lam, unit: "m",
        steps: [m === 0.145 ? `Mass in kg: 145 g = 0.145 kg` : `Mass is already in kg`, `λ = h/mv = (6.626 × 10<sup>−34</sup>)/(${sci(m)} × ${sci(v)})`, `λ = <b>${sci(lam)} m</b>`] };
    }],
    beer: ["Beer–Lambert concentration", () => {
      const eps = r3(between(10, 50)), A = r3(between(0.1, 0.9)), b = pick([1.00, 1.00, 2.00]), c = A / (eps * b);
      return { q: `A solution in a ${b.toFixed(2)} cm cuvette has an absorbance of ${A}. The molar absorptivity is ${eps} L/(mol·cm). What is the concentration?`, ans: c, unit: "mol/L",
        steps: [`A = εbc, so c = A/(εb)`, `c = ${A}/(${eps} × ${b.toFixed(2)})`, `c = <b>${sci(c)} mol/L</b>`] };
    }],
    dilution: ["Dilution", () => {
      const M1 = pick([0.500, 1.00, 0.250]), V2 = pick([50.0, 100.0, 250.0]), M2 = r3(between(0.02, 0.2)), V1 = M2 * V2 / M1;
      return { q: `How many mL of ${M1.toFixed(3)} M Cu<sup>2+</sup> stock are needed to make ${V2.toFixed(1)} mL of a ${M2} M standard?`, ans: V1, unit: "mL",
        steps: [`M<sub>1</sub>V<sub>1</sub> = M<sub>2</sub>V<sub>2</sub>, so V<sub>1</sub> = M<sub>2</sub>V<sub>2</sub>/M<sub>1</sub>`, `V<sub>1</sub> = (${M2} M × ${V2.toFixed(1)} mL)/${M1.toFixed(3)} M`, `V<sub>1</sub> = <b>${sci(V1)} mL</b>`] };
    }]
  };
  el("dr-type").innerHTML = `<option value="mix">Mixed: all types</option>` + Object.entries(GEN).map(([k, g]) => `<option value="${k}">${g[0]}</option>`).join("");
  let prob = null, tried = false, stats = { right: 0, total: 0, streak: 0 };
  function nextProblem() {
    const t = el("dr-type").value, key = t === "mix" ? pick(Object.keys(GEN)) : t;
    prob = GEN[key][1](); prob.title = GEN[key][0]; tried = false;
    el("dr-topic").textContent = prob.title;
    el("dr-q").innerHTML = prob.q;
    el("dr-unit").innerHTML = prob.unit;
    el("dr-in").value = ""; el("dr-fb").textContent = ""; delete el("dr-fb").dataset.ok;
    el("dr-steps").hidden = true;
    el("dr-steps").innerHTML = `<ol>${prob.steps.map(s => `<li>${s}</li>`).join("")}</ol>`;
  }
  function drStats() {
    el("dr-stats").textContent = stats.total ? `${stats.right} of ${stats.total} right on the first try${stats.streak > 1 ? ` · streak of ${stats.streak}` : ""}` : "";
  }
  el("dr-form").addEventListener("submit", e => {
    e.preventDefault();
    const fb = el("dr-fb"), x = num(el("dr-in").value), a = prob.ans;
    if (!isFinite(x)) { fb.textContent = "Type a number, like 4.58e-19 or 4.58 × 10^-19."; return; }
    const ok = Math.abs(x - a) / Math.abs(a) <= 0.02;
    if (!tried) { stats.total++; if (ok) { stats.right++; stats.streak++; } else stats.streak = 0; tried = true; drStats(); }
    if (ok) { fb.innerHTML = `Correct: ${sci(a)} ${prob.unit}.`; fb.dataset.ok = ""; el("dr-steps").hidden = false; return; }
    delete fb.dataset.ok;
    const ratio = Math.log10(Math.abs(x / a));
    if (Math.abs(x + a) / Math.abs(a) <= 0.02) fb.textContent = "Right size, wrong sign. Check whether the value should be negative.";
    else if (Math.abs(ratio - Math.round(ratio)) < 0.01 && Math.round(ratio) !== 0) fb.innerHTML = `Off by a factor of 10<sup>${Math.round(ratio)}</sup>. Check unit conversions: nm to m is 10<sup>−9</sup>, J to kJ is 10<sup>3</sup>, g to kg is 10<sup>3</sup>.`;
    else fb.textContent = "Not quite. Try again, or show the working.";
  });
  el("dr-next").addEventListener("click", () => { nextProblem(); el("dr-in").focus(); });
  el("dr-show").addEventListener("click", () => { el("dr-steps").hidden = false; if (!tried) { tried = true; stats.total++; stats.streak = 0; drStats(); } });
  el("dr-type").addEventListener("change", nextProblem);
  nextProblem();

  /* ---------- 2. Missed-question review ---------- */
  function questionFor(id) {
    const [src, i] = id.split(":");
    if (src === "px") { const q = PRACTICE.mc[+i]; return q && { q, from: `Practice test, ${q[4]}` }; }
    const d = DAYS.find(x => x.id === src), q = d && d.quiz[+i];
    return q && { q, from: `${META[src][2] ? META[src][1] : "Quantum numbers"} quiz: ${d.title}` };
  }
  function renderReview() {
    const ids = store.get("missed").filter(questionFor);
    el("rv-qs").innerHTML = ids.map(id => {
      const { q, from } = questionFor(id);
      return `<li data-a="${q[2]}" data-qid="${id}"><p class="q"><span class="topic">${from}</span>${q[0]}</p>
        <div class="opts" role="group" aria-label="Answer choices">${q[1].map((o, k) => `<button type="button" class="opt" data-i="${k}"><span class="l">${"ABCD"[k]}</span><span>${o}</span></button>`).join("")}</div>
        <p class="explain" hidden><b></b> ${q[3]}</p></li>`;
    }).join("");
    el("rv-empty").hidden = ids.length > 0;
    el("rv-clear").hidden = !ids.length;
    el("rv-score").textContent = ids.length ? `${ids.length} question${ids.length > 1 ? "s" : ""} to review.` : "";
  }
  // Runs after app.js has marked the answer.
  document.addEventListener("click", e => {
    const li = e.target.closest(".opt") && e.target.closest("li[data-qid]");
    if (!li || li.dataset.picked == null) return;
    let ids = store.get("missed").filter(x => x !== li.dataset.qid);
    if (li.dataset.picked !== li.dataset.a) ids.push(li.dataset.qid);
    store.set("missed", ids);
    if (li.closest("#rv-qs")) el("rv-score").textContent = li.dataset.picked === li.dataset.a ? `Got it. ${ids.length} left to review.` : `${ids.length} to review.`;
    progressLine();
  });
  let undo = null, undoT = null;
  el("rv-clear").addEventListener("click", () => {
    const btn = el("rv-clear");
    if (undo) { store.set("missed", undo); undo = null; clearTimeout(undoT); btn.textContent = "Clear the list"; renderReview(); progressLine(); return; }
    undo = store.get("missed"); store.set("missed", []); renderReview(); progressLine();
    btn.hidden = false; btn.textContent = "Cleared. Undo";
    undoT = setTimeout(() => { undo = null; btn.textContent = "Clear the list"; renderReview(); }, 6000);
  });
  window.addEventListener("hashchange", () => { if (document.body.dataset.page === "practice") renderReview(); });
  renderReview();

  /* ---------- 3. Practice-test timer ---------- */
  let left = 0, tick = null;
  const clock = () => { const m = Math.floor(left / 60), s = left % 60; el("tm-clock").textContent = `${m}:${String(s).padStart(2, "0")}`; };
  function resetTimer() {
    clearInterval(tick); tick = null; left = +el("tm-min").value * 60;
    el("timer").classList.toggle("off", !left); el("timer").classList.remove("over");
    el("tm-go").textContent = "Start"; el("tm-go").hidden = !left; clock();
  }
  el("tm-min").addEventListener("change", resetTimer);
  el("tm-go").addEventListener("click", () => {
    if (el("timer").classList.contains("over")) { resetTimer(); return; }
    if (tick) { clearInterval(tick); tick = null; el("tm-go").textContent = "Resume"; return; }
    el("tm-go").textContent = "Pause";
    tick = setInterval(() => {
      left--; clock();
      if (left <= 0) { clearInterval(tick); tick = null; el("tm-clock").textContent = "Time’s up"; el("timer").classList.add("over"); el("tm-go").textContent = "Reset"; }
    }, 1000);
  });
  resetTimer();

  /* ---------- 5. Progress checkmarks ---------- */
  const dated = DAYS.filter(d => META[d.id][2]);
  function markTabs() {
    const done = store.get("done");
    document.querySelectorAll("#tabs a").forEach(a => a.classList.toggle("done", done.includes(a.dataset.id)));
    const b = document.querySelector(".donebtn");
    if (b) { const on = done.includes(b.dataset.day); b.textContent = on ? "✓ Folder done. Tap to undo" : "Mark this folder done"; b.classList.toggle("on", on); }
  }
  function markDecks() {
    const decks = store.get("decks");
    [...el("fc-deck").options].forEach(o => { o.textContent = (decks.includes(o.value) ? "✓ " : "") + o.textContent.replace(/^✓ /, ""); });
  }
  function progressLine() {
    const done = store.get("done").filter(id => META[id]).length, decks = store.get("decks").length, missed = store.get("missed").filter(questionFor).length;
    el("progress-line").innerHTML = `<b>${done} of ${dated.length}</b> folders done · <b>${decks}</b> flashcard deck${decks === 1 ? "" : "s"} finished · ` +
      (missed ? `<a href="#review"><b>${missed}</b> missed question${missed === 1 ? "" : "s"} to review</a>` : "no missed questions waiting");
  }
  document.addEventListener("click", e => {
    const b = e.target.closest(".donebtn"); if (!b) return;
    let done = store.get("done");
    done = done.includes(b.dataset.day) ? done.filter(x => x !== b.dataset.day) : done.concat(b.dataset.day);
    store.set("done", done); markTabs(); progressLine();
  });
  document.addEventListener("dayshown", markTabs);
  document.addEventListener("deckdone", e => {
    const decks = store.get("decks");
    if (!decks.includes(e.detail)) { store.set("decks", decks.concat(e.detail)); markDecks(); progressLine(); }
  });
  markTabs(); markDecks(); progressLine();

  /* ---------- 6. Print ---------- */
  el("print-eq").addEventListener("click", () => window.print());

  /* ---------- 7. Search ---------- */
  const INDEX = [];
  const add = (where, href, html) => { const t = textOf(html); if (t) INDEX.push({ where, href, t, lo: t.toLowerCase() }); };
  DAYS.forEach(d => {
    const X = EXTRA[d.id] || {}, w = `${META[d.id][2] ? META[d.id][1] : "Skipped"}: ${d.title}`, h = "#" + d.id;
    d.goals.forEach(g => add(w + " · goal", h, g));
    d.terms.concat(X.terms || []).forEach(t => add(w + " · key term", h, `${t[0]}: ${t[1]}`));
    d.mistakes.concat(X.mistakes || []).forEach(m => add(w + " · common mistake", h, m));
    renderSum(d).split(/<\/p>|<\/div>|<\/details>/).forEach(p => add(w + " · summary", h, p));
    d.quiz.forEach(q => add(w + " · quiz", h, `${q[0]} ${q[3]}`));
  });
  PRACTICE.mc.forEach(q => add("Practice test · multiple choice", "#practice", `${q[0]} ${q[3]}`));
  PRACTICE.fr.forEach(f => add("Practice test · free response", "#practice-fr", `${f[0]}: ${f[1]}`));
  EQ_CARDS.forEach(c => add("Flashcards · equations", "#flashcards", `${c[0]}: ${c[1]}`));
  document.querySelectorAll(".eqlist > div").forEach(d => add("Equation sheet", "#equations", d.innerHTML));
  const esc = s => s.replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
  function search() {
    const q = el("se-in").value.trim().toLowerCase(), words = q.split(/\s+/).filter(Boolean);
    if (q.length < 2) { el("se-res").innerHTML = ""; el("se-count").textContent = ""; return; }
    const hits = INDEX.filter(x => words.every(w => x.lo.includes(w)));
    el("se-count").textContent = hits.length ? `${hits.length} result${hits.length > 1 ? "s" : ""}${hits.length > 40 ? ", showing the first 40" : ""}` : "No results. Try a shorter word.";
    el("se-res").innerHTML = hits.slice(0, 40).map(x => {
      const i = x.lo.indexOf(words[0]), start = Math.max(0, i - 70);
      let snip = (start ? "…" : "") + x.t.slice(start, i + 160) + (i + 160 < x.t.length ? "…" : "");
      snip = esc(snip);
      words.forEach(w => { snip = snip.replace(new RegExp(w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"), m => `<mark>${m}</mark>`); });
      return `<li><a href="${x.href}"><span class="se-where">${x.where}</span><span class="se-snip">${snip}</span></a></li>`;
    }).join("");
  }
  el("se-in").addEventListener("input", search);
})();
