# Config: Chemistry 2e, Chapter 11

Proposed by the agent after the chapter exploration (2026-09-28). Status: applied as proposed on 2026-09-28, on Chen's instruction to finish the book without check-ins; the per-section stops of root rule 2, the plan review of root rule 5 and the user picks of root rule 15 are replaced by a plan file per section, written before the section is built and left for review after. Each line is a setting and its value.

| Setting | Value |
|---|---|
| Chapter | 11 Solutions and Colloids, modules m68776 (introduction), m68778, m68781, m68782, m68783, m68784 |
| Front matter | the chapter introduction (m68776) is a page of its own in `ch11/intro/`, listed before 11.1, built by the prep agent with Figure 11.1 and no figure of its own |
| Unit of work | one section = one page; sections never folded (root rule 11) |
| Loop | prep → plan file → build → validator, the five sections in parallel, then the chapter pass; review after |
| Prose | verbatim; objectives, the section summary (to `summary_html`), the key equations and the glossary go to the tables (root rule 4) |
| Headers | one `<h2>` per sub-concept in the book's voice and sentence case; the book's own headers mark real divisions and the page's headers follow them; a worked example's `<h3>` is its number and the book's title |
| Boxed notes | Decompression Sickness or “The Bends” (11.3); Colligative Properties and De-Icing, Reverse Osmosis Water Purification (11.4); Deepwater Horizon Oil Spill, Frederick Gardner Cottrell (11.5); all kept verbatim as `<div class="note">` with the book's eyebrow and an `<h3>` title |
| Link to Learning | all five dropped and named in `notes`: two in 11.1, three in 11.3; the PhET dissolution lab (11.1) and soluble-salts simulation (11.3) are triggers for a Sim of our own |
| Tables | Table 11.1 (11.1), Tables 11.2 and 11.3 (11.4), Table 11.4 (11.5) in the text as `div.book-table`; 11.5's answer table stays inside its exercise; Key Equations tables not printed |
| Example numbers | the publisher's: 11.1–11.2 (11.3), 11.3–11.13 (11.4) |
| Figure numbers | the publisher's, 11.1 to 11.37, listed per section in `exploration.md` and checked on openstax.org |
| Figures | diagrams and graphs become interactive Figures with the book's numbers where a slider, a choice or a clock teaches; faithful stills where they do not; folds are each section's call, candidates in `exploration.md` |
| Photographs | Figure 11.1 (intro) and every photograph listed in `exploration.md`, all kept, since the text points at each |
| 3D | particle pictures (11.3, 11.7, 11.18, 11.28) are 3D boxes with a flat strip of readings; apparatus (11.6, 11.24, 11.25, 11.36) is a 3D bench with a bounded orbit; named structures (11.31–11.32) carry the 2D/3D view choice, 2D by default, while 11.33 is flat (the book's cross section) and 11.34(c) stays inside its photograph; graphs, the phase diagram, energy steps and the red cells stay flat |
| Motion | per figure in its plan line; clocks are natural for mixing (11.3), dissolving (11.7), evaporation to equilibrium (11.18) and osmosis rising to its height (11.24); graphs and structures are still, with no transport |
| Colour | `concentration`, `pressure`, `temperature`, `energy` in 11.1's steps where drawn as a quantity, `amount` and `mass` where a readout states them, `time` where a clock is drawn; everything else ink, the element palette or `F.cat`; see `COLOR.md` |
| Symbols | eighteen rows added: typed `C_g` `\kCg`, `m_molal` `\kmolal` (concentration); `P_g` `\kPg`, `P_A*` `\kPAstar`, `P_i` `\kPcomp`, `P_i*` `\kPcompstar`, `P_solution` `\kPsoln`, `P_solvent*` `\kPsolvstar`, `ΔP_vp` `\kdPvp`, `Π` `\kosm` (pressure); `ΔT_b` `\kdTb`, `ΔT_f` `\kdTf` (temperature); untyped `k_H`, `X_i`, `X_solvent`, `K_b`, `K_f`, `i_vh`; reused `M`, `P_A`, `X_A`, `R`, `T`, `n`, `m` (mass only); no new type |
| Inline exercises | thirteen Check Your Learning items (2 in 11.3, 11 in 11.4), inline after their examples, each with a `data-place` host |
| Exercises tab | the end-of-section items of each module, kind `exercise`; no `simulation-exercise` |
| Exercise placement | 11.4's `fs-idp128725184` moves to 11.3 with `source_section`; everything else tests its own section |
| Answers to book problems | the book's key only; nineteen unkeyed numerical items left out and named in `exercise_notes`; one unkeyed choice item kept open with its options; seventeen other unkeyed items kept with an AI-marked suggested approach (list in `exploration.md`) |
| Generated questions | none |
| Concept nodes | 31 rows merged before the sections are built (5, 5, 7, 9, 5), 81 prerequisite edges, into Chapters 1, 2, 3, 4, 5, 7, 9 and 10 and within the chapter |
| Formulas | `ch11/chapter.json`: Henry's law, mole fraction, molality, Raoult's law in three forms, boiling point elevation, freezing point depression, osmotic pressure and the van't Hoff factor; 23 variables; no anchors until the chapter pass |
| Glossary | the book's wording, 44 entries (4, 6, 8, 17, 9); terms are plain words, the book's "(*m*)", "(*Π*)" and "(*i*)" dropped from the term |
| Degrees | `°` in prose and `^\circ` in math |
| Cross references | plain text to other sections; a pointer to the periodic table may link the elements page |
| Voice | root rule 17 and the book's Voice section |
| Labels | Figure for a book number, Sim for an addition; the word "demo" nowhere |
| `ai` and `built` | `{"text": "Claude Opus 5.5", "figures": "Claude Opus 5.5"}`, `2026-09-28` |
| Book manifest | `ch11` added to `book.json` by `ost merge chemistry-2e 11` |

## What the build changed

- Folds: Figures 11.24 + 11.25 (osmosis, with an applied pressure that runs past Π into reverse osmosis) and 11.31 + 11.32 (one amphiphile with a choice of head group). 11.18 and 11.23 stay two figures. Every number from 11.1 to 11.37 is shown and linked.
- Sims added: the Lake Nyos turnover (11.3) and the Tyndall glass (11.5), each labelled Sim.
- Unnumbered images kept as figure rows with no number: 11.2's hydronium image, 11.3's ammonia image (`CNX_Chem_11_02_ammonia1_img.jpg`), and the six step diagrams of 11.4's examples.
- 3D: 11.33 is flat, the book's own cross section, and 11.34(c) stays inside the photograph, a molecule merely named (rule 24.9).
- Colour: 11.1 binds `energy` only; 11.4 binds no `amount`, `mass` or `time`; see `COLOR.md`, "As built".
- Anchors, set at the chapter pass: Henry's law and its three variables to 11.3's henry heading; 11.4's nine equations and twenty variables to its molality, vapor, phase, boiling, freezing, osmosis and electrolytes headings.

- Prerequisites, 2026-10-05: the concept-prerequisite edges were Hasse-reduced from 166 to 129.
