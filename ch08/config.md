# Config: Chemistry 2e, Chapter 8

Proposed by the agent after the chapter exploration (2026-09-28). Status: applied as proposed on 2026-09-28, on Chen's instruction to finish the book without check-ins; the per-section stops of root rule 2, the plan review of root rule 5 and the user picks of root rule 15 are replaced by a plan file per section, written before the section is built and left for review after. Each line is a setting and its value.

| Setting | Value |
|---|---|
| Chapter | 8 Advanced Theories of Covalent Bonding, modules m68743 (introduction), m68744, m68745, m68746, m68747 |
| Front matter | the chapter introduction (m68743) is a page of its own in `ch08/intro/`, listed before 8.1, built by the prep agent with Figure 8.1 and a faithful still copy of the N₂ and O₂ Lewis structures |
| Unit of work | one section = one page; sections never folded (root rule 11), so 8.3, with no glossary entry of its own, keeps its page |
| Loop | prep → plan file → build → validator, the four sections in parallel, then the chapter pass; review after |
| Prose | verbatim; objectives, the section summary (to `summary_html`), the key equation and the glossary go to the tables (root rule 4) |
| Headers | one `<h2>` per sub-concept in the book's voice and sentence case; the book's own headers (the five hybridization headers of 8.2; Molecular Orbital Energy Diagrams, Bond Order, Bonding in Diatomic Molecules and The Diatomic Molecules of the Second Period in 8.4) mark real divisions and the page's headers follow them; a worked example's `<h3>` is its number and the book's title |
| Boxed notes | Walter Kohn (chemist-portrait), Computational Chemistry in Drug Design and Band Theory (sciences-interconnect), all in 8.4, kept verbatim as `<div class="note">` with the book's eyebrow and an `<h3>` title |
| Link to Learning | all four dropped and named in `notes`: one in 8.2, three in 8.4 |
| Tables | Table 8.1 (8.1), Tables 8.2 and 8.3 (8.4) in the text as `div.book-table`; Table 8.1's spanned title row is written by hand. The Key Equations table of 8.4 is not printed |
| Example numbers | the publisher's: 8.1 in 8.1, 8.2 and 8.3 in 8.2, 8.4 in 8.3, 8.5 to 8.7 in 8.4 |
| Figure numbers | the publisher's, 8.1 to 8.40, listed per section in `exploration.md` and checked on openstax.org |
| Figures | orbital drawings become 3D Figures with the book's numbers; energy-level and MO diagrams become flat interactive Figures where filling or choosing a molecule is the idea; Lewis structures and unnumbered inline images are faithful copies. Folds are each section's call, candidates in `exploration.md` |
| Photographs | Figure 8.1 (intro) and Figure 8.32 (Walter Kohn) kept; Figure 8.33 (HIV-1 protease) kept as the book's image |
| 3D | orbitals and hybrid orbitals are 3D by the book's `RULES.md`: mathematical 3D (root rule 28.3), through `F.view3d` and `F.mesh` lobes, free orbit with the upright pitch bound, idle spin on still scenes, snap views named per figure (along the axis, face on to the plane of a π bond). Energy curves, diagrams, Lewis structures and tables stay flat |
| Motion | per figure in its plan line; the candidates with a clock are few (an atom approaching another in 8.2 if the section animates it); rotating a group about a bond is a slider, not a cycle |
| Colour | `energy` is the only type the chapter binds, on the energy axes of Figure 8.2 and of the energy-level and MO diagrams; atoms in the element palette through `F.el`; orbital phases as described in `COLOR.md`; everything else ink |
| Symbols | two untyped rows added, `ψ` (`\psi`) and `Ψ` (`\Psi`); `E` (`\kE`) and `r_bond` reused; no new type |
| Inline exercises | seven Check Your Learning items, inline after their examples, each with a `data-place` host |
| Exercises tab | the end-of-section items of each module, kind `exercise`; none is a simulation-exercise |
| Exercise placement | every item tests its own section; nothing moved, no `source_section` |
| Answers to book problems | the book's key only; four unkeyed numerical items left out and named in `exercise_notes` (listed in `exploration.md`); unkeyed conceptual items kept with an AI-marked suggested approach; the true-or-false item of 8.4 kept open with its options |
| Generated questions | none |
| Concept nodes | 23 rows merged before the sections are built (5, 7, 3, 8), 42 prerequisite edges, ten of them into Chapter 7; edges into Chapters 6 and 7's unmerged sections are in the notes file for the chapter pass |
| Formulas | `ch08/chapter.json`: the bond order equation (important) and its three worked instances (not); four variables; no anchors until the chapter pass |
| Glossary | the book's wording, 28 entries (5, 7, 0, 16); the book's "π* bonding orbital" and "σ* bonding orbital" terms are kept as printed |
| Degrees | `°` in prose and `^\circ` in math |
| Cross references | plain text to other sections; 8.4's pointers to Figure 8.1 and Table 8.1 are plain text in the book's words |
| Voice | root rule 17 and the book's Voice section |
| Labels | Figure for a book number, Sim for an addition; the word "demo" nowhere |
| `ai` and `built` | `{"text": "Claude Opus 5.5", "figures": "Claude Opus 5.5"}`, `2026-09-28` |
| Book manifest | `ch08` added to `book.json` by `ost merge chemistry-2e 8` |
