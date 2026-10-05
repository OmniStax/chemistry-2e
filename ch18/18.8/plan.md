# Plan: 18.8 Occurrence, Preparation, and Properties of Phosphorus (m68836)

Written 2026-10-05 before the build and left for review, as `ch18/config.md` records (applied as proposed on Chen's instruction to finish the book without check-ins).

One objective, three numbered figures (18.39 to 18.41, all ball-and-stick models), three chemical equations of the book's own (kept in the text), no boxed note, no Link to Learning, no table, no glossary, twelve end-of-section items (chapter exercises 67 to 78). No worked example, so no Check Your Learning and no inline host.

## Sub-concepts and spans

The opening has no book header and takes one of the section's own; the other two headers are the book's.

| Span | Header | Concepts |
|---|---|---|
| `preparation` | Preparation and uses of phosphorus (Figure 18.39 + 18.40) | introduces `phosphorus-preparation`; uses `alloy`, `nonmetal`, `oxidation-number` |
| `oxides` | Phosphorus Oxygen Compounds | introduces `phosphorus-oxides`; uses `standard-enthalpy-of-formation`, `oxidizing-agent` |
| `halides` | Phosphorus Halogen Compounds (Figure 18.41) | introduces `phosphorus-halides`; uses `halogen`, `first-member-anomaly`, `sublimation`, `chemical-equilibrium`, `oxyacid`, `lewis-acid`, `lewis-base`, `molecular-compounds`, `x-ray-crystallography`, `ionic-compounds` |

## Figures

- sim-phosphorus-cage · Figure 18.39 + 18.40 · phosphorus-preparation, phosphorus-oxides · value add: depth (a cage the reader turns) and variation by choice; the book draws P₄S₃ and the two oxides as three separate models, and the text says P–P bonds give phosphorus its unusual oxidation numbers and that P₄O₆ burns on to P₄O₁₀; one cage that the reader steps from P₄ through P₄S₃ (a sulfur atom in three of the six P–P edges, the base's three P–P bonds kept) or P₄O₆ (an oxygen atom in every edge, no P–P bond left) to P₄O₁₀ (one more oxygen on each phosphorus) shows all four as one tetrahedron of phosphorus atoms · arrows: none · still: nothing has a clock; a choice is one morph in which each P–P bond fades as its new atom grows out of its midpoint and the cage widens, sulfur turning to oxygen where an S becomes an O · choice molecule (P₄, P₄S₃, P₄O₆, P₄O₁₀; `F.choice`, default P₄S₃, the book's Figure 18.39; P₄ is a state the book does not draw, the frame of the other three) · headline: what the chosen cage keeps of P₄ (e.g. "In P₄S₃ a sulfur atom sits in three of the six edges of the P₄ tetrahedron, and the three P–P bonds of its base remain.") · readout: P₄ and P₄S₃ their formulas; P₄O₆ and P₄O₁₀ the book's keyed equations $\text{P}_4 + 3\text{O}_2 \longrightarrow \text{P}_4\text{O}_6$ and $\text{P}_4\text{O}_6 + 2\text{O}_2 \longrightarrow \text{P}_4\text{O}_{10}$ (exercise 69 (e), (f)), morphing by meaning; no note · graph none · 3D, physical (a molecule's arrangement in space, chapter config): spheres in the book's palette through `F.el` (P orange, S yellow, O red), each bond as two half sticks in its atoms' colours as the book draws them; free turntable orbit within the default pitch bound (a molecule has no underside), idle spin, view buttons side and down the threefold axis, zoom · labels: one P and one S or O, as the book's own lettering does once per kind here; every atom named on hover (up to 14 atoms, past six labels).
- sim-phosphorus-chlorides · Figure 18.41 · phosphorus-halides · value add: depth and variation by choice; the book draws PCl₃ and PCl₅ in the gas phase, and the text then says the pentachloride adds a chloride ion to give PCl₆⁻ and that the solid is [PCl₄⁺][PCl₆⁻]; the reader would otherwise imagine the tetrahedral cation and the octahedral anion; stepping through 3, 4, 5 and 6 chlorine atoms about one phosphorus shows the trigonal pyramid, tetrahedron, trigonal bipyramid and octahedron of 7.6 on these four species · arrows: none · still: a choice is one morph, each chlorine swinging along a great circle to its new place, a new chlorine growing out of the phosphorus atom (or out of the lone pair for PCl₃ to PCl₄⁺) and a leaving one shrinking into it · choice species (PCl₃, PCl₄⁺, PCl₅, PCl₆⁻; `F.choice`, default PCl₃, the left of the book's figure; PCl₅ is its right) · headline: the shape of the chosen species and where it occurs (e.g. "PCl₅ in the gas phase is trigonal bipyramidal, with two axial and three equatorial chlorine atoms.") · readout: PCl₃ the book's keyed $\text{P}_4 + 6\text{Cl}_2 \longrightarrow 4\text{PCl}_3$ (exercise 69 (d)); PCl₅ $\text{PCl}_3 + \text{Cl}_2 \longrightarrow \text{PCl}_5$ (the text's preparation); PCl₆⁻ $\text{PCl}_5 + \text{Cl}^- \longrightarrow \text{PCl}_6{}^-$ (the text's PX₆⁻); PCl₄⁺ the solid's formula $[\text{PCl}_4{}^+][\text{PCl}_6{}^-]$; no note · graph none · 3D, physical, as above; views side and down the axis · labels: P, one Cl, and "lone pair" on PCl₃; hover names on all.

Both are kind `sim` (they reach states the book did not draw) with the book's numbers in their eyebrows, the book's images in `originals`, its captions in `original_caption`. Bond lengths and angles are drawn to the measured values (P–P 2.21 Å in P₄, P–O 1.65 Å and P–O–P 127° in the cage, terminal P–O 1.43 Å; P–Cl about 2.0 to 2.1 Å, Cl–P–Cl 100° in PCl₃); no length or angle is labelled, since the text states none.

Photographs: none in the section. Unnumbered images: the nine Lewis-structure images inside the keys of exercises 67 and 75 stay in their answers.

Extra simulations (not built, root rule 15): the electric furnace of the preparation, phosphorus vapor distilling from a bed of phosphate rock, sand and coke and condensing under water; the book gives no drawing, temperature or rate, so the scene would be invented.

## Types bound

`energy` ("enthalpy of formation" through `standard-enthalpy-of-formation`, and the −2984 kJ), `temperature` (70 °C). No figure draws a typed quantity; `draws` is empty. Conventions P, S, O, Cl through `F.el`. No referents.

## Exercises

Twelve end-of-section items (67 to 78). Six keyed kept with the book's answers: 67 (fs-idp52847792, open, the five Lewis-structure images), 69 (fs-idm2951584, open, the equations), 71 (fs-idp54197664, 291 mL), 73 (fs-idp32430320, 28 tons), 75 (fs-idm54656592, open, the four Lewis-structure images with their geometries), 77 (fs-idp5265904, open, the oxidation states). One unkeyed conceptual item with an AI-marked suggested approach: 76 (fs-idm55936272). Five left out and named: 68 (fs-idp101864208, molecular structures), 70 (fs-idm43491296, hybridization), 74 (fs-idp208490096, equations), 72 (fs-idm123772752) and 78 (fs-idp126473504), numerical. No moves.

## Left out

Nothing dropped from the text. Errata kept as printed: "2.00 g of PCl₃ is an excess of water" (exercise 71); the summary names the two preparations of orthophosphoric acid and its three types of salts, which 18.9 describes.

## Wanted at chapter level

- 18.6's exercises carry `source_number` 1 to 3; chapter-wide they are 56 to 58 (18.1 to 18.5 hold 55 items)

Applied by the chapter pass (2026-10-05):

- 18.6 renumbered 56 and 57 (see 18.6); nothing else to apply.
