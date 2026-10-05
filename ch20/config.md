# Config: Chemistry 2e, Chapter 20

Proposed by the agent after the chapter exploration (2026-10-05). Status: applied as proposed on 2026-10-05, on Chen's instruction to finish the book without check-ins; the per-section stops of root rule 2, the plan review of root rule 5 and the user picks of root rule 15 are replaced by a plan file per section, written before the section is built and left for review after. Each line is a setting and its value.

| Setting | Value |
|---|---|
| Chapter | 20 Organic Chemistry, modules m68845 (introduction), m68846 to m68849 |
| Front matter | the chapter introduction (m68845) is a page of its own in `ch20/intro/`, listed before 20.1, built by the prep agent with Figure 20.1 and no figure of its own |
| Unit of work | one section = one page; sections never folded |
| Loop | prep → plan file → build → validator, the four sections in parallel, then the chapter pass; review after |
| Prose | verbatim; objectives, the section summary (to `summary_html`) and the glossary go to the tables; no Key Equations in the chapter |
| Headers | the book's own headers kept (20.1 Alkanes, The Basics of Organic Nomenclature: Naming Alkanes, Alkenes with its Isomers of Alkenes, Alkynes, Aromatic Hydrocarbons; 20.2 Alcohols with its Naming Alcohols, Ethers; 20.3 Aldehydes and Ketones, Carboxylic Acids and Esters); one header of the section's own for each untitled opening (20.1's, 20.2's one sentence, 20.3's paragraph, and 20.4, which prints no header at all and takes two of its own, for amines and amides) |
| Boxed notes | Recycling Plastics (20.1), Carbohydrates and Diabetes (20.2), DNA in Forensics and Paternity, Addictive Alkaloids, Proteins and Enzymes, Kevlar (20.4), verbatim as `div.note` with the book's eyebrow and an `<h3>` title |
| Link to Learning | three (one each in 20.1, 20.2, 20.4) dropped and named in `notes`; none is a trigger |
| Footnotes | 20.1's two and Table 20.1's two, 20.2's one, kept as the book's footnotes |
| Tables | Table 20.1 (20.1) as `div.book-table` with its two footnotes; the unnumbered functional-group table closing 20.4 is an image, kept as a `figure` row with no number or rebuilt as an unnumbered `div.book-table` (20.4's call) |
| Example numbers | 20.1 to 20.10 (seven in 20.1, two in 20.2, one in 20.3), each with a keyed Check Your Learning inline |
| Figure numbers | 20.1 to 20.24, listed per section in `exploration.md` |
| Figures | 20.2 + 20.7 (+ 20.10) one molecule in four representations with a choice of molecule, both ways; 20.3 expanded, condensed and skeletal as a choice with a morph or a copy; 20.4 n-butane turned about its middle bond (dihedral slider) beside 2-methylpropane; Table 20.1's melting and boiling points on a carbon-count slider; 20.5 alkyl groups by the hydrogen removed or a copy; 20.6 fractional distillation moving and flat; 20.10 cis and trans 2-butene in 3D; 20.11 benzene both ways or a copy; Example 20.10's oxidation ladder as a choice of step; the rest copies or both ways; each section's plan decides folds and tiers |
| Photographs | every photograph is pointed at by the text or sits in a kept box, and is kept (listed in `exploration.md`); Figure 20.1 on the introduction page; 20.13 (a drawn illustration with a credit) kept as a `photo` row |
| Unnumbered images | the text's reaction and structure images (12, 5, 10 and 6 by section, listed in `exploration.md`) kept as `figure` rows with no number or redrawn; example and key images stay in their examples and answers; the 34 bundle files no module names are never used |
| 3D | molecules as ball-and-stick and space-filling models physical 3D through `F.view3d`, `F.el` for every atom; a structure the text names built both ways with a view choice defaulting to 2D; benzene's p orbitals mathematical 3D if drawn; the distillation column, graphs, reactions, Lewis, condensed and skeletal structures and tables flat |
| Motion | per figure in its plan line; the vapours rising and fractions drawn off in 20.6 are kinematic and set the moving tier; a bond turned on a slider, the representation morphs and every reaction arrow are not |
| Colour | `temperature` for the melting and boiling points of Table 20.1 and the temperatures the prose states (425 °C, 140 °C, 0 °C, –196 °C); `mass`, `volume`, `density` for the values of exercises; `F.el` for every atom; the book's red highlights of a functional group are not colour coding; see `COLOR.md` |
| Types | none added |
| Symbols | none staged and no variables rows; δ+ and δ− in ink, as 7.2 writes them |
| Inline exercises | ten Check Your Learning items, each in a host `div.exercises` with `data-place` after its example |
| Exercises tab | end-of-section items, kind `exercise`; no `simulation-exercise` |
| Exercise placement | no moves; 20.4's three hybridization items state the earlier sections' reactions in their prompts |
| Answers to book problems | the book's key only; 27 unkeyed items whose answers would be computed left out (11, 4, 7, 5); no unkeyed choice item; four unkeyed conceptual items kept with an AI-marked suggested approach (3, 1, 0, 0) |
| Generated questions | none |
| Concept nodes | 44 rows merged (21, 8, 8, 7) with 90 prerequisite edges into Chapters 2, 4, 5, 7, 8, 10, 11, 12 and within the chapter |
| Formulas | C<sub>n</sub>H<sub>2n+2</sub> on `alkane`, C<sub>m</sub>(H<sub>2</sub>O)<sub>n</sub> on `carbohydrate`; the chapter's chemical equations stay in the text |
| Glossary | the book's wording, 21 entries, all terms on this chapter's concepts, each on the section that introduces it; "saturated hydrocarbon" sits with "alkane" on `alkane` |
| Degrees | `°` in prose and `^\circ` in math, never `º` |
| Cross references | plain text to other sections; the elements page `/chemistry-2e/sheets/elements/` where the text points at the periodic table |
| Labels | Figure for a book number, Sim for an addition |
| `ai` and `built` | `{"text":[{"model":"claude-opus-5-5","effort":"high"}],"figures":[{"model":"claude-opus-5-5","effort":"high"}]}`, `2026-10-05`; every figure row carries its own `ai` |
| Book manifest | `ch20` added to `book.json` by `ost merge chemistry-2e 20` |
