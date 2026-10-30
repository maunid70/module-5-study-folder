// Night-before page: your own weak spots (from what this browser has saved) plus the highest-yield facts.
(function () {
  const el = id => document.getElementById(id);
  const get = (k, d) => { try { const v = JSON.parse(localStorage.getItem("m5." + k)); return v == null ? d : v; } catch (e) { return d; } };

  function render() {
    const missed = get("missed", []), best = get("best", {}), srs = get("srs", {});
    // Missed questions grouped by folder (or by practice-test topic).
    const groups = {};
    missed.forEach(id => {
      const [src, i] = id.split(":"), d = DAYS.find(x => x.id === src);
      const name = src === "px" ? (PRACTICE.mc[+i] || [])[4] : d && d.title, href = src === "px" ? "#review" : "#" + src;
      if (!name) return;
      (groups[name] = groups[name] || { n: 0, href }).n++;
    });
    const top = Object.entries(groups).sort((a, b) => b[1].n - a[1].n);
    const weakDays = DAYS.filter(d => META[d.id][2] && d.quiz.length).map(d => ({ d, b: best[d.id] }))
      .filter(x => !x.b || x.b[0] / x.b[1] < 0.8);
    const shaky = Object.values(srs).filter(v => v[0] <= 1).length;
    let h = "";
    h += top.length ? `<h3>Questions you missed</h3><ul class="tn-list">${top.map(([n, g]) => `<li><a href="${g.href}">${n}</a> <span>${g.n} missed</span></li>`).join("")}</ul><p class="tn-act"><a class="btn" href="#review">Retry all ${missed.length}</a></p>`
      : `<h3>Questions you missed</h3><p class="tn-empty">None saved in this browser. Take the <a href="#practice">practice test</a> to find your weak spots.</p>`;
    h += `<h3>Folder quizzes under 80% or not taken</h3>` + (weakDays.length
      ? `<ul class="tn-list">${weakDays.map(x => `<li><a href="#${x.d.id}">${META[x.d.id][1]}: ${x.d.title}</a> <span>${x.b ? `best ${x.b[0]}/${x.b[1]}` : "not taken"}</span></li>`).join("")}</ul>`
      : `<p class="tn-empty">Every folder quiz is at 80% or better.</p>`);
    h += `<h3>Flashcards still shaky</h3><p class="tn-empty">${shaky ? `${shaky} card${shaky > 1 ? "s" : ""} you have missed or only just learned. <a href="#flashcards">Review the due deck</a>.` : `None. <a href="#flashcards">Run the equations deck</a> once more anyway.`}</p>`;
    el("tn-mine").innerHTML = h;
  }
  window.addEventListener("hashchange", () => { if (document.body.dataset.page === "tonight") render(); });
  render();
})();
