# Plan: 7.2 Covalent Bonding

Written 2026-09-28 before the build and left for review, as `../config.md` records (applied as proposed on 2026-09-28, on Chen's instruction to finish the book without check-ins).

## Sub-concepts

| Span | Header | Concepts |
|---|---|---|
| `covalent` | Covalent bonds: a shared pair of electrons | introduces `covalent-bond-formation` |
| `formation` | Formation of covalent bonds | reinforces `covalent-bond-formation` (Figure 7.4, the 436 kJ of H<sub>2</sub>) |
| `pure-polar` | Pure vs. polar covalent bonds | introduces `bond-polarity` |
| `electronegativity` | Electronegativity (with `###` Electronegativity versus Electron Affinity as `<h3>`, and the Pauling note) | introduces `electronegativity`, uses `bond-polarity` |
| `bond-type` | Electronegativity and bond type (with Example 7.3, `ex-polarity`) | introduces `bond-type-from-electronegativity`, uses `electronegativity`, `bond-polarity` |

The concepts are the four merged in the prep (`covalent-bond-formation`, `bond-polarity`, `electronegativity`, `bond-type-from-electronegativity`); every one has book exercises.

## Figures

- `sim-bond` · Figure 7.4 · `covalent-bond-formation`, `bond-length` · variation by slider: the reader moves one atom toward the other and reads the energy at every distance, where the still shows four fixed pairs; the two atoms stand on the graph's own scale, so the distance between the nuclei is the reading on the axis · arrows: none · still, the energy answers the distance and nothing has a clock · slider internuclear distance (length) 33 to 400 pm, default 74 pm with a special circle at the bond length · no headline: the two sides of the minimum are named on the graph ("closer, the two nuclei repel", "each electron is attracted to both nuclei"), the side the atoms are on set in ink · graph below the atoms · 2D, a graph. Readout: the energy of the pair times Avogadro's number, which at 74 pm is the 436 kJ/mol of the text. Binds `energy`, `length`.
  works: parts (two hydrogen atoms, each a nucleus in the cloud of its 1s electron; the left nucleus stands over 0 pm, the right nucleus over the point on the curve; a bracket between the nuclei carries the distance) · flow (none; the right atom follows the slider) · must hold (the atoms are drawn on the axis's scale, so the right nucleus is always straight above the point; the curve's lowest point is −7.24 × 10⁻¹⁹ J at 74 pm; left of it the curve climbs steeply above zero, right of it it rises and levels off just under zero; the clouds overlap heavily at 74 pm, slightly near 160 pm and not at all at 400 pm, as the book's four pairs do; −7.24 × 10⁻¹⁹ J × 6.022 × 10²³ mol⁻¹ reads −436 kJ/mol) · read off the image (axis titles "Energy (J)" and "Internuclear distance (pm)"; the only marked values are 0 on each axis, 74 on the distance axis, named "(H–H distance)", and −7.24 × 10⁻¹⁹ J at the minimum, each with a dashed guide; the curve starts well above zero at the left, about as high as half the well's depth; the atoms are grey spheres, the leftmost pair overlapping heavily, the next slightly, the last apart. The alt text prints the 74 as "0.74"; the image says 74. The image carries no other scale, so the curve between its marked points is a Morse curve of hydrogen's width, 0.0194 pm⁻¹.)
- `sim-polarity` · "Figure 7.5 + 7.8" · `bond-polarity`, `electronegativity`, `bond-type-from-electronegativity` · variation by choice: the reader picks the two bonded atoms and sees the shading of the shared electrons shift toward the more electronegative one, δ+ and δ− change sides, and ΔEN move along the scale of Figure 7.8 with its 0.4 and 1.8 boundaries; the pairs the text calls exceptions (H–F, Mn–I) are reachable and the headline says where the kinds of atom overrule the scale · arrows: symbolic (the book's crossed arrow, positive end to negative end) · still, a choice of pair has no clock · two `F.select` dropdowns: atom A of the elements the section and its exercises name (H, Li, Na, K, Cs, Mg, Ca, Ba, Mn, B, C, Si, N, P, O, S, Se, F, Cl, Br, I), atom B of the same without the metals, so no pair of two metals can be chosen; default H and Cl (Figure 7.5) · headline: the verdict in words, and the text's rule of thumb (two nonmetals generally covalent, a metal and a nonmetal often ionic) where it disagrees with the scale · the molecule above, the ΔEN scale below · 2D. Element palette for the atoms (`F.el`), the shared electrons an ink shade over them with a ramp legend, δ+/δ− in `charge`, the arrow in `dipole-moment`, the bands in ink shades. Each atom is labelled with its symbol, its EN and metal, metalloid or nonmetal as Figure 7.6 tints it. Readout `ΔEN = |EN_B − EN_A|` with the numbers, one chain.
  works: parts (two overlapping atoms, each a disc in its element colour with its nucleus a dot; the shading over each atom is its share of the bonding electrons; δ− over the more electronegative atom and δ+ over the other; the crossed arrow above them with its cross at the positive end and its head at the negative end; the ΔEN scale with three bands and a pointer) · flow (none) · must hold (the darker atom, the δ− and the arrowhead are all on the more electronegative atom, whichever dropdown holds it; two atoms of one element are shaded alike with no δ and no arrow; the pointer stands at |ΔEN| and the band it is over is the one the headline names; below 0.4 reads pure covalent, 0.4 to 1.8 polar covalent, above 1.8 ionic, as the image's table; H–Cl reads 0.9, Na–Cl 2.1, H–F 1.9, Mn–I 1.0 as the text) · read off the image (7.5a: a small H sphere overlapping a larger Cl sphere, a dot for each nucleus, the colour deepest round Cl, a crossed arrow above pointing to Cl with its cross over H; 7.5b: δ+ over H, δ– over Cl. 7.8: "Zero, Intermediate, Large" beside "Pure covalent, Polar covalent, Ionic", an arrow "Covalent character decreases; ionic character increases", and the table: pure covalent < 0.4, polar covalent between 0.4 and 1.8, ionic > 1.8. Electronegativities from the image of Figure 7.6.)
- `fig-en` · Figure 7.6 · the book's image, kept as a photograph. Reverted on 2026-11-14: the drawn copy only restyled the table, added a legend the book does not print and tinted hydrogen as a nonmetal where the image tints it as the metals; the exercises read values off this table, and the image gives them as well.
- `fig-pauling` · Figure 7.7 · photo kept (Portrait of a Chemist box, root rule and book rule).

No Sim beyond these: the example's bonds are all reachable on `sim-polarity`.

## Tables

Table 7.1 "Bond Polarity and Electronegativity Difference" inside Example 7.3 as `div.book-table`. The Check Your Learning's unnumbered answer table goes into the answer's solution as HTML.

## Exercises

- Check Your Learning of Example 7.3: inline after `ex-polarity`, open with the book's table as its solution.
- End of chapter (11 here, 1 moved): keyed `fs-idp119456432`, `fs-idm121789856`, `fs-idm28148800`, `fs-idp31566784`, `fs-idp173506592` (open with the book's key). Unkeyed conceptual, kept with a suggested approach marked as OmniStax's own: `fs-idm13014880`, `fs-idp18335616`, `fs-idp43172032`, `fs-idp49532528`, `fs-idp51035456`; the unkeyed choice item `fs-idp9464672` kept as an open item with its options listed. `fs-idp49074848` (a molecule of solid NaCl) moves to 7.1 with `source_section` "7.2"; both notes say so.

## Binds

`energy` and `length` (Figure 7.4), `charge` and `dipole-moment` (Figure 7.5 + 7.8). Everything else ink or element palette, per `../COLOR.md`.

## Wanted at chapter level

- none of the symbol, concept or edge rows needs a fix; `electronegativity` → 6.5 electron affinity and the others are listed in the chapter notes already.

### Applied by the chapter pass (2026-09-28)

Applied: `electronegativity` → `electron-affinity-trend` (6.5) is merged. `EN` is anchored on `7.2-electronegativity` and `ΔEN` on `7.2-bond-type`.
