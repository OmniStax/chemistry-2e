# Config: Chemistry 2e, Chapter 5

Proposed by the agent after the chapter exploration (2026-09-28). Status: applied as proposed on 2026-09-28, on Chen's instruction to finish the book without check-ins; the per-section stops of root rule 2, the plan review of root rule 5 and the user picks of root rule 15 are replaced by a plan file per section, written before the section is built and left for review after. Each line is a setting and its value.

| Setting | Value |
|---|---|
| Chapter | 5 Thermochemistry, modules m68723 (introduction), m68724, m68726, m68727 |
| Front matter | the introduction (m68723) is `ch05/intro/`, listed before 5.1, built in the prep with Figure 5.1 and its one footnote |
| Unit of work | one section = one page; never folded |
| Loop | prep → plan file → build → validator, three sections in parallel, then the chapter pass |
| Prose | verbatim; objectives, summary (to `summary_html`), key equations and glossary to the tables |
| Headers | one `<h2>` per sub-concept in the book's voice, sentence case; the book's own headers (Energy; Thermal Energy, Temperature, and Heat; Standard Enthalpy of Combustion; Standard Enthalpy of Formation; Hess's Law) stand in place where they cover the same material; an example's `<h3>` is "Example 5.N · Title" |
| Boxed notes | the four everyday-life notes kept verbatim as `div.note` with eyebrow "Chemistry in Everyday Life" and the note's `<h3>` |
| Link to Learning | all nine dropped and named in `notes` |
| Footnotes | kept as `<sup>N</sup>` in the text and a `<p><small><sup>N</sup>…</small></p>` at the end of the section they stand in |
| Tables | Table 5.1 (5.1) and Table 5.2 (5.3) as `div.book-table`; the Key Equations tables go to `chapter.json` |
| Figure numbers | 5.1 to 5.24 as listed in `exploration.md`; examples 5.1 to 5.15; tables 5.1 and 5.2 |
| Figures | sketches of a quantity become live Figures with the book's numbers (folds suggested: 5.4 + 5.6, 5.11 + 5.14); apparatus drawings are faithful copies unless the plan argues a bench; photographs kept where the text points at them, each plan decides 5.2 and 5.21 |
| Motion | per figure; heat flowing to equilibrium and a calorimeter settling have a clock, the heating bench, the first-law diagram and the Hess ladder are still |
| 3D | the particle boxes of 5.4 + 5.6 and a calorimeter bench are 3D by the book's rule if built; everything else flat |
| Appendix G | linked as the sheet `/chemistry-2e/sheets/thermo/` wherever the text or an exercise names it |
| Colour coding | `energy`, `temperature`, `mass`; `volume` and `pressure` only in 5.3's enthalpy definition figure if it draws them; see `COLOR.md` |
| Symbols | added: `ΔT` `\kdT`, `T_initial` `\kTinit`, `T_final` `\kTfin`, `U` `\kU`, `H` `\kH`, `q_p` `\kqp`, `ΔH_c°` `\kdHc`, `ΔV` `\kdV`; untyped `C_heat` (C), `c_spec` (c), `n_coef` (n). Reused: `q`, `w` (`\kwork`), `ΔU`, `ΔH`, `m`, `P`, `V`, `T`, and chapter 7's `ΔH°` `\kdHo` and `ΔH_f°` `\kdHf`. No new type: specific heat and heat capacity stay in ink, as density does |
| Inline exercises | every Check Your Learning inline after its example with the book's answer: 2 in 5.1, 6 in 5.2, 8 in 5.3 |
| Exercise placement | every item stays in its section; none carries `source_section` |
| Answers | the key only; unkeyed numerical items left out and named in `exercise_notes`; unkeyed conceptual items kept with an AI-marked suggested approach |
| Concept nodes | 23 in `book.json` (9, 6, 8) with 47 edges |
| Formulas | 12 equations, 20 variable rows, every row anchored |
| Glossary | 32 entries (14, 6, 12) in the book's words |
| Degrees | ° outside math, `^\circ` inside; the book's º in two keys is corrected |
| Dollar signs | `&#36;` in prose (5.3's algal fuel note), `＄` in exercise strings (5.2's cereal item, if kept) |
| `ai` and `built` | `{"text": "Claude Opus 5.5", "figures": "Claude Opus 5.5"}`, `2026-09-28` |

## What the build changed

- Figures: 5.2 (the collage) dropped; 5.21 kept, since Example 5.10 points at it. Folds as built: 5.4 + 5.6 (3D particle boxes, moving) and 5.11 + 5.12 + 5.14 (a flat coffee cup calorimeter, moving); 5.19 and 5.24 still Figures; one Sim, the heating bench of 5.1.
- Binds: 5.3 binds energy only; no figure draws PΔV, so P, V and ΔV stay in ink there.
- Exercises: 68 (10, 22, 36), 16 of them Check Your Learning inline; Example 5.3's two items share its source id. The cereal item of 5.2 is keyed and kept.
- Formulas: every equation and variable row anchored by the chapter pass; 8 prerequisite edges into Chapters 3 and 4 added (39 to 47).
