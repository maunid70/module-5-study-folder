// d1102: edit this day's goals, summary, key terms, mistakes, quiz and handout notes here.
DAYS.push({
  id: "d1102", tab: "11/2", title: "Copper Penny Lab",
  goals: ["I can explain how the interaction of electromagnetic waves or light with matter is used to probe the structure of atoms/molecules and measure their concentration."],
  videos: [6, "beer", "penny"],
  summary: `<p><strong>Video 6, Light and matter</strong> (review from 10/28). IR light shows bond vibrations, UV and visible light show electron transitions, and the absorbance of a colored solution tells you its concentration.</p>
  <p><strong>Beer’s law video.</strong> The <strong>Beer–Lambert law</strong> is A = εbc. Absorbance (A) has no units. ε, the molar absorptivity, says how strongly a substance absorbs (L/(mol·cm)). b is the <strong>path length</strong> the light travels through the solution (cm), and c is the concentration (mol/L). A longer path or a more concentrated solution puts more absorbing particles in the beam, so absorbance rises and less light reaches the detector of the <strong>spectrophotometer</strong>. The wavelength you use depends on the solution’s color.</p>
  <p><strong>How the lab works:</strong> measure the absorbance of several <strong>standard solutions</strong> of known concentration, graph absorbance vs. concentration (a straight line, the <strong>calibration curve</strong>), then measure your unknown and read its concentration off the line.</p>
  <p><strong>Preparing Penny Solution</strong> (no transcript available). In this lab the copper from a penny is dissolved to make a blue Cu<sup>2+</sup> solution. Its absorbance and the calibration curve give the copper concentration, and from that the mass of copper in the penny. Follow the handout for the exact steps.</p>`,
  terms: [["Absorbance (A)","How much light a sample absorbs; unitless."],["Molar absorptivity (ε)","How strongly a substance absorbs at a given wavelength."],["Path length (b)","Distance light travels through the sample, usually 1 cm."],["Calibration curve","Graph of A vs. c for known standards, used to find an unknown."],["Spectrophotometer","Instrument that measures absorbance at a chosen wavelength."]],
  mistakes: ["Fingerprints, bubbles or smudges on the cuvette add false absorbance, so the concentration comes out too high.","Using a wavelength the solution barely absorbs. Pick one near its absorbance peak.","Reading the calibration graph backward (finding A from c when you need c from A)."],
  todo: "Copper Penny Lab handout and Makeup Lab on the Canvas page. Submit Penny Lab.",
  quiz: [
    ["You double the concentration of a solution and keep the same cuvette. What happens to absorbance?", ["It is cut in half", "It stays the same", "It doubles", "It quadruples"], 2, "A = εbc. With ε and b fixed, A is directly proportional to c."],
    ["You switch from a 1.0 cm cuvette to a 2.0 cm cuvette with the same solution. Absorbance:", ["doubles, because the light passes through twice as many absorbing particles", "halves", "stays the same, because concentration did not change", "drops to zero"], 0, "A is proportional to the path length b. A longer path means more particles in the way of the light."],
    ["A calibration line is A = 12.0 M<sup>−1</sup> × c (no intercept). An unknown reads A = 0.450. What is its concentration?", ["5.40 M", "0.450 M", "26.7 M", "0.0375 M"], 3, "c = A/slope = 0.450/12.0 = 0.0375 M."],
    ["Why is the measurement done at a wavelength the solution absorbs strongly?", ["So the solution does not heat up", "Absorbance then changes most with concentration, giving the most sensitive measurement", "Beer’s law only works for red light", "So no light is transmitted at all"], 1, "At the absorbance peak ε is largest, so small changes in concentration give the biggest change in A."],
    ["A student leaves fingerprints on the cuvette for the unknown only. How does this affect the calculated concentration?", ["Too low", "No effect", "Too high", "It makes A negative"], 2, "Smudges block light, so the measured absorbance is higher than the true value, and the calibration curve gives a concentration that is too high."]
  ]
});

EXTRA.d1102 = {
  overview: `Lab day. You find the percent copper in a modern penny with a colorimeter. The more copper in the blue solution, the more light it absorbs (Beer’s law), so a calibration line from known standards gives the copper concentration, then the mass of copper in the penny.`,
  vs: {
    6: `<p>Review from 10/28: IR light shows bond vibrations, UV and visible light show electron transitions, and how much light a colored solution absorbs tells you its concentration.</p>`,
    beer: `<p>The <strong>Beer–Lambert law</strong> is A = εbc. Absorbance has no units; ε (molar absorptivity) says how strongly the substance absorbs; b is the path length in cm; c is the molarity. A longer path or a more concentrated solution puts more absorbing particles in the beam, so absorbance goes up. Choose the wavelength by the solution’s color. Measure standards of known concentration, graph absorbance against concentration (a straight line), then read the unknown’s concentration off the line.</p>`,
    penny: `<p>No transcript. From the lab handout: before class the teacher dissolves the penny in concentrated nitric acid, neutralizes the extra acid with NaHCO<sub>3</sub>, adds ammonia to make the deep-blue Cu(NH<sub>3</sub>)<sub>4</sub><sup>2+</sup> ion, and dilutes it to 250 mL. That is the “penny solution” you measure.</p>`
  },
  handouts: [
    ["Copper Penny Lab", `<p>Pennies made after 1982 are a thin copper coat over a mostly zinc core; one weighs 2.491 g. Reactions:</p>
    <p>Cu(s) + 4 HNO<sub>3</sub>(aq) + 4 H<sub>2</sub>O(l) → Cu(H<sub>2</sub>O)<sub>6</sub><sup>2+</sup>(aq) + 2 NO<sub>2</sub>(g) + 2 NO<sub>3</sub><sup>−</sup>(aq)</p>
    <p>Cu(H<sub>2</sub>O)<sub>6</sub><sup>2+</sup>(aq) + 4 NH<sub>3</sub>(aq) → Cu(NH<sub>3</sub>)<sub>4</sub><sup>2+</sup>(aq) + 6 H<sub>2</sub>O(l)</p>
    <p><strong>Standards:</strong> pipet 2.00, 5.00, 7.00, 10.00 and 15.00 mL of 0.05 M Cu<sup>2+</sup> into 100 mL flasks, add 20.0 mL of 6 M NH<sub>3</sub>, dilute to the mark, and find each concentration with M<sub>1</sub>V<sub>1</sub> = M<sub>2</sub>V<sub>2</sub>. Zero the colorimeter with a distilled water blank, read at 635 nm, and fit a straight line. Transmittance is the fraction of light that gets through; A = −log T.</p>
    <p><strong>Calculations:</strong> concentration from the line → moles = M × 0.250 L → grams = moles × 63.55 g/mol → % Cu = grams ÷ 2.491 g × 100.</p>`]
  ],
  worked: [
    ["Standard concentrations: 2.00, 5.00, 7.00, 10.00 and 15.00 mL of 0.05 M Cu<sup>2+</sup>, each diluted to 100.0 mL?", `M<sub>2</sub> = M<sub>1</sub>V<sub>1</sub>/V<sub>2</sub>: 1.0, 2.5, 3.5, 5.0 and 7.5 mM.`],
    ["Lab problem 3: 8.00 mL of 0.0512 M Cu<sup>2+</sup> diluted to 100.0 mL. [Cu(NH<sub>3</sub>)<sub>4</sub><sup>2+</sup>]?", `0.0512 × 8.00 / 100.0 = 4.10 × 10<sup>−3</sup> M (4.10 mM). Each Cu<sup>2+</sup> becomes one complex ion.`],
    ["Lab problem 2: 400 nm or 660 nm for the deep-blue complex?", `660 nm. A blue solution absorbs orange-red light and lets blue (around 400–480 nm) pass, so absorbance changes most at 660 nm.`],
    ["Lab problem 1: Volume of 6.0 M HNO<sub>3</sub> to dissolve 2.481 g of Cu (assume pure copper)?", `2.481 g ÷ 63.55 = 0.0390 mol Cu × 4 = 0.156 mol HNO<sub>3</sub> ÷ 6.0 M = 0.026 L (26 mL). Assuming pure copper makes sure there is more than enough acid.`],
    ["Example: the penny solution reads 4.00 mM from the line. % Cu?", `4.00 × 10<sup>−3</sup> M × 0.250 L = 1.00 × 10<sup>−3</sup> mol × 63.55 = 0.0636 g. 0.0636 ÷ 2.491 × 100 = 2.55% Cu.`],
    ["Lab problem 4: Effect on % Cu of (a) unreacted copper, (b) diluting to 251 mL, (c) fingerprints on the cuvette?", `(a) Too low: some copper never reached the solution. (b) Slightly too low: the solution is more dilute but you still multiply by 250 mL. (c) Too high: scattered light reads as extra absorbance.`]
  ],
  terms: [["Transmittance","Fraction of light that passes through; A = −log T."],["Colorimeter","Measures absorbance at one chosen wavelength."]],
  mistakes: ["Mixing mM and M when converting the calibration reading to moles."]
};
