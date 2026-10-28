// d1109: edit this day's goals, summary, key terms, mistakes, quiz and handout notes here.
DAYS.push({
  id: "d1109", tab: "11/9–11/10", title: "Review & Module 5 Exam",
  goals: ["Review module concepts and prepare for the formal assessment.", "11/10: Module 5 Exam, 22 multiple choice and 7 free response."],
  videos: [],
  summary: `<p>No new videos. Review your notes and practice problems, then work the Module 5 Review and Review Questions, checking with the Review Questions Key.</p>
  <p><strong>Exam checklist.</strong> Convert between λ, ν and E (per photon and per mole). Explain flame colors and line spectra with energy levels. Use the photoelectric effect (threshold, intensity vs. energy). Use the Rydberg equation for hydrogen. Explain why the Bohr model was replaced. Write configurations, including noble gas notation, d and f blocks and ions. Identify para- vs. diamagnetic species. Use Beer’s law and a calibration curve. Explain every trend with Z<sub>eff</sub>, shielding, distance and Coulomb’s law, including the B and O ionization energy dips and successive ionization energies. Read a PES spectrum.</p>
  <p><strong>For free response:</strong> name the particles (protons, core electrons, valence electrons), compare them between the two species, and finish with the attraction (stronger or weaker) and its result. “Mg has more protons than Na while both have 10 core electrons, so Mg’s valence electrons feel a greater Coulombic attraction and require more energy to remove.”</p>`,
  terms: [["Justify","Use evidence and a cause: particles, charges, distance and attraction."],["Compare","State both sides; “higher than” needs a “than.”"]],
  mistakes: ["Answering an FRQ “why” with only the trend (“because it is to the right”). The trend is the claim, not the reason.","Leaving units off energies or mixing J and kJ.","Forgetting significant figures from the given data."],
  todo: "Module 5 Review. Review Questions and Review Questions Key on the Canvas page.",
  quiz: [
    ["Which best explains why first ionization energy increases from Na to Ar?", ["Atomic mass increases", "Electrons are added to new shells", "Protons are added while core shielding stays the same, so Z<sub>eff</sub> rises and electrons are held more tightly", "Ar is a noble gas"], 2, "All have 10 core electrons; the nuclear charge rises from 11 to 18."],
    ["A photon has an energy of 3.06 × 10<sup>−19</sup> J. What is its wavelength?", ["306 nm", "649 nm", "1.54 × 10<sup>−6</sup> nm", "462 nm"], 1, "λ = hc/E = (6.626 × 10<sup>−34</sup>)(2.998 × 10<sup>8</sup>)/(3.06 × 10<sup>−19</sup>) = 6.49 × 10<sup>−7</sup> m = 649 nm."],
    ["How many unpaired electrons are in a ground-state manganese atom ([Ar]4s<sup>2</sup>3d<sup>5</sup>)?", ["5", "2", "7", "0"], 0, "Five d orbitals, five electrons: by Hund’s rule each is unpaired. The 4s pair is paired."],
    ["Why is potassium’s first ionization energy lower than sodium’s?", ["K has fewer protons", "K’s Z<sub>eff</sub> is much higher", "K is a nonmetal", "K’s valence electron is in n = 4, farther from the nucleus and more shielded, so it is attracted less"], 3, "Similar Z<sub>eff</sub>, but a larger distance means a weaker Coulombic attraction."],
    ["Why is Mg<sup>2+</sup> smaller than Na<sup>+</sup>?", ["Both have 10 electrons, but Mg<sup>2+</sup> has 12 protons vs. 11, pulling the electrons closer", "Mg<sup>2+</sup> has fewer shells", "Na<sup>+</sup> has an extra shell", "Mg is a transition metal"], 0, "Isoelectronic species: the one with more protons is smaller."],
    ["Which quantum numbers could describe potassium’s valence electron?", ["(3, 1, 0, +½)", "(4, 1, 0, +½)", "(4, 0, 0, +½)", "(4, 2, 0, +½)"], 2, "K is [Ar]4s<sup>1</sup>: n = 4, l = 0 (s), m<sub>l</sub> = 0, spin +½ or −½."],
    ["Light of a certain color ejects no electrons from a metal. Which change could make electrons come out?", ["Use a much brighter lamp of the same color", "Use a longer wavelength", "Shine it for longer", "Use a shorter wavelength"], 3, "Only photon energy matters. A shorter wavelength means more energy per photon, possibly above the work function."],
    ["Successive ionization energies (kJ/mol) for an element: 578, 1817, 2745, 11 577. The element is in group:", ["13", "2", "14", "1"], 0, "The jump comes after the third electron, so it has three valence electrons (aluminum)."],
    ["In a PES spectrum, the lowest-binding-energy peak of element X is half the height of its other s peaks. This suggests:", ["X has a filled valence s subshell", "X has one electron in its outermost s subshell", "X is a noble gas", "X has no core electrons"], 1, "Peak height is proportional to electron count. Half of a full s peak (2) is one electron, as in K or Na."],
    ["An electron in hydrogen falls from n = 5 to n = 2. Which statement is correct?", ["A photon is absorbed", "The photon is in the infrared", "A violet-blue visible photon (434 nm) is emitted", "Energy is not conserved"], 2, "Falling means emission. 5 → 2 is in the Balmer series and gives the 434 nm blue line."]
  ]
});

EXTRA.d1109 = {
  overview: `Exam prep. Work the Module 5 Review and check it with the Review Key. Be ready to calculate (λ, ν, E, transitions, de Broglie), write configurations and quantum numbers, read PES and ionization energy data, and explain every trend with Coulomb’s law.`,
  vs: {},
  handouts: [
    ["Module 5 Review", `<p>Covers a multi-step “marathon” problem, an imaginary element 119, neon isotopes and an emission line, ozone and UV photons, a table of first-three ionization energies, subshell counting, quantum numbers, ionization equations and radius ranking.</p>`],
    ["Exam checklist", `<p>λ ↔ ν ↔ E (per photon and per mole); flame colors and line spectra; photoelectric effect; Rydberg and E<sub>n</sub> transitions; de Broglie; why the Bohr model was replaced; full, noble gas and orbital notation (including ions, Cr and Cu); para vs. diamagnetic; Beer’s law and calibration curves; every trend with Z<sub>eff</sub>, shielding, distance and Coulomb’s law; successive ionization energies; reading PES.</p>
    <p><strong>For free response:</strong> name the particles (protons, core and valence electrons), compare them between the two species, then finish with the attraction and its result. “Mg has more protons than Na while both have 10 core electrons, so Mg’s valence electrons feel a greater Coulombic attraction and need more energy to remove.”</p>`]
  ],
  worked: [
    ["Review #1 (marathon): Identify element X.", `A: the FM wavelength is 2.998 × 10<sup>8</sup> ÷ 97.1 × 10<sup>6</sup> = 3.09 m; divided by 3 × 10<sup>7</sup> that is 103 nm, hydrogen’s 3 → 1 line, so the excited state is n = 3. B: an electron at 570 m/s has λ = h/mv = 1.28 × 10<sup>−6</sup> m, which is the V → 3 line for V = 5. C: n = 2, m<sub>l</sub> = −1, m<sub>s</sub> = −½ fits exactly 1 electron, so X has 1 unpaired electron. D: element 120 would form a 2+ ion, so the unpaired electron is in l = 2 (d). Period 5, one unpaired d electron: <strong>yttrium</strong>, [Kr]5s<sup>2</sup>4d<sup>1</sup>.`],
    ["Review #2: Element 119 (Q).", `Valence configuration 8s<sup>1</sup>. A metal (one easily lost electron). Largest radius in its group (a new shell). Ion charge +1. 2 Q + 2 H<sub>2</sub>O → 2 QOH + H<sub>2</sub>. Q<sub>2</sub>CO<sub>3</sub>, soluble like other group 1 carbonates.`],
    ["Review #3: Neon isotopes (19.99 and 21.99 amu, average 20.18); a neon line at 4.34 × 10<sup>14</sup> s<sup>−1</sup>.", `19.99x + 21.99(1 − x) = 20.18 gives 90.5% Ne-20 and 9.5% Ne-22. In 12.55 g: 0.622 mol × 6.022 × 10<sup>23</sup> × 0.095 = 3.6 × 10<sup>22</sup> Ne-22 atoms. λ = c/ν = 6.91 × 10<sup>−7</sup> m = 691 nm.`],
    ["Review #3c: Can a 1.00 × 10<sup>15</sup> s<sup>−1</sup> photon break ozone’s 387 kJ/mol bond?", `E = hν = 6.63 × 10<sup>−19</sup> J per photon × 6.022 × 10<sup>23</sup> = 399 kJ/mol. That is more than 387 kJ/mol, so yes.`],
    ["Review #4: Period 3 ionization energies (kJ/mol): 1 = 1251, 2300, 3820; 2 = 496, 4560, 6910; 3 = 738, 1450, 7730; 4 = 1000, 2250, 3360.", `Element 2 is Na: most metallic (lowest IE<sub>1</sub>, jump after one electron), forms +1. Element 3 is Mg (jump after two electrons): 1s<sup>2</sup>2s<sup>2</sup>2p<sup>6</sup>3s<sup>2</sup>. Element 1 is Cl (highest IE<sub>1</sub>): smallest radius. Element 4 is S.`],
    ["Review #7–9: Orange 615 nm; H at n = 4 and the 4 → 2 drop; an electron at 75% of c.", `Orange: ν = 4.88 × 10<sup>14</sup> Hz, E = 3.23 × 10<sup>−19</sup> J. E<sub>4</sub> = −1.36 × 10<sup>−19</sup> J; 4 → 2 gives ΔE = −4.09 × 10<sup>−19</sup> J. Going 1 → 5 gains energy (absorption). Electron: λ = h/mv = 3.23 × 10<sup>−12</sup> m.`],
    ["Review #15–16: Quantum numbers of rubidium’s outer electron; F, Br, Ca, K, Cs from smallest to largest.", `Rb is [Kr]5s<sup>1</sup>: (5, 0, 0, +½). F &lt; Br &lt; Ca &lt; K &lt; Cs.`]
  ],
  terms: [],
  mistakes: []
};
