# Module 5 Study Folder

Honors Chemistry 2, Module 5 (atomic structure and periodic trends): a study folder for each class day with video summaries, key terms, common mistakes, worked problems and a practice quiz, plus a hydrogen spectrum check and the equation sheet.

A static site with no build step. Vercel serves these files as they are.

## Where things live

| To change | Edit |
| --- | --- |
| One day's goals, summary, key terms, mistakes, quiz or handout notes | `data/days/<day>.js` (for example `data/days/d1030.js`) |
| The list of videos, their lengths and YouTube links | `data/videos.js` |
| Dates and tab labels for each day | the `META` table near the top of `app.js` |
| The equation sheet, trends table, exam facts or "About this guide" | `index.html` |
| Colors, type and layout | `styles.css` (colors are the tokens at the top) |
| Quiz, tabs, countdown and spectrum check behaviour | `app.js` |
| Equation and constant flashcards (term cards come from the day files) | `data/cards.js` |
| Flashcard behaviour | `flashcards.js` |
| Practice test questions and model answers | `data/practice-test.js` |
| Practice test behaviour | `practice-test.js` |
| Calculation drills, missed-question review, timer, progress checkmarks, printing, search | `study-extras.js` |
| PES peak data for the PES tool (elements 1–36) | `data/pes.js` |
| Bohr model page (atom, energy ladder, equations, wave) | `bohr.js` |
| Day sub-tabs, equation links, topic colours, light/dark switch, quiz scores on tabs | `ui-extras.js` |
| Free-response scoring guides | `data/fr-rubrics.js` |
| Night-before page | `tonight.js` |
| Element values for the periodic trends explorer | `data/elements.js` |
| Electron configuration, quantum numbers, trends explorer and calculators | `tools.js` |

Days load in class order from the script tags at the bottom of `index.html`. A new day needs its own file there and a `META` entry in `app.js`.

## Analytics

`index.html` loads Vercel Web Analytics from `/_vercel/insights/script.js`. It starts counting once Web Analytics is switched on for the project in the Vercel dashboard (Analytics tab, Enable).

## Pictures

The orbital images, the Balmer spectrum and the electron-cloud loop in `img/` are computed from the hydrogen wavefunction and the Rydberg equation, not photographs.
