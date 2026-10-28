// d1029: edit this day's goals, summary, key terms, mistakes, quiz and handout notes here.
DAYS.push({
  id: "d1029", tab: "10/29", title: "Bohr Model & Wave Behavior, Day 2",
  goals: ["PSAT Day.", "I can explain the distribution of electrons in an atom or ion based upon data.", "I can relate the attraction of electrons to the atomic nucleus as the basis of atomic structure."],
  videos: [],
  summary: `<p>No new videos on the calendar. This is a catch-up day: finish Practice Problems through #22 and the Flame Test Lab. Use it to make sure you can move between λ, ν, E per photon and E per mole without help, and that you can explain transitions with energy levels.</p>
  <p><strong>Check yourself:</strong> Can you go from a wavelength to kJ/mol in three steps? Can you explain why an electron in n = 1 is harder to remove than one in n = 3 using Coulomb’s law (closer means a stronger attraction)? Can you say whether a transition absorbs or emits light from the direction of the jump?</p>`,
  terms: [["Coulomb attraction","Pull between the positive nucleus and negative electrons; stronger when closer."],["Energy per mole","Energy per photon × 6.022 × 10<sup>23</sup>."]],
  mistakes: ["Rounding too early in multi-step calculations. Keep extra digits until the end.","Leaving scientific notation out of parentheses on the calculator."],
  todo: "Practice Problems through #22. Flame Test Lab due.",
  quiz: [
    ["What is the frequency of 486 nm light?", ["1.46 × 10<sup>−15</sup> Hz", "6.17 × 10<sup>14</sup> Hz", "6.17 × 10<sup>5</sup> Hz", "1.62 × 10<sup>−6</sup> Hz"], 1, "ν = c/λ = (2.998 × 10<sup>8</sup> m/s)/(4.86 × 10<sup>−7</sup> m) = 6.17 × 10<sup>14</sup> s<sup>−1</sup>."],
    ["What is the energy of one mole of 486 nm photons?", ["4.09 × 10<sup>−19</sup> kJ/mol", "246 J/mol", "2.46 × 10<sup>5</sup> kJ/mol", "246 kJ/mol"], 3, "E = hν = 4.09 × 10<sup>−19</sup> J. × 6.022 × 10<sup>23</sup> = 2.46 × 10<sup>5</sup> J/mol = 246 kJ/mol."],
    ["Compared with red light, blue light has:", ["a higher frequency and higher energy per photon", "a longer wavelength and higher energy", "a lower frequency and lower energy", "the same energy but a different speed"], 0, "Blue has the shorter wavelength, so higher frequency and higher energy. All light travels at c in a vacuum."],
    ["An electron in hydrogen moves from n = 1 to n = 3, then later falls from n = 3 to n = 1. Which is true?", ["Both steps release energy", "The first absorbs energy and the second releases the same amount", "The first releases energy and the second absorbs it", "The two energies differ because the paths differ"], 1, "Moving up requires absorbing energy. Falling back releases a photon with exactly the same energy gap."],
    ["Why is an electron in n = 1 harder to remove than an electron in n = 3?", ["It has more mass", "It moves faster", "It is closer to the nucleus, so the Coulomb attraction is stronger", "n = 1 holds more electrons"], 2, "Coulomb’s law: force grows as distance shrinks. A closer electron is held more tightly, so its energy is more negative."]
  ]
});

EXTRA.d1029 = {
  overview: `No new videos (PSAT day). Finish Practice Problems through #22 and the Flame Test Lab. Make sure you can move between λ, ν, energy per photon and energy per mole without notes, and explain transitions with energy levels and Coulomb’s law.`,
  vs: {},
  handouts: [
    ["What to check before moving on", `<p>Can you go from a wavelength to kJ/mol in three steps? Explain why an electron in n = 1 is harder to remove than one in n = 3 (closer means a stronger Coulomb attraction)? Say whether a transition absorbs or emits from the direction of the jump? Problems #21–22 add de Broglie wavelengths of an electron and a golf ball.</p>`]
  ],
  worked: [
    ["Practice #15B: Wavelength for hydrogen n = 5 → 3?", `ΔE = −2.178 × 10<sup>−18</sup>(1/9 − 1/25) = −1.55 × 10<sup>−19</sup> J. λ = hc/|ΔE| = 1.28 × 10<sup>−6</sup> m (infrared).`],
    ["Practice #21: An electron moves at 2.5 × 10<sup>8</sup> cm/s. Its wavelength?", `2.5 × 10<sup>8</sup> cm/s = 2.5 × 10<sup>6</sup> m/s. λ = h/mv = 6.626 × 10<sup>−34</sup> ÷ (9.109 × 10<sup>−31</sup> kg × 2.5 × 10<sup>6</sup> m/s) = 2.9 × 10<sup>−10</sup> m. Convert grams to kg first.`],
    ["Practice #22: A 100 g golf ball at 30 m/s. Wavelength? How slow for λ = 5.6 × 10<sup>−3</sup> nm?", `λ = 6.626 × 10<sup>−34</sup> ÷ (0.10 × 30) = 2.2 × 10<sup>−34</sup> m. v = h/(mλ) = 6.626 × 10<sup>−34</sup> ÷ (0.10 × 5.6 × 10<sup>−12</sup>) = 1.2 × 10<sup>−21</sup> m/s. (The posted key shows 10<sup>−18</sup>; redo the division to check.)`]
  ],
  terms: [],
  mistakes: ["Using grams instead of kilograms in λ = h/mv."]
};
