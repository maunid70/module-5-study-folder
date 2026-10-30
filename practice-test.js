// Practice test: the fixed test in data/practice-test.js, or a freshly generated mixed test drawn from every quiz.
// Answer clicks are handled by the shared quiz code in app.js.
(function () {
  const el = id => document.getElementById(id);
  const LET = "ABCD";
  const shuffle = a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const missedIds = () => { try { return JSON.parse(localStorage.getItem("m5.missed")) || []; } catch (e) { return []; } };

  // Every multiple-choice question on the site, with where it came from.
  const POOL = PRACTICE.mc.map((q, i) => ({ q, topic: q[4], qid: `px:${i}`, src: "px" }))
    .concat(DAYS.flatMap(d => d.quiz.map((q, i) => ({ q, topic: d.title, qid: `${d.id}:${i}`, src: d.id }))));
  let mode = "fixed";

  function build() {
    if (mode === "fixed") return { items: POOL.filter(x => x.src === "px"), note: "" };
    // Mixed: up to 8 questions you have missed, then a spread of the rest, at most 4 from any one source.
    const missed = new Set(missedIds()), picked = [], per = {};
    const add = x => { if (picked.length < 22 && (per[x.src] || 0) < 4 && !picked.includes(x)) { picked.push(x); per[x.src] = (per[x.src] || 0) + 1; } };
    shuffle(POOL.filter(x => missed.has(x.qid))).slice(0, 8).forEach(add);
    const fromMissed = picked.length;
    shuffle(POOL.filter(x => !missed.has(x.qid))).forEach(add);
    return { items: shuffle(picked), note: `22 questions drawn from all ${POOL.length} on the site${fromMissed ? `, including ${fromMissed} you missed before` : ""}. Build another for a different set.` };
  }

  function render() {
    const { items, note } = build();
    el("px-qs").innerHTML = items.map((x, qi) => {
      const q = x.q, order = shuffle([0, 1, 2, 3].slice(0, q[1].length));
      return `<li data-a="${order.indexOf(q[2])}" data-topic="${x.topic}" data-qid="${x.qid}"><p class="q"><span class="topic">${x.topic}</span>${q[0]}</p>
        <div class="opts" role="group" aria-label="Answer choices for question ${qi + 1}">${order.map((oi, k) =>
          `<button type="button" class="opt" data-i="${k}"><span class="l">${LET[k]}</span><span>${q[1][oi]}</span></button>`).join("")}</div>
        <p class="explain" hidden><b></b> ${q[3]}</p></li>`;
    }).join("");
    el("px-note").textContent = note; el("px-note").hidden = !note;
    el("px-result").hidden = true;
    el("px-reset").textContent = mode === "fixed" ? "Start over with the choices reshuffled" : "Build another mixed test";
    score();
  }

  function score() {
    const items = [...document.querySelectorAll("#px-qs > li")];
    const done = items.filter(li => li.dataset.picked != null);
    const right = done.filter(li => li.dataset.picked === li.dataset.a);
    el("px-score").textContent = done.length ? `${right.length} of ${done.length} correct, ${items.length - done.length} left` : `${items.length} multiple choice questions.`;
    if (done.length < items.length) return;
    const missed = {};
    done.filter(li => li.dataset.picked !== li.dataset.a).forEach(li => { missed[li.dataset.topic] = (missed[li.dataset.topic] || 0) + 1; });
    const pct = Math.round(right.length / items.length * 100), topics = Object.keys(missed);
    el("px-result").innerHTML = `<p class="big">${right.length} / ${items.length}</p><p>${pct}% on the multiple choice.</p>` +
      (topics.length ? `<p>Review these before the exam:</p><ul>${topics.map(t => `<li>${t}${missed[t] > 1 ? ` (${missed[t]} missed)` : ""}</li>`).join("")}</ul>` : `<p>No misses. Make sure the free response goes as well.</p>`) +
      `<p><a href="#practice-fr">Go to the free response</a></p>`;
    el("px-result").hidden = false;
  }

  // Free response with a points checklist under each model answer.
  el("px-fr").innerHTML = PRACTICE.fr.map((f, i) => {
    const pts = (typeof FR_POINTS !== "undefined" && FR_POINTS[i]) || [], total = pts.reduce((a, p) => a + p[0], 0);
    const guide = pts.length ? `<div class="rubric" data-total="${total}"><p class="rb-h">Score yourself <span class="rb-score">0 / ${total}</span></p><ul>${pts.map(p =>
      `<li><label><input type="checkbox" value="${p[0]}"> <span class="rb-pt">${p[0]} pt</span><span>${p[1]}</span></label></li>`).join("")}</ul></div>` : "";
    return `<article class="fr"><h3><span>Question ${i + 1}</span>${f[0]}</h3><div class="fq">${f[1]}</div>
    <details><summary>Show the model answer and scoring guide</summary><div class="fa">${f[2]}</div>${guide}</details></article>`;
  }).join("");
  el("px-fr").addEventListener("change", e => {
    const r = e.target.closest(".rubric"); if (!r) return;
    const got = [...r.querySelectorAll("input:checked")].reduce((a, c) => a + +c.value, 0);
    r.querySelector(".rb-score").textContent = `${got} / ${r.dataset.total}`;
    const all = [...el("px-fr").querySelectorAll(".rubric")], sum = all.reduce((a, x) => a + [...x.querySelectorAll("input:checked")].reduce((s, c) => s + +c.value, 0), 0);
    el("fr-total").textContent = `Free response so far: ${sum} / ${all.reduce((a, x) => a + +x.dataset.total, 0)} points`;
  });

  document.querySelectorAll("#px-mode button").forEach(b => b.addEventListener("click", () => {
    mode = b.dataset.mode;
    document.querySelectorAll("#px-mode button").forEach(x => x.setAttribute("aria-pressed", x === b));
    render();
  }));
  // Runs after app.js's shared handler has marked the answer.
  document.addEventListener("click", e => { if (e.target.closest("#px-qs .opt")) score(); });
  el("px-reset").addEventListener("click", () => { render(); el("px-qs").querySelector(".opt").focus(); });
  render();
})();
