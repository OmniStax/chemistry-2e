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

- fig-oxidation-states · Figure 18.19 · nonmetal-redox-patterns, nonmetal-bonding-and-ions · value add: standardisation only, so a faithful copy: the book's six columns become six columns on one shared scale of oxidation state from 8+ to 4−, so a state reads off by height and "To" becomes a run of every state between · arrows: none · still: a chart has no clock and no variable the text varies · no controls · headline: none (the caption says it) · no graph beyond the chart itself · 2D (book rule: a chart of states is flat) · hover names on every state giving the element group and the state; elements labelled once at the head of their column (the book's), states written beside their marks; oxidation states are untyped, so the figure is ink with a muted grid.
- sim-carbon · Figure 18.20 + 18.22 + 18.23 · carbon-allotropes · value add: depth (the tetrahedral network of diamond against the planar, stacked layers of graphite is an arrangement in space the flat drawings only suggest) and morph (the one layer of graphite is graphene, and graphene rolls into a nanotube: the note's "single layer of graphite" and "roll the layer into a small tube" made visible) · arrows: none · still: the forms are discrete states with no clock; the choice morphs (the outer graphite layers draw away to leave graphene, graphene rolls into a tube and back) and crossfades where no counterpart exists (diamond, C₆₀) · choice form (diamond, graphite, graphene, nanotube, C₆₀; `F.choice`, default diamond, the book's first) · headline: the text's statement for each form, e.g. "In diamond each carbon atom forms four single bonds to four others at the corners of a tetrahedron." · graph none · physical 3D (rule 28: a crystal's packing is the lesson; book rule: lattices are 3D), no ground, pitch bounded to ±1.3 rad so the solid never flips over its poles, idle spin, snap views "face on" and "edge on" (edge on shows graphite's gaps between layers and graphene's single sheet) · `F.el('C')` atoms, muted sticks; hover name on every atom (hundreds, far past six labels); readout the text's relation for the chosen form, the diamond's melting point (~4400 °C) in the temperature hue · the photographs (a) diamond and (b) graphite are reached through the book's original, as 2.2 does for Thomson's photographs.
- fig-graphite-orbitals · Figure 18.21 · carbon-allotropes · value add: standardisation only, so a faithful copy: (a) two fused rings of a graphite layer in a locked perspective view (rule 28.2, the book prints them in perspective) with an unhybridized p orbital standing perpendicular to the plane on every carbon atom, its two phases in `F.cat(0)` and `F.cat(1)` as 8.3 draws them; (b) two resonance forms of a five-ring fragment of a layer joined by the double-headed resonance arrow, every bond of one direction double in the first and of another direction in the second, so each carbon has exactly one double bond in each form · arrows: symbolic (the resonance arrow) · still: a picture of bonding has no clock and nothing to vary · no controls · 2D, the perspective locked · labels: the panel letters (a), (b) and the atoms' C's (notation, not labels); hover names on the lobes and atoms.
- sim-phosphorus · Figure 18.24 · phosphorus-allotropes · value add: depth (P₄ is a tetrahedron, an arrangement in space) and morph (heating to 270–300 °C opens one P–P bond of each tetrahedron and the tetrahedra join into a chain through P–P single bonds) · arrows: none · still: two allotropes are two discrete states; the change of form is a choice morph, eased, not a clock, since the text gives no time for the conversion · choice form (white, red; `F.choice`, default white) · headline: white "White phosphorus exists as P₄ molecules, four atoms at the corners of a regular tetrahedron."; red "Heated to 270–300 °C without air, the P₄ tetrahedra join through P–P single bonds into red phosphorus." · graph none · physical 3D (rule 28: the tetrahedra and their network are the lesson), no ground, pitch ±1.3 rad, idle spin, snap views "front" and "above" · `F.el('P')` atoms (the book's orange), muted sticks; four molecules drawn, the chain's two ends carrying bond stubs as the book's (d) does; hover names on atoms and bonds (the opened bond named where it was); readout the text's comparison: melting point 44.2 °C against ~600 °C in the temperature hue, reactivity and toxicity in words · red phosphorus is drawn with one bond of each tetrahedron opened to join its neighbours, so that every atom keeps three bonds; the book's (d) draws whole tetrahedra with a link between them, which would give two atoms four bonds · photographs (a) and (c) reached through the book's original.
- sim-sulfur · Figure 18.25 · sulfur-allotropes · value add: variation by slider (the book draws four states of molten sulfur; one temperature slider moves through them as the text's sentence does: rings, rings opened into S₈ chains, chains joined into longer chains, the long chains drawn together and tangled) and depth (the S₈ crown is a puckered ring; the tangling is in space) · arrows: none · still: the slider is the idea's variable and the text gives no time; positions are a function of temperature and redraw on input · slider T (temperature, 113 to 260 °C, default 113 °C, the melting point of rhombic sulfur; a special value at 230 °C, "does not pour", where the chains have drawn together; the stages between are spread evenly from 113 to 230 °C, since the text gives no temperature for them) · headline per stage from the text: "At 113 °C the straw-colored liquid is quite mobile: its S₈ molecules are rings." … "Near 230 °C the very long chains tangle, and the dark red liquid does not pour easily." · strip below (the 3D scene is horizontal): a temperature axis from 100 to 260 °C carrying the liquid's colour as the fact (straw at 113 °C to dark red at 230 °C, through `F.fact`), the melting point and 230 °C marked, the current temperature pinned in the temperature hue · physical 3D (rule 28: the crowns and the tangle are arrangements in space; book rule: a phase change is spheres in a box the reader turns, its readings on a flat strip beneath), no ground, pitch ±1.3 rad, idle spin, snap views "front" and "above" · `F.el('S')` atoms, 32 of them as in the book's (a) to (d): four rings, four S₈ chains, three chains of 9, 12 and 11 atoms; muted sticks, a bond drawn while its two atoms are within bonding distance, so bonds break and form as the atoms move; hover names on atoms, a chain's end atoms named as the dangling atoms the text says colour the liquid · readout `T` with the stage in words · facts: straw #e3c75a, amber #d4892b, dark red #8c1d12 (the liquid's colours the text names).

Extra simulations (not built, root rule 15): none; the section's ideas are carried above.

## Tables

None.

## Types bound

`temperature` (every melting, boiling and working temperature in the prose: ~4400 °C, 44.2 °C, 280 °C, 270–300 °C, ~600 °C, 113 °C, 96 °C, 119 °C, 230 °C, 445 °C, 1000 °C; "temperature" where named; the slider, axis and readout of `sim-sulfur`; the melting points in the readouts of `sim-carbon` and `sim-phosphorus`), `density` ("vapor density" of sulfur). Oxidation states, charges, group numbers and counts stay ink; "electronegativity" and "ionization energy" stay ink as `ch18/COLOR.md` says. Element palette for C, P and S; the liquid sulfur colours as facts; `F.cat(0)`, `F.cat(1)` for the two phases of a p orbital. No referents.

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
