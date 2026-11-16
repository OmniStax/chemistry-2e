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

- sim-phosphorus-cage · Figure 18.39 + 18.40 · phosphorus-preparation, phosphorus-oxides · value add: depth and variation by choice; the book draws P₄S₃ and the two oxides as three separate models and says only that P–P bonds give phosphorus unusual oxidation numbers; one cage stepped from P₄ through P₄S₃ and P₄O₆ to P₄O₁₀, with the six edges of the P₄ tetrahedron kept as thin lines where the P–P bond has gone, shows where each new atom went and how many P–P bonds are left, and the readout turns that count into the oxidation number · arrows: none · still: a choice is one morph, each P–P bond fading as its new atom grows out of its midpoint · choice molecule (P₄, P₄S₃, P₄O₆, P₄O₁₀; `F.choice`, default P₄S₃, the book's Figure 18.39) · headline: what the chosen cage keeps of P₄ · readout: the oxidation number of P as a count of its bonds (P₄ 3(0) = 0; P₄S₃ top P 3(+1) = +3 and base P 1(+1) + 2(0) = +1; P₄O₆ 3(+1) = +3; P₄O₁₀ 3(+1) + 2 = +5), with a note saying what each kind of bond counts · graph none · 3D, physical: spheres in the book's palette through `F.el`, each bond two half sticks in its atoms' colours; free turntable, idle spin, no view buttons; the scene is scaled per molecule so each fills the stage · labels: none on the atoms; a key of the elements and of the tetrahedron's edges, every atom named on hover with its oxidation number.
  works: parts: four P at the corners of a tetrahedron; six edge sites, each a P–P bond or an S or O atom bonded to the edge's two P; four corner sites, an O on one P · flow: none · must hold: P₄ six P–P bonds; P₄S₃ S in the three edges that meet at the top P, the three P–P bonds of the base kept, each S joined to the top P and one base P; P₄O₆ an O in all six edges and no P–P bond; P₄O₁₀ the same plus one O on each P; the thin edge lines only where a P–P bond is missing; oxidation numbers sum to zero with S and O at −2 (P₄S₃: 3 + 3(1) = 6 = 3 × 2; P₄O₆: 4(3) = 12 = 6 × 2; P₄O₁₀: 4(5) = 20 = 10 × 2) · read off the image: 18.39 top P bonded to three S, each S to one base P, base a P₃ triangle; 18.40 left six O bridging four P, right the same with a terminal O on each P; P orange, S yellow, O red. Rebuilt 2026-11-16: the molecule was small in a blank stage and the readout only repeated the formula; now it fills the stage, the tetrahedron stays visible, and the readout gives the oxidation numbers the text calls unusual.
- sim-phosphorus-chlorides · Figure 18.41 · phosphorus-halides · value add: motion the reader would otherwise imagine; the book draws PCl₃ and PCl₅ in the gas phase and the text then says PCl₅ is made from PCl₃ and chlorine and that the solid is [PCl₄⁺][PCl₆⁻]; two phosphorus atoms and ten chlorine atoms carried through three states show Cl₂ adding to the pyramid and, in the solid, one chlorine crossing from one PCl₅ to the other to leave a tetrahedron and an octahedron · arrows: none · still: a choice is one morph of the same twelve atoms · choice substance (PCl₃ and Cl₂, PCl₅ gas, PCl₅ solid; `F.choice`, default PCl₃ and Cl₂; the first two are the book's figure) · headline: what the state is and how it comes about · readout: PCl₃ + Cl₂ ⇌ PCl₅ (the text's preparation and its equilibrium on heating) for the first two, 2PCl₅ ⟶ PCl₄⁺ + PCl₆⁻ for the solid · graph none · 3D, physical: two parts side by side, each turning about its own centre, so neither hides the other; idle spin, no view buttons · labels: each molecule or ion named with its shape, and each Cl₂, at the foot of the stage; each Cl₂ is a part of its own to the right of its PCl₃, so it turns in place and never passes in front of it; a key of phosphorus, chlorine and the lone pair; hover names on all.
  works: parts: two P, each with five Cl sites (top, bottom, three round the middle); in the first state the top and bottom Cl of each are a Cl₂ molecule beside PCl₃, which carries a lone pair · flow: PCl₃ and Cl₂ to PCl₅: the two Cl of Cl₂ go to the top and bottom of P as the lone pair fades and the pyramid flattens; gas to solid: the bottom Cl of the left PCl₅ crosses to the right P · must hold: PCl₃ three Cl below P, lone pair above, Cl–P–Cl 100°; PCl₅ three Cl at 120° round the middle and one above, one below; solid left four Cl at 109.5°, right six Cl at 90°; ten Cl and two P in every state; the crossing Cl is bonded to one P at a time · read off the image: PCl₃ a pyramid of three Cl under P; PCl₅ a trigonal bipyramid; P orange, Cl green. Rebuilt 2026-11-16: four unrelated species on one atom became the text's own sequence, and the wide stage holds two molecules instead of one small one.

Both are kind `sim` (they reach states the book did not draw) with the book's numbers in their eyebrows, the book's images in `originals`, its captions in `original_caption`. Bond lengths and angles are drawn to the measured values (P–P 2.21 Å in P₄, P–O 1.65 Å and P–O–P 127° in the cage, terminal P–O 1.43 Å; P–Cl about 2.0 to 2.1 Å, Cl–P–Cl 100° in PCl₃); no length or angle is labelled, since the text states none. Oxidation numbers stay in ink (chapter `COLOR.md`).

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
