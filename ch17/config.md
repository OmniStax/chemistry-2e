# Config: Chemistry 2e, Chapter 17

Proposed by the agent after the chapter exploration (2026-10-05). Status: applied as proposed on 2026-10-05, on Chen's instruction to finish the book without check-ins; the per-section stops of root rule 2, the plan review of root rule 5 and the user picks of root rule 15 are replaced by a plan file per section, written before the section is built and left for review after. Each line is a setting and its value.

| Setting | Value |
|---|---|
| Chapter | 17 Electrochemistry, modules m68820 (introduction), m68821, m68822, m68823, m68824, m68825, m68826, m68827 |
| Front matter | the chapter introduction (m68820) is a page of its own in `ch17/intro/`, listed before 17.1, built by the prep agent with Figure 17.1 and no figure of its own |
| Unit of work | one section = one page; sections never folded, 17.1 included |
| Loop | prep → plan file → build → validator, the seven sections in parallel, then the chapter pass; review after |
| Prose | verbatim; objectives, the section summary (to `summary_html`), the key equations and the glossary go to the tables |
| Headers | the book's own headers kept: 17.1 Oxidation Numbers, Balancing Redox Equations; 17.2 Cell Notation; 17.3 Interpreting Electrode and Cell Potentials; 17.4 E° and ΔG°, E° and K, Potentials at Nonstandard Conditions: The Nernst Equation; 17.5 Single-Use Batteries, Rechargeable (Secondary) Batteries, Fuel Cells; 17.7 The Electrolysis of Molten Sodium Chloride, of Water, of Aqueous Sodium Chloride, Quantitative Aspects of Electrolysis; one header of the section's own for each untitled opening (17.6 has no book header); a worked example's `<h3>` is its number and the book's title |
| Boxed notes | Statue of Liberty: Changing Colors (17.6) and Electroplating (17.7), Chemistry in Everyday Life, verbatim as `div.note` with the book's eyebrow and an `<h3>` title |
| Link to Learning | all seven in 17.5 dropped and named in `notes`; none is a simulation |
| Tables | Table 17.1 (17.3) and Table 17.2 (17.4) as `div.book-table`; Key Equations not printed; Appendix L links `/chemistry-2e/sheets/potentials/` |
| Example numbers | 17.1–17.2 (17.1), 17.3 (17.2), 17.4–17.5 (17.3), 17.6–17.8 (17.4), 17.9–17.10 (17.7) |
| Figure numbers | 17.1 to 17.20, listed per section in `exploration.md` |
| Figures | the galvanic cell 17.3 (+ 17.4) moving; 17.6 with a choice of half-cell against the SHE, or an E° ladder Sim; 17.7 the K–ΔG°–E° triangle on one slider; a Nernst Sim and a concentration cell running down (17.4); 17.12 and 17.14 moving; 17.16 + 17.17 moving with a choice of protection; 17.19 or 17.20 with current and time sliders; the battery cutaways copies; each section's plan decides folds and tiers |
| Photographs | 17.2 (copper in silver nitrate), 17.8's 1904 drawing (with its schematic), 17.15 (Statue of Liberty) kept; Figure 17.1 on the introduction page |
| Unnumbered images | none in the chapter |
| 3D | galvanic and electrolytic cells (17.3, 17.4, 17.5, 17.6, 17.18, 17.19, 17.20) are benches with a bounded orbit, never from beneath, where redrawn; battery cutaways a locked view if redrawn; every graph, ladder, triangle and cross section flat |
| Motion | per figure in its plan line; electrons in a wire, ions crossing a salt bridge or migrating to an electrode, Li⁺ shuttling, gases fed and bubbling, rust forming are kinematic arrows and set the moving tier; the E° ladder, the triangle and the Nernst line are still |
| Colour | `potential` for every E; `energy` for ΔG, ΔG°, w; `equilibrium-constant` for K and Q; `amount` for n; `charge` for Q (17.7) and F; `current` for I; `time`, `temperature`, `concentration`, `mass`, `volume` where a readout states one; see `COLOR.md` |
| Types | one added, `current` (A); `npm run colours:default -- chemistry-2e` to be rerun at the chapter pass |
| Symbols | 12 rows added, all typed (`F_Faraday` as charge, its per-mole variant), listed in `exploration.md`; reused `E_cell`, `E_std` (E°), `Q_charge`, `Q_c`, `n`, `t`, `ΔG`, `ΔG°`, `w_max`, `K`, `T`, `R`; never `\kE` (energy) for a potential, `\kQ` (charge) for the reaction quotient or `\kQrxn` for a charge |
| Inline exercises | ten Check Your Learning items (2, 1, 2, 3, 0, 0, 2), each with a `data-place` host |
| Exercises tab | end-of-section items, kind `exercise`; no `simulation-exercise` |
| Exercise placement | no moves; keyed items that refer to a left-out item restate its reactions |
| Answers to book problems | the book's key only; sixteen unkeyed items whose answers would be computed left out (2, 3, 3, 2, 1, 0, 5); three unkeyed choice items kept open with their options (17.1, 17.2, 17.6); six unkeyed conceptual items kept with an AI-marked suggested approach (2, 1, 0, 0, 1, 2, 0) |
| Generated questions | none |
| Concept nodes | 50 rows merged (2, 9, 9, 7, 9, 6, 8), 99 prerequisite edges into Chapters 1, 2, 3, 4, 5, 7, 11, 13, 14, 16 and within the chapter; 4.2's redox concepts reused for 17.1 |
| Formulas | forms on the concepts in `book.json` (12); 34 variables in `chapter.json`; no anchors until the chapter pass |
| Glossary | the book’s wording, 31 entries as 36 concept terms (with SHE, voltaic cell, cell schematic, half-cell and electroplating), each on the concept of the section that introduces it ("electrode potential" and "half cell" printed in 17.1, "cell potential" in 17.2, "salt bridge" in 17.6) |
| Degrees | `°` in prose and `^\circ` in math, never `º` |
| Cross references | plain text to other sections; the appendices as above |
| Labels | Figure for a book number, Sim for an addition |
| `ai` and `built` | `{"text":[{"model":"claude-opus-5-5","effort":"high"}],"figures":[{"model":"claude-opus-5-5","effort":"high"}]}`, `2026-10-05`; every figure row carries its own `ai` |
| Book manifest | `ch17` added to `book.json` by `ost merge chemistry-2e 17` |
