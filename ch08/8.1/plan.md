# Plan: 8.1 Valence Bond Theory (m68744)

Source: `source.md`. Status: applied as proposed on 2026-09-28, on Chen's instruction to finish the book without check-ins; left here for review after.

## Sub-concepts

| Span | Header | Concepts introduced |
|---|---|---|
| `valence-bond` | Bonds from overlapping orbitals | valence-bond-theory |
| `bond-distance` | Bond distance and bond energy | bond-distance-and-bond-energy |
| `sigma-pi` | Sigma and pi bonds | sigma-and-pi-bonds |
| `multiple-bonds` | Single, double, and triple bonds | multiple-bond-composition |
| `ex-butadiene` | Example 8.1 · Counting σ and π Bonds | count-sigma-and-pi-bonds |

The two opening paragraphs (why VSEPR theory is not enough) sit at the head of `valence-bond`. Objectives, summary (to `summary_html`) and the five glossary entries go to the tables.

## Figures

- `sim-morse` · Figure 8.2 · bond-distance-and-bond-energy, valence-bond-theory · variation by slider: the reader brings the two hydrogen atoms together and reads the energy at every distance, where the book shows three fixed pairs; the atoms stand on the graph's own scale, so the gap between the nuclei is the reading on the axis, and the clouds visibly overlap more as the atoms close · arrows: none · still, the energy answers the distance and nothing has a clock · slider internuclear distance (length) 30 to 400 pm, default 74 pm with a special circle at the bond length · no headline: the book's three stages are written on the graph where they happen ("no interaction", "begin to interact", "lowest energy"), plus the far left the text names ("repulsions win"), the one the atoms are in set in ink and the rest muted; the bond energy, which the next paragraph defines as the depth of the minimum, is a bracket from 0 down to the minimum · atoms above, graph below · 2D, a graph. Readout: E × N_A as one chain, 436 kJ/mol at 74 pm. Binds `energy`, `length`. Rebuilt 2026-11-14 on the 7.4 pattern: the old one drew the atoms off the axis's scale as touching discs, set the readout as two formulas joined by `\quad`, and named no stage on the curve.
  works: read off the image · energy axis titled Energy (J) with only 0 marked (we mark 10⁻¹⁹ J ticks) · minimum −7.24 × 10⁻¹⁹ J at 74 pm, marked "(H–H bond length)" under the axis · the curve rises steeply left of 74 pm, above 0 near the axis, and levels at 0 far right · three labels: "Sufficiently far apart to have no interaction" (far right, curve at 0), "Atoms begin to interact as they move closer together" (mid, curve below 0 and falling), "Optimum distance to achieve lowest overall energy of system" with H₂ (at the minimum) · atoms are fuzzy clouds with a dot nucleus, labelled H; at the minimum the two clouds overlap heavily. Must hold: the right nucleus stands over the point on the curve; the bracket of the bond energy runs exactly from 0 to the minimum; the energy at 74 pm reads −7.24 and the readout −436 kJ/mol.
- `sim-overlap` · Figure 8.3 + 8.4 + 8.5 · sigma-and-pi-bonds, valence-bond-theory, orbital-overlap · 3D, the arrangement in space is the lesson (book RULES: orbitals and orbital overlap are 3D): turning the pair shows that σ density is round about the internuclear axis while π density lies above and below a node that the axis runs in · still, a change of pair is one morph (nuclei slide, p orbitals swing, an orbital changing kind crossfades) · choices: orbitals (s + s, s + p, p + p), and for p + p only, how they meet (end to end, at an angle, side by side); opens on p + p end to end, Figure 8.3 (a), the figure the paragraph above it cites · headline on a strip above the scene, one sentence naming the bond and the molecule the text gives (H₂, HCl, Cl₂) · key row under the scene: nucleus and the two phases of the orbital (`F.cat(0)`, `F.cat(1)`, as COLOR.md) · labels: the internuclear axis named at its end, the node named at its edge for π; nuclei and lobes by hover (labels on them would cover what they name) · mathematical 3D, free yaw, pitch within ±60° so the lobes never stand end on; no spin, no zoom, no view buttons (26.2). Readout: the overlap written as orbitals → bond. Rebuilt 2026-11-14: the old one hid the 3D behind a 2D/3D view choice, carried "side on" and "along the axis" snap buttons, and ran five long choices in one row.
  works: parts · per atom a nucleus (dot) and its valence orbital: an s sphere, or a p orbital of two lobes of opposite phase through the nucleus · the internuclear axis through both nuclei · for π, the nodal plane holding the axis. read off the image · 8.3 (a) two p orbitals on one axis, the lobes that meet between the nuclei in one colour (red), the outer lobes in the other (blue); (b) the same two turned up by about 45° each, the meeting lobes above the axis, less overlap · 8.4 (a) two s spheres overlapping, (b) an s sphere overlapping the p lobe of its own colour (blue) that points at it, (c) as 8.3 (a) · 8.5 two parallel p orbitals close together, upper lobes one colour, lower the other, overlapping above and below; dots mark nuclei in all. Must hold: the lobes that overlap are always the same phase; in the π case the overlap lies off the axis on both sides and the node plane holds both nuclei; at an angle the meeting lobes overlap less than end to end.
- `fig-bond-types` · unnumbered image (Lewis structures of HCl, O₂, N₂ with their σ and π counts) · reverted 2026-11-14 to the book's image: a still redraw that only restyled it, with the lone pairs of Cl drawn off the atom; it shows nothing the image does not.
- `fig-butadiene` · unnumbered image in Example 8.1 · reverted 2026-11-14 to the book's image: a still redraw of a Lewis structure, no clearer than the book's, with a formula readout that added nothing.
- Check Your Learning image (`CNX_Chem_08_01_Exover_img.jpg`) goes on the card as its `figure`; answer images of fs-idp84623072 and fs-idp108425904 go inline in their solutions.

Table 8.1 stays in the text as `div.book-table` with its spanned title written as the caption. No photographs. No extra Sims.

## Exercises

- `cyl1` (Check Your Learning of Example 8.1): a σ or π for three overlaps, open with the book's answer, the image on the card.
- End of section, eight items: four keyed (fs-idp92773152, fs-idm21893728, fs-idp84623072, fs-idp108425904) with the book's answers, open; three unkeyed conceptual (fs-idp92050208, fs-idp78672368, fs-idp42077552) kept with an AI-marked suggested approach; fs-idp204835968 (the H–Cl energy, unkeyed numerical) left out and named in `exercise_notes`.

## Binds

`energy` only (Figure 8.2).

## Wanted at chapter level

- anchor `E` (8.1 variable) → 8.1-bond-distance
- anchor `r_bond` (8.1 variable) → 8.1-bond-distance
- edge valence-bond-theory → the 6.3 atomic-orbital-shapes concept (as the chapter notes list)
- edge bond-distance-and-bond-energy → the 7.5 bond-energy concept (as the chapter notes list)

Applied by the chapter pass: `E` and `r_bond` anchored to 8.1-bond-distance; edges valence-bond-theory → angular-momentum-quantum-number (the 6.3 concept of orbital shapes) and bond-distance-and-bond-energy → bond-energy (7.5) merged.
