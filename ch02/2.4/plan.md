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

- `fig-methane` · Figure 2.16 · molecular-formula, structural-formulas-and-models · shape in 3D and standardisation: the reader turns the ball-and-stick model and watches it swell into the space-filling one, where the book prints three still views · still, a molecule has no clock · choice `model` (structural formula, ball-and-stick, space-filling) · headline names the model and what it shows · none · both ways per the book's rule: the structural formula is the flat default, the two models a 3D scene mounted on first switch, free orbit (a molecule has no ground), idle spin, views front and top; physical 3D.
- `fig-sulfur` · Figure 2.17 · the same builder for S₈ · the crown the octagon hides · still · same choice · the same.
- `fig-hydrogen` · Figure 2.18 · subscripts-and-coefficients · variation by choice: the reader writes the coefficient and the subscript and sees atoms join or part · still, redraw on input with a morph of the atoms · choices `coefficient` (none, 2) and `subscript` (none, 2) · headline "2H₂ is two H₂ molecules, four hydrogen atoms in all." · none · 2D.
- `fig-tio2` · Figure 2.19 · photo kept: the sunscreen and the crystal the text points at; a live crystal adds no idea the 1 to 2 count does not carry.
- `fig-benzene` · Figure 2.20 · the builder for C₆H₆ · as `fig-methane`; the vial (d) stays in the book's image.
- `fig-acetic` · Figure 2.21 · the builder for acetic acid · as `fig-methane`; the vinegar jug (a) stays in the book's image.
- `sim-empirical` · Sim · empirical-formula-from-molecular-formula · variation and flow: the atoms of one molecule are dealt into identical groups, each group the empirical formula · a story slider (molecule, simplest ratio) with its transport, no clock · choice `compound` (methane, benzene, acetic acid, glucose; the exercise and Check Your Learning compounds left out) · headline "C₂H₄O₂ divides into 2 groups of CH₂O." · none · 2D.
- `fig-hammond` · Figure 2.22 · photo kept, a Portrait of a Chemist.
- `fig-isomers` · Figure 2.23 · isomers · flow by morph: the same eight atoms glide from acetic acid into methyl formate, the carbon and the single-bonded oxygen trading places · still, the morph fires on the choice · choice `compound` (acetic acid, methyl formate) · headline states the shared formula · none · 2D only: the lesson is which atom is bonded to which, a flat fact; the 3D ball-and-stick of acetic acid is Figure 2.21's.
- `fig-carvone` · Figure 2.24 · isomers (spatial) · shape in 3D: two mirror images the reader turns and cannot superimpose · still · no slider; snap views (face the mirror, above, side) · headline "S-(+)-carvone and R-(−)-carvone are mirror images." · none · physical 3D only, the book's rule for this pair; free orbit, idle spin; coordinates from PubChem CID 16724, the R form mirrored through the plane between them.

Coordinates of methane, benzene, acetic acid, methyl formate and carvone are PubChem 3D conformers (CIDs 297, 241, 176, 7865, 16724), rounded to 0.01 Å; S₈ is a crown built with 2.05 Å bonds and angles near 108°.

## Photographs and images

Kept: Figure 2.19 (the text points at it), 2.22 (portrait, always). The photographs inside 2.20 and 2.21 stay in the originals. Exercise drawings `Question3a`–`3d`, `7a`, `7b` go into their prompts and `9a`, `9b` into their solution; `4a`–`4d` go with their unkeyed exercise.

## Exercises

CYL 1 inline after `ex-glucose`. End: keyed `fs-idm188711792`, `fs-idm157365408`, `fs-idm64843712`, `fs-idp2601824` (open answers from the key); unkeyed conceptual `fs-idm171756048` with an AI approach. Left out: `fs-idp231487264`, `fs-idp33519568` (unkeyed formulas). Held: the three Build a Molecule items `fs-idm75792016`, `fs-idm57514192`, `fs-idm80750976`, since no figure of the page builds a molecule.

## Wanted at chapter level

- config.md "Unnumbered images": 2.4's exercise drawings are set in the exercise prompts and solution, not as `figure` rows (a `figure` row needs a `<figure>` in the text, and these belong to cards).
- empirical-formula (3.2) → prereq empirical-formula-from-molecular-formula (already in the chapter notes).

**Applied by the chapter pass (2026-09-28).** The exercise drawings stay in their cards, recorded in `config.md` under "What the build changed". The edge empirical-formula → empirical-formula-from-molecular-formula is staged in `ch03/book-rows.json` and merged, with formula-mass → average-atomic-mass and formula-mass → molecular-formula beside it.
