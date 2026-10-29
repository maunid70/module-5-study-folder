// Chemistry tools: electron configuration, quantum numbers, periodic trends, photon and particle calculators.
(function () {
  const el = id => document.getElementById(id);
  const SUPD = { "⁰": "0", "¹": "1", "²": "2", "³": "3", "⁴": "4", "⁵": "5", "⁶": "6", "⁷": "7", "⁸": "8", "⁹": "9" };
  const sup = x => `<sup>${x}</sup>`;

  /* ---------- Tabs ---------- */
  const tabs = [...document.querySelectorAll(".tooltabs [role=tab]")];
  function pick(t, focus) {
    tabs.forEach(b => {
      const on = b === t;
      b.setAttribute("aria-selected", on); b.tabIndex = on ? 0 : -1;
      el(b.getAttribute("aria-controls")).hidden = !on;
    });
    if (focus) t.focus();
  }
  tabs.forEach((t, i) => {
    t.addEventListener("click", () => pick(t));
    t.addEventListener("keydown", e => {
      const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
      if (d) { e.preventDefault(); pick(tabs[(i + d + tabs.length) % tabs.length], true); }
    });
  });

  /* ---------- Number parsing and formatting ---------- */
  function num(raw) {
    let s = String(raw).trim().replace(/[\s,]/g, "").replace(/−/g, "-").replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/g, c => SUPD[c]).replace(/⁻/g, "-");
    s = s.replace(/(?:[x×*]|·)10\^?/i, "e");
    if (!/^[-+]?(\d+\.?\d*|\.\d+)(e[-+]?\d+)?$/i.test(s)) return NaN;
    return parseFloat(s);
  }
  function sci(x, unit, sf = 3) {
    if (x === 0) return "0" + (unit ? " " + unit : "");
    const e = Math.floor(Math.log10(Math.abs(x)));
    if (e >= -2 && e < sf) return x.toPrecision(sf) + (unit ? " " + unit : "");
    let m = (x / Math.pow(10, e)).toFixed(sf - 1), ee = e;
    if (Math.abs(parseFloat(m)) >= 10) { m = (parseFloat(m) / 10).toFixed(sf - 1); ee++; }
    return `${m} × 10${sup(String(ee).replace("-", "−"))}` + (unit ? " " + unit : "");
  }
  const H = 6.626e-34, C = 2.998e8, NA = 6.022e23, ME = 9.109e-31, EV = 1.602e-19;

  /* ---------- Electron configuration ---------- */
  const ORDER = ["1s", "2s", "2p", "3s", "3p", "4s", "3d", "4p", "5s", "4d", "5p", "6s", "4f", "5d", "6p", "7s", "5f", "6d", "7p"];
  const CAP = { s: 2, p: 6, d: 10, f: 14 }, LNUM = { s: 0, p: 1, d: 2, f: 3 };
  const NOBLE = [[2, "He"], [10, "Ne"], [18, "Ar"], [36, "Kr"], [54, "Xe"], [86, "Rn"]];
  // Real ground states that differ from the Aufbau prediction (elements 1-86).
  const EXC = {
    24: { "4s": 1, "3d": 5 }, 29: { "4s": 1, "3d": 10 }, 41: { "5s": 1, "4d": 4 }, 42: { "5s": 1, "4d": 5 },
    44: { "5s": 1, "4d": 7 }, 45: { "5s": 1, "4d": 8 }, 46: { "5s": 0, "4d": 10 }, 47: { "5s": 1, "4d": 10 },
    57: { "4f": 0, "5d": 1 }, 58: { "4f": 1, "5d": 1 }, 64: { "4f": 7, "5d": 1 }, 78: { "6s": 1, "5d": 9 }, 79: { "6s": 1, "5d": 10 }
  };
  const EXC_WHY = {
    24: "A half-filled 3d set (3d⁵) plus 4s¹ is lower in energy than 4s² 3d⁴, so one 4s electron moves into 3d.",
    29: "A completely filled 3d set (3d¹⁰) plus 4s¹ is lower in energy than 4s² 3d⁹.",
    42: "Like chromium above it: a half-filled 4d set plus 5s¹.",
    47: "Like copper above it: a filled 4d set plus 5s¹.",
    79: "Like copper: a filled 5d set plus 6s¹."
  };
  const subs = s => ({ n: +s[0], l: LNUM[s[1]], t: s[1] });

  function aufbau(N) {
    const c = {}; let left = N;
    for (const s of ORDER) { if (left <= 0) break; const k = Math.min(CAP[s[1]], left); c[s] = k; left -= k; }
    return c;
  }
  function neutral(Z) {
    const c = aufbau(Z);
    if (EXC[Z]) Object.assign(c, EXC[Z]);
    for (const k in c) if (!c[k]) delete c[k];
    return c;
  }
  function configFor(Z, q) {
    if (q < 0) return aufbau(Z - q);
    const c = neutral(Z);
    for (let i = 0; i < q; i++) {
      const occ = Object.keys(c).filter(k => c[k] > 0).sort((a, b) => subs(b).n - subs(a).n || subs(b).l - subs(a).l);
      if (!occ.length) break;
      if (--c[occ[0]] === 0) delete c[occ[0]];
    }
    return c;
  }
  const total = c => Object.values(c).reduce((a, b) => a + b, 0);
  const ordered = c => ORDER.filter(s => c[s]);
  const same = (a, b) => { const ka = ordered(a), kb = ordered(b); return ka.length === kb.length && ka.every(k => a[k] === b[k]); };

  function coreOf(c) {
    const N = total(c);
    for (let i = NOBLE.length - 1; i >= 0; i--) {
      const [nz, sym] = NOBLE[i];
      if (nz >= N) continue;
      const nc = aufbau(nz);
      if (Object.keys(nc).every(k => c[k] === nc[k])) return { sym, cfg: nc };
    }
    return null;
  }
  function fmt(c, useCore) {
    const core = useCore ? coreOf(c) : null;
    const rest = ordered(c).filter(k => !core || !core.cfg[k]);
    return (core ? `[${core.sym}] ` : "") + rest.map(k => `${k}${sup(c[k])}`).join(" ");
  }
  const unpairedIn = (k, s) => { const m = 2 * LNUM[s[1]] + 1; return k <= m ? k : 2 * m - k; };

  function boxes(c) {
    const core = coreOf(c);
    const show = ordered(c).filter(k => !core || !core.cfg[k]);
    // also show an empty d or p set if it is the next to fill? Keep to occupied subshells.
    return show.map(s => {
      const m = 2 * LNUM[s[1]] + 1, k = c[s], cells = [];
      for (let i = 0; i < m; i++) {
        const up = i < k, down = i + m < k;
        cells.push(`<span class="ob">${up ? "<i>↑</i>" : ""}${down ? "<i>↓</i>" : ""}</span>`);
      }
      return `<div class="obg"><div class="obs">${cells.join("")}</div><span class="obl">${s}</span></div>`;
    }).join("");
  }

  function findEl(raw) {
    const s = raw.trim();
    if (!s) return null;
    if (/^\d+$/.test(s)) return ELEMENTS.find(e => e.z === +s) || null;
    const lo = s.toLowerCase();
    return ELEMENTS.find(e => e.s.toLowerCase() === lo) || ELEMENTS.find(e => e.name.toLowerCase() === lo) ||
      (lo === "aluminium" ? ELEMENTS[12] : lo === "caesium" ? ELEMENTS[54] : lo === "sulphur" ? ELEMENTS[15] : null);
  }
  el("ec-list").innerHTML = ELEMENTS.map(e => `<option value="${e.s}">${e.z} ${e.name}</option>`).join("");

  const qName = q => q === 0 ? "" : (Math.abs(q) > 1 ? Math.abs(q) : "") + (q > 0 ? "+" : "−");
  let ecState = null, revealed = true;

  function ecRender() {
    const e = findEl(el("ec-el").value), q = +el("ec-q").value;
    const out = el("ec-out");
    if (!e) { ecState = null; el("ec-name").textContent = "Type an element from 1 (H) to 86 (Rn)."; ["ec-config", "ec-full", "ec-boxes", "ec-facts", "ec-note"].forEach(i => el(i).innerHTML = ""); return; }
    if (q > 0 && q >= e.z) { ecState = null; el("ec-name").innerHTML = `${e.s}${sup(qName(q))} has no electrons left.`; ["ec-config", "ec-full", "ec-boxes", "ec-facts", "ec-note"].forEach(i => el(i).innerHTML = ""); return; }
    const c = configFor(e.z, q), N = total(c);
    const unp = ordered(c).reduce((a, s) => a + unpairedIn(c[s], s), 0);
    const nmax = Math.max(...ordered(c).map(s => subs(s).n));
    const outer = ordered(c).filter(s => subs(s).n === nmax).reduce((a, s) => a + c[s], 0);
    const label = `${e.s}${q ? sup(qName(q)) : ""}`;
    ecState = { e, q, c, label };
    el("ec-name").innerHTML = `${e.name}${q ? ` ion, ${label}` : ""} · Z = ${e.z} · ${N} electron${N === 1 ? "" : "s"}`;
    el("ec-config").innerHTML = fmt(c, true);
    el("ec-full").innerHTML = coreOf(c) ? `Written out: ${fmt(c, false)}` : "";
    el("ec-boxes").innerHTML = N ? boxes(c) : "";
    const iso = NOBLE.find(n => n[0] === N);
    el("ec-facts").innerHTML = [
      ["Unpaired electrons", unp],
      ["Magnetism", unp ? "Paramagnetic" : "Diamagnetic"],
      [`Electrons in the outer shell (n = ${nmax})`, outer],
      ["Block", e.g == null || (e.z >= 57 && e.z <= 71) ? "f block" : e.g <= 2 || e.z === 2 ? "s block" : e.g >= 13 ? "p block" : "d block"]
    ].map(r => `<div><dt>${r[0]}</dt><dd>${r[1]}</dd></div>`).join("");
    let note = "";
    if (!q && EXC[e.z]) note = `<b>An exception.</b> The Aufbau order predicts ${fmt(aufbau(e.z), true)}. ${EXC_WHY[e.z] || "Nearby subshells are so close in energy that the real ground state differs from the simple filling order."}`;
    else if (q > 0) {
      const n0 = neutral(e.z), outerS = ordered(n0).filter(k => k[1] === "s").pop();
      const hasInner = ordered(n0).some(k => (k[1] === "d" || k[1] === "f") && subs(k).n < subs(outerS).n);
      if (hasInner && (c[outerS] || 0) < n0[outerS]) note = `<b>Remove from the highest n first.</b> ${e.s} loses its ${outerS} electrons before any d or f electrons, even though ${outerS} filled first.`;
    }
    if (iso && q) note += `${note ? " " : ""}<b>Isoelectronic with ${iso[1]}.</b> Same ${N} electrons, ${e.z > iso[0] ? "more" : "fewer"} protons, so ${label} is ${e.z > iso[0] ? "smaller" : "larger"} than a ${iso[1]} atom.`;
    el("ec-note").innerHTML = note;
    el("ec-fb").textContent = ""; el("ec-fb").removeAttribute("data-ok");
    revealed = !el("ec-hide").checked;
    out.classList.toggle("veiled", !revealed);
  }

  function parseCfg(raw) {
    let s = raw.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/g, c => SUPD[c]).replace(/\^/g, "").replace(/[{}]/g, "");
    const c = {}; let m;
    const core = s.match(/\[\s*([A-Za-z]{1,2})\s*\]/);
    if (core) {
      const ng = NOBLE.find(n => n[1].toLowerCase() === core[1].toLowerCase());
      if (!ng) return { err: `[${core[1]}] isn’t a noble gas core. Use [He], [Ne], [Ar], [Kr], [Xe] or [Rn].` };
      Object.assign(c, aufbau(ng[0]));
      s = s.replace(core[0], " ");
    }
    const re = /([1-7])\s*([spdf])\s*(\d{1,2})/gi; let used = "";
    while ((m = re.exec(s))) {
      const k = m[1] + m[2].toLowerCase(), v = +m[3];
      if (!ORDER.includes(k)) return { err: `There is no ${k} subshell. Remember l must be less than n.` };
      if (v > CAP[k[1]]) return { err: `${k} holds at most ${CAP[k[1]]} electrons.` };
      c[k] = (c[k] || 0) + v; used += m[0];
    }
    const leftover = s.replace(re, "").replace(/[\s,.]/g, "");
    if (!Object.keys(c).length || leftover) return { err: "I couldn’t read that. Write it like 1s2 2s2 2p6 or [Ne] 3s1." };
    for (const k in c) if (c[k] > CAP[k[1]]) return { err: `${k} holds at most ${CAP[k[1]]} electrons.` };
    for (const k in c) if (!c[k]) delete c[k];
    return { c };
  }

  function ecCheck() {
    const fb = el("ec-fb");
    if (!ecState) { fb.textContent = "Pick an element first."; return; }
    const g = parseCfg(el("ec-guess").value);
    if (g.err) { fb.textContent = g.err; delete fb.dataset.ok; return; }
    const { c, e, q, label } = ecState, want = total(c), got = total(g.c);
    let msg, ok = false;
    if (same(g.c, c)) { ok = true; msg = `Correct. That is the ground state of ${label.replace(/<[^>]+>/g, "")}.`; }
    else if (got !== want) msg = `That has ${got} electrons. ${label.replace(/<[^>]+>/g, "")} has ${want}${q ? ` (${e.z} protons, charge ${qName(q)})` : ""}.`;
    else if (!q && EXC[e.z] && same(g.c, aufbau(e.z))) msg = `That’s what the Aufbau order predicts, but ${e.s} is one of the exceptions. Look at its d and s electrons again.`;
    else if (q > 0 && same(g.c, aufbau(e.z - q))) msg = `Right count, but for a cation take electrons from the highest n first. The outer s electrons leave before the d electrons.`;
    else {
      const firstOff = ORDER.find(k => (g.c[k] || 0) !== (c[k] || 0));
      msg = `Right number of electrons, wrong arrangement. Check ${firstOff}: follow the filling order and fill each subshell before the next.`;
    }
    fb.textContent = msg;
    if (ok) fb.dataset.ok = ""; else delete fb.dataset.ok;
    if (ok && !revealed) { revealed = true; el("ec-out").classList.remove("veiled"); }
  }

  el("ec-el").addEventListener("input", ecRender);
  el("ec-q").addEventListener("change", ecRender);
  el("ec-form").addEventListener("submit", e => e.preventDefault());
  el("ec-hide").addEventListener("change", ecRender);
  el("ec-check").addEventListener("click", ecCheck);
  el("ec-guess").addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); ecCheck(); } });
  el("ec-out").addEventListener("click", () => { if (!revealed) { revealed = true; el("ec-out").classList.remove("veiled"); } });
  el("ec-rand").addEventListener("click", () => {
    const pool = ELEMENTS.filter(x => x.z <= 56 || (x.z >= 72 && x.z <= 86));
    const e = pool[Math.floor(Math.random() * pool.length)];
    el("ec-el").value = e.s;
    el("ec-q").value = "0";
    el("ec-hide").checked = true;
    el("ec-guess").value = "";
    ecRender();
    el("ec-guess").focus();
  });
  ecRender();

  /* ---------- Quantum numbers ---------- */
  const LET = "spdfghi";
  const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
  el("qn-n").innerHTML = range(0, 7).map(v => `<option${v === 3 ? " selected" : ""}>${v}</option>`).join("");
  el("qn-l").innerHTML = range(0, 6).map(v => `<option value="${v}"${v === 2 ? " selected" : ""}>${v} (${LET[v]})</option>`).join("");
  el("qn-ml").innerHTML = range(-6, 6).map(v => `<option value="${v}"${v === -1 ? " selected" : ""}>${String(v).replace("-", "−")}</option>`).join("");
  const IMG = { "1s": "orb-1s", "2s": "orb-2s", "2p": "orb-2p", "3p": "orb-3p", "3d": "orb-3dz2" };
  const SHAPE = ["Sphere", "Dumbbell, two lobes", "Four lobes (d<sub>z²</sub>: two lobes and a ring)", "Many lobes"];

  function qnRender() {
    const n = +el("qn-n").value, l = +el("qn-l").value, ml = +el("qn-ml").value, ms = +el("qn-ms").value;
    const set = `(${n}, ${l}, ${String(ml).replace("-", "−")}, ${ms > 0 ? "+½" : "−½"})`;
    const v = el("qn-v"), why = el("qn-why"), det = el("qn-detail");
    let bad = "";
    if (n < 1) bad = "n must be a whole number of 1 or more. There is no shell 0.";
    else if (l > n - 1) bad = `l must run from 0 to n − 1. With n = ${n}, l can only be ${range(0, n - 1).join(", ")}${n === 1 ? " (just 1s)" : ""}.`;
    else if (Math.abs(ml) > l) bad = `m<sub>l</sub> must run from −l to +l. With l = ${l}, m<sub>l</sub> can only be ${range(-l, l).map(x => String(x).replace("-", "−")).join(", ")}.`;
    if (bad) {
      v.innerHTML = `${set} is not allowed`; v.dataset.bad = "";
      why.innerHTML = bad; det.innerHTML = ""; return;
    }
    delete v.dataset.bad;
    const sub = n + LET[l], orbs = 2 * l + 1;
    v.innerHTML = `${set} is allowed: a ${sub} electron`;
    why.innerHTML = `It is in shell ${n}, the ${sub} subshell, in the orbital with m<sub>l</sub> = ${String(ml).replace("-", "−")}, spinning ${ms > 0 ? "up" : "down"}. No other electron in the atom can have this same set of four numbers (the Pauli exclusion principle).`;
    const facts = [
      ["Orbitals in the " + sub + " subshell", `${orbs} (m<sub>l</sub> = ${range(-l, l).map(x => String(x).replace("-", "−")).join(", ")})`],
      ["Electrons the " + sub + " subshell holds", 2 * orbs],
      [`Electrons shell n = ${n} holds`, `2n${sup(2)} = ${2 * n * n}`],
      ["Shape", l <= 3 ? SHAPE[l] : "Not used by any ground-state atom"],
      ["Angular nodes (= l)", l],
      ["Radial nodes (= n − l − 1)", n - l - 1]
    ];
    det.innerHTML = `<dl class="mini">${facts.map(r => `<div><dt>${r[0]}</dt><dd>${r[1]}</dd></div>`).join("")}</dl>` +
      (IMG[sub] ? `<figure class="qn-img"><img src="img/${IMG[sub]}.webp" alt="Electron density of a hydrogen ${sub}${sub === "3d" ? " (d z-squared)" : ""} orbital" width="720" height="1080" loading="lazy"><figcaption>A hydrogen ${sub === "3d" ? "3d<sub>z²</sub>" : sub} orbital, computed from the wavefunction.</figcaption></figure>` : "") +
      (l >= 4 ? `<p class="note">${LET[l]} orbitals are allowed by the rules but no element in its ground state has electrons in them.</p>` : "");
  }
  ["qn-n", "qn-l", "qn-ml", "qn-ms"].forEach(i => el(i).addEventListener("change", qnRender));
  el("qn-form").addEventListener("submit", e => e.preventDefault());
  qnRender();

  /* ---------- Periodic trends ---------- */
  const PROPS = {
    rad: { name: "Atomic radius", unit: "pm", up: "down-left", txt: "Covalent radius in picometers. Biggest at the bottom left, smallest at the top right." },
    ie: { name: "First ionization energy", unit: "kJ/mol", up: "up-right", txt: "Energy to remove one electron from a gaseous atom, kJ/mol. Highest at the top right." },
    en: { name: "Electronegativity", unit: "", up: "up-right", txt: "Pauling scale. Fluorine is highest; noble gases have no value." },
    ea: { name: "Electron affinity", unit: "kJ/mol", up: "up-right", txt: "Energy released when a gaseous atom gains an electron, kJ/mol. Grey means the anion isn’t stable (zero or less)." }
  };
  let prop = "rad", sel = [];
  const val = (e, p) => p === "ea" ? (e.ea != null && e.ea > 0 ? e.ea : null) : e[p];
  function pos(e) {
    if (e.z >= 57 && e.z <= 71) return { r: 8, c: e.z - 57 + 3 };
    return { r: e.p, c: e.g };
  }
  function tableHTML() {
    const vals = ELEMENTS.map(e => val(e, prop)).filter(v => v != null).sort((a, b) => a - b);
    const rank = v => { let lo = 0, hi = vals.length - 1; while (lo < hi) { const m = (lo + hi) >> 1; if (vals[m] < v) lo = m + 1; else hi = m; } return lo / (vals.length - 1); };
    let h = ELEMENTS.map(e => {
      const v = val(e, prop), p = pos(e), t = v == null ? null : rank(v);
      const style = `grid-row:${p.r};grid-column:${p.c};` + (t == null ? "" : `--t:${t.toFixed(3)}`);
      const on = sel.includes(e.z) ? ' aria-pressed="true"' : ' aria-pressed="false"';
      return `<button type="button" class="pe${t == null ? " nil" : ""}${t != null && t > 0.55 ? " hi" : ""}" data-z="${e.z}" style="${style}"${on} aria-label="${e.name}, ${v == null ? "no value" : v + " " + PROPS[prop].unit}"><span class="z">${e.z}</span><span class="s">${e.s}</span><span class="v">${v == null ? "—" : prop === "en" ? v.toFixed(2) : v}</span></button>`;
    }).join("");
    h += `<span class="fgap" style="grid-row:6;grid-column:3">57–71</span><span class="frow-l" style="grid-row:8;grid-column:1 / 3">57–71</span>`;
    el("ptable").innerHTML = h;
    el("pt-legend").textContent = PROPS[prop].txt;
  }

  // Simple Zeff estimate for main-group elements: Z minus core electrons = number of valence electrons.
  const mainGroup = e => e.g != null && (e.g <= 2 || e.g >= 13);
  const valence = e => e.z === 2 ? 2 : e.g <= 2 ? e.g : e.g - 10;
  function compare(a, b) {
    const p = PROPS[prop], va = val(a, prop), vb = val(b, prop);
    if (va == null || vb == null) return `<p>${(va == null ? a : b).name} has no ${p.name.toLowerCase()} value to compare${prop === "en" ? " (noble gases rarely bond)" : prop === "ea" ? " (its anion isn’t stable)" : ""}.</p>`;
    const big = va > vb ? a : b, small = big === a ? b : a;
    let h = `<p class="cmp"><b>${big.s}</b> has the ${prop === "rad" ? "larger radius" : "higher " + p.name.toLowerCase()}: ${val(big, prop)} vs ${val(small, prop)}${p.unit ? " " + p.unit : ""}.</p>`;
    let why = "";
    const incAcross = prop !== "rad"; // radius shrinks across, others grow
    if (a.p === b.p && a.z !== b.z) {
      const left = a.z < b.z ? a : b, right = left === a ? b : a;
      const predicted = incAcross ? right : left;
      if (mainGroup(a) && mainGroup(b)) {
        why = `Same period, so both have their outer electrons in shell ${a.p} with the same core electrons (${left.z - valence(left)}) shielding them. ${right.s} has more protons, so Z<sub>eff</sub> ≈ Z − S rises from about +${valence(left)} to +${valence(right)}, pulling the outer electrons in harder.`;
        if (predicted !== big) {
          if (prop === "ie" && left.g === 2 && right.g === 13) why += ` <b>But this pair is an exception:</b> ${right.s}’s electron is in a p orbital, higher in energy and partly shielded by the filled s, so it is easier to remove.`;
          else if (prop === "ie" && left.g === 15 && right.g === 16) why += ` <b>But this pair is an exception:</b> ${right.s}’s fourth p electron is paired in an orbital, and the repulsion between the pair makes it easier to remove.`;
          else why += ` <b>This pair breaks the simple trend</b>, usually because of a filled or half-filled subshell.`;
        }
      } else why = `Same period. Across the transition metals the electrons go into an inner d subshell, so the values change only a little and the simple trend is bumpy.`;
    } else if (a.g != null && a.g === b.g && a.z !== b.z && !(a.z >= 57 && a.z <= 71) && !(b.z >= 57 && b.z <= 71)) {
      const top = a.p < b.p ? a : b, bot = top === a ? b : a;
      why = `Same group, so the outer electrons see about the same Z<sub>eff</sub>. ${bot.s}’s outer electrons are in shell ${bot.p} instead of ${top.p}: farther from the nucleus, with more core electrons between, so the Coulomb attraction is weaker.`;
      const predicted = incAcross ? top : bot;
      if (predicted !== big) why += ` <b>This pair goes against the usual trend.</b>${prop === "ea" && top.p === 2 ? ` Period 2 atoms are so small that an added electron is crowded by the ones already there.` : ""}`;
    } else why = `These are in different periods and groups. Use the overall direction: ${prop === "rad" ? "radius grows toward the bottom left" : p.name.toLowerCase() + " grows toward the top right"}.`;
    return h + `<p>${why}</p>`;
  }
  function readHTML() {
    const es = sel.map(z => ELEMENTS[z - 1]);
    if (!es.length) return "";
    const card = e => `<div class="ecard"><p class="es">${e.s}<span>${e.name}, Z = ${e.z}</span></p><dl class="mini">
      <div><dt>Radius</dt><dd>${e.rad} pm</dd></div><div><dt>1st ionization energy</dt><dd>${e.ie} kJ/mol</dd></div>
      <div><dt>Electronegativity</dt><dd>${e.en == null ? "—" : e.en.toFixed(2)}</dd></div><div><dt>Electron affinity</dt><dd>${e.ea != null && e.ea > 0 ? e.ea + " kJ/mol" : "no stable anion"}</dd></div></dl></div>`;
    return `<div class="ecards">${es.map(card).join("")}</div>` + (es.length === 2 ? `<div class="why">${compare(es[0], es[1])}</div>` : "");
  }
  el("ptable").addEventListener("click", e => {
    const b = e.target.closest(".pe"); if (!b) return;
    const z = +b.dataset.z;
    if (sel.includes(z)) sel = sel.filter(x => x !== z);
    else sel = sel.length >= 2 ? [sel[1], z] : sel.concat(z);
    document.querySelectorAll("#ptable .pe").forEach(x => x.setAttribute("aria-pressed", sel.includes(+x.dataset.z)));
    el("pt-read").innerHTML = readHTML();
  });
  el("pt-prop").addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    prop = b.dataset.p;
    el("pt-prop").querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", x === b));
    tableHTML(); el("pt-read").innerHTML = readHTML();
  });
  sel = [11, 17];
  tableHTML(); el("pt-read").innerHTML = readHTML();

  /* ---------- Photons and particles ---------- */
  const dl = rows => rows.map(r => `<div><dt>${r[0]}</dt><dd>${r[1]}</dd></div>`).join("");
  function peRender() {
    const wl = num(el("pe-wl").value), phiRaw = num(el("pe-phi").value), u = el("pe-u").value;
    const out = el("pe-out"), note = el("pe-note");
    if (!(wl > 0) || !(phiRaw > 0)) { out.innerHTML = ""; note.textContent = "Type a wavelength in nm and a work function greater than zero."; return; }
    const phi = u === "J" ? phiRaw : u === "eV" ? phiRaw * EV : phiRaw * 1000 / NA;
    const E = H * C / (wl * 1e-9), KE = E - phi, lam0 = H * C / phi * 1e9;
    const rows = [["Photon energy, hc/λ", sci(E, "J")], ["Work function", sci(phi, "J")], ["Threshold wavelength, hc/Φ", sci(lam0, "nm")]];
    if (KE > 0) {
      rows.push(["Kinetic energy of the electron", sci(KE, "J")], ["Electron speed, √(2KE/m)", sci(Math.sqrt(2 * KE / ME), "m/s")]);
      note.innerHTML = `Electrons are ejected: each photon has more energy than Φ. Brighter light would eject more of them, not faster ones.`;
    } else note.innerHTML = `<b>No electrons are ejected.</b> One photon carries less than Φ, and brighter light does not help: it only sends more of the same weak photons. Use light shorter than ${sci(lam0, "nm")}.`;
    out.innerHTML = dl(rows);
  }
  function dbRender() {
    const mRaw = num(el("db-m").value), v = num(el("db-v").value), out = el("db-out"), note = el("db-note");
    if (!(mRaw > 0) || !(v > 0)) { out.innerHTML = ""; note.textContent = "Type a mass and a speed greater than zero."; return; }
    const m = el("db-u").value === "g" ? mRaw / 1000 : mRaw, lam = H / (m * v);
    out.innerHTML = dl([["Mass in kg", sci(m, "kg")], ["Momentum, mv", sci(m * v, "kg·m/s")], ["Wavelength, h/mv", sci(lam, "m")], ["In nanometers", sci(lam * 1e9, "nm")]]);
    note.innerHTML = lam > 1e-11 ? `About the size of an atom (≈ 10${sup("−10")} m) or bigger, so the wave behavior is measurable: electrons diffract like X-rays.` : `Far smaller than any atom or nucleus, so the wave behavior can never be detected. That’s why baseballs don’t diffract.`;
  }
  function blRender() {
    const ids = ["bl-a", "bl-e", "bl-b", "bl-c"], v = ids.map(i => el(i).value.trim() === "" ? null : num(el(i).value));
    const out = el("bl-out"), note = el("bl-note"), blanks = v.filter(x => x == null).length;
    if (blanks !== 1) { out.innerHTML = ""; note.textContent = blanks ? "Leave exactly one box empty." : "Clear the box you want solved for."; return; }
    if (v.some(x => x != null && !(x > 0))) { out.innerHTML = ""; note.textContent = "Each value you type must be a positive number."; return; }
    let [A, e, b, c] = v, name;
    if (A == null) { A = e * b * c; name = ["Absorbance A", sci(A, "", 3)]; }
    else if (e == null) { e = A / (b * c); name = ["ε", sci(e, "L/(mol·cm)")]; }
    else if (b == null) { b = A / (e * c); name = ["Path b", sci(b, "cm")]; }
    else { c = A / (e * b); name = ["Concentration c", sci(c, "mol/L")]; }
    const T = Math.pow(10, -A);
    out.innerHTML = dl([name, ["Transmittance, 10" + sup("−A"), `${(T * 100).toPrecision(3)}%`]]);
    note.innerHTML = A > 1.5 ? "Absorbance above about 1.5 lets through so little light that colorimeters get unreliable. Dilute the sample." : "";
  }
  [["pe", peRender], ["db", dbRender], ["bl", blRender]].forEach(([k, f]) => {
    el(k + "-form").addEventListener("input", f);
    el(k + "-form").addEventListener("change", f);
    el(k + "-form").addEventListener("submit", e => e.preventDefault());
    f();
  });
  document.querySelectorAll("#db-form .presets button").forEach(b => b.addEventListener("click", () => {
    el("db-m").value = b.dataset.m; el("db-u").value = b.dataset.u; el("db-v").value = b.dataset.v; dbRender();
  }));

  /* ---------- PES spectrum ---------- */
  let pesHidden = false, pesZ = 0;
  function pesRender() {
    const e = el("pes-el").value.trim() ? findEl(el("pes-el").value) : pesZ ? ELEMENTS[pesZ - 1] : null;
    const name = el("pes-name"), chart = el("pes-chart"), list = el("pes-list");
    if (!e || e.z > 36) { name.textContent = "Type an element from 1 (H) to 36 (Kr)."; chart.innerHTML = ""; list.innerHTML = ""; return; }
    const peaks = PES[e.z], W = 800, H = 300, L = 40, R = 20, T = 34, B = 44;
    const es = peaks.map(p => p[2]), hi = Math.log10(Math.max(...es) * 2), lo = Math.log10(Math.min(...es) / 2);
    const x = v => L + (hi - Math.log10(v)) / (hi - lo) * (W - L - R);
    const maxN = Math.max(...peaks.map(p => p[1]), 2), y = n => T + (1 - n / maxN) * (H - T - B);
    let svg = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Photoelectron spectrum with ${peaks.length} peaks"><defs><pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="3" height="6" fill="var(--accent)"/></pattern></defs>`;
    svg += `<line x1="${L}" x2="${W - R}" y1="${H - B}" y2="${H - B}" class="ax"/>`;
    for (let p = Math.ceil(lo); p <= Math.floor(hi); p++) {
      const v = Math.pow(10, p), xx = x(v);
      svg += `<line x1="${xx}" x2="${xx}" y1="${H - B}" y2="${H - B + 6}" class="ax"/><text x="${xx}" y="${H - B + 22}" class="tk">${v >= 1 ? v : v.toFixed(Math.abs(p))}</text>`;
    }
    svg += `<text x="${(W + L - R) / 2}" y="${H - 4}" class="tk">Binding energy, MJ/mol (log scale) — higher to the left</text>`;
    peaks.forEach(p => {
      const xx = x(p[2]), yy = y(p[1]);
      svg += `<rect x="${xx - 7}" y="${yy}" width="14" height="${H - B - yy}" fill="${p[3] ? "url(#hatch)" : "var(--accent)"}"/><text x="${xx}" y="${yy - 8}" class="pk">${p[0]}</text>`;
    });
    chart.innerHTML = svg + "</svg>";
    name.textContent = pesHidden ? "Which element is this? Count the electrons and read the subshells." : `${e.name} · Z = ${e.z} · ${peaks.reduce((a, p) => a + p[1], 0)} electrons`;
    list.innerHTML = peaks.map(p => `<li><b>${p[0]}</b> ${p[1]} electron${p[1] > 1 ? "s" : ""} at ${p[2] >= 10 ? Math.round(p[2] * 10) / 10 : p[2].toFixed(2)} MJ/mol${p[3] ? " (estimate)" : ""}</li>`).join("") +
      (pesHidden ? `<li><button type="button" class="linkbtn" id="pes-reveal">Show the answer</button></li>` : "");
  }
  el("pes-el").addEventListener("input", () => { pesHidden = el("pes-hide").checked; pesRender(); });
  el("pes-hide").addEventListener("change", () => { pesHidden = el("pes-hide").checked; pesRender(); });
  el("pes-form").addEventListener("submit", e => e.preventDefault());
  el("pes-rand").addEventListener("click", () => { pesZ = 1 + Math.floor(Math.random() * 36); el("pes-el").value = ""; el("pes-el").placeholder = "?"; el("pes-hide").checked = true; pesHidden = true; pesRender(); });
  el("pes-list").addEventListener("click", e => { if (e.target.id === "pes-reveal") { if (!el("pes-el").value.trim() && pesZ) el("pes-el").value = ELEMENTS[pesZ - 1].s; pesHidden = false; el("pes-hide").checked = false; pesRender(); } });
  pesRender();
})();
