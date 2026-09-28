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

Colours: orbital lobes are not a type (chapter `COLOR.md`): the book's s blue, p red and hybrid yellow/purple are `F.cat(0)`, `F.cat(1)`, `F.cat(2)`, named by hover and by one label per kind; atoms through `F.el`; nuclei in the hybrid sets as small ink spheres; axes and arcs in ink. The three energy-level diagrams bind `energy` on their E axis only; lines, labels and electron half-arrows are ink.

1. `sim-water` · Figure 8.6 + 8.7 · hybridization · value add: shape in 3D and intuition by morph (the two perpendicular 2p orbitals bend into four tetrahedral hybrids and the hydrogens swing from 90° to 109.5°, the observed 104.5° beside them) · still: a choice between two models, no clock · choice `model` (2p orbitals, sp³ hybrids), morphing by `mix` · headline names the predicted angle and the observed 104.5° · no graph · 3D, mathematical (root 28.3): free yaw, pitch within ±80° (upright turntable), idle spin, views "in plane" and "edge on", flat fallback is the library's stub.
2. `sim-sp` · Figure 8.8 · sp-sp2-sp3-hybrid-orbitals, hybrid-orbital-properties · value add: shape in 3D and the mixing as a morph (s and p fade as the two hybrids grow from the nucleus) · still · choice `orbitals` (atomic orbitals, hybrid orbitals) · headline counts orbitals in and out and gives 180° · no graph · 3D mathematical, same bound and buttons (views "along x", "side").
3. `sim-sp-levels` · Figure 8.9 · hybrid-orbital-energy-diagram · value add: intuition by morph (the 2s line and one 2p line slide together to the sp level; each electron moves to its own sp orbital) · still · choice `atom` (isolated Be atom, sp hybridized Be) · headline is the book's panel title · no graph beside; the diagram is the figure · 2D, binds energy (the E axis).
4. `sim-sp2` · Figure 8.10 + 8.11 + 8.12 · sp-sp2-sp3-hybrid-orbitals · value add: shape in 3D, the book's two drawings of one set as two states of one object (plump with minor lobes, then thin balloons), and the set becoming BH₃ · still · choice `drawing` (atomic orbitals, hybrid orbitals, drawn thin, in BH₃) · headline states 120° and the unhybridized p along z · 3D mathematical, as 2.
5. `sim-sp2-levels` · Figure 8.13 · as 3 for B (sp², one unhybridized 2p) · 2D, energy.
6. `fig-sp2-examples` · Figure 8.14 · faithful still copy (Lewis structures of ClNO, CH₂O, H₂CCH₂), standardisation only · 2D, binds nothing.
7. `sim-sp3` · Figure 8.15 · as 2 for sp³ (109.5°) · 3D mathematical.
8. `sim-sp3-levels` · Figure 8.16 · as 3 for C (sp³) · 2D, energy.
9. `sim-ethane` · Figure 8.17 · sp-sp2-sp3-hybrid-orbitals, sigma-and-pi-bonds · value add: shape in 3D and variation (the text's "rotation around σ bonds occurs easily": one CH₃ group turns about the C–C axis and the end-to-end overlap never changes) · still: a slider, not a cycle (chapter config) · slider `rotation` (0° to 120°, angle, untyped, class empty), choice `view` (orbitals, bonds), the book's (a) and (b) · headline gives the angle and the seven σ bonds · 3D mathematical, views "along C–C", "side".
10. `fig-sp3d-lewis` · Figure 8.18 · faithful still copy (SF₄, ClF₃, ClF₄⁺ in wedge-and-dash) · 2D.
11. `sim-sp3d` · Figure 8.19 + 8.20 · sp3d-and-sp3d2-hybrid-orbitals · value add: shape in 3D; the ball-and-stick molecule and its hybrid set as two states, with the book's two molecules as a choice · still · choices `molecule` (PCl₅, SF₆) and `drawing` (molecule, hybrid orbitals); sticks become lobes as atoms fade · headline names the arrangement and angles · 3D mathematical (views "axial", "equatorial").
12. `sim-hybrid-sets` · Figure 8.21 · assign-hybridization, electron-pair-geometry · value add: shape in 3D and the lookup made live (the number of regions picks the row; lobes swing into the new arrangement) · still · choice `regions` (2 to 6) · headline reads the row: regions, arrangement, hybridization, angles · readout $n \rightarrow$ hybridization · 3D mathematical.
13. `fig-hydrides` · unnumbered image (H₂O, H₂S, H₂Te with 104.5°, 92.1°, 90°) · **kept as the book's image**, a `figure` row with the image in its own markup: the text points at the three angles, and the library's element palette has no tellurium colour to redraw it with (wanted below).
14. `fig-sulfate` · unnumbered image in Example 8.2 · faithful flat copy of the ball-and-stick sulfate ion, atoms in `F.el`, the two negative charges as marks.
15. `fig-urea` · unnumbered image in Example 8.3 · faithful Lewis copy.

The Check Your Learning images (SF₄ Lewis structure, acetic acid) go to the exercise rows' `figure`, as do the images of the end-of-section items and their keys (in the answer HTML).

Extra simulations: none proposed; the Link to Learning's three-dimensional viewing is what figures 1, 2, 4, 7, 11 and 12 already give.

## Exercises

Two Check Your Learning (keyed, open), inline after `ex-sulfate` and `ex-urea`. Fourteen end-of-section items, all kind `exercise`, all open: seven keyed (fs-idm77916144, fs-idp97605024, fs-idp86297648 with the book's unclosed parenthesis kept, fs-idm9916608 with its four Lewis images, fs-idp96568912, fs-idm32929264, fs-idp29495632); seven unkeyed conceptual items kept with an AI-marked suggested approach (fs-idp3076096, fs-idp25144752, fs-idp180352816, fs-idm2424288, fs-idm10995632, fs-idm71570128, fs-idp15207648). Nothing left out, nothing moved.

## Binds

`energy` (the E axis of Figures 8.9, 8.13, 8.16). Everything else element, categorical or ink.

## Wanted at chapter level

- `omnistax-web/src/lib/fig/elements.ts`: a colour for tellurium (`Te`), so that the H₂O/H₂S/H₂Te image (`fig-hydrides`) can be redrawn; until then `ch08/config.md` should list it as an unnumbered image kept as a `figure` row.
- anchor `eq-*`: none (8.2 has no equation).
- variable `ψ` → 8.2-water-problem (where the wave function is named).
- edge `hybridization` → `wavefunction-probability` (6.3), as the notes file lists.
- edge `hybridization` → `writing-electron-configurations` (6.4), as the notes file lists.
- edge `hybrid-orbital-energy-diagram` → `hunds-rule` (6.4).
- edge `hybrid-orbital-energy-diagram` → `aufbau-principle` (6.4).
