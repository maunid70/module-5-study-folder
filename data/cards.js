// Flashcards for equations and constants. Key-term cards come from each day's file automatically.
// Each card: [front, back]. HTML is allowed.
const EQ_CARDS = [
  ["Link the speed of light, wavelength and frequency", "c = λν<small>λ in meters, ν in s<sup>−1</sup> (Hz)</small>"],
  ["Energy of one photon, from frequency or wavelength", "E = hν = hc/λ<small>In joules per photon</small>"],
  ["Bohr energy of level n for a one-electron species", "E<sub>n</sub> = −2.178 × 10<sup>−18</sup> J (Z<sup>2</sup>/n<sup>2</sup>)<small>Only H, He<sup>+</sup>, Li<sup>2+</sup> and other one-electron species</small>"],
  ["Sign of ΔE when a photon is emitted", "Negative<small>ΔE = E<sub>final</sub> − E<sub>initial</sub>; the electron falls and energy leaves as light</small>"],
  ["Balmer–Rydberg equation for hydrogen", "1/λ = R(1/n<sub>low</sub><sup>2</sup> − 1/n<sub>high</sub><sup>2</sup>)<small>R = 1.097 × 10<sup>7</sup> m<sup>−1</sup></small>"],
  ["Photoelectric effect: kinetic energy of the ejected electron", "KE = E<sub>photon</sub> − Φ<small>Φ is the work function; no electron leaves if E<sub>photon</sub> &lt; Φ</small>"],
  ["de Broglie wavelength of a moving particle", "λ = h/mv<small>m in kg, v in m/s</small>"],
  ["Heisenberg uncertainty principle", "Δx · Δp ≥ h/4π<small>p = mv</small>"],
  ["Beer–Lambert law", "A = εbc<small>ε in L/(mol·cm), b in cm, c in mol/L</small>"],
  ["Absorbance from transmittance", "A = −log T<small>T as a fraction, not a percent</small>"],
  ["Dilution equation", "M<sub>1</sub>V<sub>1</sub> = M<sub>2</sub>V<sub>2</sub>"],
  ["Effective nuclear charge, the simple estimate", "Z<sub>eff</sub> ≈ Z − S<small>S = number of core (shielding) electrons</small>"],
  ["Coulomb’s law, as a proportion", "F ∝ q<sub>1</sub>q<sub>2</sub>/r<sup>2</sup><small>Bigger charges or a smaller distance: stronger attraction</small>"],
  ["Speed of light, c", "2.998 × 10<sup>8</sup> m/s"],
  ["Planck’s constant, h", "6.626 × 10<sup>−34</sup> J·s"],
  ["Avogadro’s number, N<sub>A</sub>", "6.022 × 10<sup>23</sup> mol<sup>−1</sup><small>J per photon × N<sub>A</sub> = J per mole</small>"],
  ["Nanometers to meters", "1 nm = 10<sup>−9</sup> m<small>Visible light runs from about 400 nm (violet) to 700 nm (red)</small>"],
  ["Allowed values of l for a given n", "0 to n − 1<small>l = 0, 1, 2, 3 are s, p, d, f</small>"],
  ["Allowed values of m<sub>l</sub> for a given l", "−l to +l, whole numbers<small>So a subshell has 2l + 1 orbitals</small>"],
  ["Maximum electrons in shell n", "2n<sup>2</sup><small>n = 3 holds 18</small>"]
];
