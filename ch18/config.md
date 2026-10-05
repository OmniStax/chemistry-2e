# Config: Chemistry 2e, Chapter 18

Proposed by the agent after the chapter exploration (2026-10-05). Status: applied as proposed on 2026-10-05, on Chen's instruction to finish the book without check-ins; the per-section stops of root rule 2, the plan review of root rule 5 and the user picks of root rule 15 are replaced by a plan file per section, written before the section is built and left for review after. Each line is a setting and its value.

| Setting | Value |
|---|---|
| Chapter | 18 Representative Metals, Metalloids, and Nonmetals, modules m68828 (introduction), m68829 to m68840 |
| Front matter | the chapter introduction (m68828) is a page of its own in `ch18/intro/`, listed before 18.1, built by the prep agent with Figure 18.1 and no figure of its own |
| Unit of work | one section = one page; sections never folded, the thin 18.6, 18.8, 18.10 and 18.12 included |
| Loop | prep → plan file → build → validator, the twelve sections in parallel, then the chapter pass; review after |
| Prose | verbatim; objectives, the section summary (to `summary_html`) and the glossary go to the tables; no Key Equations in the chapter |
| Headers | the book's own headers kept (18.1 Group 1 to Group 15; 18.2 Electrolysis, Chemical Reduction and their Preparation of … subheads; 18.3 Structures of the Metalloids, Occurrence, Preparation, and Compounds of Boron and Silicon with its two subheads; 18.4 Structures of the Nonmetals, Carbon, Phosphorus, Sulfur; 18.5 Preparation of Hydrogen, Reactions, Hydrogen Compounds and their subheads; 18.9 Reactions, Oxides, Peroxides, and Hydroxides, Nonmetal Oxygen Compounds, Nonmetal Oxyacids and Their Salts and the four oxyacid headers; 18.11 Occurrence and Preparation, Properties of the Halogens, Halides of the Representative Metals, Interhalogens, Applications); one header of the section's own for each untitled opening (18.6, 18.7, 18.8's opening, 18.10 and 18.12 have no book header) |
| Boxed notes | Sacrificial Anodes and Amalgams (18.1), Nanotubes and Graphene (18.4), Nitrogen Fixation (18.7), The Chlor-Alkali Process (18.9), Chemistry in Everyday Life, verbatim as `div.note` with the book's eyebrow and an `<h3>` title |
| Link to Learning | five (two in 18.1, one each in 18.3, 18.9, 18.11) dropped and named in `notes`; 18.3's cubic-diamond explorer is the trigger for a Sim of the diamond structure |
| Tables | Table 18.1 (18.5), 18.2 (18.9) and 18.3 (18.11) as `div.book-table`; the unnumbered table inside `fs-idp111201728` (18.1) stays in its prompt; Appendix G links `/chemistry-2e/sheets/thermo/` |
| Example numbers | none in the chapter |
| Figure numbers | 18.1 to 18.63, listed per section in `exploration.md` |
| Figures | 18.2 a group-trend Sim on the periodic table or a copy; 18.10/18.11 electrolytic benches moving or copies; 18.12, 18.13, 18.18 and a diamond-structure Sim in 3D; 18.14 zone refining moving; 18.20 + 18.22 + 18.23 carbon allotropes in 3D with a sheet rolling into a tube; 18.24 white to red phosphorus; 18.25 molten sulfur on a temperature slider; 18.26 water electrolysis moving or a copy; an NO₂/N₂O₄ box; 18.39 to 18.41 the phosphorus molecules with P₄ → P₄O₆ → P₄O₁₀; 18.55 to 18.57 the chlorine oxyanions with a choice; 18.59 Frasch moving; 18.63 interhalogens with a choice; each section's plan decides folds and tiers |
| Photographs | every photograph is pointed at by the text and kept (listed in `exploration.md`); Figure 18.1 on the introduction page |
| Unnumbered images | `fs-idp60354928` (18.3) and `fs-idp81139952` (18.5) in the text, kept as `figure` rows with no number or redrawn; the Lewis-structure images inside six keys stay in their answers; the 29 unused `Exercise*_img` bundle files are never used |
| 3D | structures and arrangements in space (18.12, 18.13, 18.18, 18.20, 18.22 to 18.25, 18.39 to 18.41, 18.63, the particle box) physical 3D; apparatus benches bounded, never from beneath, where redrawn; a molecule beside its resonance forms both ways with a view choice defaulting to 2D where redrawn; the periodic table, the oxidation-state chart, the tables and every strength series flat |
| Motion | per figure in its plan line; ions migrating in a cell, gas bubbling, a molten zone sweeping, water and sulfur flowing in the Frasch pipes, sulfur chains forming are kinematic and set the moving tier; structures that only turn, the oxidation-state chart and the periodic table are still |
| Colour | `energy` for ΔH°, ΔG_f°; `potential` for E°; `equilibrium-constant` for K_P, K_a, K_a1, K_a2, pK_a; `temperature`, `pressure`, `density`, `mass`, `concentration`, `volume` for values the prose states; `F.el` for every atom and ion; flame, gas, solution and solid colours as facts; see `COLOR.md` |
| Types | none added |
| Symbols | none added; reused `ΔH°` `\kdHo`, `ΔG_f°` `\kdGf`, `E_std` `\kEo`, `K_P` `\kKP`, `K_a` `\kKa`, `K_a1` `\kKaone`, `K_a2` `\kKatwo`, `pK_a` `\kpKa`; variables rows in `chapter.json` |
| Inline exercises | none (no worked example, so no Check Your Learning) |
| Exercises tab | end-of-section items, kind `exercise`; no `simulation-exercise` |
| Exercise placement | no moves |
| Answers to book problems | the book's key only; 39 unkeyed items whose answers would be computed left out (3, 3, 7, 2, 2, 1, 4, 5, 5, 1, 3, 3); five unkeyed choice items kept open with their options (18.1 two, 18.10 two, 18.11 one); fourteen unkeyed conceptual items kept with an AI-marked suggested approach (2, 3, 1, 2, 0, 1, 0, 1, 0, 2, 2, 0) |
| Generated questions | none |
| Concept nodes | 77 rows merged (9, 6, 9, 9, 8, 3, 5, 3, 14, 2, 6, 3) with prerequisite edges into Chapters 1, 2, 4, 6, 7, 8, 10, 11, 12, 13, 14, 15, 17 and within the chapter |
| Formulas | none: the chapter states no equation of quantities; its chemical equations stay in the text |
| Glossary | the book's wording, 42 entries; 37 are terms on this chapter's concepts, each on the section that introduces it (18.12 prints 18.11's "halide" and "interhalogen"); "representative element", "metalloid", "alkaline earth metal" (2.5), "passivation" (17.6) and "amorphous" (10.5) name concepts that already exist and are not restaged |
| Degrees | `°` in prose and `^\circ` in math, never `º` |
| Cross references | plain text to other sections; the elements page `/chemistry-2e/sheets/elements/` where the text points at the periodic table |
| Labels | Figure for a book number, Sim for an addition |
| `ai` and `built` | `{"text":[{"model":"claude-opus-5-5","effort":"high"}],"figures":[{"model":"claude-opus-5-5","effort":"high"}]}`, `2026-10-05`; every figure row carries its own `ai` |
| Book manifest | `ch18` added to `book.json` by `ost merge chemistry-2e 18` |
