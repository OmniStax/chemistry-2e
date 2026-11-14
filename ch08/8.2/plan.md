# Plan: 8.2 Hybrid Atomic Orbitals (m68745)

Source: `source.md`, converted with `python3 tools/convert.py 8.2`.
Status: applied as proposed on 2026-09-28, on Chen's instruction to finish the book without check-ins; this plan was written before the page and is left for review.

Two learning objectives, sixteen numbered figures (8.6 to 8.21, no photograph), one unnumbered image in the running text, five unnumbered images in the two worked examples, two Check Your Learning items (keyed), fourteen end-of-section exercises (seven keyed), one Link to Learning note (dropped), a summary and a glossary of seven terms. No table, no key equation. One page.

## Sub-concepts (page headers)

The book's five headers mark real divisions and the page follows them; the opening is split in two, and the closing paragraph on the limits of hybridization and the two worked examples each get a block.

1. `water-problem` **Why overlapping atomic orbitals are not enough** (the water paragraphs, Figure 8.6 + 8.7). Introduces `hybridization`; uses `valence-bond-theory`, `vsepr-theory`, `electron-pair-geometry`, `writing-electron-configurations`, `wavefunction-probability`.
2. `hybrid-ideas` **Six ideas about hybrid orbitals** (the numbered list). Introduces `hybrid-orbital-properties`; uses `sigma-and-pi-bonds`, `vsepr-theory`.
3. `sp` **sp hybridization** (book header; Figures 8.8, 8.9). Introduces `sp-sp2-sp3-hybrid-orbitals` and `hybrid-orbital-energy-diagram`; uses `hybrid-orbital-properties`, `hunds-rule`.
4. `sp2` **sp² hybridization** (book header; Figures 8.10 + 8.11 + 8.12, 8.13, 8.14). Reinforces `sp-sp2-sp3-hybrid-orbitals`, `hybrid-orbital-energy-diagram`; uses `lewis-structure`.
5. `sp3` **sp³ hybridization** (book header; Figures 8.15, 8.16, 8.17). Reinforces `sp-sp2-sp3-hybrid-orbitals`, `hybrid-orbital-energy-diagram`; uses `sigma-and-pi-bonds`, `molecular-structure-versus-electron-pair-geometry`, `electron-pair-repulsion-order`.
6. `sp3d` **sp³d and sp³d² hybridization** (book header; Figures 8.18, 8.19 + 8.20). Introduces `sp3d-and-sp3d2-hybrid-orbitals`; uses `electron-pair-geometry`, `octet-rule-exceptions`.
7. `assignment` **Assignment of hybrid orbitals to central atoms** (book header; the three guidelines, Figure 8.21). Introduces `assign-hybridization`; uses `lewis-structure`, `vsepr-theory`, `electron-pair-geometry`.
8. `limits` **Where hybridization is needed** (the closing paragraph and its image of H₂O, H₂S and H₂Te). Introduces `limits-of-hybridization`; uses `hybridization`.
9. `examples` **Assigning hybridization in practice** (Examples 8.2 as `ex-sulfate` and 8.3 as `ex-urea`, each with its Check Your Learning inline). Reinforces `assign-hybridization`; uses `lewis-structure`.

The Link to Learning (visualizing hybrid orbitals in three dimensions) is dropped and named in `notes`; the page's 3D figures take its place. Learning objectives, the summary (to `summary_html`) and the glossary go to the tables.

## Figures

Re-examined on 2026-11-14 against the book's images (figure pass of chapters 1 to 8 and 10). Seven still redraws went back to the book's images; the seven 3D figures were rebuilt.

Colours: orbital lobes are not a type (chapter `COLOR.md`): the book's s blue, p red and hybrid yellow are `F.cat(0)`, `F.cat(1)`, `F.cat(2)`, named in a key under each scene and by hover; atoms through `F.el`; nuclei as small ink spheres; axes muted; arcs and their degrees in the angle hue. Every lobe is drawn from its wave function rather than as a stock ellipsoid: an orbital a·s + b·p has the angular part f(θ) = a + √3 |b| cos θ about the direction of b, and its surface is r = L (f²/4)^¾ (s a sphere, p two lobes pinched at the nucleus, a hybrid one large lobe and the small one behind it, in the book's proportions). The same rule draws every state of a mixing, so a p orbital turning into a hybrid passes only through real combinations. The sp³d and sp³d² lobes use the sp³ profile; the book draws them without minor lobes, and the profile's minor lobes sit inside the opposite large lobes, so nothing extra shows. No 3D scene has view buttons; each turns slowly until taken hold of (root 26.2), carries its headline on a canvas above and its key on a canvas below, and writes no label on a lobe: names of orbitals stand under their panels, degrees stand outside their arcs, axis names hide when their end is seen against a lobe.

1. `sim-water` · Figure 8.6 + 8.7 · hybridization · value add: 3D and the morph the book splits over two figures (two 2p orbitals bend into four sp³ hybrids; the hydrogen atoms swing from 90° to 109.5° and settle at the observed 104.5°) · arrows: none · still: a choice of three states, each a morph · choice `model` (2p orbitals, sp³ hybrids, in H₂O: the book's 8.6, 8.7a, 8.7b) · headline names the state's angle · readout ∠HOH with the state's number against 104.5° · no graph · 3D mathematical (root 28.3), free orbit, idle spin, no buttons.
   works: parts · the oxygen nucleus at the centre; in 8.6 two of its 2p orbitals at 90°, each a pair of lobes, with a hydrogen 1s sphere overlapping the end of one lobe of each; in 8.7a four sp³ hybrids to the corners of a tetrahedron, two holding lone pairs, no hydrogen; in 8.7b two hybrids each overlapped by a hydrogen 1s sphere, the other two the lone pairs. flow · none (a change of model is a morph). must hold · two p orbitals only in 8.6 (the book shows two); the hydrogen atoms sit on the bonding lobes' axes in every state; four hybrids in 8.7, one large lobe each; the arc is between the two O–H directions and reads 90°, 109.5°, 104.5° in turn; the lone pairs are the two hybrids out of the H–O–H plane. read off the image · 90° (8.6), 109.5° between two hybrids (8.7a), 104.5° between the hydrogen atoms (8.7b); the book's dots (two in each lone-pair lobe, one in each bonding lobe) are carried by the words "lone pair" outside those lobes and by hover.
2. `sim-sp` · Figure 8.8 · sp-sp2-sp3-hybrid-orbitals, hybrid-orbital-properties · value add: the mixing as a morph in 3D: each atomic orbital becomes one hybrid in its own panel, then the panels close onto one atom · arrows: none (the book's two grey arrows are steps, here the states) · still: choice of three states · choice `orbitals` (atomic orbitals, hybrid orbitals, the set) · headline per state · readout 1 s + 3 p → 2 sp + 2 p · 3D mathematical.
   works: parts · four panels, each one valence orbital on its own x, y, z axes (z up, x right, y away, as the book draws them): s, pₓ, p_y, p_z; after mixing the s and pₓ panels hold the two sp hybrids along +x and −x, and p_y, p_z are unchanged; the set puts all four on one nucleus. flow · none. must hold · two orbitals in and two hybrids out; each hybrid one large and one small lobe, the large lobes 180° apart along x; the two p orbitals that do not mix stay drawn, fainter, square to x. read off the image · s, pₓ (the book draws only these two) and the 180° arc; the book does not draw p_y and p_z, which the energy diagram of 8.9 counts as unhybridized.
3. `fig-sp-levels` · Figure 8.9 · reverted to the book's image. The three energy-level diagrams (8.9, 8.13, 8.16) are one kind: a still redraw would only restyle lines and half-arrows the book already draws clearly, and a choice between the panels would hide the comparison the diagram exists for.
4. `sim-sp2` · Figure 8.10 + 8.11 + 8.12 · as 2, for sp², with a fourth state: BH₃ (hydrogen 1s orbitals arrive on the three hybrids) · choice `orbitals` (atomic orbitals, hybrid orbitals, the set, BH₃) · readout 1 s + 3 p → 3 sp² + 1 p, and in BH₃ 3 sp² + 3 H 1s → 3 σ bonds. Figure 8.11 (the thin drawing) is a way of drawing, not a state, and a drawing-style option is ruled out (root 26.7); it stays among the originals.
   works: parts · panels s, pₓ, p_y, p_z; after mixing three sp² hybrids in the xy plane, 120° apart, and p_z unchanged; the set on one nucleus with p_z square to the plane; BH₃ adds a hydrogen 1s sphere on the end of each hybrid. must hold · three in, three out; p_z perpendicular to the plane of the three hybrids; 120° between neighbours; three hydrogen atoms, in the plane. read off the image · s, pₓ, p_y, 120°; 8.12's 120° between B–H bonds.
5. `fig-sp2-levels` · Figure 8.13 · reverted, as 3.
6. `fig-sp2-examples` · Figure 8.14 · reverted: a restyled copy of three Lewis structures whose bonds ran into the letters; nothing gained.
7. `sim-sp3` · Figure 8.15 · as 2, for sp³ · readout 1 s + 3 p → 4 sp³.
   works: parts · panels s, pₓ, p_y, p_z; after mixing four sp³ hybrids, one up the z axis and three below, 109.5° apart; the set on one nucleus. must hold · four in, four out, no p left over; every pair of hybrids 109.5° apart. read off the image · s, pₓ, p_y, p_z, the first hybrid along z, 109.5° (in the caption; the image marks none).
8. `fig-sp3-levels` · Figure 8.16 · reverted, as 3.
9. `sim-ethane` · Figure 8.17 · sp-sp2-sp3-hybrid-orbitals, sigma-and-pi-bonds · value add: 3D and variation: the text's "rotation around σ bonds occurs easily": the reader turns one CH₃ group about the C–C axis and the end-to-end overlap is the same at every angle; the book's (a) and (b) as two states, the atoms closing in · arrows: none (the book's arrow is a step) · still · choice `atoms` (apart, bonded), slider φ (0° to 120°, angle, the turn of the right-hand CH₃ group from eclipsed, default 60°, staggered) · readout 2 × 4 sp³ = 8 orbitals (apart), 1 C–C + 6 C–H = 7 σ bonds (bonded) · 3D mathematical.
   works: parts · two carbon nuclei on the x axis, each with four sp³ hybrids in a tetrahedron, one pointing at the other carbon; six hydrogen 1s spheres, one on the end of each of the other hybrids. flow · none. must hold · four hybrids on each carbon; the two C hybrids meet end to end on the axis; seven overlaps when bonded (one C–C, six C–H); turning φ moves only the right-hand group's three hydrogen atoms and hybrids, about the C–C axis. read off the image · (a) 2 carbons with four hybrids each and 6 hydrogen atoms apart, (b) seven σ overlaps.
10. `fig-sp3d-lewis` · Figure 8.18 · reverted: a restyled copy of three wedge-and-dash structures; nothing gained.
11. `sim-sp3d` · Figure 8.19 + 8.20 · sp3d-and-sp3d2-hybrid-orbitals · value add: 3D, and the molecule turning into its central atom's hybrid set (each bond stick becomes the lobe that points at it) · still · choices `molecule` (PCl₅, SF₆) and `drawing` (ball and stick, hybrid orbitals) · readout 1 s + 3 p + 1 d → 5 sp³d, or + 2 d → 6 sp³d² · 3D mathematical.
   works: parts · PCl₅: P at the centre, two axial Cl and three equatorial Cl; SF₆: S and six F at the corners of an octahedron; the hybrid set: one large lobe toward each outer atom. must hold · five lobes and five Cl, six lobes and six F; axial–equatorial 90°, equatorial–equatorial 120°, octahedral 90°. read off the image · P orange, Cl green, S yellow, F green (the element palette); five sp³d, six sp³d² labels (one label per set here; the headline counts them).
12. `sim-hybrid-sets` · Figure 8.21 · assign-hybridization, electron-pair-geometry · value add: 3D, and the book's table as one lookup: the number of regions picks the row, and the lobes swing into it with the dashed arrangement the table's middle column draws · still · choice `regions` (2 to 6) · readout n regions → arrangement → hybridization · 3D mathematical.
   works: parts · a nucleus with n hybrids and the dashed polyhedron joining their tips. must hold · lobe counts 2 to 6; angles 180°, 120°, 109.5°, 90° and 120°, 90°; the polyhedron is a line, triangle, tetrahedron, trigonal bipyramid, octahedron. read off the image · the five rows: 2 linear sp 180°; 3 trigonal planar sp² 120°; 4 tetrahedral sp³ 109.5°; 5 trigonal bipyramidal sp³d 90° and 120°; 6 octahedral sp³d² 90°.
13. `fig-hydrides` · unnumbered image (H₂O, H₂S, H₂Te with 104.5°, 92.1°, 90°) · kept as the book's image, a `figure` row with the image in its own markup.
14. `fig-sulfate` · unnumbered image in Example 8.2 · reverted to the book's image: a flat copy of a ball-and-stick model that the book draws better, and the example only counts regions.
15. `fig-urea` · unnumbered image in Example 8.3 · reverted to the book's image: a restyled Lewis structure; nothing gained.

The Check Your Learning images (SF₄ Lewis structure, acetic acid) go to the exercise rows' `figure`, as do the images of the end-of-section items and their keys (in the answer HTML).

Extra simulations: none proposed; the Link to Learning's three-dimensional viewing is what figures 1, 2, 4, 7, 9, 11 and 12 already give.

## Exercises

Two Check Your Learning (keyed, open), inline after `ex-sulfate` and `ex-urea`. Fourteen end-of-section items, all kind `exercise`, all open: seven keyed (fs-idm77916144, fs-idp97605024, fs-idp86297648 with the book's unclosed parenthesis kept, fs-idm9916608 with its four Lewis images, fs-idp96568912, fs-idm32929264, fs-idp29495632); seven unkeyed conceptual items kept with an AI-marked suggested approach (fs-idp3076096, fs-idp25144752, fs-idp180352816, fs-idm2424288, fs-idm10995632, fs-idm71570128, fs-idp15207648). Nothing left out, nothing moved.

## Binds

`angle` (the arcs, the slider of Figure 8.17 and the readouts). Everything else element, categorical or ink; the energy-level diagrams are the book's images.

## Wanted at chapter level

- `omnistax-web/src/lib/fig/elements.ts`: a colour for tellurium (`Te`), so that the H₂O/H₂S/H₂Te image (`fig-hydrides`) can be redrawn; until then `ch08/config.md` should list it as an unnumbered image kept as a `figure` row.
- anchor `eq-*`: none (8.2 has no equation).
- variable `ψ` → 8.2-water-problem (where the wave function is named).
- edge `hybridization` → `wavefunction-probability` (6.3), as the notes file lists.
- edge `hybridization` → `writing-electron-configurations` (6.4), as the notes file lists.
- edge `hybrid-orbital-energy-diagram` → `hunds-rule` (6.4).
- edge `hybrid-orbital-energy-diagram` → `aufbau-principle` (6.4).

Applied by the chapter pass: tellurium was added to the element palette, but `fig-hydrides` stays the book's image, listed in `config.md`; `ψ` anchored to 8.2-water-problem; edges hybridization → wavefunction-probability and → writing-electron-configurations, hybrid-orbital-energy-diagram → hunds-rule and → aufbau-principle merged. Figure 8.19 + 8.20 moved back and down so its headline clears the molecule.
