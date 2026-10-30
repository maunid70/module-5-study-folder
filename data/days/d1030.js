// d1030: edit this day's goals, summary, key terms, mistakes, quiz and handout notes here.
DAYS.push({
  "id": "d1030",
  "tab": "10/30",
  "title": "Electron Configuration",
  "goals": [
    "I can describe the electronic structure of atoms using PES data, ionization energy, and/or Coulomb’s law to explain how the energies of electrons within atomic shells vary.",
    "I can differentiate between diamagnetism and paramagnetism."
  ],
  "videos": [
    9,
    10,
    11,
    12,
    13,
    14,
    "14a"
  ],
  "summary": "<p><strong>Video 7, Quantum numbers.</strong> Four numbers describe an electron. <strong>n</strong> (principal): shell, energy and average distance; 1, 2, 3… <strong>l</strong> (angular momentum): shape, from 0 to n − 1; l = 0 is s (sphere), 1 is p (dumbbell), 2 is d, 3 is f. <strong>m<sub>l</sub></strong> (magnetic): orientation, from −l to +l, so it counts the orbitals (p has three: p<sub>x</sub>, p<sub>y</sub>, p<sub>z</sub>). <strong>m<sub>s</sub></strong> (spin): +½ or −½.</p>\n  <p><strong>Video 8, The first four shells.</strong> A shell has n<sup>2</sup> orbitals and holds 2n<sup>2</sup> electrons: 2, 8, 18, 32. Each orbital holds at most two electrons with opposite spins. s holds 2, p holds 6, d holds 10, f holds 14.</p>\n  <p><strong>Videos 9 and 10, Orbitals and configurations.</strong> An orbital is a probability cloud, densest near the middle with no hard edge. Electrons fill from lowest energy up (aufbau). Read the order from the periodic table: s block, p block, d block. Within a set of p orbitals, put one electron in each before pairing (<strong>Hund’s rule</strong>). Example: N is 1s<sup>2</sup>2s<sup>2</sup>2p<sup>3</sup>; Si is 1s<sup>2</sup>2s<sup>2</sup>2p<sup>6</sup>3s<sup>2</sup>3p<sup>2</sup>. Check by adding the superscripts: they equal the atomic number.</p>\n  <p><strong>Video 11, Noble gas notation.</strong> Write the previous noble gas in brackets, then the rest: Si = [Ne]3s<sup>2</sup>3p<sup>2</sup>, Ca = [Ar]4s<sup>2</sup>. What is outside the brackets shows the valence electrons. Ca loses 2 to become Ca<sup>2+</sup> = [Ar], a full octet.</p>\n  <p><strong>Video 12, Configurations 2.</strong> In the d block, the shell number is the <strong>period minus one</strong>: Ni = 1s<sup>2</sup>2s<sup>2</sup>2p<sup>6</sup>3s<sup>2</sup>3p<sup>6</sup>4s<sup>2</sup>3d<sup>8</sup>. Zr = [Kr]5s<sup>2</sup>4d<sup>2</sup>. The diagonal chart gives the same order. Electrons in the highest shell (4s for Ni) are the valence electrons that react.</p>\n  <p><strong>Objective, para- vs diamagnetism</strong> (taught in Video 14): an atom with any <strong>unpaired</strong> electron is paramagnetic and is pulled into a magnetic field; if all electrons are paired it is diamagnetic and slightly repelled.</p>",
  "terms": [
    [
      "Aufbau principle",
      "Electrons fill the lowest-energy orbitals first."
    ],
    [
      "Pauli exclusion",
      "No two electrons share all four quantum numbers, so an orbital holds two with opposite spins."
    ],
    [
      "Hund’s rule",
      "Fill equal-energy orbitals singly before pairing."
    ],
    [
      "Valence electrons",
      "Electrons in the outermost shell (highest n)."
    ],
    [
      "Paramagnetic",
      "Has unpaired electrons; attracted to a magnet."
    ],
    [
      "Diamagnetic",
      "All electrons paired; weakly repelled."
    ]
  ],
  "mistakes": [
    "Writing 4d instead of 3d for period 4 transition metals. The d shell is period − 1.",
    "Removing 3d electrons before 4s when forming transition metal ions. Remove 4s first: Fe<sup>2+</sup> is [Ar]3d<sup>6</sup>. (Not covered in the videos, but common on AP exams.)",
    "Pairing p electrons before every p orbital has one (breaks Hund’s rule)."
  ],
  "todo": "Reading: sections 6.8–6.9. Practice Problems #36–40. Module 5 Quiz 1. Slides on the Canvas page.",
  "quiz": [
    [
      "What is the ground-state configuration of sulfur?",
      [
        "[Ne]3s<sup>2</sup>3p<sup>6</sup>",
        "[Ar]3s<sup>2</sup>3p<sup>4</sup>",
        "[Ne]3p<sup>6</sup>",
        "[Ne]3s<sup>2</sup>3p<sup>4</sup>"
      ],
      3,
      "S has 16 electrons: 10 in [Ne], then 3s<sup>2</sup> and 3p<sup>4</sup>."
    ],
    [
      "Which element has the configuration [Kr]5s<sup>2</sup>4d<sup>2</sup>?",
      [
        "Ti",
        "Zr",
        "Sr",
        "Hf"
      ],
      1,
      "Period 5, second element of the d block. Its d electrons are in 4d (period − 1). That is zirconium."
    ],
    [
      "What is the configuration of Fe<sup>2+</sup>?",
      [
        "[Ar]3d<sup>6</sup>",
        "[Ar]4s<sup>2</sup>3d<sup>4</sup>",
        "[Ar]4s<sup>2</sup>3d<sup>6</sup>",
        "[Ar]3d<sup>4</sup>"
      ],
      0,
      "Fe is [Ar]4s<sup>2</sup>3d<sup>6</sup>. Transition metals lose their 4s electrons first, leaving [Ar]3d<sup>6</sup>."
    ],
    [
      "How many unpaired electrons does a ground-state oxygen atom have?",
      [
        "0",
        "1",
        "4",
        "2"
      ],
      3,
      "2p<sup>4</sup>: by Hund’s rule, put one electron in each of three p orbitals, then pair the fourth. Two remain unpaired."
    ],
    [
      "Which atom is diamagnetic?",
      [
        "Na",
        "C",
        "Zn",
        "N"
      ],
      2,
      "Zn is [Ar]4s<sup>2</sup>3d<sup>10</sup>: every orbital is full and paired. Na (3s<sup>1</sup>), C (2p<sup>2</sup>) and N (2p<sup>3</sup>) all have unpaired electrons."
    ],
    [
      "Ca<sup>2+</sup> has the same electron configuration as which atom?",
      [
        "Ar",
        "Ca",
        "Kr",
        "Ne"
      ],
      0,
      "Ca is [Ar]4s<sup>2</sup>. Losing the two 4s electrons leaves exactly the argon configuration."
    ],
    [
      "What is the configuration of neodymium (Nd, Z = 60)?",
      [
        "[Xe]6s<sup>2</sup>4f<sup>4</sup>",
        "[Xe]6s<sup>2</sup>6f<sup>4</sup>",
        "[Xe]6s<sup>2</sup>5d<sup>4</sup>",
        "[Kr]5s<sup>2</sup>4f<sup>4</sup>"
      ],
      0,
      "Period 6, fourth element in the f block. The f shell is period − 2 = 4."
    ],
    [
      "Which of these is paramagnetic?",
      [
        "He",
        "Na<sup>+</sup>",
        "Na",
        "Mg"
      ],
      2,
      "Na is [Ne]3s<sup>1</sup> with one unpaired electron. He, Na<sup>+</sup> and Mg have only paired electrons."
    ]
  ]
});

EXTRA.d1030 = {
  "overview": "Electrons fill orbitals from lowest energy up, one per orbital before pairing, which you can read straight off the periodic table, including the f block. Unpaired electrons make an atom paramagnetic; all paired makes it diamagnetic.",
  "vs": {
    "9": "<p>An orbital is a probability cloud, densest near the middle with no hard edge; drawings show the 90% boundary. Rows of the periodic table are energy shells, so H is 1s<sup>1</sup>, He 1s<sup>2</sup>, Li 1s<sup>2</sup>2s<sup>1</sup>. Electrons fill the lowest open level first because those already there repel newcomers.</p>",
    "10": "<p>Think of filling as stacking cubes from the floor up. After 2s comes 2p: one electron in each p orbital before pairing (<strong>Hund’s rule</strong>). Read configurations off the table by block: N = 1s<sup>2</sup>2s<sup>2</sup>2p<sup>3</sup>, Si = 1s<sup>2</sup>2s<sup>2</sup>2p<sup>6</sup>3s<sup>2</sup>3p<sup>2</sup>. Check by adding the superscripts: they equal the atomic number.</p>",
    "11": "<p>Noble gas notation: write the noble gas from the row above in brackets, then the rest. Si = [Ne]3s<sup>2</sup>3p<sup>2</sup>, Ca = [Ar]4s<sup>2</sup>. What sits outside the brackets shows the valence electrons. Ca loses two to become Ca<sup>2+</sup> = [Ar], a full octet.</p>",
    "12": "<p>In the d block the shell number is <strong>period minus one</strong>: Ni = [Ar]4s<sup>2</sup>3d<sup>8</sup>, Zr = [Kr]5s<sup>2</sup>4d<sup>2</sup>. The diagonal-arrow chart gives the same order, but reading the periodic table is faster and lets you work backward from the last electron. The highest-shell electrons (4s for Ni) are the ones that react.</p>",
    "13": "<p>For f-block elements the shell is <strong>period minus two</strong>. Xenon is [Kr]5s<sup>2</sup>4d<sup>10</sup>5p<sup>6</sup>; neodymium is [Xe]6s<sup>2</sup>4f<sup>4</sup>. The f block really belongs between the s and d blocks; it is printed below to save width.</p>",
    "14": "<p>Electrons are tiny magnets. Unpaired, parallel spins add up: <strong>paramagnetic</strong>, pulled into a magnetic field (a balance tips toward the magnet). Paired spins cancel: <strong>diamagnetic</strong>, weakly pushed away. He is diamagnetic; C and Na are paramagnetic; Na<sup>+</sup> is diamagnetic.</p>",
    "14a": "<p>No transcript. From the title it applies para/diamagnetism to N<sub>2</sub> and O<sub>2</sub>. Standard result: liquid O<sub>2</sub> is paramagnetic (it has two unpaired electrons and sticks to a magnet), while N<sub>2</sub> is diamagnetic.</p>"
  },
  "handouts": [
    [
      "Electron Configuration slides",
      "<p>Aluminum three ways: full configuration 1s<sup>2</sup>2s<sup>2</sup>2p<sup>6</sup>3s<sup>2</sup>3p<sup>1</sup>; orbital notation (a line or box per orbital with up and down arrows); noble gas [Ne]3s<sup>2</sup>3p<sup>1</sup>. The slides build the table block by block: s, then p, then d at period − 1, then f at period − 2.</p>\n    <p><strong>Exceptions:</strong> Cr = [Ar]4s<sup>1</sup>3d<sup>5</sup> (half-filled d) and Cu = [Ar]4s<sup>1</sup>3d<sup>10</sup> (filled d). Some lanthanides break the rules too, but the slides say to treat only Cr and Cu as exceptions. Practice: orbital notation and configuration for Fe<sup>2+</sup>.</p>"
    ],
    [
      "Reading Notes 6.7–6.9",
      "<p>Pauli exclusion: no two electrons share all four quantum numbers. Hund’s rule: in equal-energy (degenerate) orbitals, electrons spread out with the same spin before pairing. The noble-gas core is the core electrons; the rest are outer-shell electrons used in bonding. Filled d or f subshells don’t count as valence electrons. Lanthanides (57–70) and actinides make up the f block.</p>"
    ]
  ],
  "worked": [
    [
      "Slides: Configuration of Cu?",
      "[Ar]4s<sup>1</sup>3d<sup>10</sup>, not [Ar]4s<sup>2</sup>3d<sup>9</sup>. Copper moves a 4s electron to fill its 3d sublevel."
    ],
    [
      "Slides: Configuration of Fe<sup>2+</sup>?",
      "Fe is [Ar]4s<sup>2</sup>3d<sup>6</sup>. Remove the two 4s electrons first: Fe<sup>2+</sup> = [Ar]3d<sup>6</sup>, with 4 unpaired electrons."
    ],
    [
      "Practice #34: Unpaired electrons in N, I, Ni<sup>2+</sup>, O<sup>2−</sup>?",
      "N: 3 (2p<sup>3</sup>). I: 1 (5p<sup>5</sup>). Ni<sup>2+</sup>: 2 (3d<sup>8</sup>). O<sup>2−</sup>: 0 (same as Ne)."
    ],
    [
      "Practice #53: Which are excited states? 1s<sup>2</sup>2s<sup>2</sup>3p<sup>1</sup>; 1s<sup>2</sup>2s<sup>2</sup>2p<sup>6</sup>; 1s<sup>2</sup>2s<sup>2</sup>2p<sup>4</sup>3s<sup>1</sup>; [Ar]4s<sup>2</sup>3d<sup>5</sup>4p<sup>1</sup>",
      "Excited boron (ground 1s<sup>2</sup>2s<sup>2</sup>2p<sup>1</sup>); neon in its ground state; excited fluorine (ground 1s<sup>2</sup>2s<sup>2</sup>2p<sup>5</sup>); excited iron (ground [Ar]4s<sup>2</sup>3d<sup>6</sup>)."
    ],
    [
      "Practice #100: Para- or diamagnetic? P, Cl, Zn, Mn, Cr, Cu",
      "Unpaired electrons: P 3, Cl 1, Mn 5, Cr 6, Cu 1 (all paramagnetic). Zn has all paired: diamagnetic."
    ]
  ],
  "terms": [
    [
      "Orbital diagram",
      "Boxes or lines for orbitals with up and down arrows for electrons."
    ],
    [
      "Degenerate orbitals",
      "Orbitals with the same energy, like the three 2p orbitals."
    ]
  ],
  "mistakes": [
    "Forgetting the Cr and Cu exceptions: [Ar]4s<sup>1</sup>3d<sup>5</sup> and [Ar]4s<sup>1</sup>3d<sup>10</sup>."
  ]
};
