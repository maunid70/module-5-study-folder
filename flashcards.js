// Flashcards: key terms from every day's file plus the equation cards in data/cards.js.
(function () {
  const el = id => document.getElementById(id);
  const termsOf = d => d.terms.concat((EXTRA[d.id] || {}).terms || []).map(t => ({ f: t[0], b: t[1], kind: "term", day: d.id }));
  const eqCards = EQ_CARDS.map(c => ({ f: c[0], b: c[1], kind: "eq" }));
  const allTerms = DAYS.flatMap(termsOf);

  // Spaced repetition: each card sits in a box 0-5. Knowing it moves it up a box and schedules it
  // 1, 2, 4, 7 or 14 days out; missing it drops it to box 0, due again today.
  const INT = [0, 1, 2, 4, 7, 14];
  const today = () => Math.floor((Date.now() - new Date().getTimezoneOffset() * 6e4) / 864e5);
  const keyOf = c => c.kind + ":" + c.f.replace(/<[^>]+>/g, "");
  const srsAll = () => { try { return JSON.parse(localStorage.getItem("m5.srs")) || {}; } catch (e) { return {}; } };
  const srsSave = s => { try { localStorage.setItem("m5.srs", JSON.stringify(s)); } catch (e) { } };
  const everyCard = allTerms.concat(eqCards);
  const dueCards = () => { const s = srsAll(), t = today(); return everyCard.filter(c => s[keyOf(c)] && s[keyOf(c)][1] <= t); };
  function record(c, knew) {
    const s = srsAll(), k = keyOf(c), box = s[k] ? s[k][0] : 0, nb = knew ? Math.min(box + 1, 5) : 0;
    s[k] = [nb, today() + (knew ? INT[nb] : 0)]; srsSave(s);
  }
  function dueLabel() {
    const n = dueCards().length, o = document.querySelector('#fc-deck option[value="due"]');
    if (o) o.textContent = `Due for review today (${n})`;
    el("fc-due").textContent = n ? `${n} card${n > 1 ? "s" : ""} due for review today.` : "No cards due today. Cards you study get scheduled automatically.";
    return n;
  }

  const DECKS = [
    { id: "due", label: "Due for review today", cards: [] },
    { id: "terms", label: `Every key term (${allTerms.length})`, cards: allTerms },
    { id: "eq", label: `Equations and constants (${eqCards.length})`, cards: eqCards },
    { id: "all", label: `Everything (${allTerms.length + eqCards.length})`, cards: allTerms.concat(eqCards) }
  ].concat(DAYS.map(d => {
    const m = META[d.id], cards = termsOf(d);
    return { id: d.id, label: `${m[2] ? m[1] : "Skipped"}: ${d.title} (${cards.length})`, cards };
  }));

  el("fc-deck").innerHTML = `<optgroup label="Whole module">${DECKS.slice(0, 4).map(o => `<option value="${o.id}">${o.label}</option>`).join("")}</optgroup>` +
    `<optgroup label="One folder">${DECKS.slice(4).map(o => `<option value="${o.id}">${o.label}</option>`).join("")}</optgroup>`;

  let deck, queue, known, flipped = false, seen = 0;
  const shuffle = a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

  function start(mix) {
    deck = DECKS.find(x => x.id === el("fc-deck").value);
    if (deck.id === "due") deck.cards = dueCards();
    queue = deck.cards.map((c, i) => i);
    if (mix) shuffle(queue);
    known = new Set(); seen = 0;
    draw();
  }

  function draw() {
    const card = el("fc-card"), done = !queue.length;
    el("fc-done").hidden = !done;
    card.hidden = done;
    el("fc-yes").disabled = done; el("fc-no").disabled = done;
    const n = deck.cards.length;
    el("fc-bar").style.setProperty("--p", known.size / n);
    el("fc-count").textContent = done ? `${n} of ${n} known` : `${known.size} of ${n} known · ${queue.length} left in the pile`;
    if (done) {
      el("fc-done").querySelector(".big").textContent = n ? "You knew every card in this deck." : "Nothing is due for review right now.";
      el("fc-again-all").hidden = !n;
      if (!n) { el("fc-done-note").textContent = "Study any other deck. Cards you see are scheduled to come back here: missed ones the same day, known ones after 1, 2, 4, 7 and 14 days."; return; }
      if (deck.id !== "due") document.dispatchEvent(new CustomEvent("deckdone", { detail: deck.id }));
      el("fc-done-note").textContent = seen > n ? `It took ${seen} flips for ${n} cards.` : `${n} cards, none missed.`;
      return;
    }
    const c = deck.cards[queue[0]], rev = el("fc-rev").checked;
    const fk = c.kind === "eq" ? "Prompt" : "Term", bk = c.kind === "eq" ? "Answer" : "Definition";
    el("fc-kf").textContent = rev ? bk : fk; el("fc-kb").textContent = rev ? fk : bk;
    el("fc-front").innerHTML = rev ? c.b : c.f;
    el("fc-back").innerHTML = rev ? c.f : c.b;
    card.dataset.kind = c.kind;
    setFlip(false, true);
  }

  function setFlip(v, instant) {
    flipped = v;
    const card = el("fc-card");
    if (instant) { card.classList.add("instant"); requestAnimationFrame(() => requestAnimationFrame(() => card.classList.remove("instant"))); }
    card.classList.toggle("flipped", v);
    card.setAttribute("aria-label", v ? "Card showing the answer. Press to see the front again." : "Card showing the front. Press to flip.");
  }

  function answer(knew) {
    if (!queue.length) return;
    seen++;
    const i = queue.shift();
    record(deck.cards[i], knew); dueLabel();
    if (knew) known.add(i);
    else queue.splice(Math.min(3, queue.length), 0, i);
    const card = el("fc-card");
    card.classList.remove("next"); void card.offsetWidth; card.classList.add("next");
    draw();
  }

  el("fc-card").addEventListener("click", () => setFlip(!flipped));
  el("fc-yes").addEventListener("click", () => answer(true));
  el("fc-no").addEventListener("click", () => answer(false));
  el("fc-deck").addEventListener("change", () => start(false));
  el("fc-rev").addEventListener("change", draw);
  el("fc-shuffle").addEventListener("click", () => start(true));
  el("fc-restart").addEventListener("click", () => start(false));
  el("fc-again-all").addEventListener("click", () => { start(true); el("fc-card").focus(); });

  // Keys work while focus is anywhere inside the flashcard section (except form fields).
  el("flashcards").addEventListener("keydown", e => {
    if (e.target.closest("select, input")) return;
    if (e.key === " " && e.target.id !== "fc-card" && !e.target.closest("button")) { e.preventDefault(); setFlip(!flipped); }
    else if (e.key === "ArrowRight") { e.preventDefault(); answer(true); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); answer(false); }
  });

  // Open on the folder for today, so the deck matches what was just studied.
  el("fc-deck").value = dueLabel() ? "due" : typeof TODAY === "string" ? TODAY : "terms";
  start(false);
})();
