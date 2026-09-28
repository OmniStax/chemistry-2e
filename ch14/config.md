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
| Colour | `concentration` for [H₃O⁺], [OH⁻], pH, pOH, [HA], [A⁻] and every log concentration axis; `volume` for titrant volume; `amount` for moles of acid or base added; `temperature` where K_w is read against T; every K, pK, percent ionization and x in ink; indicator colours as physical fact; see `COLOR.md` |
| Symbols | eighteen rows added: typed concentration `[H3O+]` `\kconcHyd`, `[OH-]` `\kconcOH`, `[HA]` `\kconcHA`, `[A-]` `\kconcAm`, `[HB+]` `\kconcHBp`, `[HA]_0` `\kconcHAz`, `[H3O+]_eq` `\kconcHydeq`; untyped `K_w`, `K_a`, `K_b_ion`, `pK_w`, `pK_a`, `pK_b`, `K_a1`, `K_a2`, `K_a3`, `K_b1`, `K_b2`; reused `pH` `\kpH`, `pOH` `\kpOH`, `[B]` `\kconcB`, `x_ice`, `V` `\kV`, `n` `\kn`, `T` `\kT`; no new type |
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
