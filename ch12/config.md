# Config: Chemistry 2e, Chapter 12

Proposed by the agent after the chapter exploration (2026-09-28). Status: applied as proposed on 2026-09-28, on Chen's instruction to finish the book without check-ins; the per-section stops of root rule 2, the plan review of root rule 5 and the user picks of root rule 15 are replaced by a plan file per section, written before the section is built and left for review after. Each line is a setting and its value.

| Setting | Value |
|---|---|
| Chapter | 12 Kinetics, modules m68785 (introduction), m68786, m68787, m68789, m68791, m68793, m68794, m68795 |
| Front matter | the chapter introduction (m68785) is a page of its own in `ch12/intro/`, listed before 12.1, built by the prep agent with Figure 12.1 and no figure of its own |
| Unit of work | one section = one page; sections never folded (root rule 11) |
| Loop | prep → plan file → build → validator, the seven sections in parallel, then the chapter pass; review after |
| Prose | verbatim; objectives, the section summary (to `summary_html`), the key equations and the glossary go to the tables (root rule 4) |
| Headers | one `<h2>` per sub-concept in the book's voice and sentence case; the book's own headers mark real divisions and the page's headers follow them; a worked example's `<h3>` is its number and the book's title |
| Boxed notes | Reaction Rates in Analysis: Test Strips for Urinalysis (12.1); Mario J. Molina, Glucose-6-Phosphate Dehydrogenase Deficiency, Automobile Catalytic Converters, Enzyme Structure and Function (12.7); all kept verbatim as `<div class="note">` with the book's eyebrow and an `<h3>` title |
| Link to Learning | all five dropped and named in `notes`: three in 12.2, two in 12.7; the PhET Reactions & Rates interactive (12.2) is the trigger for a collision Sim of our own |
| Tables | Table 12.1 (12.3), Table 12.2 (12.4), Table 12.3 (12.7) in the text as `div.book-table`; the data tables of examples and exercises stay unnumbered with them; Key Equations tables not printed |
| Example numbers | the publisher's: 12.1–12.2 (12.1), 12.3–12.5 (12.3), 12.6–12.12 (12.4), 12.13 (12.5), 12.14 (12.6), 12.15 (12.7) |
| Figure numbers | the publisher's, 12.1 to 12.25, listed per section in `exploration.md` and checked on openstax.org |
| Figures | graphs and diagrams become interactive Figures with the book's numbers where a slider, a choice or a clock teaches; faithful stills where they do not; folds are each section's call, candidates in `exploration.md`; Figure 12.2 is a data table printed as an image and may become a live table-and-curve Figure keeping its number |
| Photographs | Figure 12.1 (intro) and every photograph listed in `exploration.md`, all kept, since the text points at each |
| 3D | particle pictures (12.13, any collision Sim, 12.23) are 3D with a flat strip of readings; named structures (12.17, 12.6's cyclobutane) carry the 2D/3D view choice, 2D by default; graphs, reaction diagrams, the pathway chart and the enzyme schematics stay flat |
| Motion | per figure in its plan line; clocks are natural for the concentration curves of 12.1, the fading flasks of 12.12, collisions (12.13 and any Sim) and the steps of 12.23; reaction diagrams and plots are still, with no transport |
| Colour | `rate`, `concentration`, `time` for rates and curves; `energy` for E_a, ΔH and every reaction-diagram energy axis; `temperature` in 12.2 and 12.5; everything else ink, the element palette or `F.cat`; see `COLOR.md` |
| Symbols | thirteen rows added: typed `[A]` `\kconcA`, `[A]_0` `\kconcAz`, `[A]_t` `\kconcAt`, `[B]` `\kconcB`, `Δ[A]` `\kdconcA`, `Δ[B]` `\kdconcB` (concentration), `E_a` `\kEa` (energy); untyped `A_freq`, `m_rxorder`, `n_rxorder`, `k_1`, `k_2`, `k_m1`; reused `rate` `\krate`, `t` `\kt`, `Δt` `\kdt`, `t_half` `\kthalf`, `T` `\kT`, `T_1` `\kTone`, `T_2` `\kTtwo`, `ΔH` `\kdH`, untyped `k` and `R`; no new type |
| Inline exercises | sixteen Check Your Learning items (2 in 12.1, 4 in 12.3, 7 in 12.4, 1 each in 12.5, 12.6, 12.7), inline after their examples, each with a `data-place` host |
| Exercises tab | the end-of-section items of each module, kind `exercise`; the five PhET items kind `simulation-exercise`, held unless the section's own Sim carries them |
| Exercise placement | every item stays in its own section |
| Answers to book problems | the book's key only; twenty-three unkeyed numerical items left out and named in `exercise_notes`; one unkeyed choice item kept open with its options; fifteen other unkeyed items kept with an AI-marked suggested approach (list in `exploration.md`) |
| Generated questions | none |
| Concept nodes | 43 rows merged before the sections are built (5, 5, 7, 8, 7, 6, 5), 97 prerequisite edges, into Chapters 1, 3, 4, 5, 8, 9 and 10 and within the chapter |
| Formulas | `ch12/chapter.json`: relative rates, the rate law, the integrated rate laws of orders 0, 1 and 2 (the first in two forms), the three half-lives, the Arrhenius equation in three forms; 23 variables; no anchors until the chapter pass |
| Glossary | the book's wording, 29 entries (5, 1, 5, 2, 6, 8, 2); terms are plain words, the book's "(*k*)", "(*t*<sub>1/2</sub>)", "(*E*<sub>a</sub>)" and "(*A*)" dropped from the term |
| Degrees | `°` in prose and `^\circ` in math |
| Cross references | plain text to other sections; a pointer to the periodic table may link the elements page |
| Voice | root rule 17 and the book's Voice section |
| Labels | Figure for a book number, Sim for an addition; the word "demo" nowhere |
| `ai` and `built` | `{"text": "Claude Opus 5.5", "figures": "Claude Opus 5.5"}`, `2026-09-28` |
| Book manifest | `ch12` added to `book.json` by `ost merge chemistry-2e 12` |
