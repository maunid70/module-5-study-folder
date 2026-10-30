// dqn: edit this day's goals, summary, key terms, mistakes, quiz and handout notes here.
DAYS.push({
  "id": "dqn",
  "tab": "Quantum Numbers",
  "skipped": true,
  "title": "Quantum Numbers",
  "goals": [
    "I can explain why a given set of data suggests or does not suggest the need to refine the atomic model from a classical shell model to the quantum mechanical model."
  ],
  "videos": [
    7,
    8
  ],
  "summary": "<p class=\"note\">This row is marked <strong>Skipped</strong> on the calendar. Videos 7 and 8, which teach the quantum number rules, are grouped here by topic. The calendar assigns them to 10/30. The objective is still fair game on the exam, so it is summarized here.</p>\n  <p><strong>Why the shell (Bohr) model had to be refined:</strong> it predicts hydrogen’s lines well, but it only works for one-electron species. The uncertainty principle says an electron cannot have a fixed path. And data such as photoelectron spectra show that electrons in the same shell can have <strong>different energies</strong> (for example, separate 2s and 2p peaks), which a model with one energy per shell cannot explain.</p>\n  <p><strong>The quantum mechanical model</strong> replaces orbits with <strong>orbitals</strong>, regions where an electron is likely to be found (often drawn as the 90% boundary). Shells split into subshells (s, p, d, f) with different shapes and energies, described by four quantum numbers.</p>",
  "terms": [
    [
      "Orbit",
      "Fixed circular path (Bohr model). Not how electrons behave."
    ],
    [
      "Orbital",
      "3D region where an electron is most likely found."
    ],
    [
      "Subshell",
      "Group of orbitals of one type (s, p, d, f) within a shell."
    ],
    [
      "Shell model",
      "Model with one energy per shell; fails for multi-electron atoms."
    ]
  ],
  "mistakes": [
    "Saying the Bohr model is “wrong” without the evidence. Cite multi-electron spectra, PES subshell peaks, or the uncertainty principle.",
    "Using “orbit” and “orbital” as if they mean the same thing.",
    "Allowing l = n. l only goes up to n − 1."
  ],
  "todo": "Listed on the calendar: Reading 6.5–6.7, Slides, Quantum Number Postcard, Practice Problems #23–35.",
  "quiz": [
    [
      "The PES of neon shows two separate peaks for its n = 2 electrons. What does this suggest?",
      [
        "Neon has two nuclei",
        "The second shell is divided into subshells with different energies, so a simple shell model is not enough",
        "The instrument double-counted the electrons",
        "All n = 2 electrons have the same energy"
      ],
      1,
      "A shell model gives one energy per shell. Two peaks (2s and 2p) show subshells, which the quantum model explains."
    ],
    [
      "Which observation is explained well by the Bohr model?",
      [
        "Hydrogen’s visible line spectrum",
        "The line spectrum of iron",
        "Separate 3s and 3p peaks in PES",
        "The shapes of p orbitals"
      ],
      0,
      "Bohr’s model reproduces hydrogen’s Balmer lines exactly. It fails for atoms with more than one electron."
    ],
    [
      "What is the key difference between an orbit and an orbital?",
      [
        "An orbit is 3D and an orbital is 2D",
        "Orbits hold two electrons and orbitals hold eight",
        "An orbit is a fixed path; an orbital is a probability region",
        "There is no difference"
      ],
      2,
      "Orbitals describe where an electron is likely to be found. They have no sharp edge."
    ],
    [
      "How does the uncertainty principle conflict with the Bohr model?",
      [
        "It says electrons have no mass",
        "It says light is a particle",
        "It says energy is not quantized",
        "A fixed orbit would mean knowing the electron’s position and momentum exactly at the same time"
      ],
      3,
      "A defined radius and speed means precise position and momentum, which Δx · Δp ≥ h/4π forbids."
    ],
    [
      "Bohr’s equation fails for lithium mainly because:",
      [
        "lithium has more than one electron, so electron–electron repulsion changes the energies",
        "lithium is a metal",
        "lithium’s nucleus is too heavy",
        "lithium does not emit light"
      ],
      0,
      "The equation only counts attraction to the nucleus. Extra electrons repel each other and shield, which shifts the energies."
    ],
    [
      "Which set of quantum numbers (n, l, m<sub>l</sub>, m<sub>s</sub>) is NOT allowed?",
      [
        "(2, 1, −1, +½)",
        "(3, 2, 2, −½)",
        "(2, 2, 0, +½)",
        "(1, 0, 0, −½)"
      ],
      2,
      "l must be between 0 and n − 1. For n = 2, l can be 0 or 1, never 2."
    ],
    [
      "How many orbitals and how many electrons can the n = 3 shell hold?",
      [
        "9 orbitals, 18 electrons",
        "3 orbitals, 6 electrons",
        "6 orbitals, 12 electrons",
        "9 orbitals, 9 electrons"
      ],
      0,
      "n<sup>2</sup> = 9 orbitals (one 3s, three 3p, five 3d), each holding 2 electrons: 18."
    ],
    [
      "What does the magnetic quantum number m<sub>l</sub> tell you about an orbital?",
      [
        "Its size",
        "Its orientation in space",
        "Its spin",
        "Its shape"
      ],
      1,
      "n gives size and energy, l gives shape, m<sub>l</sub> gives orientation, and m<sub>s</sub> gives spin."
    ],
    [
      "What is the maximum number of electrons with n = 4 and l = 2?",
      [
        "2",
        "6",
        "10",
        "14"
      ],
      2,
      "l = 2 is a d subshell: m<sub>l</sub> = −2 to +2 gives 5 orbitals × 2 electrons = 10."
    ]
  ]
});

EXTRA.dqn = {
  "overview": "Four quantum numbers describe every electron: n (shell), l (shape), m<sub>l</sub> (orientation) and m<sub>s</sub> (spin). Their rules set how many orbitals and electrons each shell holds. The calendar marks this row skipped, but its objective is on the exam: explain why evidence such as photoelectron spectra forced chemists to replace Bohr’s shell model with orbitals and subshells.",
  "vs": {
    "7": "<p>Four numbers describe an electron. <strong>n</strong>: shell, energy and average distance (1, 2, 3…). <strong>l</strong>: shape, 0 to n − 1 (0 = s sphere, 1 = p dumbbell, 2 = d, 3 = f). <strong>m<sub>l</sub></strong>: orientation, −l to +l, so it counts orbitals (three p: p<sub>x</sub>, p<sub>y</sub>, p<sub>z</sub>). <strong>m<sub>s</sub></strong>: spin, +½ or −½. An orbit (Bohr) is a path; an orbital is where the electron is likely to be.</p>",
    "8": "<p>A shell has n<sup>2</sup> orbitals and holds 2n<sup>2</sup> electrons: 2, 8, 18, 32. Each orbital holds two electrons with opposite spins. s holds 2, p 6, d 10, f 14. The letters come from old spectroscopy terms (s once stood for “sharp”).</p>"
  },
  "handouts": [
    [
      "Reading Notes 6.5–6.6",
      "<p>Schrödinger’s wave equation treats the electron as both wave and particle. Its solutions are <strong>orbitals</strong>; the square of the wave function gives the probability of finding the electron. An orbital’s size is drawn as the surface holding 90% of the probability. s orbitals with n ≥ 2 have <strong>nodes</strong> (regions of zero probability); p orbitals have two lobes along an axis; d orbitals start at n = 3 and f at n = 4.</p>"
    ],
    [
      "Additional PES Questions",
      "<p>These compare PES data with the Bohr model. Lithium’s spectrum (two peaks, 2 : 1) fits Bohr’s two shells. Carbon’s spectrum has <strong>three</strong> peaks (1s, 2s, 2p) even though Bohr gives it only two shells, so the second shell must be split into subshells of different energy. That is the evidence for refining the model.</p>"
    ]
  ],
  "worked": [
    [
      "Additional PES #3: Carbon’s PES shows three peaks. Does the Bohr model need revising?",
      "Yes. Bohr puts carbon’s six electrons in two shells (2 and 4), which predicts two peaks. Three peaks (2 : 2 : 2) show the second shell has two sublevels, 2s and 2p, at different energies."
    ],
    [
      "Additional PES #2: Lithium’s PES. Anything that requires revising Bohr?",
      "No. Two peaks in a 2 : 1 ratio match Bohr’s picture of two electrons in the first shell and one in the second."
    ],
    [
      "Practice #35: Which sets are impossible? (2,1,2,+½) (5,2,1,−½) (6,5,0,0) (3,3,1,−½) (4,2,1,+½)",
      "(2,1,2,+½): m<sub>l</sub> can’t exceed l. (6,5,0,0): spin must be ±½. (3,3,1,−½): l can’t equal n. The other two are allowed."
    ]
  ],
  "terms": [
    [
      "Node",
      "A region inside an orbital where the probability of finding the electron is zero."
    ]
  ],
  "mistakes": []
};
