# Config: Chemistry 2e, Chapter 16

Proposed by the agent after the chapter exploration (2026-10-05). Status: applied as proposed on 2026-10-05, on Chen's instruction to finish the book without check-ins; the per-section stops of root rule 2, the plan review of root rule 5 and the user picks of root rule 15 are replaced by a plan file per section, written before the section is built and left for review after. Each line is a setting and its value.

| Setting | Value |
|---|---|
| Chapter | 16 Thermodynamics, modules m68815 (introduction), m68816, m68817, m68818, m68819 |
| Front matter | the chapter introduction (m68815) is a page of its own in `ch16/intro/`, listed before 16.1, built by the prep agent with Figure 16.1 and no figure of its own |
| Unit of work | one section = one page; sections never folded |
| Loop | prep → plan file → build → validator, the four sections in parallel, then the chapter pass; review after |
| Prose | verbatim; objectives, the section summary (to `summary_html`), the key equations and the glossary go to the tables |
| Headers | 16.1 keeps Dispersal of Matter and Energy and takes one of its own for the opening; 16.2 keeps Entropy and Microstates and Predicting the Sign of ΔS, with one of its own for the opening; 16.3 keeps The Second Law and The Third Law of Thermodynamics; 16.4 keeps What’s “Free” about ΔG?, Calculating Free Energy Change, Free Energy Changes for Coupled Reactions, Temperature Dependence of Spontaneity and Free Energy and Equilibrium, with one of its own for the opening; a worked example’s `<h3>` is its number and the book’s title |
| Boxed notes | none in the chapter |
| Link to Learning | 16.2 (states of matter simulator) dropped and named in `notes`; it triggers the 16.10/16.11 Sim |
| Tables | Tables 16.1–16.4 as `div.book-table` (16.1 and 16.2 untitled in the CNXML); the unnumbered data tables of Examples 16.7 and 16.8 as `div.book-table` without a number; Key Equations not printed; Appendix G links `/chemistry-2e/sheets/thermo/`, Appendix J `/chemistry-2e/sheets/ksp/` |
| Example numbers | 16.1 (16.1), 16.2–16.3 (16.2), 16.4–16.6 (16.3), 16.7–16.13 (16.4) |
| Figure numbers | 16.1 to 16.14, listed per section in `exploration.md` |
| Figures | 16.4 + 16.5 moving (gas into vacuum, heat from X to Y); 16.8 + 16.9 (+ Example 16.2’s image) a microstate-counting Figure with choices of particle and energy-unit counts; 16.10 + 16.11 a phase box with a temperature slider and the S–T curve; 16.12 + 16.13 a ΔG–T line with ΔH and ΔS sliders and the crossing temperature as a special; 16.14 G against reaction progress with Q and K; 16.2 a copy or still Figure; each section’s plan decides the folds and tiers |
| Photographs | 16.3 (or a 3D lattice Figure with a choice, the section’s call), 16.6 (Example 16.1), 16.7 (portraits, alt of our own) kept; Figure 16.1 on the introduction page |
| Unnumbered images kept as `figure` rows | Example 16.2’s microstate image if 16.2 does not fold it; the acetic acid dimer of exercise `fs-idm230037264` inside its prompt |
| 3D | Figure 16.4 and Figure 16.10 (particle pictures), bounded orbit, never from beneath; 16.3’s lattices if redrawn; every graph, ladder and microstate count flat |
| Motion | per figure in its plan line; 16.4 and 16.5 draw kinematic arrows (particles crossing, heat flowing) and move on a clock; the counting, graph and ΔG figures are still |
| Colour | `entropy` for S, ΔS and every variant; `energy` for G, ΔG, ΔH, q, w, TΔS once multiplied out; `temperature` for T; `equilibrium-constant` for K and Q; W, k, N, n, ν, R in ink; see `COLOR.md` |
| Symbols | 32 rows added (25 typed, 7 untyped), listed in `exploration.md`; reused `S`, `ΔS`, `ΔG`, `H`, `ΔH`, `ΔH°`, `ΔH_f°`, `ΔU`, `q`, `w`, `P`, `ΔV`, `T`, `K`, `Q_c`, `Q_P`, `K_P`, `K_sp`, `R`; never `\kk` (rate constant) for Boltzmann’s k, `\knu` (frequency) for a coefficient, `\kn` (amount) for a number of boxes |
| Inline exercises | thirteen Check Your Learning items (1, 2, 3, 7), each with a `data-place` host |
| Exercises tab | end-of-section items, kind `exercise`; no `simulation-exercise` |
| Exercise placement | no moves |
| Answers to book problems | the book’s key only; twenty-one unkeyed numerical items left out (0, 2, 4, 15); eleven unkeyed conceptual items kept with an AI-marked suggested approach (2, 5, 1, 3) |
| Generated questions | none |
| Concept nodes | 29 rows merged (3, 9, 8, 9), 60 prerequisite edges into Chapters 1, 4, 5, 9, 10, 11, 12, 13 and within the chapter; `spontaneous-process` (11.1) reused |
| Formulas | forms on the concepts in `book.json` (20); 51 variables in `chapter.json`; no anchors until the chapter pass |
| Glossary | the book’s wording, 12 entries (2, 3, 4, 3) as concept terms; “spontaneous change” belongs to `spontaneous-process` (Chapter 11) and is left for the chapter pass |
| Degrees | `°` in prose and `^\circ` in math, never `º` |
| Cross references | plain text to other sections; the appendices as above |
| Labels | Figure for a book number, Sim for an addition |
| `ai` and `built` | `{"text":[{"model":"claude-opus-5-5","effort":"high"}],"figures":[{"model":"claude-opus-5-5","effort":"high"}]}`, `2026-10-05`; every figure row carries its own `ai` |
| Book manifest | `ch16` added to `book.json` by `ost merge chemistry-2e 16` |
