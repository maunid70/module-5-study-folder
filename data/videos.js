// Video list shared by every study day. Each entry: [title, length, YouTube id, no-transcript flag].
const YT = id => "https://youtu.be/" + id;
const V = {
  flame: ["Lab 7: Flame Test", "23:58", "TVtFKHoyJTA"],
  1: ["1. Introduction to Light", "9:36", "rLNM8zI4Q_M"],
  2: ["2. Photoelectric Effect", "10:23", "vuGpUFjLaYE"],
  3: ["3. Absorption and Emission", "10:29", "AznXSVx2xX0"],
  4: ["4. Emission Spectrum of Hydrogen", "10:49", "Kv-hRvEOjuA"],
  5: ["5. Heisenberg Uncertainty Principle", "10:17", "PZIoFD_Z73M"],
  6: ["6. Light and Matter", "8:19", "OQwTcl9TeUM"],
  7: ["7. Quantum Numbers", "11:59", "KrXE_SzRoqw"],
  8: ["8. Quantum Numbers for the First Four Shells", "12:36", "qLU0X154wlE"],
  9: ["9. Orbitals", "13:37", "yBrp8uvNAhI"],
  10: ["10. More on Orbitals and Electron Configuration", "14:30", "FmQoSenbtnU"],
  11: ["11. Noble Gas Configuration", "6:46", "tlSJCG5DqzI"],
  12: ["12. Electron Configurations 2", "10:17", "YURReI6OJsg"],
  13: ["13. Electron Configuration for F-block Element Nd", "5:55", "L-0FkEPPdXE"],
  14: ["14. Paramagnetism and Diamagnetism", "8:04", "-lIc5z3XjXQ"],
  "14a": ["14.a Paramagnetism and Diamagnetism of N₂ and O₂", "3:35", "Lt4P6ctf06Q", true],
  15: ["15. Atomic Radius Trends on the Periodic Table", "9:39", "q--2WP8wXtk"],
  16: ["16. Atomic and Ionic Radii", "11:25", "rKoIcgBM4Vg"],
  17: ["17. Mini-video on Ion Size", "3:03", "HBi8xjMchZc"],
  18: ["18. Ionization Energy Trends", "10:01", "5CBs36jtZxY"],
  19: ["19. Ionization Energy: Periodic Trend", "10:02", "649ZlWMp0LE"],
  20: ["20. First and Second Ionization Energy", "7:34", "uVWquWFjnCw"],
  21: ["21. Electron Affinity: Periodic Trend", "13:05", "6WIBa32o63Q"],
  22: ["22. Electronegativity", "9:53", "Rr7LhdSKMxY"],
  23: ["23. Periodicity", "8:46", "0tP6bV89log"],
  24: ["24. The Periodic Table", "8:55", "t_f8bB1kf6M"],
  25: ["25. Groups of the Periodic Table", "8:19", "UXOcWAfBdZg"],
  26: ["26. Counting Valence Electrons for Main Group Elements", "8:18", "akm5H2JsccI"],
  27: ["27. Metallic Nature", "9:27", "pAjluTxSYgY"],
  28: ["28. Introduction to Photoelectron Spectroscopy", "8:23", "vPjQgSeWikQ"],
  29: ["29. Coulomb’s Law", "10:57", "yUPdtFqilXo"],
  beer: ["Lab 8: Beer’s Law (Penny Lab)", "4:39", "wYRkw3ThqmA"],
  penny: ["Preparing Penny Solution", "", "5-6vjd5JHdA", true]
};

// Filled in by the files in data/days/, in class order.
const DAYS = [];
const EXTRA = {};
