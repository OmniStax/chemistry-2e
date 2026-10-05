# Config: Chemistry 2e, Chapter 19

Proposed by the agent after the chapter exploration (2026-10-05). Status: applied as proposed on 2026-10-05, on Chen's instruction to finish the book without check-ins; the per-section stops of root rule 2, the plan review of root rule 5 and the user picks of root rule 15 are replaced by a plan file per section, written before the section is built and left for review after. Each line is a setting and its value.

| Setting | Value |
|---|---|
| Chapter | 19 Transition Metals and Coordination Chemistry, modules m68841 (introduction), m68842 to m68844 |
| Front matter | the chapter introduction (m68841) is a page of its own in `ch19/intro/`, listed before 19.1, built by the prep agent with Figure 19.1 and no figure of its own |
| Unit of work | one section = one page; sections never folded |
| Loop | prep → plan file → build → validator, the three sections in parallel, then the chapter pass; review after |
| Prose | verbatim; objectives, the section summary (to `summary_html`) and the glossary go to the tables; no Key Equations in the chapter |
| Headers | the book's own headers kept (19.1 Properties of the Transition Elements, Preparation of the Transition Elements, Isolation of Iron, Isolation of Copper, Isolation of Silver, Transition Metal Compounds with Halides, Oxides, Hydroxides, Carbonates, Other Salts; 19.2 The Naming of Complexes, The Structures of Complexes, Isomerism in Complexes, Coordination Complexes in Nature and Technology; 19.3 Crystal Field Theory, Magnetic Moments of Molecules and Ions, Colors of Transition Metal Complexes); one header of the section's own for each untitled opening (19.1's and 19.2's) |
| Boxed notes | Uses of Lanthanides in Devices and High Temperature Superconductors (19.1), Transition Metal Catalysts and the Portrait of Deanna D’Alessandro (19.2), verbatim as `div.note` with the book's eyebrow and an `<h3>` title |
| Link to Learning | four (two in 19.1, one each in 19.2, 19.3) dropped and named in `notes`; the steelmaking animation is the trigger for a moving blast-furnace Figure |
| Tables | Tables 19.1 to 19.5 (all 19.2) as `div.book-table`; Tables 19.2 to 19.4 have no header row; Appendix L links `/chemistry-2e/sheets/potentials/`, the misprinted Appendix H is carried as printed |
| Example numbers | 19.1 to 19.9, three per section, each with a keyed Check Your Learning inline |
| Figure numbers | 19.1 to 19.40, listed per section in `exploration.md`; 19.22, 19.32 and 19.36 sit inside examples and are numbered |
| Figures | 19.2 a series Sim on the periodic table or a copy; 19.4 the oxidation states with a choice of metal or a copy; 19.6 the blast furnace moving, flat; 19.10 the superconductor graph on a temperature slider or a copy; 19.14 + 19.18 + 19.19 + 19.20 coordination geometries in 3D with a choice; 19.21 + 19.22 cis and trans in 3D; 19.23 + 19.24 optical isomers in 3D; 19.33 + 19.36 the d orbitals with ligands in 3D, with 19.34, 19.35 and the two unnumbered patterns as flat energy diagrams; 19.37 the colour wheel with an absorbed wavelength; each section's plan decides folds and tiers |
| Photographs | every photograph is pointed at by the text or sits in a kept box, and is kept (listed in `exploration.md`); Figure 19.1 on the introduction page |
| Unnumbered images | `fs-idm6075904` (19.3 text) and `fs-idp4747504` (Example 19.8's solution) kept as `figure` rows with no number or redrawn; Example 19.5's answer image `fs-idp9187376` and the key images of `fs-idp5586896`, `fs-idp128328048`, `fs-idm69906288` stay in their answers; the eleven unused `Answer5*` and `Ex0*-ans` bundle files are never used |
| 3D | coordination geometries and isomers physical 3D through `F.view3d`, `F.el` for every atom; the d orbitals mathematical 3D; a structure the text names both ways with a view choice defaulting to 2D where redrawn; tables, energy diagrams, the periodic table, the furnace cutaway, graphs and Lewis structures flat |
| Motion | per figure in its plan line; the charge descending and gases rising in the blast furnace, ligands approaching a free ion where drawn arriving are kinematic and set the moving tier; molecules that only turn, energy diagrams and the colour wheel are still |
| Colour | `energy` for Δ<sub>oct</sub>, Δ<sub>tet</sub>, P and photon energy; `potential` for E°; `wavelength`, `frequency` and `velocity` (c) in Example 19.9; `temperature`, `mass`, `volume`, `concentration`, `length` and `pressure` for values the prose and exercises state; `F.el` for every atom and ion; solution, mineral and light colours as facts; see `COLOR.md` |
| Types | none added; resistance (19.10) stays ink |
| Symbols | added `Δ_oct` `\kdoct`, `Δ_tet` `\kdtet`, `P_pair` `\kPpair`; reused `E_std` `\kEo`, `λ` `\klam`, `ν` `\knu`, `E` `\kE`, `c` `\kc`, `h`; variables rows in `chapter.json` |
| Inline exercises | nine Check Your Learning items, each in a host `div.exercises` with `data-place` after its example |
| Exercises tab | end-of-section items, kind `exercise`; no `simulation-exercise` |
| Exercise placement | no moves |
| Answers to book problems | the book's key only; 13 unkeyed items whose answers would be computed left out (6, 4, 3); seven unkeyed choice items kept open with their options (4, 1, 2); four unkeyed conceptual items kept with an AI-marked suggested approach (2, 0, 2) |
| Generated questions | none |
| Concept nodes | 43 rows merged (16, 15, 12) with prerequisite edges into Chapters 2, 4, 6, 7, 8, 10, 11, 14, 15, 17 and within the chapter |
| Formulas | Δ<sub>tet</sub> = 4/9 Δ<sub>oct</sub> on `crystal-field-other-geometries`; the chapter's chemical equations stay in the text |
| Glossary | the book's wording, 42 entries; 38 are terms on this chapter's concepts, each on the section that introduces it (19.3 prints 19.2's "geometric isomers"; 19.2 reprints 19.1's "coordination compound"); "lanthanide series" and "actinide series" name 2.5's `lanthanide` and `actinide`, and "ligand" and "coordination number" name 15.2's `ligand` and 10.6's `coordination-number`, which are not restaged |
| Degrees | `°` in prose and `^\circ` in math, never `º` |
| Cross references | plain text to other sections; the elements page `/chemistry-2e/sheets/elements/` where the text points at the periodic table, `/chemistry-2e/sheets/potentials/` for Appendix L |
| Labels | Figure for a book number, Sim for an addition |
| `ai` and `built` | `{"text":[{"model":"claude-opus-5-5","effort":"high"}],"figures":[{"model":"claude-opus-5-5","effort":"high"}]}`, `2026-10-05`; every figure row carries its own `ai` |
| Book manifest | `ch19` added to `book.json` by `ost merge chemistry-2e 19` |

## What the build changed

| Setting | Built |
|---|---|
| Figures | 19.1: Figure 19.2 a still Sim on the book's table with a choice of series; Figure 19.4 the book's chart with a choice of metal lighting its column beside its 4s and 3d boxes; Figure 19.6 a moving Sim on a 6 s clock with a choice of the lump followed (ore, coke, limestone); Figure 19.10 a still Sim with a temperature slider (detents at 4 K and 77 K) and a choice of material. 19.2: Figures 19.14 + 19.18 + 19.19 + 19.20 one 3D Sim with a choice of complex; 19.21 + 19.22 and 19.23 + 19.24 two 3D Sims; every Lewis and skeletal structure, EDTA (19.30) and the heme ribbon kept as the book's images. 19.3: Figures 19.33 + 19.34 + 19.36 one 3D Sim with the splitting beneath and a choice of geometry and orbital; Figure 19.35 a still Sim on a slider of Δ<sub>oct</sub>/P with a choice of d count (in place of a choice of ligand along the spectrochemical series); Figure 19.37 a moving Sim, white light crossing to the tube on a 4 s clock, where this file had the colour wheel still |
| Apparatus | the blast furnace (Figure 19.6) is flat, as this file set it, although the book's rule puts an apparatus on a 3D bench: the book draws it as a cutaway with eight zones whose heights and temperatures are read off its side, and a cutaway is what the flat figure keeps |
| Unnumbered images | `fs-idm6075904` and `fs-idp4747504` kept as `figure` rows with the book's images (`fig-square-planar`, `fig-tet-splitting`) |
| Types | `angle` bound in 19.2 for the bond angles the text states (109.5°, 90°, 180°) and the arcs of its two 3D Sims, where this file bound nothing; see `COLOR.md` |
| Formulas | ten variables rows, `T` added in 19.1 for the superconductor readout; every row and the form `eq-delta-tet` anchored at the chapter pass |
| Glossary | "lanthanide series" and "lanthanoid series" added to 2.5's `lanthanide`, "actinide series" and "actinoid series" to `actinide`, through `ch02/book-rows.json` |
