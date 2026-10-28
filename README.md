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

Days load in class order from the script tags at the bottom of `index.html`. A new day needs its own file there and a `META` entry in `app.js`.

## Pictures

The orbital images, the Balmer spectrum and the electron-cloud loop in `img/` are computed from the hydrogen wavefunction and the Rydberg equation, not photographs.
