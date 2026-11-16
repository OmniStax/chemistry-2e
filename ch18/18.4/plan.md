# Plan: 18.4 Structure and General Properties of the Nonmetals (m68832)

Written 2026-10-05 before the build and left for review, as `ch18/config.md` records (applied as proposed on Chen's instruction to finish the book without check-ins).

One objective, seven numbered figures (18.19 to 18.25; four sketches, two figures mixing photographs with structures, one structure in the note), seven chemical equations (kept in the text), one Everyday Life note (Nanotubes and Graphene), no Link to Learning, seven end-of-section items (chapter exercises 44 to 50). No worked example, so no Check Your Learning and no inline host.

## Sub-concepts and spans

| Span | Header | Concepts |
|---|---|---|
| `nonmetals` | Bonding and reactions of the nonmetals (the section's own header for the untitled opening; Figure 18.19) | introduces `nonmetal-bonding-and-ions`, `first-member-anomaly`, `nonmetal-redox-patterns`, `acid-anhydride`, `disproportionation-reaction`; uses `nonmetal`, `metal`, `electronegativity`, `bond-type-from-electronegativity`, `ionic-compounds`, `covalent-bond`, `cation`, `anion`, `oxidation-number`, `valence-electrons`, `d-orbital`, `pi-bond`, `redox-reaction`, `oxidation`, `reduction`, `oxidizing-agent`, `oxyacid`, `oxyacid-strength`, `binary-acid-strength` |
| `structures` | Structures of the Nonmetals (the book's) | introduces `nonmetal-structures`; uses `covalent-bond`, `noble-gas`, `halogen`, `dispersion-forces`, `polarizability`, `allotropes` |
| `carbon` | Carbon (the book's; Figures 18.20 to 18.23, the Nanotubes and Graphene note) | introduces `carbon-allotropes`; uses `sp3-hybrid-orbital`, `sp2-hybrid-orbital`, `sigma-bond`, `pi-bond`, `resonance-forms`, `resonance-hybrid`, `dispersion-forces`, `covalent-network-solid`, `amorphous-solid`, `melting-point` |
| `phosphorus` | Phosphorus (the book's; Figure 18.24) | introduces `phosphorus-allotropes`; uses `allotropes`, `covalent-bond`, `melting-point`, `boiling-point` |
| `sulfur` | Sulfur (the book's; Figure 18.25) | introduces `sulfur-allotropes`; uses `allotropes`, `viscosity`, `amorphous-solid`, `paramagnetism`, `octet-rule`, `valence-electrons` |

"Amorphous" (10.5 `amorphous-solid`) is used, never introduced; its glossary headword is wanted at chapter level, as the chapter notes say.

## Figures

Second pass, 2026-11-16: every figure judged afresh against the book's image and rebuilt.

- fig-oxidation-states · Figure 18.19 · nonmetal-redox-patterns, nonmetal-bonding-and-ions · value add: standardisation and intuition: one shared scale from 8+ to 4−, a compound of the book beside each state, and behind each group the window from every valence electron lost (group number − 10) down to a filled valence shell (group number − 18), so the windows climb a step a group and oxygen and fluorine are seen to stop short of the top · arrows: none · still: a chart has no variable the text varies · no controls · headline: none · 2D · hover names on every mark and group; all ink, oxidation states are untyped.
  works: read off the image: H (1+, 1−), C (4+ To 4−), N (5+ To 3−), P, As (5+, 3+, 3−), O (1−, 2−), S, Se (6+, 4+, 2−), F (1−), Cl, Br, I (7+, 5+, 3+, 1+, 1−), Xe (8+, 6+, 4+, 2+). must hold: every mark of the image present and no other end state; each compound has its element in the state it stands beside (HCl, NaH; CO₂, CO, CH₂O, C₂H₂, C₂H₄, C₂H₆, CH₄; HNO₃, NO₂, HNO₂, NO, N₂O, N₂H₄, NH₃; H₃PO₄, H₃PO₃, PH₃; H₂O₂, H₂O; H₂SO₄, SO₂, H₂S; HF; HClO₄, HClO₃, HClO₂, HClO, HCl; XeO₆⁴⁻, XeF₆, XeF₄, XeF₂, all named in the book); every state inside its group's window. C 3+ and 1+, N 0 and 1− carry no compound.
- sim-carbon · Figure 18.20 + 18.22 + 18.23 · carbon-allotropes · value add: depth (the network of diamond against the stacked layers of graphite) and morph (graphite's middle layer is graphene; graphene rolls into the nanotube) · arrows: none · still: forms are discrete states · choice form (diamond, graphite, graphene, nanotube, C₆₀; default diamond) · headline: the text's statement for the form · graph none · physical 3D, no ground, pitch ±1.3 rad, idle spin (a lattice's depth reads from its turning), so no pinned labels; hover names on atoms and bonds · readout: bonds per atom and hybridization → the property the text names.
  works: parts: diamond, two cubic cells each way, every atom bonded to four; graphite, three flat layers of six-membered rings 0.71 apart, neighbours shifted one bond length; the sheet, 8 by 10 cells; the tube, that sheet rolled about its long axis, seam bonds closing it; C₆₀, 60 atoms, 12 pentagons and 20 hexagons. must hold: one atom and its bonded neighbours drawn large with bonds in ink, four in diamond and three in every other form; choosing graphene draws the outer layers away and leaves the middle one; the nanotube is the same atoms as the sheet; each form fills the stage (a long lens, each form scaled). read off the image: (c) diamond network, (d) stacked layers seen from the side, 18.22 the cage, 18.23 sheet and tube; ~4400 °C, "harder than diamond".
- fig-graphite-orbitals · Figure 18.21 · carbon-allotropes · brought back as a 3D figure (the first pass had reverted a flat copy). value add: depth and morph: the p orbitals stand square to the layer (the book's a) and pair side by side into π bonds; the two resonance forms pair the same orbitals with different neighbours (the book's b), and in the hybrid every orbital overlaps all three, which is why the π electrons move through the layer · arrows: none · still: three discrete states · choice π bonding (resonance form 1, resonance form 2, resonance hybrid; default form 1) · headline per state · physical 3D (book rule: orbitals), pitch ±1.3 rad, no spin, one label ("p orbital"), hover names on the rest · lobes above in `F.cat(0)`, below in `F.cat(1)` (the two phases) · readout: 28 p orbitals → 14 π bonds, or 28 π electrons free to move through the layer.
  works: parts: 28 carbon atoms, four rings by two; σ bonds between neighbours, stubs where the layer runs on; a p orbital on every atom, one lobe above and one below; in a form, a band joining the lobes of each pair above and below the layer and the second line of the double bond beside its σ bond. must hold: every atom has exactly one π partner in each form (a perfect pairing, found by search; the two forms chosen share the fewest bonds, two); lobes perpendicular to the plane; the hybrid's band runs over every bond. read off the image: (a) lobes above (one phase) and below (the other) each atom of two fused rings; (b) two Kekulé forms of a patch of fused rings.
- sim-phosphorus · Figure 18.24 · phosphorus-allotropes · value add: depth (P₄ is a tetrahedron) and morph (one P–P bond of each tetrahedron opens and its atoms bond to the neighbours) · arrows: none · still: two discrete states · choice form (white, red; default white) · headline per form · physical 3D, no ground, yaw ±0.9 rad so the chain is never end-on, pitch ±1.0, no spin; two labels ("a P₄ molecule", "new P–P bond") · readout: structure → melting point (44.2 °C, ~600 °C) and reactivity.
  works: parts: five P₄ tetrahedra, six bonds each; in red, the bond between the two front base atoms gone and those atoms bonded to the next tetrahedra, stubs at both ends. must hold: every atom has three bonds in both forms (the book's d draws whole tetrahedra with a link, which would give two atoms four bonds); the new bonds in ink; white molecules clearly apart; the scene fills its stage. read off the image: (b) one tetrahedron, (d) tetrahedra in a row with links and end stubs; 44.2 °C, 270–300 °C, ~600 °C.
- sim-sulfur · Figure 18.25 · sulfur-allotropes · value add: variation by slider (the book's four drawings become one temperature) and intuition (the same liquid tipped beside the molecules: it runs while it is rings and stays put when the chains tangle) · arrows: none · still: positions are a function of temperature · slider T (113 to 230 °C, default 113 °C; special 230 °C, "does not pour") · headline per state with the live temperature · 2D (book rule and root 28.5: a particle picture is flat where every particle must be seen; the first pass's 3D scene hid atoms behind atoms) · `F.el('S')` atoms, a chain's end atoms ringed in the liquid's dark red (`F.fact`), legend below; hover names · readout `T`, the count of rings and chains and the longest chain · facts: #e3c75a, #d4892b, #8c1d12.
  works: parts: 64 atoms as eight S₈ rings; each ring opens into an S₈ chain; the chains join end to end into three chains of 24, 24 and 16 atoms; those draw together and cross. A tube closed at one end, tipped mouth-down, and a beaker under its lip. flow: the liquid runs down the tube and out of the lip into the beaker, less of it the more viscous it is. must hold: every bond keeps its length at every temperature (atoms are laid out from bond directions); a ring atom has two bonds, a chain's end one; every atom stays inside the box; 113 °C is rings only and pours, 230 °C is tangled long chains and stays in the tube; the liquid runs straw to dark red. read off the image: (a) rings, (b) S₈ chains, (c) longer chains, (d) tangled chains; 113 °C, 230 °C. The text gives no temperature between; rings begin to open near 150 °C here, close to where liquid sulfur does thicken, and the book's 32 atoms are doubled so the flat box is filled.

Extra simulations (not built, root rule 15): none; the section's ideas are carried above.

## Tables

None.

## Types bound

`temperature` (every melting, boiling and working temperature in the prose: ~4400 °C, 44.2 °C, 280 °C, 270–300 °C, ~600 °C, 113 °C, 96 °C, 119 °C, 230 °C, 445 °C, 1000 °C; "temperature" where named; the slider, axis and readout of `sim-sulfur`; the melting points in the readouts of `sim-carbon` and `sim-phosphorus`), `density` ("vapor density" of sulfur). Oxidation states, charges, group numbers and counts stay ink; "electronegativity" and "ionization energy" stay ink as `ch18/COLOR.md` says. Element palette for C, P and S; the liquid sulfur colours as facts; `F.cat(0)`, `F.cat(1)` for the two phases of a p orbital (Figure 18.21). No referents.

## Exercises

Seven end-of-section items (chapter exercises 44 to 50). Three keyed, kept with the book's answers: fs-idm146332464 (45), fs-idm105553408 (47), fs-idm129789632 (49), each an open answer the reader compares with; the key to 45 prints "an σ bond", kept. Two unkeyed conceptual items with a suggested approach marked as OmniStax's own: fs-idp44423136 (44), fs-idp14134080 (50). Two left out and named: fs-idm173324096 (46, balanced equations to write) and fs-idm207037584 (48, oxidation states to compute). No moves.

## Variables

One row added to `chapter.json` for 18.4: `T`, temperature, "a temperature, whichever scale it is read on" (the meaning of 1.6, the same quantity), unit °C, for the slider and readout of `sim-sulfur`.

## Left out

Nothing of the text. Errata kept as printed: S(s) + O₂(g) ⟶ 2SO₂(s) (fs-idm148994256); the commas subscripted after NF₃, H₂ and H₂S; "the electron required necessary"; the note cites Figure 18.23 twice; key fs-idm146332464 "an σ bond".

## Wanted at chapter level

- glossary term "amorphous" → concept `amorphous-solid` (10.5), another chapter's row (the chapter notes' item, used here in the Carbon and Sulfur spans)
- `ch18/COLOR.md`: 18.4 draws the colours of molten sulfur as facts, #e3c75a (straw), #d4892b, #8c1d12 (dark red)

Applied by the chapter pass (2026-10-05):

- Glossary: "amorphous" added to 10.5's `amorphous-solid` (see 18.3).
- Anchor: 18.4/T → 18.4-sulfur.
- `COLOR.md` records the molten-sulfur facts (#e3c75a, #d4892b, #8c1d12); `exploration.md` records red phosphorus drawn with one bond of each tetrahedron opened.
