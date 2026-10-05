# Config: Chemistry 2e, Chapter 14

Proposed by the agent after the chapter exploration (2026-09-28). Status: applied as proposed on 2026-09-28, on Chen's instruction to finish the book without check-ins; the per-section stops of root rule 2, the plan review of root rule 5 and the user picks of root rule 15 are replaced by a plan file per section, written before the section is built and left for review after. Each line is a setting and its value.

| Setting | Value |
|---|---|
| Chapter | 14 Acid-Base Equilibria, modules m68802 (introduction), m68803 to m68809 |
| Front matter | the chapter introduction (m68802) is a page of its own in `ch14/intro/`, listed before 14.1, built by the prep agent with Figure 14.1 and no figure of its own |
| Unit of work | one section = one page; sections never folded (root rule 11, the book's `RULES.md`) |
| Loop | prep → plan file → build → validator, the seven sections in parallel, then the chapter pass; review after |
| Prose | verbatim; objectives, the section summary (to `summary_html`), the key equations and the glossary go to the tables (root rule 4) |
| Headers | one `<h2>` per sub-concept in the book's voice and sentence case; the book's own headers (14.3, 14.4, 14.6, 14.7) mark real divisions and the page's headers follow them; 14.1, 14.2 and 14.5 print none and take headers of their own; a worked example's `<h3>` is its number and the book's title |
| Boxed notes | Environmental Science (14.2, acid rain, Figure 14.3 inside, its EPA link kept as printed), Portrait of a Chemist (14.6, Henderson and Hasselbalch), Medicine: The Buffer System in Blood (14.6), each verbatim as `<div class="note">` with the book's eyebrow and an `<h3>` title |
| Link to Learning | 14.3 (strong and weak acid simulation) and 14.6 (buffers in natural waters) dropped and named in `notes`; 14.3's is the trigger for its acid-in-water Sim |
| Tables | Table 14.1 (14.2) and Table 14.2 (14.7, with its two column footnotes) as `div.book-table`; Figure 14.6 is a numbered figure, not a table; the ICE tables of 14.3–14.6 are unnumbered images written as HTML tables or kept as `figure` rows; Key Equations tables not printed |
| Example numbers | the publisher's: 14.1–14.3 (14.1), 14.4–14.6 (14.2), 14.7–14.14 (14.3), 14.15–14.18 (14.4), 14.19 (14.5), 14.20 (14.6), 14.21–14.22 (14.7) |
| Figure numbers | the publisher's, 14.1 to 14.20, listed per section in `exploration.md` |
| Figures | 14.2 a still Figure on one log pH axis with a temperature choice; 14.7 + 14.8 a still fold of the conjugate-pair ladder; 14.3's acid-in-water Sim; 14.13 a still 3D Figure; 14.15 and 14.17 still Figures on added acid or base; 14.18 (+ 14.20, perhaps 14.19) one live titration Figure; 14.6, 14.11, 14.12 faithful copies unless a section argues more; folds are each section's call |
| Photographs | 14.3, 14.4, 14.5 (14.2), 14.9, 14.10 (14.3), 14.14, 14.16 (14.6) kept, since the text points at each and 14.5, 14.14 and 14.16 show indicator colours as physical fact; Figure 14.1 kept on the introduction page |
| Unnumbered images kept as `figure` rows | 14.1's four equation images if 14.1 keeps them rather than redrawing; any ICE table or equation image a section keeps as an image; 14.3's E–O–H skeleton (`OHbonds_img`) if kept |
| 3D | 14.13's hydrated aluminum ion and 14.3's acid-in-water Sim are 3D (coordination geometry, particle picture), bounded orbit; 14.7's buret and flask 3D if built as a bench, never from beneath; a molecule a section draws (water, pyridine, an oxyacid) both ways with a view choice, default 2D; every chart, ladder and curve flat |
| Motion | per figure in its plan line; the titration may run on a drip clock; everything else answers its sliders and is still, with no transport |
| Colour | `concentration` for [H₃O⁺], [OH⁻], pH, pOH, [HA], [A⁻] and every log concentration axis; `volume` for titrant volume; `amount` for moles of acid or base added; `temperature` where K_w is read against T; `equilibrium-constant` for every K and pK (see What the build changed); percent ionization and x in ink; indicator colours as physical fact; see `COLOR.md` |
| Symbols | eighteen rows added: typed concentration `[H3O+]` `\kconcHyd`, `[OH-]` `\kconcOH`, `[HA]` `\kconcHA`, `[A-]` `\kconcAm`, `[HB+]` `\kconcHBp`, `[HA]_0` `\kconcHAz`, `[H3O+]_eq` `\kconcHydeq`; `K_w` `\kKw`, `K_a` `\kKa`, `K_b_ion` `\kKbion`, `pK_w` `\kpKw`, `pK_a` `\kpKa`, `pK_b` `\kpKb`, `K_a1`, `K_a2`, `K_a3`, `K_b1`, `K_b2` (`\kKaone` to `\kKbtwo`), typed `equilibrium-constant` through their concepts; reused `pH` `\kpH`, `pOH` `\kpOH`, `[B]` `\kconcB`, `x_ice`, `V` `\kV`, `n` `\kn`, `T` `\kT`; no new type |
| Inline exercises | twenty-two Check Your Learning items (3, 3, 8, 4, 1, 1, 2), inline after their examples, each with a `data-place` host |
| Exercises tab | the end-of-section items of each module, kind `exercise`; no `simulation-exercise` in the chapter |
| Exercise placement | `fs-idm94404336`, `fs-idm94046624`, `fs-idm8587472` move from 14.3 to 14.4 and `fs-idm75310368` from 14.3 to 14.5, each with `source_section`; every other item stays in its own section |
| Answers to book problems | the book's key only; twenty-two unkeyed numerical items left out and named in `exercise_notes` (5 in 14.2, 8 in 14.3, 1 in 14.4, 2 in 14.5, 5 in 14.6, 1 in 14.7); one unkeyed choice item (14.3) kept open with its options; twenty-four other unkeyed items kept with an AI-marked suggested approach (list in `exploration.md`) |
| Generated questions | none |
| Concept nodes | 36 rows merged before the sections are built (6, 5, 8, 4, 3, 5, 5), 79 prerequisite edges, into Chapters 3, 4, 7, 11, 13 and within the chapter |
| Formulas | `ch14/chapter.json`: K_w, pH and pOH both ways, pH + pOH = pK_w, K_a, K_b, K_a × K_b = K_w, percent ionization, pK_a, pK_b, Henderson-Hasselbalch; 30 variables; no anchors until the chapter pass |
| Glossary | the book's wording, 31 entries (10, 5, 5, 0, 5, 3, 3); terms are plain words, the book's "(*K*<sub>w</sub>)", "(*K*<sub>a</sub>)" and "(*K*<sub>b</sub>)" dropped from the term |
| Degrees | `°` in prose and `^\circ` in math |
| Cross references | plain text to other sections; Appendices H and I (K_a, K_b) link the `ka` and `kb` sheets; Appendix B (logarithms, 14.2) points at the publisher's page, since no sheet holds it |
| Voice | root rule 17 and the book's Voice section |
| Labels | Figure for a book number, Sim for an addition; the word "demo" nowhere |
| `ai` and `built` | `{"text": "Claude Opus 5.5", "figures": "Claude Opus 5.5"}`, `2026-09-28` |
| Book manifest | `ch14` added to `book.json` by `ost merge chemistry-2e 14` |

## What the build changed

- Colour: every K and pK is typed `equilibrium-constant` and written through its macro, as the tables and `COLOR.md` declare and every section built it; the prep's "untyped, in ink" is withdrawn. General mentions of a concept are marked as root rule 7 asks (the chapter pass marked them where 14.2, 14.3 and 14.5 to 14.7 had left the kind in general in ink). 14.5 has no referents and 14.6 draws acetic acid and acetate as `F.cat` bars. See `COLOR.md`.
- Figures as built: Figure 14.2 a still chart with a pH slider and a 25 °C or 80 °C choice; Figure 14.7 + 14.8 a still ladder of 26 pairs on mirrored K_a and K_b axes; Figure 14.13 a still 3D aquo ion with a before and after choice; Figure 14.15 + 14.17 a still bar chart and pH curve on moles added; Figure 14.18 + 14.20 a still titration curve on a volume slider, with a pK_a slider and a flat flask in the indicator's real colour, no drip clock. Sims: K_w against T (14.1), acid in water in 3D (14.3), a salt's two constants (14.4), the stepwise levels of a polyprotic acid (14.5). Figures 14.6, 14.11, 14.12 and 14.19 are the book's images.
- 14.1's four equation images are redrawn as unnumbered Figures, water and ammonia with a direction choice and a 2D or 3D view.
- Unnumbered images kept as `figure` rows: 14.3's two pH-paper photographs and E–O–H skeleton, and 14.5's acetic acid equation. Every ICE table (14.3, 14.4, 14.5, 14.6) is written as an unnumbered `div.book-table` in the text and no ICE image is copied.
- Anchors, set at the chapter pass: the thirteen forms and every variables row, 64 in all, including 34 rows added so that every symbol a page writes through its macro has a row in that section.
- Concepts: 57 and 144 prerequisite edges after the build. `acidic-basic-neutral` is folded into `acidic-solution`, `basic-solution` and `neutral-solution`, the three glossary words, and `neutral-solution` carries the temperature dependence; `acid-base-ionization-constants` is kept as the relative strength of acids and bases, the idea K_a and K_b each make particular; `acid-ionization-constant` takes K_a as its symbol.
- Exercise numbering: the chapter's items run 1 to 95 as openstax.org prints them (14.6 is 77 to 91). The key covers the odd items to 47 and the even items from 48 on, since the book keys both 47 and 48; nothing is renumbered.

