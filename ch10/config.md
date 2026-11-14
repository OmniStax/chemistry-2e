# Config: Chemistry 2e, Chapter 10

Proposed by the agent after the chapter exploration (2026-09-28). Status: applied as proposed on 2026-09-28, on Chen's instruction to finish the book without check-ins; the per-section stops of root rule 2, the plan review of root rule 5 and the user picks of root rule 15 are replaced by a plan file per section, written before the section is built and left for review after. Each line is a setting and its value.

| Setting | Value |
|---|---|
| Chapter | 10 Liquids and Solids, modules m68760 (introduction), m68761, m68764, m68768, m68769, m68770, m68773 |
| Front matter | the chapter introduction (m68760) is a page of its own in `ch10/intro/`, listed before 10.1, built by the prep agent with Figure 10.1 and no figure of its own |
| Unit of work | one section = one page; sections never folded (root rule 11) |
| Loop | prep → plan file → build → validator, the six sections in parallel, then the chapter pass; review after |
| Prose | verbatim; objectives, the section summary (to `summary_html`), the key equations and the glossary go to the tables (root rule 4) |
| Headers | one `<h2>` per sub-concept in the book's voice and sentence case; the book's own headers mark real divisions and the page's headers follow them; a worked example's `<h3>` is its number and the book's title |
| Boxed notes | Geckos and Intermolecular Forces, Hydrogen Bonding and DNA (10.1); Biomedical Applications of Capillary Action (10.2); Decaffeinating Coffee Using Supercritical CO₂ (10.4); Graphene: Material of the Future (10.5); X-ray Crystallographer Rosalind Franklin (10.6); all kept verbatim as `<div class="note">` with the book's eyebrow and an `<h3>` title |
| Link to Learning | all four dropped and named in `notes`: two in 10.1, one in 10.4, one in 10.6 |
| Tables | Tables 10.1 (10.1), 10.2 and 10.3 (10.2), 10.4 (10.5) in the text as `div.book-table`; the unnumbered tables of 10.3's CYL and of 10.4 in the text without a number; Key Equations tables not printed |
| Example numbers | the publisher's: 10.1–10.3 (10.1), 10.4 (10.2), 10.5–10.10 (10.3), 10.11–10.13 (10.4), 10.14–10.19 (10.6) |
| Figure numbers | the publisher's, 10.1 to 10.66, listed per section in `exploration.md` and checked on openstax.org |
| Figures | diagrams and graphs become interactive Figures with the book's numbers where a slider, a choice or a clock teaches; the book's images where they do not (Figures 10.5, 10.7, 10.9, 10.10, 10.28 and 10.45 went back to them on 2026-11-14); folds are each section's call, candidates in `exploration.md` |
| Photographs | Figure 10.1 (intro) and the photographs listed in `exploration.md`, all kept; 10.25 (sweat, inside Example 10.9) is 10.3's call; 10.13, 10.14 and 10.36(a) may stay as the book's images; the unnumbered images of Examples 10.1, 10.5, 10.14, 10.15 and 10.18 (`BoilPoints_img`, `Ethanol_img`, `SimpCube_img`, `Ex100602_img`, `LiClstrctr`) are kept as the book's images in `figure` rows without a number |
| 3D | unit cells, crystal structures and graphene's three forms are physical 3D (bounded orbit, no snap-view buttons); particle pictures are flat so that every molecule is seen (the flask of 10.2, the flask and manometer of 10.22, the silica network of 10.37 + 10.38); no figure carries a 2D/3D view choice; graphs, ladders, phase diagrams and Bragg planes stay flat; the diffractometer (10.65) is the book's photograph |
| Motion | per figure in its plan line; clocks are natural for particle boxes (phases, vapor reaching equilibrium, a heating curve drawn as heat is added) and for capillary rise; unit cells are still scenes with no transport |
| Colour | `temperature`, `pressure`, `energy`, `time` where a clock is drawn, `mass` in 10.3's heating-curve readout, the quantities of the capillary equation in 10.2, `length` and `angle` in 10.6's cells, `wavelength` for 10.6's X-rays; everything else ink or the element palette; see `COLOR.md` |
| Symbols | thirteen rows added: typed `ΔH_vap` `\kdHvap`, `ΔH_fus` `\kdHfus`, `ΔH_sub` `\kdHsub` (energy); untyped `h_cap`, `T_surf`, `θ_contact`, `r_tube`, `A_cc`, `a_cell`, `r_atom`, `n_order`, `d_plane`, `θ_bragg`; reused `P`, `T`, `P_1`, `P_2`, `T_1`, `T_2`, `R`, `ρ`, `g_grav`, `λ`, `q`, `m`, `c_spec`, `ΔT`, `n`; no new type |
| Inline exercises | nineteen Check Your Learning items, inline after their examples, each with a `data-place` host |
| Exercises tab | the end-of-section items of each module, kind `exercise`; 10.1's PhET item a `simulation-exercise`, held unless 10.1's Sim carries it |
| Exercise placement | every item tests its own section; nothing moved, no `source_section` |
| Answers to book problems | the book's key only; thirteen unkeyed numerical items left out and named in `exercise_notes`; four unkeyed choice items kept open with their options; other unkeyed items kept with an AI-marked suggested approach (list in `exploration.md`) |
| Generated questions | none |
| Concept nodes | 39 rows merged before the sections are built (8, 5, 9, 5, 4, 8), 79 prerequisite edges, into Chapters 1, 3, 5, 6, 7 and 9 and within the chapter |
| Formulas | `ch10/chapter.json`: the capillary rise equation, the three forms of the Clausius-Clapeyron equation, the sum of enthalpies for sublimation and the Bragg equation; 23 variables; no anchors until the chapter pass |
| Glossary | the book's wording, 56 entries (8, 5, 13, 4, 8, 18) |
| Degrees | `°` in prose and `^\circ` in math |
| Cross references | plain text to other sections; a pointer to the periodic table may link the elements page |
| Voice | root rule 17 and the book's Voice section |
| Labels | Figure for a book number, Sim for an addition; the word "demo" nowhere |
| `ai` and `built` | `{"text": "Claude Opus 5.5", "figures": "Claude Opus 5.5"}`, `2026-09-28` |
| Book manifest | `ch10` added to `book.json` by `ost merge chemistry-2e 10` |

## What the build changed

- Folds: Figures 10.11 + 10.12; 10.30 + 10.31 + 10.34 (one phase diagram drawn to scale, a substance choice and a state point); 10.37 + 10.38; 10.39 to 10.42; 10.46 to 10.49; 10.50 to 10.52; 10.53 + 10.54; 10.55 + 10.56; 10.57 + 10.58; 10.59 to 10.62; 10.63 + 10.64. Every number from 10.1 to 10.66 is shown and linked.
- Photographs: 10.13, 10.14 and 10.36 stay as the book's images; the three unnumbered example images of 10.6 are kept, and so are those of Examples 10.1 and 10.5.
- Book's images, 2026-11-14: Figures 10.5, 10.7, 10.9, 10.10, 10.28 and 10.45 went back to the book's images (`photo` rows); the density Sim of 10.6 was dropped.
- Colour: 10.5 binds `temperature` on its melting-point readout; 10.6 binds `length` on the line where the atoms touch and `wavelength` in the Bragg figure; 10.2 binds `length`, `angle`, `surface-tension`, `density` and `acceleration` in Figure 10.20.
- Anchors, set at the chapter pass: the capillary rise equation to 10.2's capillary-rise heading, the three Clausius-Clapeyron forms to 10.3's clausius heading, the sublimation sum to 10.3's sublimation heading, the Bragg equation to 10.6's xray heading; the variables with their equations, `a_cell` and `r_atom` at Example 10.14.
- Prerequisites, 2026-10-05: the concept-prerequisite edges were Hasse-reduced from 191 to 144.
