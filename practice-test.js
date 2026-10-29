// Practice test: renders data/practice-test.js. Answer clicks are handled by the shared quiz code in app.js.
(function () {
  const el = id => document.getElementById(id);
  const LET = "ABCD";
  const shuffle = a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

  function render() {
    el("px-qs").innerHTML = PRACTICE.mc.map((q, qi) => {
      const order = shuffle([0, 1, 2, 3]);
      return `<li data-a="${order.indexOf(q[2])}" data-topic="${q[4]}" data-qid="px:${qi}"><p class="q"><span class="topic">${q[4]}</span>${q[0]}</p>
        <div class="opts" role="group" aria-label="Answer choices for question ${qi + 1}">${order.map((oi, k) =>
          `<button type="button" class="opt" data-i="${k}"><span class="l">${LET[k]}</span><span>${q[1][oi]}</span></button>`).join("")}</div>
        <p class="explain" hidden><b></b> ${q[3]}</p></li>`;
    }).join("");
    el("px-result").hidden = true;
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

  el("px-fr").innerHTML = PRACTICE.fr.map((f, i) => `<article class="fr"><h3><span>Question ${i + 1}</span>${f[0]}</h3><div class="fq">${f[1]}</div>
    <details><summary>Show the model answer</summary><div class="fa">${f[2]}</div></details></article>`).join("");

  // Runs after app.js's shared handler has marked the answer.
  document.addEventListener("click", e => { if (e.target.closest("#px-qs .opt")) score(); });
  el("px-reset").addEventListener("click", () => { render(); el("px-qs").querySelector(".opt").focus(); });
  render();
})();
