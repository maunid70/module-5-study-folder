// Page behaviour: day tabs, summaries, quizzes, exam countdown, spectrum check.
document.documentElement.classList.add("js");

function renderSum(d) {
  const X = EXTRA[d.id] || {};
  let h = X.overview ? `<p class="ov">${X.overview}</p>` : d.summary;
  const vids = d.videos.filter(k => X.vs && X.vs[k]);
  if (vids.length) {
    h += `<h3 class="sec">Video by video</h3>` + vids.map(k => {
      const v = V[k];
      return `<div class="vs"><h4>${v[0]}${v[1] ? ` <span>${v[1]}</span>` : ""}</h4>${X.vs[k]}</div>`;
    }).join("");
  }
  if (X.handouts && X.handouts.length) {
    h += `<h3 class="sec">From the Canvas handouts</h3>` + X.handouts.map(x => `<div class="vs"><h4>${x[0]}</h4>${x[1]}</div>`).join("");
  }
  if (X.worked && X.worked.length) {
    h += `<h3 class="sec">Worked problems from the handouts</h3><p class="wp-hint">Try each one, then tap it to check the answer.</p><div class="wps">` +
      X.worked.map((w, i) => `<details class="wp" id="${d.id}-wp${i}"><summary>${w[0]}</summary><div class="wp-a">${w[1]}</div></details>`).join("") + `</div>`;
  }
  return h;
}

const META = {
  d1026: ["Monday", "10/26", "2026-10-26", "2026-10-26"],
  d1027: ["Tuesday", "10/27", "2026-10-27", "2026-10-27"],
  d1028: ["Wednesday", "10/28", "2026-10-28", "2026-10-28"],
  d1029: ["Thursday", "10/29", "2026-10-29", "2026-10-29"],
  dqn:   ["Skipped", "Quantum numbers", null, null],
  d1030: ["Friday", "10/30", "2026-10-30", "2026-10-30"],
  d1102: ["Monday", "11/2", "2026-11-02", "2026-11-02"],
  d1103: ["Tue–Wed", "11/3–11/4", "2026-11-03", "2026-11-04"],
  d1105: ["Thursday", "11/5", "2026-11-05", "2026-11-05"],
  d1106: ["Friday", "11/6", "2026-11-06", "2026-11-06"],
  d1109: ["Mon–Tue", "11/9–11/10", "2026-11-09", "2026-11-10"]
};
const LET = "ABCD";
const $ = id => document.getElementById(id);
const ymd = d => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
const todayStr = ymd(new Date());

/* Which folder is today's: the day whose dates include today, else the next one, else the last. */
function todayId() {
  const dated = DAYS.filter(d => META[d.id][2]);
  for (const d of dated) if (todayStr >= META[d.id][2] && todayStr <= META[d.id][3]) return d.id;
  for (const d of dated) if (META[d.id][2] > todayStr) return d.id;
  return dated[dated.length - 1].id;
}
const TODAY = todayId();
const isToday = id => META[id][2] && todayStr >= META[id][2] && todayStr <= META[id][3];

/* Exam countdown */
(function () {
  const exam = new Date(2026, 10, 10), now = new Date(); now.setHours(0, 0, 0, 0);
  const n = Math.round((exam - now) / 864e5);
  if (n > 1) { $("days-left").textContent = n + " days"; }
  else if (n === 1) { $("days-left").textContent = "1 day"; $("days-left-note").textContent = "until the Module 5 exam: tomorrow"; }
  else if (n === 0) { $("days-left").textContent = "Today"; $("days-left-note").textContent = "is the Module 5 exam"; }
  else { $("days-left").textContent = "Done"; $("days-left-note").textContent = "the exam was on 11/10"; }
})();

function videoBands(ids) {
  if (!ids.length) return `<ul class="bands"><li class="none"><span class="n">No videos on the calendar for this day.<small>Use it to finish practice problems and review.</small></span></li></ul>`;
  return `<ul class="bands">` + ids.map(k => {
    const v = V[k], miss = v[3];
    return `<li><span class="t">${v[1] || "—"}</span><span class="n">${v[0]}<small>${miss ? "No transcript; notes come from the title" : "Transcript read for the summary"}</small></span><a class="tlink" href="https://youtu.be/${v[2]}" target="_blank" rel="noopener">Watch<span class="vh"> ${v[0]} on YouTube</span></a></li>`;
  }).join("") + `</ul>`;
}

let current = null;
function show(id, opts = {}) {
  const i = DAYS.findIndex(d => d.id === id);
  if (i < 0) return;
  const d = DAYS[i], m = META[id];
  current = id;
  document.querySelectorAll("#tabs a").forEach(a => a.setAttribute("aria-current", a.dataset.id === id ? "true" : "false"));
  const when = m[2] ? `${m[0]} ${m[1]}${isToday(id) ? ", today" : ""}` : "Marked skipped on the calendar";
  $("panel").innerHTML = `<h3>${d.title}</h3><p class="day-when">${when}</p>
    <ul class="goals">${d.goals.map(g => `<li>${g}</li>`).join("")}</ul>
    ${videoBands(d.videos)}
    <p class="canvas-line"><b>On Canvas:</b> ${d.todo}</p>`;
  $("reading-h").textContent = d.skipped ? "Summary: quantum numbers" : `Summary for ${m[1]}`;
  $("sum").innerHTML = renderSum(d);
  $("side").innerHTML = `<section><h3>Key terms</h3><dl class="terms">${d.terms.concat((EXTRA[d.id]||{}).terms||[]).map(t => `<div><dt>${t[0]}</dt><dd>${t[1]}</dd></div>`).join("")}</dl></section>
    <section><h3>Common mistakes</h3><ul class="mistakes">${d.mistakes.concat((EXTRA[d.id]||{}).mistakes||[]).map(x => `<li>${x}</li>`).join("")}</ul></section>`;
  $("quiz-h").textContent = d.skipped ? "Practice quiz: quantum numbers" : `Practice quiz for ${m[1]}`;
  $("qs").innerHTML = d.quiz.map((q, qi) => `<li data-a="${q[2]}"><p class="q">${q[0]}</p>
      <div class="opts" role="group" aria-label="Answer choices for question ${qi + 1}">${q[1].map((o, oi) =>
        `<button type="button" class="opt" id="${d.id}-q${qi}-o${oi}" data-i="${oi}"><span class="l">${LET[oi]}</span><span>${o}</span></button>`).join("")}</div>
      <p class="explain" hidden><b></b> ${q[3]}</p></li>`).join("");
  const prev = DAYS[i - 1], next = DAYS[i + 1];
  $("pager").innerHTML = (prev ? `<a href="#${prev.id}">← ${META[prev.id][2] ? META[prev.id][1] : "Quantum numbers"}: ${prev.title}</a>` : "<span></span>") +
    (next ? `<a href="#${next.id}">${META[next.id][2] ? META[next.id][1] : "Quantum numbers"}: ${next.title} →</a>` : "");
  updateScore();
  if (opts.animate) {
    for (const el of [$("days"), $("reading"), $("quiz")]) { el.classList.remove("swap"); void el.offsetWidth; el.classList.add("swap"); }
  }
}

function updateScore() {
  const items = document.querySelectorAll("#qs > li");
  let done = 0, right = 0;
  items.forEach(li => { if (li.dataset.picked != null) { done++; if (li.dataset.picked === li.dataset.a) right++; } });
  $("score").textContent = done ? `${right} of ${done} correct, ${items.length - done} left` : `${items.length} questions. Pick an answer to see why it is right or wrong.`;
}

function buildTabs() {
  $("tabs").innerHTML = DAYS.map(d => {
    const m = META[d.id];
    return `<a href="#${d.id}" data-id="${d.id}" class="${isToday(d.id) ? "is-today" : ""}" aria-current="false"><span class="wd">${isToday(d.id) ? "Today" : m[0]}</span><span class="dt">${m[1]}</span></a>`;
  }).join("");
  $("daylinks").innerHTML = DAYS.map(d => `<li><a href="#${d.id}">${META[d.id][2] ? META[d.id][1] : "Skipped"}: ${d.title}</a></li>`).join("");
  $("today-btn").href = "#" + TODAY; $("foot-today").href = "#" + TODAY;
}

document.addEventListener("click", e => {
  const opt = e.target.closest(".opt");
  if (opt) {
    const li = opt.closest("li");
    if (li.dataset.picked != null) return;
    const pick = opt.dataset.i, ans = li.dataset.a;
    li.dataset.picked = pick;
    li.querySelectorAll(".opt").forEach(b => {
      b.disabled = true;
      if (b.dataset.i === ans) b.classList.add("right");
      else if (b.dataset.i === pick) b.classList.add("wrong");
      else b.classList.add("dim");
    });
    const ex = li.querySelector(".explain");
    ex.querySelector("b").textContent = pick === ans ? "Correct." : `Not quite. The answer is ${LET[ans]}.`;
    ex.hidden = false;
    updateScore();
    return;
  }
  if (e.target.closest("#reset")) {
    document.querySelectorAll("#qs > li").forEach(li => {
      delete li.dataset.picked;
      li.querySelectorAll(".opt").forEach(b => { b.disabled = false; b.classList.remove("right", "wrong", "dim"); });
      li.querySelector(".explain").hidden = true;
    });
    updateScore();
    const first = document.querySelector("#qs .opt"); if (first) first.focus();
  }
});

/* Hash routing: #d1027 opens that folder */
/* Pages: one section group shows at a time, picked by the hash */
const PAGE_OF = { home: "home", top: "home", about: "home", days: "days", reading: "days", quiz: "days",
  practice: "practice", "practice-fr": "practice", flashcards: "flashcards", tools: "tools", spectrum: "tools", equations: "equations" };
function setPage(h) {
  const p = META[h] ? "days" : PAGE_OF[h] || "home";
  const changed = document.body.dataset.page !== p;
  document.body.dataset.page = p;
  document.querySelectorAll(".top-links a, .word").forEach(a => a.toggleAttribute("aria-current", (PAGE_OF[a.hash.slice(1)] || "") === p && a.classList.contains("word") === (p === "home")));
  if (META[h]) return;
  const target = document.getElementById(h), firstOnPage = target && target === document.querySelector(`[data-page="${p}"]:not(.mosaic)`);
  if (changed || target) requestAnimationFrame(() => (target && !firstOnPage && p !== "home") ? target.scrollIntoView({ block: "start" }) : window.scrollTo(0, 0));
}
function route(first) {
  const h = location.hash.slice(1);
  setPage(h);
  if (META[h]) {
    show(h, { animate: !first });
    const target = $("days");
    requestAnimationFrame(() => target.scrollIntoView({ block: "start" }));
  } else if (first) { show(TODAY); }
}
window.addEventListener("hashchange", () => route(false));

/* Spectrum check */
const H = 6.626e-34, C = 2.998e8, NA = 6.022e23, R = 1.097e7;
const LINES = [[122, "2 → 1"], [103, "3 → 1"], [656, "3 → 2"], [486, "4 → 2"], [434, "5 → 2"], [410, "6 → 2"]];
function sci(x, unit) {
  const e = Math.floor(Math.log10(Math.abs(x))), mant = x / Math.pow(10, e);
  let s = mant.toFixed(2); if (s === "10.00") { s = "1.00"; }
  const exp = s === "1.00" && mant >= 9.995 ? e + 1 : e;
  return `${s} × 10<sup>${String(exp).replace("-", "−")}</sup> ${unit}`;
}
function colorName(nm) {
  if (nm < 380) return "ultraviolet"; if (nm > 750) return "infrared";
  if (nm < 450) return "violet"; if (nm < 495) return "blue-green"; if (nm < 570) return "green";
  if (nm < 590) return "yellow"; if (nm < 620) return "orange"; return "red";
}
function regionName(nm) { return nm < 380 ? "an ultraviolet" : nm > 750 ? "an infrared" : "a " + colorName(nm) + " (visible)"; }
function fmtNm(nm) { return nm >= 1000 ? Math.round(nm).toLocaleString("en-US") : nm >= 100 ? nm.toFixed(0) : nm.toFixed(1); }
function render(nm, note, bad) {
  const v = $("verdict");
  if (bad) { v.textContent = bad; v.dataset.bad = ""; return; }
  delete v.dataset.bad;
  const lam = nm * 1e-9, nu = C / lam, E = H * nu, mol = E * NA / 1000;
  $("o-wl").textContent = fmtNm(nm) + " nm";
  $("o-nu").innerHTML = sci(nu, "Hz");
  $("o-e").innerHTML = sci(E, "J");
  $("o-m").textContent = (mol >= 100 ? Math.round(mol).toLocaleString("en-US") : mol.toPrecision(3)) + " kJ/mol";
  const pos = Math.min(Math.max((nm - 380) / (720 - 380), 0), 1);
  $("marker").style.left = (pos * 100) + "%";
  v.textContent = note;
}
function fromLevels() {
  const hi = +$("nhi").value, lo = +$("nlo").value;
  if (hi <= lo) { render(0, "", "The starting level must be higher than the final one. An electron falls from a higher n to a lower n to emit light."); return; }
  const inv = R * (1 / (lo * lo) - 1 / (hi * hi)), nm = 1e9 / inv;
  const series = lo === 1 ? " (Lyman series)" : lo === 2 ? " (Balmer series)" : lo === 3 ? " (Paschen series)" : "";
  render(nm, `Falling from n = ${hi} to n = ${lo} gives off ${regionName(nm)} photon${series}. Rising from ${lo} to ${hi} absorbs the same one.`);
}
function fromWavelength() {
  const raw = $("wl").value.trim().replace(",", ".");
  if (!raw) { fromLevels(); return; }
  const nm = parseFloat(raw);
  if (!isFinite(nm) || nm <= 0) { render(0, "", "Type a wavelength in nanometers, for example 650."); return; }
  const match = LINES.find(l => Math.abs(l[0] - nm) <= 2);
  render(nm, `${fmtNm(nm)} nm is ${regionName(nm)} photon.` + (match ? ` It matches hydrogen’s n = ${match[1]} line.` : ""));
}
$("nhi").addEventListener("change", () => { $("wl").value = ""; fromLevels(); });
$("nlo").addEventListener("change", () => { $("wl").value = ""; fromLevels(); });
$("wl").addEventListener("input", fromWavelength);
$("specform").addEventListener("submit", e => e.preventDefault());

/* Entrances: only things below the first screen wait for their section; a timer shows everything regardless */
function entrances() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
  const sel = ".exam h2, .exam-top p, [data-rise], .days-head, .reading h2, .side section, .quiz .side, .spectrum .side, .eqs .side, .eqlist > div, .trends-wrap, .about .side, .foot .name, .foot .rows";
  const els = [...document.querySelectorAll(sel)].filter(el => el.getBoundingClientRect().top > innerHeight);
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target, sibs = [...el.parentElement.children].filter(s => s.classList.contains("pre"));
      const k = Math.max(0, sibs.indexOf(el));
      el.classList.add("shown"); el.style.transitionDelay = (k * 75) + "ms";
      requestAnimationFrame(() => el.classList.remove("pre"));
      io.unobserve(el);
    });
  }, { rootMargin: "0px 0px -8% 0px" });
  els.forEach(el => { el.classList.add("pre"); io.observe(el); });
  setTimeout(() => els.forEach(el => el.classList.remove("pre")), 6000);
}

buildTabs();
$("qcount").textContent = DAYS.reduce((n, d) => n + d.quiz.length, 0);
route(true);
fromLevels();
entrances();
