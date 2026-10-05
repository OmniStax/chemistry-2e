# Config: Chemistry 2e, Chapter 15

Proposed by the agent after the chapter exploration (2026-09-28). Status: applied as proposed on 2026-09-28, on Chen's instruction to finish the book without check-ins; the per-section stops of root rule 2, the plan review of root rule 5 and the user picks of root rule 15 are replaced by a plan file per section, written before the section is built and left for review after. Each line is a setting and its value.

| Setting | Value |
|---|---|
| Chapter | 15 Equilibria of Other Reaction Classes, modules m68810 (introduction), m68811, m68813, m68814 |
| Front matter | the chapter introduction (m68810) is a page of its own in `ch15/intro/`, listed before 15.1, built by the prep agent with Figure 15.1 and no figure of its own |
| Unit of work | one section = one page; sections never folded |
| Loop | prep → plan file → build → validator, the three sections in parallel, then the chapter pass; review after |
| Prose | verbatim; objectives, the section summary (to `summary_html`), the key equations and the glossary go to the tables |
| Headers | 15.1 keeps the book's four headers (The Solubility Product, K_sp and Solubility, Predicting Precipitation, Common Ion Effect); 15.2 and 15.3 print none and take headers of their own; a worked example's `<h3>` is its number and the book's title |
| Boxed notes | How Sciences Interconnect: Using Barium Sulfate for Medical Imaging (15.1, Figure 15.4 inside), Chemistry in Everyday Life: The Role of Precipitation in Wastewater Treatment (15.1, Figure 15.6), Chemistry in Everyday Life: Role of Fluoride in Preventing Tooth Decay (15.3, Figure 15.9), verbatim as `div.note`; their closing "Visit this website" sentences are dropped with the Link to Learning items |
| Link to Learning | 15.1 (solubility simulation, trigger for its Sim) and 15.3 (ocean acidification, coral reefs) dropped and named in `notes` |
| Tables | none numbered; ICE tables as HTML tables or kept `figure` rows; Key Equations not printed |
| Example numbers | 15.1–15.13 (15.1), 15.14 (15.2), 15.15–15.16 (15.3) |
| Figure numbers | 15.1 to 15.9, listed per section in `exploration.md` |
| Figures | 15.2 a 3D particle Figure of a dissolving salt; a flat K_sp-plane Sim in 15.1 (Q_sp, common ion, selective precipitation); 15.2's Lewis equations as unnumbered Figures or one still Sim with a choice of reaction; a solubility-against-pH Sim in 15.3; each section's plan decides |
| Photographs | 15.3, 15.4, 15.5, 15.6, 15.7, 15.8, 15.9 kept, since the text points at each; Figure 15.1 on the introduction page |
| Unnumbered images kept as `figure` rows | any ICE table or Lewis equation image a section keeps as an image |
| 3D | Figure 15.2 (particle picture), bounded orbit; a complex ion (Ag(NH₃)₂⁺, Al(OH)₄⁻, Cu(CN)₂⁻) drawn both ways with a view choice, default 2D; every graph flat |
| Motion | per figure in its plan line; the dissolution box may exchange ions on a clock if the section argues dynamic equilibrium; everything else still |
| Colour | `concentration` for every ion concentration, molar solubility and log concentration axis, pH and pOH; `mass` for grams dissolved where a readout states it; K_sp, Q_sp, K_f, K_d, Q and the net K in `equilibrium-constant`, through their macros, as the tables declare them; x, p and q in ink; see `COLOR.md` |
| Symbols | eight rows added: `K_sp` `\kKsp`, `Q_sp` `\kQsp`, `K_f_form` `\kKfform` and `K_d` `\kKd`, each taking `equilibrium-constant` from its concept; `p_stoich` and `q_stoich` with LaTeX only; `[M^m+]` `\kconcMion`, `[X^n-]` `\kconcXion`; reused `K`, `K_a2`, `x_ice`, `[H3O+]`, `[OH-]`, `pH`, `pOH`, `M`; never `K_f` (Chapter 11's cryoscopic constant) or `K_b` |
| Inline exercises | sixteen Check Your Learning items (13, 1, 2), each with a `data-place` host |
| Exercises tab | end-of-section items, kind `exercise`; `fs-idp2894848` (15.1) is a `simulation-exercise`, held unless the Sim carries it |
| Exercise placement | `fs-idp46388832` 15.2 → 15.1; `fs-idm301808` and `fs-idp11595856` 15.3 → 15.1; `fs-idm65484352`, `fs-idm98555648` 15.2 → 15.3; `fs-idm299312`, `fs-idp457072`, `fs-idp135248` 15.3 → 15.2; each with `source_section` |
| Answers to book problems | the book's key only; thirty-seven unkeyed numerical items left out (22, 7, 8); two unkeyed choice items kept open with their options (15.1); ten others kept with an AI-marked suggested approach |
| Generated questions | none |
| Concept nodes | 16 rows merged (8, 5, 3), 41 prerequisite edges into Chapters 3, 4, 7, 11, 13, 14 and within the chapter |
| Formulas | `ch15/chapter.json`: K_sp general form, K_f, K_d = 1/K_f, the two coupled net K; 11 variables; no anchors until the chapter pass |
| Glossary | the book's wording, 14 entries (4, 9, 1); the "(K_sp)", "(K_f)", "(K_d)" dropped from terms |
| Degrees | `°` in prose and `^\circ` in math |
| Cross references | plain text to other sections; Appendix J links `/chemistry-2e/sheets/ksp/`, Appendix K `/chemistry-2e/sheets/kf/` |
| Voice | root rule 17 and the book's Voice section |
| Labels | Figure for a book number, Sim for an addition |
| `ai` and `built` | `{"text": "Claude Opus 5.5", "figures": "Claude Opus 5.5"}`, `2026-09-28` |
| Book manifest | `ch15` added to `book.json` by `ost merge chemistry-2e 15` |

## What the build changed

- K_sp, Q_sp, K_f, K_d, the book's plain Q and the net K are typed `equilibrium-constant` and written through their macros on every page, as the symbols and concepts tables declared them; the Colour and Symbols rows above are corrected to say so. The concept `molar-solubility` is typed `concentration` at the chapter pass, as 15.1 asked.
- Figure 15.2 is a moving 3D Figure: ion pairs leave a silver chloride block and return on a 6 s clock until the two rates meet, with the counts on a strip beneath. A K_sp-plane Sim (15.1), a Sim of silver chloride dissolving in ammonia (15.2) and a solubility-against-pH Sim for aluminum hydroxide (15.3) are added, each labelled Sim.
- ICE tables: 15.1's four (Examples 15.3, 15.4, 15.6, 15.13) and 15.2's one (Example 15.14) are written as unnumbered HTML tables in the text; no ICE image is copied.
- Unnumbered images as `figure` rows with no number: 15.2 redraws its five Lewis equations (hydronium and ammonium, BF₄⁻, Ag(NH₃)₂⁺, sulfate, the two displacements) and the Cu(CN)₂⁻ structure flat; 15.3 replaces the Al(OH)₄⁻ image with a two-view Figure (flat by default, tetrahedral in 3D) and keeps Example 15.16's thiosulfate equation as printed.
- 15.2 builds no 3D complex ion: Ag(NH₃)₂⁺ and Cu(CN)₂⁻ are linear, and a 3D view would show nothing the flat drawing lacks.
- `fs-idp2894848` (15.1) stays held: the K_sp-plane Sim draws AgCl and AgBr, not the simulation's salts.
- Anchors, set at the chapter pass: the five forms and every variables row, including twelve rows added for the symbols the pages write through macros ([OH⁻], pH and pOH in 15.1; K_sp and Q in 15.2; K_sp, K_a1, K_f, pK_a, pH, pOH and [OH⁻] in 15.3).
- Concepts: the sections added seven concepts and 21 prerequisite edges to the 16 and 41 merged before the build, 23 and 62 in all.
