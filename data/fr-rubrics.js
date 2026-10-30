// Scoring guides for the practice-test free response, in the same order as PRACTICE.fr.
// Each row: [points, what earns them]. Modeled on how AP-style free response is usually scored.
const FR_POINTS = [
  [ // Hydrogen emission
    [1, "Rydberg equation set up with n<sub>low</sub> = 2 and n<sub>high</sub> = 5"],
    [1, "λ = 434 nm, with the m to nm conversion shown"],
    [1, "E = 4.58 × 10<sup>−19</sup> J from E = hc/λ"],
    [1, "276 kJ/mol: multiplied by N<sub>A</sub> and divided by 1000"],
    [1, "Visible and blue-violet, with a reason (ends at n = 2, or near the violet end)"]
  ],
  [ // Photoelectric effect
    [1, "E<sub>photon</sub> = 7.82 × 10<sup>−19</sup> J"],
    [1, "KE = E − Φ = 9.2 × 10<sup>−20</sup> J"],
    [1, "KE = ½mv<sup>2</sup> rearranged for v"],
    [1, "v = 4.5 × 10<sup>5</sup> m/s"],
    [1, "Twice as many electrons, same kinetic energy"],
    [1, "Explains it: more photons, but each photon’s energy is unchanged"]
  ],
  [ // Selenium
    [1, "Full configuration correct"],
    [1, "Noble-gas configuration [Ar]4s<sup>2</sup>3d<sup>10</sup>4p<sup>4</sup>"],
    [1, "4p diagram follows Hund’s rule: one pair and two single electrons"],
    [1, "2 unpaired electrons, so paramagnetic"],
    [1, "Se<sup>2−</sup> = [Ar]4s<sup>2</sup>3d<sup>10</sup>4p<sup>6</sup>"],
    [1, "Isoelectronic with krypton"],
    [1, "n = 4, l = 1, a valid m<sub>l</sub> (−1, 0 or +1) and m<sub>s</sub> = −½"]
  ],
  [ // Ionization energy
    [1, "Na and Mg: same shell, same number of core electrons"],
    [1, "Mg has a higher Z<sub>eff</sub>, so a stronger attraction to the electron"],
    [1, "Al’s electron is in 3p: higher in energy and shielded by the 3s pair"],
    [1, "The third electron must come from the core (3p for calcium)"],
    [1, "Core electrons are closer to the nucleus and less shielded, so the energy jumps"]
  ],
  [ // Atomic and ionic size
    [1, "Correct order: Mg<sup>2+</sup> &lt; Na<sup>+</sup> &lt; Mg &lt; Na"],
    [1, "The cations have lost their n = 3 shell"],
    [1, "Isoelectronic ions: more protons means a smaller ion"],
    [1, "Mg is smaller than Na because of its higher Z<sub>eff</sub> in the same shell"]
  ],
  [ // PES
    [1, "Identifies nitrogen"],
    [1, "1s<sup>2</sup>2s<sup>2</sup>2p<sup>3</sup>"],
    [1, "1s electrons are closest to the nucleus with no shielding"],
    [1, "Oxygen: every peak at a higher binding energy (more protons)"],
    [1, "Oxygen: the 2p peak has height 4"]
  ],
  [ // Penny lab
    [1, "c = A/(εb) = 0.186 M"],
    [1, "Moles of Cu = M × V in liters (0.0465 mol)"],
    [1, "Mass of Cu = 2.96 g"],
    [1, "95.1% copper, matching a pre-1982 penny"],
    [1, "Calculated concentration would be too high"],
    [1, "Reason: A doubles with the 2 cm path, but the 1 cm line assumes b = 1.00 cm"]
  ]
];
