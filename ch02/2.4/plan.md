# Plan: 2.4 Chemical Formulas (m68693)

Source: `source.md`, converted with `python3 tools/convert.py 2.4`. Status: applied as proposed on 2026-09-28, on Chen's instruction to finish the book without check-ins; this file stands in for the review stop (root rules 2, 5, 15).

## Sub-concepts and spans

| Span | `<h2>` | Holds |
|---|---|---|
| `molecular-formula` | Molecular and structural formulas | the two definitions, methane, Figure 2.16 |
| `elemental-molecules` | Elements that exist as molecules | the diatomic elements and S₈, Figure 2.17 |
| `subscripts-coefficients` | A subscript is not a coefficient | H₂ against 2H, Figure 2.18 |
| `empirical-formula` | Empirical formulas | the definition, titanium dioxide (Figure 2.19), benzene (Figure 2.20) |
| `empirical-from-molecular` | From a molecular formula to an empirical formula | acetic acid (Figure 2.21), the Sim, Example 2.6 (`ex-glucose`) with its Check Your Learning, the Paula Hammond portrait (Figure 2.22) |
| `isomers` | Isomers | acetic acid and methyl formate, Figure 2.23 |
| `spatial-isomers` | Structural and spatial isomers | carvone, Figure 2.24 |

## Concepts

All five are in `book.json` already: `molecular-formula` and `structural-formulas-and-models` introduced in `molecular-formula`, `subscripts-and-coefficients` in `subscripts-coefficients`, `empirical-formula-from-molecular-formula` in `empirical-formula`, `isomers` in `isomers`. Uses: `chemical-symbols`, `atoms-and-molecules`, `elements-and-compounds`, `law-of-definite-proportions`.

## Figures

The page binds nothing (ch02 `COLOR.md`): atoms in the element palette through `F.el`, structural formulas in ink.

Re-examined on 2026-11-14 against the book's images. Four figures stay drawn; four went back to the book's image.

- `fig-methane` · Figure 2.16 · molecular-formula, structural-formulas-and-models · shape in 3D: the reader turns the model under the flat formulas and sees four bonds spread evenly in space where the structural formula draws a cross; the balls swell into the space-filling model · arrows: none · still, a molecule has no clock · choice `model` (ball-and-stick, space-filling) · no headline, the caption says what to look at · no graph · physical 3D under a flat strip that holds the molecular formula, the structural formula and the key; free orbit (a molecule has no ground), idle spin about the vertical, no view buttons.
  works: parts (a carbon atom bonded to four hydrogen atoms; on the strip CH₄, the cross H–C–H with H above and below, the key) · flow (nothing moves but the reader's turn; on the choice the balls grow to their space-filling radii and the sticks fade) · must hold (four C–H bonds of one length at equal angles, one hydrogen atom straight up as in the book's (c); the hydrogen atoms smaller than the carbon atom and partly buried in it when space-filling; the formulas stay in view while the model turns) · read off the image (a) CH₄, (b) the cross, (c) ball-and-stick with one H up, (d) space-filling; carbon black, hydrogen white. The alt text agrees.
- `fig-sulfur` · Figure 2.17 · the same builder for S₈ · the crown the octagon hides · still · same choice · the same; it opens turned about 45° from face-on, as the book's (b) is, so the pucker shows before any turn.
  works: parts (eight sulfur atoms in one closed ring, each bonded to two neighbours; on the strip S₈ and the octagon of eight S) · flow (as methane) · must hold (the ring closed, eight equal bonds, atoms alternately above and below the ring's mean plane; face-on it matches the octagon, edge-on it zigzags; space-filling atoms overlap their neighbours) · read off the image (a) octagon of S joined by single lines, (b) crown seen obliquely, (c) space-filling; sulfur yellow. The book's (b) and (c) print no molecular formula; S₈ is on the strip from the caption.
- `fig-hydrogen` · Figure 2.18 · reverted to the book's image: it sets H, 2H, H₂ and 2H₂ side by side with their names, and the drawn figure showed one of the four at a time, so the comparison the text asks for was lost.
- `fig-tio2` · Figure 2.19 · photo kept: the sunscreen and the crystal the text points at; a live crystal adds no idea the 1 to 2 count does not carry.
- `fig-benzene` · Figure 2.20 · reverted to the book's image: the passage is about CH against C₆H₆, which a turning model does not show (the Sim does), the book's drawing has the alternating double bonds and the vial, and a flat ring gains little from a turn.
- `fig-acetic` · Figure 2.21 · reverted to the book's image, for the same reason: the passage is the 2:4:2 ratio, carried by the Sim; the drawn structural formula was laid out unlike the book's and the vinegar jug was hidden.
- `sim-empirical` · Sim · empirical-formula-from-molecular-formula · variation by slider: the atoms of one molecule are dealt into as many groups as the reader divides by; a divisor of every count leaves identical groups, the largest leaves the simplest ratio, any other leaves atoms over · arrows: none · still, the atoms glide to their places on a change · choice `compound` (methane, benzene, acetic acid, glucose), slider `divide by` 1 to 6 in whole steps, its special value the largest number that divides every count · headline says what the division gave ("Dividing by 2 gives 1:2:1, the simplest whole-number ratio: the empirical formula is CH₂O.") · no graph · 2D. Opens on the text's case, acetic acid divided by 2. Readout: C:H:O = 2:4:2 = 2/2:4/2:2/2 = 1:2:1 on one line.
- `fig-hammond` · Figure 2.22 · photo kept, a Portrait of a Chemist.
- `fig-isomers` · Figure 2.23 · reverted to the book's image: it shows both isomers at once with their names and formulas; the drawn morph showed one at a time in a layout unlike the book's, and suggested that one compound turns into the other.
- `fig-carvone` · Figure 2.24 · isomers (spatial) · shape in 3D: the reader does what the book's 180° arrow does and sees why the two cannot be laid on each other · arrows: the book's 180° arrow is the turn itself, played on the choice · still otherwise · choice `R-(−)-carvone` (mirror image, turned 180°, laid on S) · headline says what the state shows · no graph · physical 3D only, the book's rule for this pair; free orbit of the pair, no spin and no view buttons; on "laid on S" the view glides to an oblique one, because the mismatch is front against back and cannot be seen face-on.
  works: parts (two molecules of C₁₀H₁₄O, each a six-carbon ring with a C=O, a CH₃ on the ring's C=C, and a C₃H₅ group on the ring carbon opposite; a mirror plane between them) · flow (R turns half way round its own vertical axis, then slides onto S and is drawn see-through) · must hold (R is the exact reflection of S in the plane; S faces the reader as in the book, oxygen toward the mirror, CH₃ up, C₃H₅ down; after the half turn R's ring and oxygen stand as S's do; laid on S the ring atoms coincide and what is in front of the ring in one is behind it in the other; the left molecule is the S form, checked by the handedness of its ring carbon in the coordinates) · read off the image (top row S | dashed mirror | R; bottom row S unchanged, R after a 180° turn; names (+)-carvone and (−)-carvone, C₁₀H₁₄O under each; carbon black, hydrogen white, oxygen red). The alt text calls the turn "counter clockwise 180 degrees"; the image shows a turn about the vertical axis.

Carvone's coordinates are the PubChem 3D conformer of CID 16724, rounded to 0.01 Å and turned 60° in the ring's plane to the book's pose; methane is a regular tetrahedron of 1.09 Å bonds; S₈ is a crown built with 2.05 Å bonds and angles near 108°.

## Photographs and images

Kept: Figure 2.19 (the text points at it), 2.22 (portrait, always), and since 2026-11-14 the book's images of 2.18, 2.20, 2.21 and 2.23. Exercise drawings `Question3a`–`3d`, `7a`, `7b` go into their prompts and `9a`, `9b` into their solution; `4a`–`4d` go with their unkeyed exercise.

## Exercises

CYL 1 inline after `ex-glucose`. End: keyed `fs-idm188711792`, `fs-idm157365408`, `fs-idm64843712`, `fs-idp2601824` (open answers from the key); unkeyed conceptual `fs-idm171756048` with an AI approach. Left out: `fs-idp231487264`, `fs-idp33519568` (unkeyed formulas). Held: the three Build a Molecule items `fs-idm75792016`, `fs-idm57514192`, `fs-idm80750976`, since no figure of the page builds a molecule.

## Wanted at chapter level

- config.md "Unnumbered images": 2.4's exercise drawings are set in the exercise prompts and solution, not as `figure` rows (a `figure` row needs a `<figure>` in the text, and these belong to cards).
- empirical-formula (3.2) → prereq empirical-formula-from-molecular-formula (already in the chapter notes).

**Applied by the chapter pass (2026-09-28).** The exercise drawings stay in their cards, recorded in `config.md` under "What the build changed". The edge empirical-formula → empirical-formula-from-molecular-formula is staged in `ch03/book-rows.json` and merged, with formula-mass → average-atomic-mass and formula-mass → molecular-formula beside it.
