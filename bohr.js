// Bohr model: click an orbit to move the electron; the photon, energy ladder, wave and equations update together.
(function () {
  const el = id => document.getElementById(id);
  const NS = "http://www.w3.org/2000/svg";
  const H = 6.626e-34, C = 2.998e8, NA = 6.022e23, R = 1.097e7, RH = 2.178e-18;
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const RAD = [0, 42, 84, 128, 172, 216, 260];   // drawn radii for n = 1..6 (real radii grow as n²)
  const CX = 300, CY = 300;
  let Z = 1, n = 2, angle = -Math.PI / 2, busy = false, last = null;

  function sci(x, sf = 3) {
    const e = Math.floor(Math.log10(Math.abs(x)));
    if (e >= -2 && e < sf) return x.toPrecision(sf).replace("-", "−");
    let m = x / Math.pow(10, e), ee = e;
    if (Math.abs(+m.toFixed(sf - 1)) >= 10) { m /= 10; ee++; }
    return `${m.toFixed(sf - 1).replace("-", "−")} × 10<sup>${String(ee).replace("-", "−")}</sup>`;
  }
  // Visible wavelength to a display colour. Outside 380-750 nm the light is invisible, shown in grey.
  function color(nm) {
    if (nm < 380 || nm > 750) return null;
    let r = 0, g = 0, b = 0;
    if (nm < 440) { r = (440 - nm) / 60; b = 1; } else if (nm < 490) { g = (nm - 440) / 50; b = 1; }
    else if (nm < 510) { g = 1; b = (510 - nm) / 20; } else if (nm < 580) { r = (nm - 510) / 70; g = 1; }
    else if (nm < 645) { r = 1; g = (645 - nm) / 65; } else r = 1;
    const f = nm < 420 ? 0.4 + 0.6 * (nm - 380) / 40 : nm > 700 ? 0.4 + 0.6 * (750 - nm) / 50 : 1;
    const c = v => Math.round(255 * Math.pow(v * f, 0.8));
    return `rgb(${c(r)},${c(g)},${c(b)})`;
  }
  const region = nm => nm < 380 ? "ultraviolet" : nm > 750 ? "infrared" : "visible";
  const En = (k) => -RH * Z * Z / (k * k);
  const mk = (tag, attrs, parent) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; };

  /* ---------- Atom ---------- */
  const atom = el("bohr-atom");
  for (let k = 6; k >= 1; k--) {
    const g = mk("g", { class: "orbit", "data-n": k, tabindex: 0, role: "button", "aria-label": `Move the electron to n = ${k}` }, atom);
    mk("circle", { cx: CX, cy: CY, r: RAD[k], class: "ring" }, g);
    mk("circle", { cx: CX, cy: CY, r: RAD[k], class: "hit" }, g);
    mk("text", { x: CX + RAD[k] * 0.72 + 4, y: CY - RAD[k] * 0.72 - 4, class: "nlab" }, g).textContent = "n = " + k;
  }
  mk("circle", { cx: CX, cy: CY, r: 13, class: "nuc" }, atom);
  const zlab = mk("text", { x: CX, y: CY + 5, class: "zlab" }, atom);
  const photon = mk("path", { class: "photon", d: "" }, atom);
  const electron = mk("circle", { r: 9, class: "electron" }, atom);
  const placeE = (r) => { electron.setAttribute("cx", CX + r * Math.cos(angle)); electron.setAttribute("cy", CY + r * Math.sin(angle)); };

  /* ---------- Energy ladder ---------- */
  const lad = el("bohr-ladder"), LT = 30, LB = 520;
  const ly = k => LT + (LB - LT) * (1 / (k * k));
  mk("line", { x1: 70, x2: 70, y1: LT - 12, y2: LB + 10, class: "lax" }, lad);
  mk("text", { x: 70, y: LT - 18, class: "ltop" }, lad).textContent = "E = 0 (electron free)";
  mk("line", { x1: 60, x2: 230, y1: LT, y2: LT, class: "lzero" }, lad);
  const lvl = [];
  for (let k = 1; k <= 6; k++) {
    mk("line", { x1: 60, x2: 230, y1: ly(k), y2: ly(k), class: "lvl" }, lad);
    lvl[k] = mk("text", { x: 236, y: ly(k) + 4, class: "llab" }, lad);
    mk("text", { x: 52, y: ly(k) + 4, class: "lnum" }, lad).textContent = k;
  }
  mk("text", { x: 20, y: (LT + LB) / 2, class: "lname", transform: `rotate(-90 20 ${(LT + LB) / 2})` }, lad).textContent = "Energy (more negative = more tightly bound)";
  const arrow = mk("line", { x1: 140, x2: 140, y1: 0, y2: 0, class: "larrow", "marker-end": "url(#bohr-head)" }, lad);
  const dot = mk("circle", { cx: 140, r: 7, class: "ldot" }, lad);
  function ladderLabels() {
    const on = last || [n, n];
    for (let k = 1; k <= 6; k++) {
      const show = k <= 3 || on.includes(k);
      lvl[k].innerHTML = show ? sci(En(k)).replace(/<sup>(.*?)<\/sup>/, '<tspan dy="-5" font-size="8">$1</tspan><tspan dy="5">') + " J</tspan>" : "";
      if (!/tspan/.test(lvl[k].innerHTML) && show) lvl[k].textContent = sci(En(k)) + " J";
      lvl[k].classList.toggle("on", on.includes(k));
    }
  }

  /* ---------- Equations ---------- */
  function equations(from, to) {
    const Ei = En(from), Ef = En(to), dE = Ef - Ei, E = Math.abs(dE), lam = H * C / E, nu = C / lam, nm = lam * 1e9;
    const emit = dE < 0, rinv = R * Z * Z * Math.abs(1 / (Math.min(from, to) ** 2) - 1 / (Math.max(from, to) ** 2));
    const zz = Z === 1 ? "" : ` × ${Z}<sup>2</sup>`;
    el("eq-1").innerHTML = `E<sub>${from}</sub> = −2.178 × 10<sup>−18</sup> J${zz}/${from}<sup>2</sup> = <b>${sci(Ei)} J</b><br>E<sub>${to}</sub> = −2.178 × 10<sup>−18</sup> J${zz}/${to}<sup>2</sup> = <b>${sci(Ef)} J</b>`;
    el("eq-2").innerHTML = `ΔE = E<sub>final</sub> − E<sub>initial</sub> = ${sci(Ef)} − (${sci(Ei)}) = <b>${sci(dE)} J</b><br>${emit ? "Negative: the atom loses energy, so a photon is <b>emitted</b>." : "Positive: the atom gains energy, so a photon is <b>absorbed</b>."}`;
    el("eq-3").innerHTML = `E<sub>photon</sub> = |ΔE| = <b>${sci(E)} J</b>`;
    el("eq-4").innerHTML = `λ = hc/E = (6.626 × 10<sup>−34</sup>)(2.998 × 10<sup>8</sup>)/(${sci(E)}) = <b>${sci(lam)} m = ${sci(nm)} nm</b>, ${region(nm)}<br><span class="eq-check">Same answer from Rydberg: 1/λ = R${Z === 1 ? "" : "Z<sup>2</sup>"}(1/${Math.min(from, to)}<sup>2</sup> − 1/${Math.max(from, to)}<sup>2</sup>) = ${sci(rinv)} m<sup>−1</sup></span>`;
    el("eq-5").innerHTML = `ν = c/λ = (2.998 × 10<sup>8</sup>)/(${sci(lam)}) = <b>${sci(nu)} Hz</b><br>Check: E = hν = (6.626 × 10<sup>−34</sup>)(${sci(nu)}) = ${sci(H * nu)} J`;
    el("eq-6").innerHTML = `${sci(E)} J × 6.022 × 10<sup>23</sup> mol<sup>−1</sup> ÷ 1000 = <b>${sci(E * NA / 1000)} kJ/mol</b>`;
    el("bohr-sum").innerHTML = `${emit ? "Emission" : "Absorption"}: n = ${from} → n = ${to}. ${emit ? "The electron falls and gives off" : "The electron absorbs"} a ${sci(nm)} nm ${region(nm)} photon${color(nm) ? "" : ", which your eyes cannot see"}.`;
    return { nm, nu, emit };
  }
  function lightSteps(k) { document.querySelectorAll(".eq-step").forEach((s, i) => s.classList.toggle("lit", i < k)); }

  /* ---------- Wave strip ---------- */
  const wsvg = el("bohr-wave"), wpath = mk("path", { class: "wpath" }, wsvg), WW = 1000, WH = 160;
  const ruler = mk("g", { class: "ruler" }, wsvg), rl = mk("line", { y1: 22, y2: 22 }, ruler), rt = mk("text", { y: 16 }, ruler);
  const probe = mk("line", { x1: 500, x2: 500, y1: 30, y2: 150, class: "probe" }, wsvg);
  let spacing = 120, phase = 0, wcol = "#a1ffcb";
  function setWave(nm, nu) {
    // Drawn crest spacing grows with λ (log scale so UV and IR both fit). The wave moves at the same speed for every λ, like light.
    spacing = 22 + 190 * (Math.log(nm) - Math.log(90)) / (Math.log(4200) - Math.log(90));
    wcol = color(nm) || "var(--field-muted)";
    wpath.style.stroke = wcol;
    wpath.classList.toggle("invisible", !color(nm));
    rl.setAttribute("x1", 40); rl.setAttribute("x2", 40 + spacing); rt.setAttribute("x", 40);
    rt.textContent = `λ = ${nm >= 1000 ? Math.round(nm).toLocaleString() : nm.toPrecision(3)} nm`;
    el("wave-nu").innerHTML = `ν = ${sci(nu)} crests pass a point each second`;
    drawWave();
    el("wave-note").textContent = color(nm) ? `Shorter λ means more crests per second, so higher ν and more energy per photon.` : `${region(nm) === "ultraviolet" ? "Ultraviolet: shorter than violet" : "Infrared: longer than red"}, so invisible to your eyes. Drawn in grey.`;
  }
  function drawWave() {
    let d = "";
    for (let x = 0; x <= WW; x += 4) { const y = 90 + 48 * Math.sin(2 * Math.PI * (x - phase) / spacing); d += (x ? "L" : "M") + x + " " + y.toFixed(1); }
    wpath.setAttribute("d", d);
  }

  /* ---------- Photon packet in the atom ---------- */
  function packet(x0, y0, x1, y1, nm, t) {
    // A short wave packet travelling from (x0,y0) to (x1,y1); t from 0 to 1.
    const len = 90, dx = x1 - x0, dy = y1 - y0, L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, px = -uy, py = ux;
    const head = t * (L + len), sp = Math.max(8, spacing / 5);
    let d = "";
    for (let s = Math.max(0, head - len); s <= Math.min(L, head); s += 2) {
      const a = 9 * Math.sin(2 * Math.PI * s / sp), x = x0 + ux * s + px * a, y = y0 + uy * s + py * a;
      d += (d ? "L" : "M") + x.toFixed(1) + " " + y.toFixed(1);
    }
    photon.setAttribute("d", d);
    photon.style.stroke = color(nm) || "var(--field-muted)";
  }

  /* ---------- Transitions ---------- */
  const ease = t => t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  function animate(ms, fn) { return new Promise(res => { if (still) { fn(1); return res(); } const t0 = performance.now(); const step = now => { const t = Math.min(1, (now - t0) / ms); fn(t); t < 1 ? requestAnimationFrame(step) : res(); }; requestAnimationFrame(step); }); }
  async function jump(to) {
    if (busy || to === n) return;
    busy = true; const from = n; last = [from, to]; ladderLabels();
    const r = equations(from, to); lightSteps(1);
    document.querySelectorAll("#bohr-atom .orbit").forEach(g => g.classList.toggle("target", +g.dataset.n === to));
    arrow.setAttribute("y1", ly(from)); arrow.setAttribute("y2", ly(from)); arrow.classList.toggle("up", !r.emit);
    const ex = () => CX + RAD[n] * Math.cos(angle), ey = () => CY + RAD[n] * Math.sin(angle);
    const out = [CX + 295 * Math.cos(angle - 0.5), CY + 295 * Math.sin(angle - 0.5)];
    if (!r.emit) { // photon comes in first
      const tx = CX + RAD[from] * Math.cos(angle), ty = CY + RAD[from] * Math.sin(angle);
      await animate(1100, t => packet(out[0], out[1], tx, ty, r.nm, t));
      photon.setAttribute("d", "");
    }
    lightSteps(2);
    await animate(700, t => {
      const e = ease(t), rr = RAD[from] + (RAD[to] - RAD[from]) * e;
      placeE(rr); dot.setAttribute("cy", ly(from) + (ly(to) - ly(from)) * e);
      arrow.setAttribute("y2", ly(from) + (ly(to) - ly(from)) * e);
    });
    n = to; lightSteps(3);
    if (r.emit) {
      const sx = ex(), sy = ey();
      await animate(1300, t => { packet(sx, sy, out[0], out[1], r.nm, t); if (t > .35) lightSteps(4); if (t > .7) lightSteps(5); });
      photon.setAttribute("d", "");
    }
    setWave(r.nm, r.nu); lightSteps(6);
    busy = false;
  }

  /* ---------- Orbit loop ---------- */
  function frame() {
    if (!busy) { angle += 0.018 / (n * n) * 6; placeE(RAD[n]); }
    phase += 3; drawWave();
    requestAnimationFrame(frame);
  }

  /* ---------- Controls ---------- */
  atom.addEventListener("click", e => { const g = e.target.closest(".orbit"); if (g) jump(+g.dataset.n); });
  atom.addEventListener("keydown", e => { const g = e.target.closest(".orbit"); if (g && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); jump(+g.dataset.n); } });
  el("bohr-z").addEventListener("change", () => {
    Z = +el("bohr-z").value; zlab.textContent = "+" + Z; ladderLabels();
    document.querySelector(".bohr-presets").hidden = Z !== 1;
    if (last) { const r = equations(last[0], last[1]); setWave(r.nm, r.nu); }
  });
  document.querySelectorAll("[data-jump]").forEach(b => b.addEventListener("click", async () => {
    const [a, c] = b.dataset.jump.split(",").map(Number);
    if (n !== a) await jump(a);
    jump(c);
  }));

  zlab.textContent = "+1"; ladderLabels(); placeE(RAD[n]);
  dot.setAttribute("cy", ly(n)); arrow.setAttribute("y1", ly(n)); arrow.setAttribute("y2", ly(n));
  const r0 = equations(4, 2); last = [4, 2]; ladderLabels(); setWave(r0.nm, r0.nu); lightSteps(6);
  if (still) { placeE(RAD[n]); drawWave(); } else requestAnimationFrame(frame);
})();
